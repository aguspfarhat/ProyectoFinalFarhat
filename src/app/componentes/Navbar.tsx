import Link from 'next/link';
import Image from 'next/image';


const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-5 bg-white ">
            <div className="flex items-center ml-5">
                <Link href="/">
                    <Image
                        src="/PrestarLogo.png" // Ruta de la imagen del logo
                        width={50}
                        height={50}
                        alt="Logo"
                        // className="h-10 w-10 object-contain cursor-pointer"  
                        className='hidden md:block'
                    />
                </Link>
            </div>
            <div className="flex-grow flex justify-center pr-18">
                <ul className="flex space-x-16">
                    <li>
                        <Link href="/" className="text-gray-600 font-semibold hover:text-[#35B88E]">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-600 font-semibold hover:text-[#35B88E]">
                            Publicaciones
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-600 font-semibold hover:text-[#35B88E]">
                            Comunidad
                        </Link>
                    </li>
                </ul>
            </div>
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
