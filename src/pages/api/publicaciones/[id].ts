// pages/api/publicaciones/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import Publicacion, { IPublicacion } from '@/models/Publicacion';

type Data =
    | { success: boolean; data: IPublicacion }
    | { success: boolean; error: string };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        query: { id },
        method,
    } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            try {
                const publicacion = await Publicacion.findById(id);
                if (!publicacion) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'Publicación no encontrada' });
                }
                return res.status(200).json({ success: true, data: publicacion });
            } catch (error: any) {
                return res
                    .status(400)
                    .json({ success: false, error: error.message || 'Error al obtener la publicación' });
            }
        case 'DELETE':
            try {
                const deletedPublicacion = await Publicacion.findByIdAndDelete(id);
                if (!deletedPublicacion) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'Publicación no encontrada' });
                }
                return res.status(200).json({ success: true, data: deletedPublicacion });
            } catch (error: any) {
                return res
                    .status(400)
                    .json({ success: false, error: error.message || 'Error al eliminar publicación' });
            }
        default:
            res.setHeader('Allow', ['GET', 'DELETE']);
            return res
                .status(405)
                .json({ success: false, error: `Método ${method} no permitido` });
    }
}
