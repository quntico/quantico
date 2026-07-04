
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const useCases = [
  { title: 'Monitoreo de plantas industriales', desc: 'Unificación de 400+ cámaras, sensores de temperatura y control de acceso en una única sala de control. Reducción de tiempos de respuesta en 60%.', solution: 'SENTINEL + SHIELD' },
  { title: 'Seguridad perimetral autónoma', desc: 'Integración de radares y cámaras térmicas para vigilar perímetros de 20km en refinerías, con clasificación IA humana vs. fauna.', solution: 'SHIELD + AI' },
  { title: 'Centro de control corporativo', desc: 'Diseño llave en mano de Global SOC/NOC conectando 12 sucursales multinacionales, gestión de crisis y video Wall integrados.', solution: 'SENTINEL' },
  { title: 'Ciberseguridad OT/IT', desc: 'Aislamiento de red SCADA en generadora eléctrica. Bloqueo de vectores de ataque de ransomware y visibilidad total de activos.', solution: 'CYBER' },
  { title: 'Automatización de reportes', desc: 'RPA que extrae métricas de sistemas heredados cada 10 min. Eliminó 40 horas mensuales de captura manual.', solution: 'FLOW' },
  { title: 'Detección de anomalías térmicas', desc: 'Prevención de incendios en depósitos de baterías usando cámaras radiométricas y alarmas automatizadas.', solution: 'BIOSAFE + RISK ENGINE' },
  { title: 'Patrullaje con drones', desc: 'Automatización de rondas de vigilancia aérea con bases de recarga, transmitiendo video y alertas 4G directo al centro.', solution: 'MOBILITY' },
  { title: 'Supervisión energética', desc: 'Monitoreo de consumo y calidad de energía (Armónicos) en tiempo real, evitando multas y paros no programados.', solution: 'ANALYTICS' },
];

function CasosDeUsoPage() {
  return (
    <>
      <Helmet>
        <title>QUANTICO | Casos de Uso</title>
        <meta name="description" content="Casos de uso reales de la plataforma QUANTICO." />
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
              CASOS DE USO
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-title text-xl md:text-2xl text-[#8A8F98] mb-8 tracking-widest uppercase text-balance"
            >
              Casos de uso reales.
            </motion.p>
          </div>
        </section>

        {/* USE CASES GRID */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((uc, i) => (
                <div key={i} className="glass-card p-8 flex flex-col h-full hover:border-[#8CFF00]/40 transition-colors">
                  <h3 className="font-title text-xl text-white mb-4 leading-snug">{uc.title}</h3>
                  <p className="text-sm text-[#8A8F98] leading-relaxed mb-8 flex-grow">{uc.desc}</p>
                  
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#8CFF00] tracking-widest uppercase py-1 px-3 bg-[#8CFF00]/10 rounded-full">
                      {uc.solution}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-20 text-center">
              <a href="/contacto" className="inline-flex items-center gap-4 bg-transparent border border-white/20 text-white font-title tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 px-8 py-4 uppercase">
                Ver implementaciones detalladas
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default CasosDeUsoPage;
