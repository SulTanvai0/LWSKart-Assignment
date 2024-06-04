
import Link from "next/link";

const Breadcrumb = () => {
    return (
        <div className="container py-4 flex items-center gap-3">
            <Link href="/" className="text-primary text-base">
                <div className="text-white"></div>
            </Link>
            <span className="text-sm text-gray-400">

            </span>
            <p className="text-gray-600 font-medium">Shop</p>
        </div>
    );
};


export default Breadcrumb;
