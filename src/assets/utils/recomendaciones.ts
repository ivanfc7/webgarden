export interface OpcionEtapa {
    valor: number;      // Mantiene compatibilidad con tu estado numérico (0, 1, 2)
    etiqueta: string;   // Texto corto para el botón y setValue
    icono: string;      // Emoji visual
    descripcion: string;// Ayuda corta para que el usuario identifique su planta
}

export const ETAPAS_POR_TIPO: Record<string, OpcionEtapa[]> = {
    arbol: [
        {
            valor: 0,
            etiqueta: 'Semilla (Almácigo)',
            icono: '🌰',
            descripcion: 'Para germinar en bolsa o maceta antes de pasar a tierra.',
        },
        {
            valor: 1,
            etiqueta: 'Plantín en bolsa',
            icono: '🌱',
            descripcion: 'Brote pequeño con primeras hojas y cepellón formado.',
        },
        {
            valor: 2,
            etiqueta: 'Árbol joven',
            icono: '🌳',
            descripcion: 'Tallo leñoso firme, listo para trasplante a suelo definitivo.',
        },
    ],
    flor: [
        {
            valor: 0,
            etiqueta: 'Semilla',
            icono: '🌰',
            descripcion: 'Siembra directa o en semillero.',
        },
        {
            valor: 1,
            etiqueta: 'Plantín',
            icono: '🌱',
            descripcion: 'Plántula pequeña lista para pasar a maceta o jardín.',
        },
        {
            valor: 2,
            etiqueta: 'Planta en flor',
            icono: '🌸',
            descripcion: 'Planta desarrollada lista para florecer o ya en flor.',
        },
    ],
    arbusto: [
        {
            valor: 1,
            etiqueta: 'Esqueje / Plantín',
            icono: '🌿',
            descripcion: 'Rama enraizada o ejemplar pequeño en maceta de vivero.',
        },
        {
            valor: 2,
            etiqueta: 'Arbusto joven',
            icono: '🌳',
            descripcion: 'Con ramas principales formadas, listo para jardín o cerco.',
        },
    ],
    suculenta: [
        {
            valor: 0,
            etiqueta: 'Hoja / Esqueje',
            icono: '🍃',
            descripcion: 'Sin raíz aún o con raíces recién asomando.',
        },
        {
            valor: 1,
            etiqueta: 'Roseta / Brote',
            icono: '🌵',
            descripcion: 'Ejemplar pequeño ya enraizado en maceta.',
        },
        {
            valor: 2,
            etiqueta: 'Planta adulta',
            icono: '🌵',
            descripcion: 'Bien formada, lista para cambio de maceta o arreglo.',
        },
    ],
};

export interface DetalleEtapa {
    etiqueta: string;
    instruccion: string;
    tipClave: string;
}

export interface InfoPlanta{
    subtituloAfiche: string;
    ubicacion: string;
    sustrato: string;
    etapa: Record<number, DetalleEtapa>;
    tierra: Record<string, string>; 
    clima: Record<string, string>;
    hojas: Record<string, string>;
    tip: string;
}

export const plantas: Record<string, InfoPlanta> = {
    arbol: {
        subtituloAfiche: "GUÍA DE PLANTACIÓN · ÁRBOL",
        ubicacion: "En espacios abiertos y amplios, alejados al menos 3 a 4 metros de muros, cimientos, aceras, cables y tuberías.",
        sustrato: "Tierra mixta o franca.",
        etapa: {
            0: {
                etiqueta: "Semilla (Almácigo)",
                instruccion:
                    "No la siembres directo en el suelo; usa una bolsa de vivero o maceta profunda. Haz un pequeño hoyo y cubre la semilla con una capa de tierra del doble de su grosor.",
                tipClave: "Mantén la tierra húmeda sin encharcar hasta que salgan las primeras hojas.",
            },
            1: {
                etiqueta: "Plantín en bolsa",
                instruccion:
                    "Cava un hoyo del doble de ancho y de la misma profundidad que su bloque de tierra. Retira la bolsa con cuidado y colócalo de modo que la base del tallo quede al ras del suelo.",
                tipClave: "Nunca entierres la base del tronco o podría pudrirse por la humedad.",
            },
            2: {
                etiqueta: "Árbol joven",
                instruccion:
                    "Asegúrate de que el hoyo tenga la misma profundidad que el bloque de raíces y el doble de ancho. Rellena afirmando suave la tierra y pon una estaca de apoyo si hay viento.",
                tipClave: "Haz un pequeño borde de tierra alrededor para que el agua no se escape al regar.",
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
        subtituloAfiche: "GUÍA DE PLANTACIÓN · FLOR",
        ubicacion:
            "En un lugar bien iluminado (con sol directo de mañana o semisombra luminosa, según la especie).",
            sustrato: "Tierra mixta (con un poco de arena).",
        etapa: {
            0: {
                etiqueta: "Semilla",
                instruccion:
                    "Coloca las semillas sobre tierra previamente humedecida y cúbrelas apenas con una capa muy fina. Si la especie necesita luz para nacer, déjalas encima de la superficie.",
                tipClave: "Usa un rociador los primeros días para no mover las semillas de su lugar.",
            },
            1: {
                etiqueta: "Plantín",
                instruccion:
                    "Haz un hoyo del tamaño exacto del bloque de tierra de tu plantín. Colócalo de forma que su tierra quede alineada con el borde del suelo y presiona suavemente los lados.",
                tipClave: "Deja unos 15 a 25 cm entre plantines para que tengan espacio al crecer.",
            },
            2: {
                etiqueta: "Planta en flor",
                instruccion:
                    "Plántala al atardecer para que el sol fuerte no la debilite. Rellena los lados con tierra fértil sin enterrar la base del tallo ni las hojas inferiores.",
                tipClave: "Evita mojar directamente los pétalos o capullos cuando la riegues.",
            },
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
        subtituloAfiche: "GUÍA DE PLANTACIÓN · ARBUSTO",
        ubicacion:
            "En jardines, bordes o macetas grandes donde tenga espacio libre hacia los lados para extender sus ramas.",
        sustrato: "Tierra mixta o ligeramente arcillosa.",
        etapa: {
            1: {
                etiqueta: "Esqueje / Plantín",
                instruccion:
                    "Cava un hoyo de la misma profundidad que su maceta actual y un poco más ancho. Al colocarlo, la parte superior de su tierra debe quedar al ras del suelo.",
                tipClave: "Protégelo del sol fuerte del mediodía durante los primeros 3 días.",
            },
            2: {
                etiqueta: "Arbusto joven",
                instruccion:
                    "Plántalo a la misma altura a la que venía creciendo en su maceta. Rellena los huecos de los lados presionando suave sin tapar el tallo principal.",
                tipClave: "Deja al menos 60 a 80 cm de distancia respecto a otras plantas grandes.",
            },
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
        subtituloAfiche: "GUÍA DE PLANTACIÓN · SUCULENTA",
        ubicacion:
            "En macetas con agujeros de drenaje, cerca de ventanas luminosas o en exteriores con luz filtrada.",
        sustrato: "Tierra arenosa y pedregosa (que no retenga agua).",
        etapa: {
            0: {
                etiqueta: "Hoja / Esqueje",
                instruccion:
                    "Deja secar el corte a la sombra por 2 a 3 días hasta que cicatrice. Luego apóyalo encima de la tierra seca sin enterrarlo hasta que saque raíces.",
                tipClave: "Humedece apenas la tierra solo cuando veas asomar las primeras raíces.",
            },
            1: {
                etiqueta: "Roseta / Brote",
                instruccion:
                    "Coloca el brote procurando que sus raíces queden cubiertas por la tierra, pero que las hojas de abajo queden libres sin tocar la superficie.",
                tipClave: "Usa una maceta pequeña acorde a su tamaño para que no guarde humedad de más.",
            },
            2: {
                etiqueta: "Planta adulta",
                instruccion:
                    "Quita la tierra vieja con cuidado y pásala a tierra seca manteniendo la misma altura anterior. Asegúrate de que la base de la planta no quede hundida.",
                tipClave: "Espera unos 3 días antes de regarla por primera vez para que sus raíces se adapten.",
            },
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