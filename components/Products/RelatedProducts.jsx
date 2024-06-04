"use client";

import { getProductsByCategory } from "@/DataBase/quires";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddToCartBtn from "../shared/Card/AddToCartBtn";
import Buttons from "../shared/Card/Buttons";

const RelatedProducts = ({ category, user, name }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const productRequest = await getProductsByCategory(category);

            // Randomly shuffle the products and select the first 4
            const shuffledProducts = productRequest.sort(() => 0.5 - Math.random());
            const selectedProducts = shuffledProducts.slice(0, 4);

            setProducts(selectedProducts);
        };

        fetchData();
    }, [category]);

    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                {name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-8 justify-items-center">
                {products?.map((product) => (
                    <div key={product?._id} className="bg-white shadow rounded overflow-hidden group transform transition-transform duration-300 hover:scale-105">
                        <div className="relative h-56 w-64">
                            <Image
                                src={product?.photosArray[0]}
                                alt="product"
                                fill // Replaces layout="fill"
                                className="object-cover w-full h-full" // Replaces objectFit="cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Example sizes attribute
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Buttons productId={product?._id} userId={user?._id} />
                            </div>
                        </div>

                        <div className="pt-4 pb-3 px-4">
                            <Link href={`/productDetails/${product?._id}`}>
                                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition-colors">
                                    {product?.name}
                                </h4>
                            </Link>
                            <div className="flex items-baseline mb-1 space-x-2">
                                <p className="text-xl text-primary font-semibold">${product?.price}</p>
                                <p className="text-sm text-gray-400 line-through">${product?.discount}</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex gap-1 text-sm text-yellow-400">
                                    <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                                    <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                                    <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                                    <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                                    <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                                </div>
                                <div className="text-xs text-gray-500 ml-3">({product?.reviews})</div>
                            </div>
                        </div>
                        <AddToCartBtn quantity={product?.inStock} productId={product?._id} userId={user?._id} />
                    </div>
                ))}
            </div>
            <p className="text-center mt-8 text-lg">
                For more products visit{" "}
                <Link href={`/category/${category}`} className="text-primary hover:underline">
                    {category}
                </Link>
            </p>
        </div>
    );
};

export default RelatedProducts;
