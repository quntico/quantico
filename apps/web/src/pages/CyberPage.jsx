
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Shield, AlertTriangle, Activity, Database, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function CyberPage() {
  return (
    <>
      <Helmet>
        <title>CYBER - Ciberseguridad operacional | QUANTICO</title>
        <meta name="description" content="Ciberseguridad operacional con detección de amenazas y protección de infraestructura crítica" />
      </Helmet>

      <Header />

      <section className="pt-32 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/#soluciones" className="hover:text-primary transition-colors duration-200">Soluciones</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">CYBER</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-primary/10 mb-6">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 heading">
              CYBER
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ciberseguridad operacional con detección de amenazas y protección de infraestructura crítica
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 heading">Descripción general</h2>
          <p className="text-muted-foreground leading-relaxed max-w-4xl">
            CYBER es una solución integral de ciberseguridad diseñada específicamente para proteger sistemas operacionales críticos contra amenazas cibernéticas avanzadas, incluyendo ransomware, ataques DDoS y vulnerabilidades de día cero.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 heading">Capacidades principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Detección de amenazas</h3>
              <p className="text-sm text-muted-foreground">Monitoreo continuo con IA para identificar comportamientos maliciosos</p>
            </div>
            <div className="glass-card rounded-xl p-6">
              <AlertTriangle className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Respuesta automática</h3>
              <p className="text-sm text-muted-foreground">Aislamiento y contención de amenazas en tiempo real</p>
            </div>
            <div className="glass-card rounded-xl p-6">
              <Activity className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 heading">Análisis forense</h3>
              <p className="text-sm text-muted-foreground">Investigación detallada de incidentes y vectores de ataque</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6 heading">
            Implementa CYBER en tu operación
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Solicita un diagnóstico personalizado de ciberseguridad
          </p>
          <Link to="/contacto">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-lg transition-all duration-300 active:scale-[0.98]">
              Solicitar diagnóstico
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CyberPage;
