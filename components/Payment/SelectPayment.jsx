const SelectPayment = ({ handlePaymentCardChange, paymentMethods, names }) => {
    return (
        <>
            <h3 className="text-lg font-medium m-1">{names?.method}</h3>
            <select
                onChange={handlePaymentCardChange}
                className="w-full border rounded p-2"
            >
                <option value="">{names?.choosePaymentMethod}</option>
                {paymentMethods.map((method) => (
                    <option key={method._id} value={JSON.stringify(method)}>
                        {method.type} - {method.last4}
                    </option>
                ))}
            </select>
        </>
    );
};

export default SelectPayment;