import React from 'react';

function SystemCard({ icon: Icon, title, description }) {
  return (
    <div className="glass-card p-6 flex flex-col items-start group">
      <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:border-[#8CFF00]/30 transition-colors">
        <Icon className="w-6 h-6 text-[#8CFF00]" strokeWidth={1.5} />
      </div>
      <h4 className="font-title text-xl text-white mb-3 tracking-wide">{title}</h4>
      <p className="text-sm text-[#8A8F98] leading-relaxed">{description}</p>
    </div>
  );
}

export default SystemCard;