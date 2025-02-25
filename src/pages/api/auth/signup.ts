import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

// Configuración de la conexión a MongoDB
const url = process.env.MONGO_URL || "";
const client = new MongoClient(url);
const dbName = "Prestar";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { name, surname, email, userName, password } = req.body;

        // Validar datos
        if (!name || !surname || !email || !userName || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        try {
            await client.connect();
            const db = client.db(dbName);
            const usersCollection = db.collection("Users");

            // Verificar si el usuario o correo ya existen
            const existingUser = await usersCollection.findOne({
                $or: [{ email }, { userName }],
            });

            if (existingUser) {
                return res.status(400).json({ message: "El usuario o correo ya están registrados." });
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el usuario y guardarlo en la base de datos
            const newUser = {
                name,
                surname,
                email,
                userName,
                password: hashedPassword,
                createdAt: new Date(),
            };

            await usersCollection.insertOne(newUser);

            return res.status(201).json({ message: "Usuario registrado exitosamente." });
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        } finally {
            await client.close();
        }
    } else {
        // Método no permitido
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: `Método ${req.method} no permitido.` });
    }
}
