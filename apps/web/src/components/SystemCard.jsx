import React from 'react';

function SystemCard({ num, title, description, desc, icon: Icon, color = '#78FF00' }) {
  const displayDesc = description || desc;
  const formattedTitle = title.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < title.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div 
      className="relative p-4 sm:p-5 flex flex-col group overflow-hidden border transition-all duration-500 min-h-[210px] sm:min-h-[230px]"
      style={{
        backgroundColor: '#020409',
        borderColor: 'rgba(255, 255, 255, 0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 10px 40px -10px ${color}30, inset 0 0 20px -5px ${color}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Background Graphic / Glow */}
      <div 
        className="absolute bottom-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[50px] pointer-events-none"
        style={{ backgroundColor: color }}
      />
      
      {/* Background Grid Pattern (subtle) */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none mix-blend-overlay bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      {/* Large faint icon as background on the right */}
      {Icon && (
        <div className="absolute -right-2 -bottom-2 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-6">
          <Icon size={140} style={{ color: color }} strokeWidth={1} />
        </div>
      )}

      {/* Top Left Number & Line */}
      <div className="mb-3 relative z-10 flex flex-col items-start gap-1">
        <span className="font-mono text-[10px] tracking-widest font-bold" style={{ color: color }}>
          {num}
        </span>
        <div className="h-[2px] w-4 transition-all duration-500 group-hover:w-6" style={{ backgroundColor: color }} />
      </div>

      {/* Title */}
      <h3 className="font-title text-lg sm:text-xl text-white mb-2 tracking-wide leading-[1.1] relative z-10 uppercase">
        {formattedTitle}
      </h3>

      {/* Description */}
      <p className="text-[10px] sm:text-xs text-[#8A8F98] max-w-[95%] sm:max-w-[85%] leading-snug relative z-10 mb-4">
        {displayDesc}
      </p>

      {/* Bottom Layout - Icon, Quantico, Line */}
      <div className="mt-auto relative z-10 flex flex-col gap-3">
        {/* Icon outline */}
        {Icon && (
          <div className="flex items-center justify-start transition-transform duration-500 group-hover:-translate-y-1">
            <Icon size={20} style={{ color: color }} strokeWidth={1.5} />
          </div>
        )}
        
        {/* Footer line */}
        <div className="flex items-center justify-between w-full mt-1 pt-2 border-t border-white/5">
          <span className="font-logo text-[7px] tracking-[0.3em] text-white/30 font-bold uppercase transition-colors duration-300 group-hover:text-white/50">QUANTICO</span>
          <div className="h-[1.5px] w-4 opacity-30 transition-all duration-500 group-hover:opacity-100 group-hover:w-6" style={{ backgroundColor: color }} />
        </div>
      </div>
    </div>
  );
}

export default SystemCard;