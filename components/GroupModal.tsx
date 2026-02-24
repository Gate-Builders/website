
import React, { useEffect, useState } from 'react';
import { ModalProps } from '../types';

const GroupModal: React.FC<ModalProps> = ({ group, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (group) {
      // Prevent scrolling on background when modal is open
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
  }, [group]);

  if (!group) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-start md:items-center justify-center transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl" 
        onClick={onClose}
      />

      {/* Modal Content - Adjusted for 9:12 aspect on desktop, full-height scrollable on mobile */}
      <div className={`relative bg-[#0d0d0f] w-full max-w-4xl md:h-[85vh] h-full overflow-y-auto md:overflow-hidden md:rounded-[3rem] border border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,1)] transition-all duration-500 transform ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'} flex flex-col md:flex-row`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all z-40 backdrop-blur-xl border border-zinc-700/50 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Visual Side (Left/Top) */}
        <div className="w-full md:w-[45%] h-80 md:h-full relative overflow-hidden flex-shrink-0">
          <img 
            src={group.imageUrl} 
            alt={group.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-transparent to-transparent md:hidden" />
          
          {/* Logo Overlay in Modal */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-[#0d0d0f]/60 backdrop-blur-xl rounded-3xl border border-blue-500/40 flex items-center justify-center p-5 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            <img src={group.logoUrl} alt={`${group.name} logo`} className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Content Side (Right/Bottom) */}
        <div className="w-full md:w-[55%] p-8 md:p-14 lg:p-16 flex flex-col h-full bg-zinc-900/10">
          
          {/* Header Section */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] animate-pulse"></div>
              <span className="text-blue-500 text-[10px] md:text-[11px] font-black tracking-[0.5em] uppercase">VERIFIED ENTITY</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-none">
              {group.name}<span className="text-blue-600">.</span>
            </h2>
          </div>
          
          {/* Scrollable Description Container */}
          <div className="flex-grow md:overflow-y-auto custom-scrollbar md:pr-6 mb-6 md:mb-8">
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light whitespace-pre-line">
              {group.longDescription}
            </p>
          </div>

          {/* Gate Address Buttons */}
          {(group.ASN_gateAddress || group.NOVUM_gateAddress) && (
            <div className="flex-shrink-0 flex flex-wrap gap-3 mb-6 md:mb-8">
              {group.ASN_gateAddress && (
                <a
                  href={`https://www.alpha-fox.com/asn/view/${group.ASN_gateAddress.toLowerCase().replace(/ /g, '_')}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-0.5 px-4 py-3 bg-zinc-900/80 border border-zinc-700/60 hover:border-blue-500/60 hover:bg-zinc-800/80 rounded-xl min-w-[140px] transition-all duration-200 group/asn"
                >
                  <span className="text-white group-hover/asn:text-blue-300 font-mono font-bold text-sm tracking-wide transition-colors">/d {group.ASN_gateAddress}</span>
                  <span className="text-zinc-500 text-[9px] uppercase tracking-[0.2em] font-black">ASN Stargate</span>
                </a>
              )}
              {group.NOVUM_gateAddress && (
                <a
                  href={`https://stargatenet.work/profile.php?&gate=${group.NOVUM_gateAddress.replace(/ /g, '+')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-0.5 px-4 py-3 bg-zinc-900/80 border border-zinc-700/60 hover:border-blue-500/60 hover:bg-zinc-800/80 rounded-xl min-w-[140px] transition-all duration-200 group/novum"
                >
                  <span className="text-white group-hover/novum:text-blue-300 font-mono font-bold text-sm tracking-wide transition-colors">/d {group.NOVUM_gateAddress}</span>
                  <span className="text-zinc-500 text-[9px] uppercase tracking-[0.2em] font-black">NOVUM Stargate</span>
                </a>
              )}
            </div>
          )}

          {/* Footer/Action Section */}
          <div className="flex-shrink-0 space-y-6 md:space-y-8">
            <div className="flex flex-wrap gap-3">
              {group.tags.map(tag => (
                <span key={tag} className="text-[10px] md:text-[11px] text-zinc-400 font-black px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-zinc-800/30 border border-zinc-800 uppercase tracking-widest transition-colors hover:border-blue-500/50 hover:text-blue-400">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {group.websiteUrl && (
                <a
                  href={group.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 md:py-4 bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold rounded-[1.5rem] transition-all duration-300 text-xs md:text-sm uppercase tracking-[0.2em]"
                >
                  Visit official website
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              {group.location ? (
                <a
                  href={group.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full py-5 md:py-6 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[1.5rem] transition-all duration-500 shadow-2xl shadow-blue-600/30 active:scale-[0.97] uppercase tracking-[0.3em] text-xs md:text-sm overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Launch Interface
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-4 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </a>
              ) : (
                <div className="inline-flex items-center justify-center w-full py-5 md:py-6 bg-zinc-800/50 text-zinc-600 font-black rounded-[1.5rem] uppercase tracking-[0.3em] text-xs md:text-sm cursor-not-allowed border border-zinc-800">
                  <span className="flex items-center gap-3">
                    Launch Interface
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupModal;
