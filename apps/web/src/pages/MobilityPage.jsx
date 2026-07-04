
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, MapPin, Route, Clock, Database, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function MobilityPage() {
  return (
    <>
      <Helmet>
        <title>MOBILITY - Gestión de flotas y logística | QUANTICO</title>
        <meta name="description" content="Gestión de flotas y logística con rastreo en tiempo real y optimización de rutas" />
      </Helmet>

      <Header />

      <section className="pt-32 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/#soluciones" className="hover:text-primary transition-colors duration-200">Soluciones</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent">MOBILITY</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-accent/10 mb-6">
              <Truck className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-accent mb-6 heading">
              MOBILITY
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Gestión de flotas y logística con rastreo en tiempo real y optimización de rutas
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-8 heading">Descripción general</h2>
          <p className="text-muted-foreground leading-relaxed max-w-4xl">
            MOBILITY es una solución integral para la gestión de flotas vehiculares y operaciones logísticas, proporcionando visibilidad en tiempo real, optimización de rutas y control de costos operacionales.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-8 heading">Capacidades principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6 border-accent/20">
              <MapPin className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Rastreo GPS</h3>
              <p className="text-sm text-muted-foreground">Ubicación en tiempo real de toda la flota vehicular</p>
            </div>
            <div className="glass-card rounded-xl p-6 border-accent/20">
              <Route className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Optimización de rutas</h3>
              <p className="text-sm text-muted-foreground">Planificación inteligente para reducir tiempos y costos</p>
            </div>
            <div className="glass-card rounded-xl p-6 border-accent/20">
              <Clock className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Gestión de entregas</h3>
              <p className="text-sm text-muted-foreground">Control de tiempos, cumplimiento y evidencia digital</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-accent mb-6 heading">
            Implementa MOBILITY en tu operación
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Solicita un diagnóstico personalizado de tu flota
          </p>
          <Link to="/contacto">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg rounded-lg transition-all duration-300 active:scale-[0.98]">
              Solicitar diagnóstico
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default MobilityPage;
