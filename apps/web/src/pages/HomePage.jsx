import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Brain, Zap, Activity, Eye, AlertTriangle, Users, Lock, 
  TrendingUp, Truck, BarChart3, Database, Server, Cpu, Video, 
  BellRing, Network, Radar, Fingerprint, Factory, ArrowRight,
  MonitorPlay, ShieldAlert, FileText, CheckCircle2, ChevronRight, Map, Settings,
  Upload, Image, Box, PlusSquare, Recycle
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
  { num: '01', color: '#78FF00', icon: Shield, title: 'GOV\nCOMMAND', desc: 'Comando integral para seguridad pública, movilidad y emergencias.' },
  { num: '02', color: '#3b82f6', icon: Factory, title: 'INDUSTRIAL\nGRID', desc: 'Red inteligente para automatización y monitoreo industrial.' },
  { num: '03', color: '#a855f7', icon: Box, title: 'LOGISTICS\nGRID', desc: 'Infraestructura conectada para patios, almacenes y flotillas.' },
  { num: '04', color: '#ef4444', icon: PlusSquare, title: 'BIO\nSAFE', desc: 'Trazabilidad y control ambiental para alimentos y salud.' },
  { num: '05', color: '#f97316', icon: Recycle, title: 'CIRCULAR\nGRID', desc: 'Automatización y trazabilidad para reciclaje y conversión plástica.' },
  { num: '06', color: '#06b6d4', icon: Network, title: 'CRITICAL\nCORE', desc: 'Núcleo de inteligencia para operación, riesgo y continuidad crítica.' },
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

// Premium Custom Icons for the Space-X Platform Hub
const RobotIcon = ({ active }) => (
  <svg className={`w-6 h-6 transition-colors duration-300 ${active ? 'text-[#78FF00]' : 'text-[#B8BDC7]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="10" width="2" height="4" rx="1" />
    <rect x="20" y="10" width="2" height="4" rx="1" />
    <rect x="5" y="6" width="14" height="12" rx="3" />
    <circle cx="9" cy="11" r="1.5" />
    <circle cx="15" cy="11" r="1.5" />
    <path d="M9 15h6" strokeLinecap="round" />
    <path d="M12 6V3" />
    <circle cx="12" cy="2.5" r="1" fill="currentColor" />
  </svg>
);

const DroneIcon = ({ active }) => (
  <svg className={`w-6 h-6 transition-colors duration-300 ${active ? 'text-[#78FF00]' : 'text-[#B8BDC7]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 6l12 12" />
    <path d="M18 6l-12 12" />
    <circle cx="12" cy="12" r="3" fill="none" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="5" cy="5" r="2.5" />
    <circle cx="19" cy="5" r="2.5" />
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
  </svg>
);

const NubeIcon = ({ active }) => (
  <svg className={`w-6 h-6 transition-colors duration-300 ${active ? 'text-[#78FF00]' : 'text-[#B8BDC7]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    <path d="M12 12v5M9 14l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErpIcon = ({ active }) => (
  <svg className={`w-6 h-6 transition-colors duration-300 ${active ? 'text-[#78FF00]' : 'text-[#B8BDC7]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="12" width="3" height="8" rx="0.5" />
    <rect x="10" y="8" width="3" height="12" rx="0.5" />
    <rect x="16" y="4" width="3" height="16" rx="0.5" />
  </svg>
);

const ScadaIcon = ({ active }) => (
  <svg className={`w-6 h-6 transition-colors duration-300 ${active ? 'text-[#78FF00]' : 'text-[#B8BDC7]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 20h18V12l-4 3V10l-4 3V8l-6 4v8z" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="15" y1="4" x2="15" y2="8" />
    <line x1="18" y1="4" x2="18" y2="10" />
  </svg>
);

const CctvIcon = ({ active }) => (
  <svg className={`w-6 h-6 transition-colors duration-300 ${active ? 'text-[#78FF00]' : 'text-[#B8BDC7]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="8" y="7" width="11" height="6" rx="1" transform="rotate(-20 13.5 10)" />
    <path d="M5 8.5l3.5 1.3M5 8.5l1.3 3.5" />
    <path d="M16 11.5v4.5M13 16h6" strokeLinecap="round" />
  </svg>
);

const AccesoIcon = ({ active }) => (
  <svg className={`w-6 h-6 transition-colors duration-300 ${active ? 'text-[#78FF00]' : 'text-[#B8BDC7]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <rect x="9.5" y="11" width="5" height="4" rx="1" />
    <path d="M11 11V9.5a1 1 0 0 1 2 0V11" />
  </svg>
);

const SensoresIcon = ({ active }) => (
  <svg className={`w-6 h-6 transition-colors duration-300 ${active ? 'text-[#78FF00]' : 'text-[#B8BDC7]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" />
    <path d="M7.5 8.5a5 5 0 0 0 0 7" strokeLinecap="round" />
    <path d="M4.5 5.5a10 10 0 0 0 0 13" strokeLinecap="round" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
    <path d="M19.5 5.5a10 10 0 0 1 0 13" strokeLinecap="round" />
  </svg>
);

const letterOffsets = [
  { x: -50, y: -40, r: -60, s: 0.1 },  // Q
  { x: -20, y: -65, r: 35,  s: 0.1 },  // U
  { x: 25,  y: -60, r: -45, s: 0.1 },  // A
  { x: -65, y: -10, r: 75,  s: 0.1 },  // N
  { x: 65,  y: 10,  r: -75, s: 0.1 },  // T
  { x: -35, y: 60,  r: -35, s: 0.1 },  // I
  { x: 20,  y: 65,  r: 55,  s: 0.1 },  // C
  { x: 50,  y: 40,  r: -60, s: 0.1 },  // O
];

const platformModules = [
  {
    id: 'robots',
    label: 'ROBOTS',
    icon: RobotIcon,
    subtitle: 'Sistemas Autónomos de Patrullaje y Carga',
    description: 'Integración de perros robóticos y AMRs para patrullaje perimetral continuo e inspección en áreas de alto riesgo, sincronizados con la central de control.',
    stats: { status: 'ONLINE', signal: '98.5%', latency: '4ms' }
  },
  {
    id: 'drones',
    label: 'DRONES',
    icon: DroneIcon,
    subtitle: 'Supervisión Aérea Autónoma',
    description: 'Sistemas aéreos no tripulados para patrullaje programado, mapeo 3D y análisis termográfico de áreas críticas sin necesidad de pilotos en sitio.',
    stats: { status: 'STANDBY', signal: '97.2%', latency: '8ms' }
  },
  {
    id: 'nube',
    label: 'NUBE',
    icon: NubeIcon,
    subtitle: 'Procesamiento e IA Centralizada',
    description: 'Infraestructura cloud redundante para almacenamiento de telemetría histórica, reentrenamiento de modelos de IA y orquestación multiplanta.',
    stats: { status: 'ACTIVE', signal: '100%', latency: '12ms' }
  },
  {
    id: 'erp_crm',
    label: 'ERP/CRM',
    icon: ErpIcon,
    subtitle: 'Integración de Negocio y Finanzas',
    description: 'Sincronización directa con sistemas corporativos para automatizar reportes de incidentes, órdenes de mantenimiento y control de inventarios.',
    stats: { status: 'CONNECTED', signal: '99.9%', latency: '15ms' }
  },
  {
    id: 'scada_plc',
    label: 'SCADA/PLC',
    icon: ScadaIcon,
    subtitle: 'Control Operativo de Maquinaria',
    description: 'Interconexión directa con controladores industriales lógicos para supervisión de procesos de manufactura, energía y líneas de producción crítica.',
    stats: { status: 'ONLINE', signal: '99.1%', latency: '2ms' }
  },
  {
    id: 'cctv',
    label: 'CCTV',
    icon: CctvIcon,
    subtitle: 'Videovigilancia Inteligente',
    description: 'Monitoreo de cámaras fijas y PTZ con análisis de visión por computadora para detección de intrusos, comportamiento anómalo y EPP.',
    stats: { status: 'ONLINE', signal: '95.8%', latency: '6ms' }
  },
  {
    id: 'control_acceso',
    label: 'CONTROL DE ACCESO',
    icon: AccesoIcon,
    subtitle: 'Perímetro y Biometría Segura',
    description: 'Gestión inteligente de torniquetes, barreras vehiculares y esclusas con autenticación facial y lectura de placas cifrada.',
    stats: { status: 'ONLINE', signal: '99.7%', latency: '5ms' }
  },
  {
    id: 'sensores_iot',
    label: 'SENSORES IOT',
    icon: SensoresIcon,
    subtitle: 'Telemetría de Variables Físicas',
    description: 'Sensores en sitio para medir temperatura, presión, vibración y gases, previniendo fallas mecánicas e incidentes de seguridad industrial.',
    stats: { status: 'ACTIVE', signal: '96.4%', latency: '1ms' }
  }
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

  const handleInlineEdit = (key, value) => {
    const updated = { ...config, [key]: value };
    setConfig(updated);
    setFormConfig(updated);
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
    setFormConfig(updated);
    localStorage.setItem('quantico_config', JSON.stringify(updated));
    try {
      await saveRemoteConfig(updated);
    } catch (e) {
      console.error('Failed to sync remote config after inline upload:', e);
    }
  };

  const [config, setConfig] = useState(defaultConfig);
  const [activePlatformModule, setActivePlatformModule] = useState(0);
  const [carouselTargetModule, setCarouselTargetModule] = useState(0);
  const [carouselRotation, setCarouselRotation] = useState(90);
  const [isCoreAnimating, setIsCoreAnimating] = useState(false);
  const [isInfiniteMode, setIsInfiniteMode] = useState(false);
  const [isCarouselActive, setIsCarouselActive] = useState(false);
  const platformSectionRef = useRef(null);
  const lastEscPressTime = useRef(0);

  useEffect(() => {
    if (!isCarouselActive) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        const now = Date.now();
        if (now - lastEscPressTime.current < 500) {
          setIsCarouselActive(false);
          lastEscPressTime.current = 0;
        } else {
          lastEscPressTime.current = now;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCarouselActive]);

  useEffect(() => {
    if (!isCarouselActive) return;
    const handleScroll = () => {
      if (!platformSectionRef.current) return;
      const rect = platformSectionRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setIsCarouselActive(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCarouselActive]);

  const getCardStyle = (i, activeIdx) => {
    const angle = - (i * 45);
    const rad = ((angle + carouselRotation) * Math.PI) / 180;
    
    const Rx = 260;
    const Ry = 175;
    
    const x = Rx * Math.cos(rad);
    const y = - Ry * Math.sin(rad);
    
    const t = (y + Ry) / (2 * Ry); // 0 (back) to 1 (front)
    
    const isActive = activeIdx === i;
    
    // Scale: matching mockup proportions
    let scale = 0.70 + 0.32 * t;
    if (isActive) scale = scale * 1.10;
    
    // Opacity: matching mockup visibility
    let opacity = 0.45 + 0.55 * t;
    if (isActive) opacity = 1.0;
    
    // Z-index: layered correctly, active sits at 45 (below core 50)
    let zIndex = Math.round(10 + 20 * t);
    if (isActive) zIndex = 45;
    
    // Tilted perspective rotation & depth translation (gentle tilt to avoid chueca look)
    const rotateY = -12 * Math.cos(rad);
    const z = 80 * (t - 0.5);
    
    return { x, y, z, scale, opacity, rotateY, zIndex };
  };

  const handleCoreClick = () => {
    if (!isCarouselActive) {
      setIsCarouselActive(true);
      setIsCoreAnimating(true);
      setTimeout(() => {
        setIsCoreAnimating(false);
      }, 1400);
      return;
    }

    if (isCoreAnimating) return;
    setIsCoreAnimating(true);
    setTimeout(() => {
      setIsInfiniteMode(prev => !prev);
    }, 700);
    setTimeout(() => {
      setIsCoreAnimating(false);
    }, 1400);
  };
  const [hoveredPlatformModule, setHoveredPlatformModule] = useState(null);
  const [isDronesModalOpen, setIsDronesModalOpen] = useState(false);
  const [isRobotsModalOpen, setIsRobotsModalOpen] = useState(false);
  const [isSensoresIotModalOpen, setIsSensoresIotModalOpen] = useState(false);
  const [isControlAccesoModalOpen, setIsControlAccesoModalOpen] = useState(false);
  const [isCctvModalOpen, setIsCctvModalOpen] = useState(false);
  const [isErpCrmModalOpen, setIsErpCrmModalOpen] = useState(false);
  const [isNubeModalOpen, setIsNubeModalOpen] = useState(false);
  const [isScadaModalOpen, setIsScadaModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formConfig, setFormConfig] = useState(defaultConfig);

  const [resolvedBgUrl, setResolvedBgUrl] = useState(defaultConfig.heroBgUrl);
  const [resolvedNosotrosBgUrl, setResolvedNosotrosBgUrl] = useState('');
  const [resolvedLogoUrl, setResolvedLogoUrl] = useState('');
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingNosotrosFile, setPendingNosotrosFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isNosotrosDragging, setIsNosotrosDragging] = useState(false);
  const fileInputRef = useRef(null);
  const inlineHeroFileInputRef = useRef(null);
  const inlineNosotrosFileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [nosotrosPreviewUrl, setNosotrosPreviewUrl] = useState('');

  // Logo upload specific states
  const [pendingLogoFile, setPendingLogoFile] = useState(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState('');
  const [isLogoDragging, setIsLogoDragging] = useState(false);
  const [dbUrl, setDbUrl] = useState(localStorage.getItem('quantico_supabase_url') || 'https://btkkrvztbeljpacdlpzc.supabase.co');
  const [dbKey, setDbKey] = useState(localStorage.getItem('quantico_supabase_anon_key') || 'sb_publishable_BMuSNdoVIluVTZJnGnik_Q_9s1SFgpp');
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
    const target = carouselTargetModule * 45;
    let diff = (target - carouselRotation) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    setCarouselRotation(prev => prev + diff);
  }, [carouselTargetModule]);

  const handleModuleSelect = (i, mod) => {
    if (carouselTargetModule === i) {
      if (mod.id === 'drones') setIsDronesModalOpen(true);
      else if (mod.id === 'robots') setIsRobotsModalOpen(true);
      else if (mod.id === 'sensores_iot') setIsSensoresIotModalOpen(true);
      else if (mod.id === 'control_acceso') setIsControlAccesoModalOpen(true);
      else if (mod.id === 'cctv') setIsCctvModalOpen(true);
      else if (mod.id === 'erp_crm') setIsErpCrmModalOpen(true);
      else if (mod.id === 'nube') setIsNubeModalOpen(true);
      else if (mod.id === 'scada_plc') setIsScadaModalOpen(true);
    } else {
      setCarouselTargetModule(i);
      setTimeout(() => {
        setActivePlatformModule(i);
        setTimeout(() => {
          if (mod.id === 'drones') setIsDronesModalOpen(true);
          else if (mod.id === 'robots') setIsRobotsModalOpen(true);
          else if (mod.id === 'sensores_iot') setIsSensoresIotModalOpen(true);
          else if (mod.id === 'control_acceso') setIsControlAccesoModalOpen(true);
          else if (mod.id === 'cctv') setIsCctvModalOpen(true);
          else if (mod.id === 'erp_crm') setIsErpCrmModalOpen(true);
          else if (mod.id === 'nube') setIsNubeModalOpen(true);
          else if (mod.id === 'scada_plc') setIsScadaModalOpen(true);
        }, 150);
      }, 1200);
    }
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

  // Resolve Nosotros background media URL (remote or local from IndexedDB)
  useEffect(() => {
    let revoked = false;
    let localUrl = '';

    const loadMedia = async () => {
      const activeUrl = config.nosotrosBgUrl;
      if (activeUrl && activeUrl.startsWith('local::')) {
        try {
          const key = activeUrl.replace('local::', '');
          const file = await getLocalMedia(key);
          if (file && !revoked) {
            localUrl = URL.createObjectURL(file);
            setResolvedNosotrosBgUrl(localUrl);
            return;
          }
        } catch (e) {
          console.error('Error loading local media from IndexedDB:', e);
        }
      }
      if (!revoked) {
        setResolvedNosotrosBgUrl(activeUrl || '');
      }
    };
    
    loadMedia();
    
    return () => {
      revoked = true;
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, [config.nosotrosBgUrl]);

  // Resolve logo image URL (remote or local from IndexedDB)
  useEffect(() => {
    let revoked = false;
    let localUrl = '';

    const loadLogo = async () => {
      const activeLogo = config.logoImage;
      if (activeLogo && activeLogo.startsWith('local::')) {
        try {
          const key = activeLogo.replace('local::', '');
          const file = await getLocalMedia(key);
          if (file && !revoked) {
            localUrl = URL.createObjectURL(file);
            setResolvedLogoUrl(localUrl);
            return;
          }
        } catch (e) {
          console.error('Error loading local logo from IndexedDB:', e);
        }
      }
      if (!revoked) {
        setResolvedLogoUrl(activeLogo || '');
      }
    };
    
    loadLogo();
    
    return () => {
      revoked = true;
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, [config.logoImage]);

  // When showing/hiding edit modal
  useEffect(() => {
    if (showEditModal) {
      setPendingFile(null);
      setPendingLogoFile(null);
      setPendingNosotrosFile(null);
      
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

      if (formConfig.nosotrosBgUrl && formConfig.nosotrosBgUrl.startsWith('local::')) {
        const key = formConfig.nosotrosBgUrl.replace('local::', '');
        getLocalMedia(key).then(file => {
          if (file) {
            const url = createBlobUrl(file);
            setNosotrosPreviewUrl(url);
          }
        });
      } else {
        setNosotrosPreviewUrl(formConfig.nosotrosBgUrl || '');
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
      setNosotrosPreviewUrl('');
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

      try {
        await saveLocalMedia('hero_bg_media', pendingFile);
      } catch (err) {
        console.error('Failed to save media in IndexedDB:', err);
      }

      if (uploadedUrl) {
        finalFormConfig.heroBgUrl = uploadedUrl;
      } else {
        finalFormConfig.heroBgUrl = 'local::hero_bg_media';
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

      try {
        await saveLocalMedia('logo_image', pendingLogoFile);
      } catch (err) {
        console.error('Failed to save logo in IndexedDB:', err);
      }

      if (uploadedUrl) {
        finalFormConfig.logoImage = uploadedUrl;
      } else {
        finalFormConfig.logoImage = 'local::logo_image';
      }
    }

    if (pendingNosotrosFile) {
      let uploadedUrl = null;
      try {
        const ext = pendingNosotrosFile.name.split('.').pop();
        const fileName = `nosotros_bg_${Date.now()}.${ext}`;
        uploadedUrl = await uploadMedia('quantico-media', fileName, pendingNosotrosFile);
      } catch (err) {
        console.error('Failed uploading nosotros background media to Supabase:', err);
      }

      try {
        await saveLocalMedia('nosotros_bg_media', pendingNosotrosFile);
      } catch (err) {
        console.error('Failed to save nosotros media in IndexedDB:', err);
      }

      if (uploadedUrl) {
        finalFormConfig.nosotrosBgUrl = uploadedUrl;
      } else {
        finalFormConfig.nosotrosBgUrl = 'local::nosotros_bg_media';
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
        store.delete('nosotros_bg_media');
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

      {/* Hidden file inputs for direct inline media upload */}
      {isAdmin && (
        <>
          <input
            type="file"
            ref={inlineHeroFileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const isVideo = file.type.startsWith('video/');
                handleInlineMediaUpload('heroBg', file, isVideo);
              }
            }}
            accept="image/*,video/*"
            className="hidden"
          />
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
        </>
      )}

      <Header 
        logoType={config.logoType}
        logoText={config.logoText}
        logoImageUrl={resolvedLogoUrl}
        logoHeight={config.logoHeight}
      />

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
                className="w-full h-full object-cover"
                style={{ opacity: (config.heroBgOpacity ?? 25) / 100 }}
              />
            ) : (
              <img 
                src={resolvedBgUrl} 
                className="w-full h-full object-cover"
                style={{ opacity: (config.heroBgOpacity ?? 25) / 100 }}
                alt="Hero Background"
              />
            )}
          </div>

          {/* Admin Floating Edit Button */}
          {isAdmin && (
            <div className="absolute top-28 right-8 z-30 flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-[#020409]/90 border border-white/10 p-3 rounded-lg backdrop-blur-md">
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-[#8CFF00] text-[#020409] font-title font-bold text-xs tracking-widest px-4 py-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(140,255,0,0.15)] uppercase flex items-center justify-center gap-1.5 rounded"
              >
                <Settings className="w-3.5 h-3.5" />
                Configuración
              </button>
              
              <button
                onClick={() => {
                  if (inlineHeroFileInputRef.current) inlineHeroFileInputRef.current.click();
                }}
                className="bg-transparent border border-white/20 text-white font-title font-bold text-xs tracking-widest px-4 py-2 hover:border-[#8CFF00] hover:text-[#8CFF00] transition-all uppercase flex items-center justify-center gap-1.5 rounded"
              >
                <Video className="w-3.5 h-3.5" />
                Subir Video/Imagen
              </button>

              <div className="flex items-center gap-3 border-l border-white/10 pl-3 min-w-[150px]">
                <span className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Fondo:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={config.heroBgOpacity ?? 25}
                  onChange={(e) => handleInlineEdit('heroBgOpacity', Number(e.target.value))}
                  className="accent-[#8CFF00] bg-white/10 h-1 rounded-lg appearance-none cursor-pointer w-24"
                />
                <span className="text-xs font-logo text-[#8CFF00] w-8 text-right">
                  {config.heroBgOpacity ?? 25}%
                </span>
              </div>
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
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleInlineEdit('heroDesc1', e.currentTarget.innerText)}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
                className={`text-lg md:text-2xl text-[#F4F6FA] mb-6 leading-relaxed font-medium text-balance max-w-4xl mx-auto transition-all outline-none ${isAdmin ? 'hover:bg-white/5 focus:bg-white/5 px-2 py-1 rounded cursor-text border border-dashed border-[#8CFF00]/30' : ''}`}
              >
                {config.heroDesc1}
              </motion.p>
            )}

            {config.heroDesc2 && (
              <motion.p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleInlineEdit('heroDesc2', e.currentTarget.innerText)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
                className={`text-sm md:text-base text-[#B8BDC7] mb-10 leading-relaxed max-w-3xl mx-auto transition-all outline-none ${isAdmin ? 'hover:bg-white/5 focus:bg-white/5 px-2 py-1 rounded cursor-text border border-dashed border-[#8CFF00]/30' : ''}`}
              >
                {config.heroDesc2}
              </motion.p>
            )}


            
            {config.heroFooterText && (
              <motion.p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleInlineEdit('heroFooterText', e.currentTarget.innerText)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
                className={`font-title text-xs text-[#8A8F98] mt-16 tracking-widest uppercase transition-all outline-none ${isAdmin ? 'hover:bg-white/5 focus:bg-white/5 px-2 py-1 rounded cursor-text border border-dashed border-[#8CFF00]/30' : ''}`}
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
            ) : null}
          </div>

          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8CFF00]/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            {/* Inline Admin Bar for Nosotros */}
            {isAdmin && (
              <div className="flex flex-col md:flex-row items-center gap-3 bg-[#020409]/90 border border-white/10 p-3 rounded-lg backdrop-blur-md w-fit mx-auto mb-6 select-none shadow-[0_0_20px_rgba(0,0,0,0.5)]">
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
            
            {/* Title */}
            <h3 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleInlineEdit('nosotrosTitle', e.currentTarget.innerText)}
              className={`font-logo text-4xl md:text-6xl text-white mb-6 tracking-[0.15em] glow-text transition-all outline-none ${isAdmin ? 'hover:bg-white/5 focus:bg-white/5 px-2 py-1 rounded cursor-text border border-dashed border-[#8CFF00]/30' : ''}`}
            >
              {config.nosotrosTitle || 'NOSOTROS'}
            </h3>

            {/* Subtitle */}
            <h2 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleInlineEdit('nosotrosSubtitle', e.currentTarget.innerText)}
              className={`font-title text-2xl md:text-4xl text-white mb-10 leading-tight transition-all outline-none ${isAdmin ? 'hover:bg-white/5 focus:bg-white/5 px-2 py-1 rounded cursor-text border border-dashed border-[#8CFF00]/30' : ''}`}
            >
              {config.nosotrosSubtitle || 'INGENIERÍA, INTELIGENCIA Y SEGURIDAD PARA OPERACIONES CRÍTICAS.'}
            </h2>

            {/* Paragraph Alignment Toolbar */}
            {isAdmin && (
              <div className="flex justify-center gap-2 mb-4 bg-[#020409]/80 border border-white/10 p-1.5 rounded-lg w-fit mx-auto select-none">
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

            {/* Description Paragraph */}
            <p 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleInlineEdit('nosotrosDesc', e.currentTarget.innerText)}
              style={{ textAlign: config.nosotrosDescAlign || 'center' }}
              className={`text-xl md:text-2xl text-[#B8BDC7] leading-relaxed max-w-4xl mx-auto font-light transition-all outline-none ${isAdmin ? 'hover:bg-white/5 focus:bg-white/5 px-2 py-1 rounded cursor-text border border-dashed border-[#8CFF00]/30' : ''}`}
            >
              {config.nosotrosDesc || 'QUANTICO desarrolla e integra tecnología física y digital para empresas que requieren visibilidad, protección, automatización y resiliencia. Unimos software, hardware, IA y sistemas de seguridad para crear soluciones completas, escalables y operativas.'}
            </p>

            <div className="mt-12 flex justify-center">
              <Link to="/nosotros">
                <button className="bg-transparent border border-[#8CFF00]/40 text-[#8CFF00] hover:bg-[#8CFF00]/10 hover:border-[#8CFF00] px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300">
                  Conoce más de nosotros
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4: PLATAFORMA */}
        <section id="plataforma" ref={platformSectionRef} className="py-32 bg-[#000000] bg-[radial-gradient(ellipse_at_center,_#050A12_0%,_#000000_100%)] relative overflow-hidden border-t border-b border-white/5">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes line-particle-travel {
              0% { left: 0%; opacity: 0; }
              15% { opacity: 1; }
              85% { opacity: 1; }
              100% { left: 100%; opacity: 0; }
            }
            @keyframes hud-scan {
              0% { transform: translateY(-100%); opacity: 0; }
              50% { opacity: 0.5; }
              100% { transform: translateY(100%); opacity: 0; }
            }
            .hud-scan-line {
              animation: hud-scan 4s infinite linear;
            }
            @keyframes core-spin-clockwise {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes core-pulse-subtle {
              0%, 100% { opacity: 0.08; }
              50% { opacity: 0.22; }
            }
            @keyframes draw-infinity {
              from { stroke-dashoffset: 240; }
              to { stroke-dashoffset: 0; }
            }
            .animate-draw-infinity {
              stroke-dasharray: 240;
              animation: draw-infinity 3s linear infinite;
            }
            @keyframes core-pulse-glow {
              0%, 100% {
                border-color: rgba(120, 255, 0, 0.25);
                box-shadow: 0 0 25px rgba(120, 255, 0, 0.08);
              }
              50% {
                border-color: rgba(120, 255, 0, 0.75);
                box-shadow: 0 0 50px rgba(120, 255, 0, 0.35);
              }
            }
          `}} />

          {/* Grid Background details */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="font-title text-3xl md:text-5xl text-white mb-6 tracking-wide">UNA PLATAFORMA PARA CONECTAR TODA TU OPERACIÓN.</h2>
            </div>
            
            {/* Desktop Cover Flow Layout (visible md and up) */}
            <div 
              className="hidden md:block relative w-[1000px] h-[520px] mx-auto select-none"
              style={{
                perspective: '1400px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Close Button ("X") for Desktop */}
              <button 
                onClick={() => setIsCarouselActive(false)}
                className={`absolute top-0 right-4 z-[70] flex items-center justify-center w-8 h-8 rounded border border-white/10 hover:border-[#78FF00] hover:text-[#78FF00] bg-black/60 backdrop-blur-sm text-[#8A8F98] transition-all duration-300 cursor-pointer ${
                  isCarouselActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
                title="Cerrar Explorador (Doble ESC)"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Concentric 3D Orbital Rings SVG overlay (Technical HUD guides) */}
              <svg className={`absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-1000 ${isCarouselActive ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 1000 520">
                {/* Outer HUD Ring (Solid very faint) */}
                <ellipse 
                  cx="500" 
                  cy="260" 
                  rx="320" 
                  ry="215" 
                  fill="none" 
                  stroke="rgba(120, 255, 0, 0.04)" 
                  strokeWidth="0.75" 
                />
                
                {/* Main Trajectory Guide (Solid very thin green) */}
                <ellipse 
                  cx="500" 
                  cy="260" 
                  rx="260" 
                  ry="175" 
                  fill="none" 
                  stroke="rgba(120, 255, 0, 0.15)" 
                  strokeWidth="1" 
                />
                
                {/* Inner HUD Ring (Solid very sutil) */}
                <ellipse 
                  cx="500" 
                  cy="260" 
                  rx="200" 
                  ry="135" 
                  fill="none" 
                  stroke="rgba(120, 255, 0, 0.07)" 
                  strokeWidth="0.75" 
                />

                {/* Static Radial grid lines connecting center to all card angles */}
                {/* 0 deg (right) */}
                <line x1="500" y1="260" x2="820" y2="260" stroke="rgba(120, 255, 0, 0.06)" strokeWidth="0.75" />
                {/* 180 deg (left) */}
                <line x1="500" y1="260" x2="180" y2="260" stroke="rgba(120, 255, 0, 0.06)" strokeWidth="0.75" />
                {/* 90 deg (bottom) */}
                <line x1="500" y1="260" x2="500" y2="475" stroke="rgba(120, 255, 0, 0.06)" strokeWidth="0.75" />
                {/* 270 deg (top) */}
                <line x1="500" y1="260" x2="500" y2="45" stroke="rgba(120, 255, 0, 0.06)" strokeWidth="0.75" />
                {/* 45 deg (bottom-right) */}
                <line x1="500" y1="260" x2="726" y2="412" stroke="rgba(120, 255, 0, 0.06)" strokeWidth="0.75" />
                {/* 135 deg (bottom-left) */}
                <line x1="500" y1="260" x2="274" y2="412" stroke="rgba(120, 255, 0, 0.06)" strokeWidth="0.75" />
                {/* 225 deg (top-left) */}
                <line x1="500" y1="260" x2="274" y2="108" stroke="rgba(120, 255, 0, 0.06)" strokeWidth="0.75" />
                {/* 315 deg (top-right) */}
                <line x1="500" y1="260" x2="726" y2="108" stroke="rgba(120, 255, 0, 0.06)" strokeWidth="0.75" />
              </svg>

              {/* Dynamic Connection Lines (GPU-accelerated React divs) */}
              {platformModules.map((mod, i) => {
                const { x, y } = getCardStyle(i, activePlatformModule);
                const L = Math.sqrt(x * x + y * y);
                const angleRad = Math.atan2(y, x);
                
                // Calculate distance D to card border along angleRad to prevent line from penetrating the card
                const cosVal = Math.abs(Math.cos(angleRad));
                const sinVal = Math.abs(Math.sin(angleRad));
                const D = Math.min(
                  cosVal > 0.001 ? (105 / cosVal) : Infinity,
                  sinVal > 0.001 ? (27.5 / sinVal) : Infinity
                ) + 4; // 4px safety padding before border
                const lineLength = Math.max(0, L - D);
                
                const isActiveLine = carouselTargetModule === i;
                const isHovered = hoveredPlatformModule === i;
                const isHighlighted = isActiveLine || isHovered;

                // Midpoint percentage for visible line segment (from core border at 80px to card border)
                const midpointPercent = lineLength > 80 
                  ? ((80 + lineLength) / 2) / lineLength * 100 
                  : 55;

                return (
                  <div 
                    key={`line-${mod.id}`}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: `${isCarouselActive ? lineLength : 0}px`,
                      height: isActiveLine ? '1.5px' : '0.5px',
                      transformOrigin: 'left center',
                      transform: `rotate(${angleRad}rad)`,
                      // Fades connection line segment out to transparent if not active or hovered
                      backgroundColor: isCarouselActive && isActiveLine 
                        ? '#78FF00' 
                        : isCarouselActive && isHovered 
                          ? 'rgba(120, 255, 0, 0.35)' 
                          : 'rgba(120, 255, 0, 0)',
                      zIndex: 15,
                      transition: 'transform 1200ms cubic-bezier(0.22, 1, 0.36, 1), width 1200ms cubic-bezier(0.22, 1, 0.36, 1), background-color 1200ms cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                    className="pointer-events-none"
                  >
                    {/* Connection Node Dot right at the edge of the card (always visible as a sutil guide) */}
                    <div 
                      className={`absolute top-1/2 -translate-y-1/2 -right-1 rounded-full transition-all duration-500 ${
                        isCarouselActive
                          ? isActiveLine 
                            ? 'w-2 h-2 bg-[#78FF00] shadow-[0_0_8px_#78FF00] opacity-100' 
                            : isHovered 
                              ? 'w-1.5 h-1.5 bg-[#78FF00] opacity-80' 
                              : 'w-1.5 h-1.5 bg-[#78FF00]/50 opacity-40'
                          : 'w-0 h-0 opacity-0'
                      }`}
                      style={{ transform: 'translate(0, -50%)' }}
                    />

                    {/* Active Connection Midpoint Dot (centered in visible area) */}
                    {isCarouselActive && isActiveLine && (
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 rounded-full w-2.5 h-2.5 bg-[#78FF00] shadow-[0_0_12px_#78FF00]"
                        style={{ left: `${midpointPercent}%`, transform: 'translate(-50%, -50%)' }}
                      />
                    )}

                    {/* Traveling light particle */}
                    {isCarouselActive && isActiveLine && (
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#78FF00] shadow-[0_0_6px_#78FF00]"
                        style={{
                          transform: 'translateY(-50%)',
                          animation: 'line-particle-travel 1.6s linear infinite'
                        }}
                      />
                    )}
                  </div>
                );
              })}

              {/* 3D Carousel Cards positioned dynamically as a Cover Flow */}
              {platformModules.map((mod, i) => {
                const { x, y, z, scale, opacity, rotateY, zIndex } = getCardStyle(i, activePlatformModule);

                const isHovered = hoveredPlatformModule === i;
                const isActive = activePlatformModule === i;
                const Icon = mod.icon;

                return (
                  <button 
                    key={mod.id}
                    onClick={() => handleModuleSelect(i, mod)}
                    onMouseEnter={() => setHoveredPlatformModule(i)}
                    onMouseLeave={() => setHoveredPlatformModule(null)}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate3d(calc(-50% + ${isCarouselActive ? x : 0}px), calc(-50% + ${isCarouselActive ? y : 0}px), ${isCarouselActive ? z : -150}px) rotateY(${rotateY}deg) scale(${isCarouselActive ? scale : 0})`,
                      opacity: isCarouselActive ? opacity : 0,
                      zIndex: zIndex,
                      transformStyle: 'preserve-3d',
                      pointerEvents: isCarouselActive ? 'auto' : 'none',
                      transition: 'transform 1200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1), z-index 1200ms cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                    className="focus:outline-none cursor-pointer z-20"
                  >
                    {/* Backplate / Depth effect (shifted behind in 3D space) */}
                    <div 
                      className={`absolute inset-0 rounded-xl border transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#78FF00]/5 border-[#78FF00]/40 shadow-[0_0_20px_rgba(120,255,0,0.2)]' 
                          : isHovered
                            ? 'bg-black/60 border-[#78FF00]/20 shadow-[0_0_12px_rgba(120,255,0,0.05)]'
                            : 'bg-black/80 border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
                      }`}
                      style={{
                        transform: 'translate3d(0, 0, -5px)'
                      }}
                    />

                    {/* Frontplate (Main Glass Face with glossy reflections and chiseled edges) */}
                    <div 
                      className={`relative flex items-center gap-3.5 px-4.5 py-3 rounded-xl border backdrop-blur-md min-w-[210px] h-[55px] text-left transition-all duration-300 overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-br from-[#0e1c08]/98 to-[#020409]/98 border-[#78FF00] shadow-[inset_0_0_12px_rgba(120,255,0,0.25),inset_0_1.5px_0_0_rgba(255,255,255,0.25),0_0_35px_rgba(120,255,0,0.45),0_12px_24px_rgba(0,0,0,0.6)] text-white' 
                          : isHovered
                            ? 'bg-gradient-to-br from-[#080d16]/95 to-[#020409]/98 border-[#78FF00]/45 shadow-[inset_0_1.5px_0_0_rgba(255,255,255,0.15),0_0_20px_rgba(120,255,0,0.15),0_12px_24px_rgba(0,0,0,0.5)] text-white'
                            : 'bg-gradient-to-br from-[#121620]/95 to-[#020409]/98 border-white/12 shadow-[inset_0_1.5px_0_0_rgba(255,255,255,0.12),inset_0_-1px_0_0_rgba(0,0,0,0.4),0_12px_24px_rgba(0,0,0,0.6)] text-[#B8BDC7]'
                      }`}
                      style={{
                        transform: 'translate3d(0, 0, 0px)'
                      }}
                    >
                      {/* Glossy reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.12] pointer-events-none z-10" />
                      <div className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none z-10" />
                      
                      {/* Recessed Icon Container */}
                      <div 
                        className={`p-2 rounded-lg transition-colors border ${
                          isActive || isHovered 
                            ? 'bg-[#78FF00]/10 border-[#78FF00]/35 text-[#78FF00] shadow-[inset_0_1px_2px_rgba(120,255,0,0.15)]' 
                            : 'bg-black/40 border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]'
                        }`}
                      >
                        <Icon active={isActive || isHovered} />
                      </div>

                      {/* Text details */}
                      <div className="flex flex-col items-start select-none z-20">
                        <span className="text-[9.5px] font-logo tracking-wider uppercase font-bold">{mod.label}</span>
                        <span className={`text-[8px] font-mono tracking-widest uppercase transition-colors ${isActive ? 'text-[#78FF00]' : 'text-[#8A8F98]'}`}>
                          {isActive ? 'SELECT' : isHovered ? 'LINK' : 'SYS_OK'}
                        </span>
                        <div className="w-12 h-[1.5px] bg-white/10 mt-1.5 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-500 ${isActive ? 'w-full bg-[#78FF00]' : isHovered ? 'w-2/3 bg-[#78FF00]/70' : 'w-1/3 bg-white/20'}`}></div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Call to Action Text for Desktop */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-all duration-700 pointer-events-none z-[60] ${
                  isCarouselActive 
                    ? 'opacity-0 scale-95 pointer-events-none translate-y-4' 
                    : 'opacity-100 scale-100 translate-y-0'
                }`}
                style={{
                  top: '372px', // perfectly below core bottom edge
                }}
              >
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#78FF00]/80 uppercase font-bold drop-shadow-[0_0_6px_rgba(120,255,0,0.4)]">
                  HAZ CLIC EN EL NÚCLEO PARA EXPLORAR
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#78FF00] shadow-[0_0_8px_#78FF00] animate-ping" />
              </div>

              {/* Central Core (2D positioned, perfectly circular, centered, not tilted, z-index 50 to prevent overlap) */}
              <div 
                className="absolute top-1/2 left-1/2 z-50 pointer-events-auto"
                style={{
                  transform: 'translate3d(-50%, -50%, 0px)'
                }}
              >
                <button 
                  onClick={handleCoreClick}
                  className={`relative w-40 h-40 rounded-full bg-[#000000] border flex flex-col items-center justify-center transition-all duration-500 select-none cursor-pointer focus:outline-none active:scale-95 ${
                    !isCarouselActive
                      ? 'border-[#78FF00]/40 shadow-[0_0_30px_rgba(120,255,0,0.15)] hover:border-[#78FF00] hover:shadow-[0_0_45px_rgba(120,255,0,0.35)]'
                      : (activePlatformModule !== null || hoveredPlatformModule !== null) 
                        ? 'border-[#78FF00] shadow-[0_0_50px_rgba(120,255,0,0.25)]' 
                        : 'border-white/10 shadow-[0_0_30px_rgba(120,255,0,0.08)]'
                  }`}
                  style={{
                    animation: !isCarouselActive ? 'core-pulse-glow 2.5s ease-in-out infinite' : 'none'
                  }}
                >
                  <div className="absolute inset-0.5 rounded-full bg-[#020409] z-0"></div>
                  
                  {/* Tech grid inside core */}
                  <div 
                    className="absolute inset-0 rounded-full bg-[radial-gradient(#78FF00_1px,transparent_1px)] [background-size:8px_8px] z-0"
                    style={{
                      animation: 'core-pulse-subtle 4s ease-in-out infinite'
                    }}
                  ></div>
                  
                  {/* Swirling Particle Vortex (Clean HUD concentric) */}
                  <div className="absolute inset-2 rounded-full overflow-hidden z-10 opacity-80 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Fixed outer guiding thin ring */}
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="44" 
                        stroke="#78FF00" 
                        strokeWidth="0.75" 
                        fill="none" 
                        opacity="0.1" 
                        strokeDasharray="4 8"
                      />
                      
                      {/* Slow clockwise concentric ring 1 */}
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="38" 
                        stroke="#78FF00" 
                        strokeWidth="1.2" 
                        fill="none" 
                        opacity="0.35" 
                        strokeDasharray="25 15 8 15"
                        style={{
                          transformOrigin: '50px 50px',
                          animation: 'core-spin-clockwise 10s linear infinite'
                        }}
                      />

                      {/* Slow counter-clockwise concentric ring 2 */}
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="32" 
                        stroke="#78FF00" 
                        strokeWidth="0.8" 
                        fill="none" 
                        opacity="0.25" 
                        strokeDasharray="12 25 4 12"
                        style={{
                          transformOrigin: '50px 50px',
                          animation: 'core-spin-clockwise 14s linear infinite reverse'
                        }}
                      />

                      {/* Very slow clockwise inner ring 3 */}
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="25" 
                        stroke="#78FF00" 
                        strokeWidth="0.6" 
                        fill="none" 
                        opacity="0.2" 
                        strokeDasharray="35 8 6 8"
                        style={{
                          transformOrigin: '50px 50px',
                          animation: 'core-spin-clockwise 12s linear infinite'
                        }}
                      />

                      {/* Fine green particles spiraling gently inside the core */}
                      <g style={{ transformOrigin: '50px 50px', animation: 'core-spin-clockwise 9s linear infinite' }}>
                        <circle cx="50" cy="18" r="0.7" fill="#78FF00" opacity="0.6" />
                        <circle cx="28" cy="36" r="0.5" fill="#78FF00" opacity="0.4" />
                        <circle cx="72" cy="64" r="0.6" fill="#78FF00" opacity="0.5" />
                        <circle cx="39" cy="74" r="0.5" fill="#78FF00" opacity="0.4" />
                      </g>
                      <g style={{ transformOrigin: '50px 50px', animation: 'core-spin-clockwise 13s linear infinite reverse' }}>
                        <circle cx="50" cy="23" r="0.6" fill="#78FF00" opacity="0.5" />
                        <circle cx="67" cy="39" r="0.5" fill="#78FF00" opacity="0.4" />
                        <circle cx="33" cy="61" r="0.6" fill="#78FF00" opacity="0.5" />
                        <circle cx="59" cy="73" r="0.7" fill="#78FF00" opacity="0.6" />
                      </g>
                    </svg>
                  </div>
                  
                  {/* Layer for QUANTICO text or Infinity Symbol (completely flat, horizontal, centered, independent z-index above HUD) */}
                  {!isInfiniteMode ? (
                    <span className="absolute inset-0 z-20 font-logo text-xs md:text-sm text-white font-bold drop-shadow-[0_0_10px_rgba(120,255,0,0.7)] flex items-center justify-center select-none pointer-events-none">
                      {"QUANTICO".split("").map((char, idx) => {
                        const offset = letterOffsets[idx];
                        return (
                          <span
                            key={idx}
                            className="inline-block transition-all duration-700 ease-out"
                            style={{
                              transform: isCoreAnimating 
                                ? `translate(${offset.x}px, ${offset.y}px)`
                                : 'translate(0, 0)',
                              opacity: isCoreAnimating ? 0 : 1,
                              marginRight: idx < 7 ? '0.2em' : '0',
                              transitionDelay: isCoreAnimating 
                                ? `${idx * 40}ms` 
                                : `${(7 - idx) * 30}ms`
                            }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  ) : (
                    <div 
                      className="absolute z-20 flex items-center justify-center transition-all duration-700 ease-out pointer-events-none"
                      style={{
                        transform: isCoreAnimating 
                          ? 'scale(0.3) rotate(180deg)' 
                          : 'scale(1) rotate(0deg)',
                        opacity: isCoreAnimating ? 0 : 1
                      }}
                    >
                      <svg className="w-16 h-8 text-[#78FF00] drop-shadow-[0_0_12px_rgba(120,255,0,0.95)]" viewBox="0 0 100 50" fill="none">
                        <path 
                          d="M 50,25 C 35,10 25,20 25,25 C 25,30 35,40 50,25 C 65,10 75,20 75,25 C 75,30 65,40 50,25 Z" 
                          stroke="#78FF00" 
                          strokeWidth="6" 
                          strokeLinecap="round"
                          className="opacity-40 blur-[3px]"
                        />
                        <path 
                      d="M 50,25 C 35,10 25,20 25,25 C 25,30 35,40 50,25 C 65,10 75,20 75,25 C 75,30 65,40 50,25 Z" 
                          stroke="#78FF00" 
                          strokeWidth="3.5" 
                          strokeLinecap="round"
                          className="animate-draw-infinity"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Layout (visible below md) */}
            <div className="flex md:hidden flex-col items-center mt-6 relative w-full">
              
              {/* Close Button ("X") for Mobile */}
              <button 
                onClick={() => setIsCarouselActive(false)}
                className={`absolute -top-4 right-2 z-[70] flex items-center justify-center w-8 h-8 rounded border border-white/10 hover:border-[#78FF00] hover:text-[#78FF00] bg-black/60 backdrop-blur-sm text-[#8A8F98] transition-all duration-300 cursor-pointer ${
                  isCarouselActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
                title="Cerrar Explorador"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Central Core mobile */}
              <button 
                onClick={handleCoreClick}
                className={`relative w-32 h-32 rounded-full bg-[#000000] border flex flex-col items-center justify-center transition-all duration-500 mb-8 cursor-pointer focus:outline-none active:scale-95 ${
                  !isCarouselActive
                    ? 'border-[#78FF00]/40 shadow-[0_0_20px_rgba(120,255,0,0.15)] hover:border-[#78FF00] hover:shadow-[0_0_35px_rgba(120,255,0,0.25)]'
                    : activePlatformModule !== null 
                      ? 'border-[#78FF00] shadow-[0_0_35px_rgba(120,255,0,0.2)]' 
                      : 'border-white/10 shadow-[0_0_20px_rgba(120,255,0,0.05)]'
                }`}
                style={{
                  animation: !isCarouselActive ? 'core-pulse-glow 2.5s ease-in-out infinite' : 'none'
                }}
              >
                <div className="absolute inset-0.5 rounded-full bg-[#020409] z-0"></div>
                
                {/* Swirling Particle Vortex (Clean HUD concentric - Mobile) */}
                <div className="absolute inset-1 rounded-full overflow-hidden z-10 opacity-80 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Fixed outer guiding thin ring */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="44" 
                      stroke="#78FF00" 
                      strokeWidth="0.75" 
                      fill="none" 
                      opacity="0.1" 
                      strokeDasharray="4 8"
                    />
                    
                    {/* Slow clockwise concentric ring 1 */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="38" 
                      stroke="#78FF00" 
                      strokeWidth="1.2" 
                      fill="none" 
                      opacity="0.35" 
                      strokeDasharray="25 15 8 15"
                      style={{
                        transformOrigin: '50px 50px',
                        animation: 'core-spin-clockwise 10s linear infinite'
                      }}
                    />

                    {/* Slow counter-clockwise concentric ring 2 */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="32" 
                      stroke="#78FF00" 
                      strokeWidth="0.8" 
                      fill="none" 
                      opacity="0.25" 
                      strokeDasharray="12 25 4 12"
                      style={{
                        transformOrigin: '50px 50px',
                        animation: 'core-spin-clockwise 14s linear infinite reverse'
                      }}
                    />

                    {/* Very slow clockwise inner ring 3 */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="25" 
                      stroke="#78FF00" 
                      strokeWidth="0.6" 
                      fill="none" 
                      opacity="0.2" 
                      strokeDasharray="35 8 6 8"
                      style={{
                        transformOrigin: '50px 50px',
                        animation: 'core-spin-clockwise 12s linear infinite'
                      }}
                    />

                    {/* Fine green particles spiraling gently inside the core */}
                    <g style={{ transformOrigin: '50px 50px', animation: 'core-spin-clockwise 9s linear infinite' }}>
                      <circle cx="50" cy="18" r="0.7" fill="#78FF00" opacity="0.6" />
                      <circle cx="28" cy="36" r="0.5" fill="#78FF00" opacity="0.4" />
                      <circle cx="72" cy="64" r="0.6" fill="#78FF00" opacity="0.5" />
                      <circle cx="39" cy="74" r="0.5" fill="#78FF00" opacity="0.4" />
                    </g>
                    <g style={{ transformOrigin: '50px 50px', animation: 'core-spin-clockwise 13s linear infinite reverse' }}>
                      <circle cx="50" cy="23" r="0.6" fill="#78FF00" opacity="0.5" />
                      <circle cx="67" cy="39" r="0.5" fill="#78FF00" opacity="0.4" />
                      <circle cx="33" cy="61" r="0.6" fill="#78FF00" opacity="0.5" />
                      <circle cx="59" cy="73" r="0.7" fill="#78FF00" opacity="0.6" />
                    </g>
                  </svg>
                </div>
                
                {/* Layer for QUANTICO text or Infinity Symbol - Mobile */}
                {!isInfiniteMode ? (
                  <span className="relative z-20 font-logo text-[10px] text-white font-bold drop-shadow-[0_0_8px_rgba(120,255,0,0.6)] flex select-none pointer-events-none">
                    {"QUANTICO".split("").map((char, idx) => {
                      const offset = letterOffsets[idx];
                      return (
                        <span
                          key={idx}
                          className="inline-block transition-all duration-700 ease-out"
                          style={{
                            transform: isCoreAnimating 
                              ? `translate(${offset.x * 0.8}px, ${offset.y * 0.8}px)`
                              : 'translate(0, 0)',
                            opacity: isCoreAnimating ? 0 : 1,
                            marginRight: idx < 7 ? '0.15em' : '0',
                            transitionDelay: isCoreAnimating 
                              ? `${idx * 40}ms` 
                              : `${(7 - idx) * 30}ms`
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                ) : (
                  <div 
                    className="absolute z-20 flex items-center justify-center transition-all duration-700 ease-out pointer-events-none"
                    style={{
                      transform: isCoreAnimating 
                        ? 'scale(0.3) rotate(180deg)' 
                        : 'scale(1) rotate(0deg)',
                      opacity: isCoreAnimating ? 0 : 1
                    }}
                  >
                    <svg className="w-12 h-6 text-[#78FF00] drop-shadow-[0_0_10px_rgba(120,255,0,0.95)]" viewBox="0 0 100 50" fill="none">
                      <path 
                        d="M 50,25 C 35,10 25,20 25,25 C 25,30 35,40 50,25 C 65,10 75,20 75,25 C 75,30 65,40 50,25 Z" 
                        stroke="#78FF00" 
                        strokeWidth="6" 
                        strokeLinecap="round"
                        className="opacity-40 blur-[3px]"
                      />
                      <path 
                        d="M 50,25 C 35,10 25,20 25,25 C 25,30 35,40 50,25 C 65,10 75,20 75,25 C 75,30 65,40 50,25 Z" 
                        stroke="#78FF00" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                        className="animate-draw-infinity"
                      />
                    </svg>
                  </div>
                )}
              </button>

              {/* Mobile Call to Action */}
              <div 
                className={`flex flex-col items-center gap-1.5 transition-all duration-700 pointer-events-none mb-8 ${
                  isCarouselActive 
                    ? 'opacity-0 scale-95 pointer-events-none h-0 overflow-hidden mb-0' 
                    : 'opacity-100 scale-100 h-auto'
                }`}
              >
                <span className="text-[9.5px] font-mono tracking-[0.25em] text-[#78FF00]/80 uppercase font-bold drop-shadow-[0_0_6px_rgba(120,255,0,0.4)]">
                  HAZ CLIC PARA EXPLORAR
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#78FF00] shadow-[0_0_8px_#78FF00] animate-ping" />
              </div>

              {/* Grid cards */}
              <div 
                className={`grid grid-cols-2 gap-3 w-full max-w-md transition-all duration-1000 ${
                  isCarouselActive 
                    ? 'opacity-100 max-h-[1000px] mt-0 translate-y-0 scale-100' 
                    : 'opacity-0 max-h-0 overflow-hidden mt-0 translate-y-4 scale-95 pointer-events-none'
                }`}
              >
                {platformModules.map((mod, i) => {
                  const isActive = activePlatformModule === i;
                  const Icon = mod.icon;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setCarouselTargetModule(i);
                        setActivePlatformModule(i);
                        if (mod.id === 'drones') {
                          setIsDronesModalOpen(true);
                        } else if (mod.id === 'robots') {
                          setIsRobotsModalOpen(true);
                        } else if (mod.id === 'sensores_iot') {
                          setIsSensoresIotModalOpen(true);
                        } else if (mod.id === 'control_acceso') {
                          setIsControlAccesoModalOpen(true);
                        } else if (mod.id === 'cctv') {
                          setIsCctvModalOpen(true);
                        } else if (mod.id === 'erp_crm') {
                          setIsErpCrmModalOpen(true);
                        } else if (mod.id === 'nube') {
                          setIsNubeModalOpen(true);
                        } else if (mod.id === 'scada_plc') {
                          setIsScadaModalOpen(true);
                        }
                      }}
                      className={`flex items-center gap-3 px-3 py-3.5 rounded-lg border text-left transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#78FF00]/10 border-[#78FF00] shadow-[0_0_15px_rgba(120,255,0,0.15)] text-white' 
                          : 'bg-[#020409]/60 border-white/5 text-[#B8BDC7]'
                      }`}
                    >
                      <div className={`p-1.5 rounded ${isActive ? 'bg-[#78FF00]/15 text-[#78FF00]' : 'bg-white/5 text-[#B8BDC7]'}`}>
                        <Icon active={isActive} />
                      </div>
                      <div className="flex flex-col select-none">
                        <span className="text-[9px] font-logo tracking-wider uppercase font-bold">{mod.label}</span>
                        <span className="text-[8px] font-mono tracking-widest text-[#8A8F98]">
                          {isActive ? 'SELECT' : 'SYS_OK'}
                        </span>
                        <div className="w-10 h-[1.5px] bg-white/10 mt-1 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-500 ${isActive ? 'w-full bg-[#78FF00]' : 'w-1/3 bg-white/20'}`}></div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info Card Panel */}
            <div 
              className={`mt-12 max-w-2xl mx-auto transition-all duration-1000 ${
                isCarouselActive 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
              }`}
            >
              <div className="relative p-6 rounded-xl bg-[#020409]/90 border border-[#78FF00]/20 backdrop-blur-md shadow-[0_0_30px_rgba(120,255,0,0.05)] overflow-hidden">
                {/* Tech corner details */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#78FF00]"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#78FF00]"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#78FF00]"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#78FF00]"></div>
                
                {/* Scan line effect */}
                <div className="absolute inset-x-0 h-[1px] bg-[#78FF00]/20 hud-scan-line pointer-events-none"></div>

                {activePlatformModule !== null && (
                  <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                    <div className="p-4 rounded-lg bg-[#78FF00]/5 border border-[#78FF00]/20 text-[#78FF00] flex-shrink-0">
                      {React.createElement(platformModules[activePlatformModule].icon, { active: true })}
                    </div>
                    <div className="flex-grow w-full">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                        <div>
                          <span className="text-[9px] text-[#78FF00] font-mono font-bold tracking-widest uppercase block mb-0.5">SISTEMA ACTIVO</span>
                          <h3 className="text-xl font-title text-white tracking-wider uppercase">{platformModules[activePlatformModule].label}</h3>
                        </div>
                        {/* Status telemetry indicators */}
                        <div className="flex items-center gap-4 text-[9px] font-mono text-[#B8BDC7] self-start md:self-auto">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#78FF00] animate-pulse"></span>
                            <span className="text-[#78FF00] font-bold">{platformModules[activePlatformModule].stats.status}</span>
                          </div>
                          <div>SIG: <span className="text-white">{platformModules[activePlatformModule].stats.signal}</span></div>
                          <div>LAT: <span className="text-white">{platformModules[activePlatformModule].stats.latency}</span></div>
                        </div>
                      </div>
                      <p className="text-[#8A8F98] text-[11px] font-mono mb-3 tracking-wide">{platformModules[activePlatformModule].subtitle}</p>
                      <p className="text-[#B8BDC7] text-sm leading-relaxed font-light">{platformModules[activePlatformModule].description}</p>
                    </div>
                  </div>
                )}
              </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <Footer 
        logoType={config.logoType}
        logoText={config.logoText}
        logoImageUrl={resolvedLogoUrl}
        logoHeight={config.logoHeight}
      />
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

                <div className="mt-4 border-t border-white/5 pt-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#8A8F98] font-bold">
                      Opacidad/Transparencia del Fondo
                    </label>
                    <span className="text-xs text-[#8CFF00] font-logo">
                      {formConfig.heroBgOpacity ?? 25}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={formConfig.heroBgOpacity ?? 25}
                      onChange={(e) => setFormConfig({ ...formConfig, heroBgOpacity: Number(e.target.value) })}
                      className="w-full accent-[#8CFF00] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
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

              {/* Sección Nosotros Configuration */}
              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-lg space-y-4">
                <span className="block text-[10px] uppercase tracking-widest text-[#8CFF00] font-bold">Sección Nosotros</span>
                
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Título Nosotros</label>
                  <input 
                    type="text" 
                    value={formConfig.nosotrosTitle || ''}
                    onChange={(e) => setFormConfig({ ...formConfig, nosotrosTitle: e.target.value })}
                    className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Subtítulo Nosotros</label>
                  <input 
                    type="text" 
                    value={formConfig.nosotrosSubtitle || ''}
                    onChange={(e) => setFormConfig({ ...formConfig, nosotrosSubtitle: e.target.value })}
                    className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">Descripción Nosotros</label>
                  <textarea 
                    value={formConfig.nosotrosDesc || ''}
                    onChange={(e) => setFormConfig({ ...formConfig, nosotrosDesc: e.target.value })}
                    rows="3"
                    className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold font-bold">Alineación del Párrafo Nosotros</label>
                  <select 
                    value={formConfig.nosotrosDescAlign || 'center'}
                    onChange={(e) => setFormConfig({ ...formConfig, nosotrosDescAlign: e.target.value })}
                    className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all"
                  >
                    <option value="left">Izquierda</option>
                    <option value="center">Centro</option>
                    <option value="right">Derecha</option>
                    <option value="justify">Justificado</option>
                  </select>
                </div>

                {/* Background Media Settings for Nosotros */}
                <div className="border-t border-white/5 pt-4 space-y-4">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8CFF00] font-bold">Fondo de Sección Nosotros (Media)</span>
                  
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                      <input 
                        type="radio" 
                        name="nosotrosBgType" 
                        value="image"
                        checked={formConfig.nosotrosBgType === 'image'}
                        onChange={() => setFormConfig({ ...formConfig, nosotrosBgType: 'image' })}
                        className="accent-[#8CFF00]"
                      />
                      Imagen Estática
                    </label>
                    <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                      <input 
                        type="radio" 
                        name="nosotrosBgType" 
                        value="video"
                        checked={formConfig.nosotrosBgType === 'video'}
                        onChange={() => setFormConfig({ ...formConfig, nosotrosBgType: 'video' })}
                        className="accent-[#8CFF00]"
                      />
                      Video de Fondo (.mp4, etc)
                    </label>
                  </div>

                  {/* Paste / URL Zone for Nosotros Background */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1.5 font-bold">URL / Ruta externa para Fondo Nosotros</label>
                    <input 
                      type="text" 
                      value={formConfig.nosotrosBgUrl && (formConfig.nosotrosBgUrl.startsWith('blob:') || formConfig.nosotrosBgUrl.startsWith('local::')) ? '' : (formConfig.nosotrosBgUrl || '')}
                      onChange={(e) => {
                        setPendingNosotrosFile(null);
                        setNosotrosPreviewUrl(e.target.value);
                        setFormConfig({ ...formConfig, nosotrosBgUrl: e.target.value });
                      }}
                      placeholder={formConfig.nosotrosBgUrl && (formConfig.nosotrosBgUrl.startsWith('blob:') || formConfig.nosotrosBgUrl.startsWith('local::')) ? "Usando archivo local (subido)" : "Ej. https://ejemplo.com/nosotros-bg.jpg"}
                      className="w-full bg-[#020409]/60 border border-white/10 focus:border-[#8CFF00] text-white px-3 py-2 text-xs focus:outline-none rounded transition-all placeholder:text-white/30"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-[#8A8F98] font-bold">
                        Opacidad del Fondo Nosotros
                      </label>
                      <span className="text-xs text-[#8CFF00] font-logo">
                        {formConfig.nosotrosBgOpacity ?? 15}%
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={formConfig.nosotrosBgOpacity ?? 15}
                        onChange={(e) => setFormConfig({ ...formConfig, nosotrosBgOpacity: Number(e.target.value) })}
                        className="w-full accent-[#8CFF00] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
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
      <DronesModal isOpen={isDronesModalOpen} onClose={() => setIsDronesModalOpen(false)} />
      <RobotsModal isOpen={isRobotsModalOpen} onClose={() => setIsRobotsModalOpen(false)} />
      <SensoresIotModal isOpen={isSensoresIotModalOpen} onClose={() => setIsSensoresIotModalOpen(false)} />
      <ControlAccesoModal isOpen={isControlAccesoModalOpen} onClose={() => setIsControlAccesoModalOpen(false)} />
      <CctvModal isOpen={isCctvModalOpen} onClose={() => setIsCctvModalOpen(false)} />
      <ErpCrmModal isOpen={isErpCrmModalOpen} onClose={() => setIsErpCrmModalOpen(false)} />
      <NubeModal isOpen={isNubeModalOpen} onClose={() => setIsNubeModalOpen(false)} />
      <ScadaModal isOpen={isScadaModalOpen} onClose={() => setIsScadaModalOpen(false)} />
    </>
  );
}

// DronesModal Dialog Component
const DronesModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#020409] border border-[#78FF00]/30 rounded-xl p-5 md:p-6 shadow-[0_0_50px_rgba(120,255,0,0.15)] z-10 overflow-hidden max-h-[96vh]">
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#78FF00]"></div>

        <div className="absolute inset-x-0 h-[1.5px] bg-[#78FF00]/10 hud-scan-line pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-[#78FF00]/10 text-[#78FF00] px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">DRONES</span>
            <span className="text-[8px] text-[#8A8F98] font-mono tracking-widest uppercase">SYS_ACTIVE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Minimizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Maximizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
            </button>
            <button 
              onClick={onClose}
              className="text-[#8A8F98] hover:text-[#78FF00] hover:scale-110 transition-all font-mono font-bold text-sm px-1"
              title="Cerrar (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-title text-white tracking-wider uppercase font-bold">DRONES</h3>
              <p className="text-[#78FF00] text-xs font-mono tracking-wide mt-0.5">Vigilancia aérea autónoma</p>
              <p className="text-[#B8BDC7] text-xs md:text-sm leading-relaxed font-light mt-3">
                Supervisión aérea inteligente para seguridad, inspección y respuesta operativa en tiempo real. 
                QUANTICO integra drones autónomos con analítica, visión computacional y control centralizado para 
                ampliar la visibilidad de toda la operación.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Monitoreo perimetral', icon: Shield },
                { label: 'Inspección de activos', icon: FileText },
                { label: 'Alertas en tiempo real', icon: BellRing },
                { label: 'Rutas autónomas', icon: Network },
                { label: 'Analítica con IA', icon: Brain },
                { label: 'Integración con Q-IOS', icon: Zap }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[#78FF00]">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-[#B8BDC7] font-semibold">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,255,0,0.1)_0%,_transparent_60%)] pointer-events-none"></div>
            
            <img 
              src="/futuristic_drone_render_1783199651385.png" 
              alt="Futuristic Drone"
              className="relative z-10 w-full max-w-[210px] md:max-w-[250px] drop-shadow-[0_0_25px_rgba(120,255,0,0.3)] animate-[float_4s_ease-in-out_infinite]"
            />

            <style dangerouslySetInnerHTML={{__html: `
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-8px) rotate(0.5deg); }
              }
            `}} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5 bg-[#020409]/60">
          {[
            { label: 'LIVE FEED', val: 'ACTIVO', color: 'text-[#78FF00]', ping: true },
            { label: 'AI TRACKING', val: 'EN CURSO', color: 'text-[#78FF00]', ping: false },
            { label: 'SECURE LINK', val: 'ENCRIPTADO', color: 'text-[#78FF00]', ping: false },
            { label: '24/7', val: 'OPERATIVO', color: 'text-[#78FF00]', ping: false }
          ].map((tel, idx) => (
            <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-[#050A12]/40 border border-white/5">
              <span className="text-[8px] text-[#8A8F98] font-mono tracking-wider">{tel.label}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                {tel.ping && <span className="w-1.5 h-1.5 rounded-full bg-[#78FF00] animate-ping"></span>}
                <span className={`text-[11px] font-bold font-mono ${tel.color}`}>{tel.val}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#050A12]/30 border border-white/5">
          <span className="text-[9px] text-[#78FF00] font-mono tracking-widest uppercase block mb-2 font-bold">BENEFICIOS CLAVE</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Mayor cobertura', desc: 'Supervisión aérea constante en más áreas y terrenos.' },
              { title: 'Respuesta más rápida', desc: 'Detección y alerta inmediata ante cualquier evento.' },
              { title: 'Menor riesgo operativo', desc: 'Menos exposición humana y decisiones más seguras.' }
            ].map((ben, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[11px] font-semibold text-white mb-0.5">{ben.title}</span>
                <span className="text-[10px] text-[#8A8F98] leading-relaxed font-light">{ben.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// RobotsModal Dialog Component
const RobotsModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#020409] border border-[#78FF00]/30 rounded-xl p-5 md:p-6 shadow-[0_0_50px_rgba(120,255,0,0.15)] z-10 overflow-hidden max-h-[96vh]">
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#78FF00]"></div>

        <div className="absolute inset-x-0 h-[1.5px] bg-[#78FF00]/10 hud-scan-line pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-[#78FF00]/10 text-[#78FF00] px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">ROBOTS</span>
            <span className="text-[8px] text-[#8A8F98] font-mono tracking-widest uppercase">SYS_ACTIVE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Minimizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Maximizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
            </button>
            <button 
              onClick={onClose}
              className="text-[#8A8F98] hover:text-[#78FF00] hover:scale-110 transition-all font-mono font-bold text-sm px-1"
              title="Cerrar (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-title text-white tracking-wider uppercase font-bold">ROBOTS</h3>
              <p className="text-[#78FF00] text-xs font-mono tracking-wide mt-0.5">Automatización robótica inteligente</p>
              <p className="text-[#B8BDC7] text-xs md:text-sm leading-relaxed font-light mt-3">
                Sistemas robóticos para automatizar tareas críticas con precisión, seguridad y continuidad operativa. 
                QUANTICO integra robots industriales y colaborativos con analítica, visión artificial y control centralizado para 
                optimizar procesos, reducir riesgos y elevar la productividad.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Celdas automatizadas', icon: Factory },
                { label: 'Manipulación de materiales', icon: Cpu },
                { label: 'Inspección visual', icon: Eye },
                { label: 'Integración PLC/SCADA', icon: Network },
                { label: 'Operación colaborativa', icon: Users },
                { label: 'Analítica con IA', icon: Brain }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[#78FF00]">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-[#B8BDC7] font-semibold">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,255,0,0.1)_0%,_transparent_60%)] pointer-events-none"></div>
            
            <img 
              src="/industrial_robot_arm_render_1783200210588.png" 
              alt="Industrial Robotic Arm"
              className="relative z-10 w-full max-w-[210px] md:max-w-[250px] drop-shadow-[0_0_25px_rgba(120,255,0,0.3)] animate-[float_4s_ease-in-out_infinite]"
            />

            <style dangerouslySetInnerHTML={{__html: `
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-8px) rotate(0.5deg); }
              }
            `}} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5 bg-[#020409]/60">
          {[
            { label: 'LIVE CELL', val: 'ACTIVO', color: 'text-[#78FF00]', ping: true, icon: Video },
            { label: 'AI CONTROL', val: 'ESTABLE', color: 'text-[#78FF00]', ping: false, icon: Activity },
            { label: 'SAFE MODE', val: 'HABILITADO', color: 'text-[#78FF00]', ping: false, icon: Lock },
            { label: '24/7', val: 'OPERATIVO', color: 'text-[#78FF00]', ping: false, icon: Zap }
          ].map((tel, idx) => {
            const TelIcon = tel.icon;
            return (
              <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-[#050A12]/40 border border-white/5">
                <div className="flex items-center gap-1 text-[#8A8F98]">
                  <TelIcon className="w-3 h-3" />
                  <span className="text-[8px] font-mono tracking-wider">{tel.label}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {tel.ping && <span className="w-1.5 h-1.5 rounded-full bg-[#78FF00] animate-ping"></span>}
                  <span className={`text-[11px] font-bold font-mono ${tel.color}`}>{tel.val}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#050A12]/30 border border-white/5">
          <span className="text-[9px] text-[#78FF00] font-mono tracking-widest uppercase block mb-2 font-bold">BENEFICIOS CLAVE</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Mayor precisión', desc: 'Menos variabilidad y mayor calidad en cada ciclo.', icon: CheckCircle2 },
              { title: 'Más productividad', desc: 'Operación continua y mejor rendimiento de la línea.', icon: Zap },
              { title: 'Menor riesgo operativo', desc: 'Menos exposición humana en tareas repetitivas.', icon: Shield }
            ].map((ben, idx) => {
              const BenIcon = ben.icon;
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className="text-[#78FF00] mt-0.5 flex-shrink-0">
                    <BenIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-white mb-0.5">{ben.title}</span>
                    <span className="text-[10px] text-[#8A8F98] leading-relaxed font-light">{ben.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// SensoresIotModal Dialog Component
const SensoresIotModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Custom SVGs for perfect fidelity
  const LeafCloudIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-3.64-6.5-9-11.5-5.36 5-9 8.71-9 11.5A3.5 3.5 0 0 0 6.5 19H17.5z" />
      <path d="M12 10a3 3 0 0 1 3 3c0 2-3 5-3 5s-3-3-3-5a3 3 0 0 1 3-3z" />
    </svg>
  );

  const CloudEdgeIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
      <path d="M12 13v9M9 16l3-3 3 3" />
    </svg>
  );

  const MapPathIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M6 8.5c0 3.5 3.5 6 6 6s6 2.5 6 6" strokeDasharray="2 2" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#020409] border border-[#78FF00]/30 rounded-xl p-5 md:p-6 shadow-[0_0_50px_rgba(120,255,0,0.15)] z-10 overflow-hidden max-h-[96vh]">
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#78FF00]"></div>

        <div className="absolute inset-x-0 h-[1.5px] bg-[#78FF00]/10 hud-scan-line pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-[#78FF00]/10 text-[#78FF00] px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">SENSORES IOT</span>
            <span className="text-[8px] text-[#8A8F98] font-mono tracking-widest uppercase">SYS_ACTIVE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Minimizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Maximizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
            </button>
            <button 
              onClick={onClose}
              className="text-[#8A8F98] hover:text-[#78FF00] hover:scale-110 transition-all font-mono font-bold text-sm px-1"
              title="Cerrar (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-title text-white tracking-wider uppercase font-bold">SENSORES IOT</h3>
              <p className="text-[#78FF00] text-xs font-mono tracking-wide mt-0.5">Monitoreo inteligente en tiempo real</p>
              <p className="text-[#B8BDC7] text-xs md:text-sm leading-relaxed font-light mt-3">
                Redes de sensores inteligentes para capturar variables críticas de operación, seguridad y desempeño en tiempo real. 
                QUANTICO integra dispositivos IoT, analítica, conectividad y visualización centralizada para detectar eventos, 
                generar alertas y optimizar decisiones en toda la operación.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Monitoreo ambiental', icon: LeafCloudIcon },
                { label: 'Lectura en tiempo real', icon: Activity },
                { label: 'Alertas inteligentes', icon: BellRing },
                { label: 'Integración cloud / edge', icon: CloudEdgeIcon },
                { label: 'Trazabilidad operativa', icon: MapPathIcon },
                { label: 'Analítica con IA', icon: Brain }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[#78FF00]">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-[#B8BDC7] font-semibold">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,255,0,0.1)_0%,_transparent_60%)] pointer-events-none"></div>
            
            <img 
              src="/iot_sensors_render_1783200486004.png" 
              alt="IoT Sensors and Monitoring Nodes"
              className="relative z-10 w-full max-w-[210px] md:max-w-[250px] drop-shadow-[0_0_25px_rgba(120,255,0,0.3)] animate-[float_4s_ease-in-out_infinite]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5 bg-[#020409]/60">
          {[
            { label: 'LIVE DATA', val: 'ACTIVO', color: 'text-[#78FF00]', ping: true, icon: BarChart3 },
            { label: 'EDGE LINK', val: 'ESTABLE', color: 'text-[#78FF00]', ping: false, icon: Network },
            { label: 'SECURE NODE', val: 'ENCRIPTADO', color: 'text-[#78FF00]', ping: false, icon: Lock },
            { label: '24/7', val: 'OPERATIVO', color: 'text-[#78FF00]', ping: false, icon: Zap }
          ].map((tel, idx) => {
            const TelIcon = tel.icon;
            return (
              <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-[#050A12]/40 border border-white/5">
                <div className="flex items-center gap-1 text-[#8A8F98]">
                  <TelIcon className="w-3 h-3" />
                  <span className="text-[8px] font-mono tracking-wider">{tel.label}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {tel.ping && <span className="w-1.5 h-1.5 rounded-full bg-[#78FF00] animate-ping"></span>}
                  <span className={`text-[11px] font-bold font-mono ${tel.color}`}>{tel.val}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#050A12]/30 border border-white/5">
          <span className="text-[9px] text-[#78FF00] font-mono tracking-widest uppercase block mb-2 font-bold">BENEFICIOS CLAVE</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Mayor visibilidad', desc: 'Datos continuos para entender la operación en tiempo real.', icon: Eye },
              { title: 'Respuesta más rápida', desc: 'Alertas inmediatas ante variaciones o eventos críticos.', icon: Zap },
              { title: 'Mejor control operativo', desc: 'Más precisión en decisiones y menor riesgo operativo.', icon: CheckCircle2 }
            ].map((ben, idx) => {
              const BenIcon = ben.icon;
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className="text-[#78FF00] mt-0.5 flex-shrink-0">
                    <BenIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-white mb-0.5">{ben.title}</span>
                    <span className="text-[10px] text-[#8A8F98] leading-relaxed font-light">{ben.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// ControlAccesoModal Dialog Component
const ControlAccesoModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Custom SVGs for perfect design fidelity
  const ZonesIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );

  const KeycardIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="7" cy="15" r="1.5" />
    </svg>
  );

  const CctvMiniIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      <circle cx="8" cy="12" r="2" />
    </svg>
  );

  const LogIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <line x1="9" y1="10" x2="15" y2="10" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  );

  const UserCheckIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#020409] border border-[#78FF00]/30 rounded-xl p-5 md:p-6 shadow-[0_0_50px_rgba(120,255,0,0.15)] z-10 overflow-hidden max-h-[96vh]">
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#78FF00]"></div>

        <div className="absolute inset-x-0 h-[1.5px] bg-[#78FF00]/10 hud-scan-line pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-[#78FF00]/10 text-[#78FF00] px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">CONTROL DE ACCESO</span>
            <span className="text-[8px] text-[#8A8F98] font-mono tracking-widest uppercase">SYS_ACTIVE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Minimizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Maximizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
            </button>
            <button 
              onClick={onClose}
              className="text-[#8A8F98] hover:text-[#78FF00] hover:scale-110 transition-all font-mono font-bold text-sm px-1"
              title="Cerrar (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-title text-white tracking-wider uppercase font-bold">CONTROL DE ACCESO</h3>
              <p className="text-[#78FF00] text-xs font-mono tracking-wide mt-0.5">Identidad y seguridad en tiempo real</p>
              <p className="text-[#B8BDC7] text-xs md:text-sm leading-relaxed font-light mt-3">
                Soluciones avanzadas para autenticar personas, gestionar permisos y proteger instalaciones críticas. 
                QUANTICO integra control de acceso biométrico, credenciales inteligentes, analítica y supervisión centralizada 
                para restringir zonas, registrar eventos y elevar la seguridad operativa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Acceso biométrico', icon: Fingerprint },
                { label: 'Control por zonas', icon: ZonesIcon },
                { label: 'Credenciales inteligentes', icon: KeycardIcon },
                { label: 'Integración con CCTV', icon: CctvMiniIcon },
                { label: 'Trazabilidad de ingresos', icon: BarChart3 },
                { label: 'Gestión centralizada', icon: Network }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[#78FF00]">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-[#B8BDC7] font-semibold">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,255,0,0.1)_0%,_transparent_60%)] pointer-events-none"></div>
            
            <img 
              src="/access_control_render_1783200915835.png" 
              alt="Access Control Systems"
              className="relative z-10 w-full max-w-[210px] md:max-w-[250px] drop-shadow-[0_0_25px_rgba(120,255,0,0.3)] animate-[float_4s_ease-in-out_infinite]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5 bg-[#020409]/60">
          {[
            { label: 'ACCESS LOG', val: 'ACTIVO', color: 'text-[#78FF00]', ping: true, icon: LogIcon },
            { label: 'ID VERIFY', val: 'ESTABLE', color: 'text-[#78FF00]', ping: false, icon: UserCheckIcon },
            { label: 'SECURE ENTRY', val: 'ENCRIPTADO', color: 'text-[#78FF00]', ping: false, icon: Lock },
            { label: '24/7', val: 'OPERATIVO', color: 'text-[#78FF00]', ping: false, icon: Zap }
          ].map((tel, idx) => {
            const TelIcon = tel.icon;
            return (
              <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-[#050A12]/40 border border-white/5">
                <div className="flex items-center gap-1 text-[#8A8F98]">
                  <TelIcon className="w-3 h-3" />
                  <span className="text-[8px] font-mono tracking-wider">{tel.label}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {tel.ping && <span className="w-1.5 h-1.5 rounded-full bg-[#78FF00] animate-ping"></span>}
                  <span className={`text-[11px] font-bold font-mono ${tel.color}`}>{tel.val}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#050A12]/30 border border-white/5">
          <span className="text-[9px] text-[#78FF00] font-mono tracking-widest uppercase block mb-2 font-bold">BENEFICIOS CLAVE</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Mayor seguridad', desc: 'Autenticación precisa y menor acceso no autorizado.', icon: Shield },
              { title: 'Mejor trazabilidad', desc: 'Registro completo de eventos, usuarios y horarios.', icon: TrendingUp },
              { title: 'Respuesta inmediata', desc: 'Bloqueos, alertas y acciones en tiempo real.', icon: Zap }
            ].map((ben, idx) => {
              const BenIcon = ben.icon;
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className="text-[#78FF00] mt-0.5 flex-shrink-0">
                    <BenIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-white mb-0.5">{ben.title}</span>
                    <span className="text-[10px] text-[#8A8F98] leading-relaxed font-light">{ben.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// CctvModal Dialog Component
const CctvModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Custom SVGs for perfect design fidelity
  const SirenIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v3M4.93 4.93l2.12 2.12M19.07 4.93l-2.12 2.12" />
      <path d="M12 22a8 8 0 0 0 8-8h-8V6a4 4 0 0 0-4 4v4H4a8 8 0 0 0 8 8z" />
    </svg>
  );

  const MonitorGridIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="12" y1="3" x2="12" y2="17" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );

  const CircleClock247Icon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#020409] border border-[#78FF00]/30 rounded-xl p-5 md:p-6 shadow-[0_0_50px_rgba(120,255,0,0.15)] z-10 overflow-hidden max-h-[96vh]">
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#78FF00]"></div>

        <div className="absolute inset-x-0 h-[1.5px] bg-[#78FF00]/10 hud-scan-line pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-[#78FF00]/10 text-[#78FF00] px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">CCTV</span>
            <span className="text-[8px] text-[#8A8F98] font-mono tracking-widest uppercase">SYS_ACTIVE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Minimizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Maximizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
            </button>
            <button 
              onClick={onClose}
              className="text-[#8A8F98] hover:text-[#78FF00] hover:scale-110 transition-all font-mono font-bold text-sm px-1"
              title="Cerrar (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-title text-white tracking-wider uppercase font-bold">CCTV</h3>
              <p className="text-[#78FF00] text-xs font-mono tracking-wide mt-0.5">Videovigilancia inteligente en tiempo real</p>
              <p className="text-[#B8BDC7] text-xs md:text-sm leading-relaxed font-light mt-3">
                Sistema avanzado de videovigilancia para monitorear instalaciones, detectar eventos y fortalecer la seguridad operativa. 
                QUANTICO integra cámaras inteligentes, analítica de video, alertas en tiempo real y supervisión centralizada 
                para ampliar la visibilidad, reducir riesgos y mejorar la respuesta ante incidentes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Monitoreo 24/7', icon: CircleClock247Icon },
                { label: 'Cobertura perimetral', icon: Shield },
                { label: 'Detección de eventos', icon: BellRing },
                { label: 'Integración con alarmas', icon: SirenIcon },
                { label: 'Analítica de video', icon: Brain },
                { label: 'Supervisión centralizada', icon: MonitorGridIcon }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[#78FF00]">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-[#B8BDC7] font-semibold">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,255,0,0.1)_0%,_transparent_60%)] pointer-events-none"></div>
            
            <img 
              src="/cctv_render_1783201255772.png" 
              alt="CCTV Video Surveillance Systems"
              className="relative z-10 w-full max-w-[210px] md:max-w-[250px] drop-shadow-[0_0_25px_rgba(120,255,0,0.3)] animate-[float_4s_ease-in-out_infinite]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5 bg-[#020409]/60">
          {[
            { label: 'LIVE FEED', val: 'ACTIVO', color: 'text-[#78FF00]', ping: true, icon: Video },
            { label: 'AI VISION', val: 'ESTABLE', color: 'text-[#78FF00]', ping: false, icon: Network },
            { label: 'SECURE STREAM', val: 'ENCRIPTADO', color: 'text-[#78FF00]', ping: false, icon: Lock },
            { label: '24/7', val: 'OPERATIVO', color: 'text-[#78FF00]', ping: false, icon: Zap }
          ].map((tel, idx) => {
            const TelIcon = tel.icon;
            return (
              <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-[#050A12]/40 border border-white/5">
                <div className="flex items-center gap-1 text-[#8A8F98]">
                  <TelIcon className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-mono tracking-wider">{tel.label}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {tel.ping && <span className="w-1.5 h-1.5 rounded-full bg-[#78FF00] animate-ping"></span>}
                  <span className={`text-[11px] font-bold font-mono ${tel.color}`}>{tel.val}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#050A12]/30 border border-white/5">
          <span className="text-[9px] text-[#78FF00] font-mono tracking-widest uppercase block mb-2 font-bold">BENEFICIOS CLAVE</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Mayor visibilidad', desc: 'Supervisión continua de áreas críticas y eventos relevantes.', icon: Eye },
              { title: 'Respuesta más rápida', desc: 'Alertas inmediatas para actuar antes de que el riesgo escale.', icon: Zap },
              { title: 'Menor riesgo operativo', desc: 'Más control, mejor evidencia y decisiones más seguras.', icon: CheckCircle2 }
            ].map((ben, idx) => {
              const BenIcon = ben.icon;
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className="text-[#78FF00] mt-0.5 flex-shrink-0">
                    <BenIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-white mb-0.5">{ben.title}</span>
                    <span className="text-[10px] text-[#8A8F98] leading-relaxed font-light">{ben.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// ErpCrmModal Dialog Component
const ErpCrmModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Custom SVGs for perfect design fidelity
  const PuzzleIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-4h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-3V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3H2v4a2 2 0 0 0 2 2h3v4a2 2 0 0 0 2 2h3z" />
    </svg>
  );

  const PathTraceIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  );

  const FlowchartIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h6v9" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <path d="M15 6h-3V3" />
    </svg>
  );

  const WirelessIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12a10 10 0 0 1 14 0" />
      <path d="M8.5 15.5a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );

  const ExchangeIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <line x1="3" y1="5" x2="21" y2="5" />
      <polyline points="7 23 3 19 7 15" />
      <line x1="21" y1="19" x2="3" y2="19" />
    </svg>
  );

  const SecureCoreIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="1.5" />
      <path d="M12 12.5V15" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#020409] border border-[#78FF00]/30 rounded-xl p-5 md:p-6 shadow-[0_0_50px_rgba(120,255,0,0.15)] z-10 overflow-hidden max-h-[96vh]">
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#78FF00]"></div>

        <div className="absolute inset-x-0 h-[1.5px] bg-[#78FF00]/10 hud-scan-line pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-[#78FF00]/10 text-[#78FF00] px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">ERP/CRM</span>
            <span className="text-[8px] text-[#8A8F98] font-mono tracking-widest uppercase">SYS_ACTIVE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Minimizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Maximizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
            </button>
            <button 
              onClick={onClose}
              className="text-[#8A8F98] hover:text-[#78FF00] hover:scale-110 transition-all font-mono font-bold text-sm px-1"
              title="Cerrar (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-title text-white tracking-wider uppercase font-bold">ERP/CRM</h3>
              <p className="text-[#78FF00] text-xs font-mono tracking-wide mt-0.5">Integración operativa y gestión centralizada</p>
              <p className="text-[#B8BDC7] text-xs md:text-sm leading-relaxed font-light mt-3">
                Plataforma integrada para conectar operación, administración, clientes y procesos críticos en un solo entorno. 
                QUANTICO unifica ERP, CRM, analítica, trazabilidad y automatización para centralizar información, 
                sincronizar áreas y acelerar decisiones con mayor control y visibilidad.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Integración de procesos', icon: PuzzleIcon },
                { label: 'Trazabilidad operativa', icon: PathTraceIcon },
                { label: 'Gestión comercial', icon: Users },
                { label: 'Dashboards en tiempo real', icon: BarChart3 },
                { label: 'Automatización de flujos', icon: FlowchartIcon },
                { label: 'Analítica con IA', icon: Brain }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[#78FF00]">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-[#B8BDC7] font-semibold">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,255,0,0.1)_0%,_transparent_60%)] pointer-events-none"></div>
            
            <img 
              src="/erp_crm_render_1783201687406.png" 
              alt="ERP CRM Enterprise Integration Systems"
              className="relative z-10 w-full max-w-[210px] md:max-w-[250px] drop-shadow-[0_0_25px_rgba(120,255,0,0.3)] animate-[float_4s_ease-in-out_infinite]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5 bg-[#020409]/60">
          {[
            { label: 'LIVE SYNC', val: 'ACTIVO', color: 'text-[#78FF00]', ping: true, icon: WirelessIcon },
            { label: 'DATA FLOW', val: 'ESTABLE', color: 'text-[#78FF00]', ping: false, icon: ExchangeIcon },
            { label: 'SECURE CORE', val: 'ENCRIPTADO', color: 'text-[#78FF00]', ping: false, icon: SecureCoreIcon },
            { label: '24/7', val: 'OPERATIVO', color: 'text-[#78FF00]', ping: false, icon: ClockIcon }
          ].map((tel, idx) => {
            const TelIcon = tel.icon;
            return (
              <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-[#050A12]/40 border border-white/5">
                <div className="flex items-center gap-1 text-[#8A8F98]">
                  <TelIcon className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-mono tracking-wider">{tel.label}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {tel.ping && <span className="w-1.5 h-1.5 rounded-full bg-[#78FF00] animate-ping"></span>}
                  <span className={`text-[11px] font-bold font-mono ${tel.color}`}>{tel.val}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#050A12]/30 border border-white/5">
          <span className="text-[9px] text-[#78FF00] font-mono tracking-widest uppercase block mb-2 font-bold">BENEFICIOS CLAVE</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Mayor visibilidad', desc: 'Datos unificados para entender mejor toda la operación.', icon: Eye },
              { title: 'Mejor coordinación', desc: 'Ventas, operación y gestión alineadas en tiempo real.', icon: Users },
              { title: 'Decisiones más rápidas', desc: 'Menos fricción, más control y respuesta inmediata.', icon: Zap }
            ].map((ben, idx) => {
              const BenIcon = ben.icon;
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className="text-[#78FF00] mt-0.5 flex-shrink-0">
                    <BenIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-white mb-0.5">{ben.title}</span>
                    <span className="text-[10px] text-[#8A8F98] leading-relaxed font-light">{ben.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// NubeModal Dialog Component
const NubeModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Custom SVGs for perfect design fidelity
  const ThreeCubesIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );

  const CloudEdgeIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-4" />
      <path d="M16 18H8a2 2 0 0 1-2-2v-3a4 4 0 0 1 8 0h3a3 3 0 0 1 3 3v2a2 2 0 0 1-2 2z" />
      <rect x="10" y="2" width="4" height="4" rx="0.5" />
      <path d="M12 6v6" />
    </svg>
  );

  const ShieldLockIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <rect x="9" y="11" width="6" height="5" rx="1" />
      <path d="M10.5 11V9a1.5 1.5 0 0 1 3 0v2" />
    </svg>
  );

  const SyncIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19" />
      <path d="M2.5 22v-6h6M2.66 8.43a10 10 0 1 1 .57 8.38l-.73 1.19" />
    </svg>
  );

  const RemoteAccessIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
      <circle cx="12" cy="9" r="2.5" />
      <path d="M8 14.5a4 4 0 0 1 8 0" />
    </svg>
  );

  const EdgeLinkIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );

  const SecureCoreIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="1.5" />
      <path d="M12 12.5V15" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const GlobeIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );

  const CloudIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#020409] border border-[#78FF00]/30 rounded-xl p-5 md:p-6 shadow-[0_0_50px_rgba(120,255,0,0.15)] z-10 overflow-hidden max-h-[96vh]">
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#78FF00]"></div>

        <div className="absolute inset-x-0 h-[1.5px] bg-[#78FF00]/10 hud-scan-line pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-[#78FF00]/10 text-[#78FF00] px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">NUBE</span>
            <span className="text-[8px] text-[#8A8F98] font-mono tracking-widest uppercase">SYS_ACTIVE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Minimizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Maximizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
            </button>
            <button 
              onClick={onClose}
              className="text-[#8A8F98] hover:text-[#78FF00] hover:scale-110 transition-all font-mono font-bold text-sm px-1"
              title="Cerrar (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-title text-white tracking-wider uppercase font-bold">NUBE</h3>
              <p className="text-[#78FF00] text-xs font-mono tracking-wide mt-0.5">Infraestructura cloud y operación conectada</p>
              <p className="text-[#B8BDC7] text-xs md:text-sm leading-relaxed font-light mt-3">
                Plataforma cloud de última generación para centralizar datos, aplicaciones y operación crítica en un entorno seguro, 
                escalable y siempre disponible. QUANTICO integra infraestructura en la nube, conectividad edge, sincronización en 
                tiempo real, analítica centralizada y acceso remoto para acelerar decisiones, unificar procesos y mantener la 
                continuidad operativa desde cualquier lugar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Infraestructura escalable', icon: ThreeCubesIcon },
                { label: 'Integración cloud / edge', icon: CloudEdgeIcon },
                { label: 'Backups seguros', icon: ShieldLockIcon },
                { label: 'Sincronización en tiempo real', icon: SyncIcon },
                { label: 'Acceso remoto', icon: RemoteAccessIcon },
                { label: 'Analítica centralizada', icon: BarChart3 }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[#78FF00]">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-[#B8BDC7] font-semibold">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,255,0,0.1)_0%,_transparent_60%)] pointer-events-none"></div>
            
            <img 
              src="/nube_render_1783202145609.png" 
              alt="NUBE Cloud Infrastructure Solutions"
              className="relative z-10 w-full max-w-[210px] md:max-w-[250px] drop-shadow-[0_0_25px_rgba(120,255,0,0.3)] animate-[float_4s_ease-in-out_infinite]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5 bg-[#020409]/60">
          {[
            { label: 'LIVE CLOUD', val: 'ACTIVO', color: 'text-[#78FF00]', ping: true, icon: CloudIcon },
            { label: 'EDGE LINK', val: 'ESTABLE', color: 'text-[#78FF00]', ping: false, icon: EdgeLinkIcon },
            { label: 'SECURE CORE', val: 'ENCRIPTADO', color: 'text-[#78FF00]', ping: false, icon: SecureCoreIcon },
            { label: '24/7', val: 'OPERATIVO', color: 'text-[#78FF00]', ping: false, icon: ClockIcon }
          ].map((tel, idx) => {
            const TelIcon = tel.icon;
            return (
              <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-[#050A12]/40 border border-white/5">
                <div className="flex items-center gap-1 text-[#8A8F98]">
                  <TelIcon className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-mono tracking-wider">{tel.label}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {tel.ping && <span className="w-1.5 h-1.5 rounded-full bg-[#78FF00] animate-ping"></span>}
                  <span className={`text-[11px] font-bold font-mono ${tel.color}`}>{tel.val}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#050A12]/30 border border-white/5">
          <span className="text-[9px] text-[#78FF00] font-mono tracking-widest uppercase block mb-2 font-bold">BENEFICIOS CLAVE</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Mayor escalabilidad', desc: 'Capacidad flexible para crecer sin fricción operativa.', icon: TrendingUp },
              { title: 'Más continuidad operativa', desc: 'Datos y aplicaciones disponibles en todo momento.', icon: CheckCircle2 },
              { title: 'Visibilidad global', desc: 'Operación conectada y control centralizado desde cualquier lugar.', icon: GlobeIcon }
            ].map((ben, idx) => {
              const BenIcon = ben.icon;
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className="text-[#78FF00] mt-0.5 flex-shrink-0">
                    <BenIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-white mb-0.5">{ben.title}</span>
                    <span className="text-[10px] text-[#8A8F98] leading-relaxed font-light">{ben.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// ScadaModal Dialog Component
const ScadaModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Custom SVGs matching the designs and layout perfectly
  const ElectromagneticIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <rect x="9" y="11" width="6" height="5" rx="1" />
      <path d="M10.5 11V9a1.5 1.5 0 0 1 3 0v2" />
    </svg>
  );

  const InfraredIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="1" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );

  const RemoteControlIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10" />
      <path d="M12 6a6 6 0 0 1 6 6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 18a6 6 0 0 1-6-6" />
      <path d="M12 22a10 10 0 0 1-10-10" />
    </svg>
  );

  const NetworkNodesIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );

  const LockOutlineIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#020409] border border-[#78FF00]/30 rounded-xl p-5 md:p-6 shadow-[0_0_50px_rgba(120,255,0,0.15)] z-10 overflow-hidden max-h-[96vh]">
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#78FF00]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#78FF00]"></div>

        <div className="absolute inset-x-0 h-[1.5px] bg-[#78FF00]/10 hud-scan-line pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-[#78FF00]/10 text-[#78FF00] px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">SCADA</span>
            <span className="text-[8px] text-[#8A8F98] font-mono tracking-widest uppercase">SYS_ACTIVE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Minimizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="text-[#8A8F98] hover:text-white transition-colors" title="Maximizar">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
            </button>
            <button 
              onClick={onClose}
              className="text-[#8A8F98] hover:text-[#78FF00] hover:scale-110 transition-all font-mono font-bold text-sm px-1"
              title="Cerrar (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-title text-white tracking-wider uppercase font-bold">SCADA</h3>
              <p className="text-[#78FF00] text-xs font-mono tracking-wide mt-0.5">Supervisión y control inteligente en tiempo real</p>
              <p className="text-[#B8BDC7] text-xs md:text-sm leading-relaxed font-light mt-3">
                Plataforma SCADA de última generación que centraliza el monitoreo y el control de instalaciones críticas. 
                Integra análisis paramétrico asistido por IA, controles biométricos, sensores infrarrojos, sistemas de control 
                electromagnético y visión nocturna, permitiendo una supervisión integral y segura. Desde cualquier punto del mundo, 
                toma el control con confianza y precisión.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Control biométrico', icon: Fingerprint },
                { label: 'Control electromagnético', icon: ElectromagneticIcon },
                { label: 'Analítica paramétrica con IA', icon: Brain },
                { label: 'Sensores infrarrojos', icon: InfraredIcon },
                { label: 'Visión nocturna', icon: Eye },
                { label: 'Control a distancia', icon: RemoteControlIcon }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[#78FF00]">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-[#B8BDC7] font-semibold">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,255,0,0.1)_0%,_transparent_60%)] pointer-events-none"></div>
            
            <img 
              src="/scada_render_1783202715079.png" 
              alt="SCADA Industrial Command Center Room"
              className="relative z-10 w-full max-w-[240px] md:max-w-[280px] drop-shadow-[0_0_25px_rgba(120,255,0,0.3)] border border-[#78FF00]/10 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5 bg-[#020409]/60">
          {[
            { label: 'LIVE CONTROL', val: 'ACTIVO', color: 'text-[#78FF00]', ping: true, icon: Video },
            { label: 'AI ENGINE', val: 'ESTABLE', color: 'text-[#78FF00]', ping: false, icon: NetworkNodesIcon },
            { label: 'SECURE LINK', val: 'ENCRIPTADO', color: 'text-[#78FF00]', ping: false, icon: LockOutlineIcon },
            { label: '24/7', val: 'OPERATIVO', color: 'text-[#78FF00]', ping: false, icon: ClockIcon }
          ].map((tel, idx) => {
            const TelIcon = tel.icon;
            return (
              <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-[#050A12]/40 border border-white/5">
                <div className="flex items-center gap-1 text-[#8A8F98]">
                  <TelIcon className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-mono tracking-wider">{tel.label}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {tel.ping && <span className="w-1.5 h-1.5 rounded-full bg-[#78FF00] animate-ping"></span>}
                  <span className={`text-[11px] font-bold font-mono ${tel.color}`}>{tel.val}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#050A12]/30 border border-white/5">
          <span className="text-[9px] text-[#78FF00] font-mono tracking-widest uppercase block mb-2 font-bold">BENEFICIOS CLAVE</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Mayor control', desc: 'Supervisión centralizada y respuesta más rápida ante cualquier evento.', icon: CheckCircle2 },
              { title: 'Más precisión', desc: 'Análisis asistido por IA para decisiones más acertadas y confiables.', icon: TrendingUp },
              { title: 'Menor riesgo operativo', desc: 'Control remoto seguro e infraestructura crítica protegida en todo momento.', icon: Shield }
            ].map((ben, idx) => {
              const BenIcon = ben.icon;
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className="text-[#78FF00] mt-0.5 flex-shrink-0">
                    <BenIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-white mb-0.5">{ben.title}</span>
                    <span className="text-[10px] text-[#8A8F98] leading-relaxed font-light">{ben.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;