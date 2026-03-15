/**
 * TRONE | Home Page
 * Componente principal que utiliza ASSETS centralizados para una gestión profesional.
 */

import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';
import { services, clients, companyInfo, deliverables, equipment } from '../data/troneInfo';
import { ASSETS } from '../data/assets'; // <--- Única fuente de verdad para recursos
import {
  Menu, X, ArrowRight, CheckCircle2,
  Send, ChevronLeft, ChevronRight, Lock, Eye, MapPin, FileText, BarChart3,
  ShieldCheck, Thermometer, ClipboardList, HardHat, LineChart, FileSearch, Download
} from 'lucide-react';

// --- IMPORTACIÓN DE CLOUDFLARE TURNSTILE ---
import { Turnstile } from '@marsidev/react-turnstile';

const Home = () => {
  // --- ESTADOS ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [contactType, setContactType] = useState('empresa');
  const [formMessage, setFormMessage] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [isSending, setIsSending] = useState(false);

  // ESTADO PARA CLOUDFLARE
  const [turnstileToken, setTurnstileToken] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const [techSlide, setTechSlide] = useState(0);

  // Referencias
  const formRef = useRef();
  const techTimerRef = useRef(null);
  const modalTimerRef = useRef(null);

  // --- SEO: SCHEMA MARKUP ---
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": companyInfo.name,
    "image": "https://trone.cl/logos/og_image.jpg",
    "description": companyInfo.description,
    "url": "https://trone.cl",
    "telephone": companyInfo.contact.phones[0].number,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Los Militares 5620 Piso 9 of. 905",
      "addressLocality": "Las Condes",
      "addressRegion": "Santiago",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-33.405",
      "longitude": "-70.572"
    }
  };

  // --- EFECTOS ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || modalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen, modalOpen]);

  // Timers
  const startTechTimer = () => {
    if (techTimerRef.current) clearInterval(techTimerRef.current);
    techTimerRef.current = setInterval(() => {
      setTechSlide((prev) => (prev + 1) % equipment.length);
    }, 15000);
  };

  const startModalTimer = () => {
    if (modalTimerRef.current) clearInterval(modalTimerRef.current);
    const hasGallery = modalData?.gallery && modalData.gallery.length > 0;
    const isCarouselType = modalData?.actionType === 'carousel' || modalData?.actionType === 'text-carousel';
    if (modalOpen && hasGallery && isCarouselType) {
      modalTimerRef.current = setInterval(() => {
        setGalleryIndex((prev) => (prev + 1) % modalData.gallery.length);
      }, 6000);
    }
  };

  useEffect(() => {
    startTechTimer();
    return () => clearInterval(techTimerRef.current);
  }, [equipment.length]);

  useEffect(() => {
    startModalTimer();
    return () => clearInterval(modalTimerRef.current);
  }, [modalOpen, modalData]);

  // --- LÓGICA DE INTERACCIÓN ---
  const handleServiceClick = (service) => {
    if (service.title.toLowerCase().includes('fotovoltaic') || service.title.toLowerCase().includes('parque')) {
      const cartoImages = deliverables.find(d => d.title.includes('Cartografía') || d.gallery)?.gallery || [];
      setModalData({
        title: service.title,
        actionType: 'text-carousel',
        gallery: cartoImages,
        textContent: {
          intro: "Trabajamos con AtomUAS para el análisis avanzado de sus plantas fotovoltaicas, lo que nos permite ofrecer:",
          list: [
            "Tiempos de operación en planta mínimos.",
            "Información georreferenciada a nivel de módulo.",
            "Análisis automatizado con inteligencia artificial.",
            "Entrega ágil de informes técnicos.",
            "Resultados adaptados para campo y oficina.",
            "Acceso centralizado en plataforma web."
          ]
        }
      });
      setGalleryIndex(0);
      setModalOpen(true);
    }
  };

  const handleRequestSample = () => {
    setContactType('empresa');
    setFormMessage("Hola, me interesa solicitar un ejemplo del reporte PDF y conocer más sobre sus entregables técnicos.");
    setServiceType('informe-completo');
    const contactSection = document.getElementById('contacto');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRequestFullReport = () => {
    setModalOpen(false);
    setContactType('empresa');
    setFormMessage("Hola, me interesa recibir el informe técnico completo (PDF + Excel) de un proyecto de referencia.");
    setServiceType('informe-completo');
    setTimeout(() => {
      const contactSection = document.getElementById('contacto');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = Object.fromEntries(new FormData(formRef.current));

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((result) => {
        alert('¡Mensaje enviado con éxito!');
        setFormMessage('');
        setTurnstileToken(null);
        e.target.reset();
        setIsSending(false);
      }, (error) => {
        console.error("DETALLE DEL ERROR:", error);
        alert('Error al enviar: ' + (error.text || 'Token inválido'));
        setIsSending(false);
      });
  };

  const openViewer = (item) => {
    setModalData(item);
    setGalleryIndex(0);
    setModalOpen(true);
  };

  const nextGallery = () => { if (modalData?.gallery) { setGalleryIndex((prev) => (prev + 1) % modalData.gallery.length); startModalTimer(); } };
  const prevGallery = () => { if (modalData?.gallery) { setGalleryIndex((prev) => (prev - 1 + modalData.gallery.length) % modalData.gallery.length); startModalTimer(); } };
  const nextTech = () => { setTechSlide((prev) => (prev + 1) % equipment.length); startTechTimer(); };
  const prevTech = () => { setTechSlide((prev) => (prev - 1 + equipment.length) % equipment.length); startTechTimer(); };

  const serviceOptions = services.map(s => s.title);

  return (
    <div className="font-sans text-trone-primary bg-white">

      <Helmet>
        <html lang="es" />
        <title>TRONE | Inspección Digital Aérea y Termografía</title>
        <meta name="description" content="Inspección técnica certificada con drones y termografía para parques fotovoltaicos y líneas de alta tensión en Chile. Reportes DGAC." />
        <link rel="canonical" href="https://trone.cl/" />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-trone-primary/95 backdrop-blur-lg py-2 shadow-lg border-b border-white/5' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="#" className="flex items-center relative z-20 shrink-0" aria-label="Ir al inicio">
            <img src={ASSETS.logos.main} alt="TRONE Logo" width="48" height="48" className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-8 md:h-10' : 'h-10 md:h-12 lg:h-20'}`} />
          </a>
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <div className="flex gap-4 lg:gap-6 text-xs lg:text-sm font-bold text-white/90 tracking-widest uppercase">
              <a href="#inicio" className="hover:text-trone-accent transition-colors">Inicio</a>
              <a href="#servicios" className="hover:text-trone-accent transition-colors">Servicios</a>
              <a href="#tecnologia" className="hover:text-trone-accent transition-colors">Tecnología</a>
              <a href="#capacidades" className="hover:text-trone-accent transition-colors">Equipo</a>
              <a href="#entregables" className="hover:text-trone-accent transition-colors">Entregables</a>
            </div>
            <a href="#contacto" className="px-4 lg:px-6 py-2 bg-trone-accent text-white text-[10px] lg:text-xs font-bold rounded uppercase tracking-wider hover:bg-white hover:text-trone-primary transition-all shadow-lg shadow-orange-900/20">Cotizar</a>
          </div>
          <button className="md:hidden text-white p-1 z-50" onClick={() => setIsMenuOpen(true)} aria-label="Abrir menú">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black h-[100dvh] flex flex-col items-center justify-center animate-fadeIn">
          <button className="absolute top-6 right-6 text-white hover:text-trone-accent p-2" onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú"><X size={40} /></button>
          <div className="flex flex-col gap-8 text-center">
            <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white hover:text-trone-accent uppercase">Inicio</a>
            <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white hover:text-trone-accent uppercase">Servicios</a>
            <a href="#tecnologia" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white hover:text-trone-accent uppercase">Tecnología</a>
            <a href="#capacidades" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white hover:text-trone-accent uppercase">Equipo</a>
            <a href="#entregables" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white hover:text-trone-accent uppercase">Entregables</a>
            <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-trone-accent uppercase mt-4">Cotizar</a>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="inicio" className="relative min-h-[90dvh] md:min-h-[50vh] lg:min-h-[60vh] xl:min-h-[85vh] flex flex-col justify-center bg-trone-primary text-white overflow-hidden py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat opacity-60 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-trone-primary via-trone-primary/40 to-black/30"></div>

        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full pt-16 md:pt-0">
          <p className="text-trone-accent font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4 animate-fadeIn text-sm md:text-base">
            {companyInfo.tagline}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-8xl font-black mb-4 md:mb-6 leading-tight tracking-tighter max-w-4xl">
            PRECISIÓN <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">DESDE EL AIRE.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-xl xl:text-2xl text-gray-200 mb-6 lg:mb-8 xl:mb-12 max-w-2xl leading-relaxed font-light">
            {companyInfo.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <a href="#contacto" className="bg-trone-accent hover:bg-orange-600 text-white text-base md:text-lg font-bold py-3 md:py-4 px-8 md:px-10 rounded-none transition-all flex items-center justify-center gap-3 shadow-lg w-fit">
              COTIZAR PROYECTO <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* CLIENTES */}
      <section id="clientes" className="py-12 md:py-16 lg:py-20 bg-black border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 lg:mb-12">
            <div className="inline-block mb-3"><p className="text-trone-accent font-bold tracking-widest uppercase text-xs md:text-sm">ALIANZAS ESTRATÉGICAS</p></div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">Líderes de la industria nacional <br className="hidden md:block" /> respaldan nuestra tecnología</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center w-full gap-6 md:gap-8 lg:gap-12">
            {clients.map((client, idx) => (
              <a key={idx} href={client.url} target="_blank" rel="noopener noreferrer" className="w-1/3 md:w-1/4 lg:w-1/6 flex justify-center items-center p-2 md:p-4 hover:bg-white/5 rounded-xl transition-all duration-300 group cursor-pointer" aria-label={`Visitar sitio de ${client.name}`}>
                <img src={client.logo} alt={`Cliente: ${client.name}`} width="150" height="80" className="w-auto h-10 md:h-12 lg:h-14 object-contain filter brightness-0 invert opacity-40 group-hover:filter-none group-hover:opacity-100 transition-all duration-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-16 lg:py-24 px-6 bg-trone-light">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 lg:mb-16 max-w-3xl">
            <h2 className="text-trone-primary text-3xl md:text-4xl lg:text-5xl font-black mb-4 lg:mb-6">SOLUCIONES INDUSTRIALES</h2>
            <div className="h-2 w-16 md:w-24 bg-trone-accent mb-4 lg:mb-6"></div>
            <p className="text-gray-700 text-base md:text-lg">Nos enfocamos en las áreas críticas donde la precisión es obligatoria.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <div key={service.id} onClick={() => handleServiceClick(service)} className={`group bg-white p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-trone-accent rounded-sm ${service.title.toLowerCase().includes('fotovoltaic') ? 'cursor-pointer' : ''}`}>
                <div className="mb-4 lg:mb-6 text-trone-accent group-hover:scale-110 transition-transform duration-300 origin-left"><service.icon size={40} className="lg:w-12 lg:h-12" strokeWidth={1.5} /></div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3 text-trone-primary group-hover:text-trone-accent transition-colors">{service.title}</h3>

                {service.stats && (
                  <div className="mb-4 inline-flex items-center gap-2 bg-trone-accent/10 px-3 py-1 rounded text-trone-accent font-bold text-xs lg:text-sm border border-trone-accent/20">
                    {service.statIcon ? React.createElement(service.statIcon, { size: 16 }) : <BarChart3 size={16} />}
                    {service.stats}
                  </div>
                )}

                <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4 lg:mb-6">{service.desc}</p>
                {service.details && (
                  <ul className="space-y-2 md:space-y-3 pt-4 border-t border-gray-100">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3 text-xs lg:text-sm text-gray-700"><CheckCircle2 size={16} className="text-trone-accent mt-0.5 shrink-0" /><span>{detail}</span></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECNOLOGÍA */}
      <section id="tecnologia" className="py-16 lg:py-24 px-6 bg-trone-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-4 items-center">
            <div className="order-1 lg:order-2 flex justify-center items-center relative h-64 md:h-80 lg:h-[450px]">
              <div className="absolute inset-0 bg-trone-accent/10 blur-[60px] md:blur-[100px] rounded-full"></div>
              <img
                src={equipment[techSlide].image}
                alt={equipment[techSlide].title}
                className="relative z-10 h-full w-full object-contain drop-shadow-2xl transition-all duration-500"
              />
            </div>
            <div className="order-2 lg:order-1 animate-fadeIn text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-trone-accent font-bold tracking-widest uppercase mb-4 text-xs md:text-sm lg:text-base">
                {React.createElement(equipment[techSlide].icon, { size: 18 })}
                {equipment[techSlide].title.includes("DGAC") ? "Acreditación" : equipment[techSlide].title.includes("Matrice") ? "Equipamiento" : "Tecnología"}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight min-h-[2em] lg:min-h-[1.2em]">{equipment[techSlide].title}</h2>
              <p className="text-gray-200 text-sm md:text-base lg:text-lg mb-8 leading-relaxed min-h-[4em] max-w-lg mx-auto lg:mx-0">{equipment[techSlide].desc}</p>
              <div className="flex justify-center lg:justify-start gap-4">
                <button onClick={prevTech} aria-label="Tecnología anterior" className="p-3 md:p-4 rounded-full border border-white/20 hover:bg-trone-accent hover:border-trone-accent transition-all group"><ChevronLeft size={20} className="md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" /></button>
                <button onClick={nextTech} aria-label="Siguiente tecnología" className="p-3 md:p-4 rounded-full border border-white/20 hover:bg-trone-accent hover:border-trone-accent transition-all group"><ChevronRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" /></button>
              </div>
              <div className="flex justify-center lg:justify-start gap-2 mt-8">
                {equipment.map((_, idx) => (
                  <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === techSlide ? 'w-8 md:w-12 bg-trone-accent' : 'w-3 md:w-4 bg-gray-600'}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO Y CAPACIDADES TÉCNICAS */}
      <section id="capacidades" className="py-16 lg:py-24 px-6 bg-trone-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-trone-accent font-bold tracking-widest uppercase text-xs md:text-sm mb-4">Nuestro Equipo</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-trone-primary mb-4 lg:mb-6">EQUIPO Y CAPACIDADES TÉCNICAS</h2>
            <div className="h-2 w-16 md:w-24 bg-trone-accent mx-auto mb-4 lg:mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">Operaciones respaldadas por profesionales certificados con experiencia comprobada en terreno.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: ShieldCheck, title: "Pilotos Certificados DGAC", desc: "Operadores acreditados por la Dirección General de Aeronáutica Civil para vuelos comerciales con RPAS." },
              { icon: HardHat, title: "Operaciones en Terreno", desc: "Equipo con experiencia en plantas solares, líneas de alta tensión y subestaciones a lo largo de Chile." },
              { icon: Thermometer, title: "Análisis Termográfico", desc: "Especialistas en interpretación de imágenes térmicas para diagnóstico eléctrico y detección de anomalías." },
              { icon: LineChart, title: "Procesamiento de Datos", desc: "Pipeline automatizado de procesamiento post-vuelo con algoritmos de detección y clasificación." },
              { icon: ClipboardList, title: "Coordinación de Seguridad", desc: "Protocolos de seguridad operacional, evaluación de riesgos y gestión de permisos para cada misión." },
              { icon: FileSearch, title: "Reportería Técnica", desc: "Generación de informes detallados con fichas por hallazgo, bases de datos y cartografía georreferenciada." }
            ].map((cap, idx) => (
              <div key={idx} className="group bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-trone-accent/30">
                <div className="w-12 h-12 bg-trone-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-trone-accent group-hover:text-white text-trone-accent transition-colors">
                  <cap.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-trone-primary mb-2 group-hover:text-trone-accent transition-colors">{cap.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTREGABLES */}
      <section id="entregables" className="py-16 lg:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-trone-primary mb-4">ENTREGABLES TÉCNICOS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">Visualiza ejemplos reales. Haz clic en las tarjetas para abrir la vista protegida.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {deliverables.map((item, idx) => (
              <div key={idx} onClick={() => openViewer(item)} className="group p-6 lg:p-8 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:shadow-xl hover:border-trone-accent/30 transition-all duration-300 cursor-pointer relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-trone-accent text-white text-[10px] lg:text-xs font-bold px-2 py-1 rounded">VER EJEMPLO</div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-trone-primary mb-4 lg:mb-6 group-hover:bg-trone-accent group-hover:text-white transition-colors"><item.icon size={20} className="lg:w-6 lg:h-6" /></div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs lg:text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-2 text-trone-accent text-xs lg:text-sm font-bold mt-auto"><Eye size={16} /> Visualizar</div>
              </div>
            ))}
          </div>
          <div className="mt-10 lg:mt-12 text-center">
            <button onClick={handleRequestSample} className="inline-flex items-center gap-2 text-trone-accent font-bold hover:text-trone-primary transition-colors border-b-2 border-trone-accent pb-1 text-sm md:text-base">
              Solicitar ejemplo personalizado a mi correo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-16 lg:py-24 px-6 bg-trone-primary relative">
        <div className="max-w-4xl lg:max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10 lg:mb-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
            <p className="text-gray-300 text-sm md:text-base">Selecciona tu perfil y completa el formulario.</p>
          </div>
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button onClick={() => setContactType('empresa')} className={`flex-1 py-3 lg:py-4 text-center text-sm md:text-base font-bold tracking-wide transition-colors ${contactType === 'empresa' ? 'bg-trone-accent text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>SOY EMPRESA</button>
              <button onClick={() => setContactType('persona')} className={`flex-1 py-3 lg:py-4 text-center text-sm md:text-base font-bold tracking-wide transition-colors ${contactType === 'persona' ? 'bg-trone-accent text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>SOY PERSONA</button>
            </div>
            <form ref={formRef} className="p-6 md:p-8 lg:p-10 space-y-6" onSubmit={sendEmail}>
              {contactType === 'empresa' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fadeIn">
                  <div className="col-span-1 md:col-span-2">
                    <label htmlFor="company_name" className="block text-sm font-bold text-gray-700 mb-2">Nombre de Empresa</label>
                    <input id="company_name" type="text" name="company_name" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-trone-accent" placeholder="Ej. Constructora S.A." required />
                  </div>
                  <div><label htmlFor="empresa_email" className="block text-sm font-bold text-gray-700 mb-2">Email</label><input id="empresa_email" type="email" name="user_email" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-trone-accent" required /></div>
                  <div><label htmlFor="empresa_phone" className="block text-sm font-bold text-gray-700 mb-2">Teléfono <span className="font-normal text-gray-400">(Opcional)</span></label><input id="empresa_phone" type="tel" name="user_phone" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-trone-accent" /></div>
                </div>
              )}
              {contactType === 'persona' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fadeIn">
                  <div><label htmlFor="user_name" className="block text-sm font-bold text-gray-700 mb-2">Nombre</label><input id="user_name" type="text" name="user_name" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-trone-accent" required /></div>
                  <div><label htmlFor="user_lastname" className="block text-sm font-bold text-gray-700 mb-2">Apellido</label><input id="user_lastname" type="text" name="user_lastname" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-trone-accent" required /></div>
                  <div><label htmlFor="user_email" className="block text-sm font-bold text-gray-700 mb-2">Email</label><input id="user_email" type="email" name="user_email" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-trone-accent" required /></div>
                  <div><label htmlFor="user_phone" className="block text-sm font-bold text-gray-700 mb-2">Teléfono <span className="font-normal text-gray-400">(Opcional)</span></label><input id="user_phone" type="tel" name="user_phone" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-trone-accent" /></div>
                </div>
              )}
              <div className="animate-fadeIn space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="service_type" className="block text-sm font-bold text-gray-700 mb-2">Tipo de Servicio</label>
                  <select id="service_type" name="service_type" value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-600 outline-none focus:border-trone-accent" required>
                    <option value="" disabled>Selecciona una opción</option>
                    {serviceOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    <option value="informe-completo">Solicitar Informe Completo</option>
                    <option value="otro">Otro / Consulta General</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Mensaje</label>
                  <textarea id="message" name="message" rows="4" value={formMessage} onChange={(e) => setFormMessage(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-trone-accent resize-none" placeholder="Detalles del proyecto, ubicación, fechas tentativas..." required></textarea>
                </div>

                <div className="flex justify-center my-4">
                  <Turnstile
                    siteKey="0x4AAAAAACgoIerT1_rJiu5S"
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending || !turnstileToken}
                  className={`w-full bg-trone-primary hover:bg-gray-800 text-white font-bold py-3 md:py-4 rounded-lg transition-all flex justify-center items-center gap-2 text-base md:text-lg shadow-lg transform hover:-translate-y-1 ${isSending || !turnstileToken ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSending ? 'ENVIANDO...' : 'ENVIAR SOLICITUD'} <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SECCIÓN PARTNERS / ALIANZAS ESTRATÉGICAS */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="w-full flex flex-col items-center justify-center mb-12 md:mb-16 lg:mb-20">
            <p className="text-trone-accent font-bold tracking-widest uppercase text-xs md:text-sm mb-4 text-center">
              Nuestros Partners
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-trone-primary uppercase text-center w-full leading-tight">
              Certificaciones y Alianzas Estratégicas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-8 gap-y-12 md:gap-y-0 items-center">
            {/* Logo DGAC */}
            <div className="flex justify-center md:justify-end items-center md:pr-10 xl:pr-32 border-b md:border-b-0 md:border-r border-gray-100 pb-8 md:pb-0">
              <a href="https://www.dgac.gob.cl/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                <img src={ASSETS.logos.dgac} alt="Certificación DGAC" loading="lazy" className="h-44 md:h-52 lg:h-[17rem] w-auto object-contain" />
              </a>
            </div>

            {/* Logos Alianzas */}
            <div className="flex justify-center md:justify-start items-center md:pl-10 xl:pl-32 pt-8 md:pt-0">
              <div className="flex flex-col items-center md:items-start gap-10 md:gap-12">
                <a href="https://aerotools.es/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform duration-300">
                  <img src={ASSETS.logos.partners.aerotools} alt="Alianza Aerotools" loading="lazy" className="h-20 md:h-28 lg:h-36 w-auto object-contain" />
                </a>
                <a href="https://www.atom-uas.com/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform duration-300">
                  <img src={ASSETS.logos.partners.atom} alt="Alianza Atom-UAS" loading="lazy" className="h-20 md:h-28 lg:h-36 w-auto object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="text-center md:text-left">
              <img src={ASSETS.logos.text} alt="TRONE Logo" loading="lazy" width="120" height="40" className="h-8 md:h-10 mb-4 md:mb-6 w-auto object-contain mx-auto md:mx-0" />
              <p className="text-[10px] md:text-xs">© {new Date().getFullYear()} Todos los derechos reservados.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 lg:gap-16 w-full md:w-auto justify-center md:justify-end">
              <div className="text-center md:text-left">
                <p className="text-trone-accent text-xs font-bold uppercase tracking-wider mb-2">Contacto Comercial</p>
                {companyInfo.contact.emails.map((email, idx) => (
                  <a key={idx} href={`mailto:${email}`} className="block text-gray-400 hover:text-white transition-colors text-xs md:text-sm hover:underline mb-1">{email}</a>
                ))}
              </div>
              <div className="text-center md:text-left">
                <p className="text-trone-accent text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-center md:justify-start gap-1"><MapPin size={12} /> Ubicación</p>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Los Militares 5620 OF 905 PS 9<br />Las Condes, Santiago</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {modalOpen && modalData && (
        <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <button onClick={() => setModalOpen(false)} aria-label="Cerrar ventana" className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-trone-accent z-[80] bg-black/50 p-2 rounded-full backdrop-blur-sm transition-all">
            <X size={32} />
          </button>
          <div className="w-full max-w-7xl h-[90vh] bg-white rounded-lg overflow-hidden relative flex flex-col shadow-2xl">
            <div className="flex-1 bg-gray-100 overflow-hidden relative flex items-center justify-center" onContextMenu={(e) => e.preventDefault()}>
              {modalData.actionType === 'pdf' && (
                <div className="w-full h-full relative">
                  <iframe src={`${modalData.content}#toolbar=0&navpanes=0&scrollbar=0`} className="w-full h-full hidden md:block" title="Visor de PDF"></iframe>
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-trone-light md:hidden">
                    <p className="text-gray-600 mb-6 text-center max-w-xs text-sm">Para visualizar este documento técnico en tu dispositivo móvil, ábrelo directamente.</p>
                    <a href={modalData.content} target="_blank" rel="noopener noreferrer" className="bg-trone-primary text-white py-3 px-6 rounded-full font-bold shadow-2xl flex items-center justify-center gap-3 border border-white/20 hover:bg-gray-800 transition-all text-sm">
                      <FileText size={20} /> Abrir Documento PDF
                    </a>
                  </div>
                </div>
              )}
              {modalData.actionType === 'image' && (
                <div className="w-full h-full flex items-center justify-center bg-black p-4">
                  <img src={modalData.content} alt="Vista previa de documento" className="max-w-full max-h-full object-contain shadow-2xl" />
                </div>
              )}
              {modalData.actionType === 'carousel' && modalData.gallery && (
                <div className="relative w-full h-full bg-black flex flex-col items-center justify-center">
                  <div className="flex-1 w-full flex items-center justify-center relative">
                    <img src={modalData.gallery[galleryIndex]} alt={`Imagen ${galleryIndex + 1} de la galería`} className="max-w-full max-h-full object-contain transition-opacity duration-500" />
                    <button onClick={prevGallery} aria-label="Imagen anterior" className="absolute left-4 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"><ChevronLeft size={40} /></button>
                    <button onClick={nextGallery} aria-label="Imagen siguiente" className="absolute right-4 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"><ChevronRight size={40} /></button>
                    <div className="absolute bottom-6 flex gap-2">
                      {modalData.gallery.map((_, i) => (
                        <div key={i} className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${i === galleryIndex ? 'bg-trone-accent scale-125' : 'bg-white/40'}`}></div>
                      ))}
                    </div>
                  </div>
                  {modalData.id === 'informe-completo' && (
                    <div className="w-full bg-gradient-to-t from-black via-black/90 to-transparent px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <p className="text-white/70 text-sm text-center sm:text-left">¿Quieres recibir el informe completo?</p>
                      <button onClick={handleRequestFullReport} className="inline-flex items-center gap-2 bg-trone-accent hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-full text-sm transition-all shadow-lg shadow-orange-900/30 whitespace-nowrap">
                        <Download size={16} /> Solicitar Informe Completo
                      </button>
                    </div>
                  )}
                </div>
              )}
              {modalData.actionType === 'text-carousel' && (
                <div className="w-full h-full relative bg-white overflow-hidden rounded-lg">
                  <div id="innovative-slider" className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="w-full h-full shrink-0 snap-center snap-always flex flex-col justify-start p-6 pt-20 md:p-12 lg:p-20 relative bg-white overflow-y-auto">
                      <div className="max-w-3xl w-full mx-auto flex flex-col min-h-full">
                        <div className="flex-1">
                          <div className="inline-block mb-3 md:mb-4 px-3 py-1 bg-trone-primary/5 text-trone-primary text-[10px] md:text-sm font-bold tracking-widest uppercase rounded-full border border-trone-primary/10">
                            Resumen del Servicio
                          </div>
                          <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-trone-primary mb-4 md:mb-6 uppercase leading-tight pr-8">
                            {modalData.title}
                          </h3>
                          {modalData.textContent.intro && (
                            <p className="text-sm md:text-lg lg:text-xl leading-relaxed mb-6 font-medium text-gray-600">
                              {modalData.textContent.intro}
                            </p>
                          )}
                          {modalData.textContent.list && (
                            <ul className="space-y-3 md:space-y-6 mb-8">
                              {modalData.textContent.list.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 md:gap-4">
                                  <CheckCircle2 size={20} className="text-trone-accent shrink-0 md:w-6 md:h-6 mt-0.5" />
                                  <span className="text-sm md:text-lg text-gray-700 leading-snug">{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="mt-auto pb-4 pt-4 border-t border-gray-100 flex flex-col items-center gap-3 w-full">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 animate-pulse md:hidden">
                            <ChevronRight size={14} /> Desliza para ver galería <ChevronRight size={14} />
                          </div>
                          <button onClick={() => document.getElementById('innovative-slider').scrollBy({ left: window.innerWidth, behavior: 'smooth' })} className="group flex items-center justify-center gap-3 bg-trone-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-trone-accent transition-all duration-300 shadow-xl shadow-trone-primary/20 w-full md:w-auto">
                            Ir a la Galería Interactiva <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-full shrink-0 snap-center snap-always relative bg-black flex flex-col items-center justify-center">
                      <button onClick={() => document.getElementById('innovative-slider').scrollBy({ left: -window.innerWidth, behavior: 'smooth' })} className="absolute top-4 left-4 z-50 flex items-center gap-1 bg-black/60 hover:bg-black/90 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-full backdrop-blur-md transition-all border border-white/10 text-xs md:text-sm font-bold group">
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Volver a Detalles</span>
                        <span className="sm:hidden">Volver</span>
                      </button>
                      {modalData.gallery && modalData.gallery.length > 0 && (
                        <div className="w-full h-full relative group flex items-center justify-center p-0">
                          <img src={modalData.gallery[galleryIndex]} alt={`Demostración técnica ${galleryIndex + 1}`} className="max-w-full max-h-full object-contain opacity-95 hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
                          <button onClick={prevGallery} aria-label="Imagen anterior" className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-trone-accent p-2 md:p-3 rounded-full text-white backdrop-blur-sm transition-all border border-white/10">
                            <ChevronLeft size={24} className="md:w-7 md:h-7" />
                          </button>
                          <button onClick={nextGallery} aria-label="Imagen siguiente" className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-trone-accent p-2 md:p-3 rounded-full text-white backdrop-blur-sm transition-all border border-white/10">
                            <ChevronRight size={24} className="md:w-7 md:h-7" />
                          </button>
                          <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center gap-2 md:gap-3">
                            {modalData.gallery.map((_, i) => (
                              <div key={i} className={`h-1.5 md:h-2 rounded-full transition-all duration-300 shadow-sm ${i === galleryIndex ? 'w-8 md:w-12 bg-trone-accent' : 'w-2 md:w-3 bg-white/40 hover:bg-white/60'}`}></div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;