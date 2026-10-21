        import {cart, getCartItem, saveToLocal, updateCartQuantity, removeCartItem, updateDeliveryOption, getCartQuantity} from '../../data/cart.js';
        import { getProduct } from '../../data/products.js';
        import {formatCurrency} from '../utils/money.js';
        import { deliveryOptions, getDateString, getDeliveryOption } from '../../data/delivery.js';
        import { renderPaymentSummary } from './paymentSummary.js';
        
        export function renderOrderSummary()
        {   
            let selectCheckout = document.querySelector('.checkout-js');
            function renderCheckout()
            {
                const cartCount = getCartQuantity();
                let checkout = `Checkout (<a class="return-to-home-link"
                                href="amazon.html">${cartCount} items</a>)`;
                selectCheckout.innerHTML = checkout;
            }
            function renderDeliveryOption(cartItem)
            {
                let deliveryHtml = '';
            
                deliveryOptions.forEach((delivery) => {
                    const dateString = getDateString(delivery);
                    let priceString = (delivery.priceCents) ? `$${formatCurrency(delivery.priceCents)}-` : 'FREE';
                    let check = (delivery.id === cartItem.deliveryId) ? 'checked' : '';
                    deliveryHtml += `<div class="delivery-option delivery-option-js" data-product-id="${cartItem.id}" data-delivery-id="${delivery.id}">
                                        <input type="radio"  ${check}
                                                class="delivery-option-input"
                                                name="delivery-option-${cartItem.id}">
                                        <div>
                                                <div class="delivery-option-date">
                                                    ${dateString}
                                                </div>
                                                <div class="delivery-option-price">
                                                    ${priceString} Shipping
                                                </div>
                                        </div>
                                    </div>`;
                });
                return deliveryHtml;
            }
            
            function generateCartItems()
            {
                let orderHtml = '';
                cart.forEach((cartItem) => {
                    let deliveryOption = getDeliveryOption(cartItem);
                    let dateString = getDateString(deliveryOption);
                    let product = getProduct(cartItem.id);
                    orderHtml += `<div class="cart-item-container">
                                    <div class="delivery-date">
                                        Delivery date: ${dateString}
                                    </div>

                                    <div class="cart-item-details-grid">
                                        <img class="product-image"
                                        src=${product.image}>

                                        <div class="cart-item-details">
                                            <div class="product-name">
                                                ${product.name}
                                            </div>
                                            <div class="product-price">
                                                $${formatCurrency(product.priceCents)}
                                            </div>
                                            <div class="product-quantity product-quantity-${cartItem.id}">
                                                <span>
                                                    Quantity: <span class="quantity-label">${cartItem.count}</span>
                                                </span>
                                                <span class="update-quantity-link link-primary js-update" data-product-id="${cartItem.id}">
                                                    Update
                                                </span>
                                                <input type="number" min="0" max="100" value="${cartItem.count}" class="quantity-input js-input-${cartItem.id}">
                                                <span class="quantity-save js-save js-save-${cartItem.id}" data-product-id="${cartItem.id}">Save</span>
                                                <span class="delete-quantity-link link-primary js-delete" data-product-id="${cartItem.id}">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>
                                        <div class="delivery-options">
                                            <div class="delivery-options-title">
                                                Choose a delivery option:
                                            </div>
                                            ${renderDeliveryOption(cartItem)}
                                        </div>
                                    </div>
                            </div>`;
                });
                document.querySelector('.order-summary').innerHTML = orderHtml;
            }
            renderCheckout();
            generateCartItems();
            //let selectDeliveryOptions = document.querySelectorAll('.delivery-options');
            let selectUpdate = document.querySelectorAll('.js-update');

            selectUpdate.forEach((update) => {
                let productId = update.dataset.productId; //here kebabcase became camelCase
                let selectProductQuantity = document.querySelector(`.product-quantity-${productId}`);
                
                update.addEventListener('click', () => {
                    selectProductQuantity.classList.add('edit-update-link');
                });
            });

            function saveItem(id)
            {
                let value = Number(document.querySelector(`.js-input-${id}`).value);
                
                if(value < 0 || value > 1000)
                {
                    alert(`Invalid input`);
                    renderOrderSummary();
                }
                else if(value === 0)
                    deleteItem(id);
                else
                {
                    let matchingObject = getCartItem(id);
                    matchingObject.count = value;
                    saveToLocal();
                    updateCartQuantity();
                    renderOrderSummary();
                    renderPaymentSummary();
                }
            }

            let selectSave = document.querySelectorAll('.js-save');
            selectSave.forEach((save) => {
                let productId = save.dataset.productId; //here kebabcase became camelCase
                
                save.addEventListener('click', () => {
                    saveItem(productId);
                });
                
                document.querySelector(`.js-input-${productId}`).addEventListener('keydown', (event) => {
                    if(event.key === 'Enter')
                        saveItem(productId);
                });
            });

            function deleteItem(id)
            {
                let matchingObject = getCartItem(id);
                removeCartItem(matchingObject);
                updateCartQuantity();
                renderOrderSummary();
                renderPaymentSummary();
            }
            let selectDelete = document.querySelectorAll('.js-delete');

            selectDelete.forEach((delet) => {
                let productId = delet.dataset.productId; //here kebab case became camelCase
                delet.addEventListener('click', () => {
                    deleteItem(productId);
                });
            });

            let selectDeliveryOptions = document.querySelectorAll('.delivery-option-js');
            selectDeliveryOptions.forEach((deliveryOption) => {
                let productId = deliveryOption.dataset.productId; //here kebab case became camleCase
                let deliveryId = deliveryOption.dataset.deliveryId; //here kebab case became camelCase

                deliveryOption.addEventListener('click', () => {
                    updateDeliveryOption(productId, deliveryId);
                    renderOrderSummary();
                    renderPaymentSummary();
                });
            });
        }
        