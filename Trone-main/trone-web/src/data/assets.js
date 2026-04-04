/**
 * TRONE Project - Asset Management
 * Centraliza todas las importaciones de assets y rutas de la carpeta pública.
 */

// --- IMPORTACIÓN DE ASSETS (Logos) ---
import letrasTrone from '../assets/trone_letras.webp';
import tdeTrone from '../assets/T_trone.webp';
import footerLogo1 from '../assets/logos_footer/atom-uas.png';
import footerLogo2 from '../assets/logos_footer/Aerotools.png';
import dgacLogo from '../assets/logos_footer/DGAC.webp';

// --- IMPORTACIÓN DE ASSETS (Equipamiento desde la nueva subcarpeta) ---
import droneM30T from '../assets/equipment/Dron_gif.mp4';
import droneM3E from '../assets/equipment/mavic3e.webp';
import thermalImg from '../assets/equipment/termografia_aerea.webp';
import aiAnalysisImg from '../assets/equipment/ia_deteccion.webp';
import gisMapImg from '../assets/equipment/gis_mapa.webp';


// --- RUTAS PÚBLICAS (Archivos que se quedan en la carpeta /public) ---
const PATH_DEMOS = '/demos';
const PATH_CLIENTS = '/logos/companies';

export const ASSETS = {
  logos: {
    main: tdeTrone,
    text: letrasTrone,
    dgac: dgacLogo,
    partners: {
      atom: footerLogo1,
      aerotools: footerLogo2
    }
  },
  demos: {
    excel: `${PATH_DEMOS}/excel_demo.webp`,
    pdfPage6: `${PATH_DEMOS}/pdf_page6.webp`,
    pdfPage8: `${PATH_DEMOS}/pdf_page8.webp`,
    pdfPage9: `${PATH_DEMOS}/pdf_page9.webp`,
    maps: [
      `${PATH_DEMOS}/carrousel1.webp`,
      `${PATH_DEMOS}/carrousel2.webp`,
      `${PATH_DEMOS}/carrousel3.webp`,
      `${PATH_DEMOS}/carrousel4.webp`
    ]
  },
  equipment: {
    droneM30T: droneM30T,
    droneM3E: droneM3E,
    thermal: thermalImg,
    controlStation: dgacLogo, 
    aiAnalysis: aiAnalysisImg,
    gisMap: gisMapImg
  },
  clients: {
    enel: `${PATH_CLIENTS}/enel.webp`,
    aerotools: `${PATH_CLIENTS}/aerotools-logo-1024x277.webp`,
    ferrovial: `${PATH_CLIENTS}/Ferrovial.webp`,
    drs: `${PATH_CLIENTS}/drs.webp`,
    zeitview: `${PATH_CLIENTS}/zeitview.webp`,
    geom: `${PATH_CLIENTS}/geom.webp`
  }
};