'use client';

import { doSignOut } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignOut = () => {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async (event) => {
        event.preventDefault();
        setIsSigningOut(true);

        try {
            await doSignOut();
            router.replace('/');
        } catch (error) {
            console.error('Failed to sign out:', error);
            setIsSigningOut(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSignOut} className="p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Are you sure you want to sign out?
                </h2>
                <button
                    type="submit"
                    className="w-full py-2 text-center text-white bg-red-600 rounded uppercase font-medium text-sm hover:bg-red-500 transition"
                    disabled={isSigningOut}
                >
                    {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                </button>
            </form>
        </div>
    );
};

export default SignOut;
