// "use client";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import Image from "next/image";
// import Link from "next/link";
// import { Pencil } from "lucide-react";
// import { usePathname } from "next/navigation";



// // Interfaz para tipar las publicaciones
// interface Publicacion {
//     id: number;
//     titulo: string;
//     descripcion: string;
//     imagen: string;
//     categoria: string;
//     userId: string;
// }

// const Perfil = () => {
//     const { data: session } = useSession();
//     const [nombre, setNombre] = useState("");
//     const [ubicacion, setUbicacion] = useState<{ lat: number; lng: number } | null>(null);
//     const [errorUbicacion, setErrorUbicacion] = useState("");
//     const [correo, setCorreo] = useState("");
//     const [fotoPerfil, setFotoPerfil] = useState("/default-profile.png");
//     const [hover, setHover] = useState(false);
//     const pathname = usePathname();

//     // Cargar Google Maps
//     const { isLoaded } = useLoadScript({
//         googleMapsApiKey: "AIzaSyB7W_C97YC6XZ49Dqu6JRL1QgKEjvh8yck",
//     });

//     // Obtener datos del perfil
//     useEffect(() => {
//         const obtenerPerfil = async () => {
//             if (!session?.user?.email) return;

//             try {
//                 const res = await fetch(`/api/ubicacion?email=${session.user.email}`);
//                 const data = await res.json();

//                 if (data.ubicacion) setUbicacion(data.ubicacion);
//                 if (data.nombre) setNombre(data.nombre);
//                 if (data.correo) setCorreo(data.correo);
//                 if (data.fotoPerfil) setFotoPerfil(data.fotoPerfil);
//             } catch (error) {
//                 console.error("Error obteniendo el perfil:", error);
//             }
//         };

//         obtenerPerfil();
//     }, [session]);



//     // Manejo de cambio de foto de perfil
//     const manejarCambioFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) {
//             console.log("No se seleccionó ningún archivo");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("email", session?.user?.email || "");

//         console.log("Enviando solicitud POST a /api/fotoPerfil con el archivo...");
//         console.log("FormData antes de enviar:", formData);

//         try {
//             const res = await fetch("/api/fotoPerfil", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!res.ok) {
//                 console.log("Error al subir la foto:", await res.json());
//             }

//             const data = await res.json();

//             if (res.ok) {
//                 setFotoPerfil(data.url);
//                 console.log("Foto actualizada con éxito", data.url);
//             }
//         } catch (error) {
//             console.error("Error en la solicitud:", error);
//         }
//     };

//     // Función para guardar la ubicación
//     const guardarUbicacion = async (lat: number, lng: number) => {
//         setUbicacion({ lat, lng });

//         try {
//             const res = await fetch(`/api/ubicacion`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ lat, lng }),
//             });

//             const data = await res.json();
//             if (!res.ok) {
//                 console.error("Error al guardar ubicación:", data.error);
//             }
//         } catch (error) {
//             console.error("Error en la solicitud:", error);
//         }
//     };

//     // Seleccionar ubicación automáticamente usando geolocalización
//     const seleccionarUbicacion = () => {
//         if ("geolocation" in navigator) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     guardarUbicacion(position.coords.latitude, position.coords.longitude);
//                     setErrorUbicacion("");
//                 },
//                 (error) => {
//                     console.error("Error obteniendo ubicación:", error);
//                     setErrorUbicacion("No se pudo obtener tu ubicación.");
//                 }
//             );
//         } else {
//             setErrorUbicacion("Tu navegador no soporta la geolocalización.");
//         }
//     };

//     // Manejar clic en el mapa para actualizar la ubicación
//     const manejarClickMapa = (event: google.maps.MapMouseEvent) => {
//         if (event.latLng) {
//             guardarUbicacion(event.latLng.lat(), event.latLng.lng());
//         }
//     };

//     return (
//         <div>
//             {/* Datos del perfil */}
//             <div className="mt-8 flex justify-center">
//                 <h1 className="text-3xl font-bold text-[#757575]">Mi perfil</h1>
//             </div>


//             {/* Foto de perfil editable: */}

//             <div className="flex justify-center mt-12">
//                 <div className="flex items-center gap-10">

//                     <label
//                         className="relative cursor-pointer"
//                         onMouseEnter={() => setHover(true)}
//                         onMouseLeave={() => setHover(false)}
//                     >
//                         <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]">
//                             <Image
//                                 src={fotoPerfil.startsWith("/") ? fotoPerfil : "/default-profile.png"}
//                                 alt="Perfil"
//                                 layout="fill"
//                                 objectFit="cover"
//                                 className="rounded-full"
//                             />
//                             {hover && (
//                                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
//                                     <Pencil className="w-8 h-8 text-white" />
//                                 </div>
//                             )}
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={manejarCambioFoto}
//                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                             />
//                         </div>
//                     </label>

//                 </div>
//             </div>
//             <div className="flex justify-center mt-3">
//                 <Link href="./Perfil/publicacionesPersonales"
//                     className={`hover-underline text-[#757575] font-semibold hover:text-[#35B88E] relative ${pathname === '/' ? 'text-[#35B88E]' : ''
//                         }`}>

//                     Mis publicaciones

//                 </Link>
//             </div>



//             <div className="mt-3">
//                 <hr className="mx-auto my-4" style={{ width: '15%', borderTop: '2px solid #35B88E' }} />
//             </div>



//             <div className="mt-12 flex justify-center w-11/12 lg:w-auto">
//                 <form className="w-80 text-center">
//                     <div>
//                         <label className="block text-sm font-semibold text-[#757575]">
//                             Nombre de usuario:
//                         </label>
//                         <input
//                             type="text"
//                             value={`@${nombre}`}
//                             readOnly
//                             onChange={(e) => setNombre(e.target.value.replace(/^@/, ""))}
//                             className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm text-[#757575]"
//                         />
//                     </div>

//                     <div className="mt-12">
//                         <label className="block text-sm font-semibold text-[#757575]">
//                             Correo electrónico:
//                         </label>
//                         <input
//                             type="text"
//                             value={correo}
//                             readOnly
//                             onChange={(e) => setCorreo(e.target.value)}
//                             className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm text-[#757575]"
//                         />
//                     </div>


//                     {/* Añadir ubicacion: */}
//                     <div className="mt-12">
//                         <label className="block text-sm font-semibold text-[#757575]">
//                             Añadir ubicación en mapa{" "}
//                             <span
//                                 className="font-semibold text-[#35B88E] cursor-pointer"
//                                 onClick={seleccionarUbicacion}
//                             >
//                                 (haz clic acá para aplicar automáticamente)
//                             </span>
//                         </label>
//                         <input
//                             type="text"
//                             value={ubicacion ? `${ubicacion.lat}, ${ubicacion.lng}` : ""}
//                             readOnly
//                             className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575] bg-gray-100 cursor-not-allowed"
//                         />
//                         {errorUbicacion && <p className="text-red-500 text-xs mt-2">{errorUbicacion}</p>}
//                     </div>
//                 </form>
//             </div>

//             {isLoaded && (
//                 <div className="flex justify-center mt-6">
//                     <GoogleMap
//                         center={ubicacion || { lat: -34.6037, lng: -58.3816 }}
//                         zoom={ubicacion ? 15 : 10}
//                         mapContainerStyle={{
//                             width: "100%",
//                             height: "300px",
//                             maxWidth: "600px",
//                             borderRadius: "10px",
//                         }}
//                         onClick={manejarClickMapa}
//                     >
//                         {ubicacion && <Marker position={ubicacion} />}
//                     </GoogleMap>
//                 </div>
//             )}
//         </div>


//     );
// };

// export default Perfil;



"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { usePathname } from "next/navigation";

// Interfaz para tipar las publicaciones
interface Publicacion {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    categoria: string;
    userId: string;
}

const Perfil = () => {
    const { data: session } = useSession();
    const [nombre, setNombre] = useState("");
    const [ubicacion, setUbicacion] = useState<{ lat: number; lng: number } | null>(null);
    const [errorUbicacion, setErrorUbicacion] = useState("");
    const [correo, setCorreo] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState("/default-profile.png");
    const [hover, setHover] = useState(false);
    const pathname = usePathname();

    // Cargar Google Maps
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB7W_C97YC6XZ49Dqu6JRL1QgKEjvh8yck",
    });

    // Obtener datos del perfil
    useEffect(() => {
        const obtenerPerfil = async () => {
            if (!session?.user?.email) return;

            try {
                const res = await fetch(`/api/ubicacion?email=${session.user.email}`);
                const data = await res.json();

                if (data.ubicacion) setUbicacion(data.ubicacion);
                if (data.nombre) setNombre(data.nombre);
                if (data.correo) setCorreo(data.correo);
                if (data.fotoPerfil) setFotoPerfil(data.fotoPerfil);
            } catch (error) {
                console.error("Error obteniendo el perfil:", error);
            }
        };

        obtenerPerfil();
    }, [session]);

    // Manejo de cambio de foto de perfil
    const manejarCambioFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            console.log("No se seleccionó ningún archivo");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("email", session?.user?.email || "");

        console.log("Enviando solicitud POST a /api/fotoPerfil con el archivo...");
        console.log("FormData antes de enviar:", formData);

        try {
            const res = await fetch("/api/fotoPerfil", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                console.log("Error al subir la foto:", await res.json());
            }

            const data = await res.json();

            if (res.ok) {
                setFotoPerfil(data.url);
                console.log("Foto actualizada con éxito", data.url);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    // Función para guardar la ubicación
    const guardarUbicacion = async (lat: number, lng: number) => {
        setUbicacion({ lat, lng });

        try {
            const res = await fetch(`/api/ubicacion`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lat, lng }),
            });

            const data = await res.json();
            if (!res.ok) {
                console.error("Error al guardar ubicación:", data.error);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    // Seleccionar ubicación automáticamente usando geolocalización
    const seleccionarUbicacion = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    guardarUbicacion(position.coords.latitude, position.coords.longitude);
                    setErrorUbicacion("");
                },
                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                    setErrorUbicacion("No se pudo obtener tu ubicación.");
                }
            );
        } else {
            setErrorUbicacion("Tu navegador no soporta la geolocalización.");
        }
    };

    // Manejar clic en el mapa para actualizar la ubicación
    const manejarClickMapa = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            guardarUbicacion(event.latLng.lat(), event.latLng.lng());
        }
    };

    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
            {/* Datos del perfil */}
            <div className="mt-8 flex justify-center">
                <h1 className="text-3xl font-bold text-[#757575]">Mi perfil</h1>
            </div>

            {/* Foto de perfil editable: */}
            <div className="flex justify-center mt-12">
                <div className="flex items-center gap-10">
                    <label
                        className="relative cursor-pointer"
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]">
                            <Image
                                src={fotoPerfil.startsWith("/") ? fotoPerfil : "/default-profile.png"}
                                alt="Perfil"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                            {hover && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                                    <Pencil className="w-8 h-8 text-white" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={manejarCambioFoto}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex justify-center mt-3">
                <Link href="./Perfil/publicacionesPersonales"
                    className={`hover-underline text-[#757575] font-semibold hover:text-[#35B88E] relative ${pathname === '/' ? 'text-[#35B88E]' : ''}`}>
                    Mis publicaciones
                </Link>
            </div>

            <div className="mt-3">
                <hr className="mx-auto my-4" style={{ width: '15%', borderTop: '2px solid #35B88E' }} />
            </div>

            <div className="mt-12 flex justify-center w-full lg:w-auto">
                <form className="w-full max-w-xl text-center">
                    <div>
                        <label className="block text-sm font-semibold text-[#757575]">
                            Nombre de usuario:
                        </label>
                        <input
                            type="text"
                            value={`@${nombre}`}
                            readOnly
                            onChange={(e) => setNombre(e.target.value.replace(/^@/, ""))}
                            className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm text-[#757575]"
                        />
                    </div>

                    <div className="mt-12">
                        <label className="block text-sm font-semibold text-[#757575]">
                            Correo electrónico:
                        </label>
                        <input
                            type="text"
                            value={correo}
                            readOnly
                            onChange={(e) => setCorreo(e.target.value)}
                            className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm text-[#757575]"
                        />
                    </div>

                    {/* Añadir ubicacion: */}
                    <div className="mt-12">
                        <label className="block text-sm font-semibold text-[#757575]">
                            Añadir ubicación en mapa{" "}
                            <span
                                className="font-semibold text-[#35B88E] cursor-pointer"
                                onClick={seleccionarUbicacion}
                            >
                                (haz clic acá para aplicar automáticamente)
                            </span>
                        </label>
                        <input
                            type="text"
                            value={ubicacion ? `${ubicacion.lat}, ${ubicacion.lng}` : ""}
                            readOnly
                            className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575] bg-gray-100 cursor-not-allowed"
                        />
                        {errorUbicacion && <p className="text-red-500 text-xs mt-2">{errorUbicacion}</p>}
                    </div>
                </form>
            </div>

            {isLoaded && (
                <div className="flex justify-center mt-6">
                    <GoogleMap
                        center={ubicacion || { lat: -34.6037, lng: -58.3816 }}
                        zoom={ubicacion ? 15 : 10}
                        mapContainerStyle={{
                            width: "100%",
                            height: "300px",
                            maxWidth: "600px",
                            borderRadius: "10px",
                        }}
                        onClick={manejarClickMapa}
                    >
                        {ubicacion && <Marker position={ubicacion} />}
                    </GoogleMap>
                </div>
            )}
        </div>
    );
};

export default Perfil;
