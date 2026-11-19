        export let cartHomeQuantity = JSON.parse(localStorage.getItem('cartHome')) || 0;

        function saveCartQuantity()
        {
            localStorage.setItem('cartHome', JSON.stringify(cartHomeQuantity));
        }
        export function updateCartQuantity(cart)
        {
            cartHomeQuantity = cart.getCartQuantity();
            saveCartQuantity();
        }

        export function cartQuantityIncrement()
        {
            cartHomeQuantity++;
            saveCartQuantity();
        }

        saveCartQuantity();