
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

function ContactForm() {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const industrias = [
    'Industrial',
    'Energía',
    'Logística',
    'Salud',
    'Alimentos',
    'Corporativo',
    'Gobierno',
    'Financiero',
    'Transporte',
    'Infraestructura crítica'
  ];

  const soluciones = [
    'SENTINEL',
    'RISK ENGINE',
    'BIOSAFE',
    'SHIELD',
    'CYBER',
    'FLOW',
    'MOBILITY',
    'RESPONSE',
    'ANALYTICS',
    'AI'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

        toast('Solicitud enviada correctamente');
        
        setFormData({
          nombre: '',
          empresa: '',
          cargo: '',
          email: '',
          telefono: '',
          industria: '',
          solucion: '',
          mensaje: ''
        });
      } catch (error) {
        toast('Error al enviar la solicitud. Por favor, intente nuevamente.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="glass-card rounded-xl p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-foreground">Nombre</Label>
            <Input
              id="nombre"
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="empresa" className="text-foreground">Empresa</Label>
            <Input
              id="empresa"
              type="text"
              required
              value={formData.empresa}
              onChange={(e) => handleChange('empresa', e.target.value)}
              className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
              placeholder="Nombre de tu empresa"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="cargo" className="text-foreground">Cargo</Label>
            <Input
              id="cargo"
              type="text"
              required
              value={formData.cargo}
              onChange={(e) => handleChange('cargo', e.target.value)}
              className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
              placeholder="Tu posición"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-foreground">Teléfono</Label>
            <Input
              id="telefono"
              type="tel"
              required
              value={formData.telefono}
              onChange={(e) => handleChange('telefono', e.target.value)}
              className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industria" className="text-foreground">Industria</Label>
            <Select value={formData.industria} onValueChange={(value) => handleChange('industria', value)}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground">
                <SelectValue placeholder="Selecciona tu industria" />
              </SelectTrigger>
              <SelectContent>
                {industrias.map((industria) => (
                  <SelectItem key={industria} value={industria}>
                    {industria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="solucion" className="text-foreground">Solución de interés</Label>
          <Select value={formData.solucion} onValueChange={(value) => handleChange('solucion', value)}>
            <SelectTrigger className="bg-muted/50 border-border text-foreground">
              <SelectValue placeholder="Selecciona una solución" />
            </SelectTrigger>
            <SelectContent>
              {soluciones.map((solucion) => (
                <SelectItem key={solucion} value={solucion}>
                  {solucion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mensaje" className="text-foreground">Mensaje</Label>
          <Textarea
            id="mensaje"
            required
            value={formData.mensaje}
            onChange={(e) => handleChange('mensaje', e.target.value)}
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground min-h-[120px]"
            placeholder="Cuéntanos sobre tus necesidades..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 rounded-lg transition-all duration-300 active:scale-[0.98]"
        >
          {isSubmitting ? 'Enviando...' : 'Solicitar diagnóstico QUANTICO'}
        </Button>

        <div className="text-center pt-4">
          <a 
            href="https://www.quantico.llc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
          >
            www.quantico.llc
          </a>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
