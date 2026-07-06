import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Brain, Zap, Video, Headset, ClipboardList, Car, Video as Camera, Clock, Activity, Camera as PhotoCamera } from 'lucide-react';

function SystemDetailModal({ isOpen, onClose, system, isAdmin, config, onMediaUpload }) {
  const fileInputRef = React.useRef(null);
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

  const systemMediaKey = `system_${system.num}`;
  const mediaUrl = config?.[`${systemMediaKey}Url`] || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";
  const mediaType = config?.[`${systemMediaKey}Type`] || 'image';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm overflow-hidden" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1400px] h-auto max-h-[90vh] bg-[#020409]/80 backdrop-blur-2xl flex flex-col overflow-hidden border rounded-2xl"
            style={{ 
              borderColor: `${system.color}20`,
              boxShadow: `0 0 20px ${system.color}15, 0 0 40px ${system.color}05` 
            }}
          >
          {/* Header */}
          <header className="w-full flex items-center justify-between p-4 lg:p-6 relative z-20">
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
            <div className="flex items-center gap-4">
              {isAdmin && (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const isVideo = file.type.startsWith('video/');
                        onMediaUpload(systemMediaKey, file, isVideo);
                      }
                    }}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-black/50 hover:bg-black text-white px-4 py-2 rounded-full border border-white/20 hover:border-white/50 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    <PhotoCamera size={16} /> <span className="hidden sm:inline">Fondo</span>
                  </button>
                </div>
              )}
              <button 
                onClick={onClose}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-black/20 backdrop-blur-sm"
              >
                <X size={20} className="lg:hidden" />
                <X size={24} className="hidden lg:block" />
              </button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 w-full flex flex-col lg:flex-row relative z-10 px-6 lg:px-10 pb-6 lg:pb-8">
            
            {/* Right side background image (Control Room) */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
              className="absolute top-0 right-0 w-full lg:w-[55%] h-full opacity-30 lg:opacity-100 z-0 pointer-events-none"
            >
               {mediaType === 'video' || mediaUrl.includes('.mp4') || mediaUrl.includes('.webm') ? (
                 <video src={mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover object-right" />
               ) : (
                 <img src={mediaUrl} alt={`${system?.title} Background`} className="w-full h-full object-cover object-right" />
               )}
               <div className="absolute inset-0 bg-gradient-to-r from-[#020409]/80 via-[#020409]/70 to-transparent lg:via-[#020409]/60" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#020409]/80 via-transparent to-[#020409]/20" />
            </motion.div>

            {/* Left Content Area */}
            <div className="w-full lg:w-[65%] flex flex-col justify-center relative z-10 pt-2 lg:pt-0">
              
              {/* Title Section */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                <div className="flex items-start gap-4 mb-2">
                  <span className="font-mono text-5xl lg:text-7xl font-bold leading-none tracking-tighter" style={{ color: system.color }}>
                    {system.num}
                  </span>
                  <div className="flex flex-col justify-center pt-1">
                    <h1 className="font-title text-3xl lg:text-5xl text-white leading-[1] tracking-wide uppercase">
                      {system.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </h1>
                  </div>
                </div>
                
                <div className="w-10 h-1 mb-4" style={{ backgroundColor: system.color }} />

                <p className="text-[#8A8F98] text-sm lg:text-base max-w-xl mb-6 leading-relaxed">
                  {system.title.includes('GOV') ? 'Centro de comando para seguridad pública, movilidad y emergencias.' : system.desc}
                </p>
              </motion.div>

              {/* Three Pillars */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
                className="grid grid-cols-3 max-w-2xl mb-6"
              >
                <div className="flex flex-col items-center text-center gap-3 p-2 border-r border-white/10">
                  <ShieldCheck size={28} style={{ color: system.color }} strokeWidth={1.5} />
                  <span className="text-xs text-white/80 font-medium">Monitoreo<br/>unificado</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3 p-2 border-r border-white/10">
                  <Brain size={28} style={{ color: system.color }} strokeWidth={1.5} />
                  <span className="text-xs text-white/80 font-medium">Analítica<br/>IA</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3 p-2">
                  <Zap size={28} style={{ color: system.color }} strokeWidth={1.5} />
                  <span className="text-xs text-white/80 font-medium">Respuesta<br/>coordinada</span>
                </div>
              </motion.div>

              {/* Data Columns */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 border-t border-white/10 pt-4"
              >
                {/* Capacidades */}
                <div>
                  <h4 className="text-[9px] tracking-widest font-bold mb-4 uppercase" style={{ color: system.color }}>Capacidades</h4>
                  <ul className="flex flex-col gap-3 text-xs text-[#8A8F98]">
                    <li className="flex items-center gap-2"><Video size={14} className="text-white/40" /> Videovigilancia</li>
                    <li className="flex items-center gap-2"><Headset size={14} className="text-white/40" /> Despacho 911</li>
                    <li className="flex items-center gap-2"><ClipboardList size={14} className="text-white/40" /> Gestión incidentes</li>
                  </ul>
                </div>
                {/* Integra */}
                <div>
                  <h4 className="text-[9px] tracking-widest font-bold mb-4 uppercase" style={{ color: system.color }}>Integra</h4>
                  <p className="text-xs text-[#8A8F98] leading-loose max-w-[180px]">
                    CCTV + IA • LPR • GIS • CAD/911 • Drones • Radios
                  </p>
                </div>
                {/* Caso de Uso */}
                <div>
                  <h4 className="text-[9px] tracking-widest font-bold mb-4 uppercase" style={{ color: system.color }}>Caso de Uso</h4>
                  <p className="text-xs text-[#8A8F98] leading-relaxed max-w-[200px]">
                    Centro municipal de control y despacho de emergencias en tiempo real.
                  </p>
                </div>
              </motion.div>

              {/* Metrics Footer */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap items-center gap-10 border-t border-white/10 pt-4 mt-auto"
              >
                <div className="flex items-center gap-3">
                  <Camera size={28} style={{ color: system.color }} strokeWidth={1} />
                  <div className="flex flex-col">
                    <span className="text-[8px] text-[#8A8F98] tracking-widest uppercase mb-1">Cámaras</span>
                    <span className="text-xl text-white font-mono">1,845</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={28} style={{ color: system.color }} strokeWidth={1} />
                  <div className="flex flex-col">
                    <span className="text-[8px] text-[#8A8F98] tracking-widest uppercase mb-1">Respuesta</span>
                    <span className="text-xl text-white font-mono">&lt; 3 min</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Activity size={28} style={{ color: system.color }} strokeWidth={1} />
                  <div className="flex flex-col">
                    <span className="text-[8px] text-[#8A8F98] tracking-widest uppercase mb-1">Uptime</span>
                    <span className="text-xl text-white font-mono">99.9%</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default SystemDetailModal;
