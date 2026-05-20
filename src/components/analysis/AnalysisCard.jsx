export default function AnalysisCard({ title, items, icon: Icon, colorClass }) {
  const emptyMessage = () => {
    const t = title?.toLowerCase() || '';
    if (t.includes('weak')) return 'No major weaknesses detected.';
    if (t.includes('strength')) return 'No notable strengths detected.';
    if (t.includes('missing')) return 'No missing skills found.';
    if (t.includes('suggest')) return 'No suggestions at this time.';
    if (t.includes('keyword')) return 'No keywords available.';
    return 'No items found.';
  };

  const getColor = () => {
    if (colorClass?.includes('green')) return { bg: 'bg-emerald-500/10', border: 'border-emerald-700', text: 'text-emerald-400' };
    if (colorClass?.includes('red')) return { bg: 'bg-red-500/10', border: 'border-red-700', text: 'text-red-400' };
    if (colorClass?.includes('yellow')) return { bg: 'bg-amber-500/10', border: 'border-amber-700', text: 'text-amber-400' };
    return { bg: 'bg-blue-500/10', border: 'border-blue-700', text: 'text-blue-400' };
  };

  const colors = getColor();

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-none p-6 space-y-4`}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className={`w-5 h-5 ${colors.text}`} />}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      
      {!items || items.length === 0 ? (
        <p className="text-sm text-zinc-400">{emptyMessage()}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex gap-3 text-sm text-zinc-300">
              <span className={`w-2 h-2 rounded-none shrink-0 mt-1.5 ${colors.text}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
