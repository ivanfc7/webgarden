interface Aporte {
    cantidad: number;
    co2Total: number;
    carbonoTotal: number;
    fechaRegistro: string;
    planta: number;
}

import { BarraNavegacion } from "../../components/BarraNavegacion"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAportesByPlanta, getPlantaById } from "../../assets/utils/sistema.api";
import { Wind } from 'lucide-react';
import { Tarjetas } from "./TarjetaAporte";

export function MisAfiches(){
    const [lista, setLista] = useState<Aporte[]>([]);
    const [especie, setEspecie] = useState('');
    const params = useParams();
   
    useEffect(() => {
        async function cargarTarjetasAportes(){
            if(params.id){
                const respuesta = await getAportesByPlanta(params.id);
                setLista(respuesta.data);
            }
        }
        cargarTarjetasAportes();

        async function cargarPlanta(){
            if(params.id){
                const respuesta = await getPlantaById(params.id);
                setEspecie(respuesta.data.especie);
            }   
        }
        cargarPlanta();
    }, []);

    const formatear = (palabra:string) =>{
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-300">
            <BarraNavegacion />     
            <br /> 
            <a href="/mis-plantas" className="text-green-700 text-sm font-medium m-15 hover:underline">Mis Plantas </a>
            <div className="p-3 max-w-4xl w-full mx-auto">
                <p className="text-2xl font-bold text-green-800">Historial de tu árbol {formatear(especie)}</p>
                {lista.length === 0 ?(
                    <div>
                        <div className="max-w-md mx-auto mt-10 text-center">
                            <Wind size={120} className="mx-auto text-emerald-900 opacity-60" />
                            <p className="dark:text-teal-900 font-semibold">Historial vacio !!</p>
                            <p className="dark:text-gray-500">Ve a la actividad "Captura de Carbono" para agregar</p>
                        </div>
                    </div>
                ): (
                    <div className="bg-transparent grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {lista.map((aporte, index) => (
                            <Tarjetas key={index} aporte={aporte} />
                        ))}
                    </div>  
                )}
            </div>
        </section>
    )
} 