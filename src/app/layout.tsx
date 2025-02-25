'use client';
import { SessionProvider } from 'next-auth/react';
import "./UI/globals.css";
import Navbar from './componentes/Navbar';
import { montserrat } from "./componentes/fonts";
import Footer from "./componentes/footer";
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define las rutas donde no quieres que se muestre el Navbar
  const hideNavbarOnPages = ['/Login', '/Signup'];

  // Maneja el caso en el que pathname sea null
  const shouldHideNavbar = pathname ? hideNavbarOnPages.some(route => pathname.includes(route)) : false;

  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased min-h-screen flex flex-col`}>
        <SessionProvider>
          {/* Mostrar el Navbar solo si la ruta actual no está en hideNavbarOnPages */}
          {!shouldHideNavbar && <Navbar />}

          <div className="flex-grow">
            {children} {/* Aquí se renderiza el contenido de cada página */}
          </div>

          <Footer /> {/* Footer siempre al final de la página */}
        </SessionProvider>
      </body>
    </html>
  );
}









