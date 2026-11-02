import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../assets/utils/sistema.api";
import { useState } from "react";
import { XIcon } from "lucide-react";
import ForgotPassword from "./OlvidePassword";

export default function(){
    const navegador = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [huboError,  setHuboError] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    const ingresar = handleSubmit(async data => {
        const userData = {
            username: data.username,
            password: data.password,
        };
    
        try {
            const res = await login(userData);
            console.log('Token:', res.token);
            console.log('Usuario:', res.user);
            navegador('/inicio');
        } catch (error: any) {
            console.error("Error al hacer login:", error);
            setHuboError(true); 
        }
    });

    return(
        <div className="w-full max-w-sm p-4 bg-white shadow-sm sm:p-6 md:p-8 dark:bg-white">
           {huboError && (
                <div
                    className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm"
                    role="alert"
                >
                    <div className="flex items-start gap-3">
                    {/* Icono */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 flex-shrink-0 text-red-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.59c.75 1.334-.213 2.991-1.742 2.991H3.48c-1.53 0-2.492-1.657-1.742-2.99L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5A.75.75 0 0110 12z"
                        clipRule="evenodd"
                        />
                    </svg>

                    <div className="min-w-0">
                        <p className="font-semibold leading-6">No pudimos iniciar sesión</p>
                        <p className="mt-0.5 text-sm text-red-700">
                        Usuario o contraseña incorrectos.
                        </p>
                    </div>

                    {/* Botón cerrar */}
                    <button
                        onClick={() => setHuboError(false)}
                        className="ml-auto inline-flex rounded-md p-1.5 text-red-600/70 hover:text-red-700 hover:bg-red-100 transition"
                        aria-label="Cerrar alerta"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                        </svg>
                    </button>
                    </div>
                </div>
            )}

            <form onSubmit={ingresar} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nombre de Usuario</label>
                    <input type="text" id="username" 
                        {...register('username', {required:true})}
                        className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:border-green-500 dark:text-black" placeholder="nombre123"/>
                        {errors.username && <span className="text-orange-600 text-sm">Este campo esta vacio</span>} 
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Contraseña</label>
                    <input type={mostrarPassword ? "text":"password"} id="password" 
                        {...register('password', {required:true})} 
                        className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:border-green-500 dark:text-black"  placeholder="••••••••"/>
                        {errors.password && <span className="text-orange-600 text-sm">Este campo esta vacio <br /></span> }
                        <button type="button" className="cursor-pointer text-sm text-teal-700" onClick={() => setMostrarPassword(!mostrarPassword)}>
                            {mostrarPassword ? <span>Ocultar Contraseña</span>: <span>Mostrar Contraseña</span>} 
                        </button>
                </div>
                <button type="submit" className="cursor-pointer w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">Ingresar</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-700">
                    Todavia no tienes una cuenta? <a href="/crear-cuenta" className="text-green-700 hover:underline dark:text-green-500">Crea una</a>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-700">
                    <button onClick={()=>{setMostrarModal(true)}} className="text-green-700 hover:underline dark:text-green-500 cursor-pointer">Olvide mi contraseña</button>
                </div>
            </form>
            {mostrarModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50">
                <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
                <button
                    onClick={() => setMostrarModal(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
                    title="Cerrar"
                >
                    <XIcon className="w-5 h-5 cursor-pointer" />
                </button>
                <ForgotPassword onClose={()=>setMostrarModal(false)} />
                </div>
            </div>
            )}
        </div>
    )
}