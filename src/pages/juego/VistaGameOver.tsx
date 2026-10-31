export function VistaGameOver() {
    return(
        <div className="p-8 bg-amber-100 border-2 border-yellow-400 rounded-2xl shadow-lg max-w-md mx-auto text-center space-y-4">
            <p className="text-lg text-amber-800">Ya jugaste tu desafío diario.</p>
            <p className="text-amber-700">Vuelve mañana para desbloquear nuevos tips y recursos de lectura🌞</p>
            <div className="mt-4">
                <span className="inline-block px-4 py-2 bg-green-200 text-green-800 rounded-full text-sm font-semibold">
                    🌱 Recuerda cuidar tus plantas.
                </span>
            </div>
        </div>
      
    )
}