// pages/api/publicaciones/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import Publicacion, { IPublicacion } from '@/models/Publicacion';

type Data =
    | { success: boolean; data: IPublicacion[] }
    | { success: boolean; data: IPublicacion }
    | { success: boolean; error: string };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await connectToDatabase();

    const { method, query } = req;
    const { id } = req.query;

    switch (method) {
        case 'PATCH':
            try {
                const { pausada } = req.body;

                const publicacion = await Publicacion.findByIdAndUpdate(
                    id,
                    { pausada },
                    { new: true }
                );

                if (!publicacion) {
                    return res.status(404).json({ success: false, error: "Publicación no encontrada" });
                }

                return res.status(200).json({ success: true, data: publicacion });
            } catch (error: any) {
                return res.status(500).json({ success: false, error: error.message });
            }
        case 'GET':
            try {
                const filter = query.userId ? { userId: query.userId } : {};
                const publicaciones = await Publicacion.find({});
                return res.status(200).json({ success: true, data: publicaciones });
            } catch (error: any) {
                return res
                    .status(400)
                    .json({ success: false, error: error.message || 'Error al obtener publicaciones' });
            }

        case 'POST':
            try {
                // Asegúrate de enviar en el body los campos: titulo, descripcion, imagenes, categoria, userId, precio y opcionalmente pausada.
                const publicacion = await Publicacion.create(req.body);
                return res.status(201).json({ success: true, data: publicacion });
            } catch (error: any) {
                return res
                    .status(400)
                    .json({ success: false, error: error.message || 'Error al crear publicación' });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res
                .status(405)
                .json({ success: false, error: `Método ${method} no permitido` });
    }
}
