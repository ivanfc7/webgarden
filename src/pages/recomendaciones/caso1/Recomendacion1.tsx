import { useRef } from 'react';
import { toPng } from 'html-to-image';
import {
    Leaf,
    Trees,
    Download,
    Flower2,
    Sprout,
    MapPin,
    Shovel,
    Layers,
    Sparkles,
} from 'lucide-react';
import { plantas } from '../../../assets/utils/recomendaciones';

type Respuesta = {
    especie: string;
    tipoPlanta: string;
    etapa: number;
    descripcion: string;
};

export function RecomendacionTipo1({ especie, tipoPlanta, etapa, descripcion }: Respuesta) {
    const divRef = useRef<HTMLDivElement>(null);

    const descargarRecomendacion = async () => {
        if (!divRef.current) return;

        const dataUrl = await toPng(divRef.current, { pixelRatio: 2 });

        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString('es-BO').replace(/\//g, '-');

        const link = document.createElement('a');
        link.download = `guia-${especie.toLowerCase().replace(/\s+/g, '-')}-${fechaFormateada}.png`;
        link.href = dataUrl;
        link.click();
    };

    const iconos = {
        arbol: Trees,
        suculenta: Leaf,
        flor: Flower2,
        arbusto: Sprout,
    };

    const IconoPlanta = iconos[tipoPlanta as keyof typeof iconos] || Leaf;
    const informacion = plantas[tipoPlanta];
    const infoEtapa = etapa !== -1 ? informacion?.etapa?.[etapa] : null;

    return (
        <div className="w-full">
            {especie.length !== 0 && informacion && (
                <div className="max-w-xl mx-auto px-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-7 bg-lime-600 rounded-full" />
                        <p className="text-xl font-semibold dark:text-teal-900">
                            Recomendaciones para plantar
                        </p>
                    </div>

                    {/* AFICHE */}
                    <div
                        ref={divRef}
                        className="w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-lg bg-[#F8FAF3] text-[#354B35]"
                    >
                        {/* ENCABEZADO */}
                        <div className="bg-[#E1F0D7] px-6 py-6 text-center">
                            <p className="text-xs font-bold tracking-[0.2em] text-[#47733D]">
                                WEBGARDEN · {informacion.subtituloAfiche}
                            </p>
                            <p className="text-2xl font-extrabold capitalize text-[#315D36] mt-1.5">
                                {especie}
                            </p>

                            <div className="w-20 h-20 mx-auto mt-3.5 rounded-full bg-[#C9E5B7] flex items-center justify-center">
                                <IconoPlanta className="w-11 h-11 text-[#47733D]" />
                            </div>
                        </div>

                        {/* CONTENIDO */}
                        <div className="p-5 space-y-4">
                            {/* PASO 01: UBICACIÓN */}
                            <section>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-lime-700 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                        01
                                    </span>
                                    <h3 className="font-bold text-sm tracking-wide text-[#315D36]">
                                        ELIGE EL LUGAR ADECUADO
                                    </h3>
                                </div>
                                <div className="flex gap-2.5 items-start pl-1">
                                    <MapPin className="w-4 h-4 text-lime-700 shrink-0 mt-1" />
                                    <p className="text-sm leading-relaxed">
                                        {informacion.ubicacion}
                                    </p>
                                </div>
                            </section>

                            <div className="border-t border-[#D8E3D2]" />

                            {/* PASO 02: CÓMO PLANTARLA SEGÚN SU ETAPA */}
                            {infoEtapa && (
                                <>
                                    <section>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-lime-700 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                                02
                                            </span>
                                            <h3 className="font-bold text-sm tracking-wide text-[#315D36]">
                                                CÓMO PLANTARLA
                                            </h3>
                                        </div>

                                        <div className="flex gap-2.5 items-start pl-1">
                                            <Shovel className="w-4 h-4 text-lime-700 shrink-0 mt-1" />
                                            <div className="space-y-2">
                                                <p className="text-sm leading-relaxed">
                                                    {infoEtapa.instruccion}
                                                </p>

                                                <div className="bg-[#EBF4E4] border border-[#CFE2C2] rounded-lg px-3 py-2 flex items-start gap-2">
                                                    <Sparkles className="w-4 h-4 text-lime-700 shrink-0 mt-0.5" />
                                                    <p className="text-xs leading-relaxed">
                                                        <strong className="text-[#315D36]">Consejo: </strong>
                                                        {infoEtapa.tipClave}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="border-t border-[#D8E3D2]" />
                                </>
                            )}

                            {/* PASO 03: TIPO DE TIERRA / SUSTRATO */}
                            <section>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-lime-700 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                        {infoEtapa ? '03' : '02'}
                                    </span>
                                    <h3 className="font-bold text-sm tracking-wide text-[#315D36]">
                                        TIPO DE TIERRA IDEAL
                                    </h3>
                                </div>
                                <div className="flex gap-2.5 items-start pl-1">
                                    <Layers className="w-4 h-4 text-lime-700 shrink-0 mt-1" />
                                    <p className="text-sm leading-relaxed">
                                        {informacion.sustrato}
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* PIE DEL AFICHE */}
                        <div className="bg-[#315D36] px-5 py-4 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="h-px w-10 bg-white/60" />
                                <div className="flex items-center gap-2">
                                    <Leaf className="w-5 h-5 text-lime-300" />
                                    <p className="text-lg font-bold text-white">WebGarden</p>
                                </div>
                                <div className="h-px w-10 bg-white/60" />
                            </div>
                            <p className="text-xs text-green-100 mt-1.5">
                                Conoce tus plantas y aprende a cuidarlas.
                            </p>
                        </div>
                    </div>

                    {/* BOTÓN DESCARGAR */}
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