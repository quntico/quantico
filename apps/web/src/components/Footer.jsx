import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

// IndexedDB Helper for storing local media files
const DB_NAME = 'QuanticoStorage';
const DB_VERSION = 1;
const STORE_NAME = 'media';

function getDB() {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    } catch (err) {
      reject(err);
    }
  });
}

function getLocalMedia(key) {
  return getDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }).catch((err) => {
    console.error('Error retrieving local media:', err);
    return null;
  });
}

function Footer({ logoType: propLogoType, logoText: propLogoText, logoImageUrl: propLogoImageUrl, logoHeight: propLogoHeight }) {
  const [logoType, setLogoType] = useState('text');
  const [logoText, setLogoText] = useState('QUANTICO');
  const [logoImageUrl, setLogoImageUrl] = useState('');
  const [logoHeight, setLogoHeight] = useState(40);

  useEffect(() => {
    if (propLogoType) setLogoType(propLogoType);
  }, [propLogoType]);

  useEffect(() => {
    if (propLogoText) setLogoText(propLogoText);
  }, [propLogoText]);

  useEffect(() => {
    if (propLogoImageUrl !== undefined) setLogoImageUrl(propLogoImageUrl);
  }, [propLogoImageUrl]);

  useEffect(() => {
    if (propLogoHeight) setLogoHeight(Number(propLogoHeight));
  }, [propLogoHeight]);

  useEffect(() => {
    let localUrl = '';
    
    if (!propLogoType && !propLogoText && !propLogoImageUrl && !propLogoHeight) {
      try {
        const stored = localStorage.getItem('quantico_config');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.logoType) {
            setLogoType(parsed.logoType);
          }
          if (parsed.logoText) {
            setLogoText(parsed.logoText);
          }
          if (parsed.logoHeight) {
            setLogoHeight(Number(parsed.logoHeight));
          }
          
          const activeLogoImg = parsed.logoImage || '';
          if (activeLogoImg.startsWith('local::')) {
            const key = activeLogoImg.replace('local::', '');
            getLocalMedia(key).then(file => {
              if (file) {
                localUrl = URL.createObjectURL(file);
                setLogoImageUrl(localUrl);
              }
            });
          } else {
            setLogoImageUrl(activeLogoImg);
          }
        }
      } catch (e) {
        console.error('Error loading logo config in footer:', e);
      }
    }

    return () => {
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, [propLogoType, propLogoText, propLogoImageUrl, propLogoHeight]);

  const quickLinks = [
    { name: 'Soluciones', path: '/#soluciones' },
    { name: 'Plataforma', path: '/#plataforma' },
    { name: 'Tecnología', path: '/#tecnologia' },
    { name: 'Sistemas', path: '/#sistemas' },
    { name: 'Equipos', path: '/#equipos' },
    { name: 'Industrias', path: '/#industrias' },
    { name: 'Contacto', path: '/#contacto' }
  ];

  return (
    <footer className="bg-[#020409] border-t border-white/5 pt-12 pb-6 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#8CFF00]/20 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            {logoType === 'image' && logoImageUrl ? (
              <img 
                src={logoImageUrl} 
                alt={logoText} 
                style={{ height: `${Math.min(logoHeight, 60)}px`, width: 'auto' }}
                className="object-contain max-w-[200px] mb-4" 
              />
            ) : (
              <span className="font-logo text-2xl text-white tracking-[0.2em] block mb-4">
                {logoText}
              </span>
            )}
            <p className="text-[#8A8F98] text-sm leading-relaxed max-w-sm mb-4">
              Plataforma tecnológica premium integrando hardware avanzado y software inteligente para la automatización, protección y optimización de infraestructuras críticas y operaciones industriales.
            </p>
            <a 
              href="https://www.quantico.llc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#F4F6FA] hover:text-[#8CFF00] transition-colors text-sm font-medium tracking-wide"
            >
              www.quantico.llc
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4 lg:pl-12">
            <h4 className="font-title text-white text-base tracking-widest mb-3">ENLACES RÁPIDOS</h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-8">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-[#8A8F98] hover:text-[#8CFF00] transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-current rounded-full opacity-50"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="font-title text-white text-base tracking-widest mb-3">CONTACTO CENTRAL</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-4 text-[#8A8F98]">
                <MapPin className="w-5 h-5 text-[#8CFF00] shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  QUANTICO Headquarters<br />
                  Global Operations Center
                </span>
              </div>
              <div className="flex items-center gap-4 text-[#8A8F98]">
                <Mail className="w-5 h-5 text-[#8CFF00] shrink-0" />
                <a href="mailto:info@quantico.llc" className="text-sm hover:text-white transition-colors">
                  info@quantico.llc
                </a>
              </div>
              <div className="flex items-center gap-4 text-[#8A8F98]">
                <Phone className="w-5 h-5 text-[#8CFF00] shrink-0" />
                <span className="text-sm">+1 (800) QUANTICO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#8A8F98]">
            © {new Date().getFullYear()} QUANTICO. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <Link to="#" className="text-xs text-[#8A8F98] hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link to="#" className="text-xs text-[#8A8F98] hover:text-white transition-colors">
              Términos
            </Link>
            <Link to="#" className="text-xs text-[#8A8F98] hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;