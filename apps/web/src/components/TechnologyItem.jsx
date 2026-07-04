import React from 'react';

function TechnologyItem({ icon: Icon, name }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#020409] border border-white/5 hover:border-[#8CFF00]/30 hover:bg-white/[0.02] transition-all duration-300 group">
      <Icon className="w-8 h-8 text-[#B8BDC7] mb-4 group-hover:text-[#8CFF00] transition-colors" strokeWidth={1} />
      <span className="font-title text-sm text-white tracking-widest text-center">{name}</span>
    </div>
  );
}

export default TechnologyItem;