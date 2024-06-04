"use client"
import { getProductByID } from "@/DataBase/quires";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSvg from "../LoadingSvg";
import RemoveFromCart from "./RemoveFromCart";

const CartListCard = ({ item, userId, checkProducts, setCheckProducts, cartListIds, setCartListIds, lang }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        if (item?.productId) {
            const fetchProduct = async () => {
                try {
                    const productData = await getProductByID(item.productId);
                    setProduct(productData);
                    setLoading(false); // Stop loading after data is fetched
                } catch (error) {
                    console.error('Error fetching product:', error);
                    setLoading(false); // Stop loading in case of an error
                }
            };
            fetchProduct();
        }
    }, [item?.productId]);

    if (loading) {
        return <div className="flex justify-center"><LoadingSvg /></div>; // Show loading indicator
    }

    if (!product) {
        return null;
    }

    const handleCheckOut = () => {
        setCheckProducts((prevProducts) => {
            if (prevProducts.includes(item?.productId)) {
                return prevProducts.filter(id => id !== item?.productId);
            } else {
                return [...prevProducts, item?.productId];
            }
        });
        setCartListIds((prevCartIds) => {
            if (prevCartIds.includes(item?._id)) {
                return prevCartIds.filter(id => id !== item?._id);
            } else {
                return [...prevCartIds, item?._id];
            }
        });
    };

    const availability = lang === "bn" ? "উপলব্ধতা" : "Availability";


    return (
        <div className="mx-auto space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded animate-fadeIn">
                <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                        onChange={handleCheckOut}
                        value={item?.productId}
                        checked={checkProducts.includes(item?.productId)}
                    />
                    <div className="w-28">
                        <Image src={product?.photosArray[0]} alt="product image" className="w-full" width={300} height={100} />
                    </div>
                    <div className="w-1/3">
                        <h2 className="text-gray-800 text-xl font-medium uppercase">{product?.name}</h2>
                        <p className="text-gray-500 text-sm">
                            {availability}: <span className="text-green-600">{product?.availability}</span>
                        </p>
                    </div>
                    <div className="text-primary text-lg font-semibold">${product?.price}</div>

                    <RemoveFromCart productId={item?._id} />
                </div>
            </div>
        </div>
    );
};

export default CartListCard;
