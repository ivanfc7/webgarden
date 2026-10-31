import { useRef } from 'react';
import { toPng } from 'html-to-image';
import {Leaf, Trees, Download, Flower2, Cannabis, Sprout, CloudSun, Droplets,Mountain} from "lucide-react";
import {TipoPlanta, Clima, plantas, EtapasArbol, EtapasArbusto, EtapasFlor, EtapasSuculenta, estimarFrecuenciaRiego} from '../../../assets/utils/recomendaciones';

interface Planta {
    especie: string;
    tipo: string;
    etapa: string;
}

type Respuesta = {
    laPlanta: Planta;
    tierra: string;
    clima: string;
    hojas: string;
}

export function RecomendacionTipo2({laPlanta, tierra, clima, hojas}: Respuesta) {
    const divRef = useRef<HTMLDivElement>(null);
    const descargarRecomendacion = async () => {
        if (!divRef.current) return;
        const dataUrl = await toPng(divRef.current);
        const fecha = new Date();
        const fechaFormateada = fecha.toISOString()
            .replace(/[:.]/g, '-')
            .slice(0, 19);
        const link = document.createElement('a');
        link.download = `recomendacion-${fechaFormateada}.png`;
        link.href = dataUrl;
        link.click();
    };

    function toTipoPlanta(value: string): TipoPlanta | null {
        switch (value) {
            case 'arbol':
                return TipoPlanta.Arbol;
            case 'arbusto':
                return TipoPlanta.Arbusto;
            case 'flor':
                return TipoPlanta.Flor;
            case 'suculenta':
                return TipoPlanta.Suculenta;
            default:
                return null;
        }
    }

    const significadoHojas = [
        { nombre: 'tipoA', significado: 'hojas amarillas y sin brillo' },
        { nombre: 'tipoB', significado: 'hojas nuevas pequeñas' },
        { nombre: 'tipoC', significado: 'hojas con manchas o secas' },
        { nombre: 'tipoD', significado: 'Hojas blandas' },
        { nombre: 'tipoE', significado: 'hojas con pequeños agujeros' },
        { nombre: 'tipoF', significado: 'hojas con manchas oscuras' }
    ];
    const significadoHoja = significadoHojas.find(
        item => item.nombre === hojas
    )?.significado;

    const estimacionRiego =
        (laPlanta.tipo && laPlanta.etapa && clima && tierra)
            ? (() => {
                const tipoEnum = toTipoPlanta(laPlanta.tipo);
                if (!tipoEnum) return null;

                return estimarFrecuenciaRiego(
                    tipoEnum,
                    laPlanta.etapa as keyof (
                        EtapasArbol |
                        EtapasArbusto |
                        EtapasFlor |
                        EtapasSuculenta
                    ),
                    clima as Clima,
                    tierra
                );
            })()
            : null;

    return (
        <div className="w-full">
            {laPlanta.especie !== '' && (
                <div className="max-w-xl mx-auto px-4">
                    {/* TÍTULO EXTERIOR */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-7 bg-lime-600 rounded-full" />
                        <p className="text-xl dark:text-teal-900 font-semibold">
                            Recomendaciones de cuidado
                        </p>
                    </div>
                    {/* AFICHE */}
                    <div ref={divRef} className="w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-lg bg-[#F8FAF3] text-[#354B35]">
                        {/* ENCABEZADO */}
                        <div className="relative overflow-hidden bg-[#E1F0D7] px-5 py-7 text-center">
                            {/* Decoración superior */}
                            <div className="relative z-10">
                                <p className="text-xs font-bold tracking-[0.2em] text-[#47733D]">
                                    WEBGARDEN · GUÍA DE CUIDADOS
                                </p>
                                <h2 className="text-2xl font-bold text-[#244D2C] mt-3">
                                    Cuidados básicos
                                </h2>
                                <p className="text-xl font-semibold capitalize text-[#47733D] mt-2">
                                    {laPlanta.especie.charAt(0).toUpperCase() +
                                        laPlanta.especie.slice(1).toLowerCase()}
                                </p>
                                {laPlanta.tipo && (
                                    <div className="flex flex-col items-center mt-4">
                                        <div className="w-20 h-20 rounded-full bg-[#C9E5B7] flex items-center justify-center">
                                            {laPlanta.tipo === "arbol" &&
                                                <Trees className="w-11 h-11 text-[#47733D]" />
                                            }
                                            {laPlanta.tipo === "suculenta" &&
                                                <Leaf className="w-11 h-11 text-[#47733D]" />
                                            }
                                            {laPlanta.tipo === "flor" &&
                                                <Flower2 className="w-11 h-11 text-[#47733D]" />
                                            }
                                            {laPlanta.tipo === "arbusto" &&
                                                <Cannabis className="w-11 h-11 text-[#47733D]" />
                                            }
                                        </div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#47733D] mt-3">
                                            {laPlanta.tipo}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* CONTENIDO INFORMATIVO */}
                        <div className="p-5 space-y-4">
                            {/* TIERRA */}
                            {tierra !== "" && (
                                <section className="bg-[#EDF4E8] rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 shrink-0 rounded-full bg-[#D5E9C9] flex items-center justify-center">
                                            <Mountain className="w-6 h-6 text-[#47733D]" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base text-[#315D36]">
                                                Sobre la tierra
                                            </h3>
                                            <p className="text-xs text-[#668263]">
                                                Para las características de un suelo {tierra}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-t border-[#D5E3CE] my-3" />
                                    <p className="text-sm leading-relaxed text-[#354B35]">
                                        {plantas[laPlanta.tipo].tierra[tierra]}
                                    </p>
                                </section>
                            )}
                            {/* CLIMA */}
                            {clima && (
                                <section className="bg-[#EDF3F8] rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 shrink-0 rounded-full bg-[#D8E8F3] flex items-center justify-center">
                                            <CloudSun className="w-6 h-6 text-sky-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base text-[#315D36]">
                                                Sobre el clima
                                            </h3>
                                            <p className="text-xs text-[#668263]">
                                                Considerando un clima {clima}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-t border-[#D5E3CE] my-3" />
                                    <p className="text-sm leading-relaxed text-[#354B35]">
                                        {plantas[laPlanta.tipo].clima[clima]}
                                    </p>
                                </section>
                            )}
                            {/* HOJAS */}
                            {hojas !== "" && (
                                <section className="bg-[#F1F0E3] rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 shrink-0 rounded-full bg-[#E3E5C8] flex items-center justify-center">
                                            <Sprout className="w-6 h-6 text-[#66813C]" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base text-[#315D36]">
                                                Sobre las hojas
                                            </h3>

                                            <p className="text-xs text-[#668263]">
                                                Si identificas {significadoHoja}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-t border-[#D5E3CE] my-3" />
                                    <p className="text-sm leading-relaxed text-[#354B35]">
                                        {plantas[laPlanta.tipo].hojas[hojas]}
                                    </p>
                                </section>
                            )}
                            {/* FRECUENCIA DE RIEGO */}
                            {clima && tierra && (
                                <section className="bg-[#E1F0D7] border-2 border-[#A5C98A] rounded-xl p-4">
                                    <div className="flex items-center justify-center gap-2 mb-3">
                                        <Droplets className="w-6 h-6 text-sky-700" />
                                        <h3 className="font-bold text-base text-[#315D36] text-center">
                                            Frecuencia de riego recomendada segun el clima {clima} y el suelo {tierra}
                                        </h3>
                                    </div>
                                    <div className="bg-white/70 rounded-lg p-3 text-center">
                                        <p className="text-sm text-[#47733D]">
                                            Un riego entre
                                        </p>
                                        <p className="text-xl font-bold text-[#315D36] mt-1">
                                            {estimacionRiego}
                                        </p>
                                    </div>
                                    <p className="text-xs text-center text-[#668263] mt-3">
                                        La frecuencia puede variar según las condiciones de la planta.
                                    </p>
                                </section>
                            )}
                        </div>

                        {/* PIE DEL AFICHE */}
                        <div className="bg-[#315D36] px-5 py-5 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="h-px w-10 bg-white/60" />
                                <div className="flex items-center gap-2">
                                    <Leaf className="w-5 h-5 text-lime-300" />
                                    <p className="text-lg font-bold text-white">
                                        WebGarden
                                    </p>
                                </div>
                                <div className="h-px w-10 bg-white/60" />
                            </div>
                            <p className="text-xs text-green-100 mt-2">
                                Conoce tus plantas y aprende a cuidarlas.
                            </p>
                        </div>
                    </div>
                    {/* BOTÓN DESCARGAR */}
                    <div className="flex justify-center mt-5 mb-6">
                        <button onClick={descargarRecomendacion}
                            className="flex items-center gap-2 cursor-pointer bg-lime-600 hover:bg-lime-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                            title="Descargar recomendación en formato PNG"
                        >
                            <Download size={19} />
                            Descargar afiche
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
