import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import formidable, { File, Fields, Files, IncomingForm } from "formidable";
import path from "path";
import { authOptions } from "../api/auth/[...nextauth]";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/users";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Método de la solicitud:", req.method); // Log del método

    if (req.method !== "POST") {
        console.log("Método no permitido"); // Log si el método no es POST
        return res.status(405).json({ error: "Método no permitido" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        console.log("Usuario no autorizado"); // Log si no hay sesión
        return res.status(401).json({ error: "No autorizado" });
    }

    console.log("Sesión obtenida:", session); // Log de la sesión

    await connectToDatabase();

    const form = new IncomingForm({
        uploadDir: path.join(process.cwd(), "public/uploads"),
        keepExtensions: true,
        multiples: false, // Asegura que solo suba un archivo
    });

    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
        if (err) {
            console.error("Error al procesar el archivo", err); // Log del error
            return res.status(500).json({ error: "Error al procesar la imagen" });
        }

        const file = files.file?.[0] as File;
        if (!file) {
            console.log("No se recibió ningún archivo"); // Log si no se recibe archivo
            return res.status(400).json({ error: "No se recibió ningún archivo" });
        }

        const newPath = `/uploads/${path.basename(file.filepath)}`;



        console.log("Nuevo path de archivo:", newPath); // Log del nuevo path

        try {
            const updatedUser = await User.findOneAndUpdate(
                { email: session.user.email },
                { fotoPerfil: newPath },
                { new: true }
            );

            if (!updatedUser) {
                console.log("Usuario no encontrado"); // Log si no se encuentra el usuario
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            console.log("Imagen subida correctamente para el usuario"); // Log de éxito
            return res.status(200).json({ url: newPath });
        } catch (error) {
            console.error("Error al guardar la imagen", error); // Log del error
            return res.status(500).json({ error: "Error al guardar la imagen" });
        }
    });
}
