"use client";
/* eslint-disable react/no-unescaped-entities */
import { doLogin } from "@/actions";
import Loading from "@/app/loading";
import { getUserByEmail } from "@/DataBase/quires";
import { sendEmail } from "@/DataBase/quires/sendEmail";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SocialLogIn from "./SocialLogIn";

const LogIn = ({ user, names, lang }) => {
    const [error, setError] = useState("");
    const router = useRouter();
    const [isNavigate, setIsNavigate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const redirectFrom = localStorage.getItem("redirectTo");
        if (redirectFrom) {
            setIsNavigate(redirectFrom);
        }
    }, [])

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get("email");
            const loginPromise = doLogin(formData);

            toast.promise(loginPromise, {
                loading: 'Logging in...',
                success: 'Logged in successfully!',
                error: 'Failed to log in',
            });

            const response = await loginPromise;

            if (response?.error) {
                setError(response.error);
            } else {
                const htmlBody = `
                    <div>
                        <p>Dear User,</p>
                        <p>Your account has been logged in successfully.</p>
                        <p>If you did not perform this login, please contact our support immediately.</p>
                        <br>
                        <p>Best regards,</p>
                        <p>Your Company</p>
                    </div>
                `;
                const subject = "Notification about Login";
                const message = "Your account has been logged in";

                await sendEmail(email, htmlBody, subject, message);
                toast.promise(loginPromise, {
                    loading: 'Logging in...',
                    success: 'Logged in successfully!',
                    error: 'Failed to log in',
                });

                if (isNavigate) {
                    const user = await getUserByEmail(email);
                    localStorage.setItem("userIdLocal", user?._id)
                    setLoading(true)
                    localStorage.clear();
                    return router.push(isNavigate);
                }

                setLoading(true)
                router.refresh("/");
                router.push("/");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    if (user) {
        router.push("/");
        return null;
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="contain py-16">
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl uppercase font-medium mb-1">{names?.login}</h2>
                <p className="text-gray-600 mb-6 text-sm">
                    {names?.message}
                </p>
                <form onSubmit={onSubmit} method="post">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="email" className="text-gray-600 mb-2 block">{names?.emailLabel}</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder={names?.emailPlaceholder}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-gray-600 mb-2 block">{names?.passwordLabel}</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder={names?.passwordPlaceholder}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-gray-600 ml-3 cursor-pointer">{names?.rememberMe}</label>
                        </div>
                        <Link href="#" className="text-primary">{names?.forgotPassword}</Link>
                    </div>
                    {error && (
                        <div className="text-xl text-red-500 text-center">{names?.error}</div>
                    )}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                            {names?.loginButton}
                        </button>
                    </div>
                </form>

                {/* login with */}
                <div className="mt-6 flex justify-center relative">
                    <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">{names?.orLoginWith}</div>
                    <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                </div>
                <SocialLogIn />

                <p className="mt-4 text-center text-gray-600">{names?.noAccountMessage} <Link href={`/${lang}/authentication/register`} className="text-primary">{names?.registerNow}</Link></p>
            </div>
        </div>
    );
};

export default LogIn;
