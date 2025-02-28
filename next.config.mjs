// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     eslint: {
//         // Warning: esto permite que el build continúe aunque existan errores de ESLint.
//         ignoreDuringBuilds: true,
//     },
//     webpack: (config) => {

//         // Permitir que Webpack procese archivos .mjs
//         config.module.rules.push({
//             test: /\.mjs$/,
//             include: /node_modules/,
//             type: 'javascript/auto',
//         });

//         // Asegurarse de resolver archivos con extensión .mjs
//         config.resolve.extensions.push('.mjs');

//         return config;
//     },
// };

// export default nextConfig;


import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: esto permite que el build continúe aunque existan errores de ESLint.
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
    webpack: (config) => {
        // Permitir que Webpack procese archivos .mjs
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
        });

        // Asegurarse de resolver archivos con extensión .mjs
        config.resolve.extensions.push('.mjs');

        return config;
    },
};

export default nextConfig;
