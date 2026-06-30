import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  BadgeInfo,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Star,
} from 'lucide-react';

const WHATSAPP_NUMBER = '529613272867';

const packages = [
  {
    id: 'START',
    name: 'START',
    price: 3720,
    badge: 'Ideal para iniciar',
    idealFor: 'Negocios de colonia, aperturas pequeñas y promociones que necesitan flujo inmediato.',
    result: 'Más tráfico local, más atención frente al negocio y más movimiento en punto de venta.',
    includes: [
      'Activación fuera del negocio',
      'Animador con micrófono',
      '2 bocinas de 15”',
      '2 trípodes con globos',
      'Fotos del evento',
      'Publicación en grupos locales de Facebook',
    ],
  },
  {
    id: 'PLUS',
    name: 'PLUS',
    price: 4680,
    badge: 'Más presencia',
    idealFor: 'Restaurantes, estéticas, gimnasios, boutiques, clínicas e inauguraciones medianas.',
    result: 'Más percepción de marca, más profesionalismo y mejor recordación.',
    includes: ['Todo START', '1 edecán'],
  },
  {
    id: 'PRO',
    name: 'PRO',
    price: 6240,
    badge: 'Mayor impacto',
    idealFor: 'Franquicias, campañas comerciales y negocios con alta afluencia.',
    result: 'Más impacto visual, más interacción con clientes y más contenido útil para redes.',
    includes: ['Todo PLUS', '2 edecanes'],
  },
  {
    id: 'PREMIUM',
    name: 'PREMIUM',
    price: 9480,
    badge: 'Recomendado',
    idealFor: 'Inauguraciones grandes, plazas, eventos masivos y campañas BTL.',
    result: 'Experiencia completa, presencia fuerte y autoridad de marca desde el primer minuto.',
    includes: ['Todo PRO', '1 zanquero arlequín (1.5 h)', '1 volanteador'],
  },
];

const extras = [
  { id: 'hora-extra', label: 'Hora extra', note: 'Se calcula según el paquete y el tiempo adicional.' },
  { id: 'bocina', label: 'Bocina adicional', note: 'Cotización personalizada.' },
  { id: 'micro', label: 'Micrófono inalámbrico adicional', note: 'Cotización personalizada.' },
  { id: 'dj', label: 'DJ durante toda la activación', note: 'Cotización personalizada.' },
  { id: 'volanteador', label: 'Volanteador adicional', note: 'Cotización personalizada.' },
  { id: 'edecan', label: 'Edecán adicional', note: 'Cotización personalizada.' },
  { id: 'zanquero', label: 'Zanquero adicional', note: 'Cotización personalizada.' },
  { id: 'branding', label: 'Branding del evento', note: 'Cotización personalizada.' },
];

const zones = [
  { id: 'tijuana', label: 'Tijuana', surcharge: 0, tag: 'Zona base' },
  { id: 'rosarito', label: 'Rosarito', surcharge: 450, tag: 'Traslado automático' },
  { id: 'tecate', label: 'Tecate', surcharge: 650, tag: 'Traslado automático' },
  { id: 'otra', label: 'Otra ciudad', surcharge: 0, tag: 'Cotización especial' },
];

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

export default function PalaciosSoundLanding() {
  const checkoutRef = useRef(null);
  const [selectedPackage, setSelectedPackage] = useState('PREMIUM');
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
  const [showCheckout, setShowCheckout] = useState(false);

  const pkg = packages.find((p) => p.id === selectedPackage) || packages[0];
  const zone = zones.find((z) => z.id === selectedZone) || zones[0];

  const baseExtrasValue = selectedExtras.length * 250;
  const subtotal = pkg.price + zone.surcharge + baseExtrasValue;
  const total = Math.round(subtotal * 1.2);

  const waMessage = useMemo(() => {
    const extrasText = selectedExtras.length
      ? selectedExtras
          .map((id) => extras.find((e) => e.id === id)?.label)
          .filter(Boolean)
          .join(', ')
      : 'Sin extras';

    return [
      'Hola Palacios Sound, quiero cotizar y apartar una activación.',
      '',
      `Paquete: ${pkg.name}`,
      `Zona: ${zone.label}`,
      `Tipo de evento: ${eventType || 'No especificado'}`,
      `Fecha: ${eventDate || 'No especificada'}`,
      `Hora de inicio: ${eventStart || 'No especificada'}`,
      `Ciudad: ${city || 'No especificada'}`,
      `Zona/colonia: ${zoneArea || 'No especificada'}`,
      `Dirección: ${address || 'No especificada'}`,
      `Afluencia estimada: ${guests || 'No especificada'}`,
      `Extras: ${extrasText}`,
      `Observaciones: ${notes || 'Sin observaciones'}`,
      `Total estimado: ${currency.format(total)}`,
      '',
      `Nombre: ${fullName || 'No especificado'}`,
      `Negocio: ${businessName || 'No especificado'}`,
      `WhatsApp: ${phone || 'No especificado'}`,
      `Correo: ${email || 'No especificado'}`,
      '',
      'Quedo atento para confirmar disponibilidad y cierre.',
    ].join('\n');
  }, [
    pkg.name,
    zone.label,
    eventType,
    eventDate,
    eventStart,
    city,
    zoneArea,
    address,
    guests,
    selectedExtras,
    total,
    fullName,
    businessName,
    phone,
    email,
    notes,
  ]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  const selectPackage = (id) => {
    setSelectedPackage(id);
    setShowCheckout(true);
    window.requestAnimationFrame(() => {
      checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const toggleExtra = (id) => {
    setSelectedExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-red/30 selection:text-white font-sans">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-dark/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full ring-2 ring-brand-red/50 bg-black">
              <img
                src="/logo-palacios.jpg"
                alt="Logo oficial de Palacios Sound"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.28em] text-white/90 uppercase">Palacios Sound</p>
              <p className="text-xs text-brand-cyan">Activaciones comerciales premium</p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-2 text-sm font-medium text-brand-red transition hover:bg-brand-red hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Cotizar por WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,0,48,0.14),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(0,212,255,0.10),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-2 text-sm text-white/80">
                <Sparkles className="h-4 w-4 text-brand-red" />
                Cobertura en Tijuana, Rosarito y Tecate
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Activaciones comerciales que hacen que tu negocio se vea lleno.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                No vendemos solo audio. Diseñamos presencia, atención y movimiento para que más personas volteen, entren y compren.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#paquetes"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-white/90"
                >
                  Ver paquetes <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Cotizar mi activación <MessageCircle className="h-4 w-4 text-brand-cyan" />
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Award, title: 'Imagen premium', desc: 'Estética limpia y profesional.' },
                  { icon: ShieldCheck, title: 'Proceso claro', desc: 'Paquete, costo y cierre directo.' },
                  { icon: Route, title: 'Cobertura real', desc: 'Tijuana, Rosarito y Tecate.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-3xl border border-white/10 bg-brand-surface p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                  >
                    <Icon className="h-5 w-5 text-brand-cyan" />
                    <h3 className="mt-3 font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/60">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative z-10 rounded-[2rem] border border-white/10 bg-brand-surface p-6 shadow-2xl shadow-black/50 backdrop-blur"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-white/45">Cálculo rápido</p>
                  <h2 className="mt-2 text-2xl font-semibold">Cotizador automático</h2>
                </div>
                <div className="rounded-2xl border border-brand-red/20 bg-brand-red/10 px-3 py-2 text-right">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-brand-red">Total estimado</p>
                  <p className="text-xl font-semibold text-white">{currency.format(total)}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/40 px-4 py-3">
                  <span className="text-white/60">Paquete</span>
                  <span className="font-semibold text-brand-cyan">{pkg.name}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/40 px-4 py-3">
                  <span className="text-white/60">Zona</span>
                  <span className="font-semibold">{zone.label}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/40 px-4 py-3">
                  <span className="text-white/60">Base</span>
                  <span className="font-semibold">{currency.format(pkg.price)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/40 px-4 py-3">
                  <span className="text-white/60">Traslado / extras</span>
                  <span className="font-semibold">{currency.format(zone.surcharge + baseExtrasValue)}</span>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/5 bg-black/60 p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <Clock3 className="h-4 w-4 text-brand-cyan" /> Reglas clave
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-white/60">
                  <li>• Zona base: Tijuana.</li>
                  <li>• Rosarito y Tecate incluyen traslado automático.</li>
                  <li>• Anticipo mínimo: 50%.</li>
                  <li>• Cancelación sin devolución dentro de 72 horas.</li>
                </ul>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-brand-cyan">Beneficios</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Resultados que sí le importan al negocio</h2>
            <p className="mt-4 text-white/65">
              Más atención, más tráfico, mejor percepción y un cierre claro que se siente premium desde el primer contacto.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: TrendingUp, title: 'Más tráfico', desc: 'Más gente volteando y entrando.' },
              { icon: Users, title: 'Más presencia', desc: 'Tu negocio se nota desde la calle.' },
              { icon: Star, title: 'Más percepción', desc: 'Tu marca se ve más seria y fuerte.' },
              { icon: Award, title: 'Más ventas', desc: 'Más atención termina en más conversiones.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-[1.75rem] border border-white/10 bg-brand-surface p-6">
                <Icon className="h-5 w-5 text-brand-red" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="paquetes" className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">Paquetes</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Elige un paquete y continúa al cierre</h2>
              <p className="mt-4 text-white/65">
                Selecciona el paquete que mejor encaje con tu negocio. Si lo quieres apartar, pasas directo al cierre por WhatsApp.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {packages.map((p) => {
                const active = p.id === selectedPackage;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      selectPackage(p.id);
                    }}
                    className={`group rounded-[2rem] border p-6 text-left transition ${
                      active
                        ? 'border-brand-red/50 bg-brand-red/10 shadow-[0_0_20px_rgba(249,0,48,0.15)] scale-[1.02]'
                        : 'border-white/10 bg-brand-surface hover:bg-white/[0.07] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={`text-xs uppercase tracking-[0.22em] ${active ? 'text-brand-red' : 'text-white/45'}`}>{p.badge}</p>
                        <h3 className="mt-2 text-2xl font-semibold">{p.name}</h3>
                      </div>
                      <div className="rounded-2xl border border-white/5 bg-black/40 px-3 py-2 text-right">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Final</p>
                        <p className={`text-lg font-bold ${active ? 'text-brand-cyan' : 'text-white'}`}>{currency.format(p.price)}</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/45">Ideal para</p>
                        <p className="mt-1 text-sm leading-6 text-white/70">{p.idealFor}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/45">Resultado</p>
                        <p className="mt-1 text-sm leading-6 text-white/70">{p.result}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/45">Incluye</p>
                        <ul className="mt-3 space-y-2">
                          {p.includes.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-6 text-white/68">
                              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${active ? 'text-brand-red' : 'text-brand-cyan'}`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      Quiero este paquete <ChevronRight className="h-4 w-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={checkoutRef} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-brand-red">Cierre</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Confirma tu paquete y envía tus datos</h2>
              <p className="mt-4 text-white/65">
                Cuando ya elegiste el paquete, aquí llenas tus datos para cerrar por WhatsApp Business y apartar tu fecha.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {extras.map((item) => {
                  const active = selectedExtras.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleExtra(item.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        active
                          ? 'border-brand-cyan/40 bg-brand-cyan/10'
                          : 'border-white/10 bg-brand-surface hover:bg-white/[0.07]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium">{item.label}</p>
                        <div className={`h-5 w-5 rounded-full border ${active ? 'border-brand-cyan bg-brand-cyan' : 'border-white/20'}`} />
                      </div>
                      <p className="mt-2 text-sm text-white/55">{item.note}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-brand-surface p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">Cobertura</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {zones.map((z) => (
                    <button
                      key={z.id}
                      onClick={() => setSelectedZone(z.id)}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        selectedZone === z.id
                          ? 'border-brand-red/40 bg-brand-red/10'
                          : 'border-white/10 bg-black/30 hover:bg-white/[0.05]'
                      }`}
                    >
                      <p className="font-semibold">{z.label}</p>
                      <p className="mt-1 text-sm text-white/55">{z.tag}</p>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm text-white/50">
                  Tijuana es zona base. Rosarito y Tecate llevan traslado automático. Otras ciudades se cotizan de forma especial.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl">
              {!showCheckout ? (
                <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-black/30 p-8 text-center">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/45">Paso final</p>
                  <h3 className="mt-3 text-2xl font-semibold">Selecciona un paquete para continuar</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Cuando elijas un paquete, aquí se abre el formulario para apartar y cerrar por WhatsApp.
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-white/45">Resumen</p>
                        <h3 className="mt-2 text-2xl font-semibold">{pkg.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/60">{pkg.result}</p>
                      </div>
                      <div className="rounded-2xl border border-brand-red/20 bg-brand-red/10 px-3 py-2 text-right">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-brand-red">Total estimado</p>
                        <p className="text-xl font-semibold text-white">{currency.format(total)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm text-white/60">Nombre completo</span>
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm text-white/60">Nombre del negocio</span>
                      <input
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm text-white/60">WhatsApp</span>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm text-white/60">Correo</span>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm text-white/60">Tipo de evento</span>
                      <input
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm text-white/60">Fecha</span>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm text-white/60">Hora de inicio</span>
                      <input
                        type="time"
                        value={eventStart}
                        onChange={(e) => setEventStart(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm text-white/60">Ciudad</span>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm text-white/60">Colonia / zona</span>
                      <input
                        value={zoneArea}
                        onChange={(e) => setZoneArea(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm text-white/60">Dirección exacta</span>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm text-white/60">Afluencia estimada</span>
                      <input
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm text-white/60">Servicios extra</span>
                      <input
                        value={selectedExtras.map((id) => extras.find((e) => e.id === id)?.label).filter(Boolean).join(', ')}
                        readOnly
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 text-white/70 outline-none"
                      />
                    </label>
                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm text-white/60">Observaciones</span>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-brand-cyan/50 transition-colors"
                      />
                    </label>
                  </div>

                  <div className="mt-6 rounded-3xl border border-brand-red/20 bg-brand-red/10 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-brand-red/80 font-medium">Total estimado</p>
                        <p className="text-3xl font-bold text-white">{currency.format(total)}</p>
                      </div>
                      <div className="text-right text-sm text-white/60">
                        <p>Incluye el ajuste final del 20%</p>
                        <p>Cierre directo por WhatsApp</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red px-6 py-4 font-bold text-white transition hover:bg-brand-red/80 shadow-lg shadow-brand-red/20"
                  >
                    Apartar por WhatsApp <Phone className="h-4 w-4" />
                  </a>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-brand-surface">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-black/40 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-brand-cyan">Cobertura</p>
              <h2 className="mt-3 text-3xl font-semibold">Cobertura real en la zona</h2>
              <div className="mt-6 space-y-3 text-white/70">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-cyan" /> Tijuana — zona base.
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-red" /> Rosarito — traslado automático.
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-red" /> Tecate — traslado automático.
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white/40" /> Otras ciudades — cotización especial.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/40 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-brand-cyan">Reglas</p>
              <h2 className="mt-3 text-3xl font-semibold">Condiciones comerciales</h2>
              <div className="mt-6 space-y-3">
                {[
                  ['Anticipo', '50% para apartar fecha.'],
                  ['Horas extra', 'Cargo adicional según extensión y horario.'],
                  ['Cancelaciones', 'Sin devolución dentro de 72 horas.'],
                  ['Cobertura', 'Fuera de zona base se cotiza por traslado y logística.'],
                ].map(([title, desc]) => (
                  <details key={title} className="group rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white/85">
                      <span>{title}</span>
                      <span className="text-white/45 transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-white/60">{desc}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[2.25rem] border border-brand-red/20 bg-[linear-gradient(135deg,rgba(249,0,48,0.1),rgba(0,212,255,0.05))] p-8 text-center sm:p-12 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-brand-red font-semibold">Cierre</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">¿Listo para atraer más clientes?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Reserva hoy tu fecha y cierra directo por WhatsApp Business.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-brand-dark transition hover:bg-gray-200 hover:scale-105"
            >
              Reservar por WhatsApp <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
