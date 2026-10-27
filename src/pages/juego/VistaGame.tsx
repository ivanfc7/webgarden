import { BarraNavegacion } from "../../components/BarraNavegacion";
import { Salir } from "../../components/Salir"
import { PanelGame } from "./PanelGame";
import { VistaGameOver } from "./VistaGameOver";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFechaJuego } from "../../assets/utils/sistema.api";
import { Blocks, Book, Paperclip } from "lucide-react";
import { hayNovedad, marcarComoVisto } from "../../assets/utils/NovedadesJuego";

export function VistaGame() {
    const navegacion = useNavigate();
    const [mostrar, setMostrar] = useState(false);

    const [habilitarJuego, setHabilitarJuego] = useState(true);

    const mostrarInstruccion = () => setMostrar(true);
    const cerrarInstruccion = () => setMostrar(false);

    const [novedades, setNovedades] = useState({
        consejos: false,
        aprendizajes: false
    });
    const actualizarNovedades = () => {
        setNovedades({
            consejos: hayNovedad("consejos"),
            aprendizajes: hayNovedad("aprendizajes")
        });
    };
    
    useEffect(() => {
        actualizarNovedades();
    }, []);

    useEffect(() => {
        async function verificarFechaJuego() {
            const res = await getFechaJuego();
            setHabilitarJuego(res.habilitado);
        }
        verificarFechaJuego();
    }, []);

    const mostrarReflexiones = () => {
        marcarComoVisto("consejos");
        navegacion('/consejos-encontrados/' + location.pathname.split('/').pop());
    }

    const mostrarAprendizajes = () => {
        marcarComoVisto("aprendizajes");
        navegacion('/mis-aprendizajes/' + location.pathname.split('/').pop());
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-300">
            <BarraNavegacion />
            <div className="relative p-2 m-0 flex flex-wrap items-center justify-end gap-1">
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                    <Salir />
                </div>
                <button
                    onClick={mostrarInstruccion}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 m-1
                    bg-amber-100 text-amber-800 border-2 border-yellow-400
                    rounded-full text-sm font-semibold shadow-md
                    transition-all duration-300 hover:bg-amber-200 hover:shadow-lg
                    cursor-pointer"
                >
                    <Blocks size={16} />
                    <span className="whitespace-nowrap">
                        ¿Cómo jugar?
                    </span>
                </button>
            </div>
            {habilitarJuego ? (
                <div className="bg-[url('/fondo.JPG')] bg-cover bg-no-repeat bg-center h-full w-full bg-fixed bg-transparent">
                    <PanelGame
                        habilitarJuego={habilitarJuego}
                        onJuegoCompletado={() => {
                            actualizarNovedades();
                            setHabilitarJuego(false);
                        }}
                    />
                </div>
            ) : (
                <div className="bg-[url('/fondo.JPG')] bg-cover bg-no-repeat bg-center h-svh w-full bg-fixed bg-transparent pt-8">
                    <VistaGameOver />
                    <div className="flex flex-wrap items-center justify-center gap-3 w-full my-4">
                        <button
                            onClick={mostrarReflexiones}                            
                            className="relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-yellow-400 shadow-md transition-all duration-300 bg-amber-100 text-amber-800 hover:bg-amber-200 hover:shadow-lg cursor-pointer"
                        >
                            {novedades.consejos && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-600 border-2 border-amber-100" />
                            )}
                            <Paperclip size={16} />
                            <span className="whitespace-nowrap">
                                Para tomar en cuenta
                            </span>
                        </button>

                        <button
                            onClick={mostrarAprendizajes}
                            className="relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-yellow-400 shadow-md transition-all duration-300 bg-amber-100 text-amber-800 hover:bg-amber-200 hover:shadow-lg cursor-pointer"
                        >
                            {novedades.aprendizajes && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-600 border-2 border-amber-100" />
                            )}
                            <Book size={16} />
                            <span className="whitespace-nowrap">
                                Aprendizaje
                            </span>
                        </button>
                    </div>
                </div>
            )}
            {mostrar && (
                <div className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center px-4 py-8 overflow-y-auto">
                    <div className="w-full max-w-md my-auto bg-amber-50 border-2 border-emerald-700 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-emerald-700 px-6 py-5 text-white text-center">
                            <h3 className="font-bold text-2xl">¿Cómo jugar?</h3>
                            <p className="text-emerald-100 text-sm mt-1">
                                Explora los laberintos, descubre objetos y completa la misión diaria.
                            </p>
                        </div>

                        <div className="px-6 py-5 space-y-4">
                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🐿️</span>
                                <div>
                                    <p className="font-bold text-emerald-900">1. Explora con la ardilla</p>
                                    <p className="text-gray-700 text-sm">
                                        Mueve a la ardilla con los botones de dirección en pantalla
                                        o con las flechas del teclado para recorrer los 5 laberintos.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🔎</span>
                                <div>
                                    <p className="font-bold text-emerald-900">2. Descubre el césped antes de avanzar</p>
                                    <p className="text-gray-700 text-sm">
                                        ¡Importante! Antes de intentar avanzar, haz clic en las
                                        casillas de césped para descubrir qué se esconde detrás.
                                        Solo así podrás encontrar los objetos ocultos y reconocer
                                        el camino que debes seguir.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🍎</span>
                                <div>
                                    <p className="font-bold text-emerald-900">3. Encuentra manzanas</p>
                                    <p className="text-gray-700 text-sm">
                                        Recoge manzanas para desbloquear aprendizajes sobre
                                        las plantas y el cuidado del medioambiente.
                                        Cada 3 manzanas desbloqueas un aprendizaje.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🌰</span>
                                <div>
                                    <p className="font-bold text-emerald-900">4. Encuentra nueces</p>
                                    <p className="text-gray-700 text-sm">
                                        Recoge nueces para desbloquear consejos útiles.
                                        Cada 3 nueces desbloqueas un consejo.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">⚠️</span>
                                <div>
                                    <p className="font-bold text-emerald-900">5. Evita los peligros</p>
                                    <p className="text-gray-700 text-sm">
                                        Ten cuidado con los montones de basura.
                                        Si encuentras uno, perderás una vida.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🎯</span>
                                <div>
                                    <p className="font-bold text-emerald-900">6. Completa la misión diaria</p>
                                    <p className="text-gray-700 text-sm">
                                        Cada partida tiene una misión que indica cuántas
                                        manzanas y nueces debes conseguir. Completa los tres
                                        laberintos y reúne todos los objetos necesarios
                                        para superar el reto.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-amber-100 border-t border-amber-300 flex justify-center">
                            <button
                                className="bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-bold py-2.5 px-8 rounded-xl shadow-[0_3px_0_#14532d] transition-all cursor-pointer"
                                onClick={cerrarInstruccion}
                            >
                                ¡Entendido!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}