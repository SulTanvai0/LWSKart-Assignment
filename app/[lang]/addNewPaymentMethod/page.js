import { auth } from "@/auth";
import AddPaymentMethodForm from "@/components/Payment/AddPaymentMethodForm";
import { getUserByEmail } from "@/DataBase/quires";

export const metadata = {
  title: "Add your payment method",
};

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect(`/authentication/login`);
  }
  let user = null;

  if (session) {
    user = await getUserByEmail(session?.user?.email);
  }

  return (
    <div className="p-10">
      <AddPaymentMethodForm userId={user?._id} />
    </div>
  );
};

export default page;
