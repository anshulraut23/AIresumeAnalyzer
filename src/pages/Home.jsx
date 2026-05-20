import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import HeroSection from '../components/sections/HeroSection';
import UploadBox from '../components/upload/UploadBox';
import JobDescriptionBox from '../components/upload/JobDescriptionBox';
import { analyzeResume } from '../services/api';

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setAlert(null);

    if (!file) {
      setAlert({ type: 'error', message: 'Please upload your resume (PDF).' });
      return;
    }
    if (file.type !== 'application/pdf') {
      setAlert({ type: 'error', message: 'Only PDF files are allowed.' });
      return;
    }
    if (!jobDescription || jobDescription.trim().length === 0) {
      setAlert({ type: 'error', message: 'Please paste the job description to get tailored recommendations.' });
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobDescription', jobDescription);

      const response = await analyzeResume(formData);
      navigate('/result', { state: { analysis: response } });
    } catch (error) {
      console.error('Analyze error:', error);
      setAlert({ type: 'error', message: error.message || 'Analysis failed. Please try again.' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scrollToUpload = () => {
    document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-center">
      <section className="py-12 md:py-16 my-auto">
        <div className="container-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <HeroSection onStartClick={scrollToUpload} />

            <div id="upload-section" className="space-y-6">
              <div className="card rounded-none p-8 space-y-6">
                <h2 className="text-2xl font-bold text-white">Analyze Your Resume</h2>

                {alert && (
                  <div className={`p-4 rounded-none ${alert.type === 'error' ? 'bg-red-500/10 border border-red-700 text-red-100' : 'bg-green-500/10 border border-green-700 text-green-100'}`}>
                    <p className="font-medium">{alert.message}</p>
                  </div>
                )}

                <UploadBox file={file} setFile={setFile} />
                <JobDescriptionBox jobDescription={jobDescription} setJobDescription={setJobDescription} />

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !file}
                  className={`w-full py-3.5 rounded-none font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    !file 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700' 
                      : 'bg-white hover:bg-zinc-200 text-black border border-white'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Resume'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
