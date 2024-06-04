import Ads from "@/components/Ads/Ads";
import Category from "@/components/Category/Category";
import Features from "@/components/HeroSection/Features";
import HerSection from "@/components/HeroSection/HerSection";
import Arrival from "@/components/Products/Arrival";
import Trending from "@/components/Products/Trending";

export const metadata = {
  openGraph: {
    images:
      "https://lws-kart-assignment.vercel.app/assets/images/banner-bg.jpg",
  },
};

export default function Homepage({ params: { lang } }) {
  return (
    <>
      <HerSection lang={lang} />
      {console.log("Hero section loaded")}
      <Features lang={lang} />
      {console.log("Features section loaded")}
      <Category lang={lang} />
      {console.log("Arrival section loaded")}
      <Arrival lang={lang} />
      <Ads />
      <Trending lang={lang} />
      {console.log("Trending section loaded")}
    </>
  );
}
