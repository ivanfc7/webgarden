import { useEffect, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { updateEtapa } from "../../../assets/utils/sistema.api";
import toast from "react-hot-toast";

type TimeLineProps = {
    idPlanta: string;
    tipo: string;
    etapa: string;
};

interface EtapaItem {
    id: string;
    nombre: string;
    alias?: string[]; // Permite reconocer valores antiguos o alternativos en la BD
}

const etapasPorTipo: Record<string, EtapaItem[]> = {
    arbol: [
        {
            id: "Semilla (Almácigo)",
            nombre: "Semilla (Almácigo) 🌰",
            alias: ["semilla"],
        },
        {
            id: "Plantín en bolsa",
            nombre: "Plantín en bolsa 🌱",
            alias: ["plantin"],
        },
        {
            id: "Árbol joven",
            nombre: "Árbol joven 🌳",
            alias: ["planta_joven"],
        },
        {
            id: "Árbol adulto",
            nombre: "Árbol adulto 🌲",
            alias: ["arbol_adulto"],
        },
    ],
    arbusto: [
        {
            id: "Gajo / Plantín",
            nombre: "Gajo / Plantín 🌿",
            alias: ["Esqueje / Plantín", "plantin", "semilla"],
        },
        {
            id: "Arbusto joven",
            nombre: "Arbusto joven 🪴",
            alias: ["planta_joven"],
        },
        {
            id: "Arbusto adulto",
            nombre: "Arbusto adulto 🌳",
            alias: ["arbol_adulto"],
        },
    ],
    flor: [
        {
            id: "Semilla",
            nombre: "Semilla 🌰",
            alias: ["semilla"],
        },
        {
            id: "Plantín",
            nombre: "Plantín 🌱",
            alias: ["plantin"],
        },
        {
            id: "Planta en flor",
            nombre: "Planta en flor 🌸",
            alias: ["floracion", "planta_joven", "Planta con botones"],
        },
    ],
    suculenta: [
        {
            id: "Hoja o gajo",
            nombre: "Hoja o gajo 🍃",
            alias: ["Hoja / Esqueje", "semilla"],
        },
        {
            id: "Roseta / Brote",
            nombre: "Roseta / Brote 🌵",
            alias: ["plantin"],
        },
        {
            id: "Planta adulta",
            nombre: "Planta adulta 🪴",
            alias: ["planta_joven", "floracion"],
        },
    ],
};

// Busca el id exacto de la etapa aunque venga en minúsculas o con formato antiguo
function normalizarEtapa(tipo: string, etapaRecibida: string): string {
    const lista = etapasPorTipo[tipo.toLowerCase()] || [];
    if (!etapaRecibida) return lista[0]?.id || "";

    const limpia = etapaRecibida.trim().toLowerCase();
    const encontrada = lista.find(
        (item) =>
            item.id.toLowerCase() === limpia ||
            item.alias?.some((a) => a.toLowerCase() === limpia)
    );

    return encontrada ? encontrada.id : etapaRecibida;
}

export default function TimeLine({ idPlanta, tipo, etapa }: TimeLineProps) {
    const tipoNormalizado = tipo?.toLowerCase() || "";
    const etapas = etapasPorTipo[tipoNormalizado] || [];

    const [etapaActual, setEtapaActual] = useState(() =>
        normalizarEtapa(tipoNormalizado, etapa)
    );
    const [seleccion, setSeleccion] = useState(() =>
        normalizarEtapa(tipoNormalizado, etapa)
    );
    const [id, setId] = useState(idPlanta);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        const etapaValida = normalizarEtapa(tipoNormalizado, etapa);
        setEtapaActual(etapaValida);
        setSeleccion(etapaValida);
        setId(idPlanta);
    }, [etapa, tipoNormalizado, idPlanta]);

    async function actualizarEtapa() {
        if (guardando) return;
        setGuardando(true);
        try {
            await updateEtapa(id, seleccion);
            setEtapaActual(seleccion);
            toast.success("¡Etapa de planta actualizada!");
        } catch (error) {
            console.error("Error al actualizar etapa:", error);
            toast.error("No se pudo actualizar la etapa.");
        } finally {
            setGuardando(false);
        }
    }

    // Índice para pintar en verde el progreso recorrido en la línea conectora
    const indiceSeleccionado = etapas.findIndex((e) => e.id === seleccion);

    return (
        <div className="p-1 sm:p-2">
            <h3 className="text-lg sm:text-xl dark:text-teal-900 font-semibold mb-1">
                Etapas de tu planta
            </h3>

            <h4 className="text-sm sm:text-base text-gray-600 pb-4">
                ¿Quieres actualizar la etapa de tu planta?
            </h4>

            {/* Timeline de etapas */}
            <div className="flex items-start justify-between w-full gap-1">
                {etapas.map((item, index) => {
                    const estaSeleccionada = seleccion === item.id;
                    const esActual = etapaActual === item.id;
                    const esCompletada =
                        indiceSeleccionado !== -1 && index <= indiceSeleccionado;

                    return (
                        <div
                            key={item.id}
                            className="flex flex-col items-center relative cursor-pointer flex-1 min-w-0 group"
                            onClick={() => setSeleccion(item.id)}
                        >
                            {/* Conector de línea */}
                            {index !== etapas.length - 1 && (
                                <div
                                    className={`absolute top-4 sm:top-5 left-1/2 w-full h-0.5 -z-0 transition-colors ${
                                        indiceSeleccionado !== -1 && index < indiceSeleccionado
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                    }`}
                                />
                            )}

                            {/* Círculo */}
                            <div
                                className={`relative z-10 flex items-center justify-center
                                    w-8 h-8 sm:w-10 sm:h-10
                                    rounded-full border-2
                                    ${
                                        estaSeleccionada
                                            ? "bg-green-600 border-green-700 text-white scale-105"
                                            : esCompletada
                                            ? "bg-green-100 border-green-500 text-green-700"
                                            : "bg-white border-gray-300 text-gray-400 group-hover:border-green-400"
                                    }
                                    ${esActual ? "ring-2 ring-green-400 ring-offset-1" : ""}
                                    transition-all`}
                            >
                                {estaSeleccionada || esCompletada ? (
                                    <>
                                        <CheckCircle size={16} className="sm:hidden" />
                                        <CheckCircle size={20} className="hidden sm:block" />
                                    </>
                                ) : (
                                    <>
                                        <Circle size={16} className="sm:hidden" />
                                        <Circle size={20} className="hidden sm:block" />
                                    </>
                                )}
                            </div>

                            {/* Nombre de etapa */}
                            <span
                                className={`mt-2 text-[11px] leading-tight sm:text-sm text-center break-words w-full px-0.5 ${
                                    estaSeleccionada
                                        ? "font-bold text-green-800"
                                        : "font-medium text-gray-700"
                                }`}
                            >
                                {item.nombre}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Botón de actualizar solo si cambió la selección */}
            {seleccion !== etapaActual && (
                <div className="mt-5 sm:mt-6 flex justify-center">
                    <button
                        type="button"
                        disabled={guardando}
                        onClick={actualizarEtapa}
                        className="px-4 py-2 sm:px-6 bg-green-600 text-white text-sm sm:text-base font-medium rounded-xl shadow hover:bg-green-700 disabled:opacity-60 transition cursor-pointer"
                    >
                        {guardando ? "Actualizando..." : "Actualizar etapa"}
                    </button>
                </div>
            )}
        </div>
    );
}