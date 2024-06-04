import { auth } from "@/auth";
import CartList from "@/components/CheckOut/CartList";
import { getCartListData, getUserByEmail } from "@/DataBase/quires";
import { redirect } from "next/navigation";

const CartListPage = async ({ params: { userId } }) => {
  const session = await auth();

  if (!session?.user) {
    return redirect(`/authentication/login`);
  }
  const user = await getUserByEmail(session?.user?.email);

  const cartList = await getCartListData(user?._id);

  return (
    <>
      <CartList cartList={cartList} userId={user?._id} />
    </>
  );
};

export default CartListPage;
