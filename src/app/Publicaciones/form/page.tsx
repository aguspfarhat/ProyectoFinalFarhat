// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation';




// interface Publicacion {
//     id: number;
//     titulo: string;
//     descripcion: string;
//     imagenes: string[];
//     categoria: string;
//     userId: string; // Añadido para identificar al autor
//     precio: string;
//     pausada?: boolean;
// }

// const Publicaciones = () => {
//     const [mostrarFormulario, setMostrarFormulario] = useState(false);
//     const [titulo, setTitulo] = useState('');
//     const [descripcion, setDescripcion] = useState('');
//     const [imagenes, setImagenes] = useState<File[]>([]);
//     const [categoria, setCategoria] = useState('');
//     const [precio, setPrecio] = useState('');
//     const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
//     const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicacion | null>(null);
//     const [mostrarPopUp, setMostrarPopUp] = useState(false);
//     const [categoriaBusqueda, setCategoriaBusqueda] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const publicacionesPorPagina = 18;
//     const { data: session } = useSession();
//     const user = session?.user ? { id: session.user.id } : null;



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

//         if (!titulo || !descripcion || imagenes.length === 0 || !categoria) {
//             alert('Por favor completa todos los campos.');
//             return;
//         }

//         if (!user) {
//             alert('Necesitas estar logueado para publicar.');
//             return;
//         }

//         const leerImagenes = async () => {
//             const imagenesBase64: string[] = await Promise.all(
//                 imagenes.map((imagen) => {
//                     return new Promise<string>((resolve) => {
//                         const reader = new FileReader();
//                         reader.onloadend = () => resolve(reader.result as string);
//                         reader.readAsDataURL(imagen);
//                     });
//                 })
//             );

//             const nuevaPublicacion: Publicacion = {
//                 id: Date.now(),
//                 titulo,
//                 descripcion,
//                 imagenes: imagenesBase64,
//                 categoria,
//                 userId: user.id,
//                 precio,
//             };

//             setPublicaciones([nuevaPublicacion, ...publicaciones]);
//             setTitulo('');
//             setDescripcion('');
//             setImagenes([]);
//             setCategoria('');
//             setMostrarFormulario(false);
//             setPrecio('');
//         };

//         leerImagenes();
//     };


//     const eliminarPublicacion = (id: number) => {
//         const publicacionAEliminar = publicaciones.find(pub => pub.id === id);
//         if (publicacionAEliminar && publicacionAEliminar.userId === user?.id) {
//             setPublicaciones(publicaciones.filter(pub => pub.id !== id));
//         } else {
//             alert('No puedes eliminar esta publicación.');
//         }
//     };



//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             const nuevasImagenes = Array.from(e.target.files);
//             if (imagenes.length + nuevasImagenes.length > 7) {
//                 alert('Solo puedes subir hasta 7 imágenes.');
//                 return;
//             }
//             setImagenes([...imagenes, ...nuevasImagenes]);
//         }
//     };

//     const eliminarImagen = (index: number) => {
//         setImagenes(imagenes.filter((_, i) => i !== index));
//     };




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





//     const router = useRouter();

//     const irADetallePublicacion = (publicacion: Publicacion) => {
//         router.push(`/publicacion/${publicacion.id}`);
//     };


//     const cerrarPopUp = () => {
//         setPublicacionSeleccionada(null);
//         setMostrarPopUp(false);
//     };

//     const totalPaginas = Math.ceil(publicaciones.length / publicacionesPorPagina);
//     const indiceUltimaPublicacion = currentPage * publicacionesPorPagina;
//     const indicePrimeraPublicacion = indiceUltimaPublicacion - publicacionesPorPagina;

//     // const publicacionesFiltradas = categoriaBusqueda
//     //     ? publicaciones.filter((pub) => pub.categoria === categoriaBusqueda)
//     //     : publicaciones;

//     const publicacionesFiltradas = categoriaBusqueda
//         ? publicaciones.filter(pub => pub.categoria === categoriaBusqueda && !pub.pausada)
//         : publicaciones.filter(pub => !pub.pausada);


//     const publicacionesActuales = publicacionesFiltradas.slice(indicePrimeraPublicacion, indiceUltimaPublicacion);

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



//     useEffect(() => {
//         if (mostrarPopUp) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'auto';
//         }

//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, [mostrarPopUp]);




//     useEffect(() => {
//         if (mostrarFormulario) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'auto';
//         }

//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, [mostrarFormulario]);


//     const togglePausarPublicacion = (id: number) => {
//         setPublicaciones(prevPublicaciones =>
//             prevPublicaciones.map(pub =>
//                 pub.id === id ? { ...pub, pausada: !pub.pausada } : pub
//             )
//         );
//     };

'use client';

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

// Actualizamos la interfaz para usar _id (string) en lugar de id (number)
interface Publicacion {
    _id: string;
    titulo: string;
    descripcion: string;
    imagenes: string[];
    categoria: string;
    userId: string; // Para identificar al autor
    precio: string;
    pausada?: boolean;
}

const Publicaciones = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenes, setImagenes] = useState<File[]>([]);
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
    const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicacion | null>(null);
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    const [categoriaBusqueda, setCategoriaBusqueda] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const publicacionesPorPagina = 18;
    const { data: session } = useSession();
    const user = session?.user ? { id: session.user.id } : null;
    const router = useRouter();

    // ─── 1. Obtener publicaciones desde la API ──────────────────────────────
    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const res = await fetch('/api/publicaciones');
                const json = await res.json();
                if (json.success) {
                    setPublicaciones(json.data);
                } else {
                    console.error("Error al obtener publicaciones:", json.error);
                }
            } catch (error) {
                console.error("Error al obtener publicaciones:", error);
            }
        };

        fetchPublicaciones();
    }, []);

    // ─── 2. Crear publicación (handleSubmit) ──────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!titulo || !descripcion || imagenes.length === 0 || !categoria) {
            alert('Por favor completa todos los campos.');
            return;
        }

        if (!user) {
            alert('Necesitas estar logueado para publicar.');
            return;
        }

        try {
            // Convertir las imágenes a Base64
            const imagenesBase64: string[] = await Promise.all(
                imagenes.map((imagen) => {
                    return new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.readAsDataURL(imagen);
                    });
                })
            );

            // Crear la nueva publicación (sin el campo _id; lo genera la BD)
            const nuevaPublicacion = {
                titulo,
                descripcion,
                imagenes: imagenesBase64,
                categoria,
                userId: user.id,
                precio,
            };

            const res = await fetch('/api/publicaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaPublicacion)
            });

            const json = await res.json();
            if (!json.success) {
                throw new Error(json.error);
            }

            // Agregar la publicación creada (json.data) al estado
            setPublicaciones((prev) => [json.data, ...prev]);

            // Limpiar los campos del formulario
            setTitulo('');
            setDescripcion('');
            setImagenes([]);
            setCategoria('');
            setPrecio('');
            setMostrarFormulario(false);
        } catch (error) {
            console.error("Error creando publicación:", error);
            alert("Hubo un problema al crear la publicación.");
        }
    };

    // ─── 3. Eliminar publicación ──────────────────────────────
    const eliminarPublicacion = async (_id: string) => {
        const publicacionAEliminar = publicaciones.find(pub => pub._id === _id);
        if (publicacionAEliminar && publicacionAEliminar.userId === user?.id) {
            const confirmDelete = window.confirm("¿Estás seguro que quieres eliminar? Perderás todo lo que la publicación conlleva.");
            if (!confirmDelete) return;

            try {
                const response = await fetch(`/api/publicaciones/${_id}`, {
                    method: 'DELETE',
                });
                const json = await response.json();
                if (!json.success) {
                    throw new Error(json.error);
                }
                // Actualizar el estado eliminando la publicación borrada
                setPublicaciones((prev) => prev.filter(pub => pub._id !== _id));
            } catch (error) {
                console.error("Error eliminando publicación:", error);
                alert("Hubo un problema al eliminar la publicación.");
            }
        } else {
            alert('No puedes eliminar esta publicación.');
        }
    };

    // ─── 4. Manejo de selección y eliminación de imágenes ──────────────────────────────
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const nuevasImagenes = Array.from(e.target.files);
            if (imagenes.length + nuevasImagenes.length > 7) {
                alert('Solo puedes subir hasta 7 imágenes.');
                return;
            }
            setImagenes([...imagenes, ...nuevasImagenes]);
        }
    };

    const eliminarImagen = (index: number) => {
        setImagenes(imagenes.filter((_, i) => i !== index));
    };

    // ─── 5. Navegación y otros efectos ──────────────────────────────
    const irADetallePublicacion = (publicacion: Publicacion) => {
        router.push(`/publicacion/${publicacion._id}`);
    };

    const cerrarPopUp = () => {
        setPublicacionSeleccionada(null);
        setMostrarPopUp(false);
    };

    const totalPaginas = Math.ceil(publicaciones.length / publicacionesPorPagina);
    const indiceUltimaPublicacion = currentPage * publicacionesPorPagina;
    const indicePrimeraPublicacion = indiceUltimaPublicacion - publicacionesPorPagina;

    const publicacionesFiltradas = categoriaBusqueda
        ? publicaciones.filter(pub => pub.categoria === categoriaBusqueda && !pub.pausada)
        : publicaciones.filter(pub => !pub.pausada);

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

    // Efectos para controlar el scroll cuando se muestra el pop-up o el formulario
    useEffect(() => {
        document.body.style.overflow = mostrarPopUp || mostrarFormulario ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mostrarPopUp, mostrarFormulario]);

    // ─── 6. (Opcional) Toggle para pausar/reanudar publicación ──────────────────────────────
    const togglePausarPublicacion = (_id: string) => {
        // Si deseas persistir el cambio en la base de datos, deberás crear un endpoint (PUT o PATCH)
        setPublicaciones(prevPublicaciones =>
            prevPublicaciones.map(pub =>
                pub._id === _id ? { ...pub, pausada: !pub.pausada } : pub
            )
        );
    };


    return (

        // Parte superior de la pagina (Categorias, H1 y boton "Publicar"):
        <div className="container mx-auto px-4 py-8">
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
            )}

            <div className="flex justify-between items-center mb-6">
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
                        <option value="Cabeza y cuello">Cabeza y cuello</option>
                        <option value="Hombro y clavicula">Hombro y clavicula</option>
                        <option value="Codo">Codo</option>
                        <option value="Espalda y columna">Espalda y columna</option>
                        <option value="Cadera">Cadera</option>
                    </select>
                </div>

                <h1 className="hidden lg:block text-3xl font-bold text-[#757575] text-center mx-auto">
                    Lo que estés buscando, <span className="text-[#35B88E]">encontralo!</span>
                </h1>

                {!mostrarFormulario && (
                    <button
                        onClick={() => {
                            if (!user) {
                                alert('Necesitas iniciar sesion para poder publicar');
                            } else {
                                setMostrarFormulario(true);
                            }
                        }}
                        className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#2a9675]"
                    >
                        + Publicar
                    </button>
                )}
            </div>



            {mostrarFormulario && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
                    onClick={() => setMostrarFormulario(false)}
                >
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <label className="block text-lg font-semibold mb-2 text-[#757575]">Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-gray-700 mb-4"
                            placeholder="Ingrese el título"
                            maxLength={62} // Limita a 62 caracteres
                            style={{
                                whiteSpace: 'normal', // Permite el salto de línea
                                overflowWrap: 'break-word', // Salta la palabra si es demasiado larga
                                lineHeight: '1.2em' // Controla la altura de las líneas
                            }}
                        />

                        <label className="block text-lg font-semibold mb-2 text-[#757575]">Descripción</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-gray-700 mb-4"
                            placeholder="Ingrese una descripción"
                            maxLength={100}  // Limita a 31 caracteres

                        />

                        <label className="block text-lg font-semibold mb-2 text-[#757575]">Imágenes (máximo 7)</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                        <div className="flex flex-wrap gap-2">
                            {imagenes.map((img, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`Imagen ${index + 1}`}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => eliminarImagen(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs rounded-full"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>

                        <label className="block text-lg font-semibold mb-2 text-[#757575] mt-3">Categoría</label>
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-gray-700 mb-4"
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="Pie">Pie</option>
                            <option value="Pierna">Pierna</option>
                            <option value="Brazo">Brazo</option>
                            <option value="Mano">Mano</option>
                            <option value="Muñeca">Muñeca</option>
                            <option value="Cabeza y cuello">Cabeza y cuello</option>
                            <option value="Hombro y clavicula">Hombro y clavicula</option>
                            <option value="Codo">Codo</option>
                            <option value="Espalda y columna">Espalda y columna</option>
                            <option value="Cadera">Cadera</option>
                        </select>

                        <label className="block text-lg font-semibold mb-2 text-[#757575] mt-2">Precio del alquiler por semana</label>
                        <div className="relative w-full">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#757575]">$
                            </span>
                            <input
                                type="text"  // Aún es tipo texto para controlar la longitud
                                value={precio}
                                onChange={(e) => {
                                    // Solo permite ingresar números y limita a 7 caracteres
                                    const newValue = e.target.value;
                                    if (/^\d{0,7}$/.test(newValue)) {
                                        setPrecio(newValue);
                                    }
                                }}
                                className="w-full p-2 pl-6 border border-gray-300 rounded text-[#757575]"
                                onKeyDown={(e) => {
                                    // Previene la entrada de caracteres no numéricos
                                    if (e.key === '-' || e.key === 'e') e.preventDefault();
                                }}
                            />
                        </div>



                        <button type="submit" className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 mt-6">
                            Publicar
                        </button>
                    </form>
                </div>
            )}



            {/* Lo que se ve cuando se entra a la pagina: */}
            <div className="mt-8">
                {publicacionesFiltradas.length === 0 ? (
                    <div className="text-center text-[#757575] text-xl">
                        No hay publicaciones en esta categoría.
                    </div>
                ) : (
                    <>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                            {publicacionesActuales.map((publicacion) => (
                                <div
                                    key={publicacion._id}
                                    className="border border-gray-300 p-2 rounded-lg shadow-sm cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                                    onClick={() => irADetallePublicacion(publicacion)}
                                >
                                    <img

                                        src={Array.isArray(publicacion.imagenes) && publicacion.imagenes.length > 0 ? publicacion.imagenes[0] : "/placeholder.jpg"}
                                        alt={publicacion.titulo}
                                        className="w-full h-32 object-cover rounded-md mb-2"
                                    />
                                    {/* <h3 className="text-sm font-semibold text-[#757575]">{publicacion.titulo}</h3> */}
                                    <h3 className="text-sm font-semibold text-[#757575] break-words" style={{
                                        whiteSpace: 'normal',
                                        overflowWrap: 'break-word',
                                        wordBreak: 'break-word'
                                    }}>
                                        {publicacion.titulo.slice(0, 31)}<br />
                                        {publicacion.titulo.length > 31 && publicacion.titulo.slice(31, 62)}
                                    </h3>

                                    {/* <p className="mt-1 text-xs text-[#757575]">{publicacion.descripcion}</p> */}
                                    <p className="mt-1 text-[10px] text-gray-500">Categoría: {publicacion.categoria}</p>
                                    {publicacion.userId === user?.id && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const confirmDelete = window.confirm("¿Estás seguro que quieres eliminar? Perderás todo lo que la publicación conlleva.");
                                                if (confirmDelete) {
                                                    eliminarPublicacion(publicacion._id);
                                                }
                                            }}
                                            className="mt-1 text-[10px] text-red-500"
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>





                        {/* Paginado: */}
                        <div className="flex justify-center mt-28">
                            <button
                                onClick={paginaAnterior}
                                className={`px-4 py-2 mx-1 rounded-md cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#35B88E] text-white'}`}
                                disabled={currentPage === 1}
                            >
                                &#8592;
                            </button>
                            <button
                                onClick={siguientePagina}
                                className={`px-4 py-2 mx-1 rounded-md cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 ${currentPage === totalPaginas ? 'bg-gray-300' : 'bg-[#35B88E] text-white'}`}
                                disabled={currentPage === totalPaginas}
                            >
                                &#8594;
                            </button>
                        </div>
                        {/* Fin del paginado */}
                    </>
                )}
            </div>





        </div>
    );
};

export default Publicaciones;



