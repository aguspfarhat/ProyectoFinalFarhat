'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Llamar a NextAuth para manejar el inicio de sesión
        const result = await signIn("credentials", {
            redirect: false, // Evitar redirección automática
            email,
            password,
        });

        if (result?.error) {
            setErrorMessage("Correo o contraseña incorrectos.");
        } else {
            setErrorMessage(null);
            router.push("/"); // Redirigir al inicio o a la página deseada
        }
    };

    return (
        <div className="mt-10 lg:mt-56 mx-auto lg:mx-0 w-11/12 lg:w-auto">
            <form onSubmit={handleSubmit} className="w-80 text-center">
                {/* Email */}
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

                {/* Password */}
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

                {/* Submit Button */}
                <div className="mt-8 lg:mt-12">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-[#35B88E] rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Iniciar sesión
                    </button>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <p className="mt-3 text-md text-red-500 font-semibold">
                        {errorMessage}
                    </p>
                )}
            </form>
        </div>
    );
}

export default LoginForm;
