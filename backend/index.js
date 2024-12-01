const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

const allowedOrigins = [
  "https://resume-roaster-one.vercel.app/",
  "https://resume-roaster-git-main-amulgauravs-projects.vercel.app/",
  "https://resume-roaster-qe8u74bgb-amulgauravs-projects.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow requests with no origin (e.g., mobile apps, Postman) or in the allowed list
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true, // Include cookies if needed
  })
);

// Configure Multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Roast Prompt Template
const createRoastPrompt = (resumeText) => `
You are a savage, no-filter resume roaster. Your job is to tear apart the following resume in plain, raw, and brutally honest language. Don't hold back. 

Resume Text:
${resumeText}

Roast Guidelines:
- Rip apart every weak point, vague phrase, or generic line
- Make it darkly funny but straightforward, using basic, raw English
- Avoid sugarcoating anything—be blunt and ruthless
- Keep it under 300 words
- Drop sarcastic career advice that stings but makes sense
`;

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Resume Roaster Backend is alive!" });
});

// Resume Roast Route
app.post("/roast", upload.single("resume"), async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    // Parse PDF
    const parseResult = await pdf(req.file.buffer);
    const resumeText = parseResult.text;

    if (!resumeText || resumeText.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "Unable to extract text from resume" });
    }

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate roast
    const result = await model.generateContent(createRoastPrompt(resumeText));
    const roastResponse = result.response.text();

    res.json({
      roast: roastResponse,
      originalFileName: req.file.originalname,
    });
  } catch (error) {
    console.error("Roast generation error:", error);
    res.status(500).json({
      error: "Failed to generate resume roast",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});
