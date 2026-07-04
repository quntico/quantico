
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const solutions = [
  { num: '01', title: 'SENTINEL', tag: 'Centro de control inteligente', desc: 'Plataforma central unificada que ingiere datos de cientos de sistemas para brindar visibilidad 360. Incluye software, configuración de sensores y diseño de dashboards para operación ininterrumpida 24/7 en salas de crisis.' },
  { num: '02', title: 'RISK ENGINE', tag: 'Motor de análisis de riesgo industrial', desc: 'Motor predictivo impulsado por Machine Learning que evalúa constantemente lecturas de sensores, registros de acceso y eventos climáticos para emitir alertas tempranas y accionar protocolos antes de que ocurra una falla.' },
  { num: '03', title: 'BIOSAFE', tag: 'Bioseguridad y seguridad ambiental', desc: 'Red de monitoreo avanzada que evalúa calidad de aire, detección de gases tóxicos, control de temperatura y variables químicas, garantizando el cumplimiento normativo y la salud del personal.' },
  { num: '04', title: 'SHIELD', tag: 'Seguridad física autónoma', desc: 'Sistema integral de protección patrimonial combinando cámaras PTZ de alta resolución, analítica de video, control biométrico de acceso y barreras físicas inteligentes gestionadas desde la nube.' },
  { num: '05', title: 'CYBER', tag: 'Ciberseguridad OT + IT', desc: 'Arquitectura de defensa en profundidad diseñada para proteger la red corporativa (IT) y la red de control industrial (OT), bloqueando intrusiones, ransonware y ataques a SCADAs o PLCs críticos.' },
  { num: '06', title: 'FLOW', tag: 'Automatización de procesos', desc: 'Mapeo y digitalización de flujos de trabajo manuales mediante RPA y aplicaciones nativas. Automatiza la generación de reportes, órdenes de mantenimiento y respuesta a incidentes de bajo nivel.' },
  { num: '07', title: 'MOBILITY', tag: 'Robots y drones autónomos', desc: 'Flotas de Autonomous Mobile Robots (AMRs) y drones programados para patrullaje perimetral constante, inspección térmica de maquinaria y operaciones en entornos hostiles para el ser humano.' },
  { num: '08', title: 'RESPONSE', tag: 'Continuidad operativa y contingencia', desc: 'Framework digital de Procedimientos Operativos Estándar (SOPs). En caso de emergencia, guía paso a paso la evacuación, control de daños, despliegue de brigadas y recuperación del sitio.' },
  { num: '09', title: 'ANALYTICS', tag: 'Analítica avanzada e inteligencia de datos', desc: 'Extracción de valor sobre históricos operativos. Generación de predicciones de demanda, optimización de mantenimiento preventivo y descubrimiento de ineficiencias mediante Data Lakes.' },
  { num: '10', title: 'AI', tag: 'Inteligencia artificial aplicada al negocio', desc: 'Asistentes virtuales entrenados con manuales industriales, algoritmos de visión por computadora personalizados para control de calidad y modelos LLM de uso interno privado.' },
];

function SolucionesPage() {
  return (
    <>
      <Helmet>
        <title>QUANTICO | Soluciones</title>
        <meta name="description" content="Sistemas inteligentes para seguridad, automatización y operaciones críticas." />
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
              SOLUCIONES
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-title text-xl md:text-2xl text-[#8A8F98] mb-8 tracking-widest uppercase text-balance"
            >
              Sistemas inteligentes para seguridad, automatización y operaciones críticas.
            </motion.p>
          </div>
        </section>

        {/* SOLUTIONS GRID */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {solutions.map((sol, index) => (
                <div key={sol.num} className={index >= 8 ? "xl:col-span-2" : ""}>
                  {/* Reuse the logic of SolutionCard but wrapped in Link if we had details pages, 
                      or just an interactive block matching HomePage */}
                  <Link to="/contacto" className="block h-full cursor-pointer group">
                    <div className="glass-card p-8 flex flex-col h-full relative overflow-hidden transition-all duration-400">
                      <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#8CFF00] transition-all duration-500 group-hover:w-full"></div>
                      
                      <div className="mb-6 flex items-baseline justify-between">
                        <span className="font-logo text-3xl md:text-4xl text-[#8CFF00] opacity-80 group-hover:opacity-100 transition-opacity">
                          {sol.num}
                        </span>
                      </div>
                      
                      <h3 className="font-title text-2xl text-white mb-2 tracking-wide">
                        {sol.title}
                      </h3>
                      
                      <p className="text-sm font-medium text-[#B8BDC7] mb-4 uppercase tracking-wider">
                        {sol.tag}
                      </p>
                      
                      <p className="text-[#8A8F98] text-sm leading-relaxed mb-8 flex-grow">
                        {sol.desc}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                        <span className="text-xs font-bold text-white uppercase tracking-widest group-hover:text-[#8CFF00] transition-colors">
                          Explorar
                        </span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#8CFF00] group-hover:bg-[#8CFF00]/10 transition-colors">
                          <ArrowRight className="w-4 h-4 text-white group-hover:text-[#8CFF00] transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default SolucionesPage;
