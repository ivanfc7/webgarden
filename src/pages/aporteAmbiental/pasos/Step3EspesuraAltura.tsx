import { useForm } from "react-hook-form";
import { calcularImpacto } from "../../../assets/utils/CalculosAporte";
import { Ayuda } from "../Help";
import { useEffect,  useState} from "react";
import { HelpCircle } from "lucide-react";

type Acciones = {
    atras: () => void;
    siguiente: () => void;
    datos: (data: any) => void;
    datoActual: any;
};

export function Step3EspesuraAltura({atras, siguiente, datos, datoActual}: Acciones){
    const [usarMismosValores, setUsarMismosValores] = useState(false);
    const [mostrar, setMostrar] = useState(false);
    const [valoresComunes, setValoresComunes] = useState({
        altura: 0,
        follaje: 0
      });
    const {register, handleSubmit, setValue} = useForm();

    const asignar = handleSubmit(data => {
        const nuevosValores = {
            altura: data.alturaComun,
            follaje: data.grosorComun
          };
          setValoresComunes(nuevosValores);
    });

    useEffect(() => {
        if (usarMismosValores) {
          const cantidad = datoActual.cantidadPlantas || 1;
          for (let i = 0; i < cantidad; i++) {
            setValue(`altura_${i}`, valoresComunes.altura);
            setValue(`grosor_${i}`, valoresComunes.follaje);
          }
        }
      }, [valoresComunes, usarMismosValores]);

    const finalizar = handleSubmit(data => {
        const cantidad = datoActual.cantidadPlantas || 1;
        const plantas = [];
      
        for (let i = 0; i < cantidad; i++) {
          plantas.push({
            altura: Number(data[`altura_${i}`]),
            espesura: Number(data[`grosor_${i}`]) 
          });
        }
      
        const datosFinales = {
          ...datoActual, 
          cantidadPlantas: cantidad,
          plantas: plantas
        };
      
        let respuesta = calcularImpacto(datosFinales);
        datos(respuesta); 
        siguiente(); 
    }); 

    return (
        <div>
            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black text-center">Proporciona la altura y diametro de cada árbol.</p>
            <p className="dark:text-gray-500 text-center"> 💡 "Puedes aplicar los mismos datos a todas tus plantas si son similares. Si hay alguna que varía tambien la puedes editar, activa la opción usar valores comunes."</p>
            <label className="mt-4">
                <input
                type="checkbox"
                checked={usarMismosValores}
                onChange={() => setUsarMismosValores(!usarMismosValores)}
                />
                Usar valores comunes o similares
            </label>
            {usarMismosValores && (
                <form onSubmit={asignar}>
                    <div className="bg-lime-100 mb-4 p-2 grid grid-cols-1 md:grid-cols-3 border rounded">
                        <div className="relative z-0 group">
                            <p className="dark:text-gray-500 text-2xl">Valores comunes</p> </div>
                        <div className="relative z-0 group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                Altura (en cm.) 
                            </label>
                            <input  type="number" step="0.01" placeholder="110.7"
                                {...register('alturaComun', {required: true})}
                                className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"/> </div>
                        <div className="relative z-0 group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                Diametro aproximado (tronco cm.) 
                            </label>
                            <input  type="number" step="0.01" placeholder="22.1"
                                {...register('grosorComun', {required: true})}
                                className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"/> </div>
                    </div>
                    <button type="submit" 
                        className="text-black font-semibold cursor-pointer rounded-lg bg-teal-300 hover:bg-teal-400 text-sm sm:w-auto px-5 py-2.5 text-center focus:ring-teal-300"
                    > Listo !!</button>
                </form>
            )}
            <br />
            <div className="flex flex-row space-x-2.5">
                Necesitas ayuda para llenar los valores: 
                <button onClick={() => setMostrar(!mostrar)}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1.5">
                    <HelpCircle className="w-5 h-5" />
                </button>
                {mostrar && (
                    <Ayuda/>
                )}
            </div>
            <form onSubmit={finalizar}>
                <div className="mt-10 space-y-6">
                    {[...Array(datoActual.cantidadPlantas || 1)].map((_, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 border border-gray-400 p-3 rounded-lg shadow-md">
                        <div className="relative z-0 group">
                            <p className="dark:text-gray-500 text-2xl"> {datoActual.especiePlanta} {index + 1}</p>
                        </div>

                        <div className="relative z-0 group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                Altura aproximada (en cm.)
                            </label>
                            <input
                                type="number" step="0.01"
                                {...register(`altura_${index}`, {required: true})}
                                placeholder="110.7"
                                className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                            />
                        </div>

                        <div className="relative z-0 group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                Diametro aproximado (tronco cm.)
                            </label>
                            <input
                                type="number" step="0.01"
                                {...register(`grosor_${index}`, {required: true})}
                                placeholder="23.4"
                                className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                            />
                        </div>
                    </div>
                    ))}
                </div>

                <div className="flex justify-between mt-10">
                    <button type="button" onClick={atras} className="cursor-pointer rounded-lg bg-amber-200 p-2 hover:bg-amber-300">&#9664; Volver</button>
                    <button type="submit" 
                        className="text-white font-bold cursor-pointer rounded-lg bg-green-500 hover:bg-green-600 text-sm sm:w-auto px-5 py-2.5 text-center focus:ring-green-300"
                    > Ver Resultados &#9654;</button>
                </div>
            </form>
        </div>
    )
}