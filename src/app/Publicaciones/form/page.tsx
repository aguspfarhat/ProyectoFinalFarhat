// 'use client';

// import { useState, useEffect } from 'react';

// interface Publicacion {
//     id: number;
//     titulo: string;
//     descripcion: string;
//     imagen: string;
// }

// const Publicaciones = () => {
//     const [mostrarFormulario, setMostrarFormulario] = useState(false);
//     const [titulo, setTitulo] = useState('');
//     const [descripcion, setDescripcion] = useState('');
//     const [imagen, setImagen] = useState<File | null>(null);
//     const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
//     const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicacion | null>(null); // Estado para la publicación seleccionada
//     const [mostrarPopUp, setMostrarPopUp] = useState(false); // Estado para controlar la visibilidad del pop-up

//     const [currentPage, setCurrentPage] = useState(1);
//     const publicacionesPorPagina = 6;

//     useEffect(() => {
//         const publicacionesGuardadas = localStorage.getItem('publicaciones');
//         if (publicacionesGuardadas) {
//             try {
//                 setPublicaciones(JSON.parse(publicacionesGuardadas));
//             } catch (error) {
//                 console.error("Error al parsear publicaciones guardadas: ", error);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         if (publicaciones.length > 0) {
//             localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
//         }
//     }, [publicaciones]);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!titulo || !descripcion || !imagen) {
//             alert('Por favor completa todos los campos.');
//             return;
//         }

//         const reader = new FileReader();
//         reader.onloadend = () => {
//             const nuevaPublicacion: Publicacion = {
//                 id: Date.now(),
//                 titulo,
//                 descripcion,
//                 imagen: reader.result as string,
//             };

//             setPublicaciones([nuevaPublicacion, ...publicaciones]);

//             setTitulo('');
//             setDescripcion('');
//             setImagen(null);
//             setMostrarFormulario(false);
//         };

//         if (imagen) {
//             reader.readAsDataURL(imagen);
//         }
//     };

//     const abrirPopUp = (publicacion: Publicacion) => {
//         setPublicacionSeleccionada(publicacion);
//         setMostrarPopUp(true);
//     };

//     const cerrarPopUp = () => {
//         setPublicacionSeleccionada(null);
//         setMostrarPopUp(false);
//     };

//     const totalPaginas = Math.ceil(publicaciones.length / publicacionesPorPagina);
//     const indiceUltimaPublicacion = currentPage * publicacionesPorPagina;
//     const indicePrimeraPublicacion = indiceUltimaPublicacion - publicacionesPorPagina;
//     const publicacionesActuales = publicaciones.slice(indicePrimeraPublicacion, indiceUltimaPublicacion);

//     const siguientePagina = () => {
//         if (currentPage < totalPaginas) {
//             setCurrentPage(prev => prev + 1);
//         }
//     };

//     const paginaAnterior = () => {
//         if (currentPage > 1) {
//             setCurrentPage(prev => prev - 1);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             {/* Fondo blur al abrir el formulario */}
//             {mostrarFormulario && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
//             )}

//             {/* Sección superior */}
//             <div className="flex justify-between items-center mb-6">
//                 <button className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-6 h-6"
//                     >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-12 5.25h7.5m-10.5 5.25h13.5" />
//                     </svg>
//                 </button>

//                 <h1 className="text-3xl font-bold text-[#757575] text-center mx-auto">
//                     Lo que estés buscando, <span className="text-[#35B88E]">encontralo!</span>
//                 </h1>

//                 {!mostrarFormulario && (
//                     <button
//                         onClick={() => setMostrarFormulario(true)}
//                         className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
//                     >
//                         + Publicar
//                     </button>
//                 )}
//             </div>

//             {/* Formulario para agregar una nueva publicación */}
//             {mostrarFormulario && (
//                 <div className="fixed inset-0 z-20 flex items-center justify-center">
//                     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
//                         <div className="mb-4">
//                             <label className="block text-lg font-semibold mb-2">Título</label>
//                             <input
//                                 type="text"
//                                 value={titulo}
//                                 onChange={(e) => setTitulo(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded text-gray-700"
//                                 placeholder="Ingrese el título"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-lg font-semibold mb-2">Descripción</label>
//                             <textarea
//                                 value={descripcion}
//                                 onChange={(e) => setDescripcion(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded text-gray-700"
//                                 placeholder="Ingrese una descripción"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-lg font-semibold mb-2">Imagen</label>
//                             <input
//                                 type="file"
//                                 onChange={(e) => {
//                                     if (e.target.files) {
//                                         setImagen(e.target.files[0]);
//                                     }
//                                 }}
//                                 className="w-full p-2 border border-gray-300 rounded"
//                             />
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 type="submit"
//                                 className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
//                             >
//                                 Publicar
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setMostrarFormulario(false)}
//                                 className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600"
//                             >
//                                 Cancelar
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}

//             {/* Publicaciones */}
//             <div className="mt-8">
//                 {publicaciones.length === 0 ? (
//                     <div className="text-center text-[#757575] text-xl">
//                         No hay publicaciones en este momento.
//                     </div>
//                 ) : (
//                     <>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {publicacionesActuales.map((publicacion) => (
//                                 <div
//                                     key={publicacion.id}
//                                     className="border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer"
//                                     onClick={() => abrirPopUp(publicacion)}
//                                 >
//                                     <img
//                                         src={publicacion.imagen}
//                                         alt={publicacion.titulo}
//                                         className="w-full h-48 object-cover rounded-md mb-4 min-h-[400px]"
//                                     />
//                                     <h3 className="text-xl font-bold text-gray-800">{publicacion.titulo}</h3>
//                                     <p className="mt-2 text-gray-600">{publicacion.descripcion}</p>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Paginación */}
//                         <div className="flex justify-center mt-28">
//                             <button
//                                 onClick={paginaAnterior}
//                                 disabled={currentPage === 1}
//                                 className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 disabled:opacity-50"
//                             >
//                                 Anterior
//                             </button>
//                             <span className="mx-4 text-gray-600">{currentPage} de {totalPaginas}</span>
//                             <button
//                                 onClick={siguientePagina}
//                                 disabled={currentPage === totalPaginas}
//                                 className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 disabled:opacity-50"
//                             >
//                                 Siguiente
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </div>

//             {/* Pop-up de detalles */}
//             {mostrarPopUp && publicacionSeleccionada && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-20">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
//                         <img
//                             src={publicacionSeleccionada.imagen}
//                             alt={publicacionSeleccionada.titulo}
//                             className="w-full h-48 object-cover rounded-md mb-4 min-h-[500px]"
//                         />
//                         <h3 className="text-2xl font-bold text-gray-800">{publicacionSeleccionada.titulo}</h3>
//                         <p className="mt-2 text-gray-600">{publicacionSeleccionada.descripcion}</p>
//                         <button
//                             onClick={cerrarPopUp}
//                             className="mt-4 bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
//                         >
//                             Cerrar
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Publicaciones;

'use client';

import { useState, useEffect } from 'react';

interface Publicacion {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    categoria: string; // Nueva propiedad
}

const Publicaciones = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState<File | null>(null);
    const [categoria, setCategoria] = useState(''); // Estado para la categoría de la publicación
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
    const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicacion | null>(null);
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    const [categoriaBusqueda, setCategoriaBusqueda] = useState(''); // Estado para la búsqueda por categoría

    const [currentPage, setCurrentPage] = useState(1);
    const publicacionesPorPagina = 6;

    useEffect(() => {
        const publicacionesGuardadas = localStorage.getItem('publicaciones');
        if (publicacionesGuardadas) {
            try {
                setPublicaciones(JSON.parse(publicacionesGuardadas));
            } catch (error) {
                console.error("Error al parsear publicaciones guardadas: ", error);
            }
        }
    }, []);

    useEffect(() => {
        if (publicaciones.length > 0) {
            localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
        }
    }, [publicaciones]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!titulo || !descripcion || !imagen || !categoria) {
            alert('Por favor completa todos los campos.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const nuevaPublicacion: Publicacion = {
                id: Date.now(),
                titulo,
                descripcion,
                imagen: reader.result as string,
                categoria, // Asignar la categoría seleccionada
            };

            setPublicaciones([nuevaPublicacion, ...publicaciones]);

            setTitulo('');
            setDescripcion('');
            setImagen(null);
            setCategoria(''); // Reiniciar la categoría seleccionada
            setMostrarFormulario(false);
        };

        if (imagen) {
            reader.readAsDataURL(imagen);
        }
    };

    const abrirPopUp = (publicacion: Publicacion) => {
        setPublicacionSeleccionada(publicacion);
        setMostrarPopUp(true);
    };

    const cerrarPopUp = () => {
        setPublicacionSeleccionada(null);
        setMostrarPopUp(false);
    };

    const totalPaginas = Math.ceil(publicaciones.length / publicacionesPorPagina);
    const indiceUltimaPublicacion = currentPage * publicacionesPorPagina;
    const indicePrimeraPublicacion = indiceUltimaPublicacion - publicacionesPorPagina;

    // Filtrar publicaciones por categoría
    const publicacionesFiltradas = categoriaBusqueda
        ? publicaciones.filter((pub) => pub.categoria === categoriaBusqueda)
        : publicaciones;

    const publicacionesActuales = publicacionesFiltradas.slice(indicePrimeraPublicacion, indiceUltimaPublicacion);

    const siguientePagina = () => {
        if (currentPage < totalPaginas) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const paginaAnterior = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Fondo blur al abrir el formulario */}
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
            )}

            {/* Sección superior */}
            <div className="flex justify-between items-center mb-6">
                {/* Botón para buscar por categoría */}
                <div className="mb-5">
                    <label className="block text-lg font-semibold">Filtrar por categoría</label>
                    <select
                        value={categoriaBusqueda}
                        onChange={(e) => setCategoriaBusqueda(e.target.value)}
                        className="p-2 border border-gray-300 rounded text-gray-700"
                    >
                        <option value="">Todas las categorías</option>
                        <option value="Pie">Pie</option>
                        <option value="Pierna">Pierna</option>
                        <option value="Brazo">Brazo</option>
                        <option value="Mano">Mano</option>
                        <option value="Muñeca">Muñeca</option>
                    </select>
                </div>

                <h1 className="text-3xl font-bold text-[#757575] text-center mx-auto">
                    Lo que estés buscando, <span className="text-[#35B88E]">encontralo!</span>
                </h1>

                {!mostrarFormulario && (
                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
                    >
                        + Publicar
                    </button>
                )}
            </div>

            {/* Formulario para agregar una nueva publicación */}
            {mostrarFormulario && (
                <div className="fixed inset-0 z-20 flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Título</label>
                            <input
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-gray-700"
                                placeholder="Ingrese el título"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-gray-700"
                                placeholder="Ingrese una descripción"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Imagen</label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setImagen(e.target.files[0]);
                                    }
                                }}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Categoría</label>
                            <select
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-gray-700"
                            >
                                <option value="">Selecciona una categoría</option>
                                <option value="Pie">Pie</option>
                                <option value="Pierna">Pierna</option>
                                <option value="Brazo">Brazo</option>
                                <option value="Mano">Mano</option>
                                <option value="Muñeca">Muñeca</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
                            >
                                Publicar
                            </button>
                            <button
                                type="button"
                                onClick={() => setMostrarFormulario(false)}
                                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Publicaciones */}
            <div className="mt-8">
                {publicacionesFiltradas.length === 0 ? (
                    <div className="text-center text-[#757575] text-xl">
                        No hay publicaciones en esta categoría.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {publicacionesActuales.map((publicacion) => (
                                <div
                                    key={publicacion.id}
                                    className="border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer"
                                    onClick={() => abrirPopUp(publicacion)}
                                >
                                    <img
                                        src={publicacion.imagen}
                                        alt={publicacion.titulo}
                                        className="w-full h-48 object-cover rounded-md mb-4 min-h-[400px]"
                                    />
                                    <h3 className="text-xl font-bold text-gray-800">{publicacion.titulo}</h3>
                                    <p className="mt-2 text-gray-600">{publicacion.descripcion}</p>
                                    <p className="mt-1 text-sm text-gray-500">Categoría: {publicacion.categoria}</p>
                                </div>
                            ))}
                        </div>

                        {/* Paginación */}
                        <div className="flex justify-center mt-28">
                            <button
                                onClick={paginaAnterior}
                                className={`px-4 py-2 mx-1 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#35B88E] text-white'}`}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <button
                                onClick={siguientePagina}
                                className={`px-4 py-2 mx-1 rounded-md ${currentPage === totalPaginas ? 'bg-gray-300' : 'bg-[#35B88E] text-white'}`}
                                disabled={currentPage === totalPaginas}
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Pop-up para ver detalles de la publicación */}
            {mostrarPopUp && publicacionSeleccionada && (
                <div className="fixed inset-0 flex items-center justify-center z-30">
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={cerrarPopUp}></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3 z-40">
                        <img
                            src={publicacionSeleccionada.imagen}
                            alt={publicacionSeleccionada.titulo}
                            className="w-full h-64 object-cover rounded-md mb-4 min-h-[550px]"
                        />
                        <h2 className="text-2xl font-bold mb-2">{publicacionSeleccionada.titulo}</h2>
                        <p className="mb-4">{publicacionSeleccionada.descripcion}</p>
                        <p className="text-sm text-gray-500">Categoría: {publicacionSeleccionada.categoria}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={cerrarPopUp}
                                className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Publicaciones;
