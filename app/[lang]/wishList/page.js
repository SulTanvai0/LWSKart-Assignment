import { auth } from "@/auth";
import Wishlist from "@/components/CheckOut/Wishlist";
import { getUserByEmail, getWishListData } from "@/DataBase/quires";
import { redirect } from "next/navigation";

export const metadata = {
  title: "WishList - LWsKart",
};

const WishListPage = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect(`/authentication/login`);
  }

  let user = null;
  let wishList = [];
  if (session) {
    user = await getUserByEmail(session?.user?.email);

    wishList = await getWishListData(user?._id);
  }

  return (
    <>
      <Wishlist wishList={wishList} userId={user?._id} />
    </>
  );
};

export default WishListPage;
