import { useForm } from "react-hook-form";
import { getPlantas } from "../../../assets/utils/sistema.api";
import { useEffect, useState } from "react";
import { SinPlantas } from "../../../components/SinPlantas";

type Acciones = {
    siguiente: () => void;
    datos: (data: any) => void;
};
interface Planta {
    id: string;
    especie: string;
    tipo: string;
    descripcion: string;
}
export function Step1Especie({siguiente, datos}: Acciones){
    const [lista, setLista] = useState<Planta[]>([]);
    const {register, handleSubmit, formState: {errors}} = useForm();

    const seleccionarPlanta = handleSubmit(data => {
        var idPlanta = Number(data.nombrePlanta.charAt(0));
        var nombrePlanta = data.nombrePlanta.slice(1);
        datos({ idPlanta: idPlanta, especiePlanta: nombrePlanta});
        siguiente();
    })

    useEffect(() => {
        async function cargarPlantas() {
            const res = await getPlantas();
            setLista(res.data);
        }
        cargarPlantas();
    },[]);

    return(
        <form onSubmit={seleccionarPlanta} className="max-w-md mx-auto mt-10">
            <div className="relative z-0 w-full mb-5 group">
                {lista.length === 0 ? (
                    <SinPlantas/>
                ) : (
                    <div>
                        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black text-center">Elige un árbol</p>
                        <select className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:border-green-500 dark:text-black" 
                            {...register("nombrePlanta", {required: true})}>
                            <option value="">Tu planta es</option>
                                {lista.map((planta, index) => (
                                    <div>
                                        {planta.tipo === 'arbol' && (
                                            <option key={index} value={planta.id+planta.especie}>{planta.especie}</option>
                                        )}
                                    </div>
                                ))}
                        </select>
                        <br />
                        {errors.nombrePlanta && <span className="text-orange-600">No elegiste una planta</span>}
                        <button className="cursor-pointer rounded-lg mt-10 bg-sky-200 p-2 hover:bg-sky-300" type="submit">Avanzar &#9654;</button>
                    </div>
                )}
            </div>
        </form>
    )
}