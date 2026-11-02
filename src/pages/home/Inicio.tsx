// 1. Interfaz alineada con los campos reales del serializer de Django
interface Progreso {
    id?: number;
    usuario?: number;
    cantidadMsjDesbloqueados?: number;
    cantidadApzjDesbloqueados?: number;
    fechaJuego?: string | null;
    experiencia?: number;
}

import { BarraNavegacion } from "../../components/BarraNavegacion";
import { Footer } from "../../components/PiePagina";
import { Link } from "react-router-dom";
import { getProgresoJuego, profile, getTotalPlantas, getTotalAportes } from "../../assets/utils/sistema.api";
import { useEffect, useState } from "react";
import { Consejo } from "./Consejo";

export function Home(){
    const [progresoJuego, setProgresoJuego] = useState<Progreso>();
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [totalConsejosDesbloqueados, setTotalConsejosDesbloqueados] = useState(0);
    const [totalTemasDesbloqueados, setTotalTemasDesbloqueados] = useState(0);
    const [totalPlantas, setTotalPlantas] = useState(0);
    const [totalAportes, setTotalAportes] = useState(0);

    useEffect(() => {
        const cargarProgreso = async () => {
            try {
                const res = await getProgresoJuego();
                console.log("Respuesta de progreso:", res.data);
                
                // Extraer el primer elemento si res.data es un Array, o usar res.data directamente si es un objeto
                const progreso = Array.isArray(res.data) ? res.data[0] : res.data;
    
                if (!progreso) {
                    console.warn("El usuario todavía no tiene un progreso registrado.");
                    setProgresoJuego(undefined);
                    setTotalConsejosDesbloqueados(0);
                    setTotalTemasDesbloqueados(0);
                    return;
                }
    
                setProgresoJuego(progreso);
                setTotalConsejosDesbloqueados(progreso.cantidadMsjDesbloqueados ?? 0);
                setTotalTemasDesbloqueados(progreso.cantidadApzjDesbloqueados ?? 0);
    
            } catch (error) {
                console.error("Error al cargar el progreso:", error);
            }
        };
    
        const cargarPerfil = async () => {
            try {
                const response = await profile();
                setNombreCompleto(`${response.firstName} ${response.lastName}`);
                setEmail(response.email);
    
                const [resPlants, resAport] = await Promise.all([getTotalPlantas(), getTotalAportes()]);
    
                setTotalPlantas(resPlants.total ?? 0);
                setTotalAportes(resAport.total ?? 0);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
            }
        };
    
        cargarProgreso();
        cargarPerfil();
    
    }, []);

    // 2. Fallback de ID: Si 'id' no está explícito en el objeto, usa 'usuario'
    const idProgresoValido = progresoJuego?.id ?? progresoJuego?.usuario;

    return (
        <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-300 flex flex-col">
            <BarraNavegacion />
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-full bg-emerald-400 flex items-center justify-center text-5xl font-bold text-emerald-900">
                    {nombreCompleto.charAt(0)}
                </div>

                <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-2xl font-semibold text-gray-800">{nombreCompleto}</p>
                            <p className="text-sm text-gray-500">Correo registrado: {email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="text-center bg-blue-100 rounded-xl p-2">
                            <p className="text-sm text-gray-600">Recursos desbloqueados</p>
                            <p className="text-2xl font-bold text-blue-700">{totalTemasDesbloqueados} lecturas</p> 
                        </div>
                        <div className="text-center bg-yellow-100 rounded-xl p-2">
                            <p className="text-sm text-gray-600">Consejos para tu jardín</p>
                            <p className="text-2xl font-bold text-yellow-700">{totalConsejosDesbloqueados} tips</p>
                        </div>
                        <div className="text-center bg-green-100 rounded-xl p-2">
                            <p className="text-sm text-gray-600">Plantas en el jardín</p>
                            <p className="text-2xl font-bold text-green-700">{totalPlantas} especies</p>
                        </div>
                        <div className="text-center bg-purple-100 rounded-xl p-2">
                            <p className="text-sm text-gray-600">Total de Carbono Almacenado</p>
                            <p className="text-2xl font-bold text-purple-700">{totalAportes} Kg</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Se pasa 'idProgresoValido' asegurando que nunca envíe 'undefined' */}
            <Consejo progresoJuegoId={idProgresoValido} />
            <div className="grid grid-cols-1 md:grid-cols-3 flex-grow">
                <div className="m-10">
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-white dark:border-gray-700 hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-teal-900">Conociendo tus Plantas</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">Esta sección te permite registrar tus plantas y conocer consejos para su cuidado.
                        </p>
                        <Link to='/conociendo-tu-planta' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Vamos!
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="m-10">
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-white dark:border-gray-700 hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-teal-900">Captura de carbono</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">¿Sabes cuánto carbono están reteniendo los árboles de tu hogar?</p><br />
                        <Link to='/captura-carbono' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Vamos!
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="m-10">
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-white dark:border-gray-700 hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-teal-900">Juega y aprende</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">Descubre consejos y temas de conocimiento general jugando. Aprende más acerca de las plantas y los árboles.</p>
                        <Link to={'/juego-educativo/'+idProgresoValido} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Vamos!
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>  
            <Footer/>  
        </section>
    )
}