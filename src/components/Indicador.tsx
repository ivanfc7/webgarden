import { useLocation } from "react-router-dom";

export function Indicador(){
    const locacion = useLocation();

    const rutas: {[key:string]:string}={
        '/inicio': 'Bienvenido !! 👏',
        '/aporte-ambiental': 'Impacto Ambiental del Árbol',
        '/conociendo-tu-planta': 'Conociendo tus Plantas',
        '/mis-plantas': 'Mis Plantas 🌿',
    };

    let nombreSeccion = '';

    if (locacion.pathname.startsWith('/aportes-plantas')) {
        nombreSeccion = 'Historial de Captura de Carbono';
    }else{
        nombreSeccion = rutas[locacion.pathname];
    }
    if (locacion.pathname.startsWith('/juego-educativo')) {
        nombreSeccion = 'Juego - El Jardin';
    }
    if (locacion.pathname.startsWith('/mis-aprendizajes')) {
        nombreSeccion = 'Mis Temas de Aprendizajes';
    }
    if (locacion.pathname.startsWith('/consejos-encontrados')) {
        nombreSeccion = 'Consejos para tomar en cuenta';
    }
    return(
        <h4 className="text-sm sm:text-base rounded-lg">{nombreSeccion}</h4>
    )
}