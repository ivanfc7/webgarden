import { useNavigate } from "react-router-dom";
import { BarraNavegacion } from "../../components/BarraNavegacion";
import { ArrowLeftSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { getAprendizajeDesbloqueado } from "../../assets/utils/sistema.api";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router-dom";

interface AprendizajeData {
    id: number;
    titulo: string;
    contenido: string;
    imagen: string;
    fuente: string;
    video: string;
    desbloqueado: boolean;
}

export function VistaAprendizaje(){
    const [expandidoIndex, setExpandidoIndex] = useState<number | null>(null);
    const [lista, setLista] = useState<AprendizajeData[]>([]);
    const navegacion = useNavigate();
    const params = useParams(); 

    async function cargarAprendizajes(){
        console.log(params.id);
        const res = await getAprendizajeDesbloqueado(Number(params.id));
        setLista(res.data);
    }

    useEffect(()=> {
        cargarAprendizajes();
    }, []);

    const volverAlJuego = () => {
        navegacion('/juego-educativo/'+location.pathname.split('/').pop());
    }
    const toggleExpandido = (index: number) => {
        setExpandidoIndex(prev => (prev === index ? null : index));
    };

    return(
        <div>
            <BarraNavegacion/>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-300">
                <button onClick={volverAlJuego} className="flex items-center justify-center gap-2 px-4 py-1.5 m-1 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border bg-amber-700 text-white border-yellow-400 hover:bg-amber-800 cursor-pointer">
                    <ArrowLeftSquare size={14}/>
                    <span className="whitespace-nowrap hidden md:inline-block">Volver al Juego</span>
                </button>
                <div className="p-4 md:p-8 space-y-4">
                    {lista.map((aprendizaje, index) => (
                        <div
                        key={index}
                        className="border border-gray-300 rounded-md shadow-md bg-white overflow-hidden transition-all"
                        >
                        {/* CABECERA */}
                        <button
                            className="w-full flex items-center justify-between p-4 bg-amber-100 hover:bg-amber-200 transition-colors"
                            onClick={() => toggleExpandido(index)}
                        >
                            <h2 className="font-bold text-start text-teal-900">
                            {`Tema ${index + 1}: ${aprendizaje.titulo}`}
                            </h2>
                            {expandidoIndex === index ? (
                            <ChevronUp className="text-gray-600" />
                            ) : (
                            <ChevronDown className="text-gray-600" />
                            )}
                        </button>

                        {/* CONTENIDO EXPANDIBLE */}
                        {expandidoIndex === index && (
                            <div className="p-4 md:p-6 bg-amber-50">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">

                                    {/* TEXTO */}
                                    <div className="prosa max-w-none">
                                        <ReactMarkdown
                                            components={{
                                                h2: ({ children }) => (
                                                    <h2 className="text-xl font-semibold mb-2 mt-4">
                                                        {children}
                                                    </h2>
                                                ),
                                                ul: ({ children }) => (
                                                    <ul className="list-disc list-inside pl-4 mb-4">
                                                        {children}
                                                    </ul>
                                                ),
                                                p: ({ children }) => (
                                                    <p className="mb-4 text-justify">
                                                        {children}
                                                    </p>
                                                ),
                                            }}
                                        >
                                            {aprendizaje.contenido}
                                        </ReactMarkdown>
                                    </div>

                                    {/* IMAGEN */}
                                    <div className="flex justify-center items-start">
                                        <img
                                            src={aprendizaje.imagen}
                                            alt="Ilustración"
                                            className="rounded-md w-auto h-auto max-w-xs md:max-w-md object-contain"
                                        />
                                    </div>

                                </div>

                                {/* FUENTES */}
                                <div className="mt-6 text-sm text-gray-700">
                                    <p className="font-bold">Fuentes:</p>

                                    <ReactMarkdown
                                        components={{
                                            p: ({ children }) => (
                                                <p className="mb-2 text-sm">
                                                    {children}
                                                </p>
                                            ),
                                            a: ({ children, href }) => (
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline text-emerald-900 font-semibold"
                                                >
                                                    {children}
                                                </a>
                                            ),
                                        }}
                                    >
                                        {aprendizaje.fuente}
                                    </ReactMarkdown>
                                </div>

                            </div>
                        )}                       
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}