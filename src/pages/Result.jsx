import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, FileText } from 'lucide-react';
import ScoreCircle from '../components/analysis/ScoreCircle';
import AnalysisCard from '../components/analysis/AnalysisCard';
import SkillsSection from '../components/analysis/SkillsSection';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis;

  if (!analysis || Object.keys(analysis).length === 0) {
    return <Navigate to="/" replace />;
  }

  const { score, missingSkills, strengths, weaknesses, suggestions, recommendedKeywords, summary } = analysis;

  return (
    <div className="flex-1 w-full flex flex-col py-8 pb-16">
      <div className="container-center">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Upload
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Score and Summary */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card rounded-none p-6">
              <ScoreCircle score={score} />
            </div>

            {summary && (
              <div className="card rounded-none p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-white">Summary</h3>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{summary}</p>
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            <SkillsSection missingSkills={missingSkills} recommendedKeywords={recommendedKeywords} />

            <div className="grid md:grid-cols-2 gap-6">
              <AnalysisCard title="Strengths" items={strengths} icon={CheckCircle} colorClass="text-green-400" />
              <AnalysisCard title="Weaknesses" items={weaknesses} icon={XCircle} colorClass="text-red-400" />
            </div>

            <AnalysisCard title="Suggestions" items={suggestions} icon={Lightbulb} colorClass="text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
