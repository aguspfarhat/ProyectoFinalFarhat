'use client';

import react from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


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

            <div className="flex space-x-48">
                <div className="mt-56 ml-96">
                    <h1 className="text-7xl font-bold text-[#35B88E]">Iniciá</h1>
                    <h1 className="text-7xl font-bold text-[#35B88E]">sesion.</h1>
                </div>

                <div className="mt-56">
                    <form onSubmit={handleSubmit} >
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-[#757575]">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-[#757575]">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                            />
                        </div>

                        <div className="mt-12">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-medium text-white bg-[#35B88E] rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-56">

                    <Image
                        src="/Prestar.png"
                        width={200}
                        height={140}
                        // className={styles.PrestarImg}
                        alt="Imagen de Prestar"
                    />

                </div>
            </div>

            <div className="flex justify-center mt-20">
                <div>
                    <h1 className="text-2xl font-bold text-[#757575]">Todavia no tenes una</h1>
                    <h1 className="text-2xl font-bold text-[#757575]"> cuenta?, <Link href="/Signup"><span className="text-[#35B88E] hover:text-green-600">Clickea acá!</span></Link></h1>
                </div>
            </div>

        </main >
    );

}