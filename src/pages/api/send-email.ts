// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ResponseData = {
    message?: string;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Método no permitido' });
    }

    // Extraemos los datos enviados desde el formulario
    const {
        nombre,
        apellido,
        email,
        semanasUso,
        finalPrice,
        departamento,
        direccion,
        calle,
        depto,
        telefono,
        tipoDocumento,
        numeroDocumento,
        emailDueño,
    } = req.body;

    // Configura el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        // service: 'gmail', // o el servicio que utilices
        auth: {
            user: process.env.EMAIL_USER, // debe estar definido en tus variables de entorno
            pass: process.env.EMAIL_PASS, // igual, la contraseña o token de aplicación
        },
    });

    // Configura el contenido del email
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        // to: 'aguspfarhat02@gmail.com', // Reemplaza con el email del dueño de la publicación
        to: emailDueño,
        subject: 'Nueva solicitud de alquiler',
        text: `
      Se ha recibido una nueva solicitud de alquiler:
      
      Nombre: ${nombre} ${apellido}
      Email: ${email}
      Semanas de uso: ${semanasUso}
      Precio Final: $${finalPrice}
      Localidad: ${departamento}
      Dirección: ${direccion}
      N° de calle: ${calle}
      N° de departamento: ${depto}
      Teléfono: ${telefono}
      Tipo de documento: ${tipoDocumento}
      Número de documento: ${numeroDocumento}
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar email:', error);
        return res.status(500).json({ error: 'Error al enviar email' });
    }
}
