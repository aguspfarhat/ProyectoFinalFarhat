'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewForm from '@/app/UI/ReviewForm';
import { Review } from '../Logic/data/types'; // Importa el tipo Review

const Comunidad = () => {
    const [reviews, setReviews] = useState<Review[]>([]); // Usa el tipo Review[]
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para controlar la visibilidad del popup
    const [currentIndex, setCurrentIndex] = useState(0); // Índice del review actual en el carrusel
    const [isManual, setIsManual] = useState(false); // Estado para detectar interacción manual

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await fetch('/api/reviews');
            const data = await res.json();
            setReviews(data);
            console.log(data);
        };

        fetchReviews();
    }, []);

    // Avanzar automáticamente cada 7 segundos si no hay interacción manual
    useEffect(() => {
        if (isManual) return;
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [isManual, reviews.length]);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const nextReview = () => {
        setIsManual(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const prevReview = () => {
        setIsManual(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };


    useEffect(() => {
        if (isPopupOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPopupOpen]);



    return (
        <div className="container mx-auto p-4">
            {/* <div className="relative flex items-center mt-10 sm:flex-row flex-col sm:justify-between">

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-[#757575] sm:text-left sm:w-auto">
                    Comunidad
                </h1>

                <button
                    onClick={openPopup}
                    className="ml-auto bg-[#35B88E] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#2a9675]"
                >
                    Agregar Reseña
                </button>
            </div> */}


            <div className="relative flex items-center mt-10 sm:flex-row flex-col sm:items-center">
                {/* Texto centrado solo en móviles */}
                <h1 className="text-3xl font-bold text-[#757575] sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 text-center">
                    Comunidad
                </h1>
                {/* Botón centrado en móviles y alineado a la derecha en pantallas grandes */}
                <button
                    onClick={openPopup}
                    className="mt-4 sm:mt-0 sm:ml-auto bg-[#35B88E] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#2a9675]"
                >
                    Agregar Reseña
                </button>
            </div>





            {/* Popup de reseña */}
            {isPopupOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
                    onClick={closePopup} // Cerrar el popup al hacer clic fuera
                >
                    <div
                        className="bg-white p-6 rounded-md shadow-lg w-96"
                        onClick={(e) => e.stopPropagation()} // Evitar que el clic dentro del popup cierre el popup
                    >
                        <ReviewForm closePopup={closePopup} />
                    </div>
                </div>
            )}

            <br />
            <br />

            <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold text-[#757575] mb-6">Reseñas</h2>
                {reviews.length > 0 ? (
                    <div className="relative w-80 h-80 mx-auto bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="absolute w-full h-full flex flex-col items-center justify-center p-6"
                            >
                                <div className="text-center">
                                    <p className="text-lg font-bold text-[#757575] mb-2">{reviews[currentIndex].content}</p>
                                    <div className="text-sm text-[#757575] mb-4">@{reviews[currentIndex].userId?.userName}</div>
                                    <div className="text-base text-[#757575]">Calificacion: {reviews[currentIndex].rating}/5</div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controles del carrusel */}
                        <button
                            onClick={prevReview}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center z-10"
                        >
                            &#8249;
                        </button>
                        <button
                            onClick={nextReview}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center z-10"
                        >
                            &#8250;
                        </button>
                    </div>
                ) : (
                    <p className="text-[#757575]">No hay reseñas disponibles.</p>
                )}

            </div>
        </div>
    );
};

export default Comunidad;

