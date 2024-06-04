import { auth } from "@/auth";
import Profile from "@/components/profile/Profile";
import {
  getAdressByUserId,
  getPaymentMethods,
  getUserAddress,
  getUserByEmail,
} from "@/DataBase/quires";
import { redirect } from "next/navigation";
import { getDictionary } from "../disctionaries";

const ProfilePage = async ({ params: { userId, lang } }) => {
  const session = await auth();

  if (session === null) {
    return redirect("/");
  }

  const user = await getUserByEmail(session?.user.email);
  const paymentMethods = await getPaymentMethods(user?._id);
  const address = await getUserAddress(user?._id);
  const orders = await getAdressByUserId(user?._id);
  const reversArray = orders.reverse();
  const { profile } = await getDictionary(lang);

  return (
    <>
      <Profile
        user={user}
        orders={reversArray}
        paymentMethods={paymentMethods}
        names={profile}
        address={address}
        lang={lang}
      />
    </>
  );
};

export default ProfilePage;
