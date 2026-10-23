import { useEffect, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { updateEtapa } from "../../../assets/utils/sistema.api";
import toast from "react-hot-toast";

type TimeLineProps = {
    idPlanta: string;
    tipo: string;
    etapa: string;
};

const etapasPorTipo: Record<string, { id: string; nombre: string }[]> = {
    arbol: [
        { id: 'semilla', nombre: "Semilla 🌱" },
        { id: 'plantin', nombre: "Plantin 🌿" },
        { id: 'planta_joven', nombre: "Planta Joven 🌳" },
        { id: 'arbol_adulto', nombre: "Arbol Adulto 🌴" },
    ],
    arbusto: [
        { id: 'semilla', nombre: "Semilla 🌱" },
        { id: 'plantin', nombre: "Plantin 🌿" },
        { id: 'planta_joven', nombre: "Planta Joven 🌳" },
        { id: 'arbol_adulto', nombre: "Arbusto Adulto 🌴" },
    ],
    flor: [
        { id: 'semilla', nombre: "Semilla 🌱" },
        { id: 'plantin', nombre: "Plantin 🌿" },
        { id: 'planta_joven', nombre: "Planta Joven 🌳" },
        { id: 'floracion', nombre: "Floración 🌸" },
    ],
    suculenta: [
        { id: 'semilla', nombre: "Semilla 🌱" },
        { id: 'plantin', nombre: "Plantin 🌿" },
        { id: 'planta_joven', nombre: "Planta Joven 🌳" },
        { id: 'floracion', nombre: "Planta Adulta 🌸" },
    ]
  };

export default function TimeLine({idPlanta, tipo, etapa}: TimeLineProps){
    const [etapaActual, setEtapaActual] = useState(etapa);
    const [seleccion, setSeleccion] = useState(etapa);
    const [id, setId] = useState(idPlanta);
    const etapas = etapasPorTipo[tipo] || [];

    useEffect(()=>{
        setEtapaActual(etapa);
        setSeleccion(etapa);
        setId(idPlanta);
    }, [etapa, tipo]);

    async function actualizarEtapa() {
        console.log('actualizando en la base de datos de la planta: '+id);
        setEtapaActual(seleccion);
        try {
            const respuesta = await updateEtapa(id, seleccion);
            console.log(respuesta);
            toast.success('Etapa de planta actualizada!');
        } catch (error) {
            console.log('Hubo un error');
        }
    }

    return (
        <div className="p-1 sm:p-2">
            <h3 className="text-lg sm:text-xl dark:text-teal-900 font-semibold mb-2">
                Etapas de tu planta
            </h3>
    
            <h4 className="text-sm sm:text-base pb-3">
                ¿Quieres actualizar la etapa de tu planta?
            </h4>
    
            {/* Timeline de etapas */}
            <div className="flex items-start justify-between w-full gap-1">
                {etapas.map((etapa, index) => (
                    <div
                        key={etapa.id}
                        className="flex flex-col items-center relative cursor-pointer flex-1 min-w-0"
                        onClick={() => setSeleccion(etapa.id)}
                    >
                        {/* Conector de línea */}
                        {index !== etapas.length - 1 && (
                            <div className="absolute top-4 sm:top-5 left-1/2 w-full h-0.5 bg-gray-400 -z-0" />
                        )}
    
                        {/* Círculo */}
                        <div
                            className={`relative z-10 flex items-center justify-center
                                w-8 h-8 sm:w-10 sm:h-10
                                rounded-full border-2
                                ${
                                    seleccion === etapa.id
                                        ? "bg-green-500 border-green-600 text-white"
                                        : "bg-white border-gray-400"
                                }
                                ${
                                    etapaActual === etapa.id
                                        ? "ring-2 ring-green-400"
                                        : ""
                                }
                                transition-all`}
                        >
                            {seleccion === etapa.id ? (
                                <CheckCircle size={16} className="sm:hidden" />
                            ) : (
                                <Circle size={16} className="sm:hidden" />
                            )}
    
                            {seleccion === etapa.id ? (
                                <CheckCircle size={20} className="hidden sm:block" />
                            ) : (
                                <Circle size={20} className="hidden sm:block" />
                            )}
                        </div>
    
                        {/* Nombre de etapa */}
                        <span className="mt-2 text-[10px] leading-tight sm:text-sm font-medium text-center break-words w-full">
                            {etapa.nombre}
                        </span>
                    </div>
                ))}
            </div>
    
            {/* Botón de actualizar solo si cambió la selección */}
            {seleccion !== etapaActual && (
                <div className="mt-5 sm:mt-6 flex justify-center">
                    <button
                        onClick={actualizarEtapa}
                        className="px-4 py-2 sm:px-6 bg-green-600 text-white text-sm sm:text-base rounded-xl shadow hover:bg-green-700 transition cursor-pointer"
                    >
                        Actualizar etapa
                    </button>
                </div>
            )}
        </div>
    );
}