'use client';

import { useState } from 'react';

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

    return (
        <div className="container mx-auto px-4 py-8">
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
            )}

            {/* Sección superior: Filtro, Texto centrado, Botón Publicar */}
            <div className="flex justify-between items-center mb-6">
                {/* Botón de filtro alineado a la izquierda */}
                <button
                    className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-12 5.25h7.5m-10.5 5.25h13.5" />
                    </svg>
                </button>

                {/* Texto centrado */}
                <h1 className="text-3xl font-bold text-[#757575] text-center mx-auto">
                    Lo que estés buscando, <span className="text-[#35B88E]">encontralo!</span>
                </h1>

                {/* Botón + Publicar alineado a la derecha */}
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

            {/* Publicaciones: Aparecen abajo, alineadas a la izquierda */}
            <div className="mt-8">
                {/* <h2 className="text-xl font-bold mb-4 text-gray-800">Publicaciones recientes</h2> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {publicaciones.map((publicacion) => (
                        <div key={publicacion.id} className="border border-gray-300 p-4 rounded-lg shadow-md">
                            <img
                                src={publicacion.imagen}
                                alt={publicacion.titulo}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">{publicacion.titulo}</h3>
                            <p className="mt-2 text-gray-600">{publicacion.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Publicaciones;

