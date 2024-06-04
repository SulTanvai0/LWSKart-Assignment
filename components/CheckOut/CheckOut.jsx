"use client"

import Loading from "@/app/loading";
import { getDataWithArrayOfIds } from "@/utils/getDataWithArrayOfIds";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutCard from "./CheckoutCard";

const CheckOut = ({ lang, names }) => {
    const [products, setProducts] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const items = localStorage.getItem("productsIds");

        if (items) {
            const checkOuts = JSON.parse(items);

            const fetchProduct = async () => {
                try {
                    const productData = await getDataWithArrayOfIds(checkOuts);
                    setProducts(productData);
                    calculateTotals(productData);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };
            fetchProduct();
        }
    }, []);

    const calculateTotals = (productData) => {
        let totalQty = 0;
        let totalAmt = 0;

        productData.forEach((product) => {
            const productQuantity = product.quantity || 1;
            totalQty += productQuantity;
            totalAmt += product.price * productQuantity;
        });

        setTotalQuantity(totalQty);
        setTotalAmount(totalAmt);
    };

    const updateQuantity = (productId, quantityChange) => {
        const updatedProducts = products.map((product) => {
            if (product._id === productId) {
                product.quantity = (product.quantity || 1) + quantityChange;
                if (product.quantity < 1) product.quantity = 1;
            }
            return product;
        });

        setProducts(updatedProducts);
        calculateTotals(updatedProducts);
    };

    const doPayment = () => {
        const paymentDetails = products.map(product => ({
            productId: product._id,
            name: product.name,
            quantity: product.quantity || 1,
            price: product.price
        }));

        const paymentSummary = {
            products: paymentDetails,
            totalAmount: totalAmount.toFixed(2)
        };

        localStorage.removeItem("paymentSummary");
        localStorage.setItem("paymentSummary", JSON.stringify(paymentSummary))

        setLoading(true)
        router.push(`/${lang}/payment`);
    };

    if (loading) {
        return <div className="flex justify-center"><Loading /></div>
    }

    return (
        <div className="container mx-auto   p-4">
            <h2 className="text-2xl font-semibold mb-4">{names?.checkout}</h2>
            <div className="space-y-2 w-[70%] mx-auto">
                {products &&
                    <>
                        {products.map((product) => (

                            <CheckoutCard
                                key={product._id}
                                product={product}
                                updateQuantity={updateQuantity}
                            />


                        ))}
                        <div className="text-lg font-semibold mt-4">
                            <p>{names?.amount}: ${totalAmount.toFixed(2)}</p>
                            <p>{names?.quantity}: {totalQuantity}</p>
                        </div>
                        <button onClick={doPayment} className="w-full bg-primary text-white py-2 mt-4 rounded hover:bg-primary-dark transition duration-300">
                            {names?.btnText}
                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default CheckOut;
