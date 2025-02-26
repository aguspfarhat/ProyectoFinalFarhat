"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function SignupForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") as string;
        const surname = formData.get("surname") as string;
        const email = formData.get("email") as string;
        const userName = formData.get("userName") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;


        if (password.length < 8) {
            setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
            return;
        }



        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, surname, email, userName, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || "Ocurrió un error al registrar.");
                return;
            }

            // Iniciar sesión automáticamente
            const signInResponse = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (signInResponse?.ok) {
                setSuccessMessage("Cuenta creada exitosamente. Redirigiendo...");
                setErrorMessage(null);
                router.push("/"); // Redirigir al inicio
            } else {
                setErrorMessage("Error al iniciar sesión automáticamente.");
            }
        } catch (error) {
            setErrorMessage("Ocurrió un error. Intenta de nuevo.");
        }
    };

    return (

        // <div className="mt-0 lg:mt-56 mx-auto lg:mx-0 w-11/12 lg:w-auto">

        //     <form onSubmit={handleSubmit} className="w-80 text-center">
        //         {/* Nombre */}
        //         <div className="mb-4">
        //             <label htmlFor="name" className="block text-sm font-medium text-[#757575]">
        //                 Nombre
        //             </label>
        //             <input
        //                 type="text"
        //                 id="name"
        //                 name="name"
        //                 required
        //                 className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
        //             />
        //         </div>

        //         {/* Apellido */}
        //         <div className="mb-4">
        //             <label htmlFor="surname" className="block text-sm font-medium text-[#757575]">
        //                 Apellido
        //             </label>
        //             <input
        //                 type="text"
        //                 id="surname"
        //                 name="surname"
        //                 required
        //                 className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
        //             />
        //         </div>

        //         {/* Correo */}
        //         <div className="mb-4">
        //             <label htmlFor="email" className="block text-sm font-medium text-[#757575]">
        //                 Correo Electrónico
        //             </label>
        //             <input
        //                 type="email"
        //                 id="email"
        //                 name="email"
        //                 required
        //                 className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
        //             />
        //         </div>

        //         {/* Nombre de usuario */}
        //         <div className="mb-4">
        //             <label htmlFor="userName" className="block text-sm font-medium text-[#757575]">
        //                 Nombre de Usuario
        //             </label>
        //             <input
        //                 type="text"
        //                 id="userName"
        //                 name="userName"
        //                 required
        //                 className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
        //             />
        //         </div>

        //         {/* Contraseña */}
        //         <div className="mb-4">
        //             <label htmlFor="password" className="block text-sm font-medium text-[#757575]">
        //                 Contraseña
        //             </label>
        //             <input
        //                 type="password"
        //                 id="password"
        //                 name="password"
        //                 required
        //                 className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
        //             />
        //         </div>

        //         {/* Confirmar contraseña */}
        //         <div className="mb-4">
        //             <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#757575]">
        //                 Confirmar Contraseña
        //             </label>
        //             <input
        //                 type="password"
        //                 id="confirmPassword"
        //                 name="confirmPassword"
        //                 required
        //                 className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
        //             />
        //         </div>
        //         <div className="mt-8 lg:mt-12">
        //             <button
        //                 type="submit"
        //                 className="w-full px-4 py-2 font-medium text-white bg-[#35B88E] rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //             >
        //                 Crear cuenta
        //             </button>
        //         </div>

        //         {/* Mensajes */}
        //         {errorMessage && (
        //             <p className="mt-3 text-md text-red-500 font-semibold">{errorMessage}</p>
        //         )}
        //         {successMessage && (
        //             <p className="mt-3 text-md text-green-500 font-semibold">{successMessage}</p>
        //         )}
        //     </form>

        // </div >

        <div className="flex justify-center lg:justify-start mt-0 lg:mt-56 w-11/12 lg:w-auto">
            <form onSubmit={handleSubmit} className="w-80 text-center">
                {/* Nombre */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-[#757575]">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                    />
                </div>

                {/* Apellido */}
                <div className="mb-4">
                    <label htmlFor="surname" className="block text-sm font-medium text-[#757575]">
                        Apellido
                    </label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        required
                        className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                    />
                </div>

                {/* Correo */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-[#757575]">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                    />
                </div>

                {/* Nombre de usuario */}
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-sm font-medium text-[#757575]">
                        Nombre de Usuario
                    </label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        required
                        className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                    />
                </div>

                {/* Contraseña */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-[#757575]">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                    />
                </div>

                {/* Confirmar contraseña */}
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#757575]">
                        Confirmar Contraseña
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
                    />
                </div>

                <div className="mt-8 lg:mt-12">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-[#35B88E] rounded-md hover:bg-[#2a9675] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Crear cuenta
                    </button>
                </div>

                {/* Mensajes */}
                {errorMessage && (
                    <p className="mt-3 text-md text-red-500 font-semibold">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="mt-3 text-md text-green-500 font-semibold">{successMessage}</p>
                )}
            </form>
        </div>



    );
}

export default SignupForm;



