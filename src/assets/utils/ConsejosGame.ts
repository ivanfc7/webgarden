const consejos = [
    {
        id: 4,
        titulo: "Uno sale, otro entra",
        descripcion: "Si vas a quitar una planta por el motivo que sea, procura poner una nueva planta en su lugar."
    }, 
    {
        id: 5,
        titulo: "¡Dale a tus plantas agua, pero no de más!",
        descripcion: "Evita el riego excesivo. Dale a cada planta la cantidad justa que necesita y, si puedes, utiliza agua de lluvia o agua reutilizada para mantenerlas hidratadas de manera sostenible."
    }, 
    {
        id: 6,
        titulo: "Escoge la maceta ideal",
        descripcion: "Usa macetas con buen drenaje y del tamaño adecuado para que sus raíces tengan espacio para respirar y crecer."
    }, 
    {
        id: 7,
        titulo: "Alimenta con abonos naturales",
        descripcion: "Opta por compost casero o fertilizantes orgánicos."
    }, 
    {
        id: 8,
        titulo: "Procura su fotosíntesis",
        descripcion: "Coloca tus plantas donde reciban la luz que necesitan. No todas son fanáticas del sol directo; algunas prefieren la sombra parcial"
    }, 
    {
        id: 9,
        titulo: "Limpia sus hojas",
        descripcion: "El polvo puede obstruir la respiración de tus plantas. Limpia sus hojas con un paño húmedo para que sigan respirando"
    }, 
    {
        id: 10,
        titulo: "Creatividad en la poda",
        descripcion: "Corta hojas y ramas secas para fomentar un crecimiento sano. Además, la poda ayuda a mantenerlas en forma y con estilo adecuado"
    }, 
    {
        id: 11,
        titulo: "Elige especies locales o nativas",
        descripcion: "Las plantas nativas de la zona crecen con mejor complejidad puesto que requeren menos cuidados ya que se desnvuelven mejor en su habitad. Introducir otras especies es mas complejo"
    }, 
    {
        id: 12,
        titulo: "La importancia de compartir consejos",
        descripcion: "Educa a otros sobre la importancia de cuidar las plantas. Inspira a tus amigos y familiares a llenar el mundo de verde"
    }, 
    {
        id: 13,
        titulo: "Adapta tus plantas al entorno y el clima.",
        descripcion: "Con tus plantas de interior. Lo mejor es en inviernos acercarlas a la ventana y en invierno alejarlas."
    }, 
    {
        id: 14,
        titulo: "Aprovecha la lluvia.",
        descripcion: "El agua de lluvia es lo ideal. Aconsejable recolectarla para el riego futuro de tus plantas"
    }, 
    {
        id: 15,
        titulo: "Aire en la tierra",
        descripcion: "Una buena estrategia es pinchar la tierra con un palillo, de esta forma el riego llegara mejor a las raices"
    }, 
    {
        id: 16,
        titulo: "El tronco de árbol es del árbol",
        descripcion: "En ocasiones se ha visto que los troncos son utilizados como un poste al ponerse encima algún tomacorriente y cables. Esto es peligroso para las aves que anidan en ellos"
    }, 
    {
        id: 17,
        titulo: "Las plantas merecen respeto",
        descripcion: "Ya sea que te encuentres en tu propio jardin o en actividades sociales en el sector publico manten en mente que: No se debe echar bebidas alcohólicas o refrescos, ni tampoco botar basura a los árboles"
    }
]

export const listaMensajes = (indice: number): [number, string, string] => {    
    return [consejos[indice].id, consejos[indice].titulo, consejos[indice].descripcion];
};

export function cantidadMensjaes():number{
    return consejos.length;
}
