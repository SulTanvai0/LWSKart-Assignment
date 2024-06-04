'use client'
import { createAddress, updateAddress } from '@/DataBase/quires';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AddAddressForm = ({ onClose, userId }) => {


    const searchParams = useSearchParams();
    const query = searchParams.get('id');


    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        title: '',
        street: '',
        city: '',
        state: '',
        zip: '',
    });


    useEffect(() => {
        if (query) {
            const fetchAddress = async () => {
                try {
                    const request = await fetch(`${process.env.LWSKART_URl}/api/updateUserAdress?Id=${query}`, {
                        next: { tags: ["address"] },
                    });
                    const response = await request.json();
                    setFormData(response?.data);
                } catch (error) {
                    console.error('Error fetching address:', error);
                }
            };
            fetchAddress();
        }
    }, [query]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const address = { userId, ...formData }
        if (query) {

            const updateAddressReq = await updateAddress(address)


        } else {
            const creatingAddress = await createAddress(address)

        }
        if (onClose) {
            onClose()
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow rounded bg-white">
            <h2 className="text-2xl font-bold mb-4">{query ? "Edit Address" : "Add Address"}</h2>

            <select name="title" id="title-select" onChange={handleChange} >
                <option value="">{query ? formData.title : "Choose a title"}</option>
                <option value="Shipping Address">Shipping Address</option>
                <option value="Billing Address">Billing Address</option>
            </select>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                {query ? "Update Address" : "Add Address"}
            </button>
        </form>
    );
};

export default AddAddressForm;
