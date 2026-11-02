import { useForm } from "react-hook-form";
import { Salir } from "../../components/Salir";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../assets/utils/sistema.api";

type Newuser = {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
};

type FormularioUsuario = Newuser & {
    passwordRepetido: string;
};

export function CreateUsr() {
    const {register, handleSubmit, watch, formState: { errors, isSubmitting }} = useForm<FormularioUsuario>();
    const [errorServidor, setErrorServidor] = useState("");
    const navegacion = useNavigate();
    const password = watch("password");

    const crearCuenta = async (data: FormularioUsuario) => {
        setErrorServidor("");
        const datos: Newuser = {
            first_name: data.first_name.trim(),
            last_name: data.last_name.trim(),
            email: data.email.trim(),
            username: data.username.trim(),
            password: data.password
        };

        try {
            const respuesta = await createUser(datos);
            if (!respuesta.ok) {
                const error = respuesta.data?.error || "No se pudo crear la cuenta.";

                setErrorServidor(error);
                toast.error(error);
                return;
            }
            const progresoId = respuesta.data.progresoId;
            console.log("Progreso creado:", progresoId);
            toast.success("Cuenta creada correctamente.");
            navegacion("/");

        } catch (error) {
            console.error("Error al crear usuario:", error);
            const mensaje = "No se pudo conectar con el servidor.";
            setErrorServidor(mensaje);
            toast.error(mensaje);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-300">
            <Salir />
            <p className="text-center text-2xl text-teal-800 m-3">
                Bienvenido. Crea una cuenta para acceder al sistema.
            </p>
            <div className="w-full max-w-sm p-4 bg-white border border-green-400 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-white dark:border-gray-700 mx-auto m-3">
                <form onSubmit={handleSubmit(crearCuenta)}>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                            Nombre/s <span className="text-red-500 font-bold ml-0.5">*</span>
                        </label>
                        <input id="first_name" type="text"
                            {...register("first_name", {
                                required: "Este campo es obligatorio.",
                                validate: value => value.trim().length > 0 || "Ingresa un nombre válido."
                            })}
                            className="bg-white border border-green-300 text-black text-sm rounded-lg block w-full p-2.5"
                            placeholder="Nombre completo"
                        />
                        {errors.first_name && (
                            <span className="text-orange-600 text-sm">
                                {errors.first_name.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
                            Apellido/s <span className="text-red-500 font-bold ml-0.5">*</span>
                        </label>
                        <input id="last_name" type="text"
                            {...register("last_name", {
                                required: "Este campo es obligatorio.",
                                validate: value => value.trim().length > 0 || "Ingresa un apellido válido."
                            })}
                            className="bg-white border border-green-300 text-black text-sm rounded-lg block w-full p-2.5"
                            placeholder="Apellido/s"
                        />
                        {errors.last_name && (
                            <span className="text-orange-600 text-sm">
                                {errors.last_name.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            Correo electrónico <span className="text-red-500 font-bold ml-0.5">*</span>
                        </label>
                        <input id="email" type="email"
                            {...register("email", {
                                required: "El correo es obligatorio.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Ingresa un correo válido."
                                }
                            })}
                            className="bg-white border border-green-300 text-black text-sm rounded-lg block w-full p-2.5"
                            placeholder="nombre@gmail.com"
                        />
                        {errors.email && (
                            <span className="text-orange-600 text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                            Nombre de usuario <span className="text-red-500 font-bold ml-0.5">*</span>
                        </label>
                        <input id="username" type="text"
                            {...register("username", {
                                required: "Este campo es obligatorio.",
                                validate: value => value.trim().length > 0 || "Ingresa un usuario válido."
                            })}
                            className="bg-white border border-green-300 text-black text-sm rounded-lg block w-full p-2.5"
                            placeholder="user12"
                        />

                        {errors.username && (
                            <span className="text-orange-600 text-sm">
                                {errors.username.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                            Contraseña <span className="text-red-500 font-bold ml-0.5">*</span>
                        </label>
                        <input id="password" type="password"
                            {...register("password", {
                                required: "La contraseña es obligatoria.",
                                minLength: {
                                    value: 8,
                                    message: "Debe tener al menos 8 caracteres."
                                }
                            })}
                            className="bg-white border border-green-300 text-black text-sm rounded-lg block w-full p-2.5"
                            placeholder="••••••••"
                        />

                        {errors.password && (
                            <span className="text-orange-600 text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="passwordRepetido" className="block mb-2 text-sm font-medium text-gray-900">
                            Repite la contraseña <span className="text-red-500 font-bold ml-0.5">*</span>
                        </label>
                        <input id="passwordRepetido" type="password"
                            {...register("passwordRepetido", {
                                required: "Debes repetir la contraseña.",
                                validate: value =>
                                    value === password || "Las contraseñas no coinciden."
                            })}
                            className="bg-white border border-green-300 text-black text-sm rounded-lg block w-full p-2.5"
                            placeholder="••••••••"
                        />

                        {errors.passwordRepetido && (
                            <span className="text-orange-600 text-sm">
                                {errors.passwordRepetido.message}
                            </span>
                        )}
                    </div>

                    {errorServidor && (
                        <p className="text-orange-600 text-sm mt-3">
                            {errorServidor}
                        </p>
                    )}

                    <div className="mt-4">
                        <button type="submit" disabled={isSubmitting}
                            className="cursor-pointer w-full text-white bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
