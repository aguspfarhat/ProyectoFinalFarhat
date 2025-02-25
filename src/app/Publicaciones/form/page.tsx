'use client';

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';




interface Publicacion {
    id: number;
    titulo: string;
    descripcion: string;
    imagenes: string[];
    categoria: string;
    userId: string; // Añadido para identificar al autor
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

        if (!titulo || !descripcion || imagenes.length === 0 || !categoria) {
            alert('Por favor completa todos los campos.');
            return;
        }

        if (!user) {
            alert('Necesitas estar logueado para publicar.');
            return;
        }

        const leerImagenes = async () => {
            const imagenesBase64: string[] = await Promise.all(
                imagenes.map((imagen) => {
                    return new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.readAsDataURL(imagen);
                    });
                })
            );

            const nuevaPublicacion: Publicacion = {
                id: Date.now(),
                titulo,
                descripcion,
                imagenes: imagenesBase64,
                categoria,
                userId: user.id,
                precio,
            };

            setPublicaciones([nuevaPublicacion, ...publicaciones]);
            setTitulo('');
            setDescripcion('');
            setImagenes([]);
            setCategoria('');
            setMostrarFormulario(false);
            setPrecio('');
        };

        leerImagenes();
    };


    const eliminarPublicacion = (id: number) => {
        const publicacionAEliminar = publicaciones.find(pub => pub.id === id);
        if (publicacionAEliminar && publicacionAEliminar.userId === user?.id) {
            setPublicaciones(publicaciones.filter(pub => pub.id !== id));
        } else {
            alert('No puedes eliminar esta publicación.');
        }
    };



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





    const router = useRouter();

    const irADetallePublicacion = (publicacion: Publicacion) => {
        router.push(`/publicacion/${publicacion.id}`);
    };


    const cerrarPopUp = () => {
        setPublicacionSeleccionada(null);
        setMostrarPopUp(false);
    };

    const totalPaginas = Math.ceil(publicaciones.length / publicacionesPorPagina);
    const indiceUltimaPublicacion = currentPage * publicacionesPorPagina;
    const indicePrimeraPublicacion = indiceUltimaPublicacion - publicacionesPorPagina;

    // const publicacionesFiltradas = categoriaBusqueda
    //     ? publicaciones.filter((pub) => pub.categoria === categoriaBusqueda)
    //     : publicaciones;

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



    useEffect(() => {
        if (mostrarPopUp) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mostrarPopUp]);




    useEffect(() => {
        if (mostrarFormulario) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mostrarFormulario]);


    const togglePausarPublicacion = (id: number) => {
        setPublicaciones(prevPublicaciones =>
            prevPublicaciones.map(pub =>
                pub.id === id ? { ...pub, pausada: !pub.pausada } : pub
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
                    </select>
                </div>

                <h1 className="hidden lg:block text-3xl font-bold text-[#757575] text-center mx-auto">
                    Lo que estés buscando, <span className="text-[#35B88E]">encontralo!</span>
                </h1>

                {!mostrarFormulario && (
                    <button
                        onClick={() => {
                            if (!user) {
                                alert('Necesitas estar logueado para publicar.');
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
                        />

                        <label className="block text-lg font-semibold mb-2 text-[#757575]">Descripción</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-gray-700 mb-4"
                            placeholder="Ingrese una descripción"
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
                        </select>

                        <label className="block text-lg font-semibold mb-2 text-[#757575] mt-2">Precio del alquiler por semana</label>
                        <div className="relative w-full">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#757575]">$
                            </span>
                            <input
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                className="w-full p-2 pl-6 border border-gray-300 rounded text-[#757575]"
                                min="0"
                                onKeyDown={(e) => {
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
                                    key={publicacion.id}
                                    className="border border-gray-300 p-2 rounded-lg shadow-sm cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                                    onClick={() => irADetallePublicacion(publicacion)}
                                >
                                    <img

                                        src={Array.isArray(publicacion.imagenes) && publicacion.imagenes.length > 0 ? publicacion.imagenes[0] : "/placeholder.jpg"}
                                        alt={publicacion.titulo}
                                        className="w-full h-32 object-cover rounded-md mb-2"
                                    />
                                    <h3 className="text-sm font-semibold text-[#757575]">{publicacion.titulo}</h3>
                                    <p className="mt-1 text-xs text-[#757575]">{publicacion.descripcion}</p>
                                    <p className="mt-1 text-[10px] text-gray-500">Categoría: {publicacion.categoria}</p>
                                    {publicacion.userId === user?.id && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const confirmDelete = window.confirm("¿Estás seguro que quieres eliminar? Perderás todo lo que la publicación conlleva.");
                                                if (confirmDelete) {
                                                    eliminarPublicacion(publicacion.id);
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
                        {/* Fin del paginado */}
                    </>
                )}
            </div>





        </div>
    );
};

export default Publicaciones;



