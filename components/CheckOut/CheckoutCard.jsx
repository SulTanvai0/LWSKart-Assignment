"use client"
import Image from "next/image";
import { useState } from "react";

const CheckoutCard = ({ product, updateQuantity }) => {
    const [quantity, setQuantity] = useState(product.quantity || 1);

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity > 0 && newQuantity <= product?.inStock) {
            setQuantity(newQuantity);
            updateQuantity(product._id, delta);
        }
    };

    return (
        <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded animate-fadeIn">
            <div className="flex items-center">
                <div className="w-28">
                    <Image src={product?.photosArray[0]} alt={product.name} className="w-full rounded-lg" width={300} height={100} />
                </div>
                <div className="ml-4">
                    <h2 className="text-gray-800 text-xl font-medium">{product.name}</h2>
                    <p className="text-gray-500 text-sm">Availability: <span className="text-green-600">{product?.availability}</span></p>
                    <p className="text-gray-500 text-sm">Product Left: <span className="text-green-600">{product?.inStock}</span></p>
                </div>
            </div>
            <div>
                <h3 className="text-sm  text-center text-gray-800 uppercase mb-1 font-medium">Quantity</h3>
                <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                    <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" onClick={() => handleQuantityChange(-1)} >-</div>
                    <div className="h-8 w-8 text-base flex items-center justify-center">{quantity}</div>
                    <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" onClick={() => handleQuantityChange(1)}>+</div>
                </div>
            </div>
            <div className="text-primary text-lg font-semibold">${(product.price * quantity).toFixed(2)}</div>
        </div>
    );
};

export default CheckoutCard;

