
import React, { useEffect, useState } from 'react';

interface TextModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  content: string;
}

const TextModal: React.FC<TextModalProps> = ({ isOpen, onClose, title, subtitle, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => {
        document.body.style.overflow = '';
        clearTimeout(timer);
      };
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className={`relative bg-[#0d0d0f] w-full max-w-2xl rounded-[2.5rem] border border-zinc-800 shadow-2xl transition-all duration-500 transform ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'} overflow-hidden`}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-all z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-10 md:p-14 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
            <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">DOCUMENT_V1.0</span>
          </div>

          <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">
            {title}<span className="text-blue-600">.</span>
          </h2>
          
          {subtitle && (
            <p className="text-blue-400/80 italic font-medium mb-8 text-lg">
              "{subtitle}"
            </p>
          )}

          <div className="space-y-6 text-zinc-400 leading-relaxed font-light text-lg whitespace-pre-line">
            {content}
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-900">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl transition-all"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextModal;
