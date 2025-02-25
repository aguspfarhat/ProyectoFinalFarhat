import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, connectWithMongoose } from "@/lib/mongodb"; // Importar ambas conexiones
import Mensaje from "@/models/mensaje";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase(); // Esto es para MongoClient (opcional si solo usamos Mongoose)
    await connectWithMongoose(); // 🔹 Asegurar la conexión con Mongoose antes de hacer consultas
    console.log("🔗 Conexión con MongoDB establecida");


    if (req.method === "POST") {
        try {

            console.log("🔵 Petición POST recibida");
            console.log("📩 Datos recibidos en POST:", req.body);
            const { publicacionId, usuarioId, usuarioNombre, mensaje } = req.body;

            if (!publicacionId || !usuarioId || !mensaje) {
                return res.status(400).json({ error: "Datos incompletos" });
            }

            const nuevoMensaje = await Mensaje.create({
                publicacionId,
                usuarioId,
                usuarioNombre,
                mensaje,
            });
            console.log("✅ Mensaje guardado:", nuevoMensaje);
            return res.status(201).json(nuevoMensaje);
        } catch (error) {
            console.error("❌ Error al guardar mensaje:", error);
            return res.status(500).json({ error: "Error al guardar mensaje" });
        }
    }

    else if (req.method === "GET") {

        console.log("🔍 GET recibido con publicacionId:", req.query.publicacionId);
        const { publicacionId } = req.query;

        if (!publicacionId) {
            return res.status(400).json({ error: "ID de publicación requerido" });
        }

        try {
            console.log("🛠️ Buscando mensajes en la base de datos...");
            const mensajes = await Mensaje.find({ publicacionId }).select("_id mensaje usuarioNombre respuesta").sort({ fecha: 1 });

            console.log("✅ Mensajes encontrados:", mensajes);
            return res.json(mensajes);
        } catch (error) {
            console.error("❌ Error al obtener mensajes:", error);
            return res.status(500).json({ error: "Error al obtener mensajes" });
        }


    }
    else {

        if (req.method === "PATCH") {

            try {
                console.log("🟡 PATCH recibido con datos:", req.body);

                const { respuesta } = req.body;
                let { mensajeId } = req.query;

                if (!respuesta || !mensajeId) {
                    return res.status(400).json({ error: "Faltan datos (mensajeId o respuesta)" });
                }

                // Convertir mensajeId a string (por si viene como array)
                if (Array.isArray(mensajeId)) mensajeId = mensajeId[0];

                // Verificar si el mensaje existe antes de actualizar
                const mensaje = await Mensaje.findById(mensajeId);
                if (!mensaje) {
                    return res.status(404).json({ error: "Mensaje no encontrado" });
                }

                // Actualizar solo el campo 'respuesta'
                mensaje.respuesta = respuesta;
                await mensaje.save();

                console.log("✅ Mensaje actualizado con respuesta:", mensaje);
                return res.json(mensaje);
            } catch (error) {
                console.error("❌ Error al actualizar respuesta:", error);
                return res.status(500).json({ error: "Error al actualizar respuesta" });
            }


        }

        return res.status(405).json({ error: "Método no permitido" });
    }
}
