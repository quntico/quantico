import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Zap, Video, Image } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { getRemoteConfig, saveRemoteConfig, uploadMedia, initializeSupabase, supabase } from '@/lib/supabase.js';

const team = [
  { name: 'Dr. Elias Vance', role: 'Director de Tecnología (CTO)', initials: 'EV', bg: 'bg-blue-900/40' },
  { name: 'Sarah Chen', role: 'Directora de Investigación en IA', initials: 'SC', bg: 'bg-emerald-900/40' },
  { name: 'Marcus Ruhl', role: 'Director de Sistemas de Hardware', initials: 'MR', bg: 'bg-orange-900/40' },
  { name: 'Elena Rostova', role: 'Vicepresidenta de Seguridad Global', initials: 'ER', bg: 'bg-purple-900/40' }
];

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

function saveLocalMedia(key, file) {
  return getDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(file, key);
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
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

function NosotrosPage() {
  const defaultConfig = {
    logoType: 'text',
    logoImage: '',
    logoText: 'QUANTICO',
    logoHeight: 48,
    heroBgType: 'image',
    heroBgUrl: '',
    heroBgOpacity: 25,
    heroTitle: 'QUANTICO',
    heroSubtitle: 'Inteligencia · Seguridad · Automatización · Resiliencia',
    heroDesc1: 'Plataforma tecnológica para operaciones críticas, seguridad física, ciberseguridad, automatización, inteligencia artificial y sistemas industriales complejos.',
    heroDesc2: 'Integramos software, hardware, sensores, cámaras, control de acceso, robots, drones, analítica avanzada y centros de control para proteger, automatizar y optimizar empresas e infraestructura crítica.',
    heroFooterText: 'SOFTWARE + HARDWARE + IA + SISTEMAS DE SEGURIDAD + INTEGRACIÓN OT/IT',
    nosotrosTitle: 'NOSOTROS',
    nosotrosSubtitle: 'INGENIERÍA, INTELIGENCIA Y SEGURIDAD PARA OPERACIONES CRÍTICAS.',
    nosotrosDesc: 'QUANTICO desarrolla e integra tecnología física y digital para empresas que requieren visibilidad, protección, automatización y resiliencia. Unimos software, hardware, IA y sistemas de seguridad para crear soluciones completas, escalables y operativas.',
    nosotrosDescAlign: 'center',
    nosotrosBgType: 'image',
    nosotrosBgUrl: '',
    nosotrosBgOpacity: 15
  };

  const [config, setConfig] = useState(defaultConfig);
  const [isAdmin, setIsAdmin] = useState(false);
  const [resolvedNosotrosBgUrl, setResolvedNosotrosBgUrl] = useState('');
  const inlineNosotrosFileInputRef = useRef(null);
  const createdBlobUrlsRef = useRef([]);

  const createBlobUrl = (file) => {
    const url = URL.createObjectURL(file);
    createdBlobUrlsRef.current.push(url);
    return url;
  };

  const cleanupBlobUrls = () => {
    createdBlobUrlsRef.current.forEach(url => {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {}
    });
    createdBlobUrlsRef.current = [];
  };

  // Check Admin & Load Config
  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('quantico_admin') === 'true');
    
    const stored = localStorage.getItem('quantico_config');
    let activeConfig = defaultConfig;
    if (stored) {
      try {
        activeConfig = { ...defaultConfig, ...JSON.parse(stored) };
        setConfig(activeConfig);
      } catch (e) {
        console.error('Error parsing local config:', e);
      }
    }

    // Initialize Supabase & fetch remote config
    initializeSupabase();
    getRemoteConfig().then((remote) => {
      if (remote) {
        const merged = { ...defaultConfig, ...remote };
        setConfig(merged);
        localStorage.setItem('quantico_config', JSON.stringify(merged));
      }
    }).catch(err => console.error('Failed to get remote config:', err));

    return () => {
      cleanupBlobUrls();
    };
  }, []);

  // Resolve Nosotros background media URL
  useEffect(() => {
    let isMounted = true;
    const activeUrl = config.nosotrosBgUrl;

    if (activeUrl && activeUrl.startsWith('local::')) {
      const key = activeUrl.replace('local::', '');
      getLocalMedia(key).then(file => {
        if (file && isMounted) {
          cleanupBlobUrls();
          const localUrl = createBlobUrl(file);
          setResolvedNosotrosBgUrl(localUrl);
        }
      });
    } else {
      if (isMounted) {
        setResolvedNosotrosBgUrl(activeUrl || '');
      }
    }

    return () => {
      isMounted = false;
    };
  }, [config.nosotrosBgUrl]);

  const handleInlineEdit = (key, value) => {
    const updated = { ...config, [key]: value };
    setConfig(updated);
    localStorage.setItem('quantico_config', JSON.stringify(updated));
    saveRemoteConfig(updated).catch(err => console.error('Failed to sync inline edit:', err));
  };

  const handleInlineMediaUpload = async (prefix, file, isVideo) => {
    const dbKey = `${prefix}_media`;
    try {
      await saveLocalMedia(dbKey, file);
    } catch (e) {
      console.error('Failed to save inline media in IndexedDB:', e);
    }

    let remoteUrl = '';
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${prefix}_${Date.now()}.${ext}`;
      remoteUrl = await uploadMedia('quantico-media', fileName, file);
    } catch (e) {
      console.error('Failed to upload inline media to Supabase:', e);
    }

    const mediaUrlKey = `${prefix}Url`;
    const mediaTypeKey = `${prefix}Type`;
    const finalUrl = remoteUrl || `local::${dbKey}`;
    
    const updated = {
      ...config,
      [mediaUrlKey]: finalUrl,
      [mediaTypeKey]: isVideo ? 'video' : 'image'
    };
    
    setConfig(updated);
    localStorage.setItem('quantico_config', JSON.stringify(updated));
    try {
      await saveRemoteConfig(updated);
    } catch (e) {
      console.error('Failed to sync remote config after inline upload:', e);
    }
  };

  return (
    <>
      <Helmet>
        <title>QUANTICO | Nosotros</title>
        <meta name="description" content="Ingeniería, inteligencia y seguridad para operaciones críticas." />
      </Helmet>
      
      <Header />

      {/* Hidden file inputs for direct inline media upload */}
      {isAdmin && (
        <input
          type="file"
          ref={inlineNosotrosFileInputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const isVideo = file.type.startsWith('video/');
              handleInlineMediaUpload('nosotrosBg', file, isVideo);
            }
          }}
          accept="image/*,video/*"
          className="hidden"
        />
      )}

      <main className="bg-[#020409] text-white selection:bg-[#8CFF00] selection:text-black min-h-screen">
        
        {/* HERO */}
        <section className="min-h-[60dvh] flex items-center justify-center border-b border-white/5 pt-20 relative overflow-hidden">
          
          {/* Dynamic Background Media for Nosotros */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
            {config.nosotrosBgUrl ? (
              config.nosotrosBgType === 'video' ? (
                <video 
                  src={resolvedNosotrosBgUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                  style={{ opacity: (config.nosotrosBgOpacity ?? 15) / 100 }}
                />
              ) : (
                <img 
                  src={resolvedNosotrosBgUrl} 
                  className="w-full h-full object-cover"
                  style={{ opacity: (config.nosotrosBgOpacity ?? 15) / 100 }}
                  alt="Nosotros Background"
                />
              )
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
            )}
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12">
            
            {/* Inline Admin Bar for Nosotros Background Media */}
            {isAdmin && (
              <div className="flex flex-col md:flex-row items-center gap-3 bg-[#020409]/90 border border-white/10 p-3 rounded-lg backdrop-blur-md w-fit mx-auto mb-8 select-none shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <button
                  type="button"
                  onClick={() => {
                    if (inlineNosotrosFileInputRef.current) inlineNosotrosFileInputRef.current.click();
                  }}
                  className="bg-transparent border border-white/20 text-white font-title font-bold text-[10px] tracking-widest px-3 py-1.5 hover:border-[#8CFF00] hover:text-[#8CFF00] transition-all uppercase flex items-center justify-center gap-1.5 rounded"
                >
                  <Video className="w-3.5 h-3.5" />
                  Subir Fondo
                </button>
                
                {/* Background Type Toggle */}
                <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                  <button
                    type="button"
                    onClick={() => handleInlineEdit('nosotrosBgType', 'image')}
                    className={`px-2 py-1 text-[10px] font-bold rounded uppercase transition-colors ${config.nosotrosBgType !== 'video' ? 'bg-[#8CFF00] text-black' : 'text-white/60 hover:text-white'}`}
                  >
                    Imagen
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInlineEdit('nosotrosBgType', 'video')}
                    className={`px-2 py-1 text-[10px] font-bold rounded uppercase transition-colors ${config.nosotrosBgType === 'video' ? 'bg-[#8CFF00] text-black' : 'text-white/60 hover:text-white'}`}
                  >
                    Video
                  </button>
                </div>

                <div className="flex items-center gap-3 border-l border-white/10 pl-3 min-w-[130px]">
                  <span className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Filtro Opacidad:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={config.nosotrosBgOpacity ?? 15}
                    onChange={(e) => handleInlineEdit('nosotrosBgOpacity', Number(e.target.value))}
                    className="accent-[#8CFF00] bg-white/10 h-1 rounded-lg appearance-none cursor-pointer w-20"
                  />
                  <span className="text-xs font-logo text-[#8CFF00] w-8 text-right">
                    {config.nosotrosBgOpacity ?? 15}%
                  </span>
                </div>
              </div>
            )}

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleInlineEdit('nosotrosTitle', e.currentTarget.innerText)}
              className={`font-logo text-5xl md:text-7xl text-white mb-6 tracking-[0.15em] glow-text transition-all outline-none ${isAdmin ? 'hover:bg-white/5 focus:bg-white/5 px-2 py-1 rounded cursor-text border border-dashed border-[#8CFF00]/30' : ''}`}
            >
              {config.nosotrosTitle || 'NOSOTROS'}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleInlineEdit('nosotrosSubtitle', e.currentTarget.innerText)}
              className={`font-title text-xl md:text-2xl text-[#8A8F98] mb-8 tracking-widest uppercase transition-all outline-none ${isAdmin ? 'hover:bg-white/5 focus:bg-white/5 px-2 py-1 rounded cursor-text border border-dashed border-[#8CFF00]/30' : ''}`}
            >
              {config.nosotrosSubtitle || 'INGENIERÍA, INTELIGENCIA Y SEGURIDAD PARA OPERACIONES CRÍTICAS.'}
            </motion.p>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            {/* Paragraph Alignment Toolbar */}
            {isAdmin && (
              <div className="flex justify-center gap-2 mb-6 bg-[#020409]/80 border border-white/10 p-1.5 rounded-lg w-fit mx-auto select-none">
                <button
                  type="button"
                  onClick={() => handleInlineEdit('nosotrosDescAlign', 'left')}
                  className={`px-2 py-1 text-[10px] font-bold tracking-wider rounded uppercase transition-colors ${config.nosotrosDescAlign === 'left' ? 'bg-[#8CFF00] text-black' : 'text-white/60 hover:text-white'}`}
                >
                  Izquierda
                </button>
                <button
                  type="button"
                  onClick={() => handleInlineEdit('nosotrosDescAlign', 'center')}
                  className={`px-2 py-1 text-[10px] font-bold tracking-wider rounded uppercase transition-colors ${config.nosotrosDescAlign === 'center' ? 'bg-[#8CFF00] text-black' : 'text-white/60 hover:text-white'}`}
                >
                  Centro
                </button>
                <button
                  type="button"
                  onClick={() => handleInlineEdit('nosotrosDescAlign', 'right')}
                  className={`px-2 py-1 text-[10px] font-bold tracking-wider rounded uppercase transition-colors ${config.nosotrosDescAlign === 'right' ? 'bg-[#8CFF00] text-black' : 'text-white/60 hover:text-white'}`}
                >
                  Derecha
                </button>
                <button
                  type="button"
                  onClick={() => handleInlineEdit('nosotrosDescAlign', 'justify')}
                  className={`px-2 py-1 text-[10px] font-bold tracking-wider rounded uppercase transition-colors ${config.nosotrosDescAlign === 'justify' ? 'bg-[#8CFF00] text-black' : 'text-white/60 hover:text-white'}`}
                >
                  Justificar
                </button>
              </div>
            )}

            <p 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleInlineEdit('nosotrosDesc', e.currentTarget.innerText)}
              className={`text-xl md:text-3xl text-[#F4F6FA] leading-relaxed font-light text-balance transition-all outline-none ${isAdmin ? 'hover:bg-white/5 focus:bg-white/5 px-2 py-1 rounded cursor-text border border-dashed border-[#8CFF00]/30' : ''}`}
              style={{ textAlign: config.nosotrosDescAlign || 'center' }}
            >
              {config.nosotrosDesc || 'QUANTICO desarrolla e integra tecnología física y digital para empresas que requieren visibilidad, protección, automatización y resiliencia. Unimos software, hardware, IA y sistemas de seguridad para crear soluciones completas, escalables y operativas.'}
            </p>
          </div>
        </section>

        {/* MISSION / VISION (Zig-Zag Layout) */}
        <section className="py-24 border-y border-white/5 bg-[#050A12]/30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="glass-card p-12 order-2 md:order-1">
                <Target className="w-12 h-12 text-[#8CFF00] mb-8" />
                <h2 className="font-title text-3xl text-white mb-6 tracking-wider">MISIÓN</h2>
                <p className="text-[#8A8F98] text-lg leading-relaxed">
                  Proveer los sistemas más avanzados y confiables para proteger y optimizar la infraestructura crítica a nivel global, eliminando silos entre hardware y software, y convirtiendo datos complejos en decisiones automatizadas e inteligentes.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=1000" alt="Ingeniería avanzada y servidores" className="rounded-2xl border border-white/10 opacity-80" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" alt="Operaciones satelitales y datos" className="rounded-2xl border border-white/10 opacity-80" />
              </div>
              <div className="glass-card p-12">
                <Eye className="w-12 h-12 text-[#8CFF00] mb-8" />
                <h2 className="font-title text-3xl text-white mb-6 tracking-wider">VISIÓN</h2>
                <p className="text-[#8A8F98] text-lg leading-relaxed">
                  Ser el estándar mundial en sistemas operativos para entornos industriales y de alta seguridad, donde la inteligencia artificial y el hardware se fusionen de manera imperceptible para garantizar una resiliencia total y cero interrupciones.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* VALORES */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-title text-4xl text-center text-white mb-16 tracking-widest">NUESTROS VALORES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-8">
                <ShieldCheck className="w-8 h-8 text-[#8CFF00] mb-6" />
                <h3 className="font-title text-xl text-white mb-3">RESILIENCIA ABSOLUTA</h3>
                <p className="text-[#8A8F98] text-sm">Nuestras soluciones están diseñadas para no fallar. Asumimos la responsabilidad de las operaciones más críticas de nuestros clientes.</p>
              </div>
              <div className="glass-card p-8">
                <Zap className="w-8 h-8 text-[#8CFF00] mb-6" />
                <h3 className="font-title text-xl text-white mb-3">INNOVACIÓN TÁCTICA</h3>
                <p className="text-[#8A8F98] text-sm">No creamos tecnología por moda, sino por utilidad directa. Cada avance en IA o hardware debe resolver un problema operativo real.</p>
              </div>
              <div className="glass-card p-8">
                <Target className="w-8 h-8 text-[#8CFF00] mb-6" />
                <h3 className="font-title text-xl text-white mb-3">INTEGRACIÓN TOTAL</h3>
                <p className="text-[#8A8F98] text-sm">Creemos en la unificación. Rompemos las barreras entre OT (Tecnología Operativa) e IT para crear sistemas holísticos y transparentes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPO LIDERAZGO */}
        <section className="py-24 border-t border-white/5 bg-[#050A12]/50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-title text-4xl text-center text-white mb-16 tracking-widest">EQUIPO LÍDER</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="glass-card p-8 flex flex-col items-center text-center">
                  <div className={`w-24 h-24 rounded-2xl ${member.bg} flex items-center justify-center border border-white/10 mb-6`}>
                    <span className="font-logo text-2xl text-white">{member.initials}</span>
                  </div>
                  <h3 className="font-title text-xl text-white tracking-wider mb-2">{member.name}</h3>
                  <p className="text-[#8CFF00] text-sm font-medium tracking-wide uppercase">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default NosotrosPage;
