
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { solutionsData } from '@/lib/data.js';

function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    cargo: '',
    email: '',
    telefono: '',
    industria: '',
    solucion: '',
    equipos: [],
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const industrias = [
    'Industrial', 'Energía', 'Logística', 'Salud', 'Alimentos', 
    'Corporativo', 'Gobierno', 'Financiero', 'Transporte', 'Infraestructura crítica'
  ];

  const equipos = [
    'Cámaras inteligentes y CCTV',
    'Control de acceso y perímetro',
    'Sensores industriales e IoT',
    'Drones y robots autónomos',
    'Gabinetes / Servidores / Edge',
    'Centros de control y videowalls',
    'Redes industriales OT/IT',
    'Sistemas de emergencia'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (equipo, checked) => {
    setFormData(prev => {
      const newEquipos = checked 
        ? [...prev.equipos, equipo]
        : prev.equipos.filter(e => e !== equipo);
      return { ...prev, equipos: newEquipos };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const submissions = JSON.parse(localStorage.getItem('quantico_submissions') || '[]');
        submissions.push({
          ...formData,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('quantico_submissions', JSON.stringify(submissions));

        toast.success('Solicitud enviada correctamente. Un especialista se contactará pronto.');
        
        setFormData({
          nombre: '', empresa: '', cargo: '', email: '', telefono: '',
          industria: '', solucion: '', equipos: [], mensaje: ''
        });
      } catch (error) {
        toast.error('Error al enviar la solicitud.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#020409]">
      <Helmet>
        <title>Contacto | QUANTICO</title>
        <meta name="description" content="Contacta a QUANTICO para integrar hardware y software en tus operaciones críticas." />
      </Helmet>

      <Header />

      <section className="pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8CFF00]/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 heading tracking-widest">
              CONTACTO
            </h1>
            <p className="text-lg text-[#8A8F98] max-w-2xl mx-auto">
              Diseñamos soluciones integrales de hardware y software para proteger y optimizar tus operaciones.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card rounded-sm p-8 md:p-12 border-white/10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Datos Personales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-[#B8BDC7] text-xs heading tracking-widest">NOMBRE COMPLETO</Label>
                    <Input
                      id="nombre" required
                      value={formData.nombre}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                      className="bg-[#020409] border-white/10 text-white rounded-sm h-12 focus-visible:ring-[#8CFF00] focus-visible:border-[#8CFF00]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-[#B8BDC7] text-xs heading tracking-widest">EMPRESA</Label>
                    <Input
                      id="empresa" required
                      value={formData.empresa}
                      onChange={(e) => handleChange('empresa', e.target.value)}
                      className="bg-[#020409] border-white/10 text-white rounded-sm h-12 focus-visible:ring-[#8CFF00] focus-visible:border-[#8CFF00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cargo" className="text-[#B8BDC7] text-xs heading tracking-widest">CARGO</Label>
                    <Input
                      id="cargo" required
                      value={formData.cargo}
                      onChange={(e) => handleChange('cargo', e.target.value)}
                      className="bg-[#020409] border-white/10 text-white rounded-sm h-12 focus-visible:ring-[#8CFF00] focus-visible:border-[#8CFF00]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#B8BDC7] text-xs heading tracking-widest">EMAIL</Label>
                    <Input
                      id="email" type="email" required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="bg-[#020409] border-white/10 text-white rounded-sm h-12 focus-visible:ring-[#8CFF00] focus-visible:border-[#8CFF00]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-[#B8BDC7] text-xs heading tracking-widest">TELÉFONO</Label>
                    <Input
                      id="telefono" type="tel" required
                      value={formData.telefono}
                      onChange={(e) => handleChange('telefono', e.target.value)}
                      className="bg-[#020409] border-white/10 text-white rounded-sm h-12 focus-visible:ring-[#8CFF00] focus-visible:border-[#8CFF00]"
                    />
                  </div>
                </div>

                {/* Intereses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <Label className="text-[#B8BDC7] text-xs heading tracking-widest">INDUSTRIA</Label>
                    <Select value={formData.industria} onValueChange={(v) => handleChange('industria', v)}>
                      <SelectTrigger className="bg-[#020409] border-white/10 text-white rounded-sm h-12">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#050A12] border-white/10 text-white">
                        {industrias.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#B8BDC7] text-xs heading tracking-widest">SOLUCIÓN PRINCIPAL</Label>
                    <Select value={formData.solucion} onValueChange={(v) => handleChange('solucion', v)}>
                      <SelectTrigger className="bg-[#020409] border-white/10 text-white rounded-sm h-12">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#050A12] border-white/10 text-white">
                        {solutionsData.map(sol => <SelectItem key={sol.slug} value={sol.name}>{sol.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Hardware Checkboxes */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <Label className="text-[#B8BDC7] text-xs heading tracking-widest">HARDWARE Y EQUIPAMIENTO REQUERIDO</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {equipos.map((equipo) => (
                      <div key={equipo} className="flex items-center space-x-3 bg-[#020409]/50 p-3 border border-white/5 rounded-sm">
                        <Checkbox 
                          id={equipo}
                          checked={formData.equipos.includes(equipo)}
                          onCheckedChange={(checked) => handleCheckboxChange(equipo, checked)}
                          className="border-[#8A8F98] data-[state=checked]:bg-[#8CFF00] data-[state=checked]:border-[#8CFF00] data-[state=checked]:text-black"
                        />
                        <label htmlFor={equipo} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#F4F6FA] cursor-pointer">
                          {equipo}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5">
                  <Label htmlFor="mensaje" className="text-[#B8BDC7] text-xs heading tracking-widest">DETALLES DEL PROYECTO</Label>
                  <Textarea
                    id="mensaje" required
                    value={formData.mensaje}
                    onChange={(e) => handleChange('mensaje', e.target.value)}
                    className="bg-[#020409] border-white/10 text-white rounded-sm min-h-[120px] focus-visible:ring-[#8CFF00] focus-visible:border-[#8CFF00]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8CFF00] text-black hover:bg-[#8CFF00]/90 font-bold heading tracking-widest py-6 rounded-sm transition-all duration-300"
                >
                  {isSubmitting ? 'PROCESANDO...' : 'SOLICITAR DIAGNÓSTICO QUANTICO'}
                </Button>

                <div className="text-center pt-6">
                  <span className="text-[#8A8F98] text-sm">
                    www.quantico.llc
                  </span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactPage;
