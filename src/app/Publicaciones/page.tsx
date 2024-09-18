import React from 'react';
import Publicaciones from './form/page';
import { FunnelIcon } from '@heroicons/react/24/solid';

export default function PublicacionesOver() {
    return (
        <main>
            {/* <div className="flex flex-col items-center justify-center space-y-10 max-w-screen-xl mx-auto">
                <div className="mt-10">
                    <button className="bg-[#35B88E] p-2 rounded-full hover:bg-green-600">
                        <FunnelIcon className="h-6 w-6 text-white" />
                    </button>
                </div>
                <div className="mt-10 flex justify-center">
                    <h1 className="text-4xl text-[#757575] font-bold text-center">
                        Lo que estés buscando, <span className="text-[#35B88E]">encontralo!</span>
                    </h1>
                </div>
                <div className="mt-8 w-full">
                    <Publicaciones />
                </div>
            </div> */}

            <div className="flex justify-between items center p-4 mt-10">
                <div className="flex items-center">
                    <button className="bg-[#35B88E] p-2 rounded-full hover:bg-green-600 ml-10">
                        <FunnelIcon className="h-6 w-6 text-white" />
                    </button>
                </div>

                <h1 className="text-4xl text-[#757575] font-bold text-center mt-6">
                    Lo que estés buscando, <span className="text-[#35B88E]">encontralo!</span>
                </h1>
                <div className="mr-10 mt-6">
                    <Publicaciones />
                </div>


            </div>
        </main>
    );
}