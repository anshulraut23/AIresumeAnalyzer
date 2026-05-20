import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onStartClick }) {
  return (
    <div className="flex flex-col space-y-6 py-4">
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          AI Resume Analyzer
        </h1>
        <p className="text-lg text-zinc-400">
          Upload your resume and compare it against job descriptions. Get your ATS score and actionable insights instantly.
        </p>
      </div>
      <div>
        <button
          onClick={onStartClick}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-zinc-200 text-black font-semibold uppercase tracking-wider text-sm rounded-none transition-all duration-300"
        >
          Analyze Resume <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
