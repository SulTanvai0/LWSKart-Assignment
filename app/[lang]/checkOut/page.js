import { auth } from "@/auth";
import CheckOut from "@/components/CheckOut/CheckOut";
import { redirect } from "next/navigation";
import { getDictionary } from "../disctionaries";
export const metadata = {
  title: "Check Out- LWsKart",
};

const CheckOutPage = async ({ params: { lang } }) => {
  const session = await auth();

  if (session === null) {
    return redirect("/");
  }

  const { checkout } = await getDictionary(lang);

  return <CheckOut lang={lang} names={checkout} />;
};

export default CheckOutPage;
