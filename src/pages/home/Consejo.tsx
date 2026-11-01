import { useEffect, useState } from "react";
import { getMensajesDesbloqueados } from "../../assets/utils/sistema.api";

interface MensajeData {
    id: number;
    titulo: string;
    descripcion: string;
    desbloqueado: boolean;
}

interface ConsejoProps {
    progresoJuegoId: number | undefined;
}

export function Consejo({ progresoJuegoId }: Readonly<ConsejoProps>) {
    const [indiceConsejo, setIndiceConsejo] = useState(0);
    const [consejoVisible, setConsejoVisible] = useState(true);
    const [lista, setLista] = useState<MensajeData[]>([]);

    // Primera carga: obtener los consejos de la base de datos
    useEffect(() => {
        if (progresoJuegoId === undefined) return;

        let activo = true;
        async function cargarMensajes() {
            try {
                const res = await getMensajesDesbloqueados(progresoJuegoId!);
                if (activo) {
                    setLista(res.data);
                    setIndiceConsejo(0);
                    setConsejoVisible(true);
                }
            } catch (error) {
                console.error("Error al cargar los consejos:", error);
            }
        }

        cargarMensajes();

        return () => {
            activo = false;
        };

    }, [progresoJuegoId]);

    // Segunda carga: controlar las transiciones
    useEffect(() => {
        const total = lista.length;
        if (total === 0) return;
        let temporizadorCambio: ReturnType<typeof setTimeout>;
        let temporizadorMostrar: ReturnType<typeof setTimeout>;

        const programarCambio = () => {
            const tiempo = Math.floor(Math.random() * 20001) + 20000;
            temporizadorCambio = setTimeout(() => {
                setConsejoVisible(false);
                temporizadorMostrar = setTimeout(() => {
                    setIndiceConsejo((actual) => (actual + 1) % total);
                    setConsejoVisible(true);
                    programarCambio();
                }, 700);
            }, tiempo);
        };

        programarCambio();

        return () => {
            clearTimeout(temporizadorCambio);
            clearTimeout(temporizadorMostrar);
        };

    }, [lista]);


    if (lista.length === 0) return null;

    const mensajeActual = lista[indiceConsejo];

    if (!mensajeActual) return null;

    return (
        <div className="max-w-4xl mx-auto w-full px-4 mt-10">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-7 bg-lime-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">
                    Consejo para tu jardín
                </h2>
            </div>
            <div className={`relative overflow-hidden rounded-2xl border border-yellow-300 bg-yellow-50 shadow-sm p-6 md:p-8 transition-opacity duration-700 ${consejoVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
    
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-gray-500">
                            Consejo {mensajeActual.id} de {lista.length}
                        </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">
                        {mensajeActual.titulo}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                        {mensajeActual.descripcion}
                    </p>
                </div>
            </div>
        </div>
    );
}