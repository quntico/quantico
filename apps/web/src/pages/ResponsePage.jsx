
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Bell, Users, Zap, Database, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function ResponsePage() {
  return (
    <>
      <Helmet>
        <title>RESPONSE - Sistema de respuesta a emergencias | QUANTICO</title>
        <meta name="description" content="Sistema de respuesta a emergencias con coordinación automatizada y protocolos inteligentes" />
      </Helmet>

      <Header />

      <section className="pt-32 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/#soluciones" className="hover:text-primary transition-colors duration-200">Soluciones</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-destructive">RESPONSE</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-destructive/10 mb-6">
              <Activity className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-destructive mb-6 heading">
              RESPONSE
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sistema de respuesta a emergencias con coordinación automatizada y protocolos inteligentes
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-destructive mb-8 heading">Descripción general</h2>
          <p className="text-muted-foreground leading-relaxed max-w-4xl">
            RESPONSE es un sistema de gestión de emergencias que coordina automáticamente la respuesta a incidentes críticos, activando protocolos predefinidos y movilizando recursos de manera eficiente.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-destructive mb-8 heading">Capacidades principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6 border-destructive/20">
              <Bell className="w-8 h-8 text-destructive mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Activación automática</h3>
              <p className="text-sm text-muted-foreground">Detección y activación de protocolos de emergencia</p>
            </div>
            <div className="glass-card rounded-xl p-6 border-destructive/20">
              <Users className="w-8 h-8 text-destructive mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Coordinación de equipos</h3>
              <p className="text-sm text-muted-foreground">Movilización y comunicación de equipos de respuesta</p>
            </div>
            <div className="glass-card rounded-xl p-6 border-destructive/20">
              <Zap className="w-8 h-8 text-destructive mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Respuesta rápida</h3>
              <p className="text-sm text-muted-foreground">Reducción de tiempos de respuesta mediante automatización</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-destructive mb-6 heading">
            Implementa RESPONSE en tu operación
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Solicita un diagnóstico personalizado de gestión de emergencias
          </p>
          <Link to="/contacto">
            <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-8 py-6 text-lg rounded-lg transition-all duration-300 active:scale-[0.98]">
              Solicitar diagnóstico
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ResponsePage;
