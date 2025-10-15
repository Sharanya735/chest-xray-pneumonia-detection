import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Database, Brain, Shield, Code } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-4">About MediScan AI</h1>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Empowering radiology through deep learning
        </p>

        <div className="space-y-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-soft hover:shadow-glow transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-medical rounded-xl">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We aim to democratize access to AI-powered medical imaging analysis. 
                    By leveraging cutting-edge deep learning models, we provide fast, accurate 
                    pneumonia detection to support healthcare professionals and researchers worldwide.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Dataset */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-soft hover:shadow-glow transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-medical rounded-xl">
                  <Database className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3">Dataset</h2>
                  <p className="text-muted-foreground mb-4">
                    Our model is trained on the comprehensive <span className="font-semibold text-foreground">Chest X-Ray Pneumonia</span> dataset 
                    by Paul Mooney, available on Kaggle. This dataset contains thousands of validated chest X-ray images 
                    labeled as Normal, Viral Pneumonia, or Bacterial Pneumonia.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <code className="text-primary">import</code> kagglehub<br />
                    path = kagglehub.dataset_download(<code className="text-success">"paultimothymooney/chest-xray-pneumonia"</code>)<br />
                    <code className="text-primary">print</code>(<code className="text-success">"Path to dataset files:"</code>, path)
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Model */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-soft hover:shadow-glow transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-medical rounded-xl">
                  <Code className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Technology</h2>
                  <p className="text-muted-foreground mb-4">
                    Our solution uses a state-of-the-art Convolutional Neural Network (CNN) architecture, 
                    optimized for medical image classification. The model has been trained on thousands of 
                    X-ray images and achieves high accuracy in distinguishing between normal lungs and 
                    different types of pneumonia.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm font-semibold mb-1">Frontend</p>
                      <p className="text-sm text-muted-foreground">React + TypeScript + Framer Motion</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm font-semibold mb-1">Backend</p>
                      <p className="text-sm text-muted-foreground">FastAPI + TensorFlow/PyTorch</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-warning/5 border-warning/20 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-warning/20 rounded-xl">
                  <Shield className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-warning">Important Disclaimer</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This is a <span className="font-semibold text-foreground">research and educational project</span> designed 
                    to demonstrate the potential of AI in medical imaging. It is <span className="font-semibold text-foreground">NOT intended for clinical use</span> or 
                    as a substitute for professional medical advice, diagnosis, or treatment. Always consult 
                    qualified healthcare professionals for medical decisions.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
