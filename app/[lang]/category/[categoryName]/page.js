import Loading from "@/app/loading";
import { Suspense } from "react";
import DataFetcher from "./DataFetcher";
const common = `https://lws-kart-assignment.vercel.app/assets/images/category/category`;
const photosObj = {
  BedRoom: `${common}-1.jpg`,
  Mattress: `${common}-2.jpg`,
  Outdoor: `${common}-3.jpg`,
  Sofa: `${common}-4.jpg`,
  LivingRoom: `${common}-5.jpg`,
  Kitchen: `${common}-6.jpg`,
};
export async function generateMetadata({ params: { categoryName }, parent }) {
  const catName = decodeURI(categoryName);
  return {
    title: catName,

    openGraph: {
      title: `LWSKart - ${catName}`,
      images: photosObj[categoryName],
    },
  };
}

const page = ({ params: { categoryName } }) => {
  const catName = decodeURI(categoryName);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <DataFetcher catName={catName} />
      </Suspense>
    </>
  );
};

export default page;
