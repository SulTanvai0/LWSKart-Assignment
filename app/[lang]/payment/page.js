import { auth } from "@/auth";
import PayPayment from "@/components/Payment/PayPayment";
import { getPaymentMethods, getUserByEmail } from "@/DataBase/quires";
import { redirect } from "next/navigation";
import { getDictionary } from "../disctionaries";

const PaymentPage = async ({ params: { lang } }) => {
  const session = await auth();

  if (session === null) {
    return redirect("/");
  }

  const { payment } = await getDictionary(lang);

  const user = await getUserByEmail(session?.user.email);
  const paymentMethods = await getPaymentMethods(user?._id);

  return (
    <PayPayment
      lang={lang}
      names={payment}
      paymentMethods={paymentMethods}
      user={user}
    />
  );
};

export default PaymentPage;
