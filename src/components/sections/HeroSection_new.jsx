export default function HeroSection({ onStartClick }) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          AI Resume Analyzer
        </h1>
        <p className="text-lg text-zinc-400">
          Get your resume ATS-optimized. Upload a PDF and compare it against any job description.
        </p>
      </div>
      <button
        onClick={onStartClick}
        className="w-fit px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
      >
        Analyze Now
      </button>
    </div>
  );
}
