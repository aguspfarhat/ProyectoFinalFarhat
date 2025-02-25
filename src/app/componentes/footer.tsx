// import Link from "next/link";
// import Image from "next/image";

// const Footer = () => {
//     return (
//         <main className="bg-white">
//             <div className="flex justify-center mt-20">
//                 <Image
//                     src="/PrestarLogo.png" // Ruta de la imagen del logo
//                     width={50}
//                     height={50}
//                     alt="Logo"
//                     className="hidden md:block"
//                 />
//             </div>
//             <div className="flex justify-center ml-10 mt-7">
//                 <ul className="flex space-x-8">
//                     <li>
//                         <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
//                             Inicio
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/Publicaciones" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
//                             Publicaciones
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/Comunidad" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
//                             Comunidad
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//             <div className="mt-10 ml-2">
//                 <div className="flex justify-center">
//                     <p className="text-[#757575] font-semibold text-xs">Terminos y condiciones</p>
//                 </div>
//                 <div className="flex justify-center">
//                     <p className="text-[#757575] font-semibold text-xs">@ 2025 Cuidar</p>
//                 </div>
//             </div>
//             <br />
//             <br />

//         </main>
//     );
// }

// export default Footer

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <main className="bg-white py-10">
            {/* En pantallas grandes, mantiene el diseño original */}
            <div className="hidden md:block">
                <div className="flex justify-center mt-20">
                    <Image
                        src="/PrestarLogo.png"
                        width={50}
                        height={50}
                        alt="Logo"
                    />
                </div>
                <div className="flex justify-center ml-10 mt-7">
                    <ul className="flex space-x-8">
                        <li>
                            <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/Publicaciones" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
                                Publicaciones
                            </Link>
                        </li>
                        <li>
                            <Link href="/Comunidad" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
                                Comunidad
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-10 ml-2">
                    <div className="flex justify-center">
                        <p className="text-[#757575] font-semibold text-xs">Developed by Agustin Perez Farhat</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="text-[#757575] font-semibold text-xs">@ 2025 Cuidar</p>
                    </div>
                </div>
            </div>

            {/* En pantallas móviles, se centra correctamente */}
            <div className="block md:hidden flex flex-col items-center">
                {/* Logo */}
                <div className="mb-6">
                    <Image
                        src="/PrestarLogo.png"
                        width={50}
                        height={50}
                        alt="Logo"
                    />
                </div>

                {/* Navegación */}
                <nav className="mt-4">
                    <ul className="flex flex-col space-y-4 items-center">
                        <li>
                            <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/Publicaciones" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
                                Publicaciones
                            </Link>
                        </li>
                        <li>
                            <Link href="/Comunidad" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
                                Comunidad
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Términos y derechos */}
                <div className="mt-10 text-center">
                    <p className="text-[#757575] font-semibold text-xs">Developed by Agustin Perez Farhat</p>
                    <p className="text-[#757575] font-semibold text-xs">@ 2025 Cuidar</p>
                </div>
            </div>
        </main>
    );
}

export default Footer;

