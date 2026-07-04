
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Factory, Zap, Settings, Truck, Shield, Users, Activity, Database, Map, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const industries = [
  { icon: Factory, name: 'INDUSTRIAL', useCases: ['Prevención de paros', 'Seguridad en planta', 'Mapeo 3D operativo'] },
  { icon: Zap, name: 'ENERGÍA Y OIL/GAS', useCases: ['Detección de fugas', 'Perímetros remotos', 'Zonas ATEX'] },
  { icon: Settings, name: 'MANUFACTURA', useCases: ['Control de calidad IA', 'Seguimiento de flota', 'IoT en líneas'] },
  { icon: Truck, name: 'LOGÍSTICA', useCases: ['Control de patios', 'Trazabilidad', 'Detección de intrusos'] },
  { icon: Shield, name: 'GOBIERNO Y DEFENSA', useCases: ['Seguridad ciudadana', 'C4i / C5', 'Vigilancia autónoma'] },
  { icon: Users, name: 'CORPORATIVO', useCases: ['Control de accesos VIP', 'Salas de crisis', 'Sistemas de evacuación'] },
  { icon: Activity, name: 'SALUD', useCases: ['Bioseguridad', 'Control de medicinas', 'Seguridad de pacientes'] },
  { icon: Database, name: 'ALIMENTOS Y AGRO', useCases: ['Monitoreo térmico', 'Cadena de frío', 'Sanidad ambiental'] },
  { icon: Map, name: 'INFRAESTRUCTURA', useCases: ['Puertos y Aeropuertos', 'Monitoreo de puentes', 'Transporte masivo'] },
  { icon: ShieldAlert, name: 'SEGURIDAD PRIVADA', useCases: ['Rondas con drones', 'Centro de monitoreo', 'Analítica forense'] },
];

function IndustriasPage() {
  return (
    <>
      <Helmet>
        <title>QUANTICO | Industrias</title>
        <meta name="description" content="Diseñado para operaciones donde fallar no es opción." />
      </Helmet>

      <Header />

      <main className="bg-[#020409] text-white selection:bg-[#8CFF00] selection:text-black min-h-screen">
        
        {/* HERO */}
        <section className="hero-background min-h-[60dvh] flex items-center justify-center border-b border-white/5 pt-20">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="font-logo text-5xl md:text-7xl text-white mb-6 tracking-[0.15em] glow-text"
            >
              INDUSTRIAS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-title text-xl md:text-2xl text-[#8A8F98] mb-8 tracking-widest uppercase text-balance"
            >
              Diseñado para operaciones donde fallar no es opción.
            </motion.p>
          </div>
        </section>

        {/* INDUSTRIES GRID */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {industries.map((ind) => {
                const Icon = ind.icon;
                return (
                  <div key={ind.name} className="glass-card p-8 flex flex-col items-center text-center group">
                    <Icon className="w-12 h-12 text-[#8CFF00] mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1.2} />
                    <h4 className="font-title text-lg md:text-xl text-white tracking-widest mb-6">{ind.name}</h4>
                    
                    <ul className="w-full text-left space-y-3 border-t border-white/10 pt-6 mt-auto">
                      {ind.useCases.map((uc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#8A8F98]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8CFF00] shrink-0 mt-0.5" />
                          <span>{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default IndustriasPage;
