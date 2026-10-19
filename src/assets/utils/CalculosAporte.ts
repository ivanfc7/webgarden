type Planta = {
    altura: number;
    espesura: number;
}

type DatosPlanta = {
    tipoPlanta: string;
    especiePlanta: string;
    cantidadPlantas: number;
    plantas: Planta[];
}

interface ResultadoArbol {
    nombre: string;
    carbono: number;
    co2: number;
}

function calcularCarbonoPorPlanta(planta: {altura: number, espesura: number}): number[]{
    /** Primero calculamos el volumen del arbol */ 
    const numero_PI: number = Math.PI;
    var DAP: number = planta.espesura/numero_PI;
    let altura_m: number =  planta.altura/100;
     
    /** Calculamos la biomasa del tronco y ramas */
    const a: number = 0.026;
    const b: number = 1.529;
    const c: number = 1.747;

    /** Biomasa aerea */
    var Bva:number = a * Math.pow(DAP, b) * Math.pow(altura_m, c);
    /** Biomasa radicular */
    var Bvr:number = Bva*0.20;
    /** Biomasa verde total */
    var Bvt:number = Bva + Bvr;
    /** Biomasa seca */
    var BS:number = Bvt - ((Bva*40)/100);

    /** CAPTURA DE CARBONO */
    var CAT: number = BS * 0.5;
    var CR: number = CAT * 0.24;

    var C_almacenado: number = CAT + CR;

    /** CO2 absorbido equivalente */
    const molCO2: number = 44;
    const molC: number = 12;
    var CO2_absorbido: number = C_almacenado*(molCO2/molC);
    
    return [C_almacenado, CO2_absorbido];
}

export const calcularImpacto = (datos: DatosPlanta) => {
    const especie: string = datos.especiePlanta;
    const cantidad: number = datos.cantidadPlantas;
    
    var carbonoTotal: number = 0;
    var CO2Total: number = 0;

    const resultados: ResultadoArbol[] = [];

    for (let i = 0; i < cantidad; i++) {
        const planta = datos.plantas[i];
        var resultadosParciales : number[] = calcularCarbonoPorPlanta(planta);
        carbonoTotal = carbonoTotal + resultadosParciales[0];
        CO2Total = CO2Total + resultadosParciales[1];
        resultados.push({
            nombre: especie,
            carbono: resultadosParciales[0],
            co2: resultadosParciales[1],
        })
    }

    return {resultados, carbonoTotal, CO2Total};
};
