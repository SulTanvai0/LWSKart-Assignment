import Footer from "@/components/Footer/Footer";
import Header from "@/components/HeadSection/Header";
import Nav from "@/components/HeadSection/Nav";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { dbConnect } from "@/DataBase/connectMongo";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children, params: { lang } }) {
  await dbConnect();

  return (
    <>
      <LanguageProvider lang={lang}>
        <Header lang={lang} />
        {console.log("Heading section loaded")}
        <Nav lang={lang} />
        {console.log("Nav section loaded")}
        <div id="modal-root-content" />
        {children}
        <Footer lang={lang} />
        {console.log("Footer section loaded")}
      </LanguageProvider>
    </>
  );
}
