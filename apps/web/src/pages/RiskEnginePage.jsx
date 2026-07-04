
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, BarChart3, Shield, Database, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function RiskEnginePage() {
  return (
    <>
      <Helmet>
        <title>RISK ENGINE - Motor de análisis de riesgos | QUANTICO</title>
        <meta name="description" content="Motor de análisis de riesgos operacionales con predicción de incidentes y evaluación continua" />
      </Helmet>

      <Header />

      <section className="pt-32 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/#soluciones" className="hover:text-primary transition-colors duration-200">Soluciones</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-secondary">RISK ENGINE</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-secondary/10 mb-6">
              <AlertTriangle className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 heading">
              RISK ENGINE
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Motor de análisis de riesgos operacionales con predicción de incidentes y evaluación continua
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-8 heading">Descripción general</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">
              RISK ENGINE es un sistema avanzado de gestión de riesgos que utiliza algoritmos de machine learning para identificar, evaluar y predecir riesgos operacionales. Proporciona análisis en tiempo real y recomendaciones para mitigar amenazas antes de que se materialicen.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-8 heading">Capacidades principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-6 border-secondary/20">
                <TrendingUp className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Análisis predictivo</h3>
                <p className="text-sm text-muted-foreground">Predicción de incidentes basada en patrones históricos y datos en tiempo real</p>
              </div>
              <div className="glass-card rounded-xl p-6 border-secondary/20">
                <BarChart3 className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Evaluación continua</h3>
                <p className="text-sm text-muted-foreground">Monitoreo constante de indicadores de riesgo y actualización de matrices</p>
              </div>
              <div className="glass-card rounded-xl p-6 border-secondary/20">
                <Shield className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Mitigación proactiva</h3>
                <p className="text-sm text-muted-foreground">Recomendaciones automáticas de acciones preventivas y correctivas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-8 heading">Casos de uso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6 border-secondary/20">
                <h3 className="text-lg font-semibold text-foreground mb-3 heading">Operaciones industriales</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Evaluación de riesgos de seguridad, salud ocupacional, medio ambiente y continuidad operacional
                </p>
              </div>
              <div className="glass-card rounded-xl p-6 border-secondary/20">
                <h3 className="text-lg font-semibold text-foreground mb-3 heading">Gestión financiera</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Análisis de riesgos crediticios, operacionales, de mercado y cumplimiento regulatorio
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-8 heading">Integraciones</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['ERP', 'SCADA', 'Bases de datos', 'APIs externas'].map((integration) => (
                <div key={integration} className="glass-card rounded-lg p-4 text-center border-secondary/20">
                  <Database className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">{integration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-8 heading">Beneficios clave</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-lg p-4 border-secondary/20">
                <p className="text-sm text-muted-foreground">Reducción de incidentes operacionales</p>
              </div>
              <div className="glass-card rounded-lg p-4 border-secondary/20">
                <p className="text-sm text-muted-foreground">Mejor toma de decisiones</p>
              </div>
              <div className="glass-card rounded-lg p-4 border-secondary/20">
                <p className="text-sm text-muted-foreground">Cumplimiento normativo</p>
              </div>
              <div className="glass-card rounded-lg p-4 border-secondary/20">
                <p className="text-sm text-muted-foreground">Optimización de recursos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-secondary mb-6 heading">
              Implementa RISK ENGINE en tu operación
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Solicita un diagnóstico personalizado y descubre cómo gestionar tus riesgos
            </p>
            <Link to="/contacto">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-lg rounded-lg transition-all duration-300 active:scale-[0.98]">
                Solicitar diagnóstico
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default RiskEnginePage;
