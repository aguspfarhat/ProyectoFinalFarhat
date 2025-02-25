import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/mongodb';
// import bcrypt from 'bcrypt';
import { JWT } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';



console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('MONGO_URL:', process.env.MONGO_URL);

const authOptions: NextAuthOptions = {
    providers: [

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                console.log('Credentials:', credentials);
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                // Conectar a la base de datos
                const { db } = await connectToDatabase();

                // Buscar al usuario por email
                const user = await db.collection('Users').findOne({ email: credentials.email });
                console.log('User found in DB:', user);
                if (!user) {
                    throw new Error('User not found');
                }

                // Validar la contraseña
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                console.log('Is password valid:', isPasswordValid);
                if (!isPasswordValid) {
                    throw new Error('Invalid credentials');
                }

                // Retornar el usuario si las credenciales son válidas
                return { id: user._id.toString(), name: user.name, email: user.email };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || 'secret',
    callbacks: {
        async session({ session, token }: { session: any; token: JWT, }) {
            console.log('Callback session - token:', token);
            console.log('Callback session - session:', session);
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.userName = token.userName
            session.user.fotoPerfil = token.fotoPerfil;


            if (token?.id) {
                session.user = {
                    ...session.user,
                    id: token.id,
                };
            }
            return session;
        },
        async jwt({ token, user }: { token: JWT; user?: any }) {
            console.log('Callback jwt - user:', user);
            console.log('Callback jwt - token:', token);

            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.userName = user.userName
                token.fotoPerfil = user.fotoPerfil || "/default-avatar.png";
            }
            return token;
        },
    },
    debug: true,
};

console.log('NextAuth configuration loaded');
export { authOptions };
export default NextAuth(authOptions);
