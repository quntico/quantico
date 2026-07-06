import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Brain, Zap, Video, Headset, ClipboardList, Car, Video as Camera, Clock, Activity } from 'lucide-react';

function SystemDetailModal({ isOpen, onClose, system }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!system) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#020409] flex flex-col overflow-y-auto"
        >
          {/* Header */}
          <header className="w-full flex items-center justify-between p-6 lg:p-10 relative z-20">
            <div className="flex flex-col gap-2">
              <span className="font-logo text-xl tracking-[0.3em] text-white">QUANTICO</span>
              <div className="flex items-center gap-3 text-[9px] tracking-[0.2em] font-bold text-[#8A8F98]">
                <span>INTELLIGENCE</span>
                <span style={{ color: system.color }}>•</span>
                <span>SECURITY</span>
                <span style={{ color: system.color }}>•</span>
                <span>AUTOMATION</span>
                <span style={{ color: system.color }}>•</span>
                <span>RESILIENCE</span>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-black/20 backdrop-blur-sm"
            >
              <X size={24} />
            </button>
          </header>

          {/* Main Content */}
          <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row relative z-10 px-6 lg:px-10 pb-10">
            
            {/* Right side background image (Control Room) */}
            <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full opacity-30 lg:opacity-100 z-0 pointer-events-none">
               <img 
                 src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                 alt="Control Room Background" 
                 className="w-full h-full object-cover object-right"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-[#020409] via-[#020409]/90 to-transparent lg:via-[#020409]/80" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#020409] via-transparent to-[#020409]/40" />
            </div>

            {/* Left Content Area */}
            <div className="w-full lg:w-[65%] flex flex-col justify-center relative z-10 pt-10 lg:pt-0">
              
              {/* Title Section */}
              <div className="flex items-start gap-6 mb-8">
                <span className="font-mono text-7xl lg:text-9xl font-bold leading-none tracking-tighter" style={{ color: system.color }}>
                  {system.num}
                </span>
                <div className="flex flex-col justify-center pt-2 lg:pt-4">
                  <h1 className="font-title text-5xl lg:text-7xl text-white leading-[1] tracking-wide uppercase">
                    {system.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                  </h1>
                </div>
              </div>
              
              <div className="w-16 h-1 mb-10" style={{ backgroundColor: system.color }} />

              <p className="text-[#8A8F98] text-lg lg:text-xl max-w-xl mb-12 leading-relaxed">
                {system.title.includes('GOV') ? 'Centro de comando para seguridad pública, movilidad y emergencias.' : system.desc}
              </p>

              {/* Three Pillars */}
              <div className="grid grid-cols-3 max-w-2xl mb-16">
                <div className="flex flex-col items-center text-center gap-4 p-4 border-r border-white/10">
                  <ShieldCheck size={36} style={{ color: system.color }} strokeWidth={1.2} />
                  <span className="text-sm text-white/80 font-medium">Monitoreo<br/>unificado</span>
                </div>
                <div className="flex flex-col items-center text-center gap-4 p-4 border-r border-white/10">
                  <Brain size={36} style={{ color: system.color }} strokeWidth={1.2} />
                  <span className="text-sm text-white/80 font-medium">Analítica<br/>IA</span>
                </div>
                <div className="flex flex-col items-center text-center gap-4 p-4">
                  <Zap size={36} style={{ color: system.color }} strokeWidth={1.2} />
                  <span className="text-sm text-white/80 font-medium">Respuesta<br/>coordinada</span>
                </div>
              </div>

              {/* Data Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-t border-white/10 pt-10">
                {/* Capacidades */}
                <div>
                  <h4 className="text-[10px] tracking-widest font-bold mb-6 uppercase" style={{ color: system.color }}>Capacidades</h4>
                  <ul className="flex flex-col gap-4 text-sm text-[#8A8F98]">
                    <li className="flex items-center gap-3"><Video size={16} className="text-white/40" /> Videovigilancia inteligente</li>
                    <li className="flex items-center gap-3"><Headset size={16} className="text-white/40" /> Despacho y coordinación</li>
                    <li className="flex items-center gap-3"><ClipboardList size={16} className="text-white/40" /> Gestión de incidentes</li>
                    <li className="flex items-center gap-3"><Car size={16} className="text-white/40" /> Movilidad y tránsito</li>
                  </ul>
                </div>
                {/* Integra */}
                <div>
                  <h4 className="text-[10px] tracking-widest font-bold mb-6 uppercase" style={{ color: system.color }}>Integra</h4>
                  <p className="text-sm text-[#8A8F98] leading-loose max-w-[200px]">
                    CCTV + IA • LPR • GIS • CAD/911 • Drones • Radios • Sensores IoT
                  </p>
                </div>
                {/* Caso de Uso */}
                <div>
                  <h4 className="text-[10px] tracking-widest font-bold mb-6 uppercase" style={{ color: system.color }}>Caso de Uso</h4>
                  <p className="text-sm text-[#8A8F98] leading-relaxed max-w-[250px]">
                    Centro municipal para coordinar tráfico, incidentes y servicios de emergencia en tiempo real.
                  </p>
                </div>
              </div>

              {/* Metrics Footer */}
              <div className="flex flex-wrap items-center gap-12 border-t border-white/10 pt-8 mt-auto">
                <div className="flex items-center gap-4">
                  <Camera size={36} style={{ color: system.color }} strokeWidth={1} />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#8A8F98] tracking-widest uppercase mb-1">Cámaras Integradas</span>
                    <span className="text-2xl text-white font-mono">1,845</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock size={36} style={{ color: system.color }} strokeWidth={1} />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#8A8F98] tracking-widest uppercase mb-1">Respuesta</span>
                    <span className="text-2xl text-white font-mono">&lt; 3 min</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Activity size={36} style={{ color: system.color }} strokeWidth={1} />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#8A8F98] tracking-widest uppercase mb-1">Disponibilidad</span>
                    <span className="text-2xl text-white font-mono">99.9%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SystemDetailModal;
