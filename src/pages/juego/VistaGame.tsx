import { BarraNavegacion } from "../../components/BarraNavegacion";
import { Salir } from "../../components/Salir"
import { PanelGame } from "./PanelGame";
import { VistaGameOver } from "./VistaGameOver";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProgresoJuego, getFechaJuego } from "../../assets/utils/sistema.api";
import { Lock, Blocks, Book, Paperclip } from "lucide-react";

export function VistaGame() {
    const navegacion = useNavigate();
    const [mostrar, setMostrar] = useState(false);
    const [habilitarBtnMsj, setHabilitarBtnMsj] = useState(false);
    const [habilitarBtnApzj, setHabilitarBtnApzj] = useState(false);
    const [habilitarJuego, setHabilitarJuego] = useState(true);

    const mostrarInstruccion = () => setMostrar(true);
    const cerrarInstruccion = () => setMostrar(false);

    useEffect(() => {
        async function habilitarBtnMensajes() {
            const progresoActual = await getProgresoJuego();
            if (progresoActual.data[0].cantidadMsjDesbloqueados === 0) {
                setHabilitarBtnMsj(false);
            } else {
                setHabilitarBtnMsj(true);
            }
        }
        async function habilitarBtnAprendizajes() {
            const progresoActual = await getProgresoJuego();
            if (progresoActual.data[0].cantidadApzjDesbloqueados === 0) {
                setHabilitarBtnApzj(false);
            } else {
                setHabilitarBtnApzj(true);
            }
        }
        async function verificarFechaJuego() {
            const res = await getFechaJuego();
            setHabilitarJuego(res.habilitado);
        }

        habilitarBtnMensajes();
        habilitarBtnAprendizajes();
        verificarFechaJuego();
    });

    const mostrarReflexiones = () => {
        navegacion('/consejos-encontrados/' + location.pathname.split('/').pop());
    }

    const mostrarAprendizajes = () => {
        navegacion('/mis-aprendizajes/' + location.pathname.split('/').pop());
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-300">
            <BarraNavegacion />
            <div className="relative p-2 m-0 flex flex-wrap items-center justify-end md:justify-center gap-1">
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                    <Salir />
                </div>
                <button onClick={mostrarInstruccion} className="flex items-center justify-center gap-2 px-4 py-1.5 m-1 text-sm font-semibold transition-all duration-300 shadow-sm border bg-amber-700 text-white text-center border-yellow-400 cursor-pointer rounded-2xl hover:bg-amber-900">
                    <Blocks size={14} />
                    <span className="whitespace-nowrap hidden md:inline-block">¿Cómo jugar?</span>
                </button>
                <button onClick={mostrarReflexiones} disabled={!habilitarBtnMsj} className={`flex items-center justify-center gap-2 px-4 py-1.5 m-1 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border ${habilitarBtnMsj ? 'bg-amber-700 text-white border-yellow-400 hover:bg-amber-800 cursor-pointer' : 'bg-amber-700 text-white/60 border-yellow-400 cursor-not-allowed'}`}>
                    {!habilitarBtnMsj ? (
                        <Lock size={14} />
                    ) : (
                        <Paperclip size={14} />
                    )}
                    <span className="whitespace-nowrap hidden md:inline-block">Para tomar en cuenta</span>
                </button>
                <button onClick={mostrarAprendizajes} disabled={!habilitarBtnApzj} className={`flex items-center justify-center gap-2 px-4 py-1.5 m-1 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border ${habilitarBtnApzj ? 'bg-amber-700 text-white border-yellow-400 hover:bg-amber-800 cursor-pointer' : 'bg-amber-700 text-white/60 border-yellow-400 cursor-not-allowed'}`}>
                    {!habilitarBtnApzj ? (
                        <Lock size={14} />
                    ) : (
                        <Book size={14} />
                    )}
                    <span className="whitespace-nowrap hidden md:inline-block">
                        Aprendizaje
                    </span>
                </button>
            </div>
            {habilitarJuego ? (
                <div className="bg-[url('/fondo.JPG')] bg-cover bg-no-repeat bg-center h-full w-full bg-fixed bg-transparent">
                    <PanelGame onJuegoCompletado={() => setHabilitarJuego(false)} />
                </div>
            ) : (
                <div className="bg-[url('/fondo.JPG')] bg-cover bg-no-repeat bg-center h-svh w-full bg-fixed bg-transparent pt-8">
                    <VistaGameOver />
                </div>
            )}
            {mostrar && (
               <div className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center px-4 py-8 overflow-y-auto">
                    <div className="w-full max-w-md my-auto bg-amber-50 border-2 border-emerald-700 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-emerald-700 px-6 py-5 text-white text-center">
                            <h3 className="font-bold text-2xl">¿Cómo jugar?</h3>
                            <p className="text-emerald-100 text-sm mt-1">
                                Explora, encuentra objetos y completa la misión diaria
                            </p>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🐿️</span>
                                <div>
                                    <p className="font-bold text-emerald-900">Explora el jardín</p>
                                    <p className="text-gray-700 text-sm">
                                        Desplázate por el laberinto junto a la ardilla hasta encontrar todos los objetos.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🔎</span>
                                <div>
                                    <p className="font-bold text-emerald-900">Descubre lo que hay a tu alrededor</p>
                                    <p className="text-gray-700 text-sm">
                                        Haz clic sobre el césped cercano para descubrir los objetos ocultos.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🍎</span>
                                <div>
                                    <p className="font-bold text-emerald-900">Encuentra manzanas</p>
                                    <p className="text-gray-700 text-sm">
                                        Las manzanas te permiten desbloquear aprendizajes. Cada 3 manzanas consigues uno.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🌰</span>
                                <div>
                                    <p className="font-bold text-emerald-900">Encuentra nueces</p>
                                    <p className="text-gray-700 text-sm">
                                        Las nueces te permiten desbloquear consejos.
                                        Cada 3 nueces consigues uno.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">⚠️</span>
                                <div>
                                    <p className="font-bold text-emerald-900">¡Cuida tu salud!</p>
                                    <p className="text-gray-700 text-sm">
                                        Evita los montones de basura. Si los encuentras, perderás una vida.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🎯</span>
                                <div>
                                    <p className="font-bold text-emerald-900">Completa la misión diaria</p>
                                    <p className="text-gray-700 text-sm">
                                        Cada partida tiene una misión diferente.
                                        Recorre los 5 laberintos y consigue los objetos necesarios para completar tu reto.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-amber-100 border-t border-amber-300 flex justify-center">
                            <button className="bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-bold py-2.5 px-8 rounded-xl shadow-[0_3px_0_#14532d] transition-all cursor-pointer" onClick={cerrarInstruccion}>¡Entendido!</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}