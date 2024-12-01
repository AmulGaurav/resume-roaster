# BrainRot Resume Roaster

BrainRot Resume Roaster is a savage yet darkly humorous application designed to mercilessly critique resumes.

## 🔥 Features

- Brutally Honest Feedback: No sugarcoating, just straight-up savage critiques.
- Dark Humor: Hilarious, ego-crushing responses that sting in the best way.
- Customizable Roast: Powered by the free Google Gemini API for dynamic responses.
- Upload Your Resume: Just upload your resume (PDF) for instant roasting.
- Gen Z Vibes: From "sigma grindset" to "skibidi bop" references, we've got it all!

## 🎯 Brainrot Hackathon Theme

This project is a part of the Brainrot Hackathon, a fun-themed event encouraging over-the-top, creative applications. We've designed the interface and tone to match the spirit of chaos and Gen Z energy.

## 🛠️ Tech Stack

- **Frontend:** React.js, TailwindCSS, shadcn
- **Backend:** Node.js, Express, Multer, pdf-parse
- **AI:** Google Gemini API for roast generation
- **Deployment:** Vercel (Frontend), Render (Backend)

## 🚀 How It Works

1. **Upload:** Select your resume (PDF format).
2. **Roast:** Click "Generate Roast" and let the AI tear it apart.
3. **Results:** Receive a scathing, funny critique that might just help you improve.

## 🛠️ Installation Guide

- ### Backend

  1. Clone the repository:

  ```
    git clone https://github.com/your-username/resume-roaster.git
    cd resume-roaster/backend
  ```

  2. Install dependencies:

  ```
    npm install
  ```

  3. Add your Google Gemini API key to .env:

  ```
    GEMINI_API_KEY=your-api-key-here
  ```

  4. Start the server:

  ```
    node index.js
  ```

- ### Frontend

  1. Navigate to the frontend folder:

  ```
    cd ../frontend
  ```

  2. Install dependencies:

  ```
    npm install
  ```

  3. Update the BACKEND_URL in your .env file:

  ```
    VITE_BACKEND_URL=your-backend-url-here
  ```

  4. Start the development server:

  ```
    npm run dev
  ```

## 🧠 Challenges and Learnings

- Brainrot Theme Integration: Ensuring the app matched the hackathon’s fun and quirky vibe.
- AI Integration: Fine-tuned the roast generation for the perfect balance of humor and critique.

## ✨ Acknowledgments

- Brainrot Hackathon for the inspiration.
- Special thanks to our OG **[Audrey Chan](https://www.linkedin.com/in/audrey-chen-tech/)** for organizing this BrainRot! 🔥
- Google Gemini API for making the roasting possible.
- Meme culture and Gen Z for the vibe check.
