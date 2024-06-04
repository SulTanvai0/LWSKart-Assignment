import { auth } from "@/auth";
import LogIn from "@/components/Auth/LogIn";
import { getDictionary } from "../../disctionaries";

const LogInPage = async ({ params: { lang } }) => {
  const session = await auth();
  const { login } = await getDictionary(lang);

  return (
    <>
      <LogIn user={session?.user} lang={lang} names={login} />
    </>
  );
};

export default LogInPage;
