import { useState } from "react";
import { Droplets, Sun, Container, Heart, Loader2, FlaskConical } from "lucide-react";
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
    const diasSemana = [
      "Domingo", "Lunes", "Martes", "Miércoles",
      "Jueves", "Viernes", "Sábado",
    ];
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ];
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
    return `${diaSemana}, ${dia} de ${mes} de ${anio}`;
  }

  const FECHA = obtenerFechaFormateada();

  const getHumidityColor = (value: number) => {
    if (value <= 0) return "from-cyan-400 to-teal-400";
    if (value < 3) return "from-emerald-400 to-teal-400";
    if (value < 6) return "from-amber-400 to-orange-400";
    return "from-rose-400 to-red-500";
  };

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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8"
      style={{ background: "linear-gradient(135deg, #080e1f 0%, #0d1730 40%, #0a1a2e 70%, #06111f 100%)" }}>

      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}>
                <FlaskConical className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-cyan-400/70">
                  Laboratorio
                </p>
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-white tracking-tight leading-tight mb-1">
              Calculadora de Humedad
            </h1>
            <p className="text-sm text-white/35 font-normal">{FECHA}</p>
          </div>

          {/* Form */}
          <div className="px-8 py-7 space-y-5">
            {fields.map((field, index) => {
              const Icon = field.icon;
              return (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
                >
                  <label htmlFor={field.id} className="block mb-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Icon className={`w-3.5 h-3.5 ${field.iconColor}`} />
                      <span className="text-xs font-medium text-white/70">
                        {field.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/25 pl-[22px]">
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
          <div className="px-8 pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={hasResult ? "result" : "empty"}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="rounded-xl border border-white/[0.07] overflow-hidden mb-5"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="px-6 py-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-1">
                      Humedad de la Arena
                    </p>
                    <motion.p
                      key={humedad}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`text-4xl font-light tracking-tight bg-gradient-to-r ${getHumidityColor(humedad)} bg-clip-text text-transparent`}
                    >
                      {humedad}%
                    </motion.p>
                  </div>
                  {hasResult && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(6, 182, 212, 0.1)", border: "1px solid rgba(6, 182, 212, 0.2)" }}
                    >
                      <Droplets className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                  )}
                </div>
                {hasResult && (
                  <div className="h-[2px] w-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${humedad < 3 ? "#34d399" : humedad < 6 ? "#fbbf24" : "#f87171"}, transparent)` }} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Button */}
            <motion.button
              onClick={calcularHumedad}
              disabled={isCalculating}
              whileHover={{ scale: isCalculating ? 1 : 1.01 }}
              whileTap={{ scale: isCalculating ? 1 : 0.99 }}
              className="w-full py-3 px-6 rounded-xl text-sm font-semibold text-white
                transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0891b2, #0e7490)",
                boxShadow: "0 4px 24px -4px rgba(6, 182, 212, 0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
                style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }} />
              <span className="relative z-10 flex items-center gap-2">
                {isCalculating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  "Calcular Humedad"
                )}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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
