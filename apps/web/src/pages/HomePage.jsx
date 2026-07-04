import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Brain, Zap, Activity, Eye, AlertTriangle, Users, Lock, 
  TrendingUp, Truck, BarChart3, Database, Server, Cpu, Video, 
  BellRing, Network, Radar, Fingerprint, Factory, ArrowRight,
  MonitorPlay, ShieldAlert, FileText, CheckCircle2, ChevronRight, Map, Settings,
  Upload, Image
} from 'lucide-react';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { getRemoteConfig, saveRemoteConfig, uploadMedia, initializeSupabase, supabase } from '@/lib/supabase.js';
import SolutionCard from '@/components/SolutionCard.jsx';
import SystemCard from '@/components/SystemCard.jsx';
import SmartIndex from '@/components/SmartIndex.jsx';
import EquipmentCard from '@/components/EquipmentCard.jsx';
import TechnologyItem from '@/components/TechnologyItem.jsx';
import IndustryCard from '@/components/IndustryCard.jsx';

// Data Arrays to keep JSX clean
const capabilities = [
  { id: '01', title: 'INTELIGENCIA', desc: 'Datos conectados, analítica avanzada, IA y decisiones en tiempo real.' },
  { id: '02', title: 'SEGURIDAD', desc: 'Seguridad física, ciberseguridad, perímetro, cámaras, sensores y protección de activos.' },
  { id: '03', title: 'AUTOMATIZACIÓN', desc: 'Workflows, RPA, apps, integración de sistemas y automatización operativa.' },
  { id: '04', title: 'RESILIENCIA', desc: 'Continuidad, respuesta, contingencia, recuperación y operación segura.' },
];

const solutions = [
  { num: '01', title: 'SENTINEL', tag: 'Centro de control inteligente', desc: 'Software + sensores + dashboards + operación 24/7' },
  { num: '02', title: 'RISK ENGINE', tag: 'Motor de análisis de riesgo industrial', desc: 'IA + sensores + alertas + protocolos' },
  { num: '03', title: 'BIOSAFE', tag: 'Bioseguridad y seguridad ambiental', desc: 'Monitoreo + sensores + indicadores' },
  { num: '04', title: 'SHIELD', tag: 'Seguridad física autónoma', desc: 'Cámaras + control de acceso + IA visual' },
  { num: '05', title: 'CYBER', tag: 'Ciberseguridad OT + IT', desc: 'Redes industriales + servidores + endpoints' },
  { num: '06', title: 'FLOW', tag: 'Automatización de procesos', desc: 'RPA + workflows + apps + reportes' },
  { num: '07', title: 'MOBILITY', tag: 'Robots y drones autónomos', desc: 'AMRs + drones + patrullaje' },
  { num: '08', title: 'RESPONSE', tag: 'Continuidad operativa y contingencia', desc: 'SOP digitales + rutas de evacuación' },
  { num: '09', title: 'ANALYTICS', tag: 'Analítica avanzada e inteligencia de datos', desc: 'Dashboards + predicción + reportes' },
  { num: '10', title: 'AI', tag: 'Inteligencia artificial aplicada al negocio', desc: 'Asistentes + visión por computadora' },
];

const systems = [
  { icon: MonitorPlay, title: 'Centros de control', desc: 'Videowalls, consolas y software NOC/SOC integrado.' },
  { icon: Radar, title: 'Seguridad perimetral', desc: 'Radares, sensores sísmicos y barreras físicas activas.' },
  { icon: Lock, title: 'Ciberseguridad industrial', desc: 'Protección de redes SCADA, PLC y aislamiento OT/IT.' },
  { icon: Zap, title: 'Automatización OT/IT', desc: 'Puentes seguros entre tecnología operativa y de información.' },
  { icon: Activity, title: 'Monitoreo ambiental', desc: 'Sensores de gas, temperatura, humedad y calidad de aire.' },
  { icon: Eye, title: 'Videovigilancia inteligente', desc: 'CCTV con analítica IA en borde para detección de anomalías.' },
  { icon: ShieldAlert, title: 'Respuesta y contingencia', desc: 'Sistemas de alarma temprana y supresión de incidentes.' },
  { icon: Database, title: 'Integración de datos', desc: 'Data lakes industriales para telemetría y logs operacionales.' },
];

const equipment = [
  { icon: Video, title: 'Cámaras inteligentes', desc: 'PTZ y térmicas con IA' },
  { icon: Eye, title: 'CCTV industrial', desc: 'Circuitos cerrados robustos' },
  { icon: Fingerprint, title: 'Control de acceso', desc: 'Biometría y torniquetes' },
  { icon: Cpu, title: 'Sensores IoT', desc: 'Telemetría industrial' },
  { icon: Server, title: 'Servidores edge', desc: 'Cómputo en sitio' },
  { icon: MonitorPlay, title: 'Videowalls', desc: 'Displays para NOC/SOC' },
  { icon: Radar, title: 'Drones', desc: 'Patrullaje aéreo autónomo' },
  { icon: Truck, title: 'Robots autónomos', desc: 'AMRs y perros robóticos' },
  { icon: Network, title: 'Gabinetes y redes', desc: 'Infraestructura física' },
  { icon: BellRing, title: 'Sistemas de alarma', desc: 'Sirenas y estrobos' },
];

const technologies = [
  { icon: Eye, name: 'IA VISUAL' },
  { icon: Brain, name: 'MACHINE LEARNING' },
  { icon: Server, name: 'EDGE COMPUTING' },
  { icon: Database, name: 'CLOUD' },
  { icon: Network, name: 'APIs' },
  { icon: Cpu, name: 'IoT' },
  { icon: Factory, name: 'OT/IT' },
  { icon: BarChart3, name: 'DASHBOARDS' },
  { icon: Zap, name: 'AUTOMATIZACIÓN' },
  { icon: Lock, name: 'CIBERSEGURIDAD' },
];

const industries = [
  { icon: Factory, name: 'INDUSTRIAL' },
  { icon: Zap, name: 'ENERGÍA' },
  { icon: Settings, name: 'MANUFACTURA' },
  { icon: Truck, name: 'LOGÍSTICA' },
  { icon: Shield, name: 'GOBIERNO' },
  { icon: Users, name: 'CORPORATIVO' },
  { icon: Activity, name: 'SALUD' },
  { icon: Database, name: 'ALIMENTOS' },
  { icon: Map, name: 'INFRAESTRUCTURA' },
  { icon: ShieldAlert, name: 'SEG. PRIVADA' },
];

const useCases = [
  'Monitoreo de plantas industriales', 'Seguridad perimetral autónoma', 'Centro de control corporativo',
  'Ciberseguridad OT/IT', 'Automatización de reportes', 'Detección de anomalías',
  'Patrullaje con drones', 'Respuesta ante incidentes', 'Supervisión energética', 'Continuidad operativa'
];

const timeline = [
  { num: '01', title: 'Diagnóstico', desc: 'Análisis técnico de operación actual' },
  { num: '02', title: 'Diseño de solución', desc: 'Arquitectura personalizada' },
  { num: '03', title: 'Integración', desc: 'Hardware y software' },
  { num: '04', title: 'Configuración', desc: 'Plataforma y dashboards' },
  { num: '05', title: 'Pruebas y cap.', desc: 'Validación y entrenamiento' },
  { num: '06', title: 'Operación', desc: 'Monitoreo y mantenimiento' },
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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    }
  }
};

const titleLetterVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 1.4,
    filter: 'blur(8px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
    }
  }
};

const subtitleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    }
  }
};

const subtitleWordVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' } 
  }
};

const subtitleDotVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, type: 'spring', stiffness: 200 } 
  }
};

const dotColors = [
  'bg-[#0EA5E9] shadow-[0_0_10px_rgba(14,165,233,0.8)]', // Cyan
  'bg-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.8)]', // Purple
  'bg-[#F97316] shadow-[0_0_10px_rgba(249,115,22,0.8)]', // Orange
];

function HomePage() {
  const defaultConfig = {
    logoType: 'text',
    logoImage: '',
    logoText: 'QUANTICO',
    logoHeight: 48,
    heroBgType: 'image',
    heroBgUrl: 'https://horizons-cdn.hostinger.com/2cbd254a-61a6-4b67-bef5-67f8a8438c87/625a92490414445dff1b57fec9bc568b.png',
    heroTitle: 'QUANTICO',
    heroSubtitle: 'Inteligencia · Seguridad · Automatización · Resiliencia',
    heroDesc1: 'Plataforma tecnológica para operaciones críticas, seguridad física, ciberseguridad, automatización, inteligencia artificial y sistemas industriales complejos.',
    heroDesc2: 'Integramos software, hardware, sensores, cámaras, control de acceso, robots, drones, analítica avanzada y centros de control para proteger, automatizar y optimizar empresas e infraestructura crítica.',
    heroFooterText: 'SOFTWARE + HARDWARE + IA + SISTEMAS DE SEGURIDAD + INTEGRACIÓN OT/IT'
  };

  const [config, setConfig] = useState(defaultConfig);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formConfig, setFormConfig] = useState(defaultConfig);

  const [resolvedBgUrl, setResolvedBgUrl] = useState(defaultConfig.heroBgUrl);
  const [pendingFile, setPendingFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Logo upload specific states
  const [pendingLogoFile, setPendingLogoFile] = useState(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState('');
  const [isLogoDragging, setIsLogoDragging] = useState(false);
  const [dbUrl, setDbUrl] = useState(localStorage.getItem('quantico_supabase_url') || 'https://btkkrvztbeljpacdlpzc.supabase.co');
  const [dbKey, setDbKey] = useState(localStorage.getItem('quantico_supabase_anon_key') || '');
  const [deployHookUrl, setDeployHookUrl] = useState(localStorage.getItem('quantico_deploy_hook_url') || 'https://api.vercel.com/v1/integrations/deploy/prj_roMjQyyJaSjvi1AxdFLTBgFxqErx/IseedN5TIw');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState('');
  const logoFileInputRef = useRef(null);
  
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

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('quantico_admin') === 'true');
    
    // 1. Load from localStorage for immediate display
    const stored = localStorage.getItem('quantico_config');
    let activeConfig = defaultConfig;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        activeConfig = { ...defaultConfig, ...parsed };
        setConfig(activeConfig);
        setFormConfig(activeConfig);
      } catch (e) {
        console.error('Error parsing local config:', e);
      }
    }

    // 2. Sync from Supabase asynchronously
    const syncRemote = async () => {
      try {
        const remote = await getRemoteConfig();
        if (remote) {
          const merged = { ...defaultConfig, ...remote };
          // If remote config differs, update it
          if (JSON.stringify(merged) !== JSON.stringify(activeConfig)) {
            localStorage.setItem('quantico_config', JSON.stringify(merged));
            setConfig(merged);
            setFormConfig(merged);
          }
        }
      } catch (err) {
        console.error('Failed to sync remote config:', err);
      }
    };

    syncRemote();
  }, []);

  // Resolve background media URL (remote or local from IndexedDB)
  useEffect(() => {
    let revoked = false;
    let localUrl = '';

    const loadMedia = async () => {
      const activeUrl = config.heroBgUrl;
      if (activeUrl && activeUrl.startsWith('local::')) {
        try {
          const key = activeUrl.replace('local::', '');
          const file = await getLocalMedia(key);
          if (file && !revoked) {
            localUrl = URL.createObjectURL(file);
            setResolvedBgUrl(localUrl);
            return;
          }
        } catch (e) {
          console.error('Error loading local media from IndexedDB:', e);
        }
      }
      if (!revoked) {
        setResolvedBgUrl(activeUrl || defaultConfig.heroBgUrl);
      }
    };
    
    loadMedia();
    
    return () => {
      revoked = true;
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, [config.heroBgUrl]);

  // When showing/hiding edit modal
  useEffect(() => {
    if (showEditModal) {
      setPendingFile(null);
      setPendingLogoFile(null);
      
      if (formConfig.heroBgUrl.startsWith('local::')) {
        const key = formConfig.heroBgUrl.replace('local::', '');
        getLocalMedia(key).then(file => {
          if (file) {
            const url = createBlobUrl(file);
            setPreviewUrl(url);
          }
        });
      } else {
        setPreviewUrl(formConfig.heroBgUrl);
      }

      if (formConfig.logoImage && formConfig.logoImage.startsWith('local::')) {
        const key = formConfig.logoImage.replace('local::', '');
        getLocalMedia(key).then(file => {
          if (file) {
            const url = createBlobUrl(file);
            setLogoPreviewUrl(url);
          }
        });
      } else {
        setLogoPreviewUrl(formConfig.logoImage || '');
      }
    } else {
      cleanupBlobUrls();
      setPreviewUrl('');
      setLogoPreviewUrl('');
    }
    return () => {
      cleanupBlobUrls();
    };
  }, [showEditModal]);

  const handleFileProcess = (file) => {
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      alert('Solo se admiten archivos de imagen o video.');
      return;
    }
    
    const objUrl = createBlobUrl(file);
    setPendingFile(file);
    setPreviewUrl(objUrl);
    
    setFormConfig({
      ...formConfig,
      heroBgType: isVideo ? 'video' : 'image',
      heroBgUrl: objUrl
    });
  };

  const handleLogoFileProcess = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Solo se admiten archivos de imagen para el logo.');
      return;
    }
    
    const objUrl = createBlobUrl(file);
    setPendingLogoFile(file);
    setLogoPreviewUrl(objUrl);
    
    setFormConfig({
      ...formConfig,
      logoImage: objUrl
    });
  };

  const handleLogoDragOver = (e) => {
    e.preventDefault();
    setIsLogoDragging(true);
  };

  const handleLogoDragLeave = (e) => {
    e.preventDefault();
    setIsLogoDragging(false);
  };

  const handleLogoDrop = (e) => {
    e.preventDefault();
    setIsLogoDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleLogoPaste = (e) => {
    if (e.clipboardData.files && e.clipboardData.files[0]) {
      e.preventDefault();
      handleLogoFileProcess(e.clipboardData.files[0]);
      return;
    }
    
    const text = e.clipboardData.getData('text');
    if (text) {
      if (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('/') || text.startsWith('data:')) {
        e.preventDefault();
        setPendingLogoFile(null);
        setLogoPreviewUrl(text);
        setFormConfig({
          ...formConfig,
          logoImage: text
        });
      }
    }
  };

  const triggerLogoFileSelect = () => {
    if (logoFileInputRef.current) {
      logoFileInputRef.current.click();
    }
  };

  const handleLogoFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleLogoFileProcess(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handlePaste = (e) => {
    if (e.clipboardData.files && e.clipboardData.files[0]) {
      e.preventDefault();
      handleFileProcess(e.clipboardData.files[0]);
      return;
    }
    
    const text = e.clipboardData.getData('text');
    if (text) {
      if (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('/') || text.startsWith('data:')) {
        e.preventDefault();
        let bgType = formConfig.heroBgType;
        const lowerText = text.toLowerCase();
        if (lowerText.endsWith('.mp4') || lowerText.endsWith('.webm') || lowerText.endsWith('.ogg') || lowerText.includes('video')) {
          bgType = 'video';
        } else if (lowerText.endsWith('.jpg') || lowerText.endsWith('.jpeg') || lowerText.endsWith('.png') || lowerText.endsWith('.webp') || lowerText.endsWith('.gif')) {
          bgType = 'image';
        }
        
        setPendingFile(null);
        setPreviewUrl(text);
        setFormConfig({
          ...formConfig,
          heroBgType: bgType,
          heroBgUrl: text
        });
      }
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (dbUrl || dbKey) {
      initializeSupabase(dbUrl, dbKey);
    }
    let finalFormConfig = { ...formConfig };
    
    if (pendingFile) {
      let uploadedUrl = null;
      try {
        const ext = pendingFile.name.split('.').pop();
        const fileName = `hero_bg_${Date.now()}.${ext}`;
        uploadedUrl = await uploadMedia('quantico-media', fileName, pendingFile);
      } catch (err) {
        console.error('Failed uploading background media to Supabase:', err);
      }

      if (uploadedUrl) {
        finalFormConfig.heroBgUrl = uploadedUrl;
      } else {
        // Fallback to IndexedDB
        try {
          await saveLocalMedia('hero_bg_media', pendingFile);
          finalFormConfig.heroBgUrl = 'local::hero_bg_media';
        } catch (err) {
          console.error('Failed to save media in IndexedDB, attempting Base64 fallback...', err);
          try {
            const base64 = await fileToBase64(pendingFile);
            finalFormConfig.heroBgUrl = base64;
          } catch (base64Err) {
            alert('Error al guardar el archivo.');
            return;
          }
        }
      }
    }

    if (pendingLogoFile) {
      let uploadedUrl = null;
      try {
        const ext = pendingLogoFile.name.split('.').pop();
        const fileName = `logo_${Date.now()}.${ext}`;
        uploadedUrl = await uploadMedia('quantico-media', fileName, pendingLogoFile);
      } catch (err) {
        console.error('Failed uploading logo to Supabase:', err);
      }

      if (uploadedUrl) {
        finalFormConfig.logoImage = uploadedUrl;
      } else {
        // Fallback to IndexedDB
        try {
          await saveLocalMedia('logo_image', pendingLogoFile);
          finalFormConfig.logoImage = 'local::logo_image';
        } catch (err) {
          console.error('Failed to save logo in IndexedDB, attempting Base64 fallback...', err);
          try {
            const base64 = await fileToBase64(pendingLogoFile);
            finalFormConfig.logoImage = base64;
          } catch (base64Err) {
            alert('Error al guardar la imagen del logo.');
            return;
          }
        }
      }
    }
    
    localStorage.setItem('quantico_config', JSON.stringify(finalFormConfig));
    localStorage.setItem('quantico_deploy_hook_url', deployHookUrl);
    
    // Save to Supabase remote config
    try {
      await saveRemoteConfig(finalFormConfig);
    } catch (err) {
      console.error('Failed saving config to Supabase:', err);
    }

    setConfig(finalFormConfig);
    setShowEditModal(false);
    window.location.reload();
  };

  const handleTriggerDeploy = async () => {
    if (!deployHookUrl) {
      alert('Por favor, ingresa tu URL de Deploy Hook de Vercel en la sección de configuración de abajo.');
      return;
    }
    
    setIsDeploying(true);
    setDeployStatus('Iniciando despliegue...');
    try {
      const res = await fetch(deployHookUrl, {
        method: 'POST',
      });
      if (res.ok) {
        setDeployStatus('🟢 ¡Despliegue iniciado con éxito en Vercel! Tardará unos 2 minutos en completarse.');
      } else {
        setDeployStatus('🔴 Error al iniciar el despliegue. Verifica la URL de Deploy Hook.');
      }
    } catch (err) {
      console.error('Error triggering deploy hook:', err);
      setDeployStatus('🔴 Error de red al iniciar el despliegue.');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('¿Está seguro de que desea restablecer todos los valores predeterminados?')) {
      try {
        const db = await getDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete('hero_bg_media');
        store.delete('logo_image');
      } catch (e) {
        console.error('Error deleting local media:', e);
      }
      localStorage.removeItem('quantico_config');

      // Reset on Supabase remote config too!
      try {
        await saveRemoteConfig(defaultConfig);
      } catch (err) {
        console.error('Failed resetting config on Supabase:', err);
      }

      setConfig(defaultConfig);
      setFormConfig(defaultConfig);
      window.location.reload();
    }
  };

  const titleLetters = (config.heroTitle || 'QUANTICO').split('');
  const subtitleParts = (config.heroSubtitle || '').split(/[·•●]/).map(w => w.trim()).filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{config.logoText} | Plataforma Tecnológica para Operaciones Críticas</title>
        <meta name="description" content={config.heroFooterText} />
      </Helmet>

      <Header />

      <main className="bg-[#020409] text-white selection:bg-[#8CFF00] selection:text-black">
        
        {/* SECTION 1: HERO */}
        <section id="inicio" className="hero-background min-h-[100dvh] flex items-center justify-center border-b border-white/5 pt-20">
          
          {/* Dynamic Background Media */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
            {config.heroBgType === 'video' ? (
              <video 
                src={resolvedBgUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-25"
              />
            ) : (
              <img 
                src={resolvedBgUrl} 
                className="w-full h-full object-cover opacity-25"
                alt="Hero Background"
              />
            )}
          </div>

          {/* Admin Floating Edit Button */}
          {isAdmin && (
            <div className="absolute top-28 right-8 z-30">
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-[#8CFF00] text-[#020409] font-title font-bold text-xs tracking-widest px-4 py-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(140,255,0,0.3)] uppercase flex items-center gap-1.5 rounded"
              >
                <Settings className="w-3.5 h-3.5" />
                Editar Portada
              </button>
            </div>
          )}

          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 50 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-[1000px] mx-auto px-4 text-center mt-12"
          >
            {config.heroTitle && (
              <motion.h1 
                variants={titleContainerVariants}
                initial="hidden"
                animate="visible"
                className="font-logo text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-[0.15em] glow-text"
              >
                {titleLetters.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={titleLetterVariants}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>
            )}
            
            {config.heroSubtitle && (
              <motion.p 
                variants={subtitleContainerVariants}
                initial="hidden"
                animate="visible"
                className="font-title text-sm md:text-xl text-[#8A8F98] mb-12 tracking-[0.2em] md:tracking-[0.3em] uppercase flex flex-wrap items-center justify-center"
              >
                {subtitleParts.map((word, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <motion.span
                        variants={subtitleDotVariants}
                        className={`inline-block w-2 h-2 rounded-full mx-3 md:mx-4 shrink-0 ${dotColors[(i - 1) % dotColors.length]}`}
                      />
                    )}
                    <motion.span variants={subtitleWordVariants} className="inline-block text-[#B8BDC7] hover:text-white transition-colors duration-300">
                      {word}
                    </motion.span>
                  </React.Fragment>
                ))}
              </motion.p>
            )}

            {config.heroDesc1 && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
                className="text-lg md:text-2xl text-[#F4F6FA] mb-6 leading-relaxed font-medium text-balance max-w-4xl mx-auto"
              >
                {config.heroDesc1}
              </motion.p>
            )}

            {config.heroDesc2 && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
                className="text-sm md:text-base text-[#B8BDC7] mb-10 leading-relaxed max-w-3xl mx-auto"
              >
                {config.heroDesc2}
              </motion.p>
            )}

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <a href="#soluciones" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-title tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300">
                EXPLORAR SOLUCIONES
              </a>
              <a href="#contacto" className="w-full sm:w-auto px-8 py-4 bg-[#8CFF00] text-[#020409] font-title tracking-widest font-bold text-sm hover:bg-[#9dff26] transition-all duration-300 shadow-[0_0_20px_rgba(140,255,0,0.2)]">
                SOLICITAR DIAGNÓSTICO
              </a>
            </motion.div>
            
            {config.heroFooterText && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
                className="font-title text-xs text-[#8A8F98] mt-16 tracking-widest uppercase"
              >
                {config.heroFooterText}
              </motion.p>
            )}
          </motion.div>
        </section>

        {/* SECTION 2: FOUR CAPABILITIES */}
        <section id="capacidades" className="py-24 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="font-title text-3xl md:text-5xl text-white mb-6">CUATRO CAPACIDADES. UNA PLATAFORMA.</h2>
              <p className="text-[#8A8F98] text-lg">QUANTICO conecta inteligencia, seguridad, automatización y resiliencia para transformar operaciones críticas en sistemas más seguros, eficientes y autónomos.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((cap) => (
                <div key={cap.id} className="glass-card p-8 border-t-2 border-t-transparent hover:border-t-[#8CFF00]">
                  <span className="font-logo text-[#8CFF00] opacity-50 text-2xl block mb-4">{cap.id}</span>
                  <h3 className="font-title text-xl text-white mb-4 tracking-wider">{cap.title}</h3>
                  <p className="text-[#8A8F98] text-sm leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: NOSOTROS */}
        <section id="nosotros" className="py-32 border-y border-white/5 bg-[#050A12]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8CFF00]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="font-title text-3xl md:text-5xl text-white mb-10 leading-tight">
              INGENIERÍA, INTELIGENCIA Y SEGURIDAD <br className="hidden md:block"/>PARA OPERACIONES CRÍTICAS.
            </h2>
            <p className="text-xl md:text-2xl text-[#B8BDC7] leading-relaxed max-w-4xl mx-auto font-light">
              QUANTICO desarrolla e integra tecnología física y digital para empresas que requieren visibilidad, protección, automatización y resiliencia. Unimos software, hardware, IA y sistemas de seguridad para crear soluciones completas, escalables y operativas.
            </p>
          </div>
        </section>

        {/* SECTION 4: PLATAFORMA */}
        <section id="plataforma" className="py-32">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="font-title text-3xl md:text-5xl text-white mb-6">UNA PLATAFORMA PARA CONECTAR TODA TU OPERACIÓN.</h2>
            </div>
            
            {/* Technical Hub Diagram */}
            <div className="relative max-w-4xl mx-auto h-[500px] md:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-16 border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
              
              <div className="relative z-20 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#020409] border border-[#8CFF00] flex items-center justify-center shadow-[0_0_50px_rgba(140,255,0,0.15)]">
                <span className="font-logo text-lg md:text-2xl text-white tracking-widest">QUANTICO</span>
              </div>
              
              {['ERP/CRM', 'SCADA/PLC', 'CCTV', 'Control de acceso', 'Sensores IoT', 'Drones', 'Robots', 'Nube'].map((label, i) => {
                const angle = (i * 360) / 8;
                return (
                  <div key={label} className="absolute w-full h-full flex justify-end items-center" style={{ transform: `rotate(${angle}deg)` }}>
                    <div className="w-1/2 h-[1px] bg-gradient-to-r from-[#8CFF00]/30 to-transparent origin-left"></div>
                    <div className="absolute right-0 glass-card px-4 py-2 border-white/10" style={{ transform: `rotate(-${angle}deg)` }}>
                      <span className="text-xs font-title tracking-wider text-[#B8BDC7]">{label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: SOLUCIONES */}
        <section id="soluciones" className="py-24 border-t border-white/5 bg-[#050A12]/50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="font-title text-4xl md:text-5xl text-white mb-4">SOLUCIONES QUANTICO</h2>
              <p className="text-[#8A8F98] text-lg">Sistemas inteligentes para seguridad, automatización y operaciones críticas.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {solutions.map((sol, index) => (
                <div key={sol.num} className={index >= 8 ? "xl:col-span-2" : ""}>
                  <SolutionCard {...sol} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: SISTEMAS */}
        <section id="sistemas" className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-title text-4xl md:text-5xl text-white mb-4">SISTEMAS COMPLEJOS LLAVE EN MANO.</h2>
              <p className="text-[#8A8F98] text-lg">Soluciones integradas de hardware y software para operaciones críticas.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {systems.map((sys) => (
                <SystemCard key={sys.title} {...sys} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: EQUIPOS */}
        <section id="equipos" className="py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-[#050A12]/30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="font-title text-4xl md:text-5xl text-white mb-4">EQUIPOS Y HARDWARE.</h2>
              <p className="text-[#8A8F98] text-lg">Tecnología física integrada con plataforma inteligente.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {equipment.map((item) => (
                <EquipmentCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: TECNOLOGÍA */}
        <section id="tecnologia" className="py-24 border-y border-white/5">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center max-w-4xl mx-auto">
              <h2 className="font-title text-3xl md:text-5xl text-white mb-4">TECNOLOGÍA QUE CONECTA EL MUNDO FÍSICO CON LA INTELIGENCIA DIGITAL.</h2>
              <p className="text-[#8A8F98] text-lg">Stack tecnológico completo para operaciones críticas.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
              {technologies.map((tech) => (
                <TechnologyItem key={tech.name} {...tech} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: INDUSTRIAS */}
        <section id="industrias" className="py-24 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-16">
              <h2 className="font-title text-4xl md:text-5xl text-white mb-4">DISEÑADO PARA OPERACIONES DONDE FALLAR NO ES OPCIÓN.</h2>
              <p className="text-[#8A8F98] text-lg">Soluciones adaptadas a industrias críticas.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {industries.map((ind) => (
                <IndustryCard key={ind.name} {...ind} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: CASOS DE USO */}
        <section id="casos-de-uso" className="py-24 border-t border-white/5 bg-[#050A12]/30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-title text-4xl md:text-5xl text-white mb-4">CASOS DE USO REALES.</h2>
              <p className="text-[#8A8F98] text-lg">Cómo QUANTICO transforma operaciones críticas.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {useCases.map((uc, i) => (
                <div key={i} className="glass-card p-6 border-l-2 border-l-transparent hover:border-l-[#8CFF00] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#8CFF00] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#F4F6FA] font-medium leading-snug">{uc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: MODELO DE IMPLEMENTACIÓN */}
        <section id="implementacion" className="py-32">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-20 text-center">
              <h2 className="font-title text-4xl md:text-5xl text-white mb-4">DE DIAGNÓSTICO A OPERACIÓN.</h2>
              <p className="text-[#8A8F98] text-lg">Proceso estructurado para implementar soluciones QUANTICO.</p>
            </div>
            
            <div className="relative">
              {/* Desktop timeline line */}
              <div className="hidden lg:block absolute top-[28px] left-0 w-full h-[1px] bg-white/10"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                {timeline.map((step) => (
                  <div key={step.num} className="relative z-10">
                    <div className="w-14 h-14 rounded-full bg-[#020409] border border-white/20 flex items-center justify-center font-logo text-[#8CFF00] mb-6 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                      {step.num}
                    </div>
                    <h4 className="font-title text-lg text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-[#8A8F98]">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 12: FINAL CTA */}
        <section id="contacto" className="py-32 border-t border-white/5 relative overflow-hidden bg-[#050A12]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8CFF00]/5 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-title text-4xl md:text-6xl text-white mb-8 leading-tight">PREPARA TU OPERACIÓN PARA EL FUTURO.</h2>
            <p className="text-xl text-[#B8BDC7] mb-12 leading-relaxed">
              Conecta tus sistemas, protege tus activos, automatiza tus procesos y transforma tus datos en decisiones inteligentes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto px-10 py-5 bg-[#8CFF00] text-[#020409] font-title tracking-widest font-bold text-sm hover:bg-[#9dff26] transition-all duration-300 shadow-[0_0_20px_rgba(140,255,0,0.2)]">
                SOLICITAR DIAGNÓSTICO
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-title tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300">
                CONTACTAR A QUANTICO
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <SmartIndex />

      {/* Admin Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#020409]/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="glass-card w-full max-w-[650px] p-8 border border-white/10 rounded-xl shadow-2xl relative my-8">
            <button 
              onClick={() => setShowEditModal(false)} 
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-lg"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <Settings className="w-5 h-5 text-[#8CFF00]" />
              <h3 className="font-logo text-xs text-white tracking-[0.1em] uppercase">Editar Portada & Configuración</h3>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
              {/* Site Logo Configuration Section */}
              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-lg space-y-4">
                <span className="block text-[10px] uppercase tracking-widest text-[#8CFF00] font-bold">Logo del Sitio (Cabecera & Pie)</span>
                
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                    <input 
                      type="radio" 
                      name="logoType" 
                      value="text"
                      checked={formConfig.logoType === 'text'}
                      onChange={() => setFormConfig({ ...formConfig, logoType: 'text' })}
                      className="accent-[#8CFF00]"
                    />
                    Logo en Texto
                  </label>
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                    <input 
                      type="radio" 
                      name="logoType" 
                      value="image"
                      checked={formConfig.logoType === 'image'}
                      onChange={() => setFormConfig({ ...formConfig, logoType: 'image' })}
                      className="accent-[#8CFF00]"
                    />
                    Logo en Imagen (PNG)
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Logo Text */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Texto Alternativo del Logo</label>
                    <input 
                      type="text" 
                      value={formConfig.logoText}
                      onChange={(e) => setFormConfig({ ...formConfig, logoText: e.target.value })}
                      className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all"
                    />
                  </div>
                  {/* Hero Title */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Título Principal (Hero)</label>
                    <input 
                      type="text" 
                      value={formConfig.heroTitle}
                      onChange={(e) => setFormConfig({ ...formConfig, heroTitle: e.target.value })}
                      className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all"
                    />
                  </div>
                </div>

                {formConfig.logoType === 'image' && (
                  <div className="space-y-3">
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] font-bold">Archivo de Imagen del Logo</label>
                    
                    {/* Logo Drag and Drop / Paste Zone */}
                    <div 
                      onDragOver={handleLogoDragOver}
                      onDragLeave={handleLogoDragLeave}
                      onDrop={handleLogoDrop}
                      onPaste={handleLogoPaste}
                      onClick={triggerLogoFileSelect}
                      className={`relative border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 min-h-[110px] ${
                        isLogoDragging 
                          ? 'border-[#8CFF00] bg-[#8CFF00]/10 text-white shadow-[0_0_15px_rgba(140,255,0,0.15)]' 
                          : 'border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.03]'
                      }`}
                    >
                      <input 
                        type="file" 
                        ref={logoFileInputRef} 
                        onChange={handleLogoFileChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      
                      {logoPreviewUrl ? (
                        <div className="w-full flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <div className="relative w-full h-24 bg-[#020409]/80 rounded border border-white/10 overflow-hidden flex items-center justify-center p-4">
                            <img 
                              src={logoPreviewUrl} 
                              className="max-h-full max-w-full object-contain" 
                              alt="Logo Preview" 
                            />
                            <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[8px] text-[#8CFF00] tracking-wider uppercase font-bold border border-[#8CFF00]/30">
                              {pendingLogoFile ? 'Archivo Local' : 'Previsualización'}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setPendingLogoFile(null);
                                setLogoPreviewUrl('');
                                setFormConfig({ ...formConfig, logoImage: '' });
                              }}
                              className="absolute bottom-2 right-2 bg-red-600/80 hover:bg-red-600 text-white text-[9px] px-2 py-0.5 rounded border border-red-500/30 transition-colors uppercase font-bold"
                            >
                              Quitar
                            </button>
                          </div>
                          <span className="text-[10px] text-[#8A8F98] max-w-xs truncate">
                            {pendingLogoFile ? pendingLogoFile.name : (formConfig.logoImage && formConfig.logoImage.startsWith('local::') ? 'Logo guardado en el navegador' : formConfig.logoImage)}
                          </span>
                        </div>
                      ) : (
                        <>
                          <Image className="w-8 h-8 text-[#8CFF00]/80 animate-pulse pointer-events-none" />
                          <div className="text-xs font-semibold text-white pointer-events-none">
                            Arrastra y suelta aquí la imagen de tu logo
                          </div>
                          <div className="text-[10px] text-[#8A8F98] pointer-events-none">
                            O haz clic para seleccionar · Pega con Ctrl+V (PNG/SVG recomendado)
                          </div>
                        </>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">O introduce una URL externa del Logo</label>
                      <input 
                        type="text" 
                        value={formConfig.logoImage && (formConfig.logoImage.startsWith('blob:') || formConfig.logoImage.startsWith('local::')) ? '' : (formConfig.logoImage || '')}
                        onChange={(e) => {
                          setPendingLogoFile(null);
                          setLogoPreviewUrl(e.target.value);
                          setFormConfig({ ...formConfig, logoImage: e.target.value });
                        }}
                        onPaste={handleLogoPaste}
                        placeholder={formConfig.logoImage && (formConfig.logoImage.startsWith('blob:') || formConfig.logoImage.startsWith('local::')) ? "Usando archivo local (subido)" : "Ej. https://ejemplo.com/logo.png"}
                        className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all placeholder:text-white/30"
                      />
                    </div>

                    <div className="mt-4 border-t border-white/5 pt-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-[#8A8F98] font-bold">
                          Altura del Logo (Imagen)
                        </label>
                        <span className="text-xs text-[#8CFF00] font-logo">
                          {formConfig.logoHeight || 48}px
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="16"
                          max="200"
                          step="4"
                          value={formConfig.logoHeight || 48}
                          onChange={(e) => setFormConfig({ ...formConfig, logoHeight: Number(e.target.value) })}
                          className="w-full accent-[#8CFF00] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Background Media Settings */}
              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-lg space-y-4">
                <span className="block text-[10px] uppercase tracking-widest text-[#8CFF00] font-bold">Fondo de Portada (Media Hero)</span>
                
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                    <input 
                      type="radio" 
                      name="bgType" 
                      value="image"
                      checked={formConfig.heroBgType === 'image'}
                      onChange={() => setFormConfig({ ...formConfig, heroBgType: 'image' })}
                      className="accent-[#8CFF00]"
                    />
                    Imagen Estática
                  </label>
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                    <input 
                      type="radio" 
                      name="bgType" 
                      value="video"
                      checked={formConfig.heroBgType === 'video'}
                      onChange={() => setFormConfig({ ...formConfig, heroBgType: 'video' })}
                      className="accent-[#8CFF00]"
                    />
                    Video de Fondo (.mp4, etc)
                  </label>
                </div>

                {/* Drag and Drop / Paste Zone */}
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onPaste={handlePaste}
                  onClick={triggerFileSelect}
                  className={`relative border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 min-h-[110px] ${
                    isDragging 
                      ? 'border-[#8CFF00] bg-[#8CFF00]/10 text-white shadow-[0_0_15px_rgba(140,255,0,0.15)]' 
                      : 'border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.03]'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept={formConfig.heroBgType === 'video' ? 'video/*' : 'image/*'} 
                    className="hidden" 
                  />
                  
                  {previewUrl ? (
                    <div className="w-full flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <div className="relative w-full h-32 bg-[#020409]/80 rounded border border-white/10 overflow-hidden flex items-center justify-center">
                        {formConfig.heroBgType === 'video' ? (
                          <video 
                            src={previewUrl} 
                            className="w-full h-full object-cover" 
                            muted 
                            playsInline 
                            autoPlay 
                            loop 
                          />
                        ) : (
                          <img 
                            src={previewUrl} 
                            className="w-full h-full object-cover" 
                            alt="Media Preview" 
                          />
                        )}
                        <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[8px] text-[#8CFF00] tracking-wider uppercase font-bold border border-[#8CFF00]/30">
                          {pendingFile ? 'Archivo Local' : 'Previsualización'}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPendingFile(null);
                            setPreviewUrl('');
                            setFormConfig({ ...formConfig, heroBgUrl: '' });
                          }}
                          className="absolute bottom-2 right-2 bg-red-600/80 hover:bg-red-600 text-white text-[9px] px-2 py-0.5 rounded border border-red-500/30 transition-colors uppercase font-bold"
                        >
                          Quitar
                        </button>
                      </div>
                      <span className="text-[10px] text-[#8A8F98] max-w-xs truncate">
                        {pendingFile ? pendingFile.name : (formConfig.heroBgUrl.startsWith('local::') ? 'Archivo guardado en el navegador' : formConfig.heroBgUrl)}
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-[#8CFF00]/80 animate-pulse pointer-events-none" />
                      <div className="text-xs font-semibold text-white pointer-events-none">
                        Arrastra y suelta aquí tu {formConfig.heroBgType === 'video' ? 'video' : 'imagen'}
                      </div>
                      <div className="text-[10px] text-[#8A8F98] pointer-events-none">
                        O haz clic para seleccionar · Pega con Ctrl+V
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">O introduce una URL / Ruta externa</label>
                  <input 
                    type="text" 
                    value={formConfig.heroBgUrl.startsWith('blob:') ? '' : (formConfig.heroBgUrl.startsWith('local::') ? '' : formConfig.heroBgUrl)}
                    onChange={(e) => {
                      setPendingFile(null);
                      setPreviewUrl(e.target.value);
                      setFormConfig({ ...formConfig, heroBgUrl: e.target.value });
                    }}
                    onPaste={handlePaste}
                    placeholder={formConfig.heroBgUrl.startsWith('blob:') || formConfig.heroBgUrl.startsWith('local::') ? "Usando archivo local (subido)" : "Ej. https://ejemplo.com/video.mp4"}
                    className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Subtítulo (Capacidades)</label>
                <input 
                  type="text" 
                  value={formConfig.heroSubtitle}
                  onChange={(e) => setFormConfig({ ...formConfig, heroSubtitle: e.target.value })}
                  className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all"
                />
              </div>

              {/* Main Description */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Descripción Principal</label>
                <textarea 
                  value={formConfig.heroDesc1}
                  onChange={(e) => setFormConfig({ ...formConfig, heroDesc1: e.target.value })}
                  rows="3"
                  className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all resize-none"
                />
              </div>

              {/* Secondary Description */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Descripción Secundaria</label>
                <textarea 
                  value={formConfig.heroDesc2}
                  onChange={(e) => setFormConfig({ ...formConfig, heroDesc2: e.target.value })}
                  rows="3"
                  className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all resize-none"
                />
              </div>

              {/* Footer Text */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Texto del Pie de Portada</label>
                <input 
                  type="text" 
                  value={formConfig.heroFooterText}
                  onChange={(e) => setFormConfig({ ...formConfig, heroFooterText: e.target.value })}
                  className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all"
                />
              </div>

              {/* Cloud Database (Supabase) Settings */}
              <div className="border border-[#8CFF00]/20 bg-[#8CFF00]/5 p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="block text-[10px] uppercase tracking-widest text-[#8CFF00] font-bold">Base de Datos en la Nube (Supabase)</span>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${supabase ? 'bg-[#8CFF00]/20 text-[#8CFF00] border border-[#8CFF00]/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                    {supabase ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Supabase Project URL</label>
                    <input 
                      type="text" 
                      value={dbUrl}
                      onChange={(e) => setDbUrl(e.target.value)}
                      placeholder="https://xxxx.supabase.co"
                      className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Supabase Anon Key (Public Key)</label>
                    <input 
                      type="password" 
                      value={dbKey}
                      onChange={(e) => setDbKey(e.target.value)}
                      placeholder="eyJ..."
                      className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-[#8A8F98] leading-relaxed">
                  Para sincronizar los cambios de marca (logos, textos e imágenes) entre tu local y la web en producción, copia aquí las credenciales de tu proyecto de Supabase.
                </p>
              </div>

              {/* Vercel Production Deployment Settings */}
              <div className="border border-white/10 bg-white/[0.02] p-4 rounded-lg space-y-4">
                <span className="block text-[10px] uppercase tracking-widest text-white font-bold">Despliegue de Producción (Vercel)</span>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Vercel Deploy Hook URL</label>
                    <input 
                      type="text" 
                      value={deployHookUrl}
                      onChange={(e) => setDeployHookUrl(e.target.value)}
                      placeholder="https://api.vercel.com/v1/deployments/hooks/xxxx"
                      className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleTriggerDeploy}
                    disabled={isDeploying}
                    className="w-full py-3 bg-[#8CFF00] text-[#020409] font-title font-bold text-xs tracking-widest hover:bg-white disabled:bg-[#8CFF00]/40 transition-all uppercase rounded flex items-center justify-center gap-2"
                  >
                    {isDeploying ? 'Compilando en Vercel...' : '🚀 Lanzar Deploy a Producción (Vercel)'}
                  </button>

                  {deployStatus && (
                    <p className="text-[10px] font-semibold text-center mt-2 leading-relaxed">
                      {deployStatus}
                    </p>
                  )}
                </div>
                
                <div className="text-[9px] text-[#8A8F98] leading-relaxed space-y-1">
                  <p className="font-bold">¿Cómo obtener tu Deploy Hook URL?</p>
                  <p>1. Ve al Dashboard de Vercel y abre el proyecto <code className="text-white">quantico-web</code>.</p>
                  <p>2. Ve a la pestaña <span className="text-white">Settings</span> &gt; <span className="text-white">Git</span>.</p>
                  <p>3. Desplázate hacia abajo hasta <span className="text-white">Deploy Hooks</span>, crea uno con el nombre <code className="text-white">main</code> y copia la URL generada aquí.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <button 
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto text-[10px] tracking-widest font-bold uppercase text-red-400 hover:text-red-300 transition-colors py-2"
                >
                  Restablecer Predeterminados
                </button>
                <div className="flex gap-3 w-full sm:w-auto justify-end">
                  <button 
                    type="button" 
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-white/10 text-white font-title text-xs tracking-widest hover:bg-white/5 transition-all uppercase rounded"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-[#8CFF00] text-[#020409] font-title font-bold text-xs tracking-widest hover:bg-white transition-all uppercase rounded"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;