'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Navbar from '@/app/componentes/Navbar';
import Footer from '@/app/componentes/footer';
import { montserrat } from "@/app/componentes/fonts";
import "@/app/UI/globals.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Importar componentes de Google Maps
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface Publicacion {
    _id: string;
    titulo: string;
    descripcion: string;
    imagenes: string[];
    categoria: string;
    userId: string;
    precio: string;
    email: string;
    pausada?: boolean;
}

interface Ubicacion {
    lat: number;
    lng: number;
}

interface DatosUbicacion {
    ubicacion: Ubicacion;
    nombre: string;
    correo: string;
    fotoPerfil: string;
}

interface Mensaje {
    _id: string;
    publicacionId: string;
    usuarioId: string;
    usuarioNombre: string;
    mensaje: string;
    respuesta?: string;
}

const DetallePublicacion = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: session } = useSession();
    const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
    const [mensajes, setMensajes] = useState<Mensaje[]>([]);
    const [respuestas, setRespuestas] = useState<{ [key: string]: string }>({});
    const [nuevaPregunta, setNuevaPregunta] = useState("");
    const [datosUbicacion, setDatosUbicacion] = useState<DatosUbicacion | null>(null);
    const [alquilarPopUp, setAlquilarPopUp] = useState(false);
    // Estado para las semanas seleccionadas
    const [selectedWeeks, setSelectedWeeks] = useState(1);
    const user = session?.user ? { id: session.user.id } : null;
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        semanasUso: "",
        departamento: "",
        direccion: "",
        calle: "",
        depto: "",
        telefono: "",
        tipoDocumento: "",
        numeroDocumento: ""
    });


    const [errors, setErrors] = useState<any>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validación de los campos
        const newErrors: { [key: string]: string } = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key] = "Este campo es obligatorio";
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Calcular precio total al enviar
            const semanasUso = parseInt(formData.semanasUso, 10);
            // const finalPrice = semanasUso * parseFloat(publicacion.precio);
            const finalPrice = publicacion ? semanasUso * parseFloat(publicacion.precio) : 0;


            // Crear objeto con los datos a enviar
            const emailData = {
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                semanasUso, // 🔹 Se mantiene la cantidad de semanas
                finalPrice, // 🔹 Se calcula solo al enviar
                departamento: formData.departamento,
                direccion: formData.direccion,
                calle: formData.calle,
                depto: formData.depto,
                telefono: formData.telefono,
                tipoDocumento: formData.tipoDocumento,
                numeroDocumento: formData.numeroDocumento,
                emailDueño: datosUbicacion?.correo,
            };

            // Envío del formulario al API Route
            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(emailData),
                });

                if (response.ok) {
                    console.log("Formulario enviado");
                    alert("La solicitud de alquiler se ha enviado correctamente.");
                    setAlquilarPopUp(false); // 🔹 Cierra el popup
                } else {
                    const errorData = await response.json();
                    console.error("Error al enviar la solicitud:", errorData);
                    alert("Error al enviar la solicitud. Inténtalo nuevamente.");
                }
            } catch (error) {
                console.error("Error en la petición:", error);
                alert("Error en la comunicación con el servidor.");
            }
        }
    };




    const togglePausarPublicacion = () => {
        if (!publicacion) return;

        const publicacionesGuardadas = localStorage.getItem('publicaciones');
        if (!publicacionesGuardadas) return;

        let publicaciones: Publicacion[] = JSON.parse(publicacionesGuardadas);

        // Encontrar la publicación y actualizar su estado de pausada
        publicaciones = publicaciones.map(pub =>
            pub._id === publicacion._id ? { ...pub, pausada: !pub.pausada } : pub
        );

        // Guardar los cambios en localStorage
        localStorage.setItem('publicaciones', JSON.stringify(publicaciones));

        // Actualizar el estado en React para reflejar el cambio
        setPublicacion((prev) => prev ? { ...prev, pausada: !prev.pausada } : null);
    };







    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };







    useEffect(() => {
        if (alquilarPopUp) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [alquilarPopUp]);





    // Cargar Google Maps con tu API Key
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB7W_C97YC6XZ49Dqu6JRL1QgKEjvh8yck", // Reemplaza con tu API Key
    });







    useEffect(() => {
        if (!publicacion?._id) return; // Evita hacer la petición si no hay ID

        const cargarMensajes = async () => {
            try {
                const res = await fetch(`/api/mensajes?publicacionId=${publicacion._id}`);
                if (!res.ok) {
                    throw new Error("Error al obtener mensajes");
                }

                const mensajes = await res.json();

                // Crear un objeto con las respuestas de los mensajes
                const respuestasCargadas: { [key: string]: string } = {};
                mensajes.forEach((mensaje: any) => {
                    if (mensaje.respuesta) {
                        respuestasCargadas[mensaje._id] = mensaje.respuesta;
                    }
                });

                setRespuestas(respuestasCargadas);
            } catch (error) {
                console.error("❌ Error al obtener mensajes:", error);
            }
        };

        cargarMensajes();
    }, [publicacion?._id]);





    // Obtener la ubicación del dueño de la publicación
    useEffect(() => {
        if (publicacion?.userId) {
            const fetchUbicacion = async () => {
                try {
                    // Llamamos al endpoint usando el id del dueño
                    const res = await fetch(`/api/ubicacion?id=${publicacion.userId}`);
                    if (!res.ok) throw new Error("Error al obtener la ubicación del dueño");

                    const data: DatosUbicacion = await res.json();
                    setDatosUbicacion(data);
                } catch (error) {
                    console.error("Error obteniendo la ubicación del dueño:", error);
                }
            };

            fetchUbicacion();
        }
    }, [publicacion?.userId]);





    // useEffect(() => {
    //     if (!id) return;

    //     const publicacionesGuardadas = localStorage.getItem('publicaciones');
    //     if (publicacionesGuardadas) {
    //         const publicaciones: Publicacion[] = JSON.parse(publicacionesGuardadas);
    //         const encontrada = publicaciones.find(pub => pub.id === Number(id));
    //         if (encontrada) {
    //             setPublicacion(encontrada);
    //         }
    //     }

    //     const fetchMensajes = async () => {
    //         try {
    //             const res = await fetch(`/api/mensajes?publicacionId=${String(id)}`);
    //             if (!res.ok) throw new Error("Error al obtener mensajes");
    //             const data = await res.json();

    //             console.log("Mensajes cargados:", data);

    //             setMensajes(data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchMensajes();
    // }, [id]);


    useEffect(() => {
        if (!id) return;

        // Función para obtener la publicación desde la API
        const fetchPublicacion = async () => {
            try {
                const res = await fetch(`/api/publicaciones/${id}`);
                if (!res.ok) {
                    throw new Error("Error al obtener la publicación");
                }
                const json = await res.json();
                if (json.success) {
                    setPublicacion(json.data);
                } else {
                    console.error("Error en la respuesta de la API:", json.error);
                }
            } catch (error) {
                console.error("Error al obtener la publicación:", error);
            }
        };

        // Función para obtener los mensajes
        const fetchMensajes = async () => {
            try {
                const res = await fetch(`/api/mensajes?publicacionId=${String(id)}`);
                if (!res.ok) throw new Error("Error al obtener mensajes");
                const data = await res.json();
                console.log("Mensajes cargados:", data);
                setMensajes(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPublicacion();
        fetchMensajes();
    }, [id]);




    const agregarPregunta = async () => {
        if (!nuevaPregunta.trim() || !session?.user) return;

        const mensajeData = {
            publicacionId: id,
            usuarioId: session.user.id,
            usuarioNombre: session.user.name,
            mensaje: nuevaPregunta,
        };

        try {
            const res = await fetch(`/api/mensajes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mensajeData),
            });

            const data = await res.json();
            console.log("Respuesta del servidor:", data);

            if (!res.ok) throw new Error(data.error || "Error al enviar mensaje");

            setMensajes([...mensajes, data]);
            setNuevaPregunta("");
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
        }
    };

    const responderMensaje = async (mensajeId: string, respuesta: string) => {
        try {
            const res = await fetch(`/api/mensajes?mensajeId=${mensajeId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ respuesta }),
            });

            if (!res.ok) {
                throw new Error("Error al actualizar la respuesta");
            }

            const data = await res.json();

            setMensajes((prevMensajes) =>
                prevMensajes.map((m) =>
                    m._id.toString() === mensajeId.toString() ? { ...m, respuesta: data.respuesta } : m
                )
            );

            console.log("✅ Respuesta guardada:", data);
        } catch (error) {
            console.error("❌ Error al responder mensaje:", error);
        }
    };

    if (!publicacion) {
        return <div className="text-center text-gray-500 text-xl">Cargando publicación...</div>;
    }

    return (
        <main className={`${montserrat.className}`}>
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {alquilarPopUp && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
                )}
                <button onClick={() => router.back()} className="text-[#757575] mb-4 hover:text-[#35B88E]">← Volver</button>





                {/* <div className="text-center">
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        <div className="text-center">
                            {publicacion.imagenes.length > 1 ? (
                                <Swiper
                                    modules={[Navigation]}
                                    navigation
                                    className="w-full max-w-3xl mx-auto mt-4 rounded-lg"
                                >
                                    {publicacion.imagenes.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="w-full h-[500px] flex justify-center items-center">
                                                <img
                                                    src={img}
                                                    alt={`Imagen ${index + 1}`}
                                                    className="object-cover w-full h-full rounded-lg"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="w-full max-w-3xl mx-auto mt-4 rounded-lg h-[500px] flex justify-center items-center">
                                    <img
                                        src={publicacion.imagenes[0]}
                                        alt={publicacion.titulo}
                                        className="object-cover w-full h-full rounded-lg"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                            <style>
                                {`
                    .swiper-button-next, .swiper-button-prev {
                        color: #35B88E !important;
                    }
                `}
                            </style>
                        </div>
                    </div>
                </div> */}


                <div className="text-center">
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        <div className="text-center">
                            {publicacion.imagenes.length > 1 ? (
                                <Swiper
                                    modules={[Navigation]}
                                    navigation
                                    className="w-full max-w-3xl mx-auto mt-4 rounded-lg"
                                >
                                    {publicacion.imagenes.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            {/* Contenedor con aspecto fijo 16:9 */}
                                            <div className="w-full aspect-video rounded-lg overflow-hidden">
                                                <img
                                                    src={img}
                                                    alt={`Imagen ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="w-full max-w-3xl mx-auto mt-4 rounded-lg aspect-video overflow-hidden">
                                    <img
                                        src={publicacion.imagenes[0]}
                                        alt={publicacion.titulo}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <style>
                                {`
          .swiper-button-next, .swiper-button-prev {
              color: #35B88E !important;
          }
        `}
                            </style>
                        </div>
                    </div>
                </div>




                {/* titulo, descripcion, categoria, precio y boton alquilar */}
                <div className="flex flex-col lg:ml-96 ml-4 px-4 lg:px-0">
                    <div className="mt-10">
                        <h1 className="text-3xl font-bold text-[#757575]">
                            {publicacion.titulo.length > 41
                                ? <>{publicacion.titulo.substring(0, 41)}<br />{publicacion.titulo.substring(41)}</>
                                : publicacion.titulo}
                        </h1>
                    </div>


                    <hr className="mt-10 mx-auto lg:mx-0" style={{ width: '20%', borderTop: '0.5px solid #757575' }} />

                    <div className="mt-10">
                        <h1 className="text-2xl font-semibold text-[#757575]">Descripcion:</h1>
                        <p className="text-lg text-[#757575]" style={{ whiteSpace: 'pre-line' }}>
                            {publicacion.descripcion.length > 64 ? `${publicacion.descripcion.substring(0, 64)}\n${publicacion.descripcion.substring(64)}` : publicacion.descripcion}
                        </p>
                    </div>


                    <hr className="mt-10 mx-auto lg:mx-0" style={{ width: '20%', borderTop: '1px solid #757575' }} />

                    <div className="mt-10">
                        <h1 className="text-2xl font-semibold text-[#757575]">Categoria:</h1>
                        <p className="text-lg text-[#757575]">{publicacion.categoria}</p>
                    </div>

                    <hr className="mt-10 mx-auto lg:mx-0" style={{ width: '20%', borderTop: '1px solid #757575' }} />

                    <div className="mt-10">
                        <h1 className="text-2xl font-semibold text-[#757575]">Precio por semana:</h1>
                        <p className="text-lg text-[#757575]">${publicacion.precio}</p>
                    </div>

                    {!alquilarPopUp && (!user || user.id !== publicacion.userId) && (
                        <button
                            onClick={() => {
                                if (!user) {
                                    alert('Necesitas iniciar sesion para poder alquilar');
                                } else {
                                    setAlquilarPopUp(true);
                                }
                            }}
                            className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#2a9675] mt-10 mx-auto lg:mx-0"
                            style={{ width: '100%', maxWidth: '200px' }} // Cambié el width para móviles
                        >
                            Alquilar
                        </button>
                    )}
                </div>







                {alquilarPopUp && (
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
                        onClick={() => setAlquilarPopUp(false)}
                    >
                        <form
                            className="bg-white rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-3/4 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[95vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                            onSubmit={handleSubmit}
                        >
                            {/* Nombre */}
                            <div>
                                <label className="block text-lg font-semibold text-[#757575]">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className={`w-full p-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded text-gray-700`}
                                    placeholder="Ingrese su nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                            </div>

                            {/* Apellido */}
                            <div>
                                <label className="block text-lg font-semibold text-[#757575]">Apellido</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    className={`w-full p-2 border ${errors.apellido ? 'border-red-500' : 'border-gray-300'} rounded text-gray-700`}
                                    placeholder="Ingrese su apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                />
                                {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-lg font-semibold text-[#757575]">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded text-gray-700`}
                                    placeholder="Ingrese su mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            {/* Semanas de uso */}
                            <div className="col-span-1 sm:col-span-2 md:col-span-3">
                                <label className="block text-lg font-semibold text-[#757575]">Semanas de uso</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                                    name="semanasUso"
                                    value={formData.semanasUso}
                                    onChange={handleChange}
                                >
                                    <option value="0">Selecciona la cantidad de semanas</option>
                                    {Array.from({ length: 52 }, (_, index) => {
                                        const week = index + 1;
                                        const finalPrice = week * parseFloat(publicacion.precio);
                                        return (
                                            <option key={week} value={week}>
                                                {week} {week === 1 ? "semana" : "semanas"} - ${finalPrice.toFixed(2)}
                                            </option>
                                        );
                                    })}
                                </select>
                                {errors.semanasUso && <p className="text-red-500 text-sm">{errors.semanasUso}</p>}
                            </div>

                            {/* Departamento */}
                            <div className="col-span-1 sm:col-span-2 md:col-span-3">
                                <label className="block text-lg font-semibold text-[#757575] mt-3">Departamento de Tucumán</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                                    name="departamento"
                                    value={formData.departamento}
                                    onChange={handleChange}
                                >
                                    <option value="">En qué departamento se encuentra</option>
                                    <option value="Burruyacú">Burruyacú</option>
                                    <option value="Capital">Capital (San Miguel)</option>
                                    <option value="Chicligasta">Chicligasta</option>
                                    <option value="Cruz Alta">Cruz Alta</option>
                                    <option value="Famaillá">Famaillá</option>
                                    <option value="Graneros">Graneros</option>
                                    <option value="J.B. Alberdi">Juan Bautista Alberdi</option>
                                    <option value="La Cocha">La Cocha</option>
                                    <option value="Lules">Lules</option>
                                    <option value="Monteros">Monteros</option>
                                    <option value="Río Chico">Río Chico</option>
                                    <option value="Simoca">Simoca</option>
                                    <option value="Tafí del Valle">Tafí del Valle</option>
                                    <option value="Tafí Viejo">Tafí Viejo</option>
                                    <option value="Trancas">Trancas</option>
                                    <option value="Yerba Buena">Yerba Buena</option>
                                    <option value="Leales">Leales</option>
                                </select>
                                {errors.departamento && <p className="text-red-500 text-sm">{errors.departamento}</p>}
                            </div>

                            {/* Dirección */}
                            <div>
                                <label className="block text-lg font-semibold text-[#757575]">Dirección</label>
                                <input
                                    type="text"
                                    name="direccion"
                                    className={`w-full p-2 border ${errors.direccion ? 'border-red-500' : 'border-gray-300'} rounded text-gray-700`}
                                    placeholder="Ingrese su dirección"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                />
                                {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion}</p>}
                            </div>

                            {/* N° de calle */}
                            <div>
                                <label className="block text-lg font-semibold text-[#757575]">N° de calle</label>
                                <input
                                    type="number"
                                    name="calle"
                                    className={`w-full p-2 border ${errors.calle ? 'border-red-500' : 'border-gray-300'} rounded text-gray-700`}
                                    placeholder="Ingrese la calle"
                                    value={formData.calle}
                                    onChange={handleChange}
                                />
                                {errors.calle && <p className="text-red-500 text-sm">{errors.calle}</p>}
                            </div>

                            {/* N° de departamento */}
                            <div>
                                <label className="block text-lg font-semibold text-[#757575]">N° de departamento</label>
                                <input
                                    type="text"
                                    name="depto"
                                    className={`w-full p-2 border ${errors.depto ? 'border-red-500' : 'border-gray-300'} rounded text-gray-700`}
                                    placeholder="Ingrese el número de departamento"
                                    value={formData.depto}
                                    onChange={handleChange}
                                />
                                {errors.depto && <p className="text-red-500 text-sm">{errors.depto}</p>}
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label className="block text-lg font-semibold text-[#757575]">Teléfono</label>
                                <input
                                    type="tel"
                                    name="telefono"
                                    className={`w-full p-2 border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded text-gray-700`}
                                    placeholder="Ingrese su número de teléfono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                />
                                {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
                            </div>

                            {/* Tipo de documento */}
                            <div>
                                <label className="block text-lg font-semibold text-[#757575]">Tipo de Documento</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                                    name="tipoDocumento"
                                    value={formData.tipoDocumento}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un tipo</option>
                                    <option value="DNI">DNI</option>
                                    <option value="Licencia">Licencia de conducir</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                    <option value="CUIT">CUIT</option>
                                    <option value="Extranjero">Extranjero</option>
                                    <option value="Otro">Otro</option>
                                    <option value="CUIL">CUIL</option>
                                </select>
                                {errors.tipoDocumento && <p className="text-red-500 text-sm">{errors.tipoDocumento}</p>}
                            </div>

                            {/* Número de documento */}
                            <div>
                                <label className="block text-lg font-semibold text-[#757575]">Número de documento</label>
                                <input
                                    type="number"
                                    name="numeroDocumento"
                                    className={`w-full p-2 border ${errors.numeroDocumento ? 'border-red-500' : 'border-gray-300'} rounded text-gray-700`}
                                    placeholder="Ingrese su número de documento"
                                    value={formData.numeroDocumento}
                                    onChange={handleChange}
                                />
                                {errors.numeroDocumento && <p className="text-red-500 text-sm">{errors.numeroDocumento}</p>}
                            </div>

                            <div className="text-[#757575] flex items-center col-span-1 sm:col-span-2 md:col-span-3">
                                <p>
                                    <span className="text-red-500">*</span> Estos datos del formulario serán enviados al dueño de la publicación vía mail, para confirmar el alquiler.
                                </p>
                            </div>

                            {/* Botón de enviar */}
                            <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center mt-4">
                                <button type="submit" className="bg-[#35B88E] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#2a9675]">
                                    Alquilar
                                </button>
                            </div>
                        </form>
                    </div>
                )}






                {/* Sección de Preguntas y respuestas */}
                <div className="mt-20 mx-auto max-w-3xl">
                    <h2 className="text-2xl font-semibold text-[#757575]">Preguntas y respuestas</h2>
                    <div className="mt-4 space-y-4">
                        {mensajes.length > 0 ? (
                            mensajes.map((mensaje) => (
                                <div key={mensaje._id} className="p-4 bg-gray-100 rounded-lg">
                                    <p className="font-semibold text-[#757575]">@{mensaje.usuarioNombre}</p>
                                    <p className="text-gray-700">{mensaje.mensaje}</p>
                                    {mensaje.respuesta && (
                                        <div className="mt-2 p-3 bg-white border-l-4 border-[#35B88E] rounded-lg">
                                            <p className="font-semibold text-[#35B88E]">Respuesta del dueño:</p>
                                            <p className="text-gray-700">{mensaje.respuesta}</p>
                                        </div>
                                    )}
                                    {session?.user?.id === publicacion?.userId && !mensaje.respuesta && (
                                        <div className="mt-2">
                                            <textarea
                                                className="w-full p-2 border border-gray-300 rounded-lg text-black"
                                                rows={2}
                                                placeholder="Escribe tu respuesta..."
                                                value={respuestas[mensaje._id] || ""}
                                                onChange={(e) => setRespuestas({ ...respuestas, [mensaje._id]: e.target.value })}
                                            />
                                            <button
                                                onClick={() => responderMensaje(mensaje._id, respuestas[mensaje._id] || "")}
                                                className="mt-2 px-4 py-2 bg-[#35B88E] text-white rounded-lg hover:bg-[#2a9675]"
                                            >
                                                Responder
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No hay preguntas aún.</p>
                        )}
                    </div>

                    {/* Formulario para agregar una pregunta */}
                    {session?.user && session.user.id !== publicacion?.userId && (
                        <div className="mt-6">
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-lg text-black"
                                rows={3}
                                placeholder="Haz una pregunta..."
                                value={nuevaPregunta}
                                onChange={(e) => setNuevaPregunta(e.target.value)}
                            />
                            <button
                                onClick={agregarPregunta}
                                className="mt-2 px-4 py-2 bg-[#35B88E] text-white rounded-lg hover:bg-[#2a9675]"
                            >
                                Enviar pregunta
                            </button>
                        </div>
                    )}
                </div>

                {/* Mostrar el mapa con la ubicación del dueño */}
                {datosUbicacion && isLoaded && (
                    <div className='container mx-auto px-4 py-8'>
                        <div className="flex justify-center gap-6">
                            {datosUbicacion.fotoPerfil && (
                                <img src={datosUbicacion.fotoPerfil} alt="Foto de perfil" className="w-16 h-16 rounded-full" />
                            )}
                        </div>

                        <div className="flex justify-center mt-1">
                            {datosUbicacion.nombre && (
                                <p className="text-[#757575] ">@{datosUbicacion.nombre}</p>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <h3 className="text-xl font-semibold text-[#757575]">Ubicacion del dueño</h3>
                        </div>

                        <div className="flex justify-center mt-6">
                            <GoogleMap
                                center={datosUbicacion.ubicacion}
                                zoom={15}
                                mapContainerStyle={{
                                    width: "100%",
                                    height: "300px",
                                    maxWidth: "600px",
                                    borderRadius: "10px",
                                }}
                            >
                                <Marker position={datosUbicacion.ubicacion} />
                            </GoogleMap>
                        </div>
                    </div>
                )}
            </div>





            <Footer />
        </main>
    );
};

export default DetallePublicacion;
