import { useEffect, useState } from "react";
import { listaMensajes, cantidadMensjaes } from "../../assets/utils/ConsejosGame";

export function Consejo() {
    const [indiceConsejo, setIndiceConsejo] = useState(0);
    const [consejoVisible, setConsejoVisible] = useState(true);

    useEffect(() => {
        const total = cantidadMensjaes();
    
        if (total === 0) return;
    
        setIndiceConsejo(0);
        setConsejoVisible(true);
    
        let temporizadorCambio: ReturnType<typeof setTimeout>;
        let temporizadorMostrar: ReturnType<typeof setTimeout>;
    
        const programarCambio = () => {
            const tiempo = Math.floor(Math.random() * 20001) + 20000;
            temporizadorCambio = setTimeout(() => {
                setConsejoVisible(false);
                temporizadorMostrar = setTimeout(() => {
                    setIndiceConsejo((actual) => (actual + 1) % total);
                    setConsejoVisible(true);    
                    programarCambio();
                }, 700);
            }, tiempo);
        };
    
        programarCambio();
    
        return () => {
            clearTimeout(temporizadorCambio);
            clearTimeout(temporizadorMostrar);
        };
    
    }, []);
    
    if (listaMensajes.length === 0) return null;

    const mensajeActual = listaMensajes(indiceConsejo);

    return (
        <div className="max-w-4xl mx-auto w-full px-4 mt-10">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-7 bg-lime-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">
                    Consejo para tu jardín
                </h2>
            </div>
            <div className={`relative overflow-hidden rounded-2xl border border-yellow-300 bg-yellow-50 shadow-sm p-6 md:p-8 transition-opacity duration-700 ${consejoVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
    
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-gray-500">
                            Consejo {mensajeActual[0]} de {cantidadMensjaes()}
                        </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">
                        {mensajeActual[1]}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                        {mensajeActual[2]}
                    </p>
                </div>
            </div>
        </div>
    );
}