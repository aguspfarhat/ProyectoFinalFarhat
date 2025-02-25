'use client';

import React from 'react';
import styles from '@/app/UI/home.module.css';
import Image from 'next/image';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Link from 'next/link';

const Home: React.FC = () => {
    const { ref: refQueBuscamos, isIntersecting: isIntersectingQueBuscamos } = useIntersectionObserver(0.1);
    const { ref: refPorQueLoHacemos, isIntersecting: isIntersectingPorQueLoHacemos } = useIntersectionObserver(0.1);
    const { ref: refComoFunciona, isIntersecting: isIntersectingComoFunciona } = useIntersectionObserver(0.1);
    const { ref: refEmpezaAyudar, isIntersecting: isIntersectingEmpezaAyudar } = useIntersectionObserver(0.1);

    return (
        <main className='bg-white'>
            <div className={styles.container}>
                <h1 className={styles.titulo}> Aportá tu granito de</h1>
                <h1 className={styles.titulo}>arena, <span className={styles.highlight}> prestá ahora!</span></h1>
            </div>

            <div className="flex-grow flex justify-center">
                <Image
                    src='/CUIDARLOGO.png'
                    width={200}
                    height={140}
                    className={styles.PrestarImg}
                    alt="Imagen de Prestar"
                />
            </div>
            <div className={styles.TextosPresentacion}>
                <div className="py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row justify-center text-center lg:space-x-36 space-y-10 lg:space-y-0">

                            {/* Animación para "Que es lo que buscamos?" */}
                            <div
                                ref={refQueBuscamos}
                                className={`transition-opacity duration-1000 ${isIntersectingQueBuscamos ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <h2 className="text-3xl sm:text-4xl text-center lg:text-5xl font-bold text-[#757575] text-left lg:text-left">
                                    Qué es lo que buscamos?
                                </h2>
                                <p className="mt-4 text-gray-500 text-left text-sm sm:text-base text-center lg:text-lg">
                                    Tratamos de ayudar a aquellas personas que no tienen las posibilidades tanto económicas como sociales para adquirir de forma rápida y sencilla productos ortopédicos de forma alquilada.
                                </p>
                            </div>

                            {/* Animación para "Por qué lo hacemos?" */}
                            <div
                                ref={refPorQueLoHacemos}
                                className={`transition-opacity duration-1000 ${isIntersectingPorQueLoHacemos ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#757575] text-center lg:text-center whitespace-nowrap">
                                    Por qué lo hacemos?
                                </h2>
                                <p className="mt-8 sm:mt-16 lg:mt-28 text-gray-500 text-center text-sm sm:text-base lg:text-lg">
                                    Lo hacemos porque, en base a nuestras experiencias personales con la búsqueda de productos ortopédicos, siempre encontramos algún problema y queremos que eso ya no exista.
                                </p>
                            </div>

                            {/* Animación para "Cómo funciona?" */}
                            <div
                                ref={refComoFunciona}
                                className={`transition-opacity duration-1000 ${isIntersectingComoFunciona ? 'opacity-100' : 'opacity-0'}`}
                            >
                                {/* <h2 className="text-3xl md:text-center sm: text-center text-4xl lg:text-5xl font-bold text-[#757575] text-right lg:text-right">
                                    Cómo funciona?
                                </h2>
                                <p className="mt-8 md:text-center sm:text-center mt-12 lg:mt-16 text-gray-500 text-right text-sm sm:text-base lg:text-lg">
                                    Es una aplicación web que consiste en que los usuarios puedan publicar la disponibilidad de algún producto ortopédico o bien la búsqueda del mismo.
                                </p> */}

                                <h2 className="text-3xl sm:text-4xl md:text-center lg:text-right lg:text-5xl font-bold text-[#757575]">
                                    Cómo funciona?
                                </h2>
                                <p className="mt-8 sm:mt-12 md:text-center lg:text-right text-gray-500 text-sm sm:text-base lg:text-lg">
                                    Es una aplicación web que consiste en que los usuarios puedan publicar la disponibilidad de algún producto ortopédico o bien la búsqueda del mismo.
                                </p>


                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div ref={refEmpezaAyudar}
                className={`transition-opacity duration-1000 ${isIntersectingEmpezaAyudar ? 'opacity-100' : 'opacity-0'}`}>

                <div className="text-center pt-5">
                    <h1 className=" text-5xl text-[#35B88E] font-bold"> Empezá a ayudar!</h1>
                </div>

                <div className="flex">
                    <div className="hidden lg:block pl-20 pt-32">
                        <Image
                            src='/LandingPage.png'
                            width={800}
                            height={500}
                            className={styles.LandingPage}
                            alt="Imagen de Landing Page"
                        />
                    </div>



                    <div className="lg:mt-64 lg:ml-24">

                        <div className="hidden lg:block">
                            <h1 className="text-5xl text-right sm:text-center font-bold text-[#757575]">Para ver las publicaciones </h1>
                            <h1 className="text-5xl text-right sm:text-center font-bold text-[#757575]"> y/o empezar a publicar </h1>
                            <h1 className="text-5xl text-right sm:text-center font-bold text-[#757575]">algun producto, haz click </h1>
                            <h1 className="text-5xl text-right sm:text-center font-bold text-[#757575]">aquí!</h1>
                        </div>

                        <div className="lg:hidden mt-20">
                            <h1 className="text-3xl font-bold text-[#757575] text-center">Para ver las publicaciones</h1>
                            <h1 className="text-3xl font-bold text-[#757575] text-center">y/o empezar a publicar</h1>
                            <h1 className="text-3xl font-bold text-[#757575] text-center">algun producto, haz click</h1>
                            <h1 className="text-3xl font-bold text-[#757575] text-center">aquí!</h1>
                        </div>

                        <div className="flex justify-center mt-4 ml-4 lg:justify-end mr-4">
                            <Link href="./Publicaciones" passHref>
                                <button className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#2a9675] ml-auto mt-9">
                                    Publicaciones
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Home;
