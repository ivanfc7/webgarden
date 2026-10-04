const nivel1: string[][] = [
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['P', 'A', '_', '_', '_', '_', '_', '_', '_', 'P'],
    ['P', 'P', 'P', '_', '_', 'P', '_', 'P', 'P', 'P'],
    ['P', '_', 'P', 'P', '_', 'P', 'P', '_', 'P', 'P'],
    ['P', '_', '_', '_', '_', 'P', 'P', '_', 'P', 'P'],
    ['P', '_', '_', '_', 'P', '_', '_', '_', '_', 'P'],
    ['P', '_', '_', 'P', 'P', 'P', 'P', '_', 'P', 'P'],
    ['P', '_', '_', '_', 'P', 'P', 'P', '_', 'P', 'P'],
    ['P', '_', 'P', '_', '_', '_', '_', '_', '_', 'P'],
    ['P', '_', '_', 'P', '_', 'P', 'P', 'P', '_', 'P']
];

const nivel2: string[][] = [
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['P', '_', '_', '_', '_', '_', '_', '_', '_', 'P'],
    ['P', '_', 'P', '_', '_', 'P', '_', 'P', 'P', 'P'],
    ['P', '_', 'P', 'P', '_', '_', 'P', '_', 'P', 'P'],
    ['P', '_', 'P', '_', '_', 'P', 'P', '_', 'P', 'P'],
    ['P', '_', 'P', '_', 'P', '_', '_', '_', '_', '_'],
    ['P', '_', 'A', 'P', 'P', 'P', 'P', '_', 'P', 'P'],
    ['P', '_', '_', '_', 'P', 'P', 'P', '_', 'P', 'P'],
    ['P', 'P', 'P', '_', '_', '_', '_', '_', '_', 'P'],
    ['P', 'P', 'P', 'P', '_', 'P', 'P', 'P', 'P', 'P']
];

const nivel3: string[][] = [
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['P', '_', '_', '_', '_', '_', '_', '_', '_', 'P'],
    ['P', 'P', 'P', '_', '_', 'P', '_', 'P', 'A', 'P'],
    ['P', '_', 'P', 'P', '_', '_', 'P', '_', 'P', 'P'],
    ['P', '_', 'P', '_', '_', 'P', 'P', '_', 'P', 'P'],
    ['P', '_', 'P', '_', 'P', '_', '_', '_', '_', 'P'],
    ['_', '_', '_', '_', 'P', 'P', 'P', '_', 'P', 'P'],
    ['_', '_', 'P', 'B', 'P', 'P', 'P', '_', 'P', 'P'],
    ['_', 'P', 'P', '_', '_', '_', '_', '_', '_', 'P'],
    ['P', '_', '_', '_', '_', 'P', 'P', 'P', '_', 'P']
];

const nivel4: string[][] = [
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['P', '_', '_', '_', '_', 'B', '_', '_', '_', 'P'],
    ['P', '_', 'P', '_', '_', 'P', '_', 'P', '_', 'P'],
    ['P', 'A', 'P', 'P', '_', '_', 'P', '_', 'P', 'P'],
    ['P', '_', 'P', '_', '_', 'P', 'P', '_', 'P', 'P'],
    ['P', '_', 'P', '_', 'P', '_', '_', '_', '_', 'P'],
    ['_', '_', '_', 'P', 'P', 'P', 'P', '_', 'P', 'P'],
    ['_', 'P', '_', '_', 'P', 'P', 'P', '_', 'P', 'P'],
    ['_', '_', 'P', '_', '_', '_', '_', '_', '_', 'P'],
    ['P', '_', 'P', 'P', '_', 'P', 'P', 'P', '_', 'P']
];

const nivel5: string[][] = [
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['P', '_', '_', '_', '_', '_', '_', '_', '_', 'P'],
    ['P', '_', 'P', '_', '_', 'P', '_', '_', '_', 'P'],
    ['P', '_', 'P', 'P', '_', '_', 'P', '_', 'P', 'P'],
    ['P', '_', 'P', '_', '_', 'P', 'P', '_', 'P', 'P'],
    ['P', '_', 'P', '_', 'P', '_', '_', '_', '_', 'P'],
    ['_', 'P', 'A', 'P', 'P', 'P', 'P', '_', 'P', 'P'],
    ['_', '_', '_', '_', 'P', 'P', 'P', '_', 'P', 'P'],
    ['P', '_', 'P', '_', '_', '_', '_', '_', '_', 'P'],
    ['P', '_', 'P', 'P', '_', 'P', 'P', 'P', 'P', 'P']
];

const barajarArreglo = <T>(arreglo: T[]): T[] => {
    const copia = [...arreglo];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
};

export const obtenerObjetivoDiario = () => {
    const objetivos = [
        { M: 3, N: 3 },
        { M: 6, N: 3 },
        { M: 3, N: 6 }
    ];
    const indice = Math.floor(Math.random() * objetivos.length);
    return objetivos[indice];
};

// Genera una distribución diaria balanceada de 8 ítems en 5 niveles
const obtenerPlanDiario = (
    objetivo: { M: number; N: number }
): string[][] => {

    const bolsaTotal = [
        ...Array(objetivo.M).fill('M'),
        ...Array(objetivo.N).fill('N'),
        'E'
    ];

    const bolsaMezclada = barajarArreglo(bolsaTotal);
    const niveles: string[][] = [
        [],
        [],
        [],
        [],
        []
    ];

    // Distribuir los objetos entre los 5 laberintos
    bolsaMezclada.forEach((item, indice) => {
        const nivel = indice % 5;
        niveles[nivel].push(item);
    });

    // Garantizar que el quinto laberinto tenga al menos un objeto
    if (niveles[4].length === 0) {
        const nivelOrigen = niveles.findIndex(
            (nivel, indice) => indice !== 4 && nivel.length > 1
        );

        if (nivelOrigen !== -1) {
            const objeto = niveles[nivelOrigen].pop();

            if (objeto) {
                niveles[4].push(objeto);
            }
        }
    }
    return niveles;
};

const objetivoDiario = obtenerObjetivoDiario();
const planDiario = obtenerPlanDiario(objetivoDiario);
const mapaOriginal = [nivel1, nivel2, nivel3, nivel4, nivel5];
const mapaCopia = barajarArreglo(mapaOriginal);

const armarLaberinto = (mapa: string[][], itemsDelNivel: string[]): string[][] => {
    const mapaRespuesta = mapa.map(fila => [...fila]);
    const espaciosDisponibles: [number, number][] = [];

    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[i].length; j++) {
            if (mapaRespuesta[i][j] === '_') {
                espaciosDisponibles.push([i, j]);
            }
        }
    }

    const posiciones = barajarArreglo(espaciosDisponibles);
    let posIndex = 0;
    const tieneB = mapaRespuesta.some(fila => fila.includes('B'));
    if (!tieneB && posIndex < posiciones.length) {
        const [i, j] = posiciones[posIndex++];
        mapaRespuesta[i][j] = 'B';
    }

    for (const item of itemsDelNivel) {
        if (posIndex < posiciones.length) {
            const [i, j] = posiciones[posIndex++];
            mapaRespuesta[i][j] = item;
        }
    }
    return mapaRespuesta;
};

const mapaAleatorio = mapaCopia.map((nivel, index) =>
    armarLaberinto(nivel, planDiario[index])
);
export const mapas = (indice: number): string[][] => mapaAleatorio[indice];
export const cantidadNiveles = (): number => mapaAleatorio.length;

export const contarObjetos = (mapa: string[][]): number => {
    let total = 0;
    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[i].length; j++) {
            if (mapa[i][j] === 'M' || mapa[i][j] === 'N' || mapa[i][j] === 'E') {
                total++;
            }
        }
    }
    return total;
};