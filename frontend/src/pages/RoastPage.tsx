import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadedFileState, roastResultState } from "@/state/atoms/resumeAtoms";

const RoastPage: React.FC = () => {
  const uploadedFile = useRecoilValue(uploadedFileState);
  const roastResult = useRecoilValue(roastResultState);
  const resetUploadedFile = useResetRecoilState(uploadedFileState);
  const resetRoastResult = useResetRecoilState(roastResultState);
  const navigate = useNavigate();

  // Redirect if no file or roast result
  if (!uploadedFile || !roastResult) {
    return <Navigate to="/" replace />;
  }

  const handleReset = () => {
    resetUploadedFile();
    resetRoastResult();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2c1352] to-[#4a1b5a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glitch effect background */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

      {/* Floating geometric shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-900/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-900/30 rounded-full blur-3xl animate-pulse delay-500"></div>

      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-purple-700/50 text-white relative z-10 shadow-2xl shadow-purple-900/50">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-text">
            BrainRot Roast Results <span className="text-white">🔥💀</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-700/50">
              <p className="text-purple-200 whitespace-pre-wrap bg-purple-950/30 p-4 rounded-lg">
                {roastResult}
              </p>

              <div className="mt-4 text-sm italic text-yellow-400">
                <strong>Uploaded File:</strong> {uploadedFile.name}
              </div>
            </div>
            <Button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-1">🔥</span>
              Roast Another Sigma Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoastPage;
