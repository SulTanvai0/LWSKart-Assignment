"use client"

import { useLanguageClient } from "@/contexts/LanguageContext";
import { deleteFromWishList } from "@/DataBase/quires";
import { GetCartDataByPRoductID } from "@/DataBase/quires/dataQuires";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export const handelAddToCart = async (productId, userId, router) => {
    if (!userId) {
        localStorage.setItem("redirectTo", "/cart");
        localStorage.setItem("LocalProductId", productId);
        toast('for add product in cart List please Login', {
            icon: '🙋',
        });
        return router.push('/authentication/login');
    }


    const alreadyAdded = await GetCartDataByPRoductID(productId);

    if (alreadyAdded?.productId) {
        return toast('Product already in cart!', {
            icon: '🛒',
        });
    }

    const addToCartListPromise = fetch(`${process.env.LWSKART_URl}/api/cartListControl`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
    }).then(async response => {
        const res = await response.json();

        if (res?.status === 200) {
            const getWishRes = await fetch(`${process.env.LWSKART_URl}/api/wishListControl?Id=${productId}`);
            const wishRes = await getWishRes.json();

            if (wishRes?.data) {
                await deleteFromWishList(wishRes?.data[0]?._id);
            }

            return res;
        } else {
            throw new Error('Failed to add product to cart');
        }
    });

    toast.promise(addToCartListPromise, {
        loading: 'Adding to cart list...',
        success: 'Product added to cart successfully!',
        error: 'An error occurred. Please try again.',
    }).then(() => {
        revalidateTag("user");
        revalidateTag("cart");
    }).catch(error => {
        console.error('Error adding product to cart:', error);
    });
};


const AddToCartBtn = ({ productId, userId, quantity }) => {
    const router = useRouter()

    const lang = useLanguageClient();

    const buttonText = {
        en: quantity === 0 ? 'Out of stock' : 'Add to cart',
        bn: quantity === 0 ? 'স্টক শেষ' : 'কার্টে যুক্ত করুন'
    };


    return (
        <>
            <button
                onClick={() => handelAddToCart(productId, userId, router)}
                className={`block w-full py-1 text-center text-white bg-primary border border-primary rounded-b transition ${quantity === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-transparent hover:text-primary'
                    }`}
                disabled={quantity === 0}
            >
                {buttonText[lang]}
            </button>

        </>
    );
};

export default AddToCartBtn; 