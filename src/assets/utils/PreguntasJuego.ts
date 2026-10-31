
export interface Pregunta {
    id: number;
    temaId: number;
    tema: string;
    pregunta: string;
    opciones: string[];
    respuestaCorrecta: number;
    explicacion: string;
}

export const preguntas: Pregunta[] = [
    // TEMA 1: FOTOSÍNTESIS
    {
        id: 1,
        temaId: 1,
        tema: "La fotosíntesis en las plantas",
        pregunta: "¿Qué elementos necesitan las plantas para realizar la fotosíntesis?",
        opciones: [
            "Agua, dióxido de carbono y luz solar",
            "Oxígeno, glucosa y tierra",
            "Agua, oxígeno y minerales"
        ],
        respuestaCorrecta: 0,
        explicacion: "Las plantas utilizan agua, dióxido de carbono y luz solar para producir glucosa y liberar oxígeno."
    },
    {
        id: 2,
        temaId: 1,
        tema: "La fotosíntesis en las plantas",
        pregunta: "¿Qué sustancia producen las plantas durante la fotosíntesis?",
        opciones: [
            "Nitrógeno",
            "Glucosa",
            "Sales minerales"
        ],
        respuestaCorrecta: 1,
        explicacion: "La glucosa es una sustancia orgánica que las plantas producen mediante la fotosíntesis."
    },
    {
        id: 3,
        temaId: 1,
        tema: "La fotosíntesis en las plantas",
        pregunta: "¿Qué estructura celular contiene los pigmentos que captan la luz?",
        opciones: [
            "Las raíces",
            "Los cloroplastos",
            "Las semillas"
        ],
        respuestaCorrecta: 1,
        explicacion: "Los cloroplastos contienen clorofila, un pigmento que permite captar la energía luminosa."
    },

    // TEMA 2: CICLO DE VIDA
    {
        id: 4,
        temaId: 2,
        tema: "El árbol y las plantas, su ciclo de vida",
        pregunta: "¿Cuál es el punto de partida del ciclo de vida de muchas plantas?",
        opciones: [
            "La semilla",
            "El árbol maduro",
            "La flor marchita"
        ],
        respuestaCorrecta: 0,
        explicacion: "Muchas plantas comienzan su ciclo de vida a partir de una semilla."
    },
    {
        id: 5,
        temaId: 2,
        tema: "El árbol y las plantas, su ciclo de vida",
        pregunta: "¿Qué sucede durante la germinación?",
        opciones: [
            "Las hojas comienzan a marchitarse",
            "La primera raíz comienza a desarrollarse",
            "El árbol alcanza su altura máxima"
        ],
        respuestaCorrecta: 1,
        explicacion: "Durante la germinación, la primera raíz comienza a salir de la semilla y a desarrollarse."
    },
    {
        id: 6,
        temaId: 2,
        tema: "El árbol y las plantas, su ciclo de vida",
        pregunta: "¿Qué característica presenta un árbol maduro?",
        opciones: [
            "Comienza a desarrollar su follaje y alcanza su altura máxima",
            "Todavía permanece dentro de la semilla",
            "Sus raíces apenas comienzan a aparecer"
        ],
        respuestaCorrecta: 0,
        explicacion: "El árbol maduro se aproxima a su altura máxima y desarrolla su follaje."
    },

    // TEMA 3: TRANSPIRACIÓN
    {
        id: 7,
        temaId: 3,
        tema: "Transpiración y transporte de agua",
        pregunta: "¿Por dónde liberan principalmente el vapor de agua las plantas?",
        opciones: [
            "Por las semillas",
            "Por los estomas",
            "Por los frutos"
        ],
        respuestaCorrecta: 1,
        explicacion: "Los estomas son pequeñas aberturas de las hojas y algunos tallos por donde se libera vapor de agua."
    },
    {
        id: 8,
        temaId: 3,
        tema: "Transpiración y transporte de agua",
        pregunta: "¿Qué tejido transporta el agua desde las raíces?",
        opciones: [
            "Xilema",
            "Clorofila",
            "Polen"
        ],
        respuestaCorrecta: 0,
        explicacion: "El xilema es el tejido vascular encargado de transportar agua y minerales desde las raíces."
    },
    {
        id: 9,
        temaId: 3,
        tema: "Transpiración y transporte de agua",
        pregunta: "¿Cuál de estos factores puede modificar la transpiración?",
        opciones: [
            "El color de las flores",
            "La forma de las semillas",
            "La temperatura ambiental"
        ],
        respuestaCorrecta: 2,
        explicacion: "La temperatura, humedad, viento e intensidad de la luz solar pueden modificar la tasa de transpiración."
    },

    // TEMA 4: POLINIZACIÓN
    {
        id: 10,
        temaId: 4,
        tema: "Polinización y reproducción vegetal",
        pregunta: "¿Qué permite la polinización en las plantas?",
        opciones: [
            "La reproducción vegetal",
            "La pérdida de agua",
            "La absorción de minerales"
        ],
        respuestaCorrecta: 0,
        explicacion: "La polinización interviene en la reproducción de las plantas con flores."
    },
    {
        id: 11,
        temaId: 4,
        tema: "Polinización y reproducción vegetal",
        pregunta: "¿Qué beneficio obtienen algunos insectos al visitar las flores?",
        opciones: [
            "Protección contra el viento",
            "Alimento a través del polen y el néctar",
            "Agua procedente de las raíces"
        ],
        respuestaCorrecta: 1,
        explicacion: "Los insectos polinizadores pueden obtener alimento al visitar las flores."
    },
    {
        id: 12,
        temaId: 4,
        tema: "Polinización y reproducción vegetal",
        pregunta: "¿Cuál es un ejemplo de agente polinizador?",
        opciones: [
            "Una roca",
            "Una abeja",
            "Un mineral"
        ],
        respuestaCorrecta: 1,
        explicacion: "Las abejas son uno de los ejemplos más conocidos de insectos polinizadores."
    },

    // TEMA 5: CONTAMINACIÓN
    {
        id: 13,
        temaId: 5,
        tema: "Contaminación del suelo, agua y aire",
        pregunta: "¿Cuál es un ejemplo de contaminación del aire de origen humano?",
        opciones: [
            "Las emisiones del transporte vehicular",
            "La formación natural de las nubes",
            "La luz solar"
        ],
        respuestaCorrecta: 0,
        explicacion: "El transporte vehicular es una fuente antropogénica de contaminación atmosférica."
    },
    {
        id: 14,
        temaId: 5,
        tema: "Contaminación del suelo, agua y aire",
        pregunta: "¿Qué sustancias pueden contaminar el suelo?",
        opciones: [
            "Luz solar y oxígeno",
            "Metales pesados y algunos pesticidas",
            "Polen y semillas"
        ],
        respuestaCorrecta: 1,
        explicacion: "Los metales pesados y algunos pesticidas son sustancias que pueden contaminar el suelo."
    },
    {
        id: 15,
        temaId: 5,
        tema: "Contaminación del suelo, agua y aire",
        pregunta: "¿Cuál es un ejemplo de contaminación del agua?",
        opciones: [
            "La presencia de desechos industriales en canales de agua",
            "La evaporación del agua",
            "La absorción de agua por las raíces"
        ],
        respuestaCorrecta: 0,
        explicacion: "Los residuos procedentes de actividades industriales pueden contaminar los cuerpos de agua."
    },

    // TEMA 6: CONTACTO CON LA NATURALEZA
    {
        id: 16,
        temaId: 6,
        tema: "Beneficios del contacto con la naturaleza",
        pregunta: "¿Qué hormona se relaciona con el estrés?",
        opciones: [
            "Insulina",
            "Cortisol",
            "Melatonina"
        ],
        respuestaCorrecta: 1,
        explicacion: "El cortisol es una hormona relacionada con la respuesta del organismo al estrés."
    },
    {
        id: 17,
        temaId: 6,
        tema: "Beneficios del contacto con la naturaleza",
        pregunta: "¿Cuál es un beneficio asociado al contacto con la naturaleza?",
        opciones: [
            "Mejora de la concentración",
            "Aumento de la contaminación",
            "Disminución de la creatividad"
        ],
        respuestaCorrecta: 0,
        explicacion: "La exposición a entornos naturales se ha relacionado con beneficios para la concentración y la creatividad."
    },
    {
        id: 18,
        temaId: 6,
        tema: "Beneficios del contacto con la naturaleza",
        pregunta: "¿Cuál de los siguientes son entornos naturales?",
        opciones: [
            "Fábricas y carreteras",
            "Bosques, parques y jardines",
            "Centros comerciales"
        ],
        respuestaCorrecta: 1,
        explicacion: "Los bosques, parques y jardines son ejemplos de entornos naturales."
    }
];
