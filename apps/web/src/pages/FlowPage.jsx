
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, BarChart3, Target, Database, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function FlowPage() {
  return (
    <>
      <Helmet>
        <title>FLOW - Optimización de flujos operacionales | QUANTICO</title>
        <meta name="description" content="Optimización de flujos operacionales con análisis de procesos y automatización inteligente" />
      </Helmet>

      <Header />

      <section className="pt-32 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/#soluciones" className="hover:text-primary transition-colors duration-200">Soluciones</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="accent-cyan">FLOW</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-[rgba(0,229,255,0.1)] mb-6">
              <TrendingUp className="w-10 h-10 accent-cyan" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold accent-cyan mb-6 heading">
              FLOW
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Optimización de flujos operacionales con análisis de procesos y automatización inteligente
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold accent-cyan mb-8 heading">Descripción general</h2>
          <p className="text-muted-foreground leading-relaxed max-w-4xl">
            FLOW es una plataforma de optimización que analiza y mejora los flujos operacionales mediante inteligencia artificial, identificando cuellos de botella, ineficiencias y oportunidades de automatización.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold accent-cyan mb-8 heading">Capacidades principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6 border-[rgba(0,229,255,0.2)]">
              <BarChart3 className="w-8 h-8 accent-cyan mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Análisis de procesos</h3>
              <p className="text-sm text-muted-foreground">Mapeo y análisis detallado de flujos operacionales</p>
            </div>
            <div className="glass-card rounded-xl p-6 border-[rgba(0,229,255,0.2)]">
              <Zap className="w-8 h-8 accent-cyan mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Automatización</h3>
              <p className="text-sm text-muted-foreground">Automatización de tareas repetitivas y decisiones rutinarias</p>
            </div>
            <div className="glass-card rounded-xl p-6 border-[rgba(0,229,255,0.2)]">
              <Target className="w-8 h-8 accent-cyan mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Optimización continua</h3>
              <p className="text-sm text-muted-foreground">Mejora constante basada en datos y aprendizaje automático</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold accent-cyan mb-6 heading">
            Implementa FLOW en tu operación
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Solicita un diagnóstico personalizado de optimización
          </p>
          <Link to="/contacto">
            <Button className="bg-[rgb(0,229,255)] text-black hover:bg-[rgb(0,229,255)]/90 px-8 py-6 text-lg rounded-lg transition-all duration-300 active:scale-[0.98]">
              Solicitar diagnóstico
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default FlowPage;
