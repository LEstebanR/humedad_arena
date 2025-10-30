import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Droplets, Sun, CookingPot, Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Component() {
  const [pesoInicial, setPesoInicial] = useState("");
  const [pesoFinal, setPesoFinal] = useState("");
  const [pesoRecipiente, setPesoRecipiente] = useState("");
  const [humedad, setHumedad] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const calcularHumedad = async () => {
    setIsCalculating(true);
    const pi = parseFloat(pesoInicial);
    const pf = parseFloat(pesoFinal);
    const pr = parseFloat(pesoRecipiente);

    // Simulamos un pequeño delay para mostrar el loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (isNaN(pi) || isNaN(pf) || isNaN(pr)) {
      setHumedad(0);
      setIsCalculating(false);
      return;
    }

    const humedadCalculada = ((pi - pf) / (pf - pr)) * 100;
    setHumedad(parseFloat(humedadCalculada.toFixed(2)));
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
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    return `${diaSemana}, ${dia} de ${mes} de ${anio}`;
  }

  const FECHA = obtenerFechaFormateada();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/90 to-emerald-50/40 px-4 py-2 font-sans">
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/95 shadow-2xl border-0 rounded-3xl overflow-hidden [font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,Segoe_UI,Helvetica,Arial,sans-serif]">
        <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-700 text-white pb-12 relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20"></div>
          </div>
          <div className="relative z-10">
            <CardTitle className="text-4xl font-extralight text-center mb-1 tracking-tight">
              Calculadora de Humedad
            </CardTitle>
            <CardDescription className="text-blue-100 font-light tracking-wide">
              {FECHA}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-10 px-8 -mt-8 relative z-20 bg-white/95 rounded-t-[2.5rem] backdrop-blur-xl">
          <div className="space-y-2.5 transition-all duration-300 hover:transform hover:translate-y-[-2px]">
            <Label htmlFor="pesoInicial" className="flex flex-col gap-1">
              <span className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <Droplets className="w-4 h-4 text-blue-500" />
                Peso Inicial con Recipiente (g)
              </span>
            </Label>
            <Input
              id="pesoInicial"
              type="number"
              inputMode="numeric"
              placeholder="Ingrese el peso total inicial"
              value={pesoInicial}
              onChange={(e) => setPesoInicial(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300"
            />
          </div>
          <div className="space-y-2.5 transition-all duration-300">
            <Label htmlFor="pesoFinal" className="flex flex-col gap-1">
              <span className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <Sun className="w-4 h-4 text-amber-500" />
                Peso Final con Recipiente (g)
              </span>
            </Label>
            <Input
              id="pesoFinal"
              type="number"
              inputMode="numeric"
              placeholder="Ingrese el peso total final"
              value={pesoFinal}
              onChange={(e) => setPesoFinal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300"
            />
          </div>
          <div className="space-y-2.5 transition-all duration-300">
            <Label htmlFor="pesoRecipiente" className="flex flex-col gap-1">
              <span className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <CookingPot className="w-4 h-4 text-gray-500" />
                Peso del Recipiente (g)
              </span>
            </Label>
            <Input
              id="pesoRecipiente"
              type="number"
              inputMode="numeric"
              placeholder="Ingrese el peso del recipiente"
              value={pesoRecipiente}
              onChange={(e) => setPesoRecipiente(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-6 p-8 bg-white/95 backdrop-blur-xl">
          <motion.div
            className="text-center w-full bg-gradient-to-br from-blue-50 to-indigo-50/50 p-8 rounded-2xl border border-blue-100/50"
            animate={{ scale: humedad > 0 ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-gray-600 mb-3">
              Humedad de la Arena
            </p>
            <p className="text-6xl font-extralight text-blue-600 tracking-tight">
              {humedad}%
            </p>
          </motion.div>
          <Button
            onClick={calcularHumedad}
            disabled={isCalculating}
            className="w-full bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-800/20 disabled:opacity-70"
          >
            {isCalculating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculando...
              </>
            ) : (
              "Calcular Humedad"
            )}
          </Button>
        </CardFooter>
      </Card>
      <footer className="my-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10 flex flex-wrap items-center justify-center gap-x-1 gap-y-3 sm:gap-x-2"
        >
          <div className="rotate-20deg mx-2 h-[30px] w-[0.5px]"></div>
          <div className="flex items-center gap-x-2 text-xs sm:text-base">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-500"
            >
              Hecho con
            </motion.span>
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-500"
            >
              por
            </motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://lesteban.dev"
                target="_blank"
                className="hover:text-primary hover:underline hover:underline-offset-4 hover:transition-all hover:duration-300"
              >
                LEstebanR
              </a>
            </motion.div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
