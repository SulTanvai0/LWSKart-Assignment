import { auth } from "@/auth";
import LogIn from "@/components/Auth/LogIn";
import { getDictionary } from "../../disctionaries";

export const metadata = {
  title: "Sing In - LWsKart",
  openGraph: {
    images: [
      {
        url: `https://lws-assignment-m-8.vercel.app/api/og?title=LWsKart - Sing In `,
        width: 1200,
        height: 630,
      },
    ],
  },
};

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
