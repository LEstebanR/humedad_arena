import { useState } from "react";
import { Droplets, Sun, Container, Heart, Loader2, FlaskConical, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Component() {
  const [pesoInicial, setPesoInicial] = useState("");
  const [pesoFinal, setPesoFinal] = useState("");
  const [pesoRecipiente, setPesoRecipiente] = useState("");
  const [humedad, setHumedad] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const calcularHumedad = async () => {
    setIsCalculating(true);
    const pi = parseFloat(pesoInicial);
    const pf = parseFloat(pesoFinal);
    const pr = parseFloat(pesoRecipiente);

    // Simulamos un pequeño delay para mostrar el loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (isNaN(pi) || isNaN(pf) || isNaN(pr)) {
      setHumedad(0);
      setHasResult(false);
      setIsCalculating(false);
      return;
    }

    const humedadCalculada = ((pi - pf) / (pf - pr)) * 100;
    setHumedad(parseFloat(humedadCalculada.toFixed(2)));
    setHasResult(true);
    setIsCalculating(false);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      calcularHumedad();
    }
  };

  function obtenerFechaFormateada() {
    const fecha = new Date();
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
    return `${diaSemana}, ${dia} de ${mes} de ${anio}`;
  }

  const FECHA = obtenerFechaFormateada();

  const getHumidityMeta = (value: number) => {
    if (!hasResult) return null;
    if (value < 3) return {
      gradient: "from-emerald-400 to-teal-300",
      barColor: "#34d399",
      badgeBg: "rgba(16, 185, 129, 0.12)",
      badgeBorder: "rgba(16, 185, 129, 0.25)",
      badgeText: "text-emerald-400",
      label: "Arena Óptima",
      desc: "Lista para mezcla. Contenido de humedad ideal.",
      Icon: CheckCircle2,
    };
    if (value < 6) return {
      gradient: "from-amber-400 to-orange-300",
      barColor: "#fbbf24",
      badgeBg: "rgba(245, 158, 11, 0.12)",
      badgeBorder: "rgba(245, 158, 11, 0.25)",
      badgeText: "text-amber-400",
      label: "Humedad Moderada",
      desc: "Ajustar proporción de agua en la mezcla.",
      Icon: AlertTriangle,
    };
    return {
      gradient: "from-rose-400 to-red-400",
      barColor: "#f87171",
      badgeBg: "rgba(244, 63, 94, 0.12)",
      badgeBorder: "rgba(244, 63, 94, 0.25)",
      badgeText: "text-rose-400",
      label: "Humedad Excesiva",
      desc: "Se recomienda secar antes de usar.",
      Icon: XCircle,
    };
  };

  const meta = getHumidityMeta(humedad);

  const fields = [
    {
      id: "pesoInicial",
      label: "Peso Inicial con Recipiente",
      placeholder: "0.00 g",
      value: pesoInicial,
      onChange: setPesoInicial,
      icon: Droplets,
      iconColor: "text-cyan-400",
      description: "Muestra húmeda + recipiente",
    },
    {
      id: "pesoFinal",
      label: "Peso Final con Recipiente",
      placeholder: "0.00 g",
      value: pesoFinal,
      onChange: setPesoFinal,
      icon: Sun,
      iconColor: "text-amber-400",
      description: "Muestra seca + recipiente",
    },
    {
      id: "pesoRecipiente",
      label: "Peso del Recipiente",
      placeholder: "0.00 g",
      value: pesoRecipiente,
      onChange: setPesoRecipiente,
      icon: Container,
      iconColor: "text-violet-400",
      description: "Tara del recipiente vacío",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8"
      style={{ background: "linear-gradient(135deg, #060c1a 0%, #0b1528 50%, #07101e 100%)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 65%)", filter: "blur(70px)" }} />
        <div className="absolute -bottom-48 -right-24 w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 65%)", filter: "blur(70px)" }} />
        <div className="absolute top-1/2 right-0 w-72 h-72 opacity-10"
          style={{ background: "radial-gradient(circle, #0ea5e9 0%, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Neon border wrapper */}
        <div className="relative rounded-2xl p-[1px] neon-border">

          {/* Card */}
          <div className="glass-card rounded-2xl overflow-hidden">

            {/* Header */}
            <div className="relative px-8 pt-8 pb-6 overflow-hidden"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

              {/* Scan line effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="scan-line absolute left-0 right-0 h-[1px] opacity-30"
                  style={{ background: "linear-gradient(90deg, transparent, #22d3ee, transparent)" }} />
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center relative"
                  style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 4px 16px -4px rgba(6,182,212,0.5)" }}>
                  <FlaskConical className="w-4 h-4 text-white" />
                </div>
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-cyan-400/60">
                  Laboratorio
                </p>
              </div>

              <h1 className="text-[1.6rem] font-semibold text-white tracking-tight leading-tight mb-1">
                Calculadora de Humedad
              </h1>
              <p className="text-sm text-white/30 font-light tracking-wide">{FECHA}</p>
            </div>

            {/* Form */}
            <div className="px-8 py-7 space-y-5">
              {fields.map((field, index) => {
                const Icon = field.icon;
                return (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.12 + index * 0.08 }}
                  >
                    <label htmlFor={field.id} className="block mb-2 cursor-pointer">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Icon className={`w-3.5 h-3.5 ${field.iconColor}`} />
                        <span className="text-sm font-medium text-white/65">
                          {field.label}
                        </span>
                      </div>
                      <span className="text-xs text-white/25 pl-[22px]">
                        {field.description}
                      </span>
                    </label>
                    <input
                      id={field.id}
                      type="number"
                      inputMode="numeric"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="input-field"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Result */}
            <div className="px-8 pb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hasResult ? `result-${humedad}` : "empty"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl overflow-hidden mb-5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Result value row */}
                  <div className="px-6 pt-5 pb-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/25 mb-2">
                        Humedad de la Arena
                      </p>
                      <p className={`text-5xl font-semibold tracking-tight bg-gradient-to-r ${meta ? meta.gradient : "from-white/30 to-white/20"} bg-clip-text text-transparent`}>
                        {humedad}%
                      </p>
                    </div>

                    {/* Animated ring icon */}
                    {hasResult && meta && (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="relative w-14 h-14 flex items-center justify-center rounded-full"
                        style={{ background: meta.badgeBg, border: `1px solid ${meta.badgeBorder}` }}
                      >
                        <meta.Icon className={`w-6 h-6 ${meta.badgeText}`} />
                      </motion.div>
                    )}
                  </div>

                  {/* Status badge — the surprise */}
                  <AnimatePresence>
                    {hasResult && meta && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-5"
                      >
                        <div className="rounded-lg px-4 py-3 flex items-start gap-3"
                          style={{ background: meta.badgeBg, border: `1px solid ${meta.badgeBorder}` }}>
                          <meta.Icon className={`w-4 h-4 mt-0.5 shrink-0 ${meta.badgeText}`} />
                          <div>
                            <p className={`text-sm font-semibold ${meta.badgeText}`}>{meta.label}</p>
                            <p className="text-xs text-white/40 mt-0.5">{meta.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Color bar */}
                  {hasResult && meta && (
                    <div className="h-[2px]"
                      style={{ background: `linear-gradient(90deg, transparent 0%, ${meta.barColor} 50%, transparent 100%)` }} />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Button */}
              <motion.button
                onClick={calcularHumedad}
                disabled={isCalculating}
                whileHover={{ scale: isCalculating ? 1 : 1.015 }}
                whileTap={{ scale: isCalculating ? 1 : 0.985 }}
                className="w-full py-3.5 px-6 rounded-xl text-base font-semibold text-white
                  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0891b2 0%, #6d28d9 100%)",
                  boxShadow: "0 4px 28px -4px rgba(6,182,212,0.4), 0 4px 28px -8px rgba(109,40,217,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  "Calcular Humedad"
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 flex items-center justify-center gap-1.5"
        >
          <span className="text-xs text-white/20">Hecho con</span>
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            <Heart className="h-3 w-3 fill-rose-400 text-rose-400" />
          </motion.div>
          <span className="text-xs text-white/20">por</span>
          <motion.a
            href="https://lesteban.dev"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="text-xs text-white/40 hover:text-cyan-400 transition-colors duration-200"
          >
            LEstebanR
          </motion.a>
        </motion.footer>
      </motion.div>
    </div>
  );
}
