"use client"

import { auth } from "@/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddToCartBtn from "../shared/Card/AddToCartBtn";
import RemoveFromWisList from "./RemoveFromWisList";

const Card = ({ Id, userId }) => {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/getProductById/${Id}`);
                const result = await res.json();
                setProduct(result.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const session = await auth();
                const userReq = await fetch(`/api/getUserByEmail?email=${session?.user?.email}`);
                const resUser = await userReq.json();
                setUser(resUser.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchProduct();
        fetchUser();
    }, [Id]);

    if (!product || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-auto space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                <div className="w-28">
                    <Image src={product?.photosArray[0]} alt="product 6" className="w-full" width={300} height={100} />
                </div>
                <div className="w-1/3">
                    <h2 className="text-gray-800 text-xl font-medium uppercase">
                        {product?.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Availability: <span className="text-green-600">{product?.availability}</span>
                    </p>
                </div>
                <div className="text-primary text-lg font-semibold">${product.price}</div>
                <div>
                    <AddToCartBtn quantity={product?.inStock} productId={product?._id} userId={userId} />
                </div>
                <RemoveFromWisList productId={product?._id} userId={user._id} />
            </div>
        </div>
    );
};

export default Card;
