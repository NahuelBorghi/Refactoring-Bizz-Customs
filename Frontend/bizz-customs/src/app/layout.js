import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/header";
import Navbar from "./components/Navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <Navbar />
        <main>{children}</main>

        <footer>
          {/* Contenido del pie de página, como información de contacto, enlaces, etc. */}
          <p>&copy; 2023 Mi Página Web</p>
        </footer>
      </body>
    </html>
  );
}
