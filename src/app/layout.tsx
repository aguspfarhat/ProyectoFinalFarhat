// 'use client';
// import "./UI/globals.css";
// import Navbar from './componentes/Navbar';
// import { montserrat } from "./componentes/fonts";
// import Footer from "./componentes/footer";
// import { usePathname } from 'next/navigation';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   // Define aquí las rutas donde no quieres que se muestre el Navbar
//   const hideNavbarOnPages = ['./Login'];

//   // Verifica si la ruta actual está en el array
//   const shouldHideNavbar = hideNavbarOnPages.includes(pathname);

//   return (
//     // <html lang="en">
//     //   <body className={`${montserrat.className} antialiased`}>
//     //     {/* Mostrar el Navbar solo si la ruta actual no está en hideNavbarOnPages */}
//     //     {!shouldHideNavbar && <Navbar />}

//     //     {children}  {/* Aquí se renderiza el contenido de cada página */}

//     //     <Footer />
//     //   </body>
//     // </html>
//     <html lang="en">
//       <body className={`${montserrat.className} antialiased min-h-screen flex flex-col`}>
//         {/* Mostrar el Navbar solo si la ruta actual no está en hideNavbarOnPages */}
//         {!shouldHideNavbar && <Navbar />}

//         <div className="flex-grow">
//           {children}  {/* Aquí se renderiza el contenido de cada página */}
//         </div>

//         <Footer />  {/* Footer siempre al final de la página */}
//       </body>
//     </html>
//   );
// }

'use client';
import "./UI/globals.css";
import Navbar from './componentes/Navbar';
import { montserrat } from "./componentes/fonts";
import Footer from "./componentes/footer";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define aquí las rutas donde no quieres que se muestre el Navbar
  const hideNavbarOnPages = ['/Login', '/Signup']; // Rutas en las que no quieres mostrar el Navbar

  // Verifica si la ruta actual incluye alguna de las rutas donde no debe aparecer el Navbar
  const shouldHideNavbar = hideNavbarOnPages.some(route => pathname.includes(route));

  return (
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








