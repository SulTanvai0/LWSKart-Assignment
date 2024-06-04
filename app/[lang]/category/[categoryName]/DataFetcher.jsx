import CategorizedList from "@/components/Category/CategoryList";

const DataFetcher = async ({ catName }) => {
  const fetchData = await fetch(
    `${process.env.LWSKART_URl}/api/getProductsByFiledName&FiledValue?filedname=category&filedvalue=${catName}`
  );

  const products = await fetchData.json();
  return (
    <>
      <CategorizedList category={catName} Products={products?.data} />
    </>
  );
};

export default DataFetcher;