"use client"
import { addToWishListData } from "@/DataBase/quires";
import { GetCartDataByPRoductID, GetWishListDataByPRoductID } from "@/DataBase/quires/dataQuires";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export async function handleAddToWishList(userId, productId, router) {

    if (!userId) {
        localStorage.setItem("redirectTo", "/wishList");
        localStorage.setItem("LocalProductId", productId);

        toast('for add to wish List please Login', {
            icon: '🙋',
        });
        return router.push("/authentication/login");
    }

    const alreadyAddedInWishList = await GetWishListDataByPRoductID(productId);

    if (alreadyAddedInWishList?.productId) {
        return toast('Product already in wishList!', {
            icon: '❤️',
        });
    }

    const alreadyAddedCart = await GetCartDataByPRoductID(productId);

    if (alreadyAddedCart?.productId) {
        return toast('Product already in cart!', {
            icon: '🛒',
        });
    }


    try {
        const addToWishListPromise = addToWishListData(userId, productId);
        toast.promise(addToWishListPromise, {
            loading: 'Adding to wish list...',
            success: 'Added to wish list!',
            error: 'An error occurred. Please try again.',
        });

        const result = await addToWishListPromise;
        return result;
    } catch (error) {
        console.error('Error adding product to wish list:', error);
    }
}

const AddToWishListButton = ({ productId, userId, }) => {
    const router = useRouter();
    return (
        <>
            <button
                onClick={() => handleAddToWishList(userId, productId, router)}
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                title="add to wishlist"
            >
                <Image src="/icons-svg/wish.svg" width={18} height={8} alt="add to wish list" />
            </button>
        </>
    );
};




export default AddToWishListButton;

