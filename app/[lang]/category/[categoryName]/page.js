import Loading from "@/app/loading";
import { Suspense } from "react";
import DataFetcher from "./DataFetcher";

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
