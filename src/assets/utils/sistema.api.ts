import axios from "axios";

/** API REST DEL LINK PARA GENERAR USUARIO */
export const createUser = async (
    newuser: {     
       first_name: string,
       email: string, 
    }
) => {
    const response = await fetch("https://webgarden-backend.onrender.com/sistemaWeb/api/generar-link", {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(newuser), 
    });
    const data = await response.json();
    return data;
}

const BASE_URL = "https://webgarden-backend.onrender.com/sistemaWeb/api";

async function apiFetch(endpoint: string, opciones: RequestInit = {}) {
    // 1. Preparar headers con el token actual
    const headers: Record<string, string> = {
        // Convertimos posibles headers previos a un objeto simple
        ...(opciones.headers as Record<string, string>),
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    };

    if (opciones.body) {
        if (opciones.body instanceof FormData) {
            // Si es FormData, ELIMINAMOS el Content-Type
            delete headers['Content-Type'];
        } else {
            // Si es un objeto normal (JSON), aseguramos que sea application/json
            headers['Content-Type'] = 'application/json';
        }
    } else {
        // Si no hay body (GET, DELETE), no necesitamos Content-Type
        delete headers['Content-Type'];
    }
    // 2. Intentar la petición original
    let response = await fetch(`${BASE_URL}${endpoint}`, {
        ...opciones,
        headers,
        credentials: "include" // Importante para las cookies
    });

    // (Token expirado)
    if (response.status === 401) {
        const refreshRes = await fetch(`${BASE_URL}/token/refresh/`, {
            method: "POST",
            credentials: "include", // Envía la cookie refresh_token a Django
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();
            localStorage.setItem('access_token', data.access); // Guardamos el nuevo access_token

            // Reintentamos la petición original con el nuevo token
            return await fetch(`${BASE_URL}${endpoint}`, {
                ...opciones,
                headers: {
                    ...opciones.headers,
                    'Authorization': `Bearer ${data.access}`
                },
                credentials: "include"
            });
        } else {
            // El Refresh Token también caduco (pasaron 30 días)
            localStorage.removeItem('access_token');
            window.location.href = "/"; //pagina raiz
        }
    }
    return response;
}

/** API REST DEL PERFIL - NOMBRE */
export const profile = async () => {
    const response = await apiFetch("/profile", { method: "POST" });
    const data = await response.json();
    return data;
}
export const getTotalPlantas = async () => {
    const response = await apiFetch("/total-plantas", { method: "GET" });
    const data = await response.json();
    return data;
}
export const getTotalAportes = async () => {
    const response = await apiFetch("/total-aportes", { method: "GET" });
    const data = await response.json();
    return data;
}

/** API REST DEL JUEGO */
export const getProgresoJuego = async () => {
    const response = await apiFetch("/progreso/", { method: "GET" });
    const data = await response.json();
    return { data: data};
}
export const updateContadorMensajes = async () => {
    const response = await apiFetch("/progreso/incrementar-contador-msj/", { method: "POST" });
    const data = await response.json();
    return { data: data};
}
export const updateContadorAprendizaje = async () => {
    const response = await apiFetch("/progreso/incrementar-contador-apzj/", { method: "POST" });
    const data = await response.json();
    return { data: data};
}
export const getFechaJuego = async () => {
    const response = await apiFetch("/progreso/puede-jugar/", {method:"GET"});
    const data = await response.json();
    return data;
}
export const updateFechaJuego = async () => {
    const response = await apiFetch("/progreso/actualizar-fecha/",{method:"POST"});
    const data = await response.json();
    return { data: data};
}

/** API REST DE LOS MENSAJES */
export const getMensajesDesbloqueados = async (id:number) => {
    const response = await apiFetch(`/mensaje/?progreso=${id}`, {method: "GET"});
    return {data: await response.json()};
}
export const saveMensajeDesbloqueado = async ( mensaje: {
    titulo: string;
    descripcion: string;
    desbloqueado: boolean;} 
  ) => {
    const response = await apiFetch("/mensaje/", { method: "POST", body: JSON.stringify(mensaje)});
    return {data: await response.json()};
}

/** API REST DE LOS APRENDIZAJES */
export const getAprendizajeDesbloqueado = async (id: number) => {
    const response = await apiFetch(`/aprendizaje/?progreso=${id}`, {method: "GET"});
    return {data: await response.json()};
}
export const saveAprendizajeDesbloqueado = async (aprendizaje: {
    titulo:string;
    contenido:string;
    imagen:string;
    video:string;
    fuente:string;
    desbloqueado:boolean;
}) => {
    const response = await apiFetch("/aprendizaje/", { method: "POST", body: JSON.stringify(aprendizaje)});
    return {data: await response.json()};
}

/** API REST DE PLANTA */
export const createPlanta = async (planta: {
    especie: string, 
    descripcion:string, 
    tipo: string, 
    etapa: string
}) => {
    const response = await apiFetch("/planta/", {method: "POST", body: JSON.stringify(planta)});
    return {data: await response.json()};
}
export const getPlantas = async () => {
    const response = await apiFetch("/planta/", { method: "GET" });
    return { data: await response.json() };
}
export const getPlantaById = async (id:string) => {
    const response = await apiFetch(`/planta/${id}`, {method: "GET"});
    return {data: await response.json()};
}
export const updateFotoPlantaById = async(id: string, foto:File) => {
    const formData = new FormData();
    formData.append('foto', foto);
    const response = await apiFetch(`/planta/${id}/`, {method: "PATCH", body: formData});
    return {data: await response.json()};
}
export const updateEtapa = async(id:string, nuevaEtapa:string)=>{
    const response = await apiFetch(`/planta/${id}/actualizar-etapa/`,{method: "PATCH", body: JSON.stringify({ etapa: nuevaEtapa })});
    return {data: await response.json()};
};

/** API REST DE APORTES AMBIENTALES */
export const createAporte = async(
    aporte: {
        cantidad: number, 
        oxigenoTotal: number, 
        carbonoTotal: number, 
        co2Total: number
    }
) => {
    const response = await apiFetch("/aporte/", {method: "POST",  body: JSON.stringify(aporte)});
    return {data: await response.json()};
}
export const getAportesByPlanta = async(id: string) => {
    const response = await apiFetch(`/aporte/?planta=${id}`, {method: "GET"});
    return {data: await response.json()};
}

/** API REST DE FUNCION BUSQUEDA */
export const findDescripcion = (palabra: string) =>
    axios.get(`https://webgarden-backend.onrender.com/sistemaWeb/api/buscar_descripcion/`, {
      params: { palabra }
});

