// import "./UI/globals.css";
// import Navbar from './componentes/Navbar';
// import { montserrat } from "./componentes/fonts";
// import Footer from "./componentes/footer";


// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={`${montserrat.className} antialiased`}>
//         <Navbar /> {/* Navbar estará disponible en todas las páginas */}
//         {children}  {/* Aquí se renderiza el contenido de cada página */}
//         <Footer />
//       </body>
//     </html >
//   );
// }
// 'use client';
// import "./UI/globals.css";
// import Navbar from './componentes/Navbar';
// import { montserrat } from "./componentes/fonts";
// import Footer from "./componentes/footer";
// import { usePathname } from 'next/navigation';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   // Definir la(s) página(s) donde no deseas mostrar el navbar
//   const hideNavbarOnPages = ['./Publicaciones/form/page.tsx'];

//   return (
//     <html lang="en">
//       <body className={`${montserrat.className} antialiased`}>
//         {/* Muestra el Navbar solo si no estamos en las páginas definidas en hideNavbarOnPages */}
//         {!hideNavbarOnPages.includes(pathname) && <Navbar />}

//         {children}  {/* Aquí se renderiza el contenido de cada página */}

//         <Footer />
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
  const hideNavbarOnPages = ['./Publicaciones/page'];

  // Verifica si la ruta actual está en el array
  const shouldHideNavbar = hideNavbarOnPages.includes(pathname);

  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        {/* Mostrar el Navbar solo si la ruta actual no está en hideNavbarOnPages */}
        {!shouldHideNavbar && <Navbar />}
        
        {children}  {/* Aquí se renderiza el contenido de cada página */}

        <Footer />
      </body>
    </html>
  );
}








