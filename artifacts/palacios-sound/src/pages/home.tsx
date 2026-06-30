import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Volume2,
  Users,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Music,
  Mic,
  Activity,
  Zap,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "526645900771";

const PACKAGES = [
  {
    id: "START",
    name: "START",
    price: 3799,
    tagline: "Ideal para iniciar",
    includes: [
      "Activación fuera del negocio",
      "Animador con micrófono",
      "2 bocinas de 15\"",
      "2 trípodes con globos",
      "Fotos del evento",
      "Publicación en grupos locales de Facebook"
    ],
    bestFor: "Negocios de colonia, aperturas pequeñas, promociones que necesitan flujo inmediato."
  },
  {
    id: "PLUS",
    name: "PLUS",
    price: 4799,
    tagline: "Más presencia",
    includes: [
      "Todo lo de START",
      "1 edecán"
    ],
    bestFor: "Restaurantes, estéticas, gimnasios, boutiques, clínicas e inauguraciones medianas."
  },
  {
    id: "PRO",
    name: "PRO",
    price: 6299,
    tagline: "Mayor impacto",
    includes: [
      "Todo lo de PLUS",
      "2 edecanes"
    ],
    bestFor: "Franquicias, campañas comerciales y negocios con alta afluencia."
  },
  {
    id: "PREMIUM",
    name: "PREMIUM",
    price: 9499,
    tagline: "Todo el poder comercial",
    recommended: true,
    includes: [
      "Todo lo de PRO",
      "1 zanquero arlequín (1.5 h)",
      "1 volanteador"
    ],
    bestFor: "Inauguraciones grandes, plazas, eventos masivos, campañas BTL."
  }
];

const EXTRAS = [
  { id: "hora-extra", label: "Hora extra" },
  { id: "bocina", label: "Bocina adicional" },
  { id: "microfono", label: "Micrófono inalámbrico adicional" },
  { id: "dj", label: "DJ durante toda la activación" },
  { id: "volanteador", label: "Volanteador adicional" },
  { id: "edecan", label: "Edecán adicional" },
  { id: "zanquero", label: "Zanquero adicional" },
  { id: "branding", label: "Branding del evento" }
];

const ZONES = [
  { id: "tijuana", name: "Tijuana", surcharge: 0, tag: "Zona base" },
  { id: "rosarito", name: "Rosarito", surcharge: 450, tag: "Traslado" },
  { id: "tecate", name: "Tecate", surcharge: 650, tag: "Traslado" },
  { id: "otra", name: "Otra ciudad", surcharge: 0, tag: "Cotización especial" }
];

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string>("PRO");
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  const [selectedZone, setSelectedZone] = useState<string>("tijuana");
  
  const [formData, setFormData] = useState({
    nombre: "",
    negocio: "",
    whatsapp: "",
    correo: "",
    tipoEvento: "",
    fecha: "",
    hora: "",
    ciudad: "",
    colonia: "",
    direccion: "",
    afluencia: "",
    observaciones: ""
  });

  const formRef = useRef<HTMLDivElement>(null);

  const toggleExtra = (id: string) => {
    const newExtras = new Set(selectedExtras);
    if (newExtras.has(id)) {
      newExtras.delete(id);
    } else {
      newExtras.add(id);
    }
    setSelectedExtras(newExtras);
  };

  const handleSelectPackage = (id: string) => {
    setSelectedPackage(id);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentPackage = PACKAGES.find(p => p.id === selectedPackage) || PACKAGES[2];
  const currentZone = ZONES.find(z => z.id === selectedZone) || ZONES[0];
  
  // Calculate total: (package price + zone surcharge + extras_count × 250) × 1.2
  const baseTotal = currentPackage.price + currentZone.surcharge + (selectedExtras.size * 250);
  const estimatedTotal = Math.round(baseTotal * 1.2);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(price);
  };

  const buildWhatsAppMessage = () => {
    const extrasList = Array.from(selectedExtras).map(id => EXTRAS.find(e => e.id === id)?.label).join(", ") || "Ninguno";
    
    return `Hola, quiero cotizar una activación con Palacios Sound.

*Paquete:* ${currentPackage.name}
*Zona:* ${currentZone.name}
*Extras:* ${extrasList}
*Total Estimado:* ${formatPrice(estimatedTotal)}

*Detalles del Cliente:*
Nombre: ${formData.nombre || "No especificado"}
Negocio: ${formData.negocio || "No especificado"}
WhatsApp: ${formData.whatsapp || "No especificado"}
Correo: ${formData.correo || "No especificado"}

*Detalles del Evento:*
Tipo de evento: ${formData.tipoEvento || "No especificado"}
Fecha: ${formData.fecha || "No especificado"}
Hora: ${formData.hora || "No especificado"}
Colonia: ${formData.colonia || "No especificado"}
Dirección: ${formData.direccion || "No especificado"}
Afluencia estimada: ${formData.afluencia || "No especificado"}
Observaciones: ${formData.observaciones || "Ninguna"}

Quedo atento para confirmar disponibilidad y cierre.`;
  };

  const handleWhatsAppSubmit = () => {
    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const openDirectWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero cotizar una activación")}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white selection:bg-primary selection:text-white">
      {/* STICKY HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#07090D]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-palacios.jpg" alt="Palacios Sound" className="w-12 h-12 rounded-full border border-primary/20" />
            <span className="font-bold text-lg tracking-wider hidden sm:block">PALACIOS SOUND</span>
          </div>
          <Button 
            onClick={openDirectWhatsApp}
            className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_0_15px_rgba(249,0,48,0.4)]"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Cotizar por WhatsApp
          </Button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex flex-col justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#07090D] to-transparent z-10" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 inline-block"
          >
            <motion.img 
              src="/logo-palacios.jpg" 
              alt="Palacios Sound Logo" 
              className="w-40 h-40 md:w-56 md:h-56 rounded-full mx-auto"
              animate={{ 
                filter: ['drop-shadow(0 0 10px #F90030)', 'drop-shadow(0 0 35px #F90030)', 'drop-shadow(0 0 10px #F90030)'] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            QUE TE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">VEAN</span>.<br/>
            QUE TE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ESCUCHEN</span>.<br/>
            QUE <span className="text-primary">ENTREN</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Activaciones comerciales de alto impacto en Tijuana. 
            Sonido profesional, animación y edecanes para que tu negocio no pase desapercibido.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(249,0,48,0.5)]"
              onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Paquetes
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 text-lg h-14 px-8 rounded-full"
              onClick={openDirectWhatsApp}
            >
              <Mic className="w-5 h-5 mr-2" />
              Hablar con un asesor
            </Button>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-[#111111] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: MapPin, label: "Ciudades cubiertas", value: "3+" },
              { icon: Zap, label: "Activaciones", value: "50+" },
              { icon: Users, label: "Tráfico adicional", value: "+20%" },
              { icon: Music, label: "Equipo", value: "DJ + Staff" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">El Poder del Ruido <span className="text-primary">Estratégico</span></h2>
            <p className="text-gray-400 text-lg">No es solo poner música. Es crear un embudo de ventas en la calle.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Más tráfico", desc: "Forzamos a los peatones y conductores a voltear a ver tu negocio." },
              { title: "Percepción de marca", desc: "Un negocio con evento se percibe como exitoso y popular." },
              { title: "Interacción", desc: "Nuestro staff invita directamente a los clientes a entrar." },
              { title: "Ventas directas", desc: "Convertimos curiosidad en tickets de compra el mismo día." }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111111] p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors"
              >
                <Activity className="w-10 h-10 text-secondary mb-6" />
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section id="packages" className="py-24 bg-[#0A0D14]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Elige tu Nivel de <span className="text-primary">Impacto</span></h2>
            <p className="text-gray-400 text-lg">Precios transparentes. Resultados visibles.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                animate={selectedPackage === pkg.id ? { 
                  borderColor: '#F90030', 
                  boxShadow: '0 0 30px rgba(249,0,48,0.3)' 
                } : { 
                  borderColor: 'rgba(255,255,255,0.05)',
                  boxShadow: 'none'
                }}
                className={`relative bg-[#111111] rounded-2xl p-6 border-2 cursor-pointer flex flex-col`}
                onClick={() => handleSelectPackage(pkg.id)}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1">
                    ⭐ RECOMENDADO
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                  <p className="text-sm text-secondary">{pkg.tagline}</p>
                </div>
                
                <div className="mb-6">
                  <div className="text-4xl font-black">${pkg.price.toLocaleString('es-MX')}</div>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((item, j) => (
                      <li key={j} className="flex items-start text-sm text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-500 italic">Ideal para: {pkg.bestFor}</p>
                  
                  <Button 
                    className={`w-full mt-4 ${selectedPackage === pkg.id ? 'bg-primary hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {selectedPackage === pkg.id ? 'Seleccionado' : 'Seleccionar'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKOUT / QUOTE FORM SECTION */}
      <section ref={formRef} className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-5">
              
              {/* Form Side */}
              <div className="md:col-span-3 p-8 lg:p-12">
                <h2 className="text-3xl font-bold mb-8">Detalles del Evento</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Nombre completo</label>
                      <Input 
                        value={formData.nombre} 
                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                        className="bg-white/5 border-white/10 focus:border-primary"
                        placeholder="Ej. Juan Pérez"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Nombre del negocio</label>
                      <Input 
                        value={formData.negocio} 
                        onChange={e => setFormData({...formData, negocio: e.target.value})}
                        className="bg-white/5 border-white/10 focus:border-primary"
                        placeholder="Ej. Taquería El Paisa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">WhatsApp</label>
                      <Input 
                        value={formData.whatsapp} 
                        onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                        className="bg-white/5 border-white/10 focus:border-primary"
                        placeholder="664..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Correo</label>
                      <Input 
                        value={formData.correo} 
                        onChange={e => setFormData({...formData, correo: e.target.value})}
                        className="bg-white/5 border-white/10 focus:border-primary"
                        placeholder="tu@correo.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Tipo de evento</label>
                      <Input 
                        value={formData.tipoEvento} 
                        onChange={e => setFormData({...formData, tipoEvento: e.target.value})}
                        className="bg-white/5 border-white/10 focus:border-primary"
                        placeholder="Inauguración, Aniversario..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Afluencia estimada</label>
                      <Input 
                        value={formData.afluencia} 
                        onChange={e => setFormData({...formData, afluencia: e.target.value})}
                        className="bg-white/5 border-white/10 focus:border-primary"
                        placeholder="Personas esperadas..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Fecha</label>
                      <Input 
                        type="date"
                        value={formData.fecha} 
                        onChange={e => setFormData({...formData, fecha: e.target.value})}
                        className="bg-white/5 border-white/10 focus:border-primary [color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Hora de inicio</label>
                      <Input 
                        type="time"
                        value={formData.hora} 
                        onChange={e => setFormData({...formData, hora: e.target.value})}
                        className="bg-white/5 border-white/10 focus:border-primary [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Ciudad</label>
                      <Input 
                        value={formData.ciudad} 
                        onChange={e => setFormData({...formData, ciudad: e.target.value})}
                        className="bg-white/5 border-white/10 focus:border-primary"
                        placeholder="Tijuana, Rosarito..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Colonia</label>
                      <Input 
                        value={formData.colonia} 
                        onChange={e => setFormData({...formData, colonia: e.target.value})}
                        className="bg-white/5 border-white/10 focus:border-primary"
                        placeholder="Zona Centro..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Extras (Opcional)</label>
                    <div className="flex flex-wrap gap-2">
                      {EXTRAS.map(extra => (
                        <button
                          key={extra.id}
                          onClick={() => toggleExtra(extra.id)}
                          className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                            selectedExtras.has(extra.id) 
                              ? 'bg-primary text-white' 
                              : 'bg-white/5 text-gray-400 hover:bg-white/10'
                          }`}
                        >
                          {extra.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Zona de cobertura</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {ZONES.map(zone => (
                        <button
                          key={zone.id}
                          onClick={() => setSelectedZone(zone.id)}
                          className={`p-3 rounded-lg border text-sm text-left transition-all ${
                            selectedZone === zone.id
                              ? 'border-secondary bg-secondary/10 text-white'
                              : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                          }`}
                        >
                          <div className="font-bold">{zone.name}</div>
                          <div className="text-xs opacity-70 mt-1">{zone.tag}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Dirección exacta / Observaciones</label>
                    <Textarea 
                      value={formData.observaciones} 
                      onChange={e => setFormData({...formData, observaciones: e.target.value})}
                      className="bg-white/5 border-white/10 focus:border-primary min-h-[100px]"
                      placeholder="Agrega cualquier detalle extra sobre la ubicación o el evento..."
                    />
                  </div>
                </div>
              </div>

              {/* Summary Side */}
              <div className="md:col-span-2 bg-[#0A0D14] p-8 lg:p-12 flex flex-col">
                <h3 className="text-xl font-bold mb-6">Resumen de Cotización</h3>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div>
                      <div className="font-bold text-lg">Paquete {currentPackage.name}</div>
                    </div>
                    <div className="font-mono">{formatPrice(currentPackage.price)}</div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-white/10 text-sm">
                    <div className="text-gray-400">Zona: {currentZone.name}</div>
                    <div className="font-mono text-gray-300">
                      {currentZone.surcharge > 0 ? `+${formatPrice(currentZone.surcharge)}` : 'Incluido'}
                    </div>
                  </div>

                  {selectedExtras.size > 0 && (
                    <div className="flex justify-between items-start pb-4 border-b border-white/10 text-sm">
                      <div className="text-gray-400">Extras ({selectedExtras.size})</div>
                      <div className="font-mono text-gray-300 text-right">
                        Cotización al enviar
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="text-sm text-gray-400 mb-2">Total Estimado*</div>
                  <div className="text-4xl font-black text-primary mb-6">{formatPrice(estimatedTotal)}</div>
                  <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                    *El precio final puede variar según los extras seleccionados y detalles específicos del evento.
                  </p>
                  
                  <Button 
                    size="lg"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white h-14 rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                    onClick={handleWhatsAppSubmit}
                  >
                    Enviar por WhatsApp
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="py-12 border-t border-white/5 bg-[#07090D]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-lg font-bold mb-6 text-gray-300">Condiciones de Servicio</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-white/5 px-4 py-2 rounded-full">Anticipo: 50% para apartar</span>
            <span className="bg-white/5 px-4 py-2 rounded-full">Cancelaciones: Sin devolución dentro de 72h</span>
            <span className="bg-white/5 px-4 py-2 rounded-full">Horas extra: Cargo adicional</span>
            <span className="bg-white/5 px-4 py-2 rounded-full">Zona base: Tijuana</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">¿Listo para atraer más clientes?</h2>
          <Button 
            size="lg"
            className="bg-white text-black hover:bg-gray-200 h-16 px-10 rounded-full text-xl font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            onClick={openDirectWhatsApp}
          >
            Reservar mi fecha ahora
          </Button>
        </div>
      </section>
      
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Palacios Sound. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
