const BillingAddress = ({ names, handleBillingAddressChange, billingAddress }) => {

    return (
        <>
            <h3 className="text-lg font-medium">{names?.chooseBillingAddress}</h3>
            <select
                onChange={handleBillingAddressChange}
                className="w-full border rounded p-2"
            >
                <option value={JSON.stringify(billingAddress && billingAddress[0])}>{names?.choosePaymentMethod}</option>


                {billingAddress?.map((addr) => (
                    <option key={addr._id} value={JSON.stringify(addr)}>
                        {addr.name}, {addr.street}, {addr.city}
                    </option>
                ))}

            </select>
        </>
    );
};

export default BillingAddress;