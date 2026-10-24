import { Cloudy, Sun, CloudRain } from "lucide-react";
import { getPlantas } from "../../../assets/utils/sistema.api";
import { useEffect, useState } from "react";
import { RecomendacionTipo2 } from "./Recomendacion2";
import { SinPlantas } from "../../../components/SinPlantas";
import TimeLine from "./TimeLine";

interface Planta {
    id: string;
    especie: string;
    tipo: string;
    etapa: string;
}
type Resultado = {
    laPlanta: Planta;
    tierra: string;
    clima: string;
    hojas: string;
}

export function Layout2() {
    const [lista, setLista] = useState<Planta[]>([]);
    const [idPlanta, setIdPlanta] = useState('');
    const [especiePlanta, setEspeciePlanta] = useState('');
    const [tipoPlanta, setTipoPlanta] = useState('');
    const [etapaPlanta, setEtapaPlanta] = useState('');
    const [tipoTierra, setTipoTierra] = useState('');
    const [clima, setClima] = useState('');
    const [tipoHojas, setTipoHojas] = useState('');
    const [divResultado, setDivResultado] = useState<Resultado | null>(null);

    const hojas = [
        { nombre: 'tipoA', imagen: '/img_hojas/Mas_agua.JPG' },
        { nombre: 'tipoB', imagen: '/img_hojas/Mas_sol.JPG' },
        { nombre: 'tipoC', imagen: '/img_hojas/Mas_sombra.JPG' },
        { nombre: 'tipoD', imagen: '/img_hojas/Menos_agua.JPG' },
        { nombre: 'tipoE', imagen: '/img_hojas/Presa_bichos.JPG' },
        { nombre: 'tipoF', imagen: '/img_hojas/Tiene_hongos.JPG' }
    ];

    useEffect(() => {
        async function cargarPlantas() {
            const res = await getPlantas();
            setLista(res.data);
        }
        cargarPlantas();

        const plantaRes: Planta = {
            id: idPlanta, 
            especie: especiePlanta,
            tipo: tipoPlanta,
            etapa: etapaPlanta
        }
        console.log(plantaRes);
        
        const nuevaRecomendacion: Resultado = {
            laPlanta: plantaRes,
            tierra: tipoTierra,
            clima: clima,
            hojas: tipoHojas
        };

        setDivResultado(nuevaRecomendacion);
    },[especiePlanta,tipoTierra,clima,tipoHojas]);

    return (
        <div className="grid grid-cols-1 md:flex m-1">
            <div className="w-full md:flex-1 p-4">
                <section className="m-2 p-4 max-w-4xl w-full mx-auto border-2 border-gray-400 rounded-lg">
                    <label className="text-sm font-medium">Elige tu planta</label>
                    {lista.length === 0 ? (
                        <SinPlantas/>
                    ) : (
                        <select className="bg-white border border-green-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:border-green-500 dark:text-black" 
                            onChange={e => {
                                const [especie, tipo, etapa, idPlanta] = e.target.value.split('/');
                                setEspeciePlanta(especie);
                                setTipoPlanta(tipo);
                                setEtapaPlanta(etapa);
                                setIdPlanta(idPlanta);
                            }}>
                            <option value="">Tu planta es</option>
                            {lista.map((planta, index) => (
                                <option key={index} value={planta.especie+'/'+planta.tipo+'/'+planta.etapa+'/'+planta.id} >{planta.especie}</option>
                            ))}
                        </select>
                    )}
                </section>
                {idPlanta && (
                    <div>
                        <section className="m-2 p-4 max-w-4xl w-full mx-auto border-2 border-gray-400 rounded-lg">
                            <p className="text-xl dark:text-teal-900 font-semibold mb-2">Tipo de tierra en el que estan tus plantas</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4">
                                <div className="p-2 mx-auto flex justify-center">
                                    <label className={`cursor-pointer border rounded-lg p-3 text-center transition-all 
                                                ${tipoTierra.includes('arenoso') ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                                        <input className="hidden" type="radio" value="arenoso"
                                            onChange={e => setTipoTierra(e.target.value)}
                                            checked={tipoTierra.includes('arenoso')}
                                            name="tipoTierra" id="arenoso" />
                                            <img src="sueloArenoso.JPG" alt="Tierra Arenosa" className="w-36 h-36 object-contain"/>
                                        <span className="text-sm font-medium">Tierra Arenosa </span>
                                    </label>
                                </div>
                                <div className="p-2 mx-auto flex justify-center">
                                    <label className={`cursor-pointer border rounded-lg p-3 text-center transition-all 
                                                ${tipoTierra.includes('pedregoso') ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                                        <input className="hidden" type="radio" value="pedregoso"
                                            onChange={e => setTipoTierra(e.target.value)}
                                            checked={tipoTierra.includes('pedregoso')}
                                            name="tipoTierra" id="pedregoso" />
                                            <img src="sueloPedregoso.JPG" alt="Tierra Arenosa" className="w-36 h-36 object-contain"/>
                                        <span className="text-sm font-medium">Tierra Pedregosa</span>
                                    </label>
                                </div>
                                <div className="p-2 mx-auto flex justify-center">
                                    <label className={`cursor-pointer border rounded-lg p-3 text-center transition-all 
                                                ${tipoTierra.includes('arcilloso') ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                                        <input className="hidden" type="radio" value="arcilloso"
                                            onChange={e => setTipoTierra(e.target.value)}
                                            checked={tipoTierra.includes('arcilloso')}
                                            name="tipoTierra" id="arcilloso" />
                                            <img src="sueloArcilloso.JPG" alt="Tierra Arenosa" className="w-36 h-36 object-contain"/>
                                        <span className="text-sm font-medium">Tierra Arcillosa</span>
                                    </label>
                                </div>
                                <div className="p-2 mx-auto flex justify-center">
                                    <label className={`cursor-pointer border rounded-lg p-3 text-center transition-all 
                                                ${tipoTierra.includes('mixto') ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                                        <input className="hidden" type="radio" value="mixto"
                                            onChange={e => setTipoTierra(e.target.value)}
                                            checked={tipoTierra.includes('mixto')}
                                            name="tipoTierra" id="mixto" />
                                            <img src="sueloMixto.JPG" alt="Tierra Arenosa" className="w-36 h-36 object-contain"/>
                                        <span className="text-sm font-medium">Tierra Mixta</span>
                                    </label>
                                </div>
                            </div>
                        </section>
                        <section className="m-2 p-4 max-w-4xl w-full mx-auto border-2 border-gray-400 rounded-lg">
                            <p className="text-xl dark:text-teal-900 font-semibold mb-2">El clima actual de la ciudad</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 sm:p-3">
                                    <div className="flex justify-center p-1 sm:p-2">
                                        <label
                                            className={`w-full h-full cursor-pointer border rounded-lg p-2 sm:p-3 text-center transition-all
                                                ${clima.includes('caluroso')
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-300'}`}
                                        >
                                            <input
                                                className="hidden"
                                                type="radio"
                                                value="caluroso"
                                                onChange={e => setClima(e.target.value)}
                                                checked={clima.includes('caluroso')}
                                                name="clima"
                                            />
                                            <span className="flex justify-center mb-1">
                                                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium block">
                                                Soleado / Caluroso
                                            </span>
                                        </label>
                                    </div>

                                    <div className="flex justify-center p-1 sm:p-2">
                                        <label
                                            className={`w-full h-full cursor-pointer border rounded-lg p-2 sm:p-3 text-center transition-all
                                                ${clima.includes('lluvioso')
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-300'}`}
                                        >
                                            <input
                                                className="hidden"
                                                type="radio"
                                                value="lluvioso"
                                                onChange={e => setClima(e.target.value)}
                                                checked={clima.includes('lluvioso')}
                                                name="clima"
                                            />
                                            <span className="flex justify-center mb-1">
                                                <CloudRain className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium block">
                                                Lluvioso
                                            </span>
                                        </label>
                                    </div>

                                    <div className="flex justify-center p-1 sm:p-2">
                                        <label
                                            className={`w-full h-full cursor-pointer border rounded-lg p-2 sm:p-3 text-center transition-all
                                                ${clima.includes('nublado')
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-300'}`}
                                        >
                                            <input
                                                className="hidden"
                                                type="radio"
                                                value="nublado"
                                                onChange={e => setClima(e.target.value)}
                                                checked={clima.includes('nublado')}
                                                name="clima"
                                            />
                                            <span className="flex justify-center mb-1">
                                                <Cloudy className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium block">
                                                Templado / Nublado
                                            </span>
                                        </label>
                                    </div>
                                </div>
                        </section>
                        <section className="m-2 p-4 max-w-4xl w-full mx-auto border-2 border-gray-400 rounded-lg">
                            <p className="text-xl dark:text-teal-900 font-semibold mb-2">Las hojas de tu planta</p>
                            <p>¿Algunas de las hojas de tu planta lucen o tienen algun aspecto similar ?</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {hojas.map((hoja) => (
                                    <label
                                        key={hoja.nombre}
                                        className={`cursor-pointer border rounded-lg p-3 text-center transition-all 
                                                ${tipoHojas.includes(hoja.nombre) ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
                                    >
                                        <input
                                            type="radio"
                                            onChange={() => setTipoHojas(hoja.nombre)}
                                            checked={tipoHojas.includes(hoja.nombre)}
                                            className="hidden"
                                        />
                                        <img
                                            src={hoja.imagen}
                                            alt={hoja.nombre}
                                            className="w-16 h-16 mx-auto mb-2 object-contain"
                                        />
                                    </label>
                                ))}
                            </div>
                        </section>
                        {especiePlanta && (
                            <section className="m-2 p-4 max-w-4xl w-full mx-auto border-2 border-gray-400 rounded-lg">
                                 <TimeLine idPlanta={idPlanta} tipo={tipoPlanta} etapa={etapaPlanta}/>
                            </section>
                        )}
                    </div>
                )}
            </div>
            <div className="w-full md:w-1/3 p-4">
                <p className="text-xl dark:text-teal-900 font-semibold mb-2">Recomendaciones de cuidado</p>
                {divResultado && (
                    <RecomendacionTipo2
                        laPlanta={divResultado.laPlanta}
                        tierra={divResultado.tierra}
                        clima={divResultado.clima}
                        hojas={divResultado.hojas}
                    />
                )}
            </div>
        </div>
    )
}