
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Video, Eye, Fingerprint, Cpu, Server, MonitorPlay, Radar, Truck, Network, BellRing } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const equipment = [
  { icon: Video, title: 'Cámaras inteligentes', desc: 'PTZ ópticos y térmicos con IA integrada para detección de incendios y perímetros, certificaciones IP67 e IK10.', specs: '4K | Térmica | Analítica Edge' },
  { icon: Eye, title: 'CCTV industrial', desc: 'Circuitos cerrados robustos diseñados para zonas de alta corrosión y riesgo de explosión (Atex).', specs: 'Anti-explosión | Acero Inox | NVR' },
  { icon: Fingerprint, title: 'Control de acceso', desc: 'Biometría sin contacto, lectores de iris, venas, y torniquetes motorizados para control masivo de personal.', specs: 'Iris | Facial | Torniquetes' },
  { icon: Cpu, title: 'Sensores IoT', desc: 'Nodos de telemetría industrial para captar variables físicas sin necesidad de cableado costoso.', specs: 'LoRaWAN | Batería 10 años | IP68' },
  { icon: Server, title: 'Servidores edge', desc: 'Cómputo en sitio rugerizado para garantizar que la analítica visual y el control sigan operando si cae internet.', specs: 'GPU Nvidia | Fanless | DIN Rail' },
  { icon: MonitorPlay, title: 'Videowalls', desc: 'Displays profesionales para NOC/SOC con controladores de hardware para layouts de video dinámicos.', specs: '24/7 | Bisel Delgado | Matriz HDMI' },
  { icon: Radar, title: 'Drones', desc: 'Drones tethered o de patrullaje aéreo autónomo que despegan de estaciones de recarga automáticas.', specs: 'Tethered | Térmico | Nidos' },
  { icon: Truck, title: 'Robots autónomos', desc: 'AMRs terrestres y cuadrúpedos robóticos para inspección en zonas de radiación, alta temperatura o peligro.', specs: 'LiDAR | Autocarga | Cargas útiles' },
  { icon: Network, title: 'Gabinetes y redes', desc: 'Infraestructura física de comunicaciones, switches industriales, fibra óptica y gabinetes climatizados.', specs: 'NEMA 4X | Switch PoE++ | UPS' },
  { icon: BellRing, title: 'Sistemas de alarma', desc: 'Sirenas de alta potencia y estrobos IP para evacuaciones e indicaciones críticas de área.', specs: 'SIP | 120dB | Multitono' },
];

function EquiposPage() {
  return (
    <>
      <Helmet>
        <title>QUANTICO | Equipos</title>
        <meta name="description" content="Equipos, hardware y tecnología operativa." />
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
              EQUIPOS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-title text-xl md:text-2xl text-[#8A8F98] mb-8 tracking-widest uppercase text-balance"
            >
              Equipos, hardware y tecnología operativa.
            </motion.p>
          </div>
        </section>

        {/* EQUIPMENT GRID */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
              {equipment.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="glass-card p-6 flex flex-col group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#8CFF00]/5 blur-2xl rounded-full"></div>
                    <div className="w-12 h-12 rounded bg-[#020409] flex items-center justify-center border border-white/10 mb-6 group-hover:border-[#8CFF00]/50 transition-colors z-10">
                      <Icon className="w-6 h-6 text-[#8CFF00]" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-title text-xl text-white mb-3 tracking-wide z-10">{item.title}</h4>
                    <p className="text-sm text-[#8A8F98] leading-relaxed flex-grow z-10 mb-6">{item.desc}</p>
                    <div className="mt-auto border-t border-white/10 pt-4 z-10">
                      <span className="text-[10px] font-bold text-[#8CFF00] uppercase tracking-widest">{item.specs}</span>
                    </div>
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

export default EquiposPage;
