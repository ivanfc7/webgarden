import { useForm } from 'react-hook-form';

type Acciones = {
    atras: () => void;
    siguiente: () => void;
    datos: (data: any) => void;
    datoActual: any
};

export function Step2Cantidad({atras, siguiente, datos, datoActual}: Acciones){
    const seleccionar = (cantidad: Number)=>{
        datos({cantidadPlantas: cantidad});
        siguiente();
    };
    const cantidadSeleccionada = datoActual?.cantidadPlantas;
    const cardClass = (valorCantidad: Number) => `cursor-pointer m-2 block max-w-sm p-6 border-gray-200 rounded-lg shadow-sm ${
        cantidadSeleccionada === valorCantidad
            ? 'bg-sky-200 border-sky-200'
            : 'bg-sky-50 border-sky-50 hover:bg-sky-100'
    }`;

    const {register, handleSubmit} = useForm();
    
    const registrarCantidadPersonalizada = handleSubmit( data => {
        const valor = parseInt(data.otraCantidad);
        if (!isNaN(valor) && valor > 0) {
            datos({cantidadPlantas: valor});
            siguiente();
        }  
    });

    const cantidadIngresada = datoActual?.cantidadPlantas;

    return (
        <div>
            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black text-center">¿Cuantas plantas de {datoActual.especiePlanta} tienes?</p>
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div onClick={() => seleccionar(1)} className={cardClass(1)}>
                    <p className="text-4xl text-center">1</p>
                </div>     
                <div onClick={() => seleccionar(3)} className={cardClass(3)}>
                    <p className="text-4xl text-center">3</p>
                </div>    
                <div onClick={() => seleccionar(5)} className={cardClass(5)}>
                   <p className="text-4xl text-center">5</p>
                </div>   
                <form onSubmit={registrarCantidadPersonalizada}>
                    <div className={cardClass(![1,3,5].includes(cantidadIngresada)? cantidadIngresada: 0)}>
                        <input type="number" {...register('otraCantidad')}  
                        defaultValue={![1,3,5].includes(cantidadIngresada)? cantidadIngresada: ''}
                        className="w-full text-4xl text-center bg-transparent border-none outline-none" placeholder='+' />
                    </div>
                    <button type="submit" className="cursor-pointer text-sm text-blue-600 hover:underline mt-2 block mx-auto">
                        Listo !!
                    </button>
                </form>                
            </div>  
              
            <button className="cursor-pointer ml-2 mr-2 rounded-lg mt-10 bg-amber-200 p-2 hover:bg-amber-300" onClick={atras}> &#9664; Volver</button>
        </div>
    )
}