import Register from "@/components/Auth/Register";
import { getDictionary } from "../../disctionaries";

export const metadata = {
  title: "Sing Up - LWsKart",
  description: "Sing up with Lws to get exciting offers",
  openGraph: {
    images: [
      {
        url: `https://lws-assignment-m-8.vercel.app/api/og?title=LWsKart - Sing up `,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const RegisterPage = async ({ params }) => {
  const { login, register } = await getDictionary(params.lang);

  return <Register names={register} lang={params.lang} />;
};

export default RegisterPage;
