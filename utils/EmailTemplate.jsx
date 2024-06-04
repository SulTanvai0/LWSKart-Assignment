import { format } from "date-fns";

const EmailTemplate = ({ invoice }) => {
    const totalAmount = invoice.products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <div style={{ width: '75%', margin: '0 auto', backgroundColor: 'white', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '24px' }} id="printableArea">
            <header style={{ borderBottom: '1px solid #e2e8f0', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div style={{ width: '50%' }}>
                    <img
                        src="/assets/images/logo.svg"
                        alt="LWSKart Showroom"
                        style={{ borderRadius: '8px', width: "300px", height: "150px" }}
                    />
                </div>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1a202c' }}>Invoice</h1>
                    <div style={{ marginTop: '16px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#4a5568' }}>Invoice #: {invoice._id}</h2>
                        <p style={{ color: '#4a5568' }}>Date: {format(new Date(invoice.date), 'MM/dd/yyyy')}</p>
                    </div>
                </div>
            </header>

            <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>Billing Details</h3>
                    <p style={{ color: '#4a5568' }}>{invoice.billingAddress?.name}</p>
                    <p style={{ color: '#4a5568' }}>{invoice.billingAddress?.city}, {invoice.billingAddress?.state} {invoice.billingAddress?.zip}</p>
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>Shipping Details</h3>
                    <p style={{ color: '#4a5568' }}>{invoice.shippingAddress?.name}</p>
                    <p style={{ color: '#4a5568' }}>{invoice.shippingAddress?.city}, {invoice.shippingAddress?.state} {invoice.shippingAddress?.zip}</p>
                </div>
            </section>

            <section style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>Order Summary</h3>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '8px 16px', border: '1px solid #e2e8f0' }}>Product</th>
                            <th style={{ padding: '8px 16px', border: '1px solid #e2e8f0' }}>Quantity</th>
                            <th style={{ padding: '8px 16px', border: '1px solid #e2e8f0' }}>Unit Price</th>
                            <th style={{ padding: '8px 16px', border: '1px solid #e2e8f0' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.products.map((product, index) => (
                            <tr key={index}>
                                <td style={{ padding: '8px 16px', border: '1px solid #e2e8f0' }}>{product.name}</td>
                                <td style={{ padding: '8px 16px', border: '1px solid #e2e8f0' }}>{product.quantity}</td>
                                <td style={{ padding: '8px 16px', border: '1px solid #e2e8f0' }}>${product.price.toFixed(2)}</td>
                                <td style={{ padding: '8px 16px', border: '1px solid #e2e8f0' }}>${(product.price * product.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <footer style={{ marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '50%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#4a5568' }}>Subtotal:</span>
                            <span style={{ color: '#1a202c' }}>${totalAmount.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#4a5568' }}>Shipping:</span>
                            <span style={{ color: '#1a202c' }}>${invoice?.shippingCost?.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#4a5568' }}>Tax:</span>
                            <span style={{ color: '#1a202c' }}>${invoice?.tax?.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '18px' }}>
                            <span style={{ color: '#1a202c' }}>Total:</span>
                            <span style={{ color: '#1a202c' }}>${(totalAmount + invoice?.shippingCost + invoice?.tax).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <div style={{ color: '#4a5568' }}>
                        <p style={{ fontSize: '14px' }}>Paid by <span style={{ fontWeight: 'bold' }}>{invoice.paidFrom.type}</span> ending in <span style={{ fontWeight: 'bold' }}>{invoice.paidFrom.last4}</span></p>
                        <p style={{ fontSize: '14px' }}>Card Number:<span style={{ fontWeight: 'bold' }}>**** **** **** {invoice.paidFrom.last4}</span></p>
                        <p style={{ fontSize: '14px' }}>Expiry: <span style={{ fontWeight: 'bold' }}>{invoice.paidFrom.expiry}</span></p>
                        <p style={{ fontSize: '14px' }}>Payment Date: {format(new Date(invoice.date), 'MM/dd/yyyy')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EmailTemplate;
