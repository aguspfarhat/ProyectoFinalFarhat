// // components/ReviewForm.tsx
// 'use client';
// import { useState } from 'react';

// const ReviewForm = () => {
//     const [content, setContent] = useState('');
//     const [rating, setRating] = useState(1);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         // Obtén el ID del usuario desde la sesión (asumiendo que estás usando NextAuth)
//         const response = await fetch('/api/auth/session');
//         const session = await response.json();
//         const userId = session?.user?.id;

//         if (!userId) {
//             alert('You must be logged in to submit a review.');
//             setIsSubmitting(false);
//             return;
//         }

//         const reviewData = {
//             userId,
//             content,
//             rating,
//         };

//         const res = await fetch('/api/reviews', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(reviewData),
//         });

//         if (res.ok) {
//             alert('Review submitted successfully!');
//             setContent('');
//             setRating(1);
//         } else {
//             alert('Failed to submit review');
//         }

//         setIsSubmitting(false);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
//             <h2 className="text-2xl font-semibold mb-4 text-[#757575]">Agrega tu reseña</h2>

//             <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Escribe tu reseña aquí"
//                 rows={4}
//                 className="w-full p-2 border text-[#757575] border-gray-300 rounded-md mb-4"
//                 required
//             />

//             <div className="mb-4">
//                 <label htmlFor="rating" className="block text-sm font-medium text-[#757575]">Calificacion</label>
//                 <input
//                     type="number"
//                     id="rating"
//                     value={rating}
//                     onChange={(e) => setRating(Number(e.target.value))}
//                     min="1"
//                     max="5"
//                     className="w-full p-2 border text-[#757575] border-gray-300 rounded-md"
//                     required
//                 />
//             </div>

//             <button
//                 type="submit"
//                 className="w-full bg-[#35B88E] text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:bg-gray-400"
//                 disabled={isSubmitting}
//             >
//                 {isSubmitting ? 'Subiendo...' : 'Agregar reseña'}
//             </button>
//         </form>
//     );
// };

// export default ReviewForm;



'use client';
import { useState } from 'react';

const ReviewForm = ({ closePopup }: { closePopup: () => void }) => {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Obtén el ID del usuario desde la sesión (asumiendo que estás usando NextAuth)
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        const userId = session?.user?.id;

        if (!userId) {
            alert('Tenes que estar logeado para poder subir una reseña');
            setIsSubmitting(false);
            return;
        }

        const reviewData = {
            userId,
            content,
            rating,
        };

        const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        if (res.ok) {
            alert('Reseña subida exitosamente!');
            setContent('');
            setRating(1);
            closePopup(); // Cerrar el popup después de enviar la reseña
        } else {
            alert('Error al subir reseña');
        }

        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-[#757575]">Agrega tu reseña</h2>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe tu reseña aquí"
                rows={4}
                className="w-full p-2 border text-[#757575] border-gray-300 rounded-md mb-4"
                required
            />

            <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-[#757575]">Calificación</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="1"
                    max="5"
                    className="w-full p-2 border text-[#757575] border-gray-300 rounded-md"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#35B88E] text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:bg-gray-400"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Subiendo...' : 'Agregar reseña'}
            </button>
        </form>
    );
};

export default ReviewForm;
