import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CameraIcon, FileTextIcon, TreePineIcon, XIcon } from 'lucide-react';
import { TabFoto } from './TabFoto';

interface Planta {
    id: number;
    especie: string;
    tipo: string;
    etapa: string;
    descripcion: string;
    foto: string;
}

interface PlantaProps {
    plantaGuardada: Planta;
    recargar: () => void;
}

export function Tarjeta({ plantaGuardada, recargar }: PlantaProps) {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [cambiarFoto, setCambiarFoto] = useState(false);

    const formatear = (palabra: string) => {
        if (!palabra) return '';
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    };

    const enlace = `/aportes-plantas/${plantaGuardada.id}`;

    return (
        <>
            {/* Tono verde original (bg-lime-100) con borde sutil */}
            <div className="group bg-lime-100 border border-lime-200 hover:border-lime-400 rounded-xl p-3 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5">
                
                {/* Contenedor de imagen de tamaño fijo (cuadrado perfecto para fotos de celular) */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg overflow-hidden bg-lime-50 border border-lime-300/60">
                    <img
                        src={plantaGuardada.foto}
                        alt={plantaGuardada.especie}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                        onClick={() => setCambiarFoto(true)}
                        title="Cambiar foto"
                        className="absolute bottom-1.5 right-1.5 bg-teal-700/90 hover:bg-teal-800 text-white p-1.5 rounded-md shadow-sm transition-colors cursor-pointer"
                    >
                        <CameraIcon className="w-4 h-4" />
                    </button>
                </div>

                {/* Información y acciones */}
                <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[6rem] sm:min-h-[7rem]">
                    <div>
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-gray-800 text-base sm:text-lg truncate">
                                {formatear(plantaGuardada.especie)}
                            </h3>
                            <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-lime-200/80 text-lime-900 border border-lime-300">
                                {formatear(plantaGuardada.etapa)}
                            </span>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                            Tipo: <span className="font-medium text-gray-800">{formatear(plantaGuardada.tipo)}</span>
                        </p>
                    </div>

                    {/* Botones lado a lado en fila */}
                    <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-lime-200/90">
                        <button
                            onClick={() => setModalAbierto(true)}
                            className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-green-900 bg-lime-200/80 hover:bg-lime-300/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                        >
                            <FileTextIcon className="w-3.5 h-3.5 shrink-0" />
                            <span>Descripción</span>
                        </button>

                        {plantaGuardada.tipo.toLowerCase() === 'arbol' && (
                            <a
                                href={enlace}
                                className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-teal-900 bg-teal-200/70 hover:bg-teal-300/70 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                            >
                                <TreePineIcon className="w-3.5 h-3.5 shrink-0" />
                                <span>Historial de carbono</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL 1: Descripción completa */}
            {modalAbierto &&
                createPortal(
                    <div
                        onClick={() => setModalAbierto(false)}
                        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b border-lime-200 bg-lime-100">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {formatear(plantaGuardada.especie)}
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        {formatear(plantaGuardada.tipo)} • Etapa: {formatear(plantaGuardada.etapa)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setModalAbierto(false)}
                                    className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-lime-200/70 transition-colors cursor-pointer"
                                    title="Cerrar"
                                >
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-5 overflow-y-auto space-y-4">
                                <div className="w-full h-56 rounded-xl overflow-hidden bg-lime-50 border border-lime-200">
                                    <img
                                        src={plantaGuardada.foto}
                                        alt={plantaGuardada.especie}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                                        Descripción
                                    </h4>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                        {plantaGuardada.descripcion || 'Sin descripción registrada.'}
                                    </p>
                                </div>
                            </div>

                            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setModalAbierto(false)}
                                    className="bg-lime-200 hover:bg-lime-300 text-green-900 text-sm font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            {/* MODAL 2: Cambiar foto */}
            {cambiarFoto &&
                createPortal(
                    <div
                        onClick={() => setCambiarFoto(false)}
                        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white border border-lime-300 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-5 py-3.5 border-b border-lime-200 bg-lime-100">
                                <h3 className="font-semibold text-gray-800">
                                    Actualizar foto — {formatear(plantaGuardada.especie)}
                                </h3>
                                <button
                                    onClick={() => setCambiarFoto(false)}
                                    className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-lime-200/70 transition-colors cursor-pointer"
                                    title="Cerrar"
                                >
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-4 overflow-y-auto">
                                <TabFoto
                                    idPlanta={plantaGuardada.id}
                                    nombrePlanta={plantaGuardada.especie}
                                    recargar={recargar}
                                    onActualizado={() => {
                                        recargar();
                                        setCambiarFoto(false);
                                    }}
                                />
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}