import { useCallback } from 'react';
import { UploadCloud, File, X } from 'lucide-react';

export default function UploadBox({ file, setFile }) {
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        alert('Please upload a PDF file.');
      }
    }
  }, [setFile]);

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Please upload a PDF file.');
      }
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-zinc-300 mb-3">Resume (PDF)</label>
      {!file ? (
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          className="border-2 border-dashed border-zinc-700 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-900 rounded-none p-8 flex flex-col items-center justify-center cursor-pointer transition-colors"
        >
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            id="resume-upload"
            onChange={onFileChange}
          />
          <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center w-full">
            <div className="p-3 rounded-none mb-3 text-zinc-400 bg-zinc-800">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-zinc-200 font-medium mb-1">Click or drag to upload</p>
            <p className="text-zinc-500 text-sm">PDF up to 10MB</p>
          </label>
        </div>
      ) : (
        <div className="border border-zinc-700 rounded-none p-4 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-3 overflow-hidden flex-1">
            <div className="bg-zinc-800 p-2 rounded-none text-zinc-400 shrink-0">
              <File className="w-5 h-5" />
            </div>
            <div className="truncate">
              <p className="text-zinc-200 font-medium truncate">{file.name}</p>
              <p className="text-zinc-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            onClick={() => setFile(null)}
            className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-none transition-colors shrink-0 ml-2"
            title="Remove file"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
