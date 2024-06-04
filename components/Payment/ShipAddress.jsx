const ShipAddress = ({ shippingAddress, handleShippingAddressChange, names }) => {
    return (
        <>
            <h3 className="text-lg font-medium">{names?.chooseShippingAddress}</h3>
            <select
                onChange={handleShippingAddressChange}
                className="w-full border rounded p-2 mb-4"
            >
                <option value={JSON.stringify(shippingAddress && shippingAddress[0])}>{names?.choosePaymentMethod}</option>
                {shippingAddress?.map((addr) => (
                    <option key={addr._id} value={JSON.stringify(addr)}>
                        {addr.name}, {addr.street}, {addr.city}
                    </option>
                ))}
            </select>
        </>
    );
};

export default ShipAddress;