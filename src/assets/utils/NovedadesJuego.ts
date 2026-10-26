const notificarCambio = () => {
    window.dispatchEvent(
        new Event("novedades-juego-actualizadas")
    );
};

export const marcarNovedad = (
    tipo: "consejos" | "aprendizajes"
) => {
    localStorage.setItem(`novedad_${tipo}`, "true");
    notificarCambio();
};

export const hayNovedad = (
    tipo: "consejos" | "aprendizajes"
) => {
    return localStorage.getItem(`novedad_${tipo}`) === "true";
};

export const marcarComoVisto = (
    tipo: "consejos" | "aprendizajes"
) => {
    localStorage.removeItem(`novedad_${tipo}`);
    notificarCambio();
};