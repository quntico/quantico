
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Camera, AlertCircle, Activity, Database, Smartphone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function SentinelPage() {
  return (
    <>
      <Helmet>
        <title>SENTINEL - Monitoreo inteligente de seguridad | QUANTICO</title>
        <meta name="description" content="Sistema de monitoreo inteligente con análisis de video en tiempo real y detección de anomalías para operaciones críticas" />
      </Helmet>

      <Header />

      <section className="pt-32 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/#soluciones" className="hover:text-primary transition-colors duration-200">Soluciones</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">SENTINEL</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-primary/10 mb-6">
              <Eye className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 heading">
              SENTINEL
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Monitoreo inteligente de seguridad física con análisis de video en tiempo real y detección de anomalías
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
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 heading">Descripción general</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">
              SENTINEL es un sistema avanzado de monitoreo de seguridad que utiliza inteligencia artificial para analizar video en tiempo real, detectar comportamientos anómalos y generar alertas automáticas. Integra múltiples cámaras y sensores para proporcionar visibilidad completa de tu operación crítica.
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
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 heading">Capacidades principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-6">
                <Camera className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Análisis de video IA</h3>
                <p className="text-sm text-muted-foreground">Detección automática de personas, vehículos y objetos con reconocimiento facial y de patentes</p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <AlertCircle className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Detección de anomalías</h3>
                <p className="text-sm text-muted-foreground">Identificación de comportamientos inusuales y situaciones de riesgo en tiempo real</p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <Activity className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Alertas inteligentes</h3>
                <p className="text-sm text-muted-foreground">Sistema de notificaciones automáticas con priorización y escalamiento</p>
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
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 heading">Casos de uso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 heading">Seguridad industrial</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monitoreo de perímetros, detección de intrusiones, control de acceso a áreas restringidas y verificación de uso de EPP
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 heading">Retail y comercio</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Prevención de pérdidas, análisis de flujo de clientes, detección de comportamientos sospechosos y optimización de layout
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
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 heading">Integraciones</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['CCTV', 'Control de acceso', 'Sensores IoT', 'Sistemas de alarma'].map((integration) => (
                <div key={integration} className="glass-card rounded-lg p-4 text-center">
                  <Database className="w-6 h-6 text-primary mx-auto mb-2" />
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
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 heading">Beneficios clave</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Reducción de incidentes de seguridad</p>
              </div>
              <div className="glass-card rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Respuesta más rápida a eventos</p>
              </div>
              <div className="glass-card rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Menor carga operativa de monitoreo</p>
              </div>
              <div className="glass-card rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Evidencia digital para investigaciones</p>
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
            <h2 className="text-3xl font-bold text-primary mb-6 heading">
              Implementa SENTINEL en tu operación
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Solicita un diagnóstico personalizado y descubre cómo mejorar tu seguridad
            </p>
            <Link to="/contacto">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-lg transition-all duration-300 active:scale-[0.98]">
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

export default SentinelPage;
