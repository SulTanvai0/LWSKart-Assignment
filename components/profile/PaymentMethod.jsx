'úse client'

import { deletePaymentMethod } from "@/DataBase/quires";


const PaymentMethod = ({ method }) => {
    const removeCard = async (id) => {
        const permission = confirm(`you want remove ${method?.type} card`)
        if (permission) {
            await deletePaymentMethod(id)
        }
    }

    return (
        <div className="mb-4 border-b pb-4">
            <h4 className="text-gray-700 font-medium">{method?.type}</h4>
            <p className="text-gray-800">Card Number: **** **** **** {method?.last4}</p>
            <p className="text-gray-800">Expiry: {method?.expiry}</p>
            <button onClick={() => removeCard(method?._id)} className="text-primary mt-4">remove card</button>
        </div>
    );
};

export default PaymentMethod;