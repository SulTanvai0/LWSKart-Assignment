import Register from "@/components/Auth/Register";
import { getDictionary } from "../../disctionaries";

const RegisterPage = async ({ params }) => {
  const { login, register } = await getDictionary(params.lang);

  return <Register names={register} lang={params.lang} />;
};

export default RegisterPage;
