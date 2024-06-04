"use client"

import { sendEmail } from "@/DataBase/quires/sendEmail";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SocialLogIn from "./SocialLogIn";

const Register = ({ names, lang }) => {
    const [error, setError] = useState("");
    const router = useRouter();


    async function onSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const fullName = formData.get('fullName');
            const email = formData.get('email');
            const password = formData.get('password');
            const confirm = formData.get('confirm');

            if (password !== confirm) {
                setError("Both passwords do not match");
                return;
            }

            const res = await fetch("/api/auth/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                }),
            });

            if (res.status === 200) {

                const subject = "Welcome to LWSKart!";
                const message = `Hi ${fullName}, Welcome to LWSKart! Your account has been created successfully.`;
                const htmlBody = `<div>Hi ${fullName},</div>
                <div>Welcome to LWSKart! Your account has been created successfully.</div>`;

                await sendEmail(email, htmlBody, subject, message);

                router.push(`/${lang}/authentication/login`);
            } else {
                const data = await res.json();
                setError(data.error || "An error occurred while creating the account.");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="contain py-16">
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl uppercase font-medium mb-1">{names.createAccount}</h2>
                <p className="text-gray-600 mb-6 text-sm">
                    {names.message}
                </p>
                <form onSubmit={onSubmit} method="post">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="name" className="text-gray-600 mb-2 block">{names.fullNameLabel}</label>
                            <input
                                type="text"
                                name="fullName"
                                id="name"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder={names.fullNamePlaceholder}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-gray-600 mb-2 block">{names.emailLabel}</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder={names.emailPlaceholder}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-gray-600 mb-2 block">{names.passwordLabel}</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder={names.passwordPlaceholder}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm" className="text-gray-600 mb-2 block">{names.confirmPasswordLabel}</label>
                            <input
                                type="password"
                                name="confirm"
                                id="confirm"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder={names.confirmPasswordPlaceholder}
                            />
                        </div>
                    </div>
                    <div className="text-xl text-red-500 text-center">{error && error}</div>
                    <div className="mt-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="agreement"
                                id="agreement"
                                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                            />
                            <label htmlFor="agreement" className="text-gray-600 ml-3 cursor-pointer">
                                {names.agreementText} <a href="#" className="text-primary">{names.termsConditions}</a>
                            </label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                            {names.createAccountButton}
                        </button>
                    </div>
                </form>

                {/* login with */}
                <SocialLogIn />

                {/* ./login with */}

                <p className="mt-4 text-center text-gray-600">
                    {names.alreadyHaveAccountMessage} <Link href={`/${lang}/authentication/login`} className="text-primary">{names.loginNow}</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
