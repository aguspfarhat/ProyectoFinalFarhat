// import Link from 'next/link';
// import Image from 'next/image';

// const Navbar = () => {
//     return (
//         <nav className="flex justify-between items-center p-5 bg-white">
//             {/* Logo alineado a la izquierda */}
//             <div className="flex items-center">
//                 <Link href="/">
//                     <Image
//                         src="/PrestarLogo.png" // Ruta de la imagen del logo
//                         width={50}
//                         height={50}
//                         alt="Logo"
//                         className="hidden md:block"
//                     />
//                 </Link>
//             </div>

//             {/* Enlaces centrados */}
//             <div className="absolute left-1/2 transform -translate-x-1/2">
//                 <ul className="flex space-x-16">
//                     <li>
//                         <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E]">
//                             Inicio
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E]">
//                             Publicaciones
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E]">
//                             Comunidad
//                         </Link>
//                     </li>
//                 </ul>
//             </div>

//             {/* Botones alineados a la derecha */}
//             <div className="flex space-x-4">
//                 <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300">
//                     Iniciar sesión
//                 </button>
//                 <button className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600">
//                     Registrarse
//                 </button>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`flex justify-between items-center p-5 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white bg-opacity-5 backdrop-blur-md shadow-md' : 'bg-transparent'
                } sticky top-0 z-50`}
        >
            {/* Logo alineado a la izquierda */}
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        src="/PrestarLogo.png" // Ruta de la imagen del logo
                        width={45}
                        height={45}
                        alt="Logo"
                        className="hidden md:block"
                    />
                </Link>
            </div>

            {/* Enlaces centrados */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <ul className="flex space-x-16">
                    <li>
                        <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E]">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E]">
                            Publicaciones
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E]">
                            Comunidad
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Botones alineados a la derecha */}
            <div className="flex space-x-4">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300">
                    Iniciar sesión
                </button>
                <button className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600">
                    Registrarse
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
