        import {cart, addToCart, cartQuantity, saveCartQuantity, getCartQuantity, cartQuantityIncrement} from '../data/cart.js';
        import {products} from '../data/products.js';
        import { formatCurrency } from './utils/money.js';

        
        let str = '';
        let selectgrid = document.querySelector('.products-grid');
        products.forEach((item) => {
            str += `<div class="product-container">
                    <div class="product-image-container">
                        <img class="product-image"
                        src=${item.image}>
                    </div>

                    <div class="product-name limit-text-to-2-lines">
                        ${item.name}
                    </div>

                    <div class="product-rating-container">
                        <img class="product-rating-stars"
                        src="images/ratings/rating-${(item.rating.stars * 10 )}.png">
                        <div class="product-rating-count link-primary">
                        ${item.rating.count}
                        </div>
                    </div>

                    <div class="product-price">
                        $${formatCurrency(item.priceCents)}
                    </div>

                    <div class="product-quantity-container">
                        <select class="select-${item.id}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        </select>
                    </div>

                    <div class="product-spacer"></div>

                    <div class="added-to-cart added-to-cart-${item.id}">
                        <img src="images/icons/checkmark.png">
                        Added
                    </div>

                    <button class="add-to-cart-button button-primary" data-product-id="${item.id}">
                        Add to Cart
                    </button>
                    </div>`;
        });
        selectgrid.innerHTML = str;
        
        function displayAdded(id)
        {
            let selectAddedToCart = document.querySelector(`.added-to-cart-${id}`);
            selectAddedToCart.classList.add('show-added');
            clearTimeout(selectAddedToCart.timeoutId);

            selectAddedToCart.timeoutId = setTimeout(() => {        //timeoutId attribute of selectAddedToCart object
                selectAddedToCart.classList.remove('show-added');
            }, 2000);
        }

        let selectaddButt = document.querySelectorAll('.add-to-cart-button');
        let selectCartQuantity = document.querySelector('.cart-quantity');
        selectCartQuantity.innerHTML = cartQuantity || '';

        selectaddButt.forEach((button) => {
            button.addEventListener('click', () => {
                let id = button.dataset.productId; //kebab case become camelCase
                //let {productId} = button.dataset; //using shortcart
                let fixSelect = document.querySelector(`.select-${id}`);
                let count = Number(fixSelect.value);
                cartQuantityIncrement();
                addToCart(id, count);
                selectCartQuantity.innerHTML = cartQuantity;
                displayAdded(id);
            });
        });