"use server";

import { signIn, signOut } from "@/auth";
import EmailTemplate from "@/utils/EmailTemplate";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

export async function doSignOut() {
  await signOut();
}

export async function doSignInGoogle() {
  await signIn("google", { callbackUrl: process.env.LWSKART_URl });
}
export async function doSignInFacebook() {
  await signIn("facebook", { callbackUrl: process.env.LWSKART_URl });
}

export async function doLogin(formData) {
  try {
    await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    revalidatePath("/");
  } catch (er) {
    throw new Error(er);
  }
}

export async function sendinvoice(email, invoice) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const sent = await resend.emails.send({
      from: "'Acme <onboarding@resend.dev>",
      to: email,
      subject: "Invoice",
      react: EmailTemplate({ invoice }),
    });
    console.log("resend", sent);
  } catch (error) {
    console.error("Error sendinvoice:", error);
  }
}
