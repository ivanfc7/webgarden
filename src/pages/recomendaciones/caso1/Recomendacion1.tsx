import { useRef } from 'react';
import { toPng } from 'html-to-image';
import {Leaf, Trees, Download, Flower2, Cannabis, MapPin, Ruler, Shovel, Droplets,} from 'lucide-react';
import { plantas } from '../../../assets/utils/recomendaciones';

type Respuesta = {
    especie: string;
    tipoPlanta: string;
    etapa: number;
    descripcion: string;
}

export function RecomendacionTipo1({especie, tipoPlanta, etapa, descripcion}: Respuesta) {
    const divRef = useRef<HTMLDivElement>(null);
    const descargarRecomendacion = async () => {
        if (!divRef.current) return;

        const dataUrl = await toPng(divRef.current);

        const fecha = new Date();
        const fechaFormateada = fecha
            .toLocaleDateString('es-BO')
            .replace(/\//g, '-');

        const link = document.createElement('a');
        link.download = `recomendacion-${fechaFormateada}.png`;
        link.href = dataUrl;
        link.click();
    };
    console.log(descripcion);
    const iconos = {
        arbol: Trees,
        suculenta: Leaf,
        flor: Flower2,
        arbusto: Cannabis
    };

    const IconoPlanta = iconos[tipoPlanta as keyof typeof iconos];
    const informacion = plantas[tipoPlanta];

    const significadoEtapa = [
        { nombre: 0, significado: 'Semilla' },
        { nombre: 1, significado: 'plantin' },
        { nombre: 2, significado: 'planta joven'},
    ];
    const significadoEtapas = significadoEtapa.find(
        item => item.nombre === etapa
    )?.significado;

    return (
        <div className="w-full">
            {especie.length !==0 && informacion && (
                <div className="max-w-xl mx-auto px-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-7 bg-lime-600 rounded-full" />
                        <p className="text-xl font-semibold dark:text-teal-900">
                            Recomendaciones para plantar
                        </p>
                    </div>
                    {/* AFICHE */}
                    <div ref={divRef} className="w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-lg bg-[#F8FAF3] text-[#354B35]">
                        {/* ENCABEZADO */}
                        <div className="bg-[#E1F0D7] px-6 py-7 text-center">
                            <p className="text-xs font-bold tracking-[0.2em] text-[#47733D]">
                                WEBGARDEN · GUÍA DE PLANTACIÓN
                            </p>                        
                            <p className="text-lg font-semibold capitalize text-[#47733D] mt-2">
                                {especie}
                            </p>
                            {IconoPlanta && (
                                <div className="w-20 h-20 mx-auto mt-4 rounded-full bg-[#C9E5B7] flex items-center justify-center">
                                    <IconoPlanta
                                        className="w-11 h-11 text-[#47733D]"
                                    />
                                </div>
                            )}
                            <p className="text-xs uppercase tracking-widest font-bold text-[#47733D] mt-3">
                                {tipoPlanta}
                            </p>

                        </div>
                        {/* CONTENIDO */}
                        <div className="p-5 space-y-5">
                            {/* PASO 1: UBICACIÓN */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-lime-700 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                                        01
                                    </span>
                                    <h3 className="font-bold text-base text-[#315D36]">
                                        ELIGE EL LUGAR ADECUADO
                                    </h3>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <MapPin className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
                                    <p className="text-sm leading-relaxed">
                                        {informacion.ubicacion}
                                    </p>
                                </div>
                                <div className="mt-3 ml-8 bg-[#E7F1DF] rounded-xl p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Ruler className="w-4 h-4 text-lime-800" />
                                        <p className="text-xs font-bold text-[#47733D]">
                                            SEPARACIÓN RECOMENDADA
                                        </p>
                                    </div>
                                    <p className="text-sm font-semibold text-[#315D36]">
                                        {informacion.separacion}
                                    </p>
                                </div>
                            </section>
                            <div className="border-t border-[#D8E3D2]" />
                            {/* PASO 2: PROFUNDIDAD */}
                            {etapa !== -1 && informacion.etapa[etapa] && (
                                <section>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-lime-700 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                                            02
                                        </span>

                                        <h3 className="font-bold text-base text-[#315D36]">
                                            PREPARA EL TERRENO
                                        </h3>
                                    </div>

                                    <div className="flex gap-3 items-start">
                                        <Shovel className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-sm">
                                                Profundidad de plantado para la etapa de: {significadoEtapas}
                                            </p>

                                            <p className="text-sm leading-relaxed mt-1">
                                                {informacion.etapa[etapa].profundidad}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            )}
                            <div className="border-t border-[#D8E3D2]" />
                            {/* PASO 3: RIEGO */}
                            {etapa !== -1 && informacion.etapa[etapa] && (
                                <section>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-lime-700 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                                            03
                                        </span>

                                        <h3 className="font-bold text-base text-[#315D36]">
                                            REALIZA EL PRIMER RIEGO
                                        </h3>
                                    </div>

                                    <div className="flex gap-3 items-start">
                                        <Droplets className="w-6 h-6 text-sky-600 shrink-0" />

                                        <p className="text-sm leading-relaxed">
                                            {informacion.etapa[etapa].riego}
                                        </p>
                                    </div>

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

                    {/* DESCARGAR */}

                    <div className="flex justify-center mt-5 mb-6">
                        <button
                            onClick={descargarRecomendacion}
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
