/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trone: {
          primary: '#111827',   // Negro/Azul muy oscuro (Industrial)
          secondary: '#374151', // Gris oscuro para secciones secundarias
          accent: '#e0241b',    // Naranja vibrante (Energía/Seguridad)
          light: '#F3F4F6',     // Gris muy claro para fondos limpios
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1579965342575-16428a7c8881?q=80&w=2069&auto=format&fit=crop')", // Imagen de paneles solares/drone
      }
    },
  },
  plugins: [],
}