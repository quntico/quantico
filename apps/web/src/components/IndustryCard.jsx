import React from 'react';

function IndustryCard({ icon: Icon, name }) {
  return (
    <div className="glass-card p-6 flex flex-col items-center justify-center text-center group min-h-[140px]">
      <Icon className="w-8 h-8 text-[#8CFF00] mb-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
      <h4 className="font-title text-sm md:text-base text-white tracking-widest">{name}</h4>
    </div>
  );
}

export default IndustryCard;