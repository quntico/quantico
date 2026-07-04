
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Fingerprint, Shield, Clock, Database, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function BiosafePage() {
  return (
    <>
      <Helmet>
        <title>BIOSAFE - Control de acceso biométrico | QUANTICO</title>
        <meta name="description" content="Control de acceso biométrico y gestión de identidades con verificación multicapa" />
      </Helmet>

      <Header />

      <section className="pt-32 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/#soluciones" className="hover:text-primary transition-colors duration-200">Soluciones</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent">BIOSAFE</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-accent/10 mb-6">
              <Users className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-accent mb-6 heading">
              BIOSAFE
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Control de acceso biométrico y gestión de identidades con verificación multicapa
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
            <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-8 heading">Descripción general</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">
              BIOSAFE es un sistema avanzado de control de acceso que utiliza tecnología biométrica para garantizar la identificación precisa de personas. Integra reconocimiento facial, huella dactilar y otros métodos de autenticación para proporcionar seguridad multicapa.
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
            <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-8 heading">Capacidades principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-6 border-accent/20">
                <Fingerprint className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Biometría avanzada</h3>
                <p className="text-sm text-muted-foreground">Reconocimiento facial, huella dactilar, iris y voz para máxima seguridad</p>
              </div>
              <div className="glass-card rounded-xl p-6 border-accent/20">
                <Shield className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Verificación multicapa</h3>
                <p className="text-sm text-muted-foreground">Autenticación de dos o más factores para áreas de alta seguridad</p>
              </div>
              <div className="glass-card rounded-xl p-6 border-accent/20">
                <Clock className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 heading">Control de horarios</h3>
                <p className="text-sm text-muted-foreground">Gestión de turnos, asistencia y registro de eventos de acceso</p>
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
            <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-8 heading">Casos de uso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6 border-accent/20">
                <h3 className="text-lg font-semibold text-foreground mb-3 heading">Instalaciones corporativas</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Control de acceso a edificios, áreas restringidas, data centers y salas de reuniones ejecutivas
                </p>
              </div>
              <div className="glass-card rounded-xl p-6 border-accent/20">
                <h3 className="text-lg font-semibold text-foreground mb-3 heading">Salud y hospitales</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acceso a áreas críticas, farmacia, quirófanos y control de personal médico autorizado
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
            <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-8 heading">Integraciones</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Torniquetes', 'Cerraduras electrónicas', 'CCTV', 'Sistemas HR'].map((integration) => (
                <div key={integration} className="glass-card rounded-lg p-4 text-center border-accent/20">
                  <Database className="w-6 h-6 text-accent mx-auto mb-2" />
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
            <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-8 heading">Beneficios clave</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-lg p-4 border-accent/20">
                <p className="text-sm text-muted-foreground">Máxima seguridad de acceso</p>
              </div>
              <div className="glass-card rounded-lg p-4 border-accent/20">
                <p className="text-sm text-muted-foreground">Eliminación de tarjetas clonables</p>
              </div>
              <div className="glass-card rounded-lg p-4 border-accent/20">
                <p className="text-sm text-muted-foreground">Trazabilidad completa</p>
              </div>
              <div className="glass-card rounded-lg p-4 border-accent/20">
                <p className="text-sm text-muted-foreground">Gestión centralizada</p>
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
            <h2 className="text-3xl font-bold text-accent mb-6 heading">
              Implementa BIOSAFE en tu operación
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Solicita un diagnóstico personalizado y descubre cómo mejorar tu control de acceso
            </p>
            <Link to="/contacto">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg rounded-lg transition-all duration-300 active:scale-[0.98]">
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

export default BiosafePage;
