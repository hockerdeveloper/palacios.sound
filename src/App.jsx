import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BadgeInfo,
  Award,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  Mic2,
  Volume2,
  Radio,
  Music,
  Sparkles
} from 'lucide-react';

// IMPORTACIÓN DIRECTA DEL LOGO
// Asegúrate de que el archivo "logo.jpg" esté guardado exactamente en la carpeta "src",
// justo al lado de este archivo App.jsx.
import logoImg from './logo.jpg'; 

const WHATSAPP_NUMBER = '529613272867';

// --- COMPONENTE VISUAL: ECUALIZADOR DE AUDIO ---
const AudioEqualizer = () => (
  <div className="flex items-end gap-[3px] h-5 opacity-80">
    {[0.2, 0.5, 0.1, 0.4, 0.3].map((delay, i) => (
      <motion.div
        key={i}
        animate={{ height: ['30%', '100%', '40%', '90%', '30%'] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay }}
        className="w-1.5 rounded-t-sm bg-brand-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]"
      />
    ))}
  </div>
);

const packages = [
  {
    id: 'START',
    name: 'START',
    price: 3720,
    idealFor: 'Taquerías, barberías, cafeterías, minisúpers, aperturas pequeñas.',
    result: 'Más tráfico local, visibilidad inmediata y movimiento comercial.',
    includes: [
      'Activación fuera del negocio',
      'Animador con micrófono',
      '2 bocinas de 15”',
      '2 trípodes con globos',
      'Fotos del evento',
      'Publicación en grupos de Facebook',
    ],
  },
  {
    id: 'PLUS',
    name: 'PLUS',
    price: 4680,
    idealFor: 'Restaurantes, estéticas, gimnasios e inauguraciones medianas.',
    result: 'Presencia de marca y mejor percepción profesional.',
    includes: ['Todo START', '1 edecán animadora'],
  },
  {
    id: 'PRO',
    name: 'PRO',
    price: 6240,
    idealFor: 'Franquicias, campañas comerciales y lanzamientos fuertes.',
    result: 'Impacto visual masivo, interacción y alta recordación.',
    includes: ['Todo PLUS', '2 edecanes animadoras'],
  },
  {
    id: 'PREMIUM',
    name: 'PREMIUM',
    price: 9480,
    idealFor: 'Inauguraciones grandes, plazas, eventos masivos y BTL.',
    result: 'Experiencia inmersiva y máxima autoridad de marca.',
    includes: ['Todo PRO', '1 zanquero arlequín (1.5 h)', '1 volanteador'],
  },
];

const extras = [
  { id: 'hora-extra', label: 'Hora extra', note: 'Se calcula según el paquete.' },
  { id: 'bocina', label: 'Bocina adicional', note: 'Mayor cobertura de audio.' },
  { id: 'micro', label: 'Micrófono inalámbrico', note: 'Para interacciones.' },
  { id: 'dj', label: 'DJ en vivo', note: 'Mezcla en tiempo real.' },
  { id: 'volanteador', label: 'Volanteador extra', note: 'Distribución masiva.' },
  { id: 'edecan', label: 'Edecán extra', note: 'Mayor presencia visual.' },
  { id: 'zanquero', label: 'Zanquero extra', note: 'Impacto a distancia.' },
  { id: 'branding', label: 'Branding del evento', note: 'Personalización visual.' },
];

const zones = [
  { id: 'tijuana', label: 'Tijuana', surcharge: 0, tag: 'Zona base' },
  { id: 'rosarito', label: 'Rosarito', surcharge: 450, tag: 'Traslado' },
  { id: 'tecate', label: 'Tecate', surcharge: 650, tag: 'Traslado' },
  { id: 'otra', label: 'Otra ciudad', surcharge: 0, tag: 'A cotizar' },
];

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

export default function PalaciosSoundLanding() {
  const [selectedPackage, setSelectedPackage] = useState('START');
  const [selectedZone, setSelectedZone] = useState('tijuana');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zoneArea, setZoneArea] = useState('');
  const [address, setAddress] = useState('');
  const [guests, setGuests] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedExtras, setSelectedExtras] = useState([]);

  const pkg = packages.find((p) => p.id === selectedPackage) || packages[0];
  const zone = zones.find((z) => z.id === selectedZone) || zones[0];

  const baseExtrasValue = selectedExtras.length * 250;
  const subtotal = pkg.price + zone.surcharge + baseExtrasValue;
  const total = Math.round(subtotal * 1.2);

  const waMessage = useMemo(() => {
    const extrasText = selectedExtras.length
      ? selectedExtras.map((id) => extras.find((e) => e.id === id)?.label).filter(Boolean).join(', ')
      : 'Sin extras';

    return [
      '⚡ *Hola Palacios Sound, quiero cotizar una activación.* ⚡',
      '',
      `🎧 *Paquete:* ${pkg.name}`,
      `📍 *Zona:* ${zone.label}`,
      `🎉 *Tipo de evento:* ${eventType || 'No especificado'}`,
      `📅 *Fecha:* ${eventDate || 'No especificada'}`,
      `⏰ *Hora de inicio:* ${eventStart || 'No especificada'}`,
      `🏙️ *Ciudad/Colonia:* ${city || 'N/A'} - ${zoneArea || 'N/A'}`,
      `🗺️ *Dirección:* ${address || 'No especificada'}`,
      `👥 *Afluencia:* ${guests || 'No especificada'}`,
      `➕ *Extras:* ${extrasText}`,
      `📝 *Notas:* ${notes || 'Sin observaciones'}`,
      '',
      `💰 *Inversión estimada:* ${currency.format(total)}`,
      '',
      '👤 *Datos del cliente:*',
      `Nombre: ${fullName || 'No especificado'}`,
      `Negocio: ${businessName || 'No especificado'}`,
      `Contacto: ${phone || 'No especificado'} | ${email || 'No especificado'}`,
      '',
      'Quedo atento para confirmar disponibilidad y cerrar la fecha. 🚀',
    ].join('\n');
  }, [pkg, zone, eventType, eventDate, eventStart, city, zoneArea, address, guests, selectedExtras, total, fullName, businessName, phone, email, notes]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  const toggleExtra = (id) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-red/30 selection:text-white font-sans overflow-x-hidden">
      
      {/* HEADER: AHORA CON EFECTO NEÓN SUTIL */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-dark/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {/* CONTENEDOR DEL LOGO CON GLOW RÍTMICO */}
            <motion.div 
              animate={{ boxShadow: ['0px 0px 0px rgba(249,0,48,0)', '0px 0px 15px rgba(249,0,48,0.5)', '0px 0px 0px rgba(249,0,48,0)'] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full ring-2 ring-brand-red bg-black"
            >
              <img src={logoImg} alt="Palacios Sound" className="h-full w-full object-cover" />
            </motion.div>
            <div>
              <p className="text-sm font-black tracking-[0.28em] text-white uppercase flex items-center gap-2">
                Palacios Sound <AudioEqualizer />
              </p>
              <p className="text-xs text-brand-cyan font-medium">Activaciones Premium</p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-brand-red/50 bg-brand-red/10 px-5 py-2 text-sm font-bold text-brand-red transition-all hover:bg-brand-red hover:text-white hover:shadow-[0_0_20px_rgba(249,0,48,0.4)]"
          >
            <Mic2 className="h-4 w-4" />
            Reservar Fecha
          </a>
        </div>
      </header>

      <main>
        {/* HERO: TEMÁTICA DE "STAGE LIGHTS" Y SONIDO */}
        <section className="relative overflow-hidden border-b border-white/5">
          {/* Luces de escenario (Gradientes radiales intensos) */}
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/20 blur-[120px]" />
          <div className="absolute top-0 right-1/4 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/20 blur-[100px]" />
          
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 flex flex-col justify-center"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 px-4 py-2 text-sm font-medium text-brand-cyan">
                <Volume2 className="h-4 w-4 animate-pulse" />
                Sube el volumen de tus ventas
              </div>
              <h1 className="max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
                El <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-cyan">ruido</span> que tu negocio necesita.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                DJ, animadores, edecanes y equipo de audio profesional para inauguraciones y campañas. Hacemos que la gente se detenga, mire y compre.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#paquetes"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-gray-100"
                >
                  <Music className="h-5 w-5" /> Ver Paquetes
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
                >
                  Cotizar Ahora <ChevronRight className="h-5 w-5 text-brand-cyan" />
                </a>
              </div>
            </motion.div>

            {/* TARJETA DEL COTIZADOR RÁPIDO CON ESTILO DE CONSOLA DJ */}
            <motion.aside
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 flex flex-col justify-center"
            >
              <div className="rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl shadow-black/80 ring-1 ring-white/5 backdrop-blur-xl relative overflow-hidden">
                {/* Detalle visual de la consola */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-cyan to-brand-red opacity-50" />
                
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold">Monitor</p>
                    <h2 className="mt-1 text-2xl font-bold text-white">Cotizador Live</h2>
                  </div>
                  <div className="rounded-2xl border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-right shadow-[0_0_15px_rgba(249,0,48,0.15)]">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-red font-bold">Inversión Estimada</p>
                    <p className="text-2xl font-black text-white tracking-tight">{currency.format(total)}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 font-mono text-sm">
                  <div className="flex justify-between rounded-xl bg-black px-4 py-3 border border-white/5">
                    <span className="text-white/50">CH 1: Paquete</span>
                    <span className="font-bold text-brand-cyan">{pkg.name}</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-black px-4 py-3 border border-white/5">
                    <span className="text-white/50">CH 2: Zona</span>
                    <span className="font-bold text-white">{zone.label}</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-black px-4 py-3 border border-white/5">
                    <span className="text-white/50">CH 3: Traslado/Extras</span>
                    <span className="font-bold text-white">{currency.format(zone.surcharge + baseExtrasValue)}</span>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        {/* PAQUETES (ESTILO RACKS DE AUDIO) */}
        <section id="paquetes" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-cyan flex items-center justify-center gap-2">
              <Radio className="h-4 w-4" /> Line-up de Paquetes
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Encuentra tu frecuencia ideal</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {packages.map((p) => {
              const active = p.id === selectedPackage;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPackage(p.id)}
                  className={`group relative flex flex-col rounded-[2rem] border p-6 text-left transition-all duration-300 ${
                    active
                      ? 'border-brand-red bg-brand-red/5 shadow-[0_0_30px_rgba(249,0,48,0.1)] scale-105 z-10'
                      : 'border-white/10 bg-[#0a0a0a] hover:bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  {active && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Seleccionado
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className={`text-3xl font-black tracking-tight ${active ? 'text-white' : 'text-white/80'}`}>{p.name}</h3>
                    <p className={`mt-2 text-xl font-bold ${active ? 'text-brand-cyan' : 'text-white/60'}`}>
                      {currency.format(p.price)}
                    </p>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Ideal para</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{p.idealFor}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Setup incluye</p>
                      <ul className="mt-3 space-y-3">
                        {p.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${active ? 'text-brand-red' : 'text-brand-cyan'}`} />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* COTIZADOR COMPLETO */}
        <section className="border-t border-white/10 bg-[#050505] relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
              {/* Controles (Izquierda) */}
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-red">Setup Personalizado</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Arma tu activación</h2>
                
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  <label className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50">Paquete Base</span>
                    <select
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white font-medium outline-none transition-colors focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                    >
                      {packages.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </label>

                  <label className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50">Zona de Cobertura</span>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white font-medium outline-none transition-colors focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                    >
                      {zones.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
                    </select>
                  </label>
                </div>

                <div className="mt-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/50">Módulos Extra</span>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {extras.map((item) => {
                      const active = selectedExtras.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleExtra(item.id)}
                          className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
                            active
                              ? 'border-brand-cyan/50 bg-brand-cyan/10 shadow-[inset_0_0_20px_rgba(0,212,255,0.05)]'
                              : 'border-white/10 bg-black hover:border-white/30'
                          }`}
                        >
                          <div className="text-left">
                            <p className={`font-bold ${active ? 'text-brand-cyan' : 'text-white'}`}>{item.label}</p>
                            <p className="mt-1 text-[11px] text-white/40">{item.note}</p>
                          </div>
                          <div className={`h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center ${active ? 'border-brand-cyan bg-brand-cyan' : 'border-white/20'}`}>
                            {active && <div className="h-2 w-2 rounded-full bg-black" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Formulario (Derecha) */}
              <div className="rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <AudioEqualizer />
                </div>
                
                <h3 className="text-2xl font-bold mb-8">Datos del Evento</h3>
                
                <div className="grid gap-5 sm:grid-cols-2">
                  <input placeholder="Nombre completo *" value={fullName} onChange={(e) => setFullName(e.target.value)} className="col-span-2 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm outline-none focus:border-brand-red focus:bg-black transition-all" />
                  <input placeholder="Nombre del negocio *" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="col-span-2 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm outline-none focus:border-brand-red focus:bg-black transition-all" />
                  <input placeholder="WhatsApp *" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm outline-none focus:border-brand-red focus:bg-black transition-all" />
                  <input placeholder="Tipo de evento (Ej. Apertura)" value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm outline-none focus:border-brand-red focus:bg-black transition-all" />
                  
                  <div className="col-span-2 grid grid-cols-2 gap-5">
                    <label className="text-xs text-white/50 space-y-1">Fecha
                      <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-brand-red transition-all block" />
                    </label>
                    <label className="text-xs text-white/50 space-y-1">Hora inicio
                      <input type="time" value={eventStart} onChange={(e) => setEventStart(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-brand-red transition-all block" />
                    </label>
                  </div>
                  
                  <input placeholder="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} className="col-span-2 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm outline-none focus:border-brand-red focus:bg-black transition-all" />
                  <textarea placeholder="Dirección y observaciones adicionales..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="col-span-2 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm outline-none focus:border-brand-red focus:bg-black transition-all resize-none" />
                </div>

                <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-red/20 to-black p-6 border border-brand-red/30 relative overflow-hidden group">
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-brand-red">Total Estimado</p>
                      <p className="text-4xl font-black text-white mt-1 tracking-tight">{currency.format(total)}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-red px-6 py-4 text-lg font-bold text-white transition-all hover:bg-[#ff1a45] hover:shadow-[0_0_30px_rgba(249,0,48,0.4)] hover:scale-[1.02]"
                >
                  <MessageCircle className="h-6 w-6" />
                  Enviar Reserva por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
