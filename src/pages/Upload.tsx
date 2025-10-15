import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload as UploadIcon, X, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import ConfidenceGauge from "@/components/ConfidenceGauge";

interface PredictionResult {
  prediction: string;
  confidence: number;
}

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid image file (JPG, JPEG, PNG)",
        variant: "destructive"
      });
    }
  }, []);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data: PredictionResult = await response.json();
      setResult(data);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
      history.unshift({
        ...data,
        date: new Date().toISOString(),
        thumbnail: preview,
      });
      localStorage.setItem('scanHistory', JSON.stringify(history.slice(0, 20)));

      toast({
        title: "Analysis Complete",
        description: "Your X-ray has been analyzed successfully",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to connect to the API. Please ensure the FastAPI server is running.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  const getResultConfig = (prediction: string) => {
    const predLower = prediction.toLowerCase();
    if (predLower.includes('normal')) {
      return { icon: CheckCircle, color: 'success', label: 'Normal' };
    } else if (predLower.includes('viral')) {
      return { icon: AlertTriangle, color: 'warning', label: 'Viral Pneumonia' };
    } else {
      return { icon: XCircle, color: 'destructive', label: 'Bacterial Pneumonia' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-3">Upload X-Ray Image</h1>
        <p className="text-center text-muted-foreground mb-8">
          Upload a chest X-ray for AI-powered pneumonia detection
        </p>

        <Card className="p-8 shadow-soft">
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  isDragging 
                    ? 'border-primary bg-primary/5 shadow-glow' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-medical rounded-full flex items-center justify-center">
                    <UploadIcon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-2">
                      Drop your X-ray image here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports JPG, JPEG, PNG (Max 10MB)
                    </p>
                  </div>
                  <Button asChild>
                    <label className="cursor-pointer">
                      Select File
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleFileInput}
                      />
                    </label>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative group">
                      <img
                        src={preview}
                        alt="X-ray preview"
                        className="w-full rounded-xl shadow-soft"
                      />
                      <button
                        onClick={reset}
                        className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    {isAnalyzing ? (
                      <Loader />
                    ) : result ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        {(() => {
                          const config = getResultConfig(result.prediction);
                          const ResultIcon = config.icon;
                          return (
                            <>
                              <div className="text-center">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                                  config.color === 'success' ? 'bg-success/10 text-success' :
                                  config.color === 'warning' ? 'bg-warning/10 text-warning' :
                                  'bg-destructive/10 text-destructive'
                                }`}>
                                  <ResultIcon className="h-5 w-5" />
                                  <span className="font-semibold">{config.label}</span>
                                </div>
                              </div>

                              <ConfidenceGauge 
                                confidence={result.confidence * 100} 
                                variant={config.color as any}
                              />

                              <div className="text-center space-y-2">
                                <p className="text-sm text-muted-foreground">
                                  The model detected <span className="font-semibold text-foreground">{config.label}</span>
                                </p>
                              </div>

                              <Button 
                                onClick={reset}
                                variant="outline"
                                className="w-full"
                              >
                                Upload Another Image
                              </Button>
                            </>
                          );
                        })()}
                      </motion.div>
                    ) : (
                      <div className="text-center space-y-4">
                        <p className="text-muted-foreground">Ready to analyze</p>
                        <div className="space-y-2">
                          <Button 
                            onClick={analyzeImage}
                            className="w-full bg-primary hover:bg-primary/90 shadow-glow"
                            size="lg"
                          >
                            Analyze Image
                          </Button>
                          <Button 
                            onClick={reset}
                            variant="outline"
                            className="w-full"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
};

export default Upload;
