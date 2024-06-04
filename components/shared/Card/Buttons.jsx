"use client"
import { useLanguageClient } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import AddToWishListButton from "./AddToWishListButton";


const Buttons = ({ productId, userId }) => {

    const lang = useLanguageClient();

    return (
        <>
            <Link
                href={`/${lang}/productDetails/${productId}`}
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                title="view product"
            >
                <Image src="/icons-svg/magnifying.svg" width={18} height={8} alt="magnifying" />
            </Link>


            <AddToWishListButton productId={productId} userId={userId} />
        </>
    );
};

export default Buttons;