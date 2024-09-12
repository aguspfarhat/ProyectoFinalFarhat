import React from 'react';
import styles from '@/app/UI/home.module.css';
import Image from 'next/image';

const home: React.FC = () => {
    return (
        <main className='bg-white'>
            <div className={styles.container}>
                <h1 className={styles.titulo}>
                    Aportá tu granito de

                </h1>
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

            <div className="flex space-x-50">
                <div className={styles.bloque1}>
                    <h1 className={styles.TituloBloque1}>Que es lo que</h1>
                    <h1 className={styles.TituloBloque1}>buscamos?</h1>
                    <div className={styles.containerTextos1}>
                        <p className={styles.TextoBloque1}>Tratamos de ayudar a aquellas</p>
                        <p className={styles.TextoBloque1}>personas que no tienen las</p>
                        <p className={styles.TextoBloque1}> posibilidades tanto economicas</p>
                        <p className={styles.TextoBloque1}> como sociales para poder adquirir de</p>
                        <p className={styles.TextoBloque1}>forma rapida y sencilla productos</p>
                        <p className={styles.TextoBloque1}> ortopedicos de forma alquilada</p>
                    </div>

                </div>
                <div className={styles.bloque2}>
                    <h1 className={styles.TituloBloque2}>Porque lo hacemos?</h1>
                    <div className={styles.containerTextos2}>
                        <p className={styles.TextoBloque2}>Lo hacemos porque en base a</p>
                        <p className={styles.TextoBloque2}>nuestras experiencias personales</p>
                        <p className={styles.TextoBloque2}>con la busqueda de productos</p>
                        <p className={styles.TextoBloque2}>ortopedicos, siempre le encontramos</p>
                        <p className={styles.TextoBloque2}>algun problema y queremos que eso</p>
                        <p className={styles.TextoBloque2}>ya no exista</p>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default home;