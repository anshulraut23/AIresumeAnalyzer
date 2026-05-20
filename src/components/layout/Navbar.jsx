import { FileText, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-background/95 backdrop-blur">
      <div className="container-center h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-zinc-800 p-2 rounded-none">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg">Resume Analyzer</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/" 
            className="px-4 py-2 text-sm font-medium rounded-none hover:bg-zinc-800 transition-colors"
          >
            Home
          </Link>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-background">
          <div className="container-center py-4 flex flex-col gap-3">
            <Link 
              to="/" 
              className="px-4 py-2 text-sm font-medium rounded-none hover:bg-zinc-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
