export default function ScoreCircle({ score }) {
  let color = 'text-emerald-400';
  let stroke = '#10b981';
  
  if (score <= 40) {
    color = 'text-red-400';
    stroke = '#f87171';
  } else if (score <= 70) {
    color = 'text-amber-400';
    stroke = '#fb923c';
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-6">
      <div className="relative flex items-center justify-center w-48 h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={radius} fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke={stroke}
            strokeWidth="8"
            strokeLinecap="square"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-5xl font-bold ${color}`}>{score}</span>
          <span className="text-zinc-500 text-sm">out of 100</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-white">ATS Score</h3>
        <p className="text-sm text-zinc-400 max-w-xs">
          {score >= 80 ? 'Excellent score. Your resume is well-optimized.' : 
           score >= 60 ? 'Good score. Review recommendations to improve.' :
           'Consider the suggestions below to improve your score.'}
        </p>
      </div>
    </div>
  );
}
