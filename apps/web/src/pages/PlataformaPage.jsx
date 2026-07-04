
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Database, Network, ShieldAlert, Zap, Layers, Server } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function PlataformaPage() {
  return (
    <>
      <Helmet>
        <title>QUANTICO | Plataforma</title>
        <meta name="description" content="Una plataforma para conectar toda tu operación." />
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
              PLATAFORMA
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-title text-xl md:text-2xl text-[#8A8F98] mb-8 tracking-widest uppercase text-balance"
            >
              Una plataforma para conectar toda tu operación.
            </motion.p>
          </div>
        </section>

        {/* HUB DIAGRAM */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-4xl mx-auto h-[600px] flex items-center justify-center my-12">
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_80s_linear_infinite]"></div>
              <div className="absolute inset-16 border border-dashed border-white/10 rounded-full animate-[spin_50s_linear_infinite_reverse]"></div>
              <div className="absolute inset-32 border border-white/5 rounded-full animate-[spin_40s_linear_infinite]"></div>
              
              <div className="relative z-20 w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#020409] border border-[#8CFF00] flex flex-col items-center justify-center shadow-[0_0_80px_rgba(140,255,0,0.2)]">
                <span className="font-logo text-xl md:text-3xl text-white tracking-widest mb-2">QUANTICO</span>
                <span className="text-[10px] text-[#8CFF00] tracking-[0.2em] font-medium uppercase">Hub Central</span>
              </div>
              
              {['ERP / CRM', 'SCADA / PLC', 'CCTV & Sensores', 'Control de acceso', 'Nodos IoT', 'Drones & AMRs', 'Bases de datos', 'Nube & APIs', 'Centros de control', 'Apps Móviles'].map((label, i, arr) => {
                const angle = (i * 360) / arr.length;
                return (
                  <div key={label} className="absolute w-full h-full flex justify-end items-center" style={{ transform: `rotate(${angle}deg)` }}>
                    <div className="w-1/2 h-[1px] bg-gradient-to-r from-[#8CFF00]/40 to-transparent origin-left relative">
                      <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#8CFF00] shadow-[0_0_10px_#8CFF00]"></div>
                    </div>
                    <div className="absolute right-0 glass-card px-5 py-3 border-white/10" style={{ transform: `rotate(-${angle}deg)` }}>
                      <span className="text-xs md:text-sm font-title tracking-wider text-[#F4F6FA] uppercase">{label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ARCHITECTURE OVERVIEW */}
        <section className="py-24 border-t border-white/5 bg-[#050A12]/30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-title text-4xl text-white mb-16 tracking-widest text-center">ARQUITECTURA DE SISTEMAS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="glass-card p-10 flex gap-6">
                <Layers className="w-10 h-10 text-[#8CFF00] shrink-0" />
                <div>
                  <h3 className="font-title text-2xl text-white mb-4 tracking-wider">Capa de Ingesta (Edge)</h3>
                  <p className="text-[#8A8F98] leading-relaxed">
                    Captura de datos en tiempo real mediante sensores, cámaras, PLCs y pasarelas IoT. Procesamiento local (Edge Computing) para reducir latencia y accionar protocolos de seguridad de forma autónoma.
                  </p>
                </div>
              </div>
              <div className="glass-card p-10 flex gap-6">
                <Network className="w-10 h-10 text-[#8CFF00] shrink-0" />
                <div>
                  <h3 className="font-title text-2xl text-white mb-4 tracking-wider">Capa de Integración</h3>
                  <p className="text-[#8A8F98] leading-relaxed">
                    Motor de mensajería de alta velocidad y APIs seguras. Traduce protocolos industriales (Modbus, OPC UA) y estándares IT (REST, MQTT) hacia un bus de datos unificado.
                  </p>
                </div>
              </div>
              <div className="glass-card p-10 flex gap-6">
                <Database className="w-10 h-10 text-[#8CFF00] shrink-0" />
                <div>
                  <h3 className="font-title text-2xl text-white mb-4 tracking-wider">Capa de Analítica (Core)</h3>
                  <p className="text-[#8A8F98] leading-relaxed">
                    Data Lakes y motores de Machine Learning que correlacionan telemetría, eventos de seguridad y KPIs operativos para predecir fallas y detectar anomalías complejas.
                  </p>
                </div>
              </div>
              <div className="glass-card p-10 flex gap-6">
                <Server className="w-10 h-10 text-[#8CFF00] shrink-0" />
                <div>
                  <h3 className="font-title text-2xl text-white mb-4 tracking-wider">Capa de Presentación</h3>
                  <p className="text-[#8A8F98] leading-relaxed">
                    Dashboards interactivos en Centros de Control (NOC/SOC), aplicaciones móviles seguras e interfaces de Realidad Aumentada para operarios en campo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-title text-4xl text-white mb-16 tracking-widest text-center">CAPACIDADES DE INTEGRACIÓN</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass-card p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-[#8CFF00]" />
                </div>
                <h3 className="font-title text-xl text-white mb-4">Eventos en Tiempo Real</h3>
                <p className="text-[#8A8F98] text-sm">
                  Latencia de sub-milisegundos para alertas críticas, disparos de alarmas y cierres de válvulas, superando los estándares industriales tradicionales.
                </p>
              </div>
              <div className="glass-card p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <ShieldAlert className="w-8 h-8 text-[#8CFF00]" />
                </div>
                <h3 className="font-title text-xl text-white mb-4">Aislamiento OT / IT</h3>
                <p className="text-[#8A8F98] text-sm">
                  Diodos de datos y firewalls industriales que garantizan que el flujo de información hacia la nube nunca comprometa el perímetro físico de operación.
                </p>
              </div>
              <div className="glass-card p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Network className="w-8 h-8 text-[#8CFF00]" />
                </div>
                <h3 className="font-title text-xl text-white mb-4">Escalabilidad Global</h3>
                <p className="text-[#8A8F98] text-sm">
                  Implementación unificada que abarca desde una única instalación industrial hasta redes de cientos de instalaciones conectadas globalmente.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default PlataformaPage;
