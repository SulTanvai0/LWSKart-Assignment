'use client';
import { deleteFromWishList } from "@/DataBase/quires";
import Image from "next/image";
import toast from "react-hot-toast";

const RemoveFromWishList = ({ productId }) => {

    async function handleRemoveFromWishList(productId) {
        const removeFromWishListPromise = deleteFromWishList(productId);

        toast.promise(removeFromWishListPromise, {
            loading: 'Removing from wish list...',
            success: 'Product removed from wish list!',
            error: 'An error occurred. Please try again.',
        });

        try {
            const result = await removeFromWishListPromise;
            return result;
        } catch (error) {
            console.error('Error removing product from wish list:', error);
        }
    }

    return (
        <div onClick={() => handleRemoveFromWishList(productId)} className="text-gray-600 cursor-pointer hover:text-primary">
            <Image src="/icons-svg/trash.svg" width={28} height={28} alt="remove from wishlist" />
        </div>
    );
};

export default RemoveFromWishList;
