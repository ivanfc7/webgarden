export interface InfoPlanta{
    ubicacion: string;
    separacion: string;
    etapa: Record<number, Record<string, string>>; 
    tierra: Record<string, string>; 
    clima: Record<string, string>;
    hojas: Record<string, string>;
    tip: string;
}

export const plantas: Record<string, InfoPlanta> = {
    arbol: {
        ubicacion: "En zonas amplias, alejados de muros, cimientos, cables y tuberías.",
        separacion: "De 3 a 5 metros entre árboles pequeños; amplía la distancia si el árbol será grande.",
        etapa: {
            0: {
                profundidad: "Haz un pequeño hoyo y cubre la semilla con una capa de tierra del doble de su tamaño. Si la semilla mide 0.5 cm, cúbrela con 1 cm de tierra.",
                riego: "Mantener la tierra húmeda, sin encharcar.",
            },
            1: {
                profundidad: "Cava un hoyo del mismo alto que el bloque de tierra de la planta. Colócala de modo que la base del tronco quede justo al nivel del suelo, nunca enterrada.",
                riego: "Riego profundo y abundante después de plantar.",
            },
            2: {
                profundidad: "Asegúrate de que el hoyo tenga la misma profundidad que el bloque de raíces. La base del tronco debe quedar visible y al nivel de la superficie.",
                riego: "Riego profundo cada 3-4 días durante el primer mes.",
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
            nublado: "Riego regular: Evitar el exceso de agua para prevenir hongos",
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
        separacion: "De 20 a 30 cm de distancia entre cada planta.",
        etapa: {
            0: {
                profundidad: "Coloca la semilla sobre la tierra. Cúbrela solo con una capa muy fina de tierra. Si la especie necesita luz para nacer, déjala justo en la superficie.",
                riego: "Mantener el sustrato húmedo, regando con atomizador o lluvia fina para no desplazar la semilla."
            },
            1: {
                profundidad: "Haz un hoyo del tamaño del bloque de tierra de tu plantín. Colócalo de forma que la tierra del plantín quede alineada con el borde del hoyo.",
                riego: "Regar de forma regular (cada 2-3 días si es verano) evitando encharcar."
            },
            2: {
                profundidad: "Acomoda la planta en el hoyo y rellena los lados con tierra. Evita tapar o enterrar la base del tallo.",
                riego: "Riego equilibrado: frecuente pero moderado, procurando que el suelo no se seque."
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
            nublado: "Riego regular: Evitar el exceso de agua para prevenir hongos",
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
        separacion: "Al menos 1 metro de distancia entre cada arbusto.",
        etapa: {
            0: {
                profundidad: "Haz un hoyo pequeño y tapa la semilla con una capa de tierra que equivalga a dos veces su grosor.",
                riego: "Riego ligero y constante hasta la germinación, manteniendo humedad superficial."
            },
            1: {
                profundidad: "Cava un hoyo del mismo alto que la maceta actual. Al colocar el plantín, la parte superior de su tierra debe quedar al ras del suelo.",
                riego: "Regar profundo después del trasplante (2-3 veces por semana) para estimular raíces fuertes."
            },
            2: {
                profundidad: "Planta a la misma altura a la que venía creciendo. Rellena los huecos laterales sin tapar el tallo principal.",
                riego: "Riego moderado pero profundo 1-2 veces por semana, aumentando en épocas de calor prolongado."
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
            nublado: "Riego regular: Evitar el exceso de agua para prevenir hongos",
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
        separacion: "De 10 a 15 cm de distancia respecto a otras plantas.",
        etapa: {
            0: {
                profundidad: "Esparce las semillas sobre la superficie. Espolvorea apenas una pizca de arena o tierra encima, sin enterrarlas.",
                riego: "Rociar con atomizador manteniendo humedad ligera pero sin encharcar."
            },
            1: {
                profundidad: "Coloca el plantín procurando que la tierra de la raíz quede al mismo nivel que el suelo. La superficie no debe tocar las hojas inferiores.",
                riego: "Riego ligero cada 7-10 días; esperar a que el sustrato se seque por completo antes de volver a regar."
            },
            2: {
                profundidad: "Mantén la misma profundidad a la que venía creciendo en su maceta anterior. Las hojas de la base deben quedar suspendidas por encima de la tierra.",
                riego: "Riego espaciado: cada 10-15 días en clima cálido; reducir a 1 vez al mes en invierno."
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
            nublado: "Riego regular: Una vez a la semana y en poca cantidad ",
            caluroso: "Similar a los dias nublados"
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

export function calcularFrecuenciaRiego(temperatura:number, humedad:number): number{
     // Coeficientes iniciales (puedes ajustar)
     const a = -0.05; // cada grado más → menos días entre riegos
     const b = 0.08;  // mayor humedad → más días entre riegos
     const c = 7;     // base de días
 
     let frecuencia = a * temperatura + b * humedad + c;
 
     // Evitar que sea menor a 1
     if (frecuencia < 1) frecuencia = 1;
 
     return Math.round(frecuencia);
}

export enum TipoPlanta {
    Arbol = 'arbol',
    Arbusto = 'arbusto',
    Flor = 'flor',
    Suculenta = 'suculenta',
}

// Interfaces para las etapas de crecimiento de cada tipo de planta
export interface EtapasArbol {
    semilla: number;
    plantin: number;
    planta_joven: number;
    arbol_adulto: number;
}
  
export interface EtapasArbusto {
    semilla: number;
    plantin: number;
    planta_joven: number;
    arbusto_adulto: number;
}
  
export interface EtapasFlor {
    semilla: number;
    plantin: number;
    planta_joven: number;
    floracion: number;
}
  
export interface EtapasSuculenta {
    semilla: number;
    plantin: number;
    planta_joven: number;
    planta_adulta: number;
}
// Valores de referencia para Kc (coeficiente del cultivo) por tipo de planta y etapa
const kcValores = {
    [TipoPlanta.Arbol]: {
      semilla: 0.10,
      plantin: 0.5,
      planta_joven: 0.8,
      arbol_adulto: 0.9
    } as EtapasArbol,
    [TipoPlanta.Arbusto]: {
      semilla: 0.10,
      plantin: 0.5,
      planta_joven: 0.8,
      arbusto_adulto: 0.9
    } as EtapasArbusto,
    [TipoPlanta.Flor]: {
      semilla: 0.10,
      plantin: 0.6,
      planta_joven: 0.9,
      floracion: 1.15
    } as EtapasFlor,
    [TipoPlanta.Suculenta]: {
      semilla: 0.10,
      plantin: 0.15,
      planta_joven: 0.20,
      planta_adulta: 0.25
    } as EtapasSuculenta,
  };

export type Clima = "caluroso" | "nublado" | "lluvioso";

// Valores de referencia para ET0 (evapotranspiración de referencia en mm/día)
// Basado en rangos típicos para diferentes climas
const et0Valores: Record<"caluroso" | "nublado" | "lluvioso", number> = {
    caluroso: 8, // mm/día
    nublado: 5, // mm/día
    lluvioso: 3  // mm/día
};

export function estimarFrecuenciaRiego(tipoPlanta: TipoPlanta, etapaPlanta: keyof (EtapasArbol | EtapasArbusto | EtapasFlor | EtapasSuculenta), clima:Clima, tierra: string):string{
     // 1. Obtener ET0 según el clima
    const et0 = et0Valores[clima];

    // // Validar si el tipo de planta y etapa coinciden
    if (!kcValores[tipoPlanta] || !kcValores[tipoPlanta][etapaPlanta as keyof typeof kcValores[keyof typeof kcValores]]) {
        return `Error: La etapa '${etapaPlanta}' no es válida para el tipo de planta '${tipoPlanta}'.`;
    }

    // 2. Obtener Kc según el tipo de planta y su etapa de crecimiento
    const kc = (kcValores[tipoPlanta] as any)[etapaPlanta];

    // 3. Calcular la evapotranspiración del cultivo (ETc) en mm/día
    // ETc = ET0 * Kc
    const etc = et0 * kc;

     // 4. Usar reglas heurísticas para la frecuencia de riego
    let frecuenciaEstimada:string = "";
    if (tipoPlanta === 'suculenta') {
        if (clima === 'caluroso') {
        frecuenciaEstimada = "1 vez por semana";
        } else {
        frecuenciaEstimada = "1 vez cada 15 días";
        }
    } else {
        // Frecuencia general para otras plantas basada en ETc
        if (etc >= 6) {
            frecuenciaEstimada = "Diariamente o 1-2 veces al día";
        } else if (etc >= 4) {
            frecuenciaEstimada = "2-3 veces por semana";
        } else {
            frecuenciaEstimada = "1-2 veces por semana";
        }
    }

    if(tierra === 'arenoso' || tierra === 'pedregoso'){
        frecuenciaEstimada += " con poca cantidad de agua";
        if (etapaPlanta as keyof 'plantin') {
            frecuenciaEstimada += " \n 1 litro de agua aproximadamente";
        }
    }else if(tierra === 'arcillso'){
        frecuenciaEstimada += " con abundante agua";
        if (etapaPlanta as keyof 'floracion' || etapaPlanta as keyof 'planta_adulta' || etapaPlanta as keyof 'arbusto_adulto' || etapaPlanta as keyof 'arbol_adulto') {
            frecuenciaEstimada += " \n 2 - 3 litros de agua aproximadamente";
        }
    }else if(tierra === 'mixto'){
        frecuenciaEstimada += " (mantener la humedad con el riego)"
        if (etapaPlanta as keyof 'floracion' || etapaPlanta as keyof 'planta_adulta' || etapaPlanta as keyof 'arbusto_adulto' || etapaPlanta as keyof 'arbol_adulto') {
            frecuenciaEstimada += " \n 2 litros de agua aproximadamente";
        }
    }

    return frecuenciaEstimada;
}