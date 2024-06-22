'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import Accordion from './Accordion';
import AccordionChilde from './AccordionChilde';
import AddressCard from './AddressCard';
import PaymentMethod from './PaymentMethod';
import ProfileInfo from './ProfileInfo';

const Profile = ({ user, address, orders, paymentMethods, names, lang }) => {
    return (
        <div className="flex flex-col lg:flex-row items-start py-8">
            {/* Profile Info */}
            <span className="text-gray-800 font-bold">{names?.personal}</span>
            <div className="w-full lg:w-1/2 text-center p-5 mb-8 lg:mb-0">
                <ProfileInfo user={user} />
            </div>

            {/* Other Content */}
            <div className="w-full lg:w-1/2 container gap-6 pt-4 pb-16 px-4">
                {/* Address Book */}
                <Accordion title={names?.addressBook}>
                    <div className="mt-8">
                        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                            {address && address.map((address) => (
                                <AccordionChilde key={address?._id} title={address.title}>
                                    <AddressCard address={address} />
                                </AccordionChilde>
                            ))}
                            <button className="text-primary mt-4">
                                <Link href={`/${lang}/addressBook`}>{names?.addNewAddress}</Link>
                            </button>
                        </div>
                    </div>
                </Accordion>

                {/* Payment Methods */}
                <Accordion title={names?.paymentMethods}>
                    <div className="mt-8">
                        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                            {paymentMethods && paymentMethods.map((method) => (
                                <AccordionChilde key={method?.id} title={method?.type}>
                                    <PaymentMethod method={method} />
                                </AccordionChilde>
                            ))}
                            <button className="text-primary mt-4">
                                <Link href={`/${lang}/addNewPaymentMethod`}>{names?.addNewPaymentMethod}</Link>
                            </button>
                        </div>
                    </div>
                </Accordion>

                {/* Order History */}
                <Accordion title={names?.orderHistory}>
                    <div className="mt-8">
                        <div className="shadow rounded-lg bg-white p-6">
                            {orders && orders.map((order) => (
                                <AccordionChilde title={`Order #${order?._id}`} key={order?._id}>
                                    <div className="mb-4 border-b pb-4">
                                        <p className="text-gray-600">Date: {format(new Date(order.date), 'MM/dd/yyyy')}</p>
                                        <p className="text-gray-600">
                                            Status: <span className="text-gray-800">{order?.status}</span>
                                        </p>
                                        <Link href={`/${lang}/invoice/${order?.invoiceId}`} className="text-blue-600 hover:text-blue-800 underline">
                                            See Invoice
                                        </Link>
                                    </div>
                                </AccordionChilde>
                            ))}
                        </div>
                    </div>
                </Accordion>
            </div>
        </div>
    );
};

export default Profile;
