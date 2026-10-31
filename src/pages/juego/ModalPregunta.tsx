import { useState } from "react";
import { Pregunta } from "../../assets/utils/PreguntasJuego";

interface ModalPreguntaProps {
    pregunta: Pregunta;
    resultado: boolean | null;
    onResponder: (indice: number) => void;
    onContinuar: () => void;
}

const ModalPregunta = ({pregunta, resultado, onResponder, onContinuar}: ModalPreguntaProps) => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState<number | null>(null);

    const responder = (indice: number) => {
        if (resultado !== null || opcionSeleccionada !== null) {return;}

        setOpcionSeleccionada(indice);
        onResponder(indice);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
                {/* Encabezado */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                        Pregunta
                    </span>
                </div>
                {/* Tema */}
                {/* <p className="text-sm text-gray-500 mb-2">
                    {pregunta.tema}
                </p> */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                    {pregunta.pregunta}
                </h2>
                {/* Opciones */}
                <div className="flex flex-col gap-3">
                    {pregunta.opciones.map((opcion, indice) => {
                        const esCorrecta = indice === pregunta.respuestaCorrecta;
                        const esSeleccionada = indice === opcionSeleccionada;
                        let estilos = `border-gray-200 bg-white hover:bg-green-50 hover:border-green-400`;

                        if (resultado !== null && esCorrecta) {
                            estilos = `border-green-500 bg-green-50 text-green-800`;
                        } else if (
                            resultado === false &&
                            esSeleccionada
                        ) {
                            estilos = `border-red-500 bg-red-50 text-red-800`;
                        } else if (esSeleccionada) {
                            estilos = `border-green-500 bg-green-50`;
                        }

                        return (
                            <button key={indice} type="button" disabled={resultado !== null} onClick={() => responder(indice)}
                                className={`cursor-pointer w-full text-left border-2 rounded-xl p-3 sm:p-4 transition-colors disabled:cursor-default ${estilos}`}>
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 min-w-8 rounded-full bg-gray-100 font-semibold text-gray-700">
                                        {String.fromCharCode(65 + indice)}
                                    </span>
                                    <span className="text-sm sm:text-base">
                                        {opcion}
                                    </span>
                                </div>
                            </button>
                        );
                    })}

                </div>
                {/* Resultado */}
                {resultado !== null && (
                    <div className={`mt-5 p-4 rounded-xl border
                        ${resultado
                            ? "bg-green-50 border-green-300"
                            : "bg-red-50 border-red-300"
                        }
                    `}>
                        <h3 className={`font-bold mb-2
                            ${resultado
                                ? "text-green-700"
                                : "text-red-700"
                            }
                        `}>
                            {resultado
                                ? "¡Respuesta correcta!"
                                : "Respuesta incorrecta"
                            }
                        </h3>
                        {!resultado && (
                            <p className="text-sm text-gray-700 mb-2">
                                La respuesta correcta es:{" "}
                                <strong>
                                    {pregunta.opciones[
                                        pregunta.respuestaCorrecta
                                    ]}
                                </strong>
                            </p>
                        )}

                        <p className="text-sm text-gray-700">
                            {pregunta.explicacion}
                        </p>
                    </div>
                )}
                {/* Botón para continuar */}
                <button type="button" disabled={resultado === null} onClick={onContinuar}
                 className="cursor-pointer w-full mt-6 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    Seguir jugando
                </button>
            </div>
        </div>
    );
};

export default ModalPregunta;
