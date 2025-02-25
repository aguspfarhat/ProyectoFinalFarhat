// import { NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';
// import { connectWithMongoose } from '@/lib/mongodb';
// import User from '@/models/users';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("📌 API /api/ubicacion llamada con método:", req.method);

//     // 🔹 Conectar con la base de datos
//     await connectWithMongoose();

//     // 🔹 Obtener sesión del usuario correctamente
//     const session = await getServerSession(req, res, authOptions);
//     console.log("📌 Sesión obtenida:", session);

//     if (!session?.user?.email) {
//         return res.status(401).json({ error: "No autenticado" });
//     }

//     // 🔹 Manejo de métodos
//     if (req.method === 'PUT') {
//         try {
//             const { lat, lng } = req.body;
//             console.log("📌 Latitud y Longitud recibidos:", { lat, lng });

//             const user = await User.findOneAndUpdate(
//                 { email: session.user.email },
//                 { ubicacion: { lat, lng } },
//                 { new: true, upsert: true }
//             );

//             return res.status(200).json({ message: "Ubicación guardada con éxito", user });
//         } catch (error) {
//             console.error("❌ Error en PUT /api/ubicacion:", error);
//             return res.status(500).json({ error: "Error al guardar la ubicación" });
//         }
//     } else if (req.method === 'GET') {
//         try {
//             console.log("✅ Procesando GET en /api/ubicacion");
//             res.setHeader('Cache-Control', 'no-store');


//             const user = await User.findOne({ email: session.user.email });
//             if (!user || !user.ubicacion) {
//                 return res.status(404).json({ error: "Ubicación no encontrada" });
//             }

//             return res.status(200).json({ ubicacion: user.ubicacion, nombre: user.userName, correo: user.email, fotoPerfil: user.fotoPerfil });
//         } catch (error) {
//             console.error("❌ Error en GET /api/ubicacion:", error);
//             return res.status(500).json({ error: "Error al obtener la ubicación" });
//         }
//     }

//     return res.status(405).json({ error: "Método no permitido" });
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectWithMongoose } from '@/lib/mongodb';
import User from '@/models/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("📌 API /api/ubicacion llamada con método:", req.method);

    // Conectar con la base de datos
    await connectWithMongoose();

    // Obtener sesión del usuario
    const session = await getServerSession(req, res, authOptions);
    console.log("📌 Sesión obtenida:", session);

    if (!session?.user?.email) {
        return res.status(401).json({ error: "No autenticado" });
    }

    if (req.method === 'PUT') {
        try {
            const { lat, lng } = req.body;
            console.log("📌 Latitud y Longitud recibidos:", { lat, lng });

            const user = await User.findOneAndUpdate(
                { email: session.user.email },
                { ubicacion: { lat, lng } },
                { new: true, upsert: true }
            );

            return res.status(200).json({ message: "Ubicación guardada con éxito", user });
        } catch (error) {
            console.error("❌ Error en PUT /api/ubicacion:", error);
            return res.status(500).json({ error: "Error al guardar la ubicación" });
        }
    } else if (req.method === 'GET') {
        try {
            console.log("✅ Procesando GET en /api/ubicacion");
            res.setHeader('Cache-Control', 'no-store');

            // Si se envía un parámetro "id", se buscará al usuario por ese id.
            const { id, email } = req.query;
            let user;
            if (id) {
                user = await User.findById(id.toString());
            } else if (email) {
                user = await User.findOne({ email: email.toString() });
            } else {
                // Si no se envía ningún parámetro, se busca al usuario de la sesión
                user = await User.findOne({ email: session.user.email });
            }

            if (!user || !user.ubicacion) {
                return res.status(404).json({ error: "Ubicación no encontrada" });
            }

            return res.status(200).json({
                ubicacion: user.ubicacion,
                nombre: user.userName,
                correo: user.email,
                fotoPerfil: user.fotoPerfil
            });
        } catch (error) {
            console.error("❌ Error en GET /api/ubicacion:", error);
            return res.status(500).json({ error: "Error al obtener la ubicación" });
        }
    }

    return res.status(405).json({ error: "Método no permitido" });
}
