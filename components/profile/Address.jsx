const Address = () => {
    return (
        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800 text-lg">Shipping Address</h3>
                <a href="#" className="text-primary">Edit</a>
            </div>
            <div className="space-y-1">
                <h4 className="text-gray-700 font-medium">{`${"firstName"} ${"lastName"}`}</h4>
                <p className="text-gray-800">{"shippingAddress?.street"}</p>
                <p className="text-gray-800">{`${"shippingAddress?.city"}, ${"shippingAddress?.state"}`}</p>
                <p className="text-gray-800">{"shippingAddress?.zip"}</p>
                <p className="text-gray-800">{"phone"}</p>
            </div>
        </div>
    );
};

export default Address;