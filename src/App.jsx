import React, { useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Award,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Music,
  Phone,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Mic,
} from 'lucide-react';

const WHATSAPP_NUMBER = '526645900771';

const packages = [
  {
    id: 'START',
    name: 'START',
    price: 3799,
    badge: 'Ideal para iniciar',
    idealFor: 'Negocios de colonia, aperturas pequeñas y promociones que necesitan flujo inmediato.',
    result: 'Más tráfico local, más atención frente al negocio y más movimiento en punto de venta.',
    includes: [
      'Activación fuera del negocio',
      'Animador con micrófono',
      '2 bocinas de 15"',
      '2 trípodes con globos',
      'Fotos del evento',
      'Publicación en grupos locales de Facebook',
    ],
  },
  {
    id: 'PLUS',
    name: 'PLUS',
    price: 4799,
    badge: 'Más presencia',
    idealFor: 'Restaurantes, estéticas, gimnasios, boutiques, clínicas e inauguraciones medianas.',
    result: 'Más percepción de marca, más profesionalismo y mejor recordación.',
    includes: ['Todo START', '1 edecán'],
  },
  {
    id: 'PRO',
    name: 'PRO',
    price: 6299,
    badge: 'Mayor impacto',
    idealFor: 'Franquicias, campañas comerciales y negocios con alta afluencia.',
    result: 'Más impacto visual, más interacción con clientes y más contenido útil para redes.',
    includes: ['Todo PLUS', '2 edecanes'],
  },
  {
    id: 'PREMIUM',
    name: 'PREMIUM',
    price: 9499,
    badge: 'Recomendado',
    recommended: true,
    idealFor: 'Inauguraciones grandes, plazas, eventos masivos y campañas BTL.',
    result: 'Experiencia completa, presencia fuerte y autoridad de marca desde el primer minuto.',
    includes: ['Todo PRO', '1 zanquero arlequín (1.5 h)', '1 volanteador'],
  },
];

const extras = [
  { id: 'hora-extra', label: 'Hora extra' },
  { id: 'bocina', label: 'Bocina adicional' },
  { id: 'micro', label: 'Micrófono inalámbrico adicional' },
  { id: 'dj', label: 'DJ durante toda la activación' },
  { id: 'volanteador', label: 'Volanteador adicional' },
  { id: 'edecan', label: 'Edecán adicional' },
  { id: 'zanquero', label: 'Zanquero adicional' },
  { id: 'branding', label: 'Branding del evento' },
];

const zones = [
  { id: 'tijuana', label: 'Tijuana', surcharge: 0, tag: 'Zona base' },
  { id: 'rosarito', label: 'Rosarito', surcharge: 450, tag: '+$450 traslado' },
  { id: 'tecate', label: 'Tecate', surcharge: 650, tag: '+$650 traslado' },
  { id: 'otra', label: 'Otra ciudad', surcharge: 0, tag: 'Cotización especial' },
];

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const formRef = useRef(null);
  const [selectedPackage, setSelectedPackage] = useState('PREMIUM');
  const [selectedZone, setSelectedZone] = useState('tijuana');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [city, setCity] = useState('');
  const [zoneArea, setZoneArea] = useState('');
  const [address, setAddress] = useState('');
  const [guests, setGuests] = useState('');
  const [notes, setNotes] = useState('');

  const pkg = packages.find((p) => p.id === selectedPackage) || packages[3];
  const zone = zones.find((z) => z.id === selectedZone) || zones[0];
  const total = pkg.price + zone.surcharge;

  const waMessage = useMemo(() => {
    const extrasText = selectedExtras.length
      ? selectedExtras.map((id) => extras.find((e) => e.id === id)?.label).filter(Boolean).join(', ')
      : 'Sin extras';
    return [
      'Hola Palacios Sound, quiero cotizar y apartar una activación.',
      '',
      `Paquete: ${pkg.name} — ${currency.format(pkg.price)}`,
      `Zona: ${zone.label}${zone.surcharge ? ` (+${currency.format(zone.surcharge)})` : ''}`,
      `Tipo de evento: ${eventType || 'No especificado'}`,
      `Fecha: ${eventDate || 'No especificada'}`,
      `Hora de inicio: ${eventStart || 'No especificada'}`,
      `Ciudad: ${city || 'No especificada'}`,
      `Colonia/zona: ${zoneArea || 'No especificada'}`,
      `Dirección: ${address || 'No especificada'}`,
      `Afluencia estimada: ${guests || 'No especificada'}`,
      `Extras: ${extrasText}`,
      `Observaciones: ${notes || 'Sin observaciones'}`,
      `Total base estimado: ${currency.format(total)}`,
      '',
      `Nombre: ${fullName || 'No especificado'}`,
      `Negocio: ${businessName || 'No especificado'}`,
      `WhatsApp: ${phone || 'No especificado'}`,
      `Correo: ${email || 'No especificado'}`,
    ].join('\n');
  }, [pkg, zone, eventType, eventDate, eventStart, city, zoneArea, address, guests, selectedExtras, total, fullName, businessName, phone, email, notes]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
  const directWaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Palacios Sound, quiero cotizar una activación.')}`;

  const selectPackage = (id) => {
    setSelectedPackage(id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const toggleExtra = (id) => {
    setSelectedExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white font-sans overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#07090D]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <motion.img
              src="/logo-palacios.jpg"
              alt="Palacios Sound"
              className="h-10 w-10 rounded-full border border-red-500/40 object-cover"
              animate={{
                filter: [
                  'drop-shadow(0 0 6px #F90030)',
                  'drop-shadow(0 0 20px #F90030)',
                  'drop-shadow(0 0 6px #F90030)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="hidden text-sm font-bold tracking-[0.2em] text-white/90 uppercase sm:block">
              Palacios Sound
            </span>
          </div>
          <a
            href={directWaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(249,0,48,0.45)] transition hover:bg-red-500 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            Cotizar por WhatsApp
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-20 text-center">
        {/* animated bg */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[130px]"
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-1/4 top-1/4 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[100px]"
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />
          {/* EQ bars */}
          <div className="absolute bottom-0 left-0 right-0 flex h-28 items-end justify-center gap-1 opacity-15">
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-t bg-gradient-to-t from-red-500 to-cyan-400"
                animate={{
                  height: [
                    `${15 + Math.random() * 65}%`,
                    `${20 + Math.random() * 80}%`,
                    `${15 + Math.random() * 65}%`,
                  ],
                }}
                transition={{
                  duration: 0.7 + Math.random() * 0.9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 0.6,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07090D] to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="/logo-palacios.jpg"
              alt="Palacios Sound logo"
              className="h-44 w-44 rounded-full object-cover md:h-56 md:w-56"
              animate={{
                filter: [
                  'drop-shadow(0 0 10px #F90030)',
                  'drop-shadow(0 0 45px #F90030)',
                  'drop-shadow(0 0 10px #F90030)',
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-1.5 text-xs text-white/65"
          >
            <Sparkles className="h-3.5 w-3.5 text-red-400" />
            Tijuana · Rosarito · Tecate
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl lg:text-8xl"
          >
            QUE TE{' '}
            <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              VEAN.
            </span>
            <br />
            QUE TE{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              ESCUCHEN.
            </span>
            <br />
            QUE{' '}
            <span className="bg-gradient-to-r from-red-500 to-cyan-400 bg-clip-text text-transparent">
              ENTREN.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/55 sm:text-xl"
          >
            Activaciones comerciales de alto impacto. Sonido profesional, animadores y edecanes para que tu negocio no pase desapercibido.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.a
              href="#paquetes"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-black text-[#07090D] shadow-[0_0_30px_rgba(255,255,255,0.2)] transition hover:bg-gray-100"
            >
              Ver paquetes <ChevronRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href={directWaUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5 text-cyan-400" />
              Hablar con un asesor
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/5 bg-[#0E1016] py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { icon: MapPin, value: '3+', label: 'Ciudades cubiertas', color: 'text-red-500' },
            { icon: Zap, value: '50+', label: 'Activaciones realizadas', color: 'text-cyan-400' },
            { icon: TrendingUp, value: '+20%', label: 'Tráfico adicional promedio', color: 'text-red-500' },
            { icon: Music, value: 'DJ + Staff', label: 'Equipo completo', color: 'text-cyan-400' },
          ].map(({ icon: Icon, value, label, color }, i) => (
            <FadeIn key={label} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="rounded-full border border-white/10 bg-white/5 p-4">
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <p className="text-3xl font-black">{value}</p>
                <p className="text-xs uppercase tracking-widest text-white/40">{label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-14 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">Por qué elegirnos</p>
              <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
                El ruido que <span className="text-red-500">convierte</span>
              </h2>
              <p className="mt-4 text-white/50 text-lg leading-relaxed">
                No es solo poner música. Es crear un embudo de ventas en la calle.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: TrendingUp,
                title: 'Más tráfico',
                desc: 'Forzamos a peatones y conductores a voltear a ver tu negocio.',
                color: 'text-red-500',
              },
              {
                icon: Users,
                title: 'Más percepción',
                desc: 'Un negocio con activación se ve exitoso y lleno desde afuera.',
                color: 'text-cyan-400',
              },
              {
                icon: Mic,
                title: 'Más interacción',
                desc: 'Nuestro staff invita directamente a los clientes a entrar.',
                color: 'text-red-500',
              },
              {
                icon: Award,
                title: 'Más ventas',
                desc: 'Convertimos curiosidad en clientes el mismo día del evento.',
                color: 'text-cyan-400',
              },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5, borderColor: 'rgba(249,0,48,0.35)' }}
                  className="rounded-2xl border border-white/8 bg-[#0E1016] p-7 transition-all duration-300"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <Icon className={`h-7 w-7 ${color}`} />
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/50">{desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="paquetes" className="border-y border-white/5 bg-[#0A0C12] py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-14 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/35">Paquetes</p>
              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                Elige tu nivel de <span className="text-red-500">impacto</span>
              </h2>
              <p className="mt-4 text-white/50 text-lg">
                Haz clic en el paquete para bajar al formulario y cerrar por WhatsApp.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-5 lg:grid-cols-4">
            {packages.map((p, i) => {
              const active = p.id === selectedPackage;
              return (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <motion.button
                    onClick={() => selectPackage(p.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={
                      active
                        ? {
                            borderColor: '#F90030',
                            boxShadow: '0 0 32px rgba(249,0,48,0.25)',
                          }
                        : { borderColor: 'rgba(255,255,255,0.08)', boxShadow: 'none' }
                    }
                    className="relative flex flex-col rounded-2xl border-2 bg-[#0E1016] p-6 text-left w-full"
                  >
                    {p.recommended && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-red-600 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-white shadow-[0_0_14px_rgba(249,0,48,0.55)]">
                        ⭐ Recomendado
                      </span>
                    )}

                    <p className={`text-[11px] uppercase tracking-[0.2em] ${active ? 'text-red-400' : 'text-white/35'}`}>
                      {p.badge}
                    </p>
                    <h3 className="mt-1.5 text-2xl font-black">{p.name}</h3>

                    <p className={`mt-4 text-3xl font-black ${active ? 'text-cyan-400' : 'text-white'}`}>
                      {currency.format(p.price)}
                    </p>

                    <ul className="mt-5 flex-1 space-y-2">
                      {p.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${active ? 'text-red-400' : 'text-cyan-400'}`} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 border-t border-white/8 pt-4">
                      <p className="text-xs leading-5 text-white/35">{p.idealFor}</p>
                    </div>

                    <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${active ? 'text-red-400' : 'text-white/55'}`}>
                      {active ? '✓ Seleccionado' : 'Quiero este paquete'}
                      {!active && <ChevronRight className="h-4 w-4" />}
                    </div>
                  </motion.button>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── QUOTE FORM ── */}
      <section ref={formRef} className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute top-1/2 right-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-red-600/8 blur-[120px]" />
        <div className="pointer-events-none absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-cyan-400/6 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-14">
              <p className="text-xs uppercase tracking-[0.25em] text-red-400">Cierra tu activación</p>
              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                Confirma y cierra por <span className="text-red-500">WhatsApp</span>
              </h2>
              <p className="mt-4 text-white/50 text-lg">
                Llena tus datos y aparta la fecha hoy.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Form */}
            <FadeIn>
              <div className="rounded-2xl border border-white/8 bg-[#0E1016] p-7 lg:p-10 space-y-8">
                {/* Package summary */}
                <div className="rounded-xl border border-red-500/20 bg-red-500/8 p-5">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-red-400">Paquete seleccionado</p>
                      <h3 className="mt-1 text-xl font-black">{pkg.name}</h3>
                      <p className="mt-1 text-sm text-white/45">{pkg.result}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-white/35 uppercase tracking-wider">Precio base</p>
                      <p className="text-2xl font-black text-red-400">{currency.format(pkg.price)}</p>
                    </div>
                  </div>
                </div>

                {/* Extras */}
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/45">
                    Extras opcionales (se cotizan por separado)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {extras.map((item) => {
                      const active = selectedExtras.includes(item.id);
                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => toggleExtra(item.id)}
                          whileTap={{ scale: 0.95 }}
                          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                            active
                              ? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-300'
                              : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10'
                          }`}
                        >
                          {active ? '✓ ' : ''}{item.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Zone */}
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/45">
                    Zona de cobertura
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {zones.map((z) => (
                      <button
                        key={z.id}
                        onClick={() => setSelectedZone(z.id)}
                        className={`rounded-xl border p-3 text-left text-sm transition-all ${
                          selectedZone === z.id
                            ? 'border-red-500/50 bg-red-500/10 text-white'
                            : 'border-white/8 bg-black/20 text-white/45 hover:border-white/20'
                        }`}
                      >
                        <p className="font-bold">{z.label}</p>
                        <p className="text-xs opacity-60 mt-0.5">{z.tag}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Nombre completo', value: fullName, setter: setFullName, placeholder: 'Juan Pérez' },
                    { label: 'Nombre del negocio', value: businessName, setter: setBusinessName, placeholder: 'Taquería El Güero' },
                    { label: 'WhatsApp', value: phone, setter: setPhone, placeholder: '664 000 0000' },
                    { label: 'Correo electrónico', value: email, setter: setEmail, placeholder: 'correo@ejemplo.com' },
                    { label: 'Tipo de evento', value: eventType, setter: setEventType, placeholder: 'Inauguración, aniversario…' },
                    { label: 'Ciudad', value: city, setter: setCity, placeholder: 'Tijuana' },
                  ].map(({ label, value, setter, placeholder }) => (
                    <label key={label} className="flex flex-col gap-1.5">
                      <span className="text-xs text-white/40">{label}</span>
                      <input
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        placeholder={placeholder}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-cyan-400/40"
                      />
                    </label>
                  ))}

                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="text-xs text-white/40">Colonia / zona</span>
                    <input
                      value={zoneArea}
                      onChange={(e) => setZoneArea(e.target.value)}
                      placeholder="Zona Centro, La Mesa…"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-cyan-400/40"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="text-xs text-white/40">Dirección exacta</span>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle, número…"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-cyan-400/40"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs text-white/40">Afluencia estimada</span>
                    <input
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      placeholder="100 personas"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-cyan-400/40"
                    />
                  </label>

                  <div className="flex gap-3">
                    <label className="flex flex-1 flex-col gap-1.5">
                      <span className="text-xs text-white/40">Fecha del evento</span>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40 [color-scheme:dark]"
                      />
                    </label>
                    <label className="flex flex-1 flex-col gap-1.5">
                      <span className="text-xs text-white/40">Hora inicio</span>
                      <input
                        type="time"
                        value={eventStart}
                        onChange={(e) => setEventStart(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40 [color-scheme:dark]"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="text-xs text-white/40">Observaciones adicionales</span>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Cualquier detalle del evento que debamos saber…"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-cyan-400/40 resize-none"
                    />
                  </label>
                </div>

                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-4 text-base font-black text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] transition hover:bg-[#20bd5a]"
                >
                  <Phone className="h-5 w-5" />
                  Apartar por WhatsApp
                </motion.a>
              </div>
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={0.1}>
              <div className="space-y-4 lg:sticky lg:top-24">
                <div className="rounded-2xl border border-white/8 bg-[#0E1016] p-6">
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/35">Resumen</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/50">Paquete</span>
                      <span className="font-bold text-cyan-400">{pkg.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Precio base</span>
                      <span className="font-semibold">{currency.format(pkg.price)}</span>
                    </div>
                    {zone.surcharge > 0 && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Traslado ({zone.label})</span>
                        <span className="font-semibold">+{currency.format(zone.surcharge)}</span>
                      </div>
                    )}
                    {selectedExtras.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Extras ({selectedExtras.length})</span>
                        <span className="text-white/50 text-xs">A cotizar</span>
                      </div>
                    )}
                    <div className="border-t border-white/8 pt-3 flex justify-between items-end">
                      <span className="text-xs text-white/40">Total base</span>
                      <span className="text-2xl font-black text-red-400">{currency.format(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#0E1016] p-6">
                  <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/50">
                    <Clock3 className="h-4 w-4 text-cyan-400" /> Condiciones clave
                  </p>
                  <ul className="space-y-2 text-sm text-white/40 leading-6">
                    <li>• Anticipo: 50% para apartar fecha.</li>
                    <li>• Saldo restante al inicio del evento.</li>
                    <li>• Sin devolución dentro de 72 horas.</li>
                    <li>• Zona base: Tijuana (sin cargo extra).</li>
                  </ul>
                </div>

                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-4 text-sm font-black text-white shadow-[0_0_20px_rgba(249,0,48,0.3)] transition hover:bg-red-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enviar cotización
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── COVERAGE + CONDITIONS ── */}
      <section className="border-y border-white/5 bg-[#0A0C12] py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-2xl border border-white/8 bg-[#0E1016] p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 mb-4">Cobertura</p>
              <h2 className="text-3xl font-black mb-6">Zonas de operación</h2>
              <div className="space-y-3 text-white/55 text-sm">
                {[
                  { color: 'text-cyan-400', text: 'Tijuana — zona base, sin costo de traslado.' },
                  { color: 'text-red-400', text: 'Rosarito — traslado de +$450 MXN.' },
                  { color: 'text-red-400', text: 'Tecate — traslado de +$650 MXN.' },
                  { color: 'text-white/25', text: 'Otras ciudades — cotización especial.' },
                ].map(({ color, text }, i) => (
                  <p key={i} className="flex items-center gap-2.5">
                    <MapPin className={`h-4 w-4 shrink-0 ${color}`} />
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/8 bg-[#0E1016] p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 mb-4">Términos</p>
              <h2 className="text-3xl font-black mb-6">Condiciones comerciales</h2>
              <div className="space-y-2">
                {[
                  ['Anticipo', '50% para apartar fecha. Saldo al iniciar el evento.'],
                  ['Horas extra', 'Cargo adicional según extensión y horario.'],
                  ['Cancelaciones', 'Sin devolución dentro de 72 horas previas al evento.'],
                  ['Fuera de zona base', 'Se cotiza por traslado y logística adicional.'],
                ].map(([title, desc]) => (
                  <details key={title} className="group rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white/70">
                      <span>{title}</span>
                      <span className="text-white/30 transition-transform group-open:rotate-45 text-lg leading-none">+</span>
                    </summary>
                    <p className="mt-2.5 text-sm leading-6 text-white/45">{desc}</p>
                  </details>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8 text-center">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-600/15 via-transparent to-cyan-400/10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-red-400 mb-4">¿Listo para más clientes?</p>
            <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Reserva hoy.<br />
              <span className="text-red-400">Llena mañana.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-white/50 text-lg">
              Aparta tu fecha de activación directo por WhatsApp Business. Sin formularios complicados.
            </p>
            <motion.a
              href={directWaUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-base font-black text-[#07090D] shadow-[0_0_40px_rgba(255,255,255,0.2)] transition hover:bg-gray-100"
            >
              Reservar mi activación <ChevronRight className="h-5 w-5" />
            </motion.a>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 text-center text-sm text-white/25">
        <p>© {new Date().getFullYear()} Palacios Sound · Tijuana, B.C. · Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}