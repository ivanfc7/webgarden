import { useState } from "react";
import { forgotPassword } from "../../assets/utils/sistema.api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function ForgotPassword({onClose}: { onClose?:()=> void}) {
  const [mensaje, setMensaje] = useState(""); 
  const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm();

  const enviarCorreo = handleSubmit(async data => {
    try {
        const res = await forgotPassword(data.email);

        if (res.data.success) {
            toast.success("Mensaje enviado. Revisa tu correo.");
            setMensaje("Revisa tu correo para continuar");
            onClose?.();
        }
    } catch (error: any) {
        const mensajeError =
            error.response?.data?.error || "No se pudo enviar el correo.";

        toast.error(mensajeError);
        setMensaje(mensajeError);
        console.error("Error al recuperar contraseña:", error);
    }
});

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Recuperar contraseña
      </h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Introduce el correo registrado en el sistema
      </p>

      <form onSubmit={enviarCorreo} className="space-y-4">
        <input
          type="email"
          placeholder="correo@gmail.com"
          {...register("email", {
            required: "Este campo es obligatorio.",
            validate: value =>
                value.trim().length > 0 ||
                "Ingresa un correo valido."
          })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        {errors.email && (
            <span className="text-red-500 text-sm">
                {errors.email.message?.toString()}
            </span>
        )}
        <button type="submit" disabled={isSubmitting} className="cursor-pointer w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">  {isSubmitting ? "Enviando correo..." : "Enviar correo"}</button>
      </form>

      {mensaje && (
        <p className="mt-4 text-center text-sm font-medium text-red-600 bg-red-100 border border-red-300 rounded-lg p-2">
          {mensaje}
        </p>
      )}
    </div>
  );
}
