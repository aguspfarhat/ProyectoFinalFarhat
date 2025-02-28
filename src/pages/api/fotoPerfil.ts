// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import formidable, { File, Fields, Files, IncomingForm } from "formidable";
// import path from "path";
// import { authOptions } from "../api/auth/[...nextauth]";
// import { connectToDatabase } from "@/lib/mongodb";
// import User from "@/models/users";
// import cloudinary from "cloudinary";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// // Configuración de Cloudinary (asegúrate de tener estas variables en Vercel)
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//     api_key: process.env.CLOUDINARY_API_KEY!,
//     api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// // Función para envolver el parseo en una promesa
// function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
//     return new Promise((resolve, reject) => {
//         const form = new IncomingForm({
//             uploadDir: path.join(process.cwd(), "public/uploads"),
//             keepExtensions: true,
//             multiples: false,
//         });
//         form.parse(req, (err, fields, files) => {
//             if (err) return reject(err);
//             resolve({ fields, files });
//         });
//     });
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("Método de la solicitud:", req.method);

//     if (req.method !== "POST") {
//         console.log("Método no permitido");
//         return res.status(405).json({ error: "Método no permitido" });
//     }

//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//         console.log("Usuario no autorizado");
//         return res.status(401).json({ error: "No autorizado" });
//     }

//     console.log("Sesión obtenida:", session);

//     await connectToDatabase();

//     try {
//         // Parseamos el formulario
//         const { fields, files } = await parseForm(req);
//         const file = Array.isArray(files.file) ? files.file[0] : files.file;
//         if (!file) {
//             console.log("No se recibió ningún archivo");
//             return res.status(400).json({ error: "No se recibió ningún archivo" });
//         }

//         console.log("Procesando archivo:", file.filepath);

//         // Subimos el archivo a Cloudinary
//         const result = await cloudinary.v2.uploader.upload(file.filepath, {
//             folder: "uploads", // Puedes elegir una carpeta específica
//         });

//         const newUrl = result.secure_url;
//         console.log("Imagen subida a Cloudinary:", newUrl);

//         // Actualizamos la URL de la foto de perfil del usuario en la base de datos
//         const updatedUser = await User.findOneAndUpdate(
//             { email: session.user.email },
//             { fotoPerfil: newUrl },
//             { new: true }
//         );

//         if (!updatedUser) {
//             console.log("Usuario no encontrado");
//             return res.status(404).json({ error: "Usuario no encontrado" });
//         }

//         console.log("Imagen subida correctamente para el usuario");
//         return res.status(200).json({ url: newUrl });
//     } catch (error) {
//         console.error("Error al procesar la imagen", error);
//         return res.status(500).json({ error: "Error al procesar la imagen" });
//     }
// }


// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]";
// import { connectToDatabase } from "@/lib/mongodb";
// import User from "@/models/users";
// import cloudinary from "cloudinary";
// import formidable from "formidable";


// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//     api_key: process.env.CLOUDINARY_API_KEY!,
//     api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// // Función para envolver el parseo en una promesa
// function parseForm(req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
//     return new Promise((resolve, reject) => {
//         const form = new formidable.IncomingForm();
//         form.parse(req, (err, fields, files) => {
//             if (err) return reject(err);
//             resolve({ fields, files });
//         });
//     });
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("Método de la solicitud:", req.method);

//     if (req.method !== "POST") {
//         console.log("Método no permitido");
//         return res.status(405).json({ error: "Método no permitido" });
//     }

//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//         console.log("Usuario no autorizado");
//         return res.status(401).json({ error: "No autorizado" });
//     }

//     console.log("Sesión obtenida:", session);

//     await connectToDatabase();

//     try {
//         // Parseamos el formulario
//         const { files } = await parseForm(req);
//         // const file = Array.isArray(files.file) ? files.file[0] : files.file;

//         // if (!file) {
//         //     console.log("No se recibió ningún archivo");
//         //     return res.status(400).json({ error: "No se recibió ningún archivo" });
//         // }

//         // console.log("Procesando archivo:", file.filepath);
//         const file = Array.isArray(files) ? files[0] : files;  // Accede a los archivos directamente
//         if (!file) {
//             console.log("No se recibió ningún archivo");
//             return res.status(400).json({ error: "No se recibió ningún archivo" });
//         }

//         console.log("Procesando archivo:", file.filepath); // Accede a filepath directamente


//         // Leemos el archivo directamente desde el buffer
//         const buffer = await file.file.toBuffer();

//         // Subimos el archivo a Cloudinary
//         const result = await cloudinary.v2.uploader.upload_stream(
//             { folder: "uploads" },
//             async (error, result) => {
//                 if (error) {
//                     console.error("Error al subir la imagen a Cloudinary", error);
//                     return res.status(500).json({ error: "Error al subir la imagen" });
//                 }

//                 const newUrl = result?.secure_url;
//                 console.log("Imagen subida a Cloudinary:", newUrl);

//                 // Actualizamos la URL de la foto de perfil del usuario en la base de datos
//                 const updatedUser = await User.findOneAndUpdate(
//                     { email: session.user.email },
//                     { fotoPerfil: newUrl },
//                     { new: true }
//                 );

//                 if (!updatedUser) {
//                     console.log("Usuario no encontrado");
//                     return res.status(404).json({ error: "Usuario no encontrado" });
//                 }

//                 console.log("Imagen subida correctamente para el usuario");
//                 return res.status(200).json({ url: newUrl });
//             }
//         );

//         buffer.pipe(result); // Usamos el buffer directamente

//     } catch (error) {
//         console.error("Error al procesar la imagen", error);
//         return res.status(500).json({ error: "Error al procesar la imagen" });
//     }
// }





// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]";
// import { connectToDatabase } from "@/lib/mongodb";
// import User from "@/models/users";
// import cloudinary from "cloudinary";
// import multer from "multer";
// import stream from "stream";

// // Configuración de Multer
// const storage = multer.memoryStorage(); // Almacena el archivo en memoria
// const upload = multer({ storage: storage });

// // Configuración de Cloudinary
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//     api_key: process.env.CLOUDINARY_API_KEY!,
//     api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// // Configurar la API para no analizar el cuerpo automáticamente
// export const config = {
//     api: {
//         bodyParser: false, // Desactivar el bodyParser de Next.js
//     },
// };

// // Función para convertir el buffer en un stream (usado para Cloudinary)
// function bufferToStream(buffer: Buffer) {
//     const readable = new stream.PassThrough();
//     readable.end(buffer);
//     return readable;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("Método de la solicitud:", req.method);

//     if (req.method !== "POST") {
//         console.log("Método no permitido");
//         return res.status(405).json({ error: "Método no permitido" });
//     }

//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//         console.log("Usuario no autorizado");
//         return res.status(401).json({ error: "No autorizado" });
//     }

//     console.log("Sesión obtenida:", session);

//     await connectToDatabase();

//     // Usar Multer para procesar los archivos
//     upload.single("file")(req, res, async (err: any) => {
//         if (err) {
//             console.error("Error al procesar el archivo:", err);
//             return res.status(500).json({ error: "Error al procesar el archivo" });
//         }

//         const file = req.file;

//         if (!file) {
//             console.log("No se recibió ningún archivo");
//             return res.status(400).json({ error: "No se recibió ningún archivo" });
//         }

//         console.log("Procesando archivo:", file.originalname);

//         try {
//             // Convertir el archivo buffer en un stream para subirlo a Cloudinary
//             const bufferStream = bufferToStream(file.buffer);

//             // Subimos el archivo a Cloudinary
//             const result = await new Promise<any>((resolve, reject) => {
//                 cloudinary.v2.uploader.upload_stream(
//                     { folder: "uploads" },
//                     (error, result) => {
//                         if (error) {
//                             console.error("Error al subir la imagen a Cloudinary", error);
//                             reject(error);
//                         }
//                         resolve(result);
//                     }
//                 ).end(file.buffer); // Finaliza el stream con el archivo
//             });

//             const newUrl = result?.secure_url;
//             console.log("Imagen subida a Cloudinary:", newUrl);

//             // Actualizamos la URL de la foto de perfil del usuario en la base de datos
//             const updatedUser = await User.findOneAndUpdate(
//                 { email: session.user.email },
//                 { fotoPerfil: newUrl },
//                 { new: true }
//             );

//             if (!updatedUser) {
//                 console.log("Usuario no encontrado");
//                 return res.status(404).json({ error: "Usuario no encontrado" });
//             }

//             console.log("Imagen subida correctamente para el usuario");
//             return res.status(200).json({ url: newUrl });
//         } catch (error) {
//             console.error("Error al procesar la imagen", error);
//             return res.status(500).json({ error: "Error al procesar la imagen" });
//         }
//     });
// }


// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]";
// import { connectToDatabase } from "@/lib/mongodb";
// import User from "@/models/users";
// import cloudinary from "cloudinary";
// import multer from "multer";





// // Configuración de multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Configuración de Cloudinary
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//     api_key: process.env.CLOUDINARY_API_KEY!,
//     api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// // Función para manejar la carga de archivos
// export const config = {
//     api: {
//         bodyParser: false, // Necesario para multer
//     },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     // Usamos multer para manejar el archivo
//     upload.single("file")(req, res, async (err: Error | any) => {
//         if (err) {
//             return res.status(500).json({ error: "Error al procesar el archivo" });
//         }

//         // Accedemos al archivo cargado
//         const file = req.file;
//         if (!file) {
//             return res.status(400).json({ error: "No se recibió ningún archivo" });
//         }

//         console.log("Archivo procesado:", file);

//         // Subimos el archivo a Cloudinary
//         try {
//             const result = await cloudinary.v2.uploader.upload_stream(
//                 { folder: "uploads" },
//                 async (error, result) => {
//                     if (error) {
//                         return res.status(500).json({ error: "Error al subir la imagen" });
//                     }

//                     const newUrl = result?.secure_url;
//                     console.log("Imagen subida a Cloudinary:", newUrl);

//                     // Actualizamos la URL de la foto de perfil en la base de datos
//                     const updatedUser = await User.findOneAndUpdate(
//                         { email: req.session?.user?.email },
//                         { fotoPerfil: newUrl },
//                         { new: true }
//                     );

//                     if (!updatedUser) {
//                         return res.status(404).json({ error: "Usuario no encontrado" });
//                     }

//                     return res.status(200).json({ url: newUrl });
//                 }
//             );

//             // Procesar el archivo
//             result.end(file.buffer);

//         } catch (error) {
//             return res.status(500).json({ error: "Error al procesar la imagen" });
//         }
//     });
// }





// /pages/api/fotoPerfil.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase } from "@/lib/mongodb";
// import User from "@/models/users";
// import cloudinary from "cloudinary";
// import multer from "multer";

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//     api_key: process.env.CLOUDINARY_API_KEY!,
//     api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === "POST") {
//         upload.single("file")(req, res, async (err: Error | any) => {
//             if (err) {
//                 return res.status(500).json({ error: "Error al procesar el archivo" });
//             }

//             const file = req.file;
//             if (!file) {
//                 return res.status(400).json({ error: "No se recibió ningún archivo" });
//             }

//             try {
//                 const result = await cloudinary.v2.uploader.upload_stream(
//                     { folder: "uploads" },
//                     async (error, result) => {
//                         if (error) {
//                             return res.status(500).json({ error: "Error al subir la imagen" });
//                         }

//                         const newUrl = result?.secure_url;
//                         const updatedUser = await User.findOneAndUpdate(
//                             { email: req.session?.user?.email },
//                             { fotoPerfil: newUrl },
//                             { new: true }
//                         );

//                         if (!updatedUser) {
//                             return res.status(404).json({ error: "Usuario no encontrado" });
//                         }

//                         return res.status(200).json({ url: newUrl });
//                     }
//                 );

//                 result.end(file.buffer);
//             } catch (error) {
//                 return res.status(500).json({ error: "Error al procesar la imagen" });
//             }
//         });
//     } else {
//         res.status(405).json({ error: "Método no permitido" });
//     }
// }


import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/users";
import cloudinary from "cloudinary";
import multer from "multer";
import { getSession } from "next-auth/react";  // Importamos getSession para obtener la sesión

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const config = {
    api: {
        bodyParser: false, // Desactivamos el bodyParser para permitir el uso de multer
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        // Verificamos la sesión del usuario
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        upload.single("file")(req, res, async (err: Error | any) => {
            if (err) {
                return res.status(500).json({ error: "Error al procesar el archivo" });
            }

            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: "No se recibió ningún archivo" });
            }

            try {
                // Subimos la imagen a Cloudinary
                const result = await cloudinary.v2.uploader.upload_stream(
                    { folder: "uploads" },
                    async (error, result) => {
                        if (error) {
                            return res.status(500).json({ error: "Error al subir la imagen" });
                        }

                        // Recuperamos la URL de la imagen subida
                        const newUrl = result?.secure_url;

                        // Actualizamos el perfil del usuario con la nueva foto de perfil
                        const updatedUser = await User.findOneAndUpdate(
                            { email: session.user?.email },  // Usamos el email del usuario desde la sesión
                            { fotoPerfil: newUrl },
                            { new: true }
                        );

                        if (!updatedUser) {
                            return res.status(404).json({ error: "Usuario no encontrado" });
                        }

                        // Respondemos con la URL de la nueva foto de perfil
                        return res.status(200).json({ url: newUrl });
                    }
                );

                result.end(file.buffer);
            } catch (error) {
                return res.status(500).json({ error: "Error al procesar la imagen" });
            }
        });
    } else {
        return res.status(405).json({ error: "Método no permitido" });
    }
}
