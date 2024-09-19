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

//     // Cargar publicaciones desde localStorage al cargar el componente
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

//     // Guardar publicaciones en localStorage cada vez que se actualicen
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

//         const nuevaPublicacion: Publicacion = {
//             id: Date.now(),
//             titulo,
//             descripcion,
//             imagen: URL.createObjectURL(imagen),
//         };

//         setPublicaciones([nuevaPublicacion, ...publicaciones]);

//         setTitulo('');
//         setDescripcion('');
//         setImagen(null);
//         setMostrarFormulario(false);
//     };

//     const handleDelete = (id: number) => {
//         if (confirm('¿Estás seguro de que deseas borrar esta publicación?')) {
//             const publicacionesActualizadas = publicaciones.filter(pub => pub.id !== id);
//             setPublicaciones(publicacionesActualizadas);
//             localStorage.setItem('publicaciones', JSON.stringify(publicacionesActualizadas));
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             {mostrarFormulario && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
//             )}

//             {/* Sección superior: Filtro, Texto centrado, Botón Publicar */}
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

//             {/* Publicaciones o mensaje cuando no haya publicaciones */}
//             <div className="mt-8">
//                 {publicaciones.length === 0 ? (
//                     <div className="text-center text-[#757575] text-xl">
//                         No hay publicaciones en este momento.
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {publicaciones.map((publicacion) => (
//                             <div
//                                 key={publicacion.id}
//                                 className="border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer"
//                                 onClick={() => handleDelete(publicacion.id)}
//                             >
//                                 <img
//                                     src={publicacion.imagen}
//                                     alt={publicacion.titulo}
//                                     className="w-full h-48 object-cover rounded-md mb-4 min-h-[400px]"
//                                 />
//                                 <h3 className="text-xl font-bold text-gray-800">{publicacion.titulo}</h3>
//                                 <p className="mt-2 text-gray-600">{publicacion.descripcion}</p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
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
}

const Publicaciones = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState<File | null>(null);
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

    // Estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const publicacionesPorPagina = 6; // Número de publicaciones por página

    // Cargar publicaciones desde localStorage al cargar el componente
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

    // Guardar publicaciones en localStorage cada vez que se actualicen
    useEffect(() => {
        if (publicaciones.length > 0) {
            localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
        }
    }, [publicaciones]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!titulo || !descripcion || !imagen) {
            alert('Por favor completa todos los campos.');
            return;
        }

        const nuevaPublicacion: Publicacion = {
            id: Date.now(),
            titulo,
            descripcion,
            imagen: URL.createObjectURL(imagen),
        };

        setPublicaciones([nuevaPublicacion, ...publicaciones]);

        setTitulo('');
        setDescripcion('');
        setImagen(null);
        setMostrarFormulario(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que deseas borrar esta publicación?')) {
            const publicacionesActualizadas = publicaciones.filter(pub => pub.id !== id);
            setPublicaciones(publicacionesActualizadas);
            localStorage.setItem('publicaciones', JSON.stringify(publicacionesActualizadas));
        }
    };

    // Funciones de paginación
    const totalPaginas = Math.ceil(publicaciones.length / publicacionesPorPagina);
    const indiceUltimaPublicacion = currentPage * publicacionesPorPagina;
    const indicePrimeraPublicacion = indiceUltimaPublicacion - publicacionesPorPagina;
    const publicacionesActuales = publicaciones.slice(indicePrimeraPublicacion, indiceUltimaPublicacion);

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
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
            )}

            {/* Sección superior: Filtro, Texto centrado, Botón Publicar */}
            <div className="flex justify-between items-center mb-6">
                <button className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-12 5.25h7.5m-10.5 5.25h13.5" />
                    </svg>
                </button>

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

            {/* Publicaciones o mensaje cuando no haya publicaciones */}
            <div className="mt-8">
                {publicaciones.length === 0 ? (
                    <div className="text-center text-[#757575] text-xl">
                        No hay publicaciones en este momento.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {publicacionesActuales.map((publicacion) => (
                                <div
                                    key={publicacion.id}
                                    className="border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer"
                                    onClick={() => handleDelete(publicacion.id)}
                                >
                                    <img
                                        src={publicacion.imagen}
                                        alt={publicacion.titulo}
                                        className="w-full h-48 object-cover rounded-md mb-4 min-h-[400px]"
                                    />
                                    <h3 className="text-xl font-bold text-gray-800">{publicacion.titulo}</h3>
                                    <p className="mt-2 text-gray-600">{publicacion.descripcion}</p>
                                </div>
                            ))}
                        </div>

                        {/* Paginación */}
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={paginaAnterior}
                                disabled={currentPage === 1}
                                className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 disabled:opacity-50"
                            >
                                Anterior
                            </button>
                            <span className="mx-4 text-gray-600">{currentPage} de {totalPaginas}</span>
                            <button
                                onClick={siguientePagina}
                                disabled={currentPage === totalPaginas}
                                className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 disabled:opacity-50"
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Publicaciones;
