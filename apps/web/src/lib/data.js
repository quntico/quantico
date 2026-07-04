
import { Shield, Brain, Zap, Lock, Activity, TrendingUp, Users, Truck, BarChart3, AlertTriangle, Eye } from 'lucide-react';

export const solutionsData = [
  {
    number: '01',
    name: 'SENTINEL',
    slug: 'sentinel',
    description: 'Sistema de monitoreo inteligente con análisis de video en tiempo real y detección de anomalías.',
    accentColor: 'green',
    icon: Eye,
    capabilities: [
      'Análisis de video IA',
      'Detección de anomalías',
      'Alertas inteligentes',
      'Integración de hardware PTZ'
    ],
    useCases: ['Seguridad industrial', 'Retail y comercio', 'Protección perimetral'],
    integrations: ['Cámaras inteligentes y CCTV', 'Control de acceso', 'Sensores IoT', 'Centros de control'],
    benefits: ['Reducción de incidentes', 'Respuesta más rápida', 'Menor carga operativa', 'Evidencia digital']
  },
  {
    number: '02',
    name: 'RISK ENGINE',
    slug: 'risk-engine',
    description: 'Motor de análisis de riesgos operacionales con predicción de incidentes y evaluación continua.',
    accentColor: 'orange',
    icon: AlertTriangle,
    capabilities: [
      'Análisis predictivo de fallas',
      'Evaluación continua de riesgos',
      'Mitigación proactiva y automatizada'
    ],
    useCases: ['Operaciones industriales', 'Gestión financiera', 'Mantenimiento predictivo'],
    integrations: ['Sensores industriales e IoT', 'Redes OT/IT', 'Bases de datos externas'],
    benefits: ['Reducción de paradas', 'Mejor toma de decisiones', 'Cumplimiento normativo', 'Optimización de recursos']
  },
  {
    number: '03',
    name: 'BIOSAFE',
    slug: 'biosafe',
    description: 'Control de acceso biométrico y gestión de identidades con verificación multicapa.',
    accentColor: 'blue',
    icon: Users,
    capabilities: [
      'Biometría avanzada (facial/huella)',
      'Verificación multicapa',
      'Control de horarios y asistencia'
    ],
    useCases: ['Instalaciones corporativas', 'Salud y hospitales', 'Data centers'],
    integrations: ['Control de acceso y perímetro', 'Torniquetes inteligentes', 'Sistemas HR'],
    benefits: ['Máxima seguridad de acceso', 'Eliminación de tarjetas', 'Trazabilidad', 'Gestión centralizada']
  },
  {
    number: '04',
    name: 'SHIELD',
    slug: 'shield',
    description: 'Protección perimetral inteligente con sensores IoT y respuesta automatizada.',
    accentColor: 'purple',
    icon: Shield,
    capabilities: [
      'Detección perimetral temprana',
      'Activación de barreras físicas',
      'Clasificación de amenazas con IA'
    ],
    useCases: ['Infraestructura crítica', 'Plantas de energía', 'Instalaciones industriales'],
    integrations: ['Sensores industriales e IoT', 'Cámaras inteligentes y CCTV', 'Drones autónomos'],
    benefits: ['Cobertura perimetral total', 'Respuesta automatizada', 'Reducción de falsas alarmas']
  },
  {
    number: '05',
    name: 'CYBER',
    slug: 'cyber',
    description: 'Ciberseguridad operacional con detección de amenazas y protección de infraestructura crítica.',
    accentColor: 'green',
    icon: Lock,
    capabilities: [
      'Detección de amenazas OT/IT',
      'Aislamiento de redes',
      'Análisis forense en tiempo real'
    ],
    useCases: ['Protección SCADA', 'Redes corporativas', 'Defensa de servidores Edge'],
    integrations: ['Gabinetes/servidores/edge computing', 'Redes industriales OT/IT', 'Firewalls de hardware'],
    benefits: ['Prevención de ransomware', 'Continuidad de operaciones', 'Auditoría continua']
  },
  {
    number: '06',
    name: 'FLOW',
    slug: 'flow',
    description: 'Optimización de flujos operacionales con análisis de procesos y automatización inteligente.',
    accentColor: 'cyan',
    icon: TrendingUp,
    capabilities: [
      'Mapeo de flujos operacionales',
      'Automatización robótica (RPA)',
      'Optimización continua de rutas en planta'
    ],
    useCases: ['Líneas de manufactura', 'Centros logísticos', 'Gestión de inventario'],
    integrations: ['Drones y robots autónomos', 'Sensores IoT', 'Sistemas ERP'],
    benefits: ['Aumento de eficiencia', 'Reducción de cuellos de botella', 'Menor costo operativo']
  },
  {
    number: '07',
    name: 'MOBILITY',
    slug: 'mobility',
    description: 'Gestión de flotas y logística con rastreo en tiempo real y optimización de rutas.',
    accentColor: 'blue',
    icon: Truck,
    capabilities: [
      'Rastreo GPS de alta precisión',
      'Optimización inteligente de rutas',
      'Telemetría vehicular'
    ],
    useCases: ['Transporte de carga', 'Flotas corporativas', 'Última milla'],
    integrations: ['Sensores vehiculares', 'Sistemas de comunicación', 'Redes Edge'],
    benefits: ['Ahorro de combustible', 'Mayor vida útil de vehículos', 'Seguridad del conductor']
  },
  {
    number: '08',
    name: 'RESPONSE',
    slug: 'response',
    description: 'Sistema de respuesta a emergencias con coordinación automatizada y protocolos inteligentes.',
    accentColor: 'red',
    icon: Activity,
    capabilities: [
      'Detección automática de incidentes',
      'Movilización de brigadas',
      'Activación de sistemas de supresión'
    ],
    useCases: ['Complejos petroquímicos', 'Hospitales', 'Aeropuertos'],
    integrations: ['Sistemas de emergencia y respuesta', 'Centros de control y videowalls', 'Redes OT/IT'],
    benefits: ['Tiempos de respuesta mínimos', 'Protección de vidas humanas', 'Coordinación centralizada']
  },
  {
    number: '09',
    name: 'ANALYTICS',
    slug: 'analytics',
    description: 'Inteligencia de negocios operacional con dashboards en tiempo real y análisis predictivo.',
    accentColor: 'cyan',
    icon: BarChart3,
    capabilities: [
      'Dashboards interactivos en videowalls',
      'Forecasting con Machine Learning',
      'Minería de datos industriales'
    ],
    useCases: ['Centros de operaciones (NOC/SOC)', 'Dirección ejecutiva', 'Planificación estratégica'],
    integrations: ['Gabinetes/servidores/edge computing', 'Centros de control y videowalls', 'Bases de datos'],
    benefits: ['Visibilidad total en tiempo real', 'Decisiones informadas', 'Reporteo automatizado']
  },
  {
    number: '10',
    name: 'AI',
    slug: 'ai',
    description: 'Inteligencia artificial aplicada con machine learning y automatización cognitiva.',
    accentColor: 'purple',
    icon: Brain,
    capabilities: [
      'Modelos predictivos personalizados',
      'Procesamiento de visión computacional',
      'Agentes cognitivos para industria'
    ],
    useCases: ['Robótica autónoma', 'Control de calidad automatizado', 'Análisis de datos masivos'],
    integrations: ['Drones y robots autónomos', 'Gabinetes/servidores/edge computing', 'Cámaras inteligentes'],
    benefits: ['Transformación digital completa', 'Ventaja competitiva', 'Escalabilidad sin límites']
  }
];
