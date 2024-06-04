import { auth } from "@/auth";
import Link from "next/link";

const SingInOut = async ({ names }) => {
    const session = await auth()


    if (session === null) {
        return <Link href="/authentication/login" className="text-gray-200 hover:text-white transition">{names.login}</Link>
    }

    return (
        <Link href="/authentication/singOut" className="text-gray-200 hover:text-white transition">{names.logout}</Link>
    );
};

export default SingInOut; 