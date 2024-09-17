import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <main className="bg-white">
            <div className="flex justify-center mt-20">
                <Image
                    src="/PrestarLogo.png" // Ruta de la imagen del logo
                    width={50}
                    height={50}
                    alt="Logo"
                    className="hidden md:block"
                />
            </div>
            <div className="flex justify-center ml-12 mt-7">
                <ul className="flex space-x-8">
                    <li>
                        <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
                            Publicaciones
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-[#757575] font-semibold hover:text-[#35B88E] text-xs">
                            Comunidad
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mt-10">
                <div className="flex justify-center">
                    <p className="text-[#757575] font-semibold text-xs">Terminos y condiciones</p>
                </div>
                <div className="flex justify-center">
                    <p className="text-[#757575] font-semibold text-xs">@ 2024 Prestar</p>
                </div>
            </div>
            <br />
            <br />

        </main>
    );
}

export default Footer