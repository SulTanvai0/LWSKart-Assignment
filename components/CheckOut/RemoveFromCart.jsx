'use client';
import { deleteFromCart } from "@/DataBase/quires";
import Image from "next/image";
import toast from "react-hot-toast";

const RemoveFromCart = ({ productId }) => {
    async function handleRemoveFromCart(productId) {
        const removeFromCartPromise = deleteFromCart(productId);

        toast.promise(removeFromCartPromise, {
            loading: 'Removing from cart...',
            success: 'Product removed from cart!',
            error: 'An error occurred. Please try again.',
        });

        try {
            const result = await removeFromCartPromise;
            return result;
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    }

    return (
        <div onClick={() => handleRemoveFromCart(productId)} className="text-gray-600 cursor-pointer hover:text-primary">
            <Image src="/icons-svg/trash.svg" width={28} height={28} alt="remove from cart" />
        </div>
    );
};

export default RemoveFromCart;
