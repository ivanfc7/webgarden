import LoginUsr from "../usuario/LoginUsr";
import { Carrusel } from "./Carrusel";
import { Footer } from "../../components/PiePagina";
import { useEffect, useState } from "react";
import { XIcon, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

export function LandingPage() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {
            navigate('/inicio');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-300 flex flex-col">
            {/* Contenido principal flex-1 empuja el footer hacia abajo */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 lg:py-12 flex flex-col justify-center">
                <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    {/* Lado Izquierdo: Carrusel con contenedor estilizado */}
                    <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-white/40 backdrop-blur-sm p-2">
                        <Carrusel />
                    </div>

                    {/* Lado Derecho: Hero Text & Acción */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                            Sistema Web con recursos informativos
                        </span>

                        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-900 leading-tight">
                            Seguimiento y Cuidado de <span className="text-emerald-600">Plantas y Árboles</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                            Diseñado para ofrecer una ayuda diferente a quienes disfrutan de cuidar un jardín en sus hogares, valorando el gran aporte de los árboles al medio ambiente.
                        </p>

                        <div className="pt-2">
                            <button 
                            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white transition-all duration-200 bg-emerald-600 rounded-2xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 active:scale-95 cursor-pointer"
                            onClick={() => setMostrarModal(true)}
                            >
                            Comenzar ahora
                            <Leaf className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            {mostrarModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="bg-white border-green-700 border-2 rounded-lg shadow-xl overflow-hidden relative">
                        <button onClick={()=>setMostrarModal(false)} className='p-2 cursor-pointer' title='Cerrar'> <XIcon className='text-gray-500 hover:text-gray-800'/></button>
                        <div>
                            <LoginUsr />
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    )
}