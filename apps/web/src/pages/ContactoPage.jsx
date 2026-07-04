
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    cargo: '',
    email: '',
    telefono: '',
    industria: '',
    solucion: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Mensaje enviado correctamente. Un especialista de QUANTICO lo contactará a la brevedad.", {
        icon: <CheckCircle2 className="w-5 h-5 text-[#8CFF00]" />,
        style: { background: '#020409', color: '#fff', border: '1px solid rgba(140,255,0,0.3)' }
      });
      setFormData({
        nombre: '', empresa: '', cargo: '', email: '', telefono: '', industria: '', solucion: '', mensaje: ''
      });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>QUANTICO | Contacto</title>
        <meta name="description" content="Póngase en contacto con especialistas de QUANTICO." />
      </Helmet>

      <Header />

      <main className="bg-[#020409] text-white selection:bg-[#8CFF00] selection:text-black min-h-screen">
        
        {/* HERO */}
        <section className="hero-background min-h-[50dvh] flex items-center justify-center border-b border-white/5 pt-20">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="font-logo text-5xl md:text-7xl text-white mb-6 tracking-[0.15em] glow-text"
            >
              CONTACTO
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-title text-xl md:text-2xl text-[#8A8F98] tracking-widest uppercase"
            >
              Solicitar diagnóstico operativo.
            </motion.p>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              {/* Form Info */}
              <div className="lg:col-span-5 flex flex-col">
                <h2 className="font-title text-3xl md:text-4xl text-white mb-6 tracking-widest">HABLEMOS DE SU OPERACIÓN</h2>
                <p className="text-[#8A8F98] text-lg leading-relaxed mb-12">
                  Complete el formulario para que un especialista técnico se ponga en contacto con usted y diseñe una evaluación preliminar de sus sistemas y vulnerabilidades.
                </p>

                <div className="space-y-8 mt-auto">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-[#8CFF00]" />
                    </div>
                    <div>
                      <h4 className="font-title text-lg text-white tracking-widest mb-1">HEADQUARTERS</h4>
                      <p className="text-[#8A8F98] text-sm">Global Operations Center<br />Tech District, Innovation Ave.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-[#8CFF00]" />
                    </div>
                    <div>
                      <h4 className="font-title text-lg text-white tracking-widest mb-1">EMAIL</h4>
                      <a href="mailto:info@quantico.llc" className="text-[#8A8F98] text-sm hover:text-white transition-colors">info@quantico.llc</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-[#8CFF00]" />
                    </div>
                    <div>
                      <h4 className="font-title text-lg text-white tracking-widest mb-1">TELÉFONO</h4>
                      <p className="text-[#8A8F98] text-sm">+1 (800) QUANTICO</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <a href="https://www.quantico.llc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-[#8CFF00] font-logo tracking-widest text-sm transition-colors">
                      WWW.QUANTICO.LLC
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <div className="glass-card p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-title tracking-widest text-[#B8BDC7] uppercase">Nombre completo</label>
                        <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#8CFF00]/50 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-title tracking-widest text-[#B8BDC7] uppercase">Cargo</label>
                        <input required type="text" name="cargo" value={formData.cargo} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#8CFF00]/50 transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-title tracking-widest text-[#B8BDC7] uppercase">Empresa</label>
                        <input required type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#8CFF00]/50 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-title tracking-widest text-[#B8BDC7] uppercase">Industria</label>
                        <select name="industria" value={formData.industria} onChange={handleChange} className="w-full bg-[#0d121c] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#8CFF00]/50 transition-colors appearance-none">
                          <option value="">Seleccione una industria</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Energía">Energía</option>
                          <option value="Gobierno">Gobierno</option>
                          <option value="Logística">Logística</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-title tracking-widest text-[#B8BDC7] uppercase">Email corporativo</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#8CFF00]/50 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-title tracking-widest text-[#B8BDC7] uppercase">Teléfono</label>
                        <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#8CFF00]/50 transition-colors" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-title tracking-widest text-[#B8BDC7] uppercase">Solución de interés</label>
                      <select name="solucion" value={formData.solucion} onChange={handleChange} className="w-full bg-[#0d121c] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#8CFF00]/50 transition-colors appearance-none">
                        <option value="">Seleccione una solución</option>
                        <option value="SENTINEL">SENTINEL (Centro de control)</option>
                        <option value="SHIELD">SHIELD (Seguridad Física)</option>
                        <option value="CYBER">CYBER (Ciberseguridad)</option>
                        <option value="Hardware">Hardware y Equipos</option>
                        <option value="Diagnostico General">Diagnóstico Operativo General</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-title tracking-widest text-[#B8BDC7] uppercase">Mensaje o requerimiento</label>
                      <textarea required name="mensaje" value={formData.mensaje} onChange={handleChange} rows="4" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#8CFF00]/50 transition-colors resize-none"></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full py-4 text-[#020409] font-title tracking-widest font-bold text-sm transition-all duration-300 ${isSubmitting ? 'bg-[#8CFF00]/50 cursor-not-allowed' : 'bg-[#8CFF00] hover:bg-[#9dff26] shadow-[0_0_20px_rgba(140,255,0,0.2)]'}`}
                    >
                      {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default ContactoPage;
