import { auth } from "@/auth";
import AddAddressForm from "@/components/profile/AddAddressForm";
import { getUserByEmail } from "@/DataBase/quires";
import { redirect } from "next/dist/server/api-utils";

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
    <div>
      <AddAddressForm userId={user?._id} />
    </div>
  );
};

export default page;
