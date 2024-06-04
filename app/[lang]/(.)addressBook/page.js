import { auth } from "@/auth";
import { getUserByEmail } from "@/DataBase/quires";
import { redirect } from "next/dist/server/api-utils";
import InterCept from "./InterCept";

export const metadata = {
  title: "Add  Address",
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

  return <InterCept user={user} />;
};

export default page;
