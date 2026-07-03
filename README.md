# Palacios Sound

Landing page de activaciones comerciales (DJ, animador, edecanes, zanqueros) para negocios en Tijuana, Rosarito y Tecate. Sitio de una sola página, orientado a conversión directa por WhatsApp: el visitante elige un paquete, llena sus datos y el sitio arma un mensaje de WhatsApp listo para enviar.

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) para animaciones
- [lucide-react](https://lucide.dev/) para iconos

Sitio 100% estático del lado del cliente — no hay backend ni base de datos. La "conversión" se resuelve abriendo `wa.me` con un mensaje pre-armado.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview   # para revisar el build localmente
```

## Deploy

El proyecto está conectado a Vercel y se despliega automáticamente en cada push a `main`. `vercel.json` define el rewrite necesario para SPA (todas las rutas sirven `index.html`).

## Estructura

```
├── index.html          # entrada HTML, meta tags SEO/OG
├── src/
│   ├── main.jsx         # bootstrap de React
│   ├── App.jsx           # toda la landing page (hero, paquetes, form, footer)
│   └── index.css         # Tailwind + estilos base
├── public/
│   ├── logo-palacios.jpg # logo usado como favicon e imagen de marca
│   └── robots.txt
├── tailwind.config.js    # colores de marca (brand.red, brand.cyan, brand.dark)
└── vercel.json
```

## Configuración editable

Dentro de `src/App.jsx`:

- `WHATSAPP_NUMBER` — número de WhatsApp Business que recibe las cotizaciones.
- `packages` — los 4 paquetes (START/PLUS/PRO/PREMIUM), precios e incluidos.
- `extras` — lista de extras opcionales (se cotizan aparte).
- `zones` — zonas de cobertura y recargo por traslado.