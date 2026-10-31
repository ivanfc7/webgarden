
import { useRef, useState } from "react";
import { preguntas, Pregunta } from "./PreguntasJuego";

const CLAVE_PUNTAJE = "puntajePreguntasJuego";

export const usePreguntasJuego = () => {

    const [preguntaActual, setPreguntaActual] =
        useState<Pregunta | null>(null);

    const [modalAbierto, setModalAbierto] = useState(false);

    const [resultado, setResultado] =
        useState<boolean | null>(null);

    const [puntaje, setPuntaje] = useState(() => {
        const guardado = localStorage.getItem(CLAVE_PUNTAJE);
        const valor = Number(guardado);

        return Number.isFinite(valor) && valor >= 0 ? valor : 0;
    });

    // Preguntas que todavía no han aparecido en la partida.
    const preguntasDisponibles = useRef<Pregunta[]>([]);

    // Mezclar preguntas aleatoriamente.
    const mezclarPreguntas = () => {
        return [...preguntas].sort(() => Math.random() - 0.5);
    };

    // Obtener una pregunta.
    const iniciarPregunta = () => {
        // Si se agotaron las preguntas, se vuelve a generar la lista.
        if (preguntasDisponibles.current.length === 0) {
            preguntasDisponibles.current = mezclarPreguntas();
        }
        const nuevaPregunta = preguntasDisponibles.current.pop()!;
        setPreguntaActual(nuevaPregunta);
        setResultado(null);
        setModalAbierto(true);
    };

    // Evaluar la respuesta.
    const responderPregunta = (indice: number): boolean | null => {
        // Evitar responder varias veces.
        if (!preguntaActual || resultado !== null) {
            return null;
        }
        const esCorrecta = indice === preguntaActual.respuestaCorrecta;
        if (esCorrecta) {
            const nuevoPuntaje = puntaje + 1;
            setPuntaje(nuevoPuntaje);
            localStorage.setItem(CLAVE_PUNTAJE, String(nuevoPuntaje));
        }
        setResultado(esCorrecta);
        return esCorrecta;
    };

    // Cerrar modal y continuar.
    const continuarJuego = () => {
        setModalAbierto(false);
        setPreguntaActual(null);
        setResultado(null);
    };

    // Reiniciar una partida nueva.
    const reiniciarPreguntas = () => {
        preguntasDisponibles.current = mezclarPreguntas();
        setPreguntaActual(null);
        setResultado(null);
        setModalAbierto(false);
        setPuntaje(0);
        localStorage.setItem(CLAVE_PUNTAJE, "0");
    };

    return {
        preguntaActual,
        modalAbierto,
        resultado,
        puntaje,
        iniciarPregunta,
        responderPregunta,
        continuarJuego,
        reiniciarPreguntas
    };
};
