'use client'
import { useState } from 'react';

const AddPaymentMethodForm = ({ onClose, userId }) => {
    const [formData, setFormData] = useState({
        type: '',
        cardNumber: '',
        expiry: '',
        last4: '',
    });

    const handleAddMethod = async (formData) => {
        const cardInfo = { userId, ...formData };

        const request = await fetch(`${process.env.LWSKART_URl}/api/controlpaymentMethods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardInfo),
        });

        const res = await request.json();

        setFormData({
            type: '',
            cardNumber: '',
            expiry: '',
            last4: '',
        });

        if (onClose) {
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate the form data
        if (formData.cardNumber.length !== 16) {
            alert("Card number must be 16 digits");
            return;
        }
        if (formData.last4.length !== 4) {
            alert("Last 4 digits must be 4 digits");
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
            alert("Expiry must be in MM/YY format");
            return;
        }

        // Call the handleAddMethod function
        handleAddMethod(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow rounded bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Add Payment Method</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Card Type</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded"
                    maxLength="16"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Expiry Date (MM/YY)</label>
                <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded"
                    placeholder="MM/YY"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last 4 Digits</label>
                <input
                    type="text"
                    name="last4"
                    value={formData.last4}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded"
                    maxLength="4"
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Add Payment Method
            </button>
        </form>
    );
};

export default AddPaymentMethodForm;
