import { Celda } from "./Celda";
import { mapas, cantidadNiveles, contarObjetos, obtenerObjetivoDiario } from "../../assets/utils/NivelesGame";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { SquareArrowDown, SquareArrowLeft, SquareArrowRight, SquareArrowUp, XIcon } from "lucide-react";
import { saveAprendizajeDesbloqueado, saveMensajeDesbloqueado, updateContadorAprendizaje, updateContadorMensajes, getProgresoJuego, updateFechaJuego } from "../../assets/utils/sistema.api";
import { listaMensajes } from "../../assets/utils/ConsejosGame";
import { listaTemas } from "../../assets/utils/AprendizajeGame";
import { ConsejoAbeja } from "./ConsejoAbeja";
import corazon from '/img_juego/vida.png';
import { ProgresoJuego } from './ProgresoJuego';
import juegoCompletado from '/audio/juegoCompletado.wav';
import juegoPerdido from '/audio/juegoPerdido.wav';
import itemEncontrado from '/audio/itemEncontrado.wav';
import itemBasuraEncontrado from '/audio/itemBasuraEncontrado.wav';
import descubrirCesped from '/audio/descubrirCesped.mp3'

type MensajeData = {
    progreso: number;
    titulo: string;
    descripcion: string;
    desbloqueado: boolean;
}

type AprendizajeData = {
    progreso: number;
    titulo: string;
    contenido: string;
    imagen: string;
    fuente: string;
    video: string;
    desbloqueado: boolean;
}

type props = {
    onJuegoCompletado: () => void;
}

export function PanelGame({ onJuegoCompletado }: Readonly<props>) {
    const [mapa, setMapa] = useState<string[][]>(mapas(0));
    const [nivel, setNivel] = useState(0);
    const [manzanasPendientes, setManzanasPendientes] = useState(0);
    const [nuecesPendientes, setNuecesPendientes] = useState(0);
    const [posicionX, setPosicionX] = useState(0);
    const [posicionY, setPosicionY] = useState(0);
    const [vidas, setVidas] = useState(3);
    const [listaVidas, setListaVidas] = useState<string[]>([]);
    const [manzanas, setManzanas] = useState(0);
    const [listaManzanas, setListaManzanas] = useState<string[]>([]);
    const [nueces, setNueces] = useState(0);
    const [listaNueces, setListaNueces] = useState<string[]>([]);
    const [totalObjetosNivel, setTotalObjetosNivel] = useState(
        contarObjetos(mapas(0))
    );
    const [grupoMDesbloqueado, setGrupoMDesbloqueado] = useState(false);
    const [grupoNDesbloqueado, setGrupoNDesbloqueado] = useState(false);
    const [objetivoRecurso] = useState(obtenerObjetivoDiario);
    const [tamanoCamara, setTamanoCamara] = useState({
        ancho: 0,
        alto: 0
    });

    const camaraRef = useRef<HTMLDivElement>(null);
    const [mostrarProgreso, setMostrarProgreso] = useState(true);
    const [puedeAvanzar, setPuedeAvanzar] = useState(false);

    const [totalConsejosDesbloqueados, setTotalConsejosDesbloqueados] = useState(0);
    const [totalTemasDesbloqueados, setTotalTemasDesbloqueados] = useState(0);
    const [aviso] = useState('');

    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [gano, setGano] = useState(false);
    // const [cantidadMsj] = useState(0);
    // const [cantidadApzj] = useState(0);
    const [encontroItemEspecial, setEncontroItemEspecial] = useState(false);
    const [mostrarConsejoAbeja, setMostrarConsejoAbeja] = useState(false);
    const [mostrarModalAbeja, setMostrarModalAbeja] = useState(false);
    const [etiquetaGame, setEtiquetaGame] = useState('Primer Laberinto');
    const [visibilidad, setVisibilidad] = useState(mapa ? mapa.map(fila => fila.map(() => false)) : []);
    const [animaciones, setAnimaciones] = useState(mapa ? mapa.map(fila => fila.map(() => false)) : []);

    const audioCompletado = new Audio(juegoCompletado);
    const audioPerdido = new Audio(juegoPerdido);
    const audioItemEncontrado = new Audio(itemEncontrado);
    const audioBasura = new Audio(itemBasuraEncontrado);
    const audioCesped = new Audio(descubrirCesped);

    useEffect(() => {
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[i].length; j++) {
                if (mapa[i][j] === 'A') {
                    setPosicionX(i);
                    setPosicionY(j);
                }
            }
        }
        const listaV: string[] = [];
        for (let i = 1; i <= vidas; i++) {
            listaV.push('vida' + i);
        }
        setListaVidas(listaV);

        const listaM: string[] = [];
        for (let i = 1; i <= manzanas; i++) {
            listaM.push('manzana' + i);
        }
        setListaManzanas(listaM);

        const listaN: string[] = [];
        for (let i = 1; i <= nueces; i++) {
            listaN.push('nuez' + i);
        }
        setListaNueces(listaN);
    }, [vidas, mapa]);

    useEffect(() => {
        const actualizarTamanoCamara = () => {
            if (camaraRef.current) {
                setTamanoCamara({
                    ancho: camaraRef.current.clientWidth,
                    alto: camaraRef.current.clientHeight
                });
            }
        };

        actualizarTamanoCamara();

        window.addEventListener('resize', actualizarTamanoCamara);

        return () => {
            window.removeEventListener('resize', actualizarTamanoCamara);
        };
    }, []);

    useEffect(() => {
        const cargarProgreso = async () => {
            const res = await getProgresoJuego();
            setTotalConsejosDesbloqueados(res.data[0].cantidadMsjDesbloqueados)
            setTotalTemasDesbloqueados(res.data[0].cantidadApzjDesbloqueados)
        };
        cargarProgreso();
    }, [totalConsejosDesbloqueados, totalTemasDesbloqueados]);

    useEffect(() => {
        const reconocerTecla = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp') mover(-1, 0);
            if (event.key === 'ArrowDown') mover(1, 0);
            if (event.key === 'ArrowLeft') mover(0, -1);
            if (event.key === 'ArrowRight') mover(0, 1);
        };

        window.addEventListener('keydown', reconocerTecla);
        return () => window.removeEventListener('keydown', reconocerTecla);
    }, [posicionX, posicionY, mapa]);

    const mover = (dx: number, dy: number) => {
        const nuevaX = posicionX + dx;
        const nuevaY = posicionY + dy;

        // Verifica si está dentro del mapa y no es una piedra
        if (
            nuevaX >= 0 && nuevaX < mapa.length &&
            nuevaY >= 0 && nuevaY < mapa[0].length &&
            mapa[nuevaX][nuevaY] !== 'P'
        ) {
            const nuevoMapa = mapa.map(fila => [...fila]);
            // Actualiza el mapa: borra 'A' de la posición anterior y ponla en la nueva
            nuevoMapa[posicionX][posicionY] = '_';
            nuevoMapa[nuevaX][nuevaY] = 'A';

            setMapa(nuevoMapa);
            setPosicionX(nuevaX);
            setPosicionY(nuevaY);
        }

        if (mapa[nuevaX][nuevaY] === 'B') {
            let controlVidas = vidas - 1;
            setVidas(controlVidas);
            audioBasura.play();
            if (controlVidas === 0) {
                setMostrarMensaje(true);
                completarJuego();
            }
        }

        if (mapa[nuevaX][nuevaY] === 'M') {
            setManzanas(manzanas + 1);
            audioBasura.play();
            setManzanasPendientes(manzanasPendientes + 1);
        }

        if (mapa[nuevaX][nuevaY] === 'N') {
            setNueces(nueces + 1);
            audioBasura.play();
            setNuecesPendientes(nuecesPendientes + 1);
        }

        if (mapa[nuevaX][nuevaY] === 'E') {
            audioBasura.play();
            setEncontroItemEspecial(true);
            setMostrarConsejoAbeja(true);
            toast.success('Pillaste un consejo');
        }
    };

    // ============================================================
    // EDITAR: avance de nivel
    // Ahora solo avanza cuando se recogieron TODOS los objetos
    // M, N y E del laberinto actual.
    // ============================================================
    useEffect(() => {
        const objetosEncontrados =
            manzanasPendientes +
            nuecesPendientes +
            (encontroItemEspecial ? 1 : 0);

        if (
            totalObjetosNivel > 0 &&
            objetosEncontrados === totalObjetosNivel &&
            !mostrarProgreso
        ) {
            const nuevoNivel = nivel + 1;

            if (nuevoNivel < cantidadNiveles()) {
                setPuedeAvanzar(true);
                setMostrarProgreso(true);
            } else {
                setGano(true);
                setMostrarMensaje(true);
                completarJuego();
            }
        }
    }, [
        manzanasPendientes,
        nuecesPendientes,
        encontroItemEspecial,
        totalObjetosNivel,
        nivel,
        mostrarProgreso
    ]);

    // ============================================================
    // EDITAR: desbloqueo de recursos por grupos de 3
    // ============================================================
    const continuarSiguienteLaberinto = () => {
        const nuevoNivel = nivel + 1;

        const etiquetas: { [key: number]: string } = {
            1: 'Segundo Laberinto',
            2: 'Tercer Laberinto',
            3: 'Cuarto Laberinto',
            4: 'Quinto Laberinto'
        };

        const nuevoMapa = mapas(nuevoNivel);

        setMostrarProgreso(false);

        setNivel(nuevoNivel);
        setMapa(nuevoMapa);
        setTotalObjetosNivel(contarObjetos(nuevoMapa));
        setEtiquetaGame(etiquetas[nuevoNivel]);

        setManzanasPendientes(0);
        setNuecesPendientes(0);
        setEncontroItemEspecial(false);
        setGrupoMDesbloqueado(false);
        setGrupoNDesbloqueado(false);
    };
    const continuarProgreso = () => {
        if (puedeAvanzar) {
            continuarSiguienteLaberinto();
            setPuedeAvanzar(false);
        } else {
            setMostrarProgreso(false);
        }
    };
    useEffect(() => {
        // Cuando se consiguen 3 M
        if (manzanas === 3  && manzanas % 3 === 0 && !grupoMDesbloqueado) {
            toast.success('Un consejo ha sido Desbloqueado');
            console.log('Grupo de 3 M completado');
            console.log('Desbloqueando consejo...');
            guardarProgresoMensajes();
            audioItemEncontrado.play();
            setGrupoMDesbloqueado(true);
        }

        // Cuando se consiguen 3 N
        if (nueces === 3  && nueces % 3 === 0 && !grupoNDesbloqueado) {
            toast.success('Un tema de aprendizaje ha sido Desbloqueado');
            console.log('Grupo de 3 N completado');
            console.log('Desbloqueando tema de aprendizaje...');
            guardarProgresoAprendizaje();
            audioItemEncontrado.play();
            setGrupoNDesbloqueado(true);
        }

    }, [
        manzanas,
        nueces,
        grupoMDesbloqueado,
        grupoNDesbloqueado
    ]);

    useEffect(() => {
        if (mostrarMensaje && gano) {
            audioCompletado.play();
            completarJuego();
        }
        if (mostrarMensaje && !gano) {
            audioPerdido.play();
            completarJuego();
        }
    }, [mostrarMensaje, gano])

    const arriba = () => {
        mover(-1, 0);
    }
    const abajo = () => {
        mover(1, 0);
    }
    const izquierda = () => {
        mover(0, -1);
    }
    const derecha = () => {
        mover(0, 1);
    }

    async function completarJuego() {
        await updateFechaJuego();
    }

    const cerrarMensaje = () => {
        setMostrarMensaje(false);
        if (onJuegoCompletado) {
            onJuegoCompletado();
        }
    }

    const descubrir = (i: number, j: number) => {
        audioCesped.play();
        setAnimaciones(prev => {
            const nueva = prev.map((fila, x) =>
                fila.map((val, y) => val || (x === i && y === j))
            );
            return nueva;
        });

        if (Math.abs(i - posicionX) <= 2 && Math.abs(j - posicionY) <= 2) {
            setVisibilidad(prev => {
                const nueva = prev.map((fila, x) =>
                    fila.map((val, y) => val || (x === i && y === j))
                );
                return nueva;
            });
        }
        setTimeout(() => {
            setAnimaciones(prev => {
                const nueva = prev.map((fila, x) =>
                    fila.map((val, y) => (x === i && y === j ? false : val))
                );
                return nueva;
            });
        }, 800)
    };

    useEffect(() => {
        const cargarProgreso = async () => {
            const res = await getProgresoJuego();
            if (res.data.length > 0) {
                setTotalConsejosDesbloqueados(
                    res.data[0].cantidadMsjDesbloqueados
                );
                setTotalTemasDesbloqueados(
                    res.data[0].cantidadApzjDesbloqueados
                );
            }
        };
    
        cargarProgreso();
    }, []);

    async function guardarProgresoMensajes() {
        const mensaje = listaMensajes(totalConsejosDesbloqueados);

        const mensajeDesbloqueado: MensajeData = {
            progreso: Number(location.pathname.split('/').pop()),
            titulo: mensaje[1],
            descripcion: mensaje[2],
            desbloqueado: true,
        }
        try {
            await saveMensajeDesbloqueado(mensajeDesbloqueado);
            await updateContadorMensajes();
        } catch (error) {
            console.log(error);
        }
    }

    async function guardarProgresoAprendizaje() {
        const tema = listaTemas(totalTemasDesbloqueados);
        const aprendizajeDesbloqueado: AprendizajeData = {
            progreso: Number(location.pathname.split('/').pop()),
            titulo: tema[1],
            contenido: tema[2],
            imagen: tema[3],
            fuente: tema[4],
            video: tema[5],
            desbloqueado: true,
        };
        try {
            await saveAprendizajeDesbloqueado(aprendizajeDesbloqueado);
            await updateContadorAprendizaje();
        } catch (error) {
            console.log(error);
        }
    }
    const TAMANO_CELDA = 70;
    const anchoMapa = mapa[0]?.length ?? 0;
    const altoMapa = mapa.length;

    const anchoMundo = anchoMapa * TAMANO_CELDA;
    const altoMundo = altoMapa * TAMANO_CELDA;

    const posicionJugadorX =
        posicionY * TAMANO_CELDA + TAMANO_CELDA / 2;

    const posicionJugadorY =
        posicionX * TAMANO_CELDA + TAMANO_CELDA / 2;

    const desplazamientoX =
        Math.min(
            0,
            Math.max(
                tamanoCamara.ancho - anchoMundo,
                tamanoCamara.ancho / 2 - posicionJugadorX
            )
        );

    const desplazamientoY =
        Math.min(
            0,
            Math.max(
                tamanoCamara.alto - altoMundo,
                tamanoCamara.alto / 2 - posicionJugadorY
            )
        );
    return (
        <div>
            <div className="flex justify-between items-start mt-10">
                <span className="mb-4 bg-green-100 border-green-500 border-2 px-5 py-2 rounded-xl text-emerald-900 font-bold shadow">
                    🗺️ {etiquetaGame}
                </span>

                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={() => setMostrarProgreso(true)}
                        title="Ver progreso"
                        className="
                w-12 h-12 flex items-center justify-center
                rounded-xl bg-emerald-50
                border-2 border-emerald-300
                shadow-[0_3px_0_#6b9f7a]
                hover:bg-emerald-100 hover:scale-105
                active:translate-y-[2px]
                transition-all duration-150 cursor-pointer
            "
                    >
                        <img
                            src="/img_juego/map-icon.png"
                            alt="Progreso"
                            className="w-9 h-9 object-contain"
                        />
                    </button>

                    {mostrarConsejoAbeja && (
                        <button
                            onClick={() => setMostrarModalAbeja(true)}
                            title="Consejo de abeja"
                            className="
                    w-12 h-12 flex items-center justify-center
                    rounded-xl bg-amber-50
                    border-2 border-amber-300
                    shadow-[0_3px_0_#d6a15c]
                    hover:bg-amber-100 hover:scale-105
                    active:translate-y-[2px]
                    transition-all duration-150 cursor-pointer
                "
                        >
                            <img
                                src="/img_juego/abeja.png"
                                alt="Consejo"
                                className="w-9 h-9 object-contain"
                            />
                        </button>
                    )}
                </div>
            </div>
            {mostrarModalAbeja && (
                <div className="fixed z-50 inset-0 overflow-y-auto bg-opacity-50 flex items-center justify-center">
                    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6 border border-green-200 overflow-hidden relative">
                        <button onClick={() => setMostrarModalAbeja(false)} className='p-2 cursor-pointer left-0' title='Cerrar'> <XIcon className='text-gray-500 hover:text-gray-800' /></button>
                        <ConsejoAbeja />
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center justify-center pb-20 pt-6 sm:pt-10 px-2">
                {mapa && (
                    <div
                        ref={camaraRef}
                        className="relative w-full max-w-[700px] h-[65vh] sm:h-[70vh] overflow-hidden rounded-xl"
                    >
                        <div
                            className="absolute transition-transform duration-200 ease-out"
                            style={{
                                width: `${anchoMundo}px`,
                                height: `${altoMundo}px`,
                                left: `${desplazamientoX}px`,
                                top: `${desplazamientoY}px`,
                                display: 'grid',
                                gridTemplateColumns: `repeat(${mapa[0].length}, ${TAMANO_CELDA}px)`,
                                gridTemplateRows: `repeat(${mapa.length}, ${TAMANO_CELDA}px)`,
                            }}
                        >
                            {mapa.flatMap((fila, i) =>
                                fila.map((celda, j) => {
                                    const index = i * mapa[0].length + j;

                                    if (celda === 'P' || celda === 'A') {
                                        return (
                                            <Celda
                                                key={index}
                                                tipo={celda}
                                                visible={true}
                                                animado={animaciones[i][j]}
                                                onDescubrir={() => descubrir(i, j)}
                                            />
                                        );
                                    }

                                    return (
                                        <Celda
                                            key={index}
                                            tipo={celda}
                                            visible={visibilidad[i][j]}
                                            animado={animaciones[i][j]}
                                            onDescubrir={() => descubrir(i, j)}
                                        />
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
            <br />
            <div className="fixed bottom-0 w-full p-0.1 mt-3 sm:p-2 bg-amber-100 border-t border-amber-300">
                <div className="flex flex-col md:flex-row justify-between items-center px-4 max-w-5xl mx-auto">
                    {/* Botones de dirección */}
                    <div className="flex flex-row space-x-1 sm:space-x-3 mb-1 md:mb-0">
                        <button
                            onClick={arriba}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                   rounded-lg bg-white border-2 border-amber-300
                   shadow-[0_3px_0_#d6a15c]
                   hover:bg-amber-50 hover:border-amber-400
                   active:translate-y-[2px] active:shadow-[0_1px_0_#d6a15c]
                   transition-all duration-100 cursor-pointer"
                            title="Mover Arriba"
                        >
                            <SquareArrowUp
                                size={24}
                                className="sm:w-7 sm:h-7"
                                color="#ce7336"
                                strokeWidth={2.25}
                            />
                        </button>

                        <button
                            onClick={abajo}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                   rounded-lg bg-white border-2 border-amber-300
                   shadow-[0_3px_0_#d6a15c]
                   hover:bg-amber-50 hover:border-amber-400
                   active:translate-y-[2px] active:shadow-[0_1px_0_#d6a15c]
                   transition-all duration-100 cursor-pointer"
                            title="Mover Abajo"
                        >
                            <SquareArrowDown
                                size={24}
                                className="sm:w-7 sm:h-7"
                                color="#ce7336"
                                strokeWidth={2.25}
                            />
                        </button>

                        <button
                            onClick={izquierda}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                   rounded-lg bg-white border-2 border-amber-300
                   shadow-[0_3px_0_#d6a15c]
                   hover:bg-amber-50 hover:border-amber-400
                   active:translate-y-[2px] active:shadow-[0_1px_0_#d6a15c]
                   transition-all duration-100 cursor-pointer"
                            title="Mover Izquierda"
                        >
                            <SquareArrowLeft
                                size={24}
                                className="sm:w-7 sm:h-7"
                                color="#ce7336"
                                strokeWidth={2.25}
                            />
                        </button>

                        <button
                            onClick={derecha}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                   rounded-lg bg-white border-2 border-amber-300
                   shadow-[0_3px_0_#d6a15c]
                   hover:bg-amber-50 hover:border-amber-400
                   active:translate-y-[2px] active:shadow-[0_1px_0_#d6a15c]
                   transition-all duration-100 cursor-pointer"
                            title="Mover Derecha"
                        >
                            <SquareArrowRight
                                size={24}
                                className="sm:w-7 sm:h-7"
                                color="#ce7336"
                                strokeWidth={2.25}
                            />
                        </button>
                    </div>

                    {/* Indicadores de manzanas, nueces y vidas */}
                    <div className="flex flex-row space-x-6 items-center">
                        <p className="font-semibold text-lg flex items-center gap-1">
                            Vidas:
                            {listaVidas.map((item, index) => (
                                <img key={index} src={corazon} alt={item} width={24} height={24} />
                            ))}
                        </p>
                    </div>
                </div>
            </div>
            {mostrarProgreso && (
                <ProgresoJuego
                    nivel={nivel}
                    totalNiveles={cantidadNiveles()}

                    objetivoM={objetivoRecurso.M}
                    objetivoN={objetivoRecurso.N}

                    manzanas={manzanas}
                    nueces={nueces}

                    listaManzanas={listaManzanas}
                    listaNueces={listaNueces}
                    encontroItemEspecial={encontroItemEspecial}

                    vidas={vidas}
                    listaVidas={listaVidas}

                    manzanaIcono="/img_juego/manzana.png"
                    nuezIcono="/img_juego/nuez.png"
                    abejaIcono="/img_juego/abeja.png"
                    corazonIcono={corazon}

                    onSiguiente={continuarProgreso}
                />
            )}
            {mostrarMensaje && (
                <div className="fixed z-50 inset-0 overflow-y-auto bg-black/50 flex items-center justify-center px-4">
                    <div className="w-full max-w-md bg-amber-100 border-2 border-green-700 rounded-2xl p-6 shadow-xl">

                        <h2 className="text-3xl font-bold text-center mb-2 text-emerald-900">
                            {gano ? "¡JUEGO COMPLETADO!" : "¡JUEGO TERMINADO!"}
                        </h2>

                        <p className="text-center text-lg font-semibold text-gray-700 mb-5">
                            {gano
                                ? "¡Lograste recorrer los cinco laberintos!"
                                : "No lograste completar el objetivo diario."}
                        </p>

                        {/* Resumen */}
                        <div className="bg-white rounded-xl border border-amber-300 p-4 space-y-3">

                            <h3 className="text-lg font-bold text-emerald-900 border-b pb-2">
                                Resumen de la partida
                            </h3>

                            {/* Laberintos */}
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">
                                    Laberintos recorridos
                                </span>

                                <span className="font-bold text-emerald-800">
                                    {gano ? 5 : nivel} / 5
                                </span>
                            </div>

                            {/* Aprendizajes */}
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">
                                    Aprendizajes desbloqueados
                                </span>

                                <span className="font-bold text-emerald-800">
                                    {Math.floor(manzanas / 3)} / {objetivoRecurso.M / 3}
                                </span>
                            </div>

                            {/* Consejos */}
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">
                                    Consejos desbloqueados
                                </span>

                                <span className="font-bold text-emerald-800">
                                    {Math.floor(nueces / 3)} / {objetivoRecurso.N / 3}
                                </span>
                            </div>

                            {/* Objetos */}
                            <div>
                                <p className="font-semibold text-gray-700 mb-2">
                                    Objetos encontrados
                                </p>

                                <div className="flex items-center gap-2 flex-wrap">
                                    {listaManzanas.map((_, index) => (
                                        <img
                                            key={`manzana-${index}`}
                                            src="/img_juego/manzana.png"
                                            alt="Manzana"
                                            className="w-8 h-8 object-contain"
                                        />
                                    ))}

                                    {listaNueces.map((_, index) => (
                                        <img
                                            key={`nuez-${index}`}
                                            src="/img_juego/nuez.png"
                                            alt="Nuez"
                                            className="w-8 h-8 object-contain"
                                        />
                                    ))}

                                    {encontroItemEspecial && (
                                        <img
                                            src="/img_juego/abeja.png"
                                            alt="Abeja"
                                            className="w-8 h-8 object-contain"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Vidas */}
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">
                                    Vidas restantes
                                </span>

                                <div className="flex gap-1">
                                    {listaVidas.map((_, index) => (
                                        <img
                                            key={`vida-${index}`}
                                            src={corazon}
                                            alt="Vida"
                                            className="w-6 h-6 object-contain"
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>

                        {aviso !== '' && (
                            <p className="mt-4 text-sm text-gray-700 text-center">
                                {aviso}
                            </p>
                        )}

                        <p className="mt-4 text-sm text-gray-600 text-center">
                            Este es un juego diario. Podrás intentarlo nuevamente mañana.
                        </p>

                        <div className="flex justify-center mt-5">
                            <button
                                onClick={cerrarMensaje}
                                className="bg-emerald-700 hover:bg-emerald-800
                               text-white font-bold rounded-xl
                               px-6 py-2.5 cursor-pointer
                               transition-colors"
                            >
                                Entendido
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

