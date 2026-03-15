/**
 * TRONE Project - Company Information & Services
 * Define la estructura de datos para servicios, equipamiento y entregables.
 */

import {
  Sun, Zap, Crosshair, FileText, Database, Map as MapIcon,
  Cpu, ScanEye, ShieldCheck, Route, Activity,
  BookOpen, Building2, BrainCircuit, Globe2, Layers
} from 'lucide-react';

import { ASSETS } from './assets';

export const companyInfo = {
  name: "TRONE",
  tagline: "Inspección Digital Aérea",
  description: "Operación en terreno con tecnología termográfica para entregar hallazgos claros, trazables y listos para O&M.",
  contact: {
    address: "Los Militares 5620 Piso 9 of. 905, Las Condes, Santiago.",
    emails: ["contacto@trone.cl"],
    phones: [
      { name: "Eduardo Cádiz", role: "Gerente General", number: "+56 9 7909 0275" },
      { name: "Jorge Simon", role: "Gerente Operaciones", number: "+56 9 7971 7384" }
    ]
  }
};

export const services = [
  {
    id: 1,
    title: "Parques Fotovoltaicos",
    desc: "Inspección termográfica y visual con trazabilidad por módulo (PowerBlock – Fila – Columna).",
    details: ["Detección de Hotspots / Hot cells", "Strings desconectados", "Trackers no operativos", "Análisis de Shading y Soiling"],
    stats: "+4.400 MW inspeccionados",
    statIcon: Zap,
    icon: Sun
  },
  {
    id: 2,
    title: "Líneas de Alta Tensión",
    desc: "Inspección vertical detallada de estructuras y conductores para mantenimiento preventivo.",
    details: ["Revisión de aisladores y herrajes", "Detección de puntos calientes", "Corrosión y corte de hebras", "Vegetación en franja de seguridad"],
    stats: "+2.000 km inspeccionados",
    statIcon: Route,
    icon: Zap
  },
  {
    id: 3,
    title: "Subestaciones Eléctricas",
    desc: "Monitoreo termográfico de equipos críticos para detección temprana de anomalías.",
    details: ["Puntos calientes en conexiones", "Niveles de aceite en transformadores", "Estado general de pararrayos", "Mapas térmicos de gabinetes"],
    stats: "+10 subestaciones analizadas",
    statIcon: Activity,
    icon: Crosshair
  },
  {
    id: 4,
    title: "Lectura de N° de serie",
    desc: "Captura visual de alta resolución para identificación y registro de números de serie en activos industriales.",
    details: ["Lectura de placas en módulos fotovoltaicos", "Registro automatizado con IA", "Trazabilidad por activo individual", "Reducción de tiempos de inventario"],
    stats: "+50.000 módulos registrados",
    statIcon: BookOpen,
    icon: BookOpen
  },
  {
    id: 5,
    title: "Inspecciones de infraestructura",
    desc: "Evaluación visual y termográfica de infraestructura civil e industrial para mantenimiento predictivo.",
    details: ["Torres de telecomunicaciones", "Puentes y viaductos", "Edificaciones industriales", "Detección de grietas y deformaciones"],
    stats: "+30 estructuras inspeccionadas",
    statIcon: Building2,
    icon: Building2
  }
];

export const equipment = [
  {
    title: "Certificación DGAC Dirección General de Aeronáutica Civil",
    desc: "Acreditación obligatoria para operar RPAS/drones de más de 750 gramos con fines comerciales o profesionales.",
    image: ASSETS.logos.dgac,
    icon: ShieldCheck
  },
  {
    title: "DJI Matrice 30T",
    desc: "Plataforma industrial con resistencia IP55 para operar en condiciones climáticas adversas.",
    image: ASSETS.equipment.droneM30T,
    icon: Cpu
  },
  {
    title: "DJI Mavic 3 Enterprise",
    desc: "Dron compacto con cámara térmica integrada, ideal para inspecciones rápidas en espacios reducidos.",
    image: ASSETS.equipment.droneM3E,
    icon: Layers
  },
  {
    title: "Termografía",
    desc: "Sensor térmico de alta resolución (640x512) para diagnósticos eléctricos precisos.",
    image: ASSETS.equipment.thermal,
    icon: ScanEye
  },
  {
    title: "Integración de Inteligencia Artificial",
    desc: "Algoritmos de visión por computadora para detección automática de anomalías y clasificación de hallazgos.",
    image: ASSETS.equipment.thermal,
    icon: BrainCircuit
  },
  {
    title: "Análisis GIS (Sistemas de Información Geográfica)",
    desc: "Procesamiento de datos georreferenciados para generar mapas de calor y ortomosaicos.",
    image: ASSETS.equipment.thermal,
    icon: Globe2
  }
];

export const deliverables = [
  {
    id: 'informe-completo',
    title: "Informe Técnico + Base de Datos",
    desc: "Fichas PDF con imagen RGB, térmica y ubicación georreferenciada, junto al consolidado Excel.",
    icon: FileText,
    actionType: 'carousel',
    gallery: [ASSETS.demos.pdfPage6, ASSETS.demos.pdfPage9, ASSETS.demos.excel]
  },
  {
    id: 'map',
    title: "Cartografía y Trazabilidad",
    desc: "Visión ejecutiva del activo completo para planificación logística de cuadrillas.",
    icon: MapIcon,
    actionType: 'carousel',
    gallery: ASSETS.demos.maps
  }
];

export const clients = [
  { name: "Enel Green Power", url: "https://www.enelgreenpower.com/es/paises/sudamerica/chile", logo: ASSETS.clients.enel },
  { name: "Aero-tools", url: "https://aerotools.es/", logo: ASSETS.clients.aerotools },
  { name: "Ferrovial", url: "https://www.ferrovial.com/es-la/", logo: ASSETS.clients.ferrovial },
  { name: "DRS", url: "https://www.drsingenieria.com/", logo: ASSETS.clients.drs },
  { name: "Zeitview", url: "https://www.zeitview.com/", logo: ASSETS.clients.zeitview },
  { name: "Geom", url: "https://www.geom.energy", logo: ASSETS.clients.geom }
];