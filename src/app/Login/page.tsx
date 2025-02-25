'use client';

// import react from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '../UI/LoginForm';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí podrías manejar el envío del formulario
        console.log('Correo:', email, 'Contraseña:', password);
    };

    return (
        <main>



            {/* <div className="mt-6 ml-5">
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




            <div className="w-full flex justify-center">
                <div className="flex flex-col lg:flex-row lg:space-x-48">
                    <div className="mt-20 lg:mt-56 lg:ml-96 text-center lg:text-left">
                        <h1 className="text-5xl lg:text-7xl font-bold text-[#35B88E]">Iniciá</h1>
                        <h1 className="text-5xl lg:text-7xl font-bold text-[#35B88E]">sesion.</h1>
                    </div>



                    <div className="mt-10 w-full lg:mt-44 flex justify-center">
                        <LoginForm />
                    </div>



                    <div className="hidden lg:block mt-20 lg:mt-56">
                        <Image
                            src="/Prestar.png"
                            width={200}
                            height={140}
                            alt="Imagen de Prestar"
                        />
                    </div>
                </div>
            </div>



            <div className="w-full flex justify-center">
                <div className="flex justify-center mt-20 text-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#757575]">Todavia no tenes una</h1>
                        <h1 className="text-2xl font-bold text-[#757575]"> cuenta?, <Link href="/Signup"><span className="text-[#35B88E] hover:text-green-600">Clickea acá!</span></Link></h1>
                    </div>
                </div>
            </div> */}

            <div className="mt-6 ml-5">
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

            <div className="w-full flex justify-center">
                <div className="flex flex-col items-center justify-center lg:place-items-center lg:grid lg:grid-cols-3 lg:gap-24">
                    <div className="mt-20 lg:mt-44 text-center lg:text-left">
                        <h1 className="text-5xl lg:text-7xl font-bold text-[#35B88E]">Iniciá</h1>
                        <h1 className="text-5xl lg:text-7xl font-bold text-[#35B88E]">sesión.</h1>
                    </div>

                    <div className="mt-10 w-full mr-3 lg:mt-0 flex justify-center">
                        <LoginForm />
                    </div>

                    <div className="hidden lg:block mt-20 lg:mt-44">
                        <Image
                            src="/Prestar.png"
                            width={200}
                            height={140}
                            alt="Imagen de Prestar"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <div className="flex justify-center mt-20 text-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#757575]">¿Todavía no tenes una cuenta?</h1>
                        <h1 className="text-2xl font-bold text-[#757575]">
                            <Link href="/Signup">
                                <span className="text-[#35B88E] hover:text-green-600">¡Clickea acá!</span>
                            </Link>
                        </h1>
                    </div>
                </div>
            </div>



        </main >
    );

}