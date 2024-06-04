import ContactUs from "./ContactUs";
export const metadata = {
  title: "Contacts information LWsKart",
  openGraph: {
    images: [
      {
        url: `https://lws-assignment-m-8.vercel.app/api/og?title=LWsKart - Contact Us`,
        width: 1200,
        height: 630,
      },
    ],
  },
};
const ContactPage = () => {
  return (
    <>
      <ContactUs />
    </>
  );
};

export default ContactPage;
