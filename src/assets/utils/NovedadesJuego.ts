export const marcarNovedad = (tipo: "consejos" | "aprendizajes") => {
    localStorage.setItem(`novedad_${tipo}`, "true");
};

export const hayNovedad = (tipo: "consejos" | "aprendizajes") => {
    return localStorage.getItem(`novedad_${tipo}`) === "true";
};

export const marcarComoVisto = (tipo: "consejos" | "aprendizajes") => {
    localStorage.removeItem(`novedad_${tipo}`);
};