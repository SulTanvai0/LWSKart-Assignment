import { auth } from "@/auth";
import Invoice from "@/components/Invoice/Invoice";
import { getInvoiceById, getUserByEmail } from "@/DataBase/quires";
import { redirect } from "next/navigation";
import { getDictionary } from "../../disctionaries";

const Page = async ({ params: { invoiceId, lang } }) => {
  const session = await auth();

  if (!session?.user) {
    return redirect(`/authentication/login`);
  }
  const user = await getUserByEmail(session?.user?.email);
  const invoice = await getInvoiceById(invoiceId);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  const { invoiceData } = await getDictionary(lang);

  return (
    <>
      <Invoice invoice={invoice} invoiceData={invoiceData} />
    </>
  );
};

export default Page;
