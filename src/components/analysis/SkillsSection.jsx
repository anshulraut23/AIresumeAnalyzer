import { Tag, AlertTriangle } from 'lucide-react';

export default function SkillsSection({ missingSkills, recommendedKeywords }) {
  const SkillTag = ({ skill, color = 'red' }) => {
    const colorMap = {
      red: 'bg-red-500/10 border-red-700 text-red-300',
      violet: 'bg-violet-500/10 border-violet-700 text-violet-300',
    };
    return (
      <span className={`px-3 py-1.5 rounded-none text-sm font-medium border ${colorMap[color]}`}>
        {skill}
      </span>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Missing Skills */}
      <div className="bg-red-500/10 border border-red-700 rounded-none p-6 space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Missing Critical Skills</h3>
        </div>
        {missingSkills && missingSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, i) => (
              <SkillTag key={i} skill={skill} color="red" />
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">No missing skills found.</p>
        )}
      </div>

      {/* Recommended Keywords */}
      <div className="bg-violet-500/10 border border-violet-700 rounded-none p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Recommended Keywords</h3>
        </div>
        {recommendedKeywords && recommendedKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {recommendedKeywords.map((keyword, i) => (
              <SkillTag key={i} skill={keyword} color="violet" />
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">No recommended keywords detected.</p>
        )}
      </div>
    </div>
  );
}
