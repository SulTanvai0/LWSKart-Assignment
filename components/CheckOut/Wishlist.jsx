"use client"
import { useLanguageClient } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { handleAddToWishList } from "../shared/Card/AddToWishListButton";
import WishListCard from "./WishListCard";

const Wishlist = ({ wishList, userId }) => {
    useEffect(() => {
        const productIdLocal = localStorage.getItem("LocalProductId");
        const userIdLocal = localStorage.getItem("userIdLocal");

        const addToWishList = async () => {
            if (productIdLocal && userIdLocal) {
                await handleAddToWishList(userIdLocal, productIdLocal);
                localStorage.removeItem("LocalProductId");
                localStorage.removeItem("userIdLocal");
            }
        };
        addToWishList();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const translations = {
        en: {
            home: "Home",
            wishlistEmpty: "No products in the wishlist",
            continueShopping: "Continue Shopping",
        },
        bn: {
            home: "বাড়ি",
            wishlistEmpty: "উইশলিস্টে কোন পণ্য নেই",
            continueShopping: "কেনাকাটা চালিয়ে যান",
        }
    };

    const lang = useLanguageClient();
    const t = translations[lang];

    return (
        <>
            <div className="container py-4 flex items-center gap-3">
                <Link href="/" className="text-primary text-base">
                    <Image src="/icons-svg/home.svg" width={28} height={14} alt="back to home" />
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">{t.home}</p>
            </div>

            <div className="container mx-auto flex flex-col gap-6 pt-4 pb-16">
                {wishList.length > 0 && wishList.map((item) => (
                    <div key={item._id} className="w-[70%] mx-auto">
                        <WishListCard wishList={item} userId={userId} />
                    </div>
                ))}

                {wishList.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center bg-gray-100 p-6 rounded-md shadow-md mx-auto space-y-4 max-w-6xl">
                        <p className="mb-4 text-lg font-semibold text-gray-700">
                            {t.wishlistEmpty}
                        </p>
                        <Link href="/shop" className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                            {t.continueShopping}
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Wishlist;
