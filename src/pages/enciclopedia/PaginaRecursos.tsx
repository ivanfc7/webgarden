import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { listaTemas, cantidadTemas } from "../../assets/utils/AprendizajeGame";
import { LockKeyholeOpen } from "lucide-react";
import { BarraNavegacion } from "../../components/BarraNavegacion";

type Tema = [number, string, string, string, string, string];

export default function PaginaRecursos() {
    const temas: Tema[] = Array.from(
        { length: cantidadTemas() },
        (_, indice) => listaTemas(indice)
    );
    const [temaSeleccionado, setTemaSeleccionado] = useState<Tema | null>(null);

    /**Vista inicial: listado de temas */
    if (!temaSeleccionado) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-300 flex flex-col">
                <BarraNavegacion></BarraNavegacion>
                <main className="min-h-screen bg-[#f7fee7] px-4 py-8 sm:px-6 lg:px-10  bg-gradient-to-br from-amber-50 via-white to-lime-300 flex flex-col">
                    <section className="mx-auto max-w-7xl ">
                        <div className="mb-8 rounded-2xl border border-[#b6d7a8]/60 bg-white p-6 shadow-sm sm:p-8">
                            <h1 className="text-3xl font-bold text-[#2d572c] sm:text-4xl">
                                Recursos de lectura
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#7b7290] sm:text-base">
                                Explora diferentes contenidos sobre las plantas, los árboles y el cuidado de la naturaleza.
                            </p>
                        </div>
                        <div className="mb-5">
                            <h2 className="text-xl font-bold text-[#0b4f4a]">
                                Explora los contenidos
                            </h2>
                            <p className="mt-1 text-sm text-[#7b7290]">
                                Selecciona un tema para comenzar a leer
                            </p>
                        </div>

                        {temas.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {temas.map((tema) => (
                                    <button key={tema[0]} type="button"
                                        onClick={() => {
                                            setTemaSeleccionado(tema);
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }}
                                        className="group overflow-hidden rounded-2xl border border-[#b6d7a8]/70 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9acf00] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#9acf00] cursor-pointer">
                                        <div className="h-48 overflow-hidden bg-[#e5e7eb]">
                                            {tema[3] ? (
                                                <img src={tema[3]} alt={tema[1]} loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-5xl">🌱</div>
                                            )}
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-[#0b4f4a]"> {tema[1]} </h3>
                                            <div className="mt-4 flex border-t border-[#e5e7eb] pt-3">
                                                <span className="text-xs text-[#7b7290]">
                                                    Explorar contenido
                                                </span>
                                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                {/* TARJETA PARA DESBLOQUEAR MÁS TEMAS */}
                                <div className="flex flex-col items-center justify-center text-center min-h-[220px] p-6 rounded-xl border-2 border-dashed border-[#9acf00] bg-lime-50 transition-all duration-300 hover:bg-lime-100">
                                    <LockKeyholeOpen size={38} strokeWidth={1.7} className="text-[#2d572c] mb-4" />
                                    <h3 className="text-lg font-semibold text-[#2d572c] mb-2">
                                        ¿Quieres aprender más?
                                    </h3>
                                    <p className="text-sm text-gray-600 max-w-[220px] leading-relaxed">
                                        Desbloquea más contenidos educativos mientras avanzas en el juego.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="rounded-xl bg-white p-8 text-center text-[#7b7290]">
                                Todavía no hay temas disponibles.
                            </p>
                        )}
                    </section>
                </main>
            </section>
        );
    }
    /** Vista de lectura */
    const [id, titulo, contenido, imagen, fuente] = temaSeleccionado;
    return (
        <div >
            <BarraNavegacion></BarraNavegacion>
            <main className="min-h-screen bg-[#f7fee7] ">
                <div className="mx-auto flex max-w-[1600px] flex-col lg:min-h-screen lg:flex-row">
                    {/* Índice lateral de temas */}
                    <aside className="w-full border-b border-[#b6d7a8] bg-white lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
                        <div className="p-5">
                            <button
                                type="button"
                                onClick={() => setTemaSeleccionado(null)}
                                className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#2d572c] transition-colors hover:text-[#9acf00] cursor-pointer">
                                &#9664; Volver a los temas
                            </button>
                            <div className="mb-5">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#7b7290]">
                                    Recursos de lectura
                                </span>
                                <h2 className="mt-2 text-xl font-bold text-[#2d572c]">
                                    Índice de contenidos
                                </h2>
                            </div>
                            <div className="mb-4 h-1 w-12 rounded-full bg-[#9acf00]" />
                                <nav className="flex gap-2 overflow-x-auto pb-3 lg:flex-col lg:overflow-visible lg:pb-0">
                                {temas.map((tema, indice) => {
                                    const activo = tema[0] === id;
                                    return (
                                        <button
                                            key={tema[0]}
                                            type="button"
                                            onClick={() => {
                                                setTemaSeleccionado(tema);
                                                window.scrollTo({ top: 0, behavior: "smooth" });
                                            }}
                                            aria-current={activo ? "page" : undefined}
                                            className={`min-w-48 shrink-0 rounded-xl border p-3 text-left transition-all duration-200 lg:min-w-0 cursor-pointer
                                            ${activo
                                                    ? "border-[#9acf00] bg-[#f7fee7] shadow-sm"
                                                    : "border-transparent bg-white hover:border-[#b6d7a8] hover:bg-[#f7fee7]"
                                                }`} >
                                            <div className="flex items-center gap-3">
                                                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold
                                                ${activo
                                                        ? "bg-[#bbf451] text-[#2d572c]"
                                                        : "bg-[#e5e7eb] text-[#7b7290]"
                                                    }`}>
                                                    {indice + 1}
                                                </span>
                                                <span className={`text-sm font-semibold leading-snug
                                                ${activo
                                                        ? "text-[#0b4f4a]"
                                                        : "text-[#7b7290]"
                                                    }`}>
                                                    {tema[1]}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Contenido principal */}
                    <section className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
                        <article className="mx-auto max-w-4xl">
                            {/* Encabezado */}
                            <div className="mb-6">
                                <span className="inline-block rounded-full bg-[#bbf451]/40 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#2d572c]">
                                    Recurso
                                </span>
                                <h1 className="mt-4 text-3xl font-bold leading-tight text-[#2d572c] sm:text-4xl">
                                    {titulo}
                                </h1>
                                <div className="mt-5 h-1 w-20 rounded-full bg-[#9acf00]" />
                            </div>
                            {/* Imagen principal */}
                            {imagen && (
                                <div className="mb-8 overflow-hidden rounded-2xl border border-[#b6d7a8]/60 bg-white shadow-sm">
                                    <img src={imagen} alt={titulo} className="max-h-[420px] w-full object-contain rounded-xl"  />
                                </div>
                            )}
                            {/* Texto del tema */}
                            <div className="rounded-2xl border border-[#b6d7a8]/50 bg-white p-5 shadow-sm sm:p-8">
                                <div className="prose prose-base max-w-none prose-headings:font-bold prose-headings:text-[#0b4f4a]  prose-p:leading-8  prose-p:text-[#7b7290]  prose-strong:text-[#2d572c] prose-a:text-[#0b4f4a] prose-li:text-[#7b7290] prose-img:rounded-xl">
                                    <ReactMarkdown
                                        components={{
                                            h2: ({ children }) => (
                                                <h2 className="text-xl font-semibold mb-2 mt-4">
                                                    {children}
                                                </h2>
                                            ),
                                            ul: ({ children }) => (
                                                <ul className="list-disc list-inside pl-4 mb-4">
                                                    {children}
                                                </ul>
                                            ),
                                            p: ({ children }) => (
                                                <p className="mb-4 text-justify">
                                                    {children}
                                                </p>
                                            ),
                                        }}
                                    >
                                        {contenido || "No hay contenido disponible para este tema."}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {/* Fuente */}
                            {fuente && (
                                <div className="mt-6 rounded-xl border border-[#b6d7a8]/50 bg-[#fef3c6] p-5">
                                    <h3 className="mb-2 font-bold text-[#2d572c]">
                                        Fuente de información
                                    </h3>

                                    <div className="break-words text-sm leading-relaxed text-[#7b7290]">
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => (
                                                    <p className="mb-2 text-sm">
                                                        {children}
                                                    </p>
                                                ),
                                                a: ({ children, href }) => (
                                                    <a
                                                        href={href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline text-emerald-900 font-semibold"
                                                    >
                                                        {children}
                                                    </a>
                                                ),
                                            }}
                                        >
                                            {fuente}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}

                            {/* Navegación entre temas */}
                            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                                <button type="button"
                                    onClick={() => {
                                        const indice = temas.findIndex(t => t[0] === id);

                                        if (indice > 0) {
                                            setTemaSeleccionado(temas[indice - 1]);
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }
                                    }}
                                    disabled={temas.findIndex(t => t[0] === id) === 0}
                                    className="rounded-xl border border-[#b6d7a8] bg-white px-5 py-3 text-sm font-semibold text-[#2d572c] transition hover:bg-[#f7fee7] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                                > 
                                    &#9664; Tema anterior
                                </button>
                                <button type="button"
                                    onClick={() => {
                                        const indice = temas.findIndex(t => t[0] === id);

                                        if (indice < temas.length - 1) {
                                            setTemaSeleccionado(temas[indice + 1]);
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }
                                    }}
                                    disabled={temas.findIndex(t => t[0] === id) === temas.length - 1}
                                    className="rounded-xl bg-[#2d572c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4f4a] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                                >
                                    Siguiente tema &#9654;
                                </button>
                            </div>
                        </article>
                    </section>
                </div>
            </main>
        </div>
    );
}
