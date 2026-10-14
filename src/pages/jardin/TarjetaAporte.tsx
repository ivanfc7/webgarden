import { Leaf } from "lucide-react"; 

interface Aporte {
    cantidad: number;
    co2Total: number;
    carbonoTotal: number;
    fechaRegistro: string;
}

interface AporteTarjeta{
    aporte: Aporte;
}

export function Tarjetas({aporte}: AporteTarjeta){
  return (
    <div className="m-7 bg-green-50 rounded-2xl shadow-md p-4">
      <div className="flex flex-col items-center space-y-4">
  
        {/* Icono */}
        <div className="bg-green-200 rounded-full p-3">
          <Leaf className="w-10 h-10 text-green-700" />
        </div>
  
        {/* Valor principal */}
        <div className="text-center">
          <p className="text-2xl font-bold text-green-700">
            {aporte.co2Total} kg CO₂ eq
          </p>
          <p className="text-sm text-gray-600">
            CO₂ equivalente al carbono almacenado estimado
          </p>
        </div>
  
        {/* Métrica secundaria */}
        <div className="w-full text-center text-sm text-gray-700 mt-2">
          <p className="font-bold">Carbono almacenado estimado</p>
          <p>{aporte.carbonoTotal} kg C</p>
        </div>
  
        {/* Información contextual */}
        <div className="text-xs text-gray-500 mt-3 text-center">
          {aporte.cantidad} ejemplares • {aporte.fechaRegistro}
        </div>
  
      </div>
    </div>
  );
}