// "use client"

// import React from 'react'
// import { useActionState, useEffect } from "react";
// import { userSignUpFormAction } from '../Logic/data/actions';
// import { UserState } from '../Logic/data/types';

// function SignupForm() {
//     const initialState: UserState = {
//         errors: null,
//         message: null
//     }

//     const [state, formAction] = useActionState(userSignUpFormAction, initialState)

//     return (
//         <form action={formAction} className='w-80 text-center'>

//             {/* Name */}
//             <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-[#757575]">
//                     Nombre
//                 </label>
//                 <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     required
//                     aria-describedby='name-error'
//                     className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                 />
//                 <div id="name-error" aria-live="polite" aria-atomic="true">
//                     {
//                         state.errors?.name &&
//                         state.errors.name.map((error: string) => (
//                             <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
//                         ))
//                     }
//                 </div>
//             </div>


//             {/* Surname */}
//             <div className="mb-4">
//                 <label htmlFor="surname" className="block text-sm font-medium text-[#757575]">
//                     Apellido
//                 </label>
//                 <input
//                     type="text"
//                     name="surname"
//                     id="surname"
//                     aria-describedby='surname-error'
//                     required
//                     className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                 />
//                 <div id="surname-error" aria-live="polite" aria-atomic="true">
//                     {
//                         state.errors?.surname &&
//                         state.errors.surname.map((error: string) => (
//                             <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
//                         ))
//                     }
//                 </div>
//             </div>


//             {/* email */}
//             <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium text-[#757575]">
//                     Correo Electrónico
//                 </label>
//                 <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     aria-describedby='email-error'
//                     required
//                     className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                 />
//                 <div id="email-error" aria-live="polite" aria-atomic="true">
//                     {
//                         state.errors?.email &&
//                         state.errors.email.map((error: string) => (
//                             <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
//                         ))
//                     }
//                 </div>
//             </div>


//             {/* username */}
//             <div className="mb-4">
//                 <label htmlFor="username" className="block text-sm font-medium text-[#757575]">
//                     Nombre de usuario
//                 </label>
//                 <input
//                     type="text"
//                     name="userName"
//                     id="userName"
//                     aria-describedby='userName-error'
//                     required
//                     className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                 />
//                 <div id="userName-error" aria-live="polite" aria-atomic="true">
//                     {
//                         state.errors?.userName &&
//                         state.errors.userName.map((error: string) => (
//                             <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
//                         ))
//                     }
//                 </div>
//             </div>


//             {/* contraseña */}
//             <div className="mb-4">
//                 <label htmlFor="password" className="block text-sm font-medium text-[#757575]">
//                     Contraseña
//                 </label>
//                 <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     aria-describedby='password-error'
//                     required
//                     className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                 />
//                 <div id="password-error" aria-live="polite" aria-atomic="true">
//                     {
//                         state.errors?.password &&
//                         state.errors.password.map((error: string) => (
//                             <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
//                         ))
//                     }
//                 </div>
//             </div>



//             {/* Confirm password */}
//             <div className="mb-4">
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#757575]">
//                     Confirmar contraseña
//                 </label>
//                 <input
//                     type="password"
//                     name="confirmPassword"
//                     id="confirmPassword"
//                     aria-describedby='confirmPassword-error'
//                     required
//                     className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                 />
//                 {
//                     state.errors?.confirmPassword &&
//                     state.errors?.confirmPassword.map((error: string) => (
//                         <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
//                     ))
//                 }
//             </div>





//             <div className="mt-8 lg:mt-12">
//                 <button
//                     type="submit"
//                     className="w-full px-4 py-2 font-medium text-white bg-[#35B88E] rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                     Crear cuenta
//                 </button>

//                 {state.message && (
//                     <p className={state.errors ? "mt-3 text-md text-red-500 font-semibold" : "mt-3 text-md text-green-500 font-semibold"}>
//                         {state.message}
//                     </p>
//                 )}

//             </div>
//         </form>
//     )
// }

// export default SignupForm;






// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// function SignupForm() {
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const router = useRouter();

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const formData = new FormData(event.currentTarget);

//         const name = formData.get("name") as string;
//         const surname = formData.get("surname") as string;
//         const email = formData.get("email") as string;
//         const username = formData.get("userName") as string;
//         const password = formData.get("password") as string;
//         const confirmPassword = formData.get("confirmPassword") as string;

//         if (password !== confirmPassword) {
//             setErrorMessage("Las contraseñas no coinciden.");
//             return;
//         }

//         // Simulación de llamada a API para registrar al usuario
//         try {
//             const response = await fetch("/api/auth/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ name, surname, email, username, password }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 setErrorMessage(data.message || "Ocurrió un error al registrar.");
//                 return;
//             }

//             setSuccessMessage("Cuenta creada exitosamente. Redirigiendo...");
//             setErrorMessage(null);

//             // Redirigir al inicio después de 2 segundos
//             setTimeout(() => {
//                 router.push("/");
//             }, 2000);
//         } catch (error) {
//             setErrorMessage("Ocurrió un error. Intenta de nuevo.");
//         }
//     };

//     return (
//         <div className="mt-10 lg:mt-56 mx-auto lg:mx-0 w-11/12 lg:w-auto">
//             <form onSubmit={handleSubmit} className="w-80 text-center">
//                 {/* Nombre */}
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-[#757575]">
//                         Nombre
//                     </label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         required
//                         className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                     />
//                 </div>

//                 {/* Apellido */}
//                 <div className="mb-4">
//                     <label htmlFor="surname" className="block text-sm font-medium text-[#757575]">
//                         Apellido
//                     </label>
//                     <input
//                         type="text"
//                         id="surname"
//                         name="surname"
//                         required
//                         className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                     />
//                 </div>

//                 {/* Correo */}
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium text-[#757575]">
//                         Correo Electrónico
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         required
//                         className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                     />
//                 </div>

//                 {/* Nombre de usuario */}
//                 <div className="mb-4">
//                     <label htmlFor="userName" className="block text-sm font-medium text-[#757575]">
//                         Nombre de Usuario
//                     </label>
//                     <input
//                         type="text"
//                         id="userName"
//                         name="userName"
//                         required
//                         className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                     />
//                 </div>

//                 {/* Contraseña */}
//                 <div className="mb-4">
//                     <label htmlFor="password" className="block text-sm font-medium text-[#757575]">
//                         Contraseña
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         required
//                         className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                     />
//                 </div>

//                 {/* Confirmar contraseña */}
//                 <div className="mb-4">
//                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#757575]">
//                         Confirmar Contraseña
//                     </label>
//                     <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         required
//                         className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#35B88E] focus:border-[#35B88E] sm:text-sm text-[#757575]"
//                     />
//                 </div>

//                 {/* Botón de enviar */}
//                 <div className="mt-8 lg:mt-12">
//                     <button
//                         type="submit"
//                         className="w-full px-4 py-2 font-medium text-white bg-[#35B88E] rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     >
//                         Crear cuenta
//                     </button>
//                 </div>

//                 {/* Mensajes */}
//                 {errorMessage && (
//                     <p className="mt-3 text-md text-red-500 font-semibold">{errorMessage}</p>
//                 )}
//                 {successMessage && (
//                     <p className="mt-3 text-md text-green-500 font-semibold">{successMessage}</p>
//                 )}
//             </form>
//         </div>
//     );
// }

// export default SignupForm;




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
        const username = formData.get("userName") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

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
                body: JSON.stringify({ name, surname, email, username, password }),
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
        <div className="mt-10 lg:mt-56 mx-auto lg:mx-0 w-11/12 lg:w-auto">
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
                        className="w-full px-4 py-2 font-medium text-white bg-[#35B88E] rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
