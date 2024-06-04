import { doSignInFacebook, doSignInGoogle } from "@/actions";

const SocialLogIn = () => {
    return (
        <div className="mt-4 flex gap-4">
            <form action={doSignInFacebook} method="post" className="w-1/2">
                <button
                    type="submit"
                    className="w-full py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
                >
                    Facebook
                </button>
            </form>
            <form action={doSignInGoogle} method="post" className="w-1/2">
                <button
                    type="submit"
                    className="w-full py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
                >
                    Google
                </button>
            </form>
        </div>
    );
};

export default SocialLogIn;
