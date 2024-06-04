const AddressVeies = () => {
    return (
        <div className="space-y-1">
            <h4 className="text-gray-700 font-medium">{`${"firstName"} ${"lastName"}`}</h4>
            <p className="text-gray-800">{"shippingAddress?.street"}</p>
            <p className="text-gray-800">{`${"shippingAddress?.city"}, ${"shippingAddress?.state"}`}</p>
            <p className="text-gray-800">{"shippingAddress?.zip"}</p>
            <p className="text-gray-800">{"phone"}</p>
        </div>
    );
};

export default AddressVeies;