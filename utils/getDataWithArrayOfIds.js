import { getProductByID } from "@/DataBase/quires";

export const getDataWithArrayOfIds = async (Ids) => {
  const productIds = [...Ids];

  const products = await Promise.all(
    productIds.map(async (id) => {
      const req = await getProductByID(id);
      return req;
    })
  );

  return products;
};
