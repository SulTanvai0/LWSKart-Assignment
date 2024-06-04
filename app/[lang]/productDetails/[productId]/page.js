import { auth } from "@/auth";
import ProductDetails from "@/components/Products/ProductDetails";
import { getProductByID, getUserByEmail } from "@/DataBase/quires";

export async function generateMetadata({ params }, parent) {
  const product = await getProductByID(params.productId);

  return {
    title: `LWSKart - ${product?.name}`,
    description: product?.description,
    openGraph: {
      title: `LWSKart - ${product?.name}`,
      images: product?.photosArray,
    },
  };
}

const productDetailsPage = async ({ params: { productId, lang } }) => {
  const session = await auth();
  let user = null;
  if (session?.user) {
    user = await getUserByEmail(session.user.email);
  }
  const product = await getProductByID(productId);

  return <ProductDetails product={product} user={user} lang={lang} />;
};

export default productDetailsPage;
