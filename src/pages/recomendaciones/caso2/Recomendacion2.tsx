import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Leaf, Trees, Download, Flower2, Cannabis } from "lucide-react"
import { TipoPlanta, Clima, plantas, EtapasArbol, EtapasArbusto, EtapasFlor, EtapasSuculenta, estimarFrecuenciaRiego} from '../../../assets/utils/recomendaciones';

interface Planta {
    especie: string;
    tipo: string;
    etapa: string;
}
type Respuesta = {
    laPlanta: Planta;
    tierra: string;
    clima: string;
    hojas:string;
}

export function RecomendacionTipo2({laPlanta, tierra, clima, hojas}: Respuesta){
    const divRef = useRef(null);
    
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
        switch(value){
            case 'arbol':
                return TipoPlanta.Arbol
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

    const estimacionRiego =
    (laPlanta.tipo && laPlanta.etapa && clima && tierra) 
    ? (() => {
        const tipoEnum = toTipoPlanta(laPlanta.tipo);
        if (!tipoEnum) return null; // si llega algo raro

        return estimarFrecuenciaRiego(
          tipoEnum,                        // ahora es TipoPlanta
          laPlanta.etapa as keyof (EtapasArbol | EtapasArbusto | EtapasFlor | EtapasSuculenta),
          clima as Clima,
          tierra
        );
      })()
    : null;

    return (
        <div>
            {laPlanta.especie !== '' &&(
            <div>
                <div ref={divRef} className='p-5 bg-green-200 rounded-lg max-w-lg ml-5 mr-5'>
                    <p className='text-center font-semibold'> Cuidados Basicos </p>
                    <p className='text-center'> {laPlanta.especie.charAt(0).toUpperCase()+laPlanta.especie.slice(1).toLowerCase()}</p>
                    <br />
                    {laPlanta.tipo && (
                            <div className="flex flex-col items-center">
                            <div className="bg-lime-200 rounded-full p-3">
                                {laPlanta.tipo === "arbol" && <Trees className="w-10 h-10 text-lime-700" />}
                                {laPlanta.tipo === "suculenta" && <Leaf className="w-10 h-10 text-lime-700" />}
                                {laPlanta.tipo === "flor" && <Flower2 className="w-10 h-10 text-lime-700" />}
                                {laPlanta.tipo === "arbusto" && <Cannabis className="w-10 h-10 text-lime-700" />}
                            </div>
                            </div>
                        )}
                    {tierra !== "" &&(
                        <div className='m-1.5'>
                           <p className='font-semibold'> Sobre la tierra </p>
                           <p className='font-sans text-sm ml-1.5'> - {plantas[laPlanta.tipo].tierra[tierra]}</p>
                        </div>
                    )}
                    <br />
                    {clima &&(
                        <div className='m-1.5'>
                            <p className='font-semibold'> Sobre el Clima </p>
                            <p className='font-sans text-sm ml-1.5'> -{plantas[laPlanta.tipo].clima[clima]} </p>
                        </div>
                    )}
                    <br />
                    {hojas !== "" &&(
                        <div className='m-1.5'>
                            <p className='font-semibold'> Sobre las hojas </p>
                            <p className='font-sans text-sm ml-1.5'> - {plantas[laPlanta.tipo].hojas[hojas]} </p>
                        </div>
                    )}
                    {clima && tierra &&(
                        <div className="mt-4 p-3 bg-white rounded-lg shadow-md text-center">
                            <p className="font-semibold">💧 Frecuencia de riego recomendada</p>
                            <p className="text-sm">
                                Un riego entre <span className="font-bold">{estimacionRiego}</span> 
                            </p>
                        </div>  
                    )}
                </div>
                <button onClick={descargarRecomendacion} className="mt-4 cursor-pointer bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded" title='Descargar recomendacion en .jpg'>
                    <Download />
                </button>
            </div>
            )}
        </div>
    )
}