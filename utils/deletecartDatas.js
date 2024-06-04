import { deleteFromCart } from "@/DataBase/quires";

export const deleteCartsData = async (Ids) => {
  const cartIds = [...Ids];

  const deleteResult = await Promise.all(
    cartIds.map(async (id) => {
      const req = await deleteFromCart(id);
      return req;
    })
  );

  return deleteResult;
};
