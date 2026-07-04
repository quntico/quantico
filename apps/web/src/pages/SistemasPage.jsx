
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MonitorPlay, Radar, Lock, Zap, Activity, Eye, ShieldAlert, Database, Check } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const systems = [
  { icon: MonitorPlay, title: 'Centros de control', desc: 'Videowalls, consolas ergonómicas y software NOC/SOC integrado. Entorno maestro para visualización operativa.', features: ['Gestión de Video (VMS)', 'Mapeo GIS/BIM', 'Consolas Multi-operador'] },
  { icon: Radar, title: 'Seguridad perimetral', desc: 'Radares, sensores sísmicos de fibra óptica y barreras físicas activas que neutralizan intrusiones antes de que alcancen zonas sensibles.', features: ['Radares de Tierra', 'Fibra Sensible', 'Bolardos Automáticos'] },
  { icon: Lock, title: 'Ciberseguridad industrial', desc: 'Protección especializada de redes SCADA y PLCs, aislando redes operativas (OT) de las corporativas (IT).', features: ['Diodos de Datos Unidireccionales', 'DPI Industrial', 'Firewalls Robustos'] },
  { icon: Zap, title: 'Automatización OT/IT', desc: 'Puentes seguros y bidireccionales entre el piso de planta industrial y los sistemas administrativos corporativos ERP.', features: ['Integración Modbus/OPC', 'Controladores Lógicos', 'Gateways de Borde (Edge)'] },
  { icon: Activity, title: 'Monitoreo ambiental', desc: 'Estaciones meteorológicas y sensores de interiores para gas, temperatura, humedad y calidad de aire.', features: ['Detección de Fugas', 'Índices AQI', 'Cierre de Válvulas'] },
  { icon: Eye, title: 'Videovigilancia inteligente', desc: 'Cámaras térmicas y de alta resolución procesadas por IA en borde para detección de anomalías sin necesidad de humanos.', features: ['LPR (Matrículas)', 'Búsqueda Forense', 'Análisis de Multitudes'] },
  { icon: ShieldAlert, title: 'Respuesta y contingencia', desc: 'Integración con sistemas de alarma temprana, supresión de incendios y notificación masiva para evacuaciones.', features: ['Sirenas IP', 'Estrobos Inteligentes', 'Megafonía IP'] },
  { icon: Database, title: 'Integración de datos', desc: 'Arquitectura de Data Lakes industriales diseñados para alta concurrencia de telemetría y logs operacionales.', features: ['Bases de Datos de Series Temporales', 'Correlación de Logs', 'Cuadros de Mando'] },
];

function SistemasPage() {
  return (
    <>
      <Helmet>
        <title>QUANTICO | Sistemas</title>
        <meta name="description" content="Sistemas complejos llave en mano para operaciones críticas." />
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
              SISTEMAS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-title text-xl md:text-2xl text-[#8A8F98] mb-8 tracking-widest uppercase text-balance"
            >
              Sistemas complejos llave en mano.
            </motion.p>
          </div>
        </section>

        {/* SYSTEMS GRID */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systems.map((sys) => {
                const Icon = sys.icon;
                return (
                  <div key={sys.title} className="glass-card p-8 flex flex-col group">
                    <div className="w-14 h-14 rounded bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-[#8CFF00]/50 transition-colors">
                      <Icon className="w-7 h-7 text-[#8CFF00]" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-title text-2xl text-white mb-4 tracking-wide">{sys.title}</h4>
                    <p className="text-sm text-[#8A8F98] leading-relaxed mb-6 flex-grow">{sys.desc}</p>
                    <ul className="space-y-3 pt-6 border-t border-white/10">
                      {sys.features.map(feat => (
                        <li key={feat} className="text-xs text-[#B8BDC7] flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#8CFF00] shrink-0" />
                          <span>{feat}</span>
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

export default SistemasPage;
