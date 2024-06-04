import { auth } from "@/auth";
import Breadcrumb from "@/components/Shop/Breadcrumb";
import Shop from "@/components/Shop/Shop";
import { getUserByEmail } from "@/DataBase/quires";
import { getDictionary } from "../disctionaries";

const ShopPage = async ({ params: { lang } }) => {
  const session = await auth();
  let user = null;
  if (session) {
    user = await getUserByEmail(session?.user?.email);
  }

  const { sidebar, category } = await getDictionary(lang);

  return (
    <>
      <Breadcrumb />
      <Shop user={user} names={{ sidebar, category }} />
    </>
  );
};

export default ShopPage;
