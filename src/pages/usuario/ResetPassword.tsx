import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navegacion = useNavigate();

  async function resetPassword() {
    if (newPassword.length < 8) {
      setMensaje("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    setMensaje("");
    try {
      const res = await fetch(`https://webgarden-backend.onrender.com/sistemaWeb/api/reset_password/${uid}/${token}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ new_password: newPassword }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || "No se pudo restablecer la contraseña.");
        return;
      }
      if (data.success) {
        setMensaje(data.success);
        setTimeout(() => {
          navegacion("/");
        }, 2000);

        return;
      }

      setMensaje("No se pudo completar la operación. Inténtalo nuevamente.");

    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      setMensaje("No se pudo conectar con el servidor. Inténtalo nuevamente.");
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white mt-5 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Restablecer contraseña
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); resetPassword(); }} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Introduce tu nueva contraseña
            </label>
            <input
              required
              type={mostrarPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <button type="button" className="text-green-600 cursor-pointer hover:underline" onClick={() => { setMostrarPassword(!mostrarPassword) }}> {mostrarPassword ? <span>Ocultar contraseña</span> : <span> Mostrar contraseña</span>} </button>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md cursor-pointer"
          >
            Guardar
          </button>
        </form>

        {mensaje && (
          <p className={`mt-4 text-center text-sm font-medium ${mensaje === 'Contraseña restablecida correctamente' ? "text-green-700" : "text-red-600"}`}>
            {mensaje}
          </p>
        )}
      </div>
    </div>

  );
}
