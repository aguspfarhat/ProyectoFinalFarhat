'use client';

// import react from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignupForm from '../UI/SignupForm';


export default function Signup() {

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



            {/* DIV DISPLAY FLEX FLEX COL*/}

            {/* DIV GRID GRID-COL-3*/}
            <div className='w-full flex justify-center'>

                <div className="flex flex-col items-center justify-center lg:place-items-center lg:grid lg:grid-cols-3 lg:gap-24">
                    <div className="mt-20 lg:mt-44 text-center lg:text-left">
                        <h1 className="text-5xl lg:text-7xl font-bold text-[#35B88E]">Unite a la</h1>
                        <h1 className="text-5xl lg:text-7xl font-bold text-[#35B88E]">comunidad!</h1>
                    </div>

                    <div className="mt-10 w-full lg:mt-44 flex justify-center">
                        <SignupForm />
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

            {/* /DIV */}

            {/* DIV GRID GRID-COL-3*/}
            <div className='w-full flex justify-center'>

                <div className="flex justify-center mt-20 text-center" > {/* COL-START-2 */}
                    <div>
                        <h1 className="text-2xl font-bold text-[#757575]">¿Ya tenes una cuenta?</h1>
                        <Link href="/Login">
                            <h1 className="text-2xl font-bold text-[#35B88E] hover:text-green-600">¡Inicia sesión!</h1>
                        </Link>
                    </div>
                </div>
            </div>

            {/* /DIV */}

            {/* /DIV */}
        </main>


    );
}