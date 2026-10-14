        import {cart, getCartItem, saveToLocal, updateCartQuantity} from '../../data/cart.js';
        import { getProduct } from '../../data/products.js';
        import {formatCurrency} from '../utils/money.js';
        
        export function renderOrderSummary()
        {
            function renderDeliveryOption(cartItem)
            {
                let deliveryHtml = `<div class="delivery-options-title">
                                        Choose a delivery option:
                                    </div>
                                    <div class="delivery-option">
                                        <input type="radio" checked
                                            class="delivery-option-input"
                                            name="delivery-option-${cartItem.id}">
                                        <div>
                                            <div class="delivery-option-date">
                                                Tuesday, June 21
                                            </div>
                                            <div class="delivery-option-price">
                                                FREE Shipping
                                            </div>
                                        </div>
                                    </div>
                                    <div class="delivery-option">
                                        <input type="radio"
                                            class="delivery-option-input"
                                            name="delivery-option-${cartItem.id}">
                                        <div>
                                            <div class="delivery-option-date">
                                                Wednesday, June 15
                                            </div>
                                            <div class="delivery-option-price">
                                                $4.99 - Shipping
                                            </div>
                                        </div>
                                    </div>
                                    <div class="delivery-option">
                                        <input type="radio"
                                            class="delivery-option-input"
                                            name="delivery-option-${cartItem.id}">
                                        <div>
                                            <div class="delivery-option-date">
                                            Monday, June 13
                                            </div>
                                            <div class="delivery-option-price">
                                            $9.99 - Shipping
                                            </div>
                                        </div>
                                    </div>`;
                return deliveryHtml;
            }
            
            function generateCartItems()
            {
                let orderHtml = '';
                cart.forEach((cartItem) => {
                    let product = getProduct(cartItem.id);
                    orderHtml += `<div class="cart-item-container">
                                    <div class="delivery-date">
                                        Delivery date: Tuesday, June 21
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
                                                <span class="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>
                                        <div class="delivery-options">${renderDeliveryOption(cartItem)}</div>
                                    </div>
                            </div>`;
                });
                document.querySelector('.order-summary').innerHTML = orderHtml;
            }
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
                let matchingObject = getCartItem(id);
                //let selectProductQuantity = document.querySelector(`.product-quantity-${productId}`);
                
                matchingObject.count = value;
                saveToLocal();
                updateCartQuantity();
                //selectProductQuantity.classList.remove('edit-update-link');
                renderOrderSummary();
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
        }
        