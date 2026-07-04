
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Zap } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const team = [
  { name: 'Dr. Elias Vance', role: 'Director de Tecnología (CTO)', initials: 'EV', bg: 'bg-blue-900/40' },
  { name: 'Sarah Chen', role: 'Directora de Investigación en IA', initials: 'SC', bg: 'bg-emerald-900/40' },
  { name: 'Marcus Ruhl', role: 'Director de Sistemas de Hardware', initials: 'MR', bg: 'bg-orange-900/40' },
  { name: 'Elena Rostova', role: 'Vicepresidenta de Seguridad Global', initials: 'ER', bg: 'bg-purple-900/40' }
];

function NosotrosPage() {
  return (
    <>
      <Helmet>
        <title>QUANTICO | Nosotros</title>
        <meta name="description" content="Ingeniería, inteligencia y seguridad para operaciones críticas." />
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
              NOSOTROS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-title text-xl md:text-2xl text-[#8A8F98] mb-8 tracking-widest uppercase"
            >
              Ingeniería, inteligencia y seguridad para operaciones críticas.
            </motion.p>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <p className="text-xl md:text-3xl text-[#F4F6FA] leading-relaxed font-light text-balance">
              QUANTICO desarrolla e integra tecnología física y digital para empresas que requieren visibilidad, protección, automatización y resiliencia. Unimos software, hardware, IA y sistemas de seguridad para crear soluciones completas, escalables y operativas.
            </p>
          </div>
        </section>

        {/* MISSION / VISION (Zig-Zag Layout) */}
        <section className="py-24 border-y border-white/5 bg-[#050A12]/30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="glass-card p-12 order-2 md:order-1">
                <Target className="w-12 h-12 text-[#8CFF00] mb-8" />
                <h2 className="font-title text-3xl text-white mb-6 tracking-wider">MISIÓN</h2>
                <p className="text-[#8A8F98] text-lg leading-relaxed">
                  Proveer los sistemas más avanzados y confiables para proteger y optimizar la infraestructura crítica a nivel global, eliminando silos entre hardware y software, y convirtiendo datos complejos en decisiones automatizadas e inteligentes.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=1000" alt="Ingeniería avanzada y servidores" className="rounded-2xl border border-white/10 opacity-80" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" alt="Operaciones satelitales y datos" className="rounded-2xl border border-white/10 opacity-80" />
              </div>
              <div className="glass-card p-12">
                <Eye className="w-12 h-12 text-[#8CFF00] mb-8" />
                <h2 className="font-title text-3xl text-white mb-6 tracking-wider">VISIÓN</h2>
                <p className="text-[#8A8F98] text-lg leading-relaxed">
                  Ser el estándar mundial en sistemas operativos para entornos industriales y de alta seguridad, donde la inteligencia artificial y el hardware se fusionen de manera imperceptible para garantizar una resiliencia total y cero interrupciones.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* VALORES */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-title text-4xl text-center text-white mb-16 tracking-widest">NUESTROS VALORES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-8">
                <ShieldCheck className="w-8 h-8 text-[#8CFF00] mb-6" />
                <h3 className="font-title text-xl text-white mb-3">RESILIENCIA ABSOLUTA</h3>
                <p className="text-[#8A8F98] text-sm">Nuestras soluciones están diseñadas para no fallar. Asumimos la responsabilidad de las operaciones más críticas de nuestros clientes.</p>
              </div>
              <div className="glass-card p-8">
                <Zap className="w-8 h-8 text-[#8CFF00] mb-6" />
                <h3 className="font-title text-xl text-white mb-3">INNOVACIÓN TÁCTICA</h3>
                <p className="text-[#8A8F98] text-sm">No creamos tecnología por moda, sino por utilidad directa. Cada avance en IA o hardware debe resolver un problema operativo real.</p>
              </div>
              <div className="glass-card p-8">
                <Target className="w-8 h-8 text-[#8CFF00] mb-6" />
                <h3 className="font-title text-xl text-white mb-3">INTEGRACIÓN TOTAL</h3>
                <p className="text-[#8A8F98] text-sm">Creemos en la unificación. Rompemos las barreras entre OT (Tecnología Operativa) e IT para crear sistemas holísticos y transparentes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPO LIDERAZGO */}
        <section className="py-24 border-t border-white/5 bg-[#050A12]/50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-title text-4xl text-center text-white mb-16 tracking-widest">EQUIPO LÍDER</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="glass-card p-8 flex flex-col items-center text-center">
                  <div className={`w-24 h-24 rounded-2xl ${member.bg} flex items-center justify-center border border-white/10 mb-6`}>
                    <span className="font-logo text-2xl text-white">{member.initials}</span>
                  </div>
                  <h3 className="font-title text-xl text-white tracking-wider mb-2">{member.name}</h3>
                  <p className="text-[#8CFF00] text-sm font-medium tracking-wide uppercase">{member.role}</p>
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

export default NosotrosPage;
