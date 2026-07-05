import React from 'react';

function EquipmentCard({ icon: Icon, title, description, desc }) {
  const displayDesc = description || desc;
  return (
    <div className="glass-card p-5 group flex items-center gap-4">
      <div className="w-10 h-10 shrink-0 rounded bg-[#020409] flex items-center justify-center border border-white/10 group-hover:border-[#8CFF00]/50 transition-colors">
        <Icon className="w-5 h-5 text-[#8CFF00]" strokeWidth={1.5} />
      </div>
      <div>
        <h4 className="font-title text-lg text-white mb-1 tracking-wide">{title}</h4>
        {displayDesc && <p className="text-xs text-[#8A8F98] leading-relaxed">{displayDesc}</p>}
      </div>
    </div>
  );
}

export default EquipmentCard;