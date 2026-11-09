export interface InfoPlanta{
    ubicacion: string;
    etapa: Record<number,  { profundidad: string }>; 
    tierra: Record<string, string>; 
    clima: Record<string, string>;
    hojas: Record<string, string>;
    tip: string;
}

export const plantas: Record<string, InfoPlanta> = {
    arbol: {
        ubicacion: "En zonas amplias, alejados de muros, cimientos, cables y tuberías.",
        etapa: {
            0: {
                profundidad: "Haz un pequeño hoyo y cubre la semilla con una capa de tierra del doble de su tamaño. Si la semilla mide 0.5 cm, cúbrela con 1 cm de tierra.",
            },
            1: {
                profundidad: "Cava un hoyo del mismo plantaJoven que el bloque de tierra de la planta. Colócala de modo que la base del tronco quede justo al nivel del suelo, nunca enterrada.",
            },
            2: {
                profundidad: "Asegúrate de que el hoyo tenga la misma profundidad que el bloque de raíces. La base del tronco debe quedar visible y al nivel de la superficie.",
            },
        },
        tierra:{
            pedregoso: "El agua drena más rápido, Buena aireación para las raíces..",
            arenoso: "El suelo retiene poca agua, Se secan demasiado pronto.",
            arcilloso: "El suelo retiene más humedad, Se encharcan con las lluvias o con el riego.",  
            mixto: "Este tipo de suelo está diseñado para optimizar el crecimiento de la mayoría de las plantas."  
        },
        clima:{
            lluvioso: "Riego disminuido: Aprovechar el agua de lluvia",
            templado: "Riego regular: Evitar el exceso de agua para prevenir hongos",
            caluroso: "Regar con mayor frecuencia: El agua se evapora rápido",    
        },
        hojas:{
            tipoA: "Hojas amarillas y sin brillo: falta de agua.",
            tipoB: "Hojas nuevas pequeñas: falta de luz solar.",
            tipoC: "Manchas o secas: exceso de sol, necesita más sombra.",
            tipoD: "Hojas blandas: exceso de agua.",
            tipoE: "Pequeños agujeros: insectos alimentándose.",
            tipoF: "Manchas oscuras: posible presencia de hongos."
        },
        tip: "Los árboles tienden a requerir de mucho espacio tanto de raices como de altura, la mayoria de árboles frutales no ocupan mucho espacio. Considera el espacio a la hora de plantar un árbol"
    },
    flor: {
        ubicacion: "En un lugar bien iluminado (con sol directo o semisombra, según la flor).",
        etapa: {
            0: {
                profundidad: "Coloca la semilla sobre la tierra. Cúbrela solo con una capa muy fina de tierra. Si la especie necesita luz para nacer, déjala justo en la superficie.",
            },
            1: {
                profundidad: "Haz un hoyo del tamaño del bloque de tierra de tu plantín. Colócalo de forma que la tierra del plantín quede alineada con el borde del hoyo.",
            },
            2: {
                profundidad: "Acomoda la planta en el hoyo y rellena los lados con tierra. Evita tapar o enterrar la base del tallo.",
            }
        },   
        tierra:{
            pedregoso: "El agua drena más rápido, Buena aireación para las raíces..",
            arenoso: "El suelo retiene poca agua, Se secan demasiado pronto.",
            arcilloso: "El suelo retiene más humedad, Se encharcan con las lluvias o con el riego.",  
            mixto: "Este tipo de suelo está diseñado para optimizar el crecimiento de la mayoría de las plantas."  
        },
        clima:{
            lluvioso: "Riego disminuido: Aprovechar el agua de lluvia. Si llueve muy fuerte cubrir la flor",
            templado: "Riego regular: Evitar el exceso de agua para prevenir hongos",
            caluroso: "Regar con mayor frecuencia: El agua se evapora rápido",    
        },
        hojas:{
            tipoA: "Falta de agua.",
            tipoB: "Falta de luz solar.",
            tipoC: "Exceso de sol, necesita más sombra.",
            tipoD: "Exceso de agua.",
            tipoE: "Insectos alimentándose.",
            tipoF: "Posible presencia de hongos."
        },
        tip: "La primavera es excelente para la mayoría de las flores",
    },
    arbusto: {
        ubicacion: "En jardines o espacios donde tengan espacio para crecer hacia los lados y recibir sol.",
        etapa: {
            0: {
                profundidad: "Haz un hoyo pequeño y tapa la semilla con una capa de tierra que equivalga a dos veces su grosor.",
            },
            1: {
                profundidad: "Cava un hoyo del mismo plantaJoven que la maceta actual. Al colocar el plantín, la parte superior de su tierra debe quedar al ras del suelo.",
            },
            2: {
                profundidad: "Planta a la misma altura a la que venía creciendo. Rellena los huecos laterales sin tapar el tallo principal.",
            }
        },
        tierra:{
            pedregoso: "El agua drena más rápido, Buena aireación para las raíces..",
            arenoso: "El suelo retiene poca agua, Se secan demasiado pronto.",
            arcilloso: "El suelo retiene más humedad, Se encharcan con las lluvias o con el riego.",  
            mixto: "Este tipo de suelo está diseñado para optimizar el crecimiento de la mayoría de las plantas."  
        },
        clima:{
            lluvioso: "Riego reducido: Aprovechar el agua de lluvia",
            templado: "Riego regular: Evitar el exceso de agua para prevenir hongos",
            caluroso: "Regar con mayor frecuencia: El agua se evapora rápido",    
        },
        hojas:{
            tipoA: "Falta de agua.",
            tipoB: "Falta de luz solar.",
            tipoC: "Exceso de sol, necesita más sombra.",
            tipoD: "Exceso de agua.",
            tipoE: "Insectos alimentándose.",
            tipoF: "Posible presencia de hongos."
        },
        tip: "Los arbustos son resistentes y útiles para delimitar espacios o crear barreras naturales.",
    },
    suculenta: {
        ubicacion: "En macetas con buena luz, muy cerca de ventanas o en exteriores soleados.",
        etapa: {
            0: {
                profundidad: "Esparce las semillas sobre la superficie. Espolvorea apenas una pizca de arena o tierra encima, sin enterrarlas.",
            },
            1: {
                profundidad: "Coloca el plantín procurando que la tierra de la raíz quede al mismo nivel que el suelo. La superficie no debe tocar las hojas inferiores.",
            },
            2: {
                profundidad: "Mantén la misma profundidad a la que venía creciendo en su maceta anterior. Las hojas de la base deben quedar suspendidas por encima de la tierra.",
            }
        },
        tierra:{
            pedregoso: "El agua drena más rápido, Buena aireación para las raíces..",
            arenoso: "El suelo retiene poca agua, Se secan demasiado pronto.",
            arcilloso: "El suelo retiene más humedad, Se encharcan con las lluvias o con el riego.",  
            mixto: "Este tipo de suelo está diseñado para optimizar el crecimiento de la mayoría de las plantas."  
        },
        clima:{
            lluvioso: "Se puede omitir riego por la humedad en el ambiente",
            templado: "Riego regular: Una vez a la semana y en poca cantidad",
            caluroso: "Riego regular: Una vez a la semana y en poca cantidad"
        },
        hojas:{
            tipoA: "Falta de agua.",
            tipoB: "Falta de luz solar.",
            tipoC: "Exceso de sol, necesita más sombra.",
            tipoD: "Exceso de agua.",
            tipoE: "Insectos alimentándose.",
            tipoF: "Posible presencia de hongos."
        },
        tip: "Perfectas para climas secos.",
    }
};

export type Clima = "caluroso" | "templado" | "lluvioso";

type TipoSuelo = "arcilloso" | "arenoso" | "pedregoso" | "mixto";

const TABLA_RIEGO: Record<Clima, Record<TipoSuelo, string>> = {
    templado: {
        arcilloso: "2 veces por semana",
        mixto:     "3 veces por semana",
        arenoso:   "Diariamente",
        pedregoso: "1-2 veces al día",
    },
    caluroso: {
        arcilloso: "3 veces por semana",
        mixto:     "Diariamente",
        arenoso:   "Diariamente",
        pedregoso: "2-3 veces al día",
    },
    lluvioso: {
        arcilloso: "1-2 veces por semana",
        mixto:     "1-2 veces por semana",
        arenoso:   "2-3 veces por semana",
        pedregoso: "1 vez por semana",
    },
};

function normalizar(texto: string): string {
    return texto
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function normalizarClima(clima: string): Clima | null {
    const c = normalizar(clima);
    if (c.includes("caluros")) return "caluroso";
    if (c.includes("templad")) return "templado";
    if (c.includes("lluvios")) return "lluvioso";
    return null;
}

function normalizarSuelo(tierra: string): TipoSuelo | null {
    const t = normalizar(tierra);
    if (t.includes("arcill"))  return "arcilloso";
    if (t.includes("arenos"))  return "arenoso";
    if (t.includes("pedreg") || t.includes("grav")) return "pedregoso";
    if (t.includes("mixt") || t.includes("franc"))  return "mixto";
    return null;
}

export function estimarFrecuenciaRiego(clima: string, tierra: string): string {
    const c = normalizarClima(clima);
    const s = normalizarSuelo(tierra);

    if (!c) return "Clima no reconocido.";
    if (!s) return "Tipo de suelo no reconocido.";

    return TABLA_RIEGO[c][s];
}

export type TamanoMaceta = "pequena" | "mediana" | "grande";

const RIEGO_SUCULENTA: Record<TamanoMaceta, string> = {
    pequena: "cada 7 días",
    mediana: "cada 10 días",
    grande:  "cada 14 días",
};

function normalizarMaceta(tamano: string): TamanoMaceta | null {
    const t = normalizar(tamano);
    if (t.includes("pequ") || t.includes("chic")) return "pequena";
    if (t.includes("median") || t.includes("medi")) return "mediana";
    if (t.includes("grand")) return "grande";
    return null;
}

export function frecuenciaSuculenta(tamanoMaceta: string): string {
    const t = normalizarMaceta(tamanoMaceta);
    if (!t) return "Tamaño de maceta no reconocido.";
    return `Regar ${RIEGO_SUCULENTA[t]}`;
}

type FilaLitros = "arboles" | "arbustos" | "plantas_mixtas" | "pasto";
type ColumnaLitros = "semilla" | "plantin" | "plantaJoven";

const TABLA_LITROS: Record<FilaLitros, Record<ColumnaLitros, number>> = {
    arboles:        { semilla: 1.6, plantin: 2.4, plantaJoven: 3.2 },
    arbustos:       { semilla: 1.1, plantin: 1.6, plantaJoven: 2.1 },
    plantas_mixtas: { semilla: 1.8, plantin: 2.5, plantaJoven: 3.2 },
    pasto:          { semilla: 2.1, plantin: 2.5, plantaJoven: 2.8 },
};

function filaDesdeTipoPlanta(tipo: string): FilaLitros | null {
    const t = normalizar(tipo);
    if (t.includes("arbol"))    return "arboles";
    if (t.includes("arbusto"))  return "arbustos";
    if (t.includes("flor"))     return "plantas_mixtas";
    return null; // suculenta no tiene fila en la tabla
}

function columnaDesdeEtapa(etapa: string): ColumnaLitros | null {
    const a = normalizar(etapa);
    if (a.includes("semilla") || a.includes("sem")) return "semilla";
    if (a.includes("plantin") || a.includes("plantin")) return "plantin";
    if (a.includes("planta") || a.includes("joven")) return "plantaJoven";
    return null;
}

export function litrosRecomendados(tipoPlanta: string, etapa: string): string | null {
    const fila = filaDesdeTipoPlanta(tipoPlanta);
    const col = columnaDesdeEtapa(etapa);

    if (!fila) return null;      // p. ej. suculenta
    if (!col)  return "";

    const litros = TABLA_LITROS[fila][col];
    return `Utiliza aproximadamente ${litros} litros de agua.`;
}