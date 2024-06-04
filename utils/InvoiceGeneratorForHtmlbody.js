export const InvoiceGeneratorForHtmlbody = (invoice) => {
  const format = (date, format) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const totalAmount = invoice.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 16px; font-family: Arial, sans-serif;">
        <div style="width: 75%; margin: 0 auto; background-color: white; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); border-radius: 8px; padding: 24px;">
            <header style="border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; margin-bottom: 40px;">
                <div style="width: 50%;">
                    <img src="/assets/images/logo.svg" alt="LWSKart Showroom" style="border-radius: 8px;" width="300" height="200" />
                </div>
                <div>
                    <h1 style="font-size: 24px; font-weight: 600; color: #1f2937;">Invoice</h1>
                    <div style="margin-top: 16px;">
                        <h2 style="font-size: 18px; font-weight: 500; color: #4b5563;">Invoice #: ${
                          invoice._id
                        }</h2>
                        <p style="color: #4b5563;">Date: ${format(
                          new Date(invoice.date),
                          "MM/dd/yyyy"
                        )}</p>
                    </div>
                </div>
            </header>

            <section style="display: flex; justify-content: space-between; margin-bottom: 24px;">
                <div style="margin-bottom: 24px;">
                    <h3 style="font-size: 20px; font-weight: 600; color: #1f2937; margin-bottom: 8px;">Billing Details</h3>
                    <p style="color: #4b5563;">${
                      invoice.billingAddress?.name
                    }</p>
                    <p style="color: #4b5563;">${
                      invoice.billingAddress?.city
                    }, ${invoice.billingAddress?.state} ${
    invoice.billingAddress?.zip
  }</p>
                </div>
                <div style="margin-bottom: 24px;">
                    <h3 style="font-size: 20px; font-weight: 600; color: #1f2937; margin-bottom: 8px;">Shipping Details</h3>
                    <p style="color: #4b5563;">${
                      invoice.shippingAddress?.name
                    }</p>
                    <p style="color: #4b5563;">${
                      invoice.shippingAddress?.city
                    }, ${invoice.shippingAddress?.state} ${
    invoice.shippingAddress?.zip
  }</p>
                </div>
            </section>

            <section style="margin-bottom: 24px;">
                <h3 style="font-size: 20px; font-weight: 600; color: #1f2937; margin-bottom: 8px;">Order Summary</h3>
                <table style="width: 100%; text-align: left; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="padding: 8px; border: 1px solid #e5e7eb;">Product</th>
                            <th style="padding: 8px; border: 1px solid #e5e7eb;">Quantity</th>
                            <th style="padding: 8px; border: 1px solid #e5e7eb;">Unit Price</th>
                            <th style="padding: 8px; border: 1px solid #e5e7eb;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoice.products
                          .map(
                            (product) => `
                        <tr>
                            <td style="padding: 8px; border: 1px solid #e5e7eb;">${
                              product.name
                            }</td>
                            <td style="padding: 8px; border: 1px solid #e5e7eb;">${
                              product.quantity
                            }</td>
                            <td style="padding: 8px; border: 1px solid #e5e7eb;">$${product.price.toFixed(
                              2
                            )}</td>
                            <td style="padding: 8px; border: 1px solid #e5e7eb;">$${(
                              product.price * product.quantity
                            ).toFixed(2)}</td>
                        </tr>`
                          )
                          .join("")}
                    </tbody>
                </table>
            </section>

            <footer style="margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 24px;">
                <div style="display: flex; justify-content: flex-end;">
                    <div style="width: 50%;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #4b5563;">Subtotal:</span>
                            <span style="color: #1f2937;">$${totalAmount.toFixed(
                              2
                            )}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #4b5563;">Shipping:</span>
                            <span style="color: #1f2937;">$${invoice?.shippingCost?.toFixed(
                              2
                            )}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #4b5563;">Tax:</span>
                            <span style="color: #1f2937;">$${invoice?.tax?.toFixed(
                              2
                            )}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 18px;">
                            <span style="color: #1f2937;">Total:</span>
                            <span style="color: #1f2937;">$${(
                              totalAmount +
                              invoice?.shippingCost +
                              invoice?.tax
                            ).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
                    <div style="color: #4b5563;">
                        <p style="font-size: 14px;">Paid by <span style="font-weight: 600;">${
                          invoice.paidFrom.type
                        }</span> ending in <span style="font-weight: 600;">${
    invoice.paidFrom.last4
  }</span></p>
                        <p style="font-size: 14px;">Card Number: <span style="font-weight: 600;">${
                          invoice.paidFrom.cardNumber
                        }</span></p>
                        <p style="font-size: 14px;">Expiry: <span style="font-weight: 600;">${
                          invoice.paidFrom.expiry
                        }</span></p>
                        <p style="font-size: 14px;">Payment Date: ${format(
                          new Date(invoice.date),
                          "MM/dd/yyyy"
                        )}</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>`;
};
