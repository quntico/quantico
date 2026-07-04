
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Eye, Brain, Server, Database, Network, Cpu, Factory, BarChart3, Zap, Lock } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const stack = [
  { icon: Eye, name: 'IA VISUAL', specs: ['Deep Learning', 'Reconocimiento Facial', 'Lectura LPR', 'Análisis Térmico'] },
  { icon: Brain, name: 'MACHINE LEARNING', specs: ['Modelos Predictivos', 'Detección de Anomalías', 'NLP Industrial', 'Optimización'] },
  { icon: Server, name: 'EDGE COMPUTING', specs: ['Latencia Ultra Baja', 'Procesamiento Local', 'Redes 5G Privadas', 'Sobrevivencia Offline'] },
  { icon: Database, name: 'CLOUD', specs: ['Data Lakes', 'Alta Disponibilidad', 'AWS / Azure / GCP', 'Backups Inmutables'] },
  { icon: Network, name: 'APIs', specs: ['REST & GraphQL', 'WebHooks', 'Integración ERP', 'Microservicios'] },
  { icon: Cpu, name: 'IoT', specs: ['Sensores Inalámbricos', 'LoRaWAN / Zigbee', 'Telemetría', 'Bajo Consumo'] },
  { icon: Factory, name: 'OT/IT', specs: ['SCADA', 'Modbus / OPC UA', 'PLCs', 'Diodos de Datos'] },
  { icon: BarChart3, name: 'DASHBOARDS', specs: ['React & WebGL', 'Mapeo 3D', 'Métricas en Tiempo Real', 'Móvil y Videowall'] },
  { icon: Zap, name: 'AUTOMATIZACIÓN', specs: ['Workflows Visuales', 'RPA', 'Event-Driven', 'Ejecución Autónoma'] },
  { icon: Lock, name: 'CIBERSEGURIDAD', specs: ['Zero Trust', 'Encriptación E2E', 'MFA', 'Test de Penetración'] },
];

function TecnologiaPage() {
  return (
    <>
      <Helmet>
        <title>QUANTICO | Tecnología</title>
        <meta name="description" content="Tecnología que conecta el mundo físico con la inteligencia digital." />
      </Helmet>

      <Header />

      <main className="bg-[#020409] text-white selection:bg-[#8CFF00] selection:text-black min-h-screen">
        
        {/* HERO */}
        <section className="hero-background min-h-[60dvh] flex items-center justify-center border-b border-white/5 pt-20">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="font-logo text-5xl md:text-7xl text-white mb-6 tracking-[0.15em] glow-text text-balance"
            >
              TECNOLOGÍA
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-title text-xl md:text-2xl text-[#8A8F98] mb-8 tracking-widest uppercase text-balance"
            >
              Tecnología que conecta el mundo físico con la inteligencia digital.
            </motion.p>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="py-24 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xl md:text-2xl text-[#B8BDC7] leading-relaxed font-light text-balance">
              Nuestro Stack Tecnológico es agnóstico al hardware subyacente pero profundamente especializado en su control. Hemos construido una capa unificada capaz de ingerir millones de eventos por segundo y convertirlos en inteligencia accionable, asegurando la supervivencia del sistema ante cualquier falla de red.
            </p>
          </div>
        </section>

        {/* TECH STACK GRID */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {stack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div key={tech.name} className="glass-card p-8 flex flex-col h-full group hover:-translate-y-1 transition-transform">
                    <Icon className="w-10 h-10 text-[#8CFF00] mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <h3 className="font-title text-xl text-white mb-4 tracking-widest">{tech.name}</h3>
                    <ul className="mt-auto space-y-2">
                      {tech.specs.map(spec => (
                        <li key={spec} className="text-sm text-[#8A8F98] flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#8CFF00] rounded-full opacity-50"></span>
                          {spec}
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

export default TecnologiaPage;
