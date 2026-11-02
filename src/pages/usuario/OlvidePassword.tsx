import { useState } from "react";
import { forgotPassword } from "../../assets/utils/sistema.api";
import toast from "react-hot-toast";

export default function ForgotPassword({onClose}: { onClose?:()=> void}) {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState(""); 

  async function enviarCorreo() {
    const res = await forgotPassword(email);
    console.log(res);
    if(res.data.success){
      toast.success("Enviando mensaje... Revisa tu correo dentro un momento");
      setMensaje("Revisa tu correo para continuar");
      onClose?.();
    }else{
      toast.error("Hubo un error");
      setMensaje(res.data.response);
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Recuperar contraseña
      </h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Introduce el correo registrado en el sistema
      </p>

      <form onSubmit={(e)=>{e.preventDefault(); enviarCorreo();}} className="space-y-4">
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button type="submit" className="cursor-pointer w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">Enviar</button>
      </form>

      {mensaje && (
        <p className="mt-4 text-center text-sm font-medium text-red-600 bg-red-100 border border-red-300 rounded-lg p-2">
          {mensaje}
        </p>
      )}
    </div>
  );
}
