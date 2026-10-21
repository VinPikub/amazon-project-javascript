        import { itemPrice, itemShipping, itemTotalBeforeTax, itemTax, getCartQuantity } from "../../data/cart.js";
        import { formatCurrency } from "../utils/money.js";

        export function renderPaymentSummary()
        {
            let selectPaymentSummary = document.querySelector('.payment-summary');
            const onlyProductPrice = itemPrice();
            const shippingHandling = itemShipping();
            const totalBeforeTax = itemTotalBeforeTax();
            const estimatedTax = itemTax();
            const total = totalBeforeTax + estimatedTax;
            const items = getCartQuantity();

            let paymentHtml = `<div class="payment-summary-title">
                                    Order Summary
                                </div>

                                <div class="payment-summary-row">
                                    <div>Items (${items}):</div>
                                    <div class="payment-summary-money">$${formatCurrency(onlyProductPrice)}</div>
                                </div>

                                <div class="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div class="payment-summary-money">$${formatCurrency(shippingHandling)}</div>
                                </div>

                                <div class="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
                                </div>

                                <div class="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
                                </div>

                                <div class="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div class="payment-summary-money">$${formatCurrency(total)}</div>
                                </div>

                                <button class="place-order-button button-primary">
                                    Place your order
                                </button>`;
            selectPaymentSummary.innerHTML = paymentHtml;
        }