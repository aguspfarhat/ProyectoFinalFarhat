// // next.d.ts
// import { IncomingMessage } from "http";
// import { File } from "multer";

// // Extender el tipo NextApiRequest de Next.js
// declare module "next" {
//     interface NextApiRequest extends IncomingMessage {
//         file?: File;
//         session?: import("next-auth").Session; // Asegúrate de que session esté correctamente tipado
//     }
// }

// // Definir el tipo File de multer con las propiedades correctas
// declare module "multer" {
//     interface File {
//         fieldname: string;
//         originalname: string;
//         encoding: string;
//         mimetype: string;
//         buffer: Buffer;
//         size: number;
//         stream: NodeJS.ReadableStream;
//     }
// }

// // Global declaration for multer file to make it accessible globally (if needed)
// declare global {
//     namespace NodeJS {
//         interface Global {
//             multerFile: File;
//         }
//     }
// }

// export { };



// next.d.ts
import { IncomingMessage } from "http";
import { File as MulterFile } from "multer";

// Extender el tipo NextApiRequest de Next.js
declare module "next" {
    interface NextApiRequest extends IncomingMessage {
        file?: MulterFile;
        session?: import("next-auth").Session; // Tipado de la sesión de next-auth
    }
}

// Asegúrate de que el tipo `File` de multer tenga la propiedad `buffer`
declare module "multer" {
    interface File {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        buffer: Buffer;  // Esto debe resolver el error de buffer
        size: number;
        stream: NodeJS.ReadableStream;
    }
}

export { };

