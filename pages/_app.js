import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Nunito } from "next/font/google";
const nunito = Nunito({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={nunito.className}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
}
