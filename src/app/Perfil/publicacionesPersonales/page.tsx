// 'use client';

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation';

// // Interfaz para tipar las publicaciones
// interface Publicacion {
//     id: number;
//     titulo: string;
//     descripcion: string;
//     imagenes: string[];
//     categoria: string;
//     userId: string;
//     pausada?: boolean;
// }






// const PublicacionesPersonales = () => {
//     const { data: session } = useSession();
//     const [publicacionesUsuario, setPublicacionesUsuario] = useState<Publicacion[]>([]);

//     // Obtener las publicaciones desde el local storage
//     useEffect(() => {
//         if (session?.user?.id) {
//             const publicacionesGuardadas = localStorage.getItem("publicaciones");
//             if (publicacionesGuardadas) {
//                 try {
//                     const pubs: Publicacion[] = JSON.parse(publicacionesGuardadas);
//                     setPublicacionesUsuario(pubs.filter((pub) => pub.userId === session.user.id));
//                 } catch (error) {
//                     console.error("Error al parsear publicaciones", error);
//                 }
//             }
//         }
//     }, [session]);

//     // Función para cambiar el estado de pausada
//     const togglePausarPublicacion = (id: number) => {
//         const nuevasPublicaciones = publicacionesUsuario.map((pub) =>
//             pub.id === id ? { ...pub, pausada: !pub.pausada } : pub
//         );

//         setPublicacionesUsuario(nuevasPublicaciones);

//         // Actualizar en localStorage
//         const todasLasPublicaciones = JSON.parse(localStorage.getItem("publicaciones") || "[]");
//         const publicacionesActualizadas = todasLasPublicaciones.map((pub: Publicacion) =>
//             pub.id === id ? { ...pub, pausada: !pub.pausada } : pub
//         );
//         localStorage.setItem("publicaciones", JSON.stringify(publicacionesActualizadas));
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="mt-8">
//                 <h2 className="text-3xl font-bold text-[#757575] text-center">Mis Publicaciones</h2>
//                 {publicacionesUsuario.length === 0 ? (
//                     <p className="mt-4 text-center text-[#757575]">
//                         No has realizado ninguna publicación aún.
//                     </p>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
//                         {publicacionesUsuario.map((pub) => (
//                             <div
//                                 key={pub.id}
//                                 // className="border border-gray-300 p-4 rounded-lg shadow-md relative"
//                                 className="border border-gray-300 p-2 rounded-lg shadow-sm cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
//                             >
//                                 <img
//                                     src={Array.isArray(pub.imagenes) && pub.imagenes.length > 0 ? pub.imagenes[0] : "/placeholder.jpg"}
//                                     alt={pub.titulo}
//                                     className={`w-full h-48 object-cover rounded-md mb-4 min-h-[400px] transition-opacity duration-300 ${pub.pausada ? "opacity-50" : ""}`}
//                                 />
//                                 {pub.pausada && (
//                                     <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//                                         Prestado
//                                     </div>
//                                 )}
//                                 <h3 className="mt-2 text-xl font-bold text-[#757575]">{pub.titulo}</h3>
//                                 <p className="mt-1 text-[#757575]">{pub.descripcion}</p>
//                                 <button
//                                     onClick={() => togglePausarPublicacion(pub.id)}
//                                     className={`mt-4 w-full py-2 rounded-md font-bold transition-all duration-300 ${pub.pausada ? "bg-[#35B88E] hover:bg-[#2a9675] text-white" : "bg-red-500 text-white"}`}
//                                 >
//                                     {pub.pausada ? "Reanudar" : "Marcar como prestado"}
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PublicacionesPersonales;


'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

// Actualizamos la interfaz para que use _id en lugar de id
interface Publicacion {
    _id: string;
    titulo: string;
    descripcion: string;
    imagenes: string[];
    categoria: string;
    userId: string;
    pausada?: boolean;
}

const PublicacionesPersonales = () => {
    const { data: session } = useSession();
    const [publicacionesUsuario, setPublicacionesUsuario] = useState<Publicacion[]>([]);

    // Obtener las publicaciones desde la API (solo las del usuario en sesión)
    useEffect(() => {
        if (session?.user?.id) {
            const fetchPublicacionesUsuario = async () => {
                try {
                    const res = await fetch(`/api/publicaciones?userId=${session.user.id}`);
                    if (!res.ok) {
                        throw new Error("Error al obtener publicaciones");
                    }
                    const json = await res.json();
                    if (json.success) {
                        setPublicacionesUsuario(json.data);
                    } else {
                        console.error("Error en la respuesta de la API:", json.error);
                    }
                } catch (error) {
                    console.error("Error al obtener publicaciones:", error);
                }
            };
            fetchPublicacionesUsuario();
        }
    }, [session]);

    // // Función para cambiar el estado de pausada (nota: para persistir el cambio en la BD deberás crear un endpoint para actualizar la publicación)
    // const togglePausarPublicacion = (_id: string) => {
    //     setPublicacionesUsuario((prevPublicaciones) =>
    //         prevPublicaciones.map((pub) =>
    //             pub._id === _id ? { ...pub, pausada: !pub.pausada } : pub
    //         )
    //     );
    // };

    const togglePausarPublicacion = async (_id: string) => {
        try {
            const publicacionActualizada = await fetch(`/api/publicaciones/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pausada: !publicacionesUsuario.find(pub => pub._id === _id)?.pausada,
                }),
            }).then(res => res.json());

            if (!publicacionActualizada.success) {
                throw new Error(publicacionActualizada.error);
            }

            // Actualizar el estado con la publicación modificada
            setPublicacionesUsuario(prevPublicaciones =>
                prevPublicaciones.map(pub =>
                    pub._id === _id ? { ...pub, pausada: publicacionActualizada.data.pausada } : pub
                )
            );
        } catch (error) {
            console.error("Error al actualizar la publicación:", error);
        }
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-8">
                <h2 className="text-3xl font-bold text-[#757575] text-center">Mis Publicaciones</h2>
                {publicacionesUsuario.length === 0 ? (
                    <p className="mt-4 text-center text-[#757575]">
                        No has realizado ninguna publicación aún.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                        {publicacionesUsuario.map((pub) => (
                            <div
                                key={pub._id}
                                className="border border-gray-300 p-2 rounded-lg shadow-sm cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                            >
                                <img
                                    src={Array.isArray(pub.imagenes) && pub.imagenes.length > 0 ? pub.imagenes[0] : "/placeholder.jpg"}
                                    alt={pub.titulo}
                                    className={`w-full h-48 object-cover rounded-md mb-4 min-h-[400px] transition-opacity duration-300 ${pub.pausada ? "opacity-50" : ""}`}
                                />
                                {pub.pausada && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        Prestado
                                    </div>
                                )}
                                <h3 className="mt-2 text-xl font-bold text-[#757575]">{pub.titulo}</h3>
                                <p className="mt-1 text-[#757575]">{pub.descripcion}</p>
                                <button
                                    onClick={() => togglePausarPublicacion(pub._id)}
                                    className={`mt-4 w-full py-2 rounded-md font-bold transition-all duration-300 ${pub.pausada ? "bg-[#35B88E] hover:bg-[#2a9675] text-white" : "bg-red-500 text-white"}`}
                                >
                                    {pub.pausada ? "Reanudar" : "Marcar como prestado"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicacionesPersonales;
