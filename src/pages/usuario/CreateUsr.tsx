
import { useForm } from "react-hook-form";
import { Salir } from "../../components/Salir";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../assets/utils/sistema.api";
import { UserRound, Sprout } from "lucide-react";
import { useState } from "react";
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
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormularioUsuario>();

    const [errorServidor, setErrorServidor] = useState("");
    const navegacion = useNavigate();

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

    const inputClass = (error: boolean) =>
        `w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800
        outline-none transition duration-200 placeholder:text-gray-400
        focus:ring-4
        ${error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-gray-200 focus:border-green-500 focus:ring-green-100"
        }`;

    const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-100 px-4">
            <Salir />
            <div className="mx-auto flex max-w-5xl flex-col items-center">

                {/* Encabezado */}
                <div className="mb-7 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm">
                        <Sprout size={34} strokeWidth={1.8} />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">
                        Únete a WebGarden
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
                        Crea tu cuenta y comienza a registrar, conocer y cuidar
                        las plantas y árboles de tu jardín.
                    </p>
                </div>

                {/* Formulario */}
                <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-green-100 bg-white shadow-xl shadow-green-900/5">

                    <div className="border-b border-gray-100 bg-green-50/70 px-6 py-5 sm:px-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                                <UserRound size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Crear una cuenta
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Completa los siguientes datos para registrarte.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(crearCuenta)} className="space-y-5 p-6 sm:p-8">

                        {/* Datos personales */}
                        <div>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-green-800">
                                Datos personales
                            </h3>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                <div>
                                    <label htmlFor="first_name" className={labelClass}>
                                        Nombre/s <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        id="first_name"
                                        type="text"
                                        autoComplete="given-name"
                                        {...register("first_name", {
                                            required: "Este campo es obligatorio.",
                                            validate: value =>
                                                value.trim().length > 0 ||
                                                "Ingresa un nombre válido."
                                        })}
                                        className={inputClass(!!errors.first_name)}
                                        placeholder="Ej. Juan"
                                    />

                                    {errors.first_name && (
                                        <p className="mt-1.5 text-xs text-red-600">
                                            {errors.first_name.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="last_name" className={labelClass}>
                                        Apellido/s <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        id="last_name"
                                        type="text"
                                        autoComplete="family-name"
                                        {...register("last_name", {
                                            required: "Este campo es obligatorio.",
                                            validate: value =>
                                                value.trim().length > 0 ||
                                                "Ingresa un apellido válido."
                                        })}
                                        className={inputClass(!!errors.last_name)}
                                        placeholder="Ej. Pérez"
                                    />

                                    {errors.last_name && (
                                        <p className="mt-1.5 text-xs text-red-600">
                                            {errors.last_name.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100" />

                        {/* Datos de acceso */}
                        <div>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-green-800">
                                Datos de acceso
                            </h3>

                            <div className="space-y-5">

                                <div>
                                    <label htmlFor="email" className={labelClass}>
                                        Correo electrónico <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        {...register("email", {
                                            required: "El correo es obligatorio.",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Ingresa un correo válido."
                                            }
                                        })}
                                        className={inputClass(!!errors.email)}
                                        placeholder="nombre@correo.com"
                                    />

                                    {errors.email && (
                                        <p className="mt-1.5 text-xs text-red-600">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="username" className={labelClass}>
                                        Nombre de usuario <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        id="username"
                                        type="text"
                                        autoComplete="username"
                                        {...register("username", {
                                            required: "Este campo es obligatorio.",
                                            validate: value =>
                                                value.trim().length > 0 ||
                                                "Ingresa un usuario válido."
                                        })}
                                        className={inputClass(!!errors.username)}
                                        placeholder="Ej. juan12"
                                    />

                                    {errors.username && (
                                        <p className="mt-1.5 text-xs text-red-600">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className={labelClass}>
                                        Contraseña <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="new-password"
                                        {...register("password", {
                                            required: "La contraseña es obligatoria.",
                                            minLength: {
                                                value: 8,
                                                message: "Debe tener al menos 8 caracteres."
                                            }
                                        })}
                                        className={inputClass(!!errors.password)}
                                        placeholder="Mínimo 8 caracteres"
                                    />

                                    {errors.password && (
                                        <p className="mt-1.5 text-xs text-red-600">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Error del servidor */}
                        {errorServidor && (
                            <div
                                role="alert"
                                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                            >
                                {errorServidor}
                            </div>
                        )}

                        {/* Botón */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full cursor-pointer rounded-xl bg-green-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                            >
                                {isSubmitting ? "Creando cuenta..." : "Crear mi cuenta"}
                            </button>

                            <p className="mt-4 text-center text-xs text-gray-500">
                                Los campos marcados con <span className="font-bold text-red-500">*</span> son obligatorios.
                            </p>
                        </div>

                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-gray-500">
                    WebGarden · Aprende, registra y cuida tu jardín.
                </p>
            </div>
        </div>
    );
}
