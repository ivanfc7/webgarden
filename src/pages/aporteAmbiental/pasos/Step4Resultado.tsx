import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createAporte } from "../../../assets/utils/sistema.api";

type Acciones = {
  datos: {
    resultados: { nombre?: string; carbono: number; co2: number }[];
    carbonoTotal: number;
    CO2Total: number;
    especiePlanta: string;
    cantidadPlantas: number;
    idPlanta: number;
  };
};
type PlantaData = {
  cantidad: number;
  carbonoTotal: number;
  co2Total: number;
  planta: number; 
};

export function Step4Resultado({datos}: Acciones){
    const navegacion = useNavigate();
    const {register, handleSubmit} = useForm<PlantaData>();
   
    const guardarResumen = handleSubmit(async (data: PlantaData) => {
      const idPlant: number = datos.idPlanta;
      const aporte = {
        ...data,
        planta: idPlant,
      };
      try {
        await createAporte(aporte);
      } catch (error: any) {
        console.error("Error del servidor:", error.response?.data); 
      }
      
      navegacion('/aportes-plantas/'+idPlant);
      toast.success('Captura de carbono registrado en el historial !!');
    });

    const d = datos.resultados.map((item, index) => ({
      nombre: `Árbol ${index + 1}`,
      carbono: Number(item.carbono.toFixed(2)),
      co2: Number(item.co2.toFixed(2)),
    }));
    
    const carbonoAlmacenado = Number(datos.carbonoTotal.toFixed(2));
    const co2Equivalente = Number(datos.CO2Total.toFixed(2));
    
    const promedioC =
      datos.cantidadPlantas > 0
        ? carbonoAlmacenado / datos.cantidadPlantas
        : 0;
    
    const promedioCO2 =
      datos.cantidadPlantas > 0
        ? co2Equivalente / datos.cantidadPlantas
        : 0;

    return(
        <div>
            <p className="text-2xl font-bold dark:text-teal-900 text-center">Resultados</p>
            <div>             
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-green-100 p-4 rounded-xl shadow">
                    <h3 className="text-lg font-bold text-green-900">
                      Carbono almacenado
                    </h3>
                    <p className="text-2xl text-green-700">
                      {carbonoAlmacenado} kg
                    </p>
                    <p className="text-sm text-gray-600">
                      Promedio por árbol: {promedioC.toFixed(2)} kg
                    </p>
                  </div>

                  <div className="bg-blue-100 p-4 rounded-xl shadow">
                    <h3 className="text-lg font-bold text-blue-900">
                      CO₂ equivalente
                    </h3>
                    <p className="text-2xl text-blue-700">
                      {co2Equivalente} kg
                    </p>
                    <p className="text-sm text-gray-600">
                      Promedio por árbol: {promedioCO2.toFixed(2)} kg
                    </p>
                  </div>
                </div>
                <div className="w-full h-[350px] p-4">
                  <h2 className="text-xl font-bold mb-4">
                    Carbono almacenado y CO₂ equivalente por árbol
                  </h2>

                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={d}
                      margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nombre" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} kg`]} />
                      <Bar
                        dataKey="carbono"
                        fill="#10B981"
                        name="Carbono almacenado (kg)"
                      />
                      <Bar
                        dataKey="co2"
                        fill="#3B82F6"
                        name="CO₂ equivalente (kg)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-7">  
              <div className="bg-orange-100 rounded-lg shadow m-6 p-4">
                <h2 className="text-xl font-bold text-center mb-3">
                  Interpretación de los resultados
                </h2>

                <p className="text-gray-800 text-sm">
                  Tus {datos.cantidadPlantas} árboles de {datos.especiePlanta} tienen un contenido estimado de carbono de {carbonoAlmacenado} kg.
                </p>

                <p className="text-gray-800 text-sm mt-3">
                  Esa cantidad de carbono equivale aproximadamente a
                  {` ${co2Equivalente} kg de CO₂ `} por su composición química.
                </p>
                <p className="text-gray-800 text-sm mt-3">
                Un auto al año puede estar generando un estimado de 340 Kg de CO₂
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg shadow m-6 p-4">
                <p className="text-2xl font-bold dark:text-teal-900 text-center mb-2"> 📝 Resumen de datos</p>
                <p className="text-cyan-700 text-sm font-medium"> ✅ Árbol: {datos.especiePlanta} </p>
                <p className="text-cyan-700 text-sm font-medium"> ✅ Cantidad: {datos.cantidadPlantas}</p>
                <p className="text-cyan-700 text-sm font-medium"> ✅ Captura de carbono: {datos.carbonoTotal.toFixed(2)} Kg.</p>
                <p className="mt-5"> ¿Deseas guardar el resultado?</p>
                <form onSubmit={guardarResumen}>
                  <input type="number" className="hidden" {...register('cantidad')} defaultValue={datos.cantidadPlantas}/>
                  <input type="number" className="hidden" {...register('carbonoTotal')} defaultValue={datos.carbonoTotal.toFixed(2)}/>
                  <input type="number" className="hidden" {...register('co2Total')} defaultValue={datos.CO2Total.toFixed(2)}/>
                  <button onClick={guardarResumen} className="text-white font-bold cursor-pointer rounded-lg mt-2 bg-green-500 hover:bg-green-600 text-sm sm:w-auto px-5 py-2.5 text-center focus:ring-green-300">Si! ⮞</button>
                </form>
              </div>
            </div>         
        </div>
    )
}