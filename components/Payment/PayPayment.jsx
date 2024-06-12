'use client'
import { getUserAddress, postInvoice, postOder } from "@/DataBase/quires";
import { sendinvoice } from "@/actions";
import Loading from "@/app/loading";
import { deleteCartsData } from "@/utils/deletecartDatas";
import { updateProductsData } from "@/utils/updateProductsQuntity";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BillingAddress from "./BillingAddress";
import SelectPayment from "./SelectPayment";
import ShipAddress from "./ShipAddress";

const PayPayment = ({ paymentMethods, user, names, lang }) => {
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentCard, setPaymentCard] = useState(null);
    const [cartIds, setCartIds] = useState([]);
    const [address, setAddress] = useState({
        shippingAddress: [],
        billingAddress: [],
    });
    const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
    const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const checkoutProducts = localStorage.getItem("paymentSummary");
        const getCartIds = localStorage.getItem("cartListIds");

        if (checkoutProducts) {
            const parsedProducts = JSON.parse(checkoutProducts);
            setProducts(parsedProducts.products || []);
            setTotalAmount(parsedProducts.totalAmount || 0);

            let totalQty = 0;
            parsedProducts.products.forEach(product => {
                totalQty += product.quantity || 1; // Assume 1 if quantity is not provided
            });
            setQuantity(totalQty);
        }

        if (getCartIds) {
            const parsedCartIds = JSON.parse(getCartIds);
            setCartIds(parsedCartIds || []);
        }

        const fetchAddress = async () => {
            const addresses = await getUserAddress(user?._id);

            const shippingAddresses = addresses.filter(addr => addr.title === "Shipping Address");
            const billingAddresses = addresses.filter(addr => addr.title === "Billing Address");

            setAddress({
                shippingAddress: shippingAddresses,
                billingAddress: billingAddresses,
            });
        };

        if (user?._id) {
            fetchAddress();
        }
    }, [user]);


    const handlePaymentCardChange = (e) => {
        const selectedMethod = JSON.parse(e.target.value);
        setPaymentCard(selectedMethod);
    };

    const handleShippingAddressChange = (e) => {
        const selectedAddress = JSON.parse(e.target.value);
        setSelectedShippingAddress(selectedAddress);
    };

    const handleBillingAddressChange = (e) => {
        const selectedAddress = JSON.parse(e.target.value);
        setSelectedBillingAddress(selectedAddress);
    };



    const payPayment = async () => {

        const invoiceObj = {
            userId: user?._id,
            products,
            total: quantity,
            paidFrom: paymentCard,
            shippingAddress: selectedShippingAddress,
            billingAddress: selectedBillingAddress,
        };

        try {
            const createInvoicePromise = postInvoice(invoiceObj);

            toast.promise(createInvoicePromise, {
                loading: 'Creating invoice...',
                success: 'Invoice created successfully!',
                error: 'An error occurred while creating the invoice. Please try again.',
            });

            const createInvoice = await createInvoicePromise;

            if (createInvoice.status === 200) {
                const orderObj = {
                    userId: user?._id,
                    invoiceId: createInvoice?.data?._id,
                };

                const createOrderPromise = postOder(orderObj);

                toast.promise(createOrderPromise, {
                    loading: 'Creating order...',
                    success: 'Order created successfully!',
                    error: 'An error occurred while creating the order. Please try again.',
                });

                const createOrder = await createOrderPromise;

                const deleteCartsPromise = deleteCartsData(cartIds);
                const updateProductsPromise = updateProductsData(products);

                toast.promise(Promise.all([deleteCartsPromise, updateProductsPromise]), {
                    loading: 'Processing order...',
                    success: 'Order processed successfully!',
                    error: 'An error occurred while processing the order. Please try again.',
                });

                await Promise.all([deleteCartsPromise, updateProductsPromise]);
                toast("redirecting for invoice")



                await sendinvoice(user?.email, createInvoice?.data);
                localStorage.clear();
                setLoading(true);
                router.push(`/${lang}/invoice/${createInvoice?.data?._id}`);
            }
        } catch (error) {
            console.error('Error during payment process:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center"><Loading /></div>
    }



    return (
        <div className="container mx-auto  p-4">
            <h2 className="text-2xl font-semibold mb-4">{names?.payment}</h2>
            <div className="bg-white shadow rounded p-4 mx-auto w-[75%]">
                <div className="flex mb-4">
                    <div className="w-1/2 pr-2">
                        <h3 className="text-lg font-medium">{names?.summary}</h3>
                        <p>{names?.quantity}: <span className="font-semibold">{quantity}</span></p>
                        <p>{names?.amount}: <span className="font-semibold">${totalAmount}</span></p>
                    </div>
                    <div className="w-1/2 pl-2">
                        <Link href="/addressBook" className="inline-block px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark m-3 ">
                            {names?.addNewAddress}
                        </Link>
                        {

                            address.shippingAddress.length > 0 ? <ShipAddress

                                names={{

                                    chooseShippingAddress: names?.chooseShippingAddress,
                                    choosePaymentMethod: names?.choosePaymentMethod
                                }}
                                handleShippingAddressChange={handleShippingAddressChange} shippingAddress={address.shippingAddress} /> : <div>
                                <h3 className="text-lg font-medium">{names?.addShippingAddress}</h3>
                                <Link href={`${lang}/addressBook`} >{names?.addShippingAddressText}</Link>
                            </div>

                        }
                        {

                            address.billingAddress.length > 0 ? <BillingAddress
                                names={{
                                    choosePaymentMethod: names?.choosePaymentMethod, chooseBillingAddress: names?.chooseBillingAddress
                                }}

                                handleBillingAddressChange={handleBillingAddressChange} billingAddress={address.billingAddress} /> : <div>
                                <h3 className="text-lg font-medium">{names?.addBillingAddress}</h3>
                                <Link href={`${lang}/addressBook`} >{names?.addBillingAddressText}</Link>
                            </div>

                        }


                    </div>
                </div>
                <div className="mb-4">
                    {
                        paymentMethods.length > 0 ? <SelectPayment names={{ method: names?.method, choosePaymentMethod: names?.choosePaymentMethod }} paymentMethods={paymentMethods} handlePaymentCardChange={handlePaymentCardChange} /> :
                            <div>
                                <h3 className="text-lg font-medium">{names?.method}</h3>
                                <Link href={"/addNewPaymentMethod"} >{names?.addPaymentMethodText}</Link>
                            </div>
                    }
                </div>
                <button
                    onClick={payPayment}
                    disabled={!paymentCard || !selectedShippingAddress || !selectedBillingAddress}
                    className={`w-full py-2 rounded transition duration-300 ${paymentCard && selectedShippingAddress && selectedBillingAddress ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    {names?.btnText}
                </button>
            </div>
        </div>
    );
};

export default PayPayment;
