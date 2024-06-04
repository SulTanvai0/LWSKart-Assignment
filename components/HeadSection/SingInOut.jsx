import { auth } from "@/auth";
import Link from "next/link";

const SingInOut = async ({ names, lang }) => {
    const session = await auth()


    if (session === null) {
        return <Link href={`${lang}/authentication/login`} className="text-gray-200 hover:text-white transition">{names.login}</Link>
    }

    return (
        <Link href={`${lang}/authentication/singOut`} className="text-gray-200 hover:text-white transition">{names.logout}</Link>
    );
};

export default SingInOut; 