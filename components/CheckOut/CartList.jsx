'use client'
import Loading from "@/app/loading";
import { useLanguageClient } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handelAddToCart } from "../shared/Card/AddToCartBtn";
import CartListCard from "./CartListCard";

const translations = {
    en: {
        home: "Home",
        noProducts: "No products in the cart",
        continueShopping: "Continue Shopping",
        checkoutSummary: "Checkout Summary",
        selectedProducts: "You have selected",
        productForCheckout: "product(s) for checkout.",
        proceedToCheckout: "Proceed to Checkout",
    },
    bn: {
        home: "বাড়ি",
        noProducts: "কার্টে কোন পণ্য নেই",
        continueShopping: "কেনাকাটা চালিয়ে যান",
        checkoutSummary: "চেকআউট সংক্ষিপ্তসার",
        selectedProducts: "আপনি নির্বাচন করেছেন",
        productForCheckout: "চেকআউটের জন্য পণ্য।",
        proceedToCheckout: "চেকআউট করতে এগিয়ে যান",
    }
};

const CartList = ({ cartList, userId }) => {
    const router = useRouter();
    const [checkProducts, setCheckProducts] = useState([]);
    const [cartListIds, setCartListIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const lang = useLanguageClient();
    const t = translations[lang]; // Get the translations based on the current language

    const saveCheckOutItems = () => {
        localStorage.setItem("productsIds", JSON.stringify(checkProducts));
        localStorage.setItem("cartListIds", JSON.stringify(cartListIds));
        setLoading(true);
        router.push(`/${lang}/checkOut`);
    }

    useEffect(() => {
        const productIdLocal = localStorage.getItem("LocalProductId");
        const userIdLocal = localStorage.getItem("userIdLocal");

        const addToCart = async () => {
            if (productIdLocal && userIdLocal) {
                await handelAddToCart(productIdLocal, userIdLocal);
                localStorage.removeItem("LocalProductId");
                localStorage.removeItem("userIdLocal");
            }
        }
        addToCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <div className="flex justify-center"><Loading /></div>
    }

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

            <div className="container flex flex-col items-center pt-4 pb-16">
                {cartList.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center bg-gray-100 p-6 rounded-md shadow-md mx-auto space-y-4 max-w-6xl">
                        <p className="mb-4 text-lg font-semibold text-gray-700">
                            {t.noProducts}
                        </p>
                        <Link href="/shop" className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                            {t.continueShopping}
                        </Link>
                    </div>
                )}
                <>
                    <div className="container mx-auto flex flex-col items-center w-full max-w-3xl space-y-6">
                        {cartList.map((item) => (
                            <div key={item._id} className="w-[70%] mx-auto">
                                <CartListCard
                                    lang={lang}
                                    item={item}
                                    userId={userId}
                                    checkProducts={checkProducts}
                                    setCheckProducts={setCheckProducts}
                                    cartListIds={cartListIds}
                                    setCartListIds={setCartListIds}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl mt-6">
                        <h2 className="text-2xl font-semibold mb-4">{t.checkoutSummary}</h2>
                        <div className="flex justify-between items-center">
                            <p className="text-lg mb-2">
                                {t.selectedProducts} <span className="font-bold">{checkProducts.length}</span> {t.productForCheckout}
                            </p>
                            <button
                                disabled={checkProducts.length === 0}
                                onClick={saveCheckOutItems}
                                className={`py-2 px-4 rounded transition duration-300 
                                    ${checkProducts.length > 0 ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                            >
                                {t.proceedToCheckout}
                            </button>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
};

export default CartList;
