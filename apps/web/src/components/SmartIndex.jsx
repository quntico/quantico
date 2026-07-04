import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'inicio', label: 'Inicio', num: '01' },
  { id: 'capacidades', label: 'Capacidades', num: '02' },
  { id: 'nosotros', label: 'Nosotros', num: '03' },
  { id: 'plataforma', label: 'Plataforma', num: '04' },
  { id: 'soluciones', label: 'Soluciones', num: '05' },
  { id: 'sistemas', label: 'Sistemas', num: '06' },
  { id: 'equipos', label: 'Equipos', num: '07' },
  { id: 'tecnologia', label: 'Tecnología', num: '08' },
  { id: 'industrias', label: 'Industrias', num: '09' },
  { id: 'casos-de-uso', label: 'Casos de Uso', num: '10' },
  { id: 'implementacion', label: 'Implementación', num: '11' },
  { id: 'contacto', label: 'Contacto', num: '12' },
];

function SmartIndex() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Monitor scroll for progress and showing/hiding the index (hide in hero top)
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }

      // Hide index when at the very top of the hero
      setIsVisible(currentScroll > window.innerHeight * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer to track which section is currently active
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // trigger when section occupies central viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex items-center pl-8"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Expanded panel (labels) */}
          <motion.div
            animate={{ width: isExpanded ? '200px' : '0px', opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden mr-4 bg-[#020409]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl flex flex-col p-4 space-y-2 select-none"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <span className="text-[10px] font-logo tracking-widest text-[#8CFF00] font-bold uppercase">Índice Operativo</span>
              <span className="text-[10px] font-title text-muted-foreground">{Math.round(scrollProgress)}%</span>
            </div>
            
            <div className="flex flex-col space-y-1 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleScrollTo(sec.id)}
                    className={`flex items-center text-left text-[11px] font-medium tracking-wide uppercase py-1 px-2 rounded transition-all duration-300 group ${
                      isActive 
                        ? 'bg-[#8CFF00]/10 text-[#8CFF00] font-bold border-l border-[#8CFF00]' 
                        : 'text-[#8A8F98] hover:text-white hover:bg-white/5 border-l border-transparent'
                    }`}
                  >
                    <span className={`text-[9px] mr-2 opacity-50 font-logo ${isActive ? 'text-[#8CFF00] opacity-100' : ''}`}>
                      {sec.num}
                    </span>
                    <span className="truncate">{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Minimalist vertical tracker line & dots */}
          <div className="relative flex flex-col items-center py-4 px-3 bg-[#020409]/70 backdrop-blur-sm border border-white/10 rounded-full shadow-lg hover:border-[#8CFF00]/40 transition-colors duration-300">
            {/* Scroll progress bar overlay */}
            <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 z-0"></div>
            <div 
              className="absolute top-0 w-[1.5px] bg-[#8CFF00] z-0 transition-all duration-100"
              style={{ height: `${scrollProgress}%` }}
            ></div>

            {/* Dots */}
            <div className="relative z-10 flex flex-col justify-between items-center space-y-4">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleScrollTo(sec.id)}
                    className="group relative flex items-center justify-center p-1"
                    title={sec.label}
                  >
                    {/* Glowing outer ring for active section */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDotRing"
                        className="absolute w-5 h-5 rounded-full border border-[#8CFF00]/40 bg-[#8CFF00]/10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Inner core dot */}
                    <div 
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#8CFF00] scale-125 shadow-[0_0_8px_#8CFF00]' 
                          : 'bg-white/30 group-hover:bg-white group-hover:scale-110'
                      }`}
                    />

                    {/* Tooltip on non-expanded state */}
                    {!isExpanded && (
                      <div className="absolute right-8 pointer-events-none opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-[#020409]/90 border border-white/10 px-2 py-1 rounded text-[9px] uppercase tracking-wider text-white whitespace-nowrap shadow-xl">
                        {sec.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SmartIndex;
