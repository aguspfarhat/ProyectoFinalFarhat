import "./UI/globals.css";
import Navbar from './componentes/Navbar';
import { montserrat } from "./componentes/fonts";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Navbar /> {/* Navbar estará disponible en todas las páginas */}
        {children}  {/* Aquí se renderiza el contenido de cada página */}
      </body>
    </html >
  );
}





