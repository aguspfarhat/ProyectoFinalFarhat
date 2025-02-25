import mongoose, { Schema, Document } from "mongoose";

interface IMensaje extends Document {
    publicacionId: string;
    usuarioId: string;
    usuarioNombre: string;
    mensaje: string;
    fecha: Date;
    respuesta?: string;
}

const MensajeSchema = new Schema<IMensaje>({
    publicacionId: { type: String, required: true },
    usuarioId: { type: String, required: true },
    usuarioNombre: { type: String, required: true },
    mensaje: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    respuesta: { type: String, default: "" },
});

export default mongoose.models.Mensaje || mongoose.model<IMensaje>("Mensaje", MensajeSchema);
