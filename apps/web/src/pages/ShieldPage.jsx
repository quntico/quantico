
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Radio, Zap, Bell, Database, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function ShieldPage() {
  return (
    <>
      <Helmet>
        <title>SHIELD - Protección perimetral inteligente | QUANTICO</title>
        <meta name="description" content="Protección perimetral inteligente con sensores IoT y respuesta automatizada" />
      </Helmet>

      <Header />

      <section className="pt-32 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/#soluciones" className="hover:text-primary transition-colors duration-200">Soluciones</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="accent-purple">SHIELD</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-[rgba(138,43,255,0.1)] mb-6">
              <Shield className="w-10 h-10 accent-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold accent-purple mb-6 heading">
              SHIELD
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Protección perimetral inteligente con sensores IoT y respuesta automatizada
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
            <h2 className="text-2xl md:text-3xl font-semibold accent-purple mb-8 heading">Descripción general</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">
              SHIELD es un sistema de protección perimetral que integra sensores IoT, barreras físicas inteligentes y sistemas de respuesta automatizada para crear una defensa multicapa contra intrusiones y amenazas externas.
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
            <h2 className="text-2xl md:text-3xl font-semibold accent-purple mb-8 heading">Capacidades principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-6 border-[rgba(138,43,255,0.2)]">
                <Radio className="w-8 h-8 accent-purple mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Sensores IoT</h3>
                <p className="text-sm text-muted-foreground">Red de sensores perimetrales con detección de movimiento, vibración y corte</p>
              </div>
              <div className="glass-card rounded-xl p-6 border-[rgba(138,43,255,0.2)]">
                <Zap className="w-8 h-8 accent-purple mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Respuesta automatizada</h3>
                <p className="text-sm text-muted-foreground">Activación automática de barreras, iluminación y protocolos de seguridad</p>
              </div>
              <div className="glass-card rounded-xl p-6 border-[rgba(138,43,255,0.2)]">
                <Bell className="w-8 h-8 accent-purple mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Alertas inteligentes</h3>
                <p className="text-sm text-muted-foreground">Notificaciones en tiempo real con clasificación de amenazas</p>
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
            <h2 className="text-2xl md:text-3xl font-semibold accent-purple mb-8 heading">Casos de uso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6 border-[rgba(138,43,255,0.2)]">
                <h3 className="text-lg font-semibold text-foreground mb-3 heading">Infraestructura crítica</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Protección de plantas de energía, subestaciones, centros de datos y telecomunicaciones
                </p>
              </div>
              <div className="glass-card rounded-xl p-6 border-[rgba(138,43,255,0.2)]">
                <h3 className="text-lg font-semibold text-foreground mb-3 heading">Instalaciones industriales</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Seguridad perimetral de plantas de manufactura, almacenes y centros logísticos
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
            <h2 className="text-2xl md:text-3xl font-semibold accent-purple mb-8 heading">Integraciones</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Sensores perimetrales', 'CCTV', 'Barreras físicas', 'Sistemas de alarma'].map((integration) => (
                <div key={integration} className="glass-card rounded-lg p-4 text-center border-[rgba(138,43,255,0.2)]">
                  <Database className="w-6 h-6 accent-purple mx-auto mb-2" />
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
            <h2 className="text-2xl md:text-3xl font-semibold accent-purple mb-8 heading">Beneficios clave</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-lg p-4 border-[rgba(138,43,255,0.2)]">
                <p className="text-sm text-muted-foreground">Detección temprana de intrusiones</p>
              </div>
              <div className="glass-card rounded-lg p-4 border-[rgba(138,43,255,0.2)]">
                <p className="text-sm text-muted-foreground">Respuesta automatizada</p>
              </div>
              <div className="glass-card rounded-lg p-4 border-[rgba(138,43,255,0.2)]">
                <p className="text-sm text-muted-foreground">Reducción de falsas alarmas</p>
              </div>
              <div className="glass-card rounded-lg p-4 border-[rgba(138,43,255,0.2)]">
                <p className="text-sm text-muted-foreground">Cobertura perimetral completa</p>
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
            <h2 className="text-3xl font-bold accent-purple mb-6 heading">
              Implementa SHIELD en tu operación
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Solicita un diagnóstico personalizado y descubre cómo proteger tu perímetro
            </p>
            <Link to="/contacto">
              <Button className="bg-[rgb(138,43,255)] text-white hover:bg-[rgb(138,43,255)]/90 px-8 py-6 text-lg rounded-lg transition-all duration-300 active:scale-[0.98]">
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

export default ShieldPage;
