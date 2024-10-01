'use client';

import react from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


export default function Signup() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí podrías manejar el envío del formulario
        console.log('Registro:', { name, surname, email, username, password, confirmPassword });
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
            <div className="flex space-x-56">
                <div className="mt-44 ml-36">
                    <h1 className="text-7xl font-bold text-[#35B88E]">Unite a la</h1>
                    <h1 className="text-7xl font-bold text-[#35B88E]">comunidad!</h1>
                </div>

                <div className="mt-44">
                    <form onSubmit={handleSubmit} >
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-[#757575]">
                                Nombre
                            </label>
                            <input
                                type="name"
                                id='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="surname" className="block text-sm font-medium text-[#757575]">
                                Apellido
                            </label>
                            <input
                                type="surname"
                                id='surname'
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                            />
                        </div>


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

                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-[#757575]">
                                Nombre de usuario
                            </label>
                            <input
                                type="username"
                                id='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                            />
                        </div>

                        <div className="mb-4">
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

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#757575]">
                                Confirmar contraseña
                            </label>
                            <input
                                type="confirmPassword"
                                id='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                            />
                        </div>

                        <div className="mt-12">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-medium text-white bg-[#35B88E] rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Crear cuenta
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-44">

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
                    <h1 className="text-2xl font-bold text-[#757575]">Ya tenes una cuenta?</h1>
                    <Link href="/Login">
                        <h1 className="text-2xl font-bold text-[#35B88E] hover:text-green-600">Inicia sesión!</h1>
                    </Link>
                </div>
            </div>

        </main>
    );
}