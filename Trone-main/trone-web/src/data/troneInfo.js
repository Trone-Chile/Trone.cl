import { 
  Sun, Zap, Crosshair, FileText, Database, Map as MapIcon, 
  Cpu, ScanEye, ShieldCheck, Route, Activity // <--- ÍCONOS NUEVOS IMPORTADOS
} from 'lucide-react';

// --- IMÁGENES PARA EL VISOR (Previews) ---
const excelPreview = "/demos/excel_demo.webp";
const pdfPreview = "/demos/Informe_demo.pdf"; 
const map1 = "/demos/carrousel1.webp";
const map2 = "/demos/carrousel2.webp";
const map3 = "/demos/carrousel3.webp";
const map4 = "/demos/carrousel4.webp";

// --- IMÁGENES CARRUSEL EQUIPAMIENTO ---
const droneM30T = "/img/Dron_gif.gif";
const thermalCam = "/img/termografia_aerea.webp";
const controlStation = "/img/DGAC.webp";

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
    statIcon: Zap, // Ícono de Rayo/Energía
    icon: Sun
  },
  {
    id: 2,
    title: "Líneas de Alta Tensión",
    desc: "Inspección vertical detallada de estructuras y conductores para mantenimiento preventivo.",
    details: ["Revisión de aisladores y herrajes", "Detección de puntos calientes", "Corrosión y corte de hebras", "Vegetación en franja de seguridad"],
    stats: "+2.000 km inspeccionados", 
    statIcon: Route, // Ícono de Ruta/Distancia
    icon: Zap 
  },
  {
    id: 3,
    title: "Subestaciones Eléctricas",
    desc: "Monitoreo termográfico de equipos críticos para detección temprana de anomalías.",
    details: ["Puntos calientes en conexiones", "Niveles de aceite en transformadores", "Estado general de pararrayos", "Mapas térmicos de gabinetes"],
    stats: "+10 subestaciones analizadas",
    statIcon: Activity, // Ícono de Actividad/Análisis
    icon: Crosshair
  }
];

export const equipment = [
  {
    title: "Certificación DGAC Dirección General de Aeronáutica Civil",
    desc: "Acreditación obligatoria para operar RPAS/drones de más de 750 gramos con fines comerciales o profesionales.",
    image: controlStation,
    icon: ShieldCheck
  },
  {
    title: "DJI Matrice 30T",
    desc: "Plataforma industrial con resistencia IP55 para operar en condiciones climáticas adversas. Estabilidad milimétrica en inspecciones de altura.",
    image: droneM30T,
    icon: Cpu
  },
  {
    title: "Termografía",
    desc: "Sensor térmico de alta resolución (640x512) capaz de medir la temperatura de cada píxel para diagnósticos eléctricos precisos.",
    image: thermalCam,
    icon: ScanEye
  }
  
];

export const deliverables = [
  {
    id: 'pdf',
    title: "Informe Técnico PDF",
    desc: "Fichas individuales por hallazgo con imagen RGB, Térmica y ubicación georreferenciada.",
    icon: FileText,
    actionType: 'pdf',
    content: pdfPreview 
  },
  {
    id: 'excel',
    title: "Base de Datos Excel",
    desc: "Consolidado de anomalías estructurado para carga directa en sistemas de gestión de mantenimiento.",
    icon: Database,
    actionType: 'image',
    content: excelPreview
  },
  {
    id: 'map',
    title: "Cartografía y Trazabilidad",
    desc: "Visión ejecutiva del activo completo para planificación logística de cuadrillas.",
    icon: MapIcon,
    actionType: 'carousel',
    gallery: [map1, map2, map3, map4] 
  }
];

export const clients = [
  { name: "Enel Green Power", url: "https://www.enelgreenpower.com/es/paises/sudamerica/chile", logo: "/logos/companies/enel.webp" },
  { name: "Res", url: "https://www.res-group.com/", logo: "/logos/companies/res.svg" },
  { name: "Ferrovial", url: "https://www.ferrovial.com/es-la/", logo: "/logos/companies/Ferrovial.webp" },
  { name: "DRS", url: "https://www.drsingenieria.com/", logo: "/logos/companies/drs.webp" },
  { name: "Zeitview", url: "https://www.zeitview.com/", logo: "/logos/companies/zeitview.webp" },
  { name: "Geom", url: "https://www.geom.energy", logo: "/logos/companies/geom.webp" }
];