import { Roboto } from "next/font/google";
import Nav from "./components/Nav/Nav";
import "./globals.css";
import HomeSideBar from "./components/HomeSideBar/HomeSideBar";
import TopLoadingBar from "./components/TopLoadingBar";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toastify from "./components/Toastify";
import SessionProviders from "./components/SessionProviders";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Full Stack YouTube Clone",
  description: "YouTube Clone by Sairaj Aftab",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <SessionProviders>
          <Toastify />
          <Nav />
          <HomeSideBar />
          <main>{children}</main>
        </SessionProviders>
      </body>
    </html>
  );
}
