import { Link, useLocation } from "react-router-dom";
import { ScanLine } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-medical rounded-xl group-hover:shadow-glow transition-all duration-300">
              <ScanLine className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">PneumoScan</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/upload" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/upload') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Upload
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/about') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              About
            </Link>
            <Link 
              to="/history" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/history') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              History
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
