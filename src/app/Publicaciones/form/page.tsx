// 'use client';

// import { useState } from 'react';

// const Publicaciones = () => {
//     const [mostrarFormulario, setMostrarFormulario] = useState(false);
//     const [titulo, setTitulo] = useState('');
//     const [descripcion, setDescripcion] = useState('');
//     const [imagen, setImagen] = useState<File | null>(null);
//     const [publicaciones, setPublicaciones] = useState<any[]>([]);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!titulo || !descripcion || !imagen) {
//             alert('Por favor completa todos los campos.');
//             return;
//         }

//         const nuevaPublicacion = {
//             id: Date.now(),
//             titulo,
//             descripcion,
//             imagen: URL.createObjectURL(imagen),
//         };

//         setPublicaciones([nuevaPublicacion, ...publicaciones]);

//         // Limpiar los campos y ocultar el formulario
//         setTitulo('');
//         setDescripcion('');
//         setImagen(null);
//         setMostrarFormulario(false);
//     };

//     return (
//         <div className={mostrarFormulario ? 'relative' : ''}>
//             {/* Fondo con blur cuando el formulario esté visible */}
//             {mostrarFormulario && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
//             )}

//             {/* Botón para mostrar el formulario */}
//             {!mostrarFormulario && (
//                 <button
//                     onClick={() => setMostrarFormulario(true)}
//                     className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 mb-6"
//                 >
//                     + Publicar
//                 </button>
//             )}

//             {/* Formulario de publicación en el centro de la pantalla */}
//             {mostrarFormulario && (
//                 <div className="fixed inset-0 z-20 flex items-center justify-center">
//                     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
//                         <div className="mb-4">
//                             <label className="block text-lg font-semibold mb-2">Título</label>
//                             <input
//                                 type="text"
//                                 value={titulo}
//                                 onChange={(e) => setTitulo(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded text-[#757575]"
//                                 placeholder="Ingrese el título"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-lg font-semibold mb-2">Descripción</label>
//                             <textarea
//                                 value={descripcion}
//                                 onChange={(e) => setDescripcion(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded text-[#757575]"
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

//             {/* Mostrar las publicaciones */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
//                 {publicaciones.map((publicacion) => (
//                     <div key={publicacion.id} className="border border-gray-300 p-4 rounded text-[#757575]">
//                         <img src={publicacion.imagen} alt={publicacion.titulo} className="mb-4 rounded-md" />
//                         <h3 className="text-xl font-bold text-[#757575]">{publicacion.titulo}</h3>
//                         <p className="mt-2 text-[#757575]">{publicacion.descripcion}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Publicaciones;

'use client';

import { useState } from 'react';

// Definir la interfaz para las publicaciones
interface Publicacion {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string; // O el tipo que corresponda si decides cambiar la lógica
}

const Publicaciones = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState<File | null>(null);
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]); // Aquí se usa la interfaz

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!titulo || !descripcion || !imagen) {
            alert('Por favor completa todos los campos.');
            return;
        }

        // Crear nueva publicación usando la interfaz
        const nuevaPublicacion: Publicacion = {
            id: Date.now(),
            titulo,
            descripcion,
            imagen: URL.createObjectURL(imagen), // Convertir el archivo de imagen a URL
        };

        setPublicaciones([nuevaPublicacion, ...publicaciones]);

        // Limpiar los campos y ocultar el formulario
        setTitulo('');
        setDescripcion('');
        setImagen(null);
        setMostrarFormulario(false);
    };

    return (
        <div className={mostrarFormulario ? 'relative' : ''}>
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
            )}

            {!mostrarFormulario && (
                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 mb-6"
                >
                    + Publicar
                </button>
            )}

            {mostrarFormulario && (
                <div className="fixed inset-0 z-20 flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Título</label>
                            <input
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-[#757575]"
                                placeholder="Ingrese el título"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-[#757575]"
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

            {/* Mostrar las publicaciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                {publicaciones.map((publicacion) => (
                    <div key={publicacion.id} className="border border-gray-300 p-4 rounded text-[#757575]">
                        <img src={publicacion.imagen} alt={publicacion.titulo} className="mb-4 rounded-md" />
                        <h3 className="text-xl font-bold text-[#757575]">{publicacion.titulo}</h3>
                        <p className="mt-2 text-[#757575]">{publicacion.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Publicaciones;
