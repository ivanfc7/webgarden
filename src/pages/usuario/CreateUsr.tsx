import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createUser } from "../../assets/utils/sistema.api";
import { useState } from "react";

type Newuser = {
    first_name: string;
    email: string;
}

export function CreateUsr(){
    const {register, handleSubmit, formState:{errors}} = useForm<Newuser>();
    const [ocultarNombre, setOcultarNombre] = useState(false);

    const crearCuenta = handleSubmit(data => {
        const datos:Newuser={
            first_name: ocultarNombre?"": data.first_name,
            email: data.email,
        }
        generarLink(datos);
    });

    const generarLink = async (data: Newuser) => {
        const newuser = {
            ...data
        }
        try {
            await createUser(newuser);
            toast.success('Correo enviado!!');
        } catch (error) {
            console.log(error);
            toast.error('Hubo un error');
        }
    }

    return (
        <div className="w-full max-w-sm p-4 ">
            <p className="text-center text-teal-800 m-3">Bienvenido!! Crea tu usuario para acceder al sistema </p>
            <div className="w-full max-w-sm p-4 bg-white">
                <form onSubmit={crearCuenta} noValidate>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre/s y apellido/s</label>
                        <input type="text" id="nombre" disabled={ocultarNombre}
                            {...register('first_name', {required: !ocultarNombre ? "El nombre es obligatorio" : false, pattern: {
                                value: /^[a-zA-ZÀ-ÿ\s]+$/, // RegEx: Solo letras y espacios
                                message: "El nombre no debe contener números ni símbolos"
                            },
                            minLength: { value: 3, message: "Nombre demasiado corto" }}) } 
                            className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:border-green-500 dark:text-black" placeholder="Nombre completo"/>
                            {errors.first_name && <span className="text-red-600 text-xs mt-1">{errors.first_name.message}</span>} 
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Correo Electronico</label>
                        <input type="email" id="email" 
                            {...register('email', {required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Formato de correo inválido"
                                }})}
                            className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:border-green-500 dark:text-black" placeholder="nombre@gmail.com" required/>
                            {errors.email && <span className="text-orange-600 text-sm">{errors.email.message}</span>} 
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" name="ocultarName" id="ocultarName" checked={ocultarNombre} onChange={(e)=> setOcultarNombre(e.target.checked)}/>
                        <label htmlFor="ocultarName" className="text-sm text-gray-700 cursor-pointer">Ya tengo un correo registrado</label>
                    </div>
                    <div className="mt-2">
                        <button type="submit" className="cursor-pointer w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">&#9993; Recibir Correo</button>
                    </div>
                </form>
            </div>
        </div>
    )
}