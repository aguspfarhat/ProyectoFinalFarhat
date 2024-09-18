'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname(); // Obtiene la ruta actual

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

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
                        src="/PrestarLogo.png"
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
                        <Link href="/" className={`text-[#757575] font-semibold hover:text-[#35B88E] relative ${pathname === '/' ? 'text-[#35B88E]' : ''}`}>
                            Inicio
                            {pathname === '/' && (
                                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#35B88E]"></span>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link href="/Publicaciones" className={`text-[#757575] font-semibold hover:text-[#35B88E] relative ${pathname === '/Publicaciones' ? 'text-[#35B88E]' : ''}`}>
                            Publicaciones
                            {pathname === '/Publicaciones' && (
                                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#35B88E]"></span>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link href="/comunidad" className={`text-[#757575] font-semibold hover:text-[#35B88E] relative ${pathname === '/comunidad' ? 'text-[#35B88E]' : ''}`}>
                            Comunidad
                            {pathname === '/comunidad' && (
                                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#35B88E]"></span>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Botones alineados a la derecha */}
            <div className="flex space-x-4">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:text-[#35B88E]">
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

