import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { uploadedFileState, roastResultState } from "@/state/atoms/resumeAtoms";
import { Upload, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const LandingPage: React.FC = () => {
  const setUploadedFile = useSetRecoilState(uploadedFileState);
  const setRoastResult = useSetRecoilState(roastResultState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setUploadedFile(file);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const generateRoast = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("resume", selectedFile);

      const response = await axios.post(`${BACKEND_URL}/roast`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 seconds timeout
      });

      setRoastResult(response.data.roast);
      navigate("/roast");
    } catch (err) {
      console.error("Roast generation error:", err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.error || "Failed to generate roast"
          : "An unexpected error occurred"
      );
      setIsLoading(false);
    }
  };

  const initialRequest = async () => {
    await axios("https://resume-roaster.onrender.com/");
  };

  useEffect(() => {
    initialRequest();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2c1352] to-[#4a1b5a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-900/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-900/30 rounded-full blur-3xl animate-pulse delay-500"></div>

      <Card className="w-full max-w-md sm:max-w-lg bg-white/10 backdrop-blur-lg border-purple-700/50 text-white relative z-10 shadow-2xl shadow-purple-900/50 p-0 sm:p-4">
        <CardHeader className="text-center space-y-4">
          {error && (
            <div className="text-red-500 font-medium">
              <strong>Note:</strong> If request fails at first, please reload
              the page after 30 seconds & try again 😃
            </div>
          )}

          <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-text">
            BrainRot Resume <span className="text-white">💀</span>
          </CardTitle>

          <p className="text-purple-200 mt-2 font-medium text-base">
            <span className="text-yellow-300">Sigma Skibidi Mode:</span>{" "}
            Absolutely Destroy Your Career Vibes! 🚀
          </p>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div className="border-2 border-dashed border-purple-600/50 rounded-lg p-6 text-center group transition-all duration-300 hover:border-pink-500">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="resume-upload"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center space-y-4"
              >
                <Upload className="w-12 h-12 text-purple-400 group-hover:text-pink-500 transition-colors" />
                <span className="text-purple-300 group-hover:text-white transition-colors font-semibold">
                  {selectedFile
                    ? `${selectedFile.name} (Alpha Resume Loaded! 💪)`
                    : "Upload Your Sigma Resume (PDF Only)"}
                </span>
              </label>
            </div>

            {error && (
              <div className="text-red-400 text-center bg-red-900/30 p-2 rounded-lg">
                <p>{error}</p>
              </div>
            )}

            {selectedFile && (
              <Button
                onClick={generateRoast}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-1 animate-spin" />
                    Generating Skibidi Roast...
                  </>
                ) : (
                  <>
                    <span className="mr-1">🔥</span>
                    Absolutely Destroy My Resume
                  </>
                )}
              </Button>
            )}

            <div className="flex items-center text-red-400 text-sm bg-purple-900/30 p-2 rounded-lg">
              <AlertCircle className="mr-2 w-5 h-5 text-pink-500 font-medium" />
              Warning: Extreme Alpha Ego Destruction Incoming! 💥
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;
