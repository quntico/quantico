
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Server, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { solutionsData } from '@/lib/data.js';

function SolutionDetailPage() {
  const { slug } = useParams();
  const solution = solutionsData.find(s => s.slug === slug);

  if (!solution) {
    return <Navigate to="/" replace />;
  }

  const Icon = solution.icon;

  return (
    <div className="min-h-screen bg-[#020409]">
      <Helmet>
        <title>{`${solution.name} | QUANTICO`}</title>
        <meta name="description" content={solution.description} />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 relative border-b border-white/5 overflow-hidden">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-current opacity-5 blur-[150px] rounded-full pointer-events-none accent-${solution.accentColor}`}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 text-xs font-bold text-[#8A8F98] mb-8 heading tracking-widest">
            <Link to="/" className="hover:text-white transition-colors">INICIO</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/#soluciones" className="hover:text-white transition-colors">SOLUCIONES</Link>
            <ChevronRight className="w-3 h-3" />
            <span className={`accent-${solution.accentColor}`}>{solution.name}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`w-16 h-16 rounded-sm flex items-center justify-center bg-current/10 mb-8 border border-current/20 accent-${solution.accentColor}`}>
              <Icon className="w-8 h-8 text-current" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 heading tracking-widest">
              {solution.name}
            </h1>
            
            <p className="text-xl md:text-2xl text-[#B8BDC7] max-w-3xl leading-relaxed font-light">
              {solution.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Integral Solution (Hardware + Software) */}
      <section className="py-24 bg-[#050A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 heading tracking-widest flex items-center gap-4">
                <div className={`w-8 h-px bg-current accent-${solution.accentColor}`}></div>
                CAPACIDADES CORE
              </h2>
              <div className="space-y-4">
                {solution.capabilities.map((cap, i) => (
                  <div key={i} className="glass-card p-6 rounded-sm border-white/5 flex items-start gap-4">
                    <Zap className={`w-5 h-5 mt-1 shrink-0 accent-${solution.accentColor}`} />
                    <p className="text-[#F4F6FA] font-medium">{cap}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 heading tracking-widest flex items-center gap-4">
                <div className={`w-8 h-px bg-current accent-${solution.accentColor}`}></div>
                INTEGRACIÓN HARDWARE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {solution.integrations.map((hw, i) => (
                  <div key={i} className="bg-[#020409] p-6 border border-white/5 rounded-sm">
                    <Server className="w-6 h-6 text-[#8A8F98] mb-4" />
                    <h4 className="text-[14px] text-[#B8BDC7] leading-snug">{hw}</h4>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases & Benefits */}
      <section className="py-24 bg-[#020409] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-bold text-white mb-8 heading tracking-widest">CASOS DE USO</h3>
              <ul className="space-y-6">
                {solution.useCases.map((useCase, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#8A8F98]">
                    <Target className={`w-5 h-5 accent-${solution.accentColor}`} />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-8 heading tracking-widest">BENEFICIOS OPERATIVOS</h3>
              <ul className="space-y-6">
                {solution.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#F4F6FA]">
                    <CheckCircle2 className={`w-5 h-5 accent-${solution.accentColor}`} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#050A12] border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 heading tracking-widest">
            INICIA LA TRANSFORMACIÓN
          </h2>
          <p className="text-[#8A8F98] mb-12">
            Implementa {solution.name} en tu infraestructura y optimiza tus operaciones de misión crítica.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contacto">
              <Button className="bg-[#8CFF00] text-black hover:bg-[#8CFF00]/90 px-10 py-6 text-sm heading tracking-wider rounded-sm transition-all duration-300">
                SOLICITAR DIAGNÓSTICO
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SolutionDetailPage;
