import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Lock } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet.jsx';

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

function Header({ logoType: propLogoType, logoText: propLogoText, logoImageUrl: propLogoImageUrl, logoHeight: propLogoHeight }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoType, setLogoType] = useState('text');
  const [logoText, setLogoText] = useState('QUANTICO');
  const [logoImageUrl, setLogoImageUrl] = useState('');
  const [logoHeight, setLogoHeight] = useState(48);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const location = useLocation();

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('quantico_admin') === 'true');
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
        console.error('Error loading logo config:', e);
      }
    }

    return () => {
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, [propLogoType, propLogoText, propLogoImageUrl, propLogoHeight]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '2020') {
      sessionStorage.setItem('quantico_admin', 'true');
      setIsAdmin(true);
      setShowLoginModal(false);
      setPassword('');
      setError('');
      window.location.reload();
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('quantico_admin');
    setIsAdmin(false);
    window.location.reload();
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Plataforma', path: '/plataforma' },
    { name: 'Soluciones', path: '/soluciones' },
    { name: 'Tecnología', path: '/tecnologia' },
    { name: 'Sistemas', path: '/sistemas' },
    { name: 'Equipos', path: '/equipos' },
    { name: 'Industrias', path: '/industrias' },
    { name: 'Casos de uso', path: '/casos-de-uso' }
  ];

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavLinkClick = (e, path) => {
    const sectionIds = {
      '/': 'inicio',
      '/nosotros': 'nosotros',
      '/plataforma': 'plataforma',
      '/soluciones': 'soluciones',
      '/tecnologia': 'tecnologia',
      '/sistemas': 'sistemas',
      '/equipos': 'equipos',
      '/industrias': 'industrias',
      '/casos-de-uso': 'casos-de-uso'
    };
    
    if (location.pathname === '/' && sectionIds[path]) {
      e.preventDefault();
      const el = document.getElementById(sectionIds[path]);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-[#020409]/80 backdrop-blur-md border-white/10 py-[18px] shadow-lg'
            : 'bg-transparent border-transparent py-[22px]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center h-6 md:h-8 relative z-10 select-none">
              <Link 
                to="/" 
                onClick={handleLogoClick}
                className="absolute left-0 top-1/2 flex items-center group whitespace-nowrap"
                style={{ transform: 'translateY(calc(-50% + 20px))' }}
              >
                {logoType === 'image' && logoImageUrl ? (
                  <img 
                    src={logoImageUrl} 
                    alt={logoText} 
                    style={{ height: `${logoHeight}px`, width: 'auto' }}
                    className="object-contain max-w-[300px] block" 
                  />
                ) : (
                  <span className="font-logo text-[1.9rem] md:text-[2.55rem] text-white tracking-[0.2em] group-hover:text-[#8CFF00] transition-colors duration-300 leading-none flex items-center">
                    {logoText}
                  </span>
                )}
              </Link>
            </div>

            {/* CTA & Compact Menu Toggle */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Admin Lock Button */}
              <button 
                onClick={() => setShowLoginModal(true)} 
                className="text-white/40 hover:text-[#8CFF00] transition-colors p-2 flex items-center justify-center"
                title="Acceso Admin"
              >
                <Lock className="w-4 h-4" />
              </button>

              <Link to="/contacto" className="hidden md:block">
                <button className="bg-transparent border border-[#8CFF00]/40 text-[#8CFF00] hover:bg-[#8CFF00] hover:text-[#020409] px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300">
                  Contacto
                </button>
              </Link>

              {/* Menu Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-white hover:text-[#8CFF00] transition-colors p-2">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#020409]/95 backdrop-blur-xl border-white/10 p-8 w-full sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-12">
                      {logoType === 'image' && logoImageUrl ? (
                        <img 
                          src={logoImageUrl} 
                          alt={logoText} 
                          style={{ height: `${Math.min(logoHeight, 48)}px`, width: 'auto' }}
                          className="object-contain max-w-[200px]" 
                        />
                      ) : (
                        <span className="font-logo text-2xl text-white tracking-[0.2em] leading-none">{logoText}</span>
                      )}
                    </div>
                    
                    <nav className="flex flex-col gap-6">
                      {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                          <SheetClose asChild key={link.name}>
                            <Link
                              to={link.path}
                              onClick={(e) => handleNavLinkClick(e, link.path)}
                              className={`text-lg uppercase tracking-wider transition-colors ${
                                isActive ? 'font-bold text-[#8CFF00]' : 'font-medium text-[#B8BDC7] hover:text-[#8CFF00]'
                              }`}
                            >
                              {link.name}
                            </Link>
                          </SheetClose>
                        );
                      })}
                      <SheetClose asChild>
                        <Link
                          to="/contacto"
                          className="text-lg font-medium text-[#B8BDC7] hover:text-[#8CFF00] uppercase tracking-wider transition-colors"
                        >
                          Contacto
                        </Link>
                      </SheetClose>
                    </nav>

                    <div className="mt-auto pt-12">
                      <SheetClose asChild>
                        <Link to="/contacto" className="block w-full">
                          <button className="w-full bg-[#8CFF00] text-[#020409] px-6 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300">
                            Solicitar diagnóstico
                          </button>
                        </Link>
                      </SheetClose>
                      
                      <div className="mt-6 flex justify-center border-t border-white/5 pt-4">
                        <button 
                          onClick={() => setShowLoginModal(true)} 
                          className="text-[10px] text-[#8A8F98] hover:text-[#8CFF00] transition-colors flex items-center gap-1.5 py-1 tracking-widest uppercase font-semibold"
                        >
                          <Lock className="w-3 h-3" />
                          Acceso Admin
                        </button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </header>

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#020409]/85 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-[380px] p-8 border border-white/10 rounded-xl shadow-2xl relative">
            <button 
              onClick={() => { setShowLoginModal(false); setError(''); setPassword(''); }} 
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              ✕
            </button>
            <div className="flex flex-col items-center mb-6">
              <div className="w-11 h-11 rounded-full bg-[#8CFF00]/10 border border-[#8CFF00]/30 flex items-center justify-center text-[#8CFF00] mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-logo text-sm text-white tracking-[0.15em] uppercase">Control Operativo</h3>
              <p className="text-[11px] text-[#8A8F98] mt-1 text-center font-medium">Ingrese la clave de administrador para continuar.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-4 py-3 text-xs tracking-wider focus:outline-none transition-all rounded"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs font-semibold text-center">{error}</p>
              )}
              <button 
                type="submit" 
                className="w-full bg-[#8CFF00] text-[#020409] font-title tracking-widest font-bold text-xs py-3.5 hover:bg-white transition-all uppercase rounded"
              >
                Acceder
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Floating Status Bar */}
      {isAdmin && (
        <div className="fixed bottom-4 left-4 z-[9999] bg-[#020409]/95 border border-[#8CFF00]/30 rounded-lg p-3 shadow-2xl flex items-center gap-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8CFF00] animate-pulse"></span>
            <span className="text-xs font-logo text-[#8CFF00] uppercase tracking-wider">Modo Admin</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <button 
            onClick={handleLogout}
            className="text-[10px] uppercase font-bold tracking-widest text-[#B8BDC7] hover:text-red-400 transition-colors"
          >
            Salir
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
