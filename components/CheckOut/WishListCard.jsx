"use client"
import { useLanguageClient } from "@/contexts/LanguageContext";
import { getProductByID } from "@/DataBase/quires";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSvg from "../LoadingSvg";
import AddToCartBtn from "../shared/Card/AddToCartBtn";
import RemoveFromWisList from "./RemoveFromWisList";

const WishListCard = ({ wishList, userId }) => {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Set loading to true initially

    const lang = useLanguageClient();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true); // Set loading to true at the start of fetching
                const request = await getProductByID(wishList?.productId);
                setProduct(request);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching is complete
            }
        };

        if (wishList) {
            fetchProduct();
        }
    }, [wishList]);

    if (loading) {
        return <LoadingSvg />;
    }

    if (!product) {
        return null;
    }

    const availability = lang === "bn" ? "উপলব্ধতা" : "Availability";

    return (
        <div className="mx-auto space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded animate-fadeIn">
                <div className="w-28">
                    <Image src={product?.photosArray[0]} alt="product" className="w-full" width={300} height={100} />
                </div>
                <div className="w-1/3">
                    <h2 className="text-gray-800 text-xl font-medium uppercase">
                        {product?.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {availability}: <span className="text-green-600">{product?.availability}</span>
                    </p>
                </div>
                <div className="text-primary text-lg font-semibold">${product?.price}</div>
                <div><AddToCartBtn quantity={product?.inStock} productId={product?._id} userId={userId} /></div>
                <RemoveFromWisList productId={wishList?._id} />
            </div>
        </div>
    );
};

export default WishListCard;
