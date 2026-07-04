import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function SolutionCard({ number, title, tagline, description }) {
  return (
    <div className="glass-card p-8 flex flex-col h-full group relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#8CFF00] transition-all duration-500 group-hover:w-full"></div>
      
      <div className="mb-6 flex items-baseline justify-between">
        <span className="font-logo text-3xl md:text-4xl text-[#8CFF00] opacity-80 group-hover:opacity-100 transition-opacity">
          {number}
        </span>
      </div>
      
      <h3 className="font-title text-2xl text-white mb-2 tracking-wide">
        {title}
      </h3>
      
      <p className="text-sm font-medium text-[#B8BDC7] mb-4 uppercase tracking-wider">
        {tagline}
      </p>
      
      <p className="text-[#8A8F98] text-sm leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      
      <div className="mt-auto pt-6 border-t border-white/5">
        <Link to="/#contacto" className="inline-flex items-center gap-3 text-xs font-bold text-white uppercase tracking-widest group-hover:text-[#8CFF00] transition-colors">
          Ver solución
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default SolutionCard;