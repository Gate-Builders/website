
import React from 'react';
import { Group } from '../types';

interface GroupCardProps {
  group: Group;
  onClick: (group: Group) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onClick }) => {
  return (
    <div 
      onClick={() => onClick(group)}
      className="group relative h-[380px] bg-zinc-900 rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_20px_rgba(59,130,246,0.3)] border border-zinc-800 hover:border-blue-500/50 isolate will-change-transform transform-gpu"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
        style={{ backgroundImage: `url(${group.imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

      {/* Logo Overlay - Increased by 20% (w-16 to w-20) */}
      <div className="absolute top-6 left-6 w-20 h-20 bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-blue-500/30 flex items-center justify-center p-4 group-hover:border-blue-500 transition-colors duration-500 shadow-2xl">
        <img src={group.logoUrl} alt={`${group.name} logo`} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-4">
          {group.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30 uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors tracking-tight">
          {group.name}
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-all duration-500 line-clamp-2">
          {group.shortDescription}
        </p>
        
        {/* Animated Bottom Bar */}
        <div className="mt-5 w-12 h-1 bg-blue-500/30 rounded-full group-hover:w-full group-hover:bg-blue-500 transition-all duration-700" />
      </div>

      {/* Arrow Indicator */}
      <div className="absolute top-8 right-8 w-10 h-10 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );
};

export default GroupCard;
