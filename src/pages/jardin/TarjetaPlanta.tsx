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
            <div className="group bg-white border border-lime-200/80 hover:border-lime-400 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                
                {/* Contenedor de imagen de tamaño fijo (evita deformación con fotos verticales de celular) */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg overflow-hidden bg-lime-50 border border-lime-100">
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
                            <span className="shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full bg-lime-100 text-lime-800 border border-lime-200">
                                {formatear(plantaGuardada.etapa)}
                            </span>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                            Tipo: <span className="font-medium text-gray-700">{formatear(plantaGuardada.tipo)}</span>
                        </p>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-gray-100">
                        <button
                            onClick={() => setModalAbierto(true)}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                            <FileTextIcon className="w-4 h-4" />
                            Descripción
                        </button>

                        {plantaGuardada.tipo.toLowerCase() === 'arbol' && (
                            <a
                                href={enlace}
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg transition-colors"
                            >
                                <TreePineIcon className="w-4 h-4" />
                                Captura de Carbono
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL 1: Descripción completa (renderizado en document.body para evitar el Navbar) */}
            {modalAbierto &&
                createPortal(
                    <div
                        onClick={() => setModalAbierto(false)}
                        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                        >
                            {/* Cabecera del modal */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {formatear(plantaGuardada.especie)}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {formatear(plantaGuardada.tipo)} • Etapa: {formatear(plantaGuardada.etapa)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setModalAbierto(false)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                                    title="Cerrar"
                                >
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Contenido con scroll */}
                            <div className="p-5 overflow-y-auto space-y-4">
                                <div className="w-full h-56 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
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

                            {/* Pie del modal */}
                            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setModalAbierto(false)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            {/* MODAL 2: Cambiar foto (renderizado en document.body para evitar el Navbar) */}
            {cambiarFoto &&
                createPortal(
                    <div
                        onClick={() => setCambiarFoto(false)}
                        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white border border-green-600/30 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-lime-50/50">
                                <h3 className="font-semibold text-gray-800">
                                    Actualizar foto — {formatear(plantaGuardada.especie)}
                                </h3>
                                <button
                                    onClick={() => setCambiarFoto(false)}
                                    className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-200/70 transition-colors cursor-pointer"
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