'use client'

import { format } from 'date-fns';
import Image from "next/image";
import { useEffect, useState } from "react";

const Invoice = ({ invoice, invoiceData }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const total = invoice.products.reduce((acc, product) => {
            return acc + (product.price * product.quantity);
        }, 0);
        setTotalAmount(total);
    }, [invoice.products]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    function downloadInvoice() {
        if (isClient) {
            import('html2pdf.js').then((html2pdf) => {
                const element = document.getElementById("printableArea");
                element.classList.remove("w-[75%]");
                element.classList.add("max-w-6xl");
                const opt = {
                    margin: 0.5,
                    filename: `invoice_${invoice._id}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };
                html2pdf.default().from(element).set(opt).save();
            });
        }
    }

    return (
        <div className="container mx-auto p-4 flex flex-col items-start">
            <div className="flex justify-end w-full mb-4 no-print">
                <button type="button"
                    onClick={downloadInvoice}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    {invoiceData?.downloadInvoice}
                </button>
            </div>
            <div className="w-[75%] mx-auto bg-white shadow-lg rounded-lg p-6" id="printableArea">
                <header className="border-b flex flex-row items-center w-full justify-between mb-10">
                    <div className="lg:w-1/2">
                        <Image
                            src="/assets/images/logo.svg"
                            width={300}
                            height={200}
                            alt="LWSKart Showroom"
                            className="rounded-md "
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800">{invoiceData?.invoice}</h1>
                        <div className="mt-4">
                            <h2 className="text-lg font-medium text-gray-600">{invoiceData?.invoice} #: {invoice._id}</h2>
                            <p className="text-gray-600">{invoiceData?.date}: {format(new Date(invoice.date), 'MM/dd/yyyy')}</p>
                        </div>
                    </div>
                </header>

                <section className="flex w-full justify-between">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{invoiceData?.billingDetails}</h3>
                        <p className="text-gray-600">{invoice.billingAddress?.name}</p>
                        <p className="text-gray-600">{invoice.billingAddress?.city}, {invoice.billingAddress?.state} {invoice.billingAddress?.zip}</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{invoiceData?.shippingDetails}</h3>
                        <p className="text-gray-600">{invoice.shippingAddress?.name}</p>
                        <p className="text-gray-600">{invoice.shippingAddress?.city}, {invoice.shippingAddress?.state} {invoice.shippingAddress?.zip}</p>
                    </div>
                </section>

                <section className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{invoiceData?.orderSummary}</h3>
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">{invoiceData?.product}</th>
                                <th className="px-4 py-2 border">{invoiceData?.quantity}</th>
                                <th className="px-4 py-2 border">{invoiceData?.unitPrice}</th>
                                <th className="px-4 py-2 border">{invoiceData?.total}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.products.map((product, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">{product.name}</td>
                                    <td className="px-4 py-2 border">{product.quantity}</td>
                                    <td className="px-4 py-2 border">${product.price.toFixed(2)}</td>
                                    <td className="px-4 py-2 border">${(product.price * product.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <footer className="mt-6 border-t pt-6">
                    <div className="flex justify-end">
                        <div className="w-1/2">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">{invoiceData?.subtotal}:</span>
                                <span className="text-gray-800">${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">{invoiceData?.shipping}:</span>
                                <span className="text-gray-800">${invoice?.shippingCost?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">{invoiceData?.tax}:</span>
                                <span className="text-gray-800">${invoice?.tax?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                                <span className="text-gray-800">{invoiceData?.total}:</span>
                                <span className="text-gray-800">${(totalAmount + invoice?.shippingCost + invoice?.tax).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <div className="text-gray-600">
                            <p className="text-sm">{invoiceData?.paidBy} <span className="font-bold">{invoice.paidFrom.type}</span> {invoiceData?.cardEndingIn} <span className="font-bold">{invoice.paidFrom.last4}</span></p>
                            <p className="text-sm">{invoiceData?.cardNumber}:<span className="font-bold">{invoice.paidFrom.cardNumber}</span></p>
                            <p className="text-sm">{invoiceData?.expiry}: <span className="font-bold">{invoice.paidFrom.expiry}</span></p>
                            <p className="text-sm">{invoiceData?.paymentDate}: {format(new Date(invoice.date), 'MM/dd/yyyy')}</p>

                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Invoice;

