'use client';
import "./UI/globals.css";
import Navbar from './componentes/Navbar';
import { montserrat } from "./componentes/fonts";
import Footer from "./componentes/footer";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define aquí las rutas donde no quieres que se muestre el Navbar
  const hideNavbarOnPages = ['./Publicaciones/page'];

  // Verifica si la ruta actual está en el array
  const shouldHideNavbar = hideNavbarOnPages.includes(pathname);

  return (
    // <html lang="en">
    //   <body className={`${montserrat.className} antialiased`}>
    //     {/* Mostrar el Navbar solo si la ruta actual no está en hideNavbarOnPages */}
    //     {!shouldHideNavbar && <Navbar />}

    //     {children}  {/* Aquí se renderiza el contenido de cada página */}

    //     <Footer />
    //   </body>
    // </html>
    <html lang="en">
      <body className={`${montserrat.className} antialiased min-h-screen flex flex-col`}>
        {/* Mostrar el Navbar solo si la ruta actual no está en hideNavbarOnPages */}
        {!shouldHideNavbar && <Navbar />}

        <div className="flex-grow">
          {children}  {/* Aquí se renderiza el contenido de cada página */}
        </div>

        <Footer />  {/* Footer siempre al final de la página */}
      </body>
    </html>
  );
}









