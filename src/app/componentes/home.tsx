'use client';

import React from 'react';
import styles from '@/app/UI/home.module.css';
import Image from 'next/image';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

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
                    src='/Prestar.png'
                    width={200}
                    height={140}
                    className={styles.PrestarImg}
                    alt="Imagen de Prestar"
                />
            </div>

            <div className={styles.TextosPresentacion}>
                <div className="py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center text-center space-x-36">

                            {/* Animación para "Que es lo que buscamos?" */}
                            <div
                                ref={refQueBuscamos}
                                className={`transition-opacity duration-1000 ${isIntersectingQueBuscamos ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <h2 className="text-5xl font-bold text-[#757575] text-left">Que es lo que buscamos?</h2>
                                <p className="mt-4 text-gray-500 text-left text-lg">
                                    Tratamos de ayudar a aquellas personas que no tienen las posibilidades tanto económicas como sociales para adquirir de forma rápida y sencilla productos ortopédicos de forma alquilada.
                                </p>
                            </div>

                            {/* Animación para "Por qué lo hacemos?" */}
                            <div
                                ref={refPorQueLoHacemos}
                                className={`transition-opacity duration-1000 ${isIntersectingPorQueLoHacemos ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <h2 className="text-5xl font-bold text-[#757575] text-center whitespace-nowrap">Por qué lo hacemos?</h2>
                                <p className="mt-28 text-gray-500 text-center text-lg">
                                    Lo hacemos porque, en base a nuestras experiencias personales con la búsqueda de productos ortopédicos, siempre encontramos algún problema y queremos que eso ya no exista.
                                </p>
                            </div>

                            {/* Animación para "Cómo funciona?" */}
                            <div
                                ref={refComoFunciona}
                                className={`transition-opacity duration-1000 ${isIntersectingComoFunciona ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <h2 className="text-5xl font-bold text-[#757575] text-center">Cómo funciona?</h2>
                                <p className="mt-16 text-gray-500 text-right text-lg">
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
                    <div className="pl-20 pt-32">
                        <Image
                            src='/LandingPage.png'
                            width={800}
                            height={500}
                            className={styles.LandingPage}
                            alt="Imagen de Landing Page"
                        />
                    </div>
                    <div className="mt-64 ml-24">
                        <h1 className="text-5xl text-right font-bold text-[#757575] mr-4 ">Para ver las publicaciones </h1>
                        <h1 className="text-5xl text-right font-bold text-[#757575] mr-4 "> y/o empezar a publicar </h1>
                        <h1 className="text-5xl text-right font-bold text-[#757575] mr-4 ">algun producto, haz click </h1>
                        <h1 className="text-5xl text-right font-bold text-[#757575] mr-4 ">aquí!</h1>
                        <div className="flex">
                            <button className="bg-[#35B88E] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 ml-auto mt-9">
                                Publicaciones
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
