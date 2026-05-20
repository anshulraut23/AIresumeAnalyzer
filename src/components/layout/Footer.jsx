import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-800 mt-20 bg-background">
      <div className="container-center py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-2">Resume Analyzer</h3>
            <p className="text-sm text-zinc-500">
              AI-powered tool to optimize your resume for ATS systems.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm text-zinc-500">
          <p>&copy; {currentYear} Resume Analyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
