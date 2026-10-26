import { useState, useEffect } from "react";
import { RecomendacionTipo1 } from "./Recomendacion1";
import { findDescripcion, createPlanta, getPlantas, profile } from "../../../assets/utils/sistema.api";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Search } from "lucide-react";
import { Listas } from "./Lista";

type Resultado = {
    especie: string;
    tipoPlanta: string;
    etapa: number;
    descripcion: string;
}
type PlantaData = {
    especie: string;
    descripcion: string;
    tipo: string;
    etapa: string;
    usuario: number; 
};

export function Layout1(){
    const [idUsuario, setIdUsuario] = useState(-1);
    const [especie, setEspecie] = useState('');
    const [tipoPlanta, setTipoPlanta] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [etapa, setEtapa] = useState(0); // 0: Semilla, 1: Plantín, 2: Planta joven

    const [buscando, setBuscando] = useState(false);
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
    const [mostrarListaArboles, setMostrarListaArboles] = useState(false);
    const [mostrarListaArbustos, setMostrarListaArbustos] = useState(false);
    const [mostrarListaFlores, setMostrarListaFlores] = useState(false);
    const [mostrarListaSuculentas, setMostrarListaSuculentas] = useState(false);

    const [divResultado, setDivResultado] = useState<Resultado | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [mostrar, setMostrar] = useState(false);
    const [formData, setFormData] = useState<PlantaData | null>(null);
    const [existe, setExiste] = useState(false);
    const [lista, setLista] = useState<PlantaData[]>([]);
    
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<PlantaData>();
    const navegacion = useNavigate();

    useEffect(() => {
        async function cargarListaPlantas() {
            const respuesta = await getPlantas();
            setLista(respuesta.data);
        }
        cargarListaPlantas();
        async function getID() {
            const response = await profile();
            setIdUsuario(response.id);
        }
        getID();

        const nuevaRecomendacion: Resultado = {
            especie: especie,
            tipoPlanta: tipoPlanta,
            etapa: etapa,
            descripcion: descripcion
        };

        setDivResultado(nuevaRecomendacion);

    },[especie,descripcion,tipoPlanta,etapa]);

    const guardarPlanta = async (data: PlantaData) => {
        const idUser: number = idUsuario;
        const planta = {
            ...data,
            usuario: idUser,
        };
        try {
          const res = await createPlanta(planta);
          console.log(res);
        } catch (error: any) {
          console.error("Error del servidor:", error.response?.data); 
        }
        setMostrar(false);
        navegacion('/mis-plantas');
        toast.success('Planta agregada a tu Jardin');
    };

    const confirmarPlanta = (data: PlantaData) => {    
        // Reiniciar el estado
        setExiste(false);

        // Verificar duplicado
        const yaExiste = lista.some(i => i.especie.toLowerCase() === data.especie.toLowerCase());

        setExiste(yaExiste);
        setFormData(data);
        setMostrar(true);
    }

    const onCancel = () => setMostrar(false);

    const buscarDescripcion = () => {
        console.log('buscando');
        
        if (especie.trim() !== "") {
            async function busquedaDescripcion(especie: string) {
                setBuscando(true);
                let progresoActual = 0;
                const intervalo = setInterval(() => {
                  progresoActual += 1;
                }, 50);

                try {
                    const respuesta = await findDescripcion(especie);
                    console.log("Respuesta API:", respuesta);
                    setDescripcion(respuesta.data.descripcion);  
                    setValue("descripcion", respuesta.data.descripcion);
                    setError(null);
                    setMostrarDescripcion(true); 
                } catch (err: any) {
                    if (err.response && err.response.status === 404) {
                        setError(
                            `No se encontró una descripción adecuada para "${especie}". ` +
                            "Puedes buscar información en Google y copiar una descripción en el campo de texto."
                          );
                      } else {
                        setError(
                            "La búsqueda es ambigua o no corresponde claramente a una planta. " +
                            "Prueba de nuevo o busca información en Google y escribir una descripción manualmente."
                          );
                        console.log(err);
                      }
                      setDescripcion("");
                      setMostrarDescripcion(false);
                } finally{
                    clearInterval(intervalo);
                    setTimeout(()=>{
                        setBuscando(false);
                    }, 500)
                }
            }
            busquedaDescripcion(especie);
        } else {
            setDescripcion('');
            setError(null);
            setMostrarDescripcion(false);
        }
    }

    const clasificar = (et: number) => {
        let res = ["semilla", "plantin", "planta_joven"][et];
        return res;
    }

    const buscarEnGoogle = () => {
        const query = encodeURIComponent(especie.trim());
        const url = `https://www.google.com/search?q=${query}`;
        window.open(url, "_blank");
    };

    return(
        <div className="grid grid-cols-1 md:flex m-1">
            <div className="w-full md:flex-1 p-4">
                <section className="m-2 p-4 max-w-4xl w-full mx-auto border-2 border-gray-400 rounded-lg">
                    <div>
                        <label className="text-sm font-medium">Escribe la especie de tu planta <span className="text-red-500 font-bold ml-0.5">*</span> </label>
                        <input type="text" placeholder="Pino, Limon, Girasol" onChange={(e) => {
                                const valor = e.target.value;
                                setEspecie(valor);
                                setValue('especie', valor); 
                            }}
                            className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:border-green-500 dark:text-black" />
                            {errors.especie && <span className="text-orange-600">No ingresaste un nombre de planta</span> }
                    </div>
                    <div className="m-2 p-4 max-w-4xl w-full mx-auto ">
                        <p className="text-sm font-medium mb-3">Tu planta puede pertenecer a uno de estos tipos <span className="text-red-500 font-bold ml-0.5">*</span></p>
                        <div className="grid grid-cols-2 md:grid-cols-4">
                            <div className="p-2 mx-auto m-2 flex justify-center">
                                <label className={`cursor-pointer border rounded-lg p-3 text-center transition-all 
                                    ${tipoPlanta.includes('arbol') ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                                    <input className="hidden" type="radio" value="arbol"
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            setTipoPlanta(valor);
                                            setValue('tipo', valor);
                                        }}
                                        checked={tipoPlanta.includes('arbol')}
                                        name="tipoPlanta" />
                                        <img src="arboles.JPG" alt="arboles" className="w-28 h-28 object-contain"/>
                                        <span className="text-sm font-medium">Arboles <span>
                                            <button
                                                onClick={() => setMostrarListaArboles(!mostrarListaArboles)}
                                                className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1.5"
                                            >
                                                <HelpCircle className="w-5 h-5" />
                                            </button>
                                            {mostrarListaArboles && (
                                                <Listas tipoPlanta="arbol"/>
                                            )}
                                            </span>
                                        </span>
                                </label>
                            </div>
                            <div className="p-2 mx-auto m-2 flex justify-center">
                                <label className={`cursor-pointer border rounded-lg p-3 text-center transition-all 
                                    ${tipoPlanta.includes('arbusto') ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                                    <input className="hidden" type="radio" value="arbusto"
                                         onChange={(e) => {
                                            const valor = e.target.value;
                                            setTipoPlanta(valor);
                                            setValue('tipo', valor);
                                        }}
                                        checked={tipoPlanta.includes('arbusto')}
                                        name="tipoPlanta" />
                                        <img src="arbustos.JPG" alt="arboles" className="w-28 h-28 object-contain"/>
                                        <span className="text-sm font-medium">Arbustos <span>
                                            <button
                                                onClick={() => setMostrarListaArbustos(!mostrarListaArbustos)}
                                                className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1.5"
                                            >
                                                <HelpCircle className="w-5 h-5" />
                                            </button>
                                            {mostrarListaArbustos && (
                                                <Listas tipoPlanta="arbusto"/>
                                            )}
                                            </span>
                                        </span>
                                </label>
                            </div>
                            <div className="p-2 mx-auto m-2 flex justify-center">
                                <label className={`cursor-pointer border rounded-lg p-3 text-center transition-all 
                                    ${tipoPlanta.includes('flor') ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                                    <input className="hidden" type="radio" value="flor"
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            setTipoPlanta(valor);
                                            setValue('tipo', valor);
                                        }}
                                        checked={tipoPlanta.includes('flor')}
                                        name="tipoPlanta" />
                                        <img src="flores.jpg" alt="arboles" className="w-28 h-28 object-contain"/>
                                        <span className="text-sm font-medium">Flores <span>
                                            <button
                                                onClick={() => setMostrarListaFlores(!mostrarListaFlores)}
                                                className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1.5"
                                            >
                                                <HelpCircle className="w-5 h-5" />
                                            </button>
                                            {mostrarListaFlores && (
                                                <Listas tipoPlanta="flor"/>
                                            )}
                                            </span>
                                        </span>
                                </label>
                            </div>
                            <div className="p-2 mx-auto m-2 flex justify-center">
                                <label className={`cursor-pointer border rounded-lg p-3 text-center transition-all 
                                    ${tipoPlanta.includes('suculenta') ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                                    <input className="hidden" type="radio" value="suculenta"
                                         onChange={(e) => {
                                            const valor = e.target.value;
                                            setTipoPlanta(valor);
                                            setValue('tipo', valor);
                                        }}
                                        checked={tipoPlanta.includes('suculenta')}
                                        name="tipoPlanta" />
                                        <img src="suculentas.JPG" alt="arboles" className="w-28 h-28 object-contain"/>
                                        <span className="text-sm font-medium">Suculentas <span>
                                            <button
                                                onClick={() => setMostrarListaSuculentas(!mostrarListaSuculentas)}
                                                className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1.5"
                                            >
                                                <HelpCircle className="w-5 h-5" />
                                            </button>
                                            {mostrarListaSuculentas && (
                                                <Listas tipoPlanta="suculenta"/>
                                            )}
                                            </span>
                                        </span>
                                </label>
                            </div>
                            {errors.tipo && <span className="text-orange-600">No seleccionaste el tipo de planta</span>}
                        </div>  
                    </div>
                    <br />
                    <div className="space-y-3"> 
                         {/* Botón y texto */}
                        <div className="flex items-center space-x-2">
                            <button 
                            onClick={buscarDescripcion} 
                            className="bg-sky-200 rounded-full p-2 hover:bg-sky-300 cursor-pointer transition-colors"
                            title="Buscar una descripción de la planta"
                            >
                                <Search className="w-5 h-5 text-gray-700" />
                            </button>
                            <span className="text-sm font-medium text-gray-700">Buscar una descripción de la planta <span className="text-red-500 font-bold ml-0.5">*</span></span>
                        </div>

                        {/* Estado: cargando */}
                        {buscando && (
                            <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-500"/> 
                            <span className="text-sm text-gray-600">Buscando descripción...</span>
                            </div>
                        )}

                        {/* Error - busqueda manual */}
                        {error && !mostrarDescripcion && (
                            <div className="mt-4">
                                <div className="mt-3 flex items-center gap-2">
                                    <p className="text-sm font-semibold">{error}</p>
                                    <button
                                        onClick={buscarEnGoogle}
                                        className="cursor-pointer flex items-center gap-2 rounded-lg bg-white border px-3 py-1.5 shadow hover:bg-gray-200"
                                    >
                                        {/* Icono de Google como SVG */}
                                        <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 533.5 544.3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34-4.8-50.1H272v95.1h147c-6.3 34-25.2 62.8-53.9 82v68.1h86.7c50.8-46.8 80.7-115.8 80.7-195.1z"/>
                                        <path fill="#34A853" d="M272 544.3c72.6 0 133.6-23.9 178.1-64.8l-86.7-68.1c-24.1 16.2-55.1 25.6-91.4 25.6-70 0-129.4-47.1-150.7-110.4H30.5v69.7c44.2 87.4 134.6 148 241.5 148z"/>
                                        <path fill="#FBBC05" d="M121.3 326.6c-10.1-30-10.1-62.2 0-92.2v-69.7H30.5c-41.4 82.7-41.4 180.9 0 263.6l90.8-69.7z"/>
                                        <path fill="#EA4335" d="M272 107.7c38.7-.6 75.8 13.5 104.1 39.6l77.9-77.9C405.6 24.7 345.3 0 272 0 165.1 0 74.7 60.6 30.5 148.1l90.8 69.7C142.6 154.8 202 107.7 272 107.7z"/>
                                        </svg>
                                        <span className="text-sm font-medium">Buscar</span>
                                    </button>
                                </div>       
                                <textarea
                                    onChange={(e)=>{ setDescripcion(e.target.value); setValue("descripcion",e.target.value)}}
                                    rows={4}
                                    className="w-full border rounded p-2 mt-2"
                                    placeholder="Descripción de la planta..."
                                ></textarea>
                            </div>
                        )}
                    </div>
                    <br />
                    {errors.descripcion && !descripcion && <span className="text-orange-600">No buscaste una descripción de tu planta</span>}
                    {mostrarDescripcion && descripcion &&(
                        <div className="m-1.5">
                            {descripcion && <p className="text-sm text-teal-800"><strong>Descripción:</strong> {descripcion}</p>}
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    )}
                    <br />
                    <div className="w-full max-w-md mx-auto my-4">
                        <label className="block mb-2 font-semibold">Selecciona la etapa de la planta: <span className="text-red-500 font-bold ml-0.5">*</span></label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="1"
                            value={etapa}
                            onChange={(e) => {
                                const valor = e.target.value;
                                const nuevoValor = parseInt(valor);
                                setEtapa(nuevoValor);
                                setValue('etapa',clasificar(nuevoValor));
                            }}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                        />
                        <div className="flex justify-between mt-2 text-sm font-medium text-gray-700">
                            <span>Semilla 🌱</span>
                            <span>Plantín 🌿</span>
                            <span>Planta joven 🌳</span>
                        </div>
                        {errors.etapa && <span className="text-orange-600">No seleccionaste la etapa actual de tu planta</span>}
                        {etapa !== -1 &&(
                            <p className="mt-2 font-semibold">Etapa seleccionada: {etapa === 0 ? "Semilla" : etapa === 1 ? "Plantín" : etapa === 2 ? "Planta joven": ""}</p>
                        )}
                    </div>
                    <form onSubmit={handleSubmit(confirmarPlanta)}>
                        <input type="text" className="hidden" {...register('especie', {required:true})} value={especie}/>
                        <input type="text" className="hidden" {...register('tipo', {required:true})} value={tipoPlanta}/>
                        <input type="text" className="hidden" {...register('descripcion', {required:true})} value={descripcion}/>
                        <input type="text" className="hidden" {...register('etapa', {required:true})} value={clasificar(etapa)}/>
                        <button className="text-white font-bold cursor-pointer rounded-lg mt-2 bg-green-500 hover:bg-green-600 text-sm sm:w-auto px-5 py-2.5 text-center focus:ring-green-300">Guardar &#10003;</button>    
                    </form>
                </section> 
            </div>
            <div className="w-full md:w-1/3 p-4">
                {divResultado && (
                    <RecomendacionTipo1 
                        especie={divResultado.especie}
                        tipoPlanta={divResultado.tipoPlanta}
                        etapa={divResultado.etapa}
                        descripcion={divResultado.descripcion}
                    />
                )}
            </div>
            {mostrar &&( 
                <div className="fixed z-10 inset-0 overflow-y-auto bg-opacity-50 flex items-center justify-center">
                    <div className="bg-amber-100 rounded-lg shadow-xl overflow-hidden">
                        <div className="px-6 py-4">
                            <p className="font-bold text-xl mb-2 text-center"> ¿Deseas guardar la planta en "Tu jardin" ?</p>
                            <p className="mt-5">Recuerda descargar tu recomendacion antes de guardar tu planta</p>
                            {existe && (
                                <p className="mt-5"> ⚠️En tu jardin existe una planta con el mismo nombre!!</p>
                            )}
                        </div>
                        <div className="px-6 py-4 bg-amber-100 text-right">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2 cursor-pointer"
                                onClick={onCancel}> Cancelar
                            </button>
                            {formData && (
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                    onClick={() => guardarPlanta(formData)}> Confirmar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}