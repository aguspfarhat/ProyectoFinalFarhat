// models/Publicacion.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPublicacion extends Document {
    titulo: string;
    descripcion: string;
    imagenes: string[];
    categoria: string;
    userId: string;
    precio: string;
    pausada?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PublicacionSchema: Schema = new Schema(
    {
        titulo: { type: String, required: true },
        descripcion: { type: String, required: true },
        imagenes: { type: [String], default: [] },
        categoria: { type: String, required: true },
        userId: { type: String, required: true },
        precio: { type: String, required: true },
        pausada: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Evitamos recompilar el modelo en modo desarrollo
export default (mongoose.models.Publicacion as Model<IPublicacion>) ||
    mongoose.model<IPublicacion>('Publicacion', PublicacionSchema);
