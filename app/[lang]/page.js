import Ads from "@/components/Ads/Ads";
import Category from "@/components/Category/Category";
import Features from "@/components/HeroSection/Features";
import HerSection from "@/components/HeroSection/HerSection";
import Arrival from "@/components/Products/Arrival";
import Trending from "@/components/Products/Trending";

export default async function Homepage({ params: { lang } }) {
  return (
    <>
      <HerSection lang={lang} />
      <Features lang={lang} />
      <Category lang={lang} />
      <Arrival lang={lang} />
      <Ads />
      <Trending lang={lang} />
    </>
  );
}
