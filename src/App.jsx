import React, { useMemo, useState } from 'react'; import { motion } from 'framer-motion'; import { Check, ChevronRight, MapPin, Phone, Mail, CalendarDays, Users, Music4, Sparkles, Award, ShieldCheck, MessageCircle, Clock3, Route, BadgeInfo } from 'lucide-react';

const packages = [ { id: 'START', name: 'START', price: 3720, idealFor: 'Taquerías, barberías, cafeterías, minisúpers, farmacias, negocios de colonia y aperturas pequeñas.', result: 'Más tráfico local, visibilidad inmediata y movimiento en punto de venta.', includes: [ 'Activación fuera del negocio', 'Animador con micrófono', '2 bocinas de 15”', '2 trípodes con globos', 'Fotos del evento', 'Publicación en grupos locales de Facebook', ], }, { id: 'PLUS', name: 'PLUS', price: 4680, idealFor: 'Restaurantes, estéticas, gimnasios, boutiques, clínicas e inauguraciones medianas.', result: 'Más presencia de marca y mejor percepción profesional.', includes: [ 'Todo START', '1 edecán', ], }, { id: 'PRO', name: 'PRO', price: 6240, idealFor: 'Franquicias, campañas comerciales, negocios con alta afluencia y lanzamientos fuertes.', result: 'Más impacto visual, más interacción y más recordación.', includes: [ 'Todo PLUS', '2 edecanes', ], }, { id: 'PREMIUM', name: 'PREMIUM', price: 9480, idealFor: 'Inauguraciones grandes, plazas, eventos masivos y campañas BTL.', result: 'Experiencia completa y mayor autoridad de marca.', includes: [ 'Todo PRO', '1 zanquero arlequín (1.5 h)', '1 volanteador', ], }, ];

const extras = [ { id: 'hora-extra', label: 'Hora extra', price: 0, note: 'Se calcula según el paquete y el tiempo adicional.' }, { id: 'bocina', label: 'Bocina adicional', price: 0, note: 'Cotización personalizada.' }, { id: 'micro', label: 'Micrófono inalámbrico adicional', price: 0, note: 'Cotización personalizada.' }, { id: 'dj', label: 'DJ durante toda la activación', price: 0, note: 'Cotización personalizada.' }, { id: 'volanteador', label: 'Volanteador adicional', price: 0, note: 'Cotización personalizada.' }, { id: 'edecan', label: 'Edecán adicional', price: 0, note: 'Cotización personalizada.' }, { id: 'zanquero', label: 'Zanquero adicional', price: 0, note: 'Cotización personalizada.' }, { id: 'branding', label: 'Branding del evento', price: 0, note: 'Cotización personalizada.' }, ];

const zones = [ { id: 'tijuana', label: 'Tijuana', surcharge: 0, tag: 'Zona base' }, { id: 'rosarito', label: 'Rosarito', surcharge: 450, tag: 'Traslado automático' }, { id: 'tecate', label: 'Tecate', surcharge: 650, tag: 'Traslado automático' }, { id: 'otra', label: 'Otra ciudad', surcharge: 0, tag: 'Cotización especial' }, ];

const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0, });

export default function PalaciosSoundLanding() { const [selectedPackage, setSelectedPackage] = useState('START'); const [selectedZone, setSelectedZone] = useState('tijuana'); const [eventType, setEventType] = useState(''); const [eventDate, setEventDate] = useState(''); const [eventStart, setEventStart] = useState(''); const [fullName, setFullName] = useState(''); const [businessName, setBusinessName] = useState(''); const [phone, setPhone] = useState(''); const [email, setEmail] = useState(''); const [city, setCity] = useState(''); const [zoneArea, setZoneArea] = useState(''); const [address, setAddress] = useState(''); const [guests, setGuests] = useState(''); const [notes, setNotes] = useState(''); const [selectedExtras, setSelectedExtras] = useState([]);

const pkg = packages.find((p) => p.id === selectedPackage) || packages[0]; const zone = zones.find((z) => z.id === selectedZone) || zones[0];

const baseExtrasValue = selectedExtras.length * 250; const subtotal = pkg.price + zone.surcharge + baseExtrasValue; const total = Math.round(subtotal * 1.2);

const waMessage = useMemo(() => { const extrasText = selectedExtras.length ? selectedExtras.map((id) => extras.find((e) => e.id === id)?.label).filter(Boolean).join(', ') : 'Sin extras';

return [
  'Hola Palacios Sound, quiero cotizar una activación.',
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
  `Total estimado: ${currency.format(total)}`,
  '',
  `Nombre: ${fullName || 'No especificado'}`,
  `Negocio: ${businessName || 'No especificado'}`,
  `WhatsApp: ${phone || 'No especificado'}`,
  `Correo: ${email || 'No especificado'}`,
  '',
  'Quedo atento para confirmar disponibilidad y cierre.',
].join('\n');

}, [pkg.name, zone.label, eventType, eventDate, eventStart, city, zoneArea, address, guests, selectedExtras, total, fullName, businessName, phone, email]);

const whatsappUrl = https://wa.me/526641234567?text=${encodeURIComponent(waMessage)};

const toggleExtra = (id) => { setSelectedExtras((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id] ); };

return ( <div className="min-h-screen bg-[#07090d] text-white selection:bg-cyan-400/30 selection:text-white"> <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07090d]/85 backdrop-blur-xl"> <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"> <div className="flex items-center gap-3"> <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10"> <Music4 className="h-5 w-5 text-cyan-300" /> </div> <div> <p className="text-sm font-semibold tracking-[0.28em] text-white/60">PALACIOS SOUND</p> <p className="text-xs text-white/45">Activaciones comerciales premium</p> </div> </div>

<a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20"
      >
        <MessageCircle className="h-4 w-4" />
        Cotizar por WhatsApp
      </a>
    </div>
  </header>

  <main>
    {/* HERO */}
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(236,72,153,0.10),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Cobertura en Tijuana, Rosarito y Tecate
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Haz que tu negocio destaque desde el primer minuto.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            Activaciones comerciales, audio profesional y personal promocional para atraer más clientes y generar una experiencia que se recuerda.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#paquetes"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#07090d] transition hover:bg-white/90"
            >
              Ver paquetes <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Cotizar mi activación <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Award, title: 'Imagen premium', desc: 'Estética limpia y profesional.' },
              { icon: ShieldCheck, title: 'Proceso claro', desc: 'Paquete, costo y cierre directo.' },
              { icon: Route, title: 'Cobertura real', desc: 'Tijuana, Rosarito y Tecate.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <Icon className="h-5 w-5 text-cyan-300" />
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
          className="relative z-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">Cálculo rápido</p>
              <h2 className="mt-2 text-2xl font-semibold">Cotizador automático</h2>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-right">
              <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-100/70">Total estimado</p>
              <p className="text-xl font-semibold text-cyan-100">{currency.format(total)}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <span className="text-white/60">Paquete</span>
              <span className="font-semibold">{pkg.name}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <span className="text-white/60">Zona</span>
              <span className="font-semibold">{zone.label}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <span className="text-white/60">Base</span>
              <span className="font-semibold">{currency.format(pkg.price)}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <span className="text-white/60">Traslado / extras</span>
              <span className="font-semibold">{currency.format(zone.surcharge + baseExtrasValue)}</span>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1018] p-5">
            <p className="flex items-center gap-2 text-sm font-medium text-white/70"><Clock3 className="h-4 w-4 text-cyan-300" /> Reglas clave</p>
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

    {/* PACKAGES */}
    <section id="paquetes" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-white/45">Paquetes</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Elige el paquete ideal para tu negocio</h2>
        <p className="mt-4 text-white/65">
          Desde activaciones locales hasta campañas de alto impacto, cada nivel está diseñado para una necesidad distinta.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-4">
        {packages.map((p) => {
          const active = p.id === selectedPackage;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPackage(p.id)}
              className={`group rounded-[2rem] border p-6 text-left transition ${
                active
                  ? 'border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/7'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">Paquete</p>
                  <h3 className="mt-2 text-2xl font-semibold">{p.name}</h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-right">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Final</p>
                  <p className="text-lg font-semibold">{currency.format(p.price)}</p>
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
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                        <span>{item}</span>
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

    {/* BENEFITS */}
    <section className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">Beneficios</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">¿Qué obtienes con tu activación?</h2>
          <p className="mt-4 max-w-xl text-white/65">
            No compras solo sonido. Compras visibilidad, presencia, interacción y contenido que ayuda a mover negocio.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            'Más visibilidad local',
            'Más tráfico al negocio',
            'Más presencia de marca',
            'Más interacción con clientes',
            'Material para redes sociales',
          ].map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm font-medium text-white/80">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* COTIZADOR */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">Cotizador</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Calcula tu inversión en segundos</h2>
          <p className="mt-4 text-white/65">
            Selecciona tu paquete, agrega extras y obtiene el total estimado al instante.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-white/60">Paquete</span>
              <select value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 text-white outline-none ring-0 focus:border-cyan-300/50">
                {packages.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/60">Zona</span>
              <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 text-white outline-none ring-0 focus:border-cyan-300/50">
                {zones.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {extras.map((item) => {
              const active = selectedExtras.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleExtra(item.id)}
                  className={`rounded-2xl border p-4 text-left transition ${active ? 'border-cyan-300/40 bg-cyan-300/10' : 'border-white/10 bg-white/5 hover:bg-white/7'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{item.label}</p>
                    <div className={`h-5 w-5 rounded-full border ${active ? 'border-cyan-300 bg-cyan-300' : 'border-white/20'}`} />
                  </div>
                  <p className="mt-2 text-sm text-white/55">{item.note}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm text-white/60">Nombre completo</span>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm text-white/60">Nombre del negocio</span>
              <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/60">WhatsApp</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/60">Correo</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/60">Tipo de evento</span>
              <input value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/60">Fecha</span>
              <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/60">Hora de inicio</span>
              <input type="time" value={eventStart} onChange={(e) => setEventStart(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/60">Ciudad</span>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm text-white/60">Colonia / zona</span>
              <input value={zoneArea} onChange={(e) => setZoneArea(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm text-white/60">Dirección exacta</span>
              <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/60">Afluencia estimada</span>
              <input value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/60">Servicios extra</span>
              <input value={selectedExtras.map((id) => extras.find((e) => e.id === id)?.label).filter(Boolean).join(', ')} readOnly className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 text-white/70 outline-none" />
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm text-white/60">Observaciones</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="w-full rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 outline-none focus:border-cyan-300/50" />
            </label>
          </div>

          <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-cyan-100/70">Total estimado</p>
                <p className="text-3xl font-semibold text-cyan-100">{currency.format(total)}</p>
              </div>
              <div className="text-right text-sm text-cyan-100/70">
                <p>Incluye el ajuste final del 20%</p>
                <p>Cierre directo por WhatsApp Business</p>
              </div>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-[#07090d] transition hover:bg-white/90"
          >
            Reservar por WhatsApp <Phone className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>

    {/* COVERAGE + RULES */}
    <section className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-18 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">Cobertura</p>
          <h2 className="mt-3 text-3xl font-semibold">Cobertura real en la zona</h2>
          <div className="mt-6 space-y-3 text-white/70">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" /> Tijuana — zona base.</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" /> Rosarito — traslado automático.</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" /> Tecate — traslado automático.</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" /> Otras ciudades — cotización especial.</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">Reglas</p>
          <h2 className="mt-3 text-3xl font-semibold">Condiciones comerciales</h2>
          <ul className="mt-6 space-y-3 text-white/68">
            <li className="flex gap-2"><BadgeInfo className="mt-0.5 h-4 w-4 text-cyan-300" /> Anticipo mínimo de 50%.</li>
            <li className="flex gap-2"><BadgeInfo className="mt-0.5 h-4 w-4 text-cyan-300" /> Saldo 24 horas antes del evento.</li>
            <li className="flex gap-2"><BadgeInfo className="mt-0.5 h-4 w-4 text-cyan-300" /> Horas extra con cargo adicional.</li>
            <li className="flex gap-2"><BadgeInfo className="mt-0.5 h-4 w-4 text-cyan-300" /> Cancelación sin devolución dentro de 72 horas.</li>
            <li className="flex gap-2"><BadgeInfo className="mt-0.5 h-4 w-4 text-cyan-300" /> No incluye permisos, energía, planta, hospedaje ni servicios no pactados.</li>
          </ul>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 text-center sm:p-12">
        <p className="text-sm uppercase tracking-[0.25em] text-white/45">Cierre</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Tu evento empieza con una primera impresión sólida.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/65">
          Asegura tu fecha y cierra por WhatsApp Business. Sin vueltas, sin saturación y con una experiencia que se ve profesional desde el primer segundo.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-[#07090d] transition hover:bg-white/90"
        >
          Reservar por WhatsApp <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  </main>
</div>

); }
