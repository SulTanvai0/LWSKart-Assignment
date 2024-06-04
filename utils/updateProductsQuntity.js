import { updateProductQuantity } from "@/DataBase/quires";

export const updateProductsData = async (productArray) => {
  const products = [...productArray];

  const updateResult = await Promise.all(
    products.map(async (product) => {
      const req = await updateProductQuantity(product);
      return req;
    })
  );

  return updateResult;
};
