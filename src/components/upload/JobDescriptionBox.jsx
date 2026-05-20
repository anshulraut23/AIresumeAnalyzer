import { Briefcase } from 'lucide-react';

export default function JobDescriptionBox({ jobDescription, setJobDescription }) {
  return (
    <div className="w-full">
      <label htmlFor="jd-textarea" className="block text-sm font-medium text-zinc-300 mb-3">
        Job Description
      </label>
      <textarea
        id="jd-textarea"
        rows={5}
        className="w-full bg-zinc-900/50 border border-zinc-700 hover:border-zinc-600 rounded-none py-3 px-4 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-colors resize-none"
        placeholder="Paste the job description here to get personalized recommendations..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <p className="text-xs text-zinc-500 mt-2">Required: paste to get customized insights</p>
    </div>
  );
}
