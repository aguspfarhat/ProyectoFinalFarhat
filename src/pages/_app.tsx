import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import DetallePublicacion from "./publicacion/[id]";


export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <DetallePublicacion />
            {/* <Component {...pageProps} /> */}
        </SessionProvider>
    );
}
