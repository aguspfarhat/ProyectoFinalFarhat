'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState("/default-profile.png"); // Estado para la foto de perfil
    const pathname = usePathname();
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Obtener la foto de perfil del usuario
    useEffect(() => {
        const obtenerFotoPerfil = async () => {
            if (!session?.user?.email) return;

            try {
                const res = await fetch(`/api/ubicacion?email=${session.user.email}`);
                const data = await res.json();

                if (data.fotoPerfil) {
                    setFotoPerfil(data.fotoPerfil);
                }
            } catch (error) {
                console.error("Error obteniendo la foto de perfil:", error);
            }
        };

        obtenerFotoPerfil();
    }, [session]);

    return (
        <nav
            className={`flex justify-between items-center p-5 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white bg-opacity-5 backdrop-blur-md' : 'bg-transparent'
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
                        className="block"
                    />
                </Link>
            </div>

            {/* Enlaces centrados para pantallas grandes */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <ul className="flex space-x-8">
                    <li>
                        <Link
                            href="/"
                            className={`hover-underline text-[#757575] font-semibold hover:text-[#35B88E] relative ${pathname === '/' ? 'text-[#35B88E]' : ''
                                }`}
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/Publicaciones"
                            className={`hover-underline text-[#757575] font-semibold hover:text-[#35B88E] relative ${pathname === '/Publicaciones' ? 'text-[#35B88E]' : ''
                                }`}
                        >
                            Publicaciones
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/Comunidad"
                            className={`hover-underline text-[#757575] font-semibold hover:text-[#35B88E] relative ${pathname === '/Comunidad' ? 'text-[#35B88E]' : ''
                                }`}
                        >
                            Comunidad
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Botones o icono de perfil dependiendo del estado de la sesión */}
            <div className="hidden md:flex space-x-4 relative">
                {session ? (
                    // Mostrar el icono de perfil si hay sesión activa
                    <div>
                        <Image
                            src={fotoPerfil || "/default-profile.png"} // Mostrar la foto de perfil obtenida
                            width={35}
                            height={35}
                            alt="Perfil"
                            className="rounded-full cursor-pointer"
                            onClick={() => setIsProfileOpen(!isProfileOpen)} // Abrir/cerrar pop-up
                        />
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    <Link href="/Perfil">
                                        Mi perfil
                                    </Link>
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    onClick={() => signOut()}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    // Mostrar botones de iniciar sesión y registrarse si no hay sesión
                    <>
                        <Link href="/Login">
                            <button className="text-gray-800 px-4 py-2 rounded-md font-semibold hover:text-[#35B88E]">
                                Iniciar sesión
                            </button>
                        </Link>

                        <Link href="/Signup">
                            <button className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600">
                                Registrarse
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
