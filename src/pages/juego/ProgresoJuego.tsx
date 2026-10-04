type Props = {
    nivel: number;
    totalNiveles: number;
    objetivoM: number;
    objetivoN: number;
    manzanas: number;
    nueces: number;
    listaManzanas: string[];
    listaNueces: string[];
    encontroItemEspecial: boolean;
    vidas: number;
    listaVidas: string[];
    manzanaIcono: string;
    nuezIcono: string;
    abejaIcono: string;
    corazonIcono: string;
    onSiguiente: () => void;
};

export function ProgresoJuego({
    nivel,
    totalNiveles,
    objetivoM,
    objetivoN,
    manzanas,
    nueces,
    listaManzanas,
    listaNueces,
    encontroItemEspecial,
    listaVidas,
    manzanaIcono,
    nuezIcono,
    abejaIcono,
    corazonIcono,
    onSiguiente
}: Readonly<Props>) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-sm bg-white border-2 border-amber-200 rounded-2xl shadow-xl p-5">
                <h2 className="text-center text-xl font-bold text-emerald-900 mb-5">PROGRESO DEL JUEGO</h2>
                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-700">Laberinto</span>
                    <span className="font-bold text-emerald-800">{nivel + 1} / {totalNiveles}</span>
                </div>
                <div className="border-t border-amber-100 pt-3">
                    <h3 className="font-bold text-amber-800 mb-3">OBJETIVO DIARIO</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Manzanas</span>
                            <span>{manzanas} / {objetivoM}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Nueces</span>
                            <span>{nueces} / {objetivoN}</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-amber-100 pt-3 mt-4">
                    <h3 className="font-bold text-amber-800 mb-3">OBJETOS ENCONTRADOS</h3>
                    <div className="flex flex-wrap gap-2">
                        {listaManzanas.map((item, index) => (
                            <img key={`manzana-${index}`} src={manzanaIcono} alt="Manzana" className="w-8 h-8 object-contain"/>
                        ))}

                        {listaNueces.map((item, index) => (
                            <img key={`nuez-${index}`} src={nuezIcono} alt="Nuez" className="w-8 h-8 object-contain"/>
                        ))}

                        {encontroItemEspecial && (
                            <img src={abejaIcono} alt="Abeja" className="w-8 h-8 object-contain" />
                        )}
                    </div>
                </div>

                <div className="border-t border-amber-100 pt-3 mt-4">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Vidas</span>
                        <div className="flex gap-1">
                            {listaVidas.map((item, index) => (
                                <img
                                    key={`vida-${index}`}
                                    src={corazonIcono}
                                    alt="Vida"
                                    className="w-6 h-6"/>
                            ))}
                        </div>
                    </div>
                </div>

                <button onClick={onSiguiente} className="w-full mt-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 active:scale-[0.98] transition-all cursor-pointer">Vamos</button>
            </div>
        </div>
    );
}