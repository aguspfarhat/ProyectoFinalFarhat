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
        case 'DELETE':
            try {
                const deletedPublicacion = await Publicacion.findByIdAndDelete(id);
                if (!deletedPublicacion) {
                    return res.status(404).json({
                        success: false,
                        error: 'Publicación no encontrada',
                    });
                }
                return res.status(200).json({ success: true, data: deletedPublicacion });
            } catch (error: any) {
                return res
                    .status(400)
                    .json({ success: false, error: error.message || 'Error al eliminar publicación' });
            }

        default:
            res.setHeader('Allow', ['DELETE']);
            return res
                .status(405)
                .json({ success: false, error: `Método ${method} no permitido` });
    }
}
