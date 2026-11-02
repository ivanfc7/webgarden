import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navegacion = useNavigate();

  async function resetPassword(){
    if(newPassword.length >= 8){
      const res = await fetch(`https://webgarden-backend.onrender.com/sistemaWeb/api/reset_password/${uid}/${token}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_password: newPassword }),
      });
      const data = await res.json();
      setMensaje(data.success || data.error);
      if(data.success){
        navegacion('/');
      }
    }else{
      setMensaje('La contraseña es muy corta');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white mt-5 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Restablecer contraseña
        </h2>
    
        <form onSubmit={(e) => { e.preventDefault(); resetPassword();}} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Introduce tu nueva contraseña
            </label>
            <input
              required
              type={mostrarPassword? "text":"password"}
              id="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <button type="button" className="text-green-600 cursor-pointer hover:underline" onClick={()=>{setMostrarPassword(!mostrarPassword)}}> {mostrarPassword? <span>Ocultar contraseña</span>: <span> Mostrar contraseña</span>} </button>
    
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md cursor-pointer"
          >
            Guardar
          </button>
        </form>
    
        {mensaje && (
          <p className={`mt-4 text-center text-sm font-medium ${mensaje === 'Contraseña restablecida correctamente'?"text-green-700":"text-red-600"}`}>
            {mensaje}
          </p>
        )}
      </div>
    </div>
    
  );
}
