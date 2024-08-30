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
} from "@/components/ui/card";
import { Droplets, Sun, CookingPot, Github, Globe } from "lucide-react";

export default function Component() {
  const [pesoInicial, setPesoInicial] = useState("");
  const [pesoFinal, setPesoFinal] = useState("");
  const [pesoRecipiente, setPesoRecipiente] = useState("");
  const [humedad, setHumedad] = useState(0);

  const calcularHumedad = () => {
    const pi = parseFloat(pesoInicial);
    const pf = parseFloat(pesoFinal);
    const pr = parseFloat(pesoRecipiente);

    if (isNaN(pi) || isNaN(pf) || isNaN(pr)) {
      setHumedad(0);
      return;
    }

    const humedadCalculada = ((pi - pf) / (pf - pr)) * 100;
    setHumedad(parseFloat(humedadCalculada.toFixed(2)));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-gray-800 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            Calculadora de Humedad de Arena
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="pesoInicial" className="flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Peso Inicial (Arena Húmeda) (g)
            </Label>
            <Input
              id="pesoInicial"
              type="number"
              placeholder="Ingrese el peso de la arena húmeda"
              value={pesoInicial}
              onChange={(e) => setPesoInicial(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pesoFinal" className="flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Peso Final (Arena Seca) (g)
            </Label>
            <Input
              id="pesoFinal"
              type="number"
              placeholder="Ingrese el peso de la arena seca"
              value={pesoFinal}
              onChange={(e) => setPesoFinal(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pesoRecipiente" className="flex items-center gap-2">
              <CookingPot className="w-5 h-5" />
              Peso del Recipiente(g)
            </Label>
            <Input
              id="pesoRecipiente"
              type="number"
              placeholder="Ingrese el peso de la olla"
              value={pesoRecipiente}
              onChange={(e) => setPesoRecipiente(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <div className="text-center w-full">
            <p className="text-lg font-semibold text-gray-700">
              Humedad de la Arena:
            </p>
            <p className="text-4xl font-bold text-gray-800">{humedad}%</p>
          </div>
          <Button
            onClick={calcularHumedad}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Calcular Humedad
          </Button>
        </CardFooter>
      </Card>
      <footer className="mt-8 text-center text-sm text-gray-600">
        <div className="flex justify-center space-x-6">
          <a
            href="https://lesteban.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-gray-800 transition-colors duration-300"
          >
            <Globe className="w-4 h-4 mr-1" />
            <span>LEsteban</span>
          </a>
          <a
            href="https://github.com/LEstebanR/humedad_arena"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-gray-800 transition-colors duration-300"
          >
            <Github className="w-4 h-4 mr-1" />
            <span>Repositorio</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
