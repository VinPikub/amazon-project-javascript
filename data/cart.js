        export let cart = JSON.parse(localStorage.getItem('cart')) || [
                {
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        count: 2
                },
                {
                        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        count: 1
                }
        ];
        saveToLocal();

        export function saveToLocal()
        {
                localStorage.setItem('cart', JSON.stringify(cart));
        }

        export function getCartItem(id)
        {
                let obj;

                cart.forEach((item) => {
                    if(id === item.id)
                    {
                        obj = item;
                    }
                });
                return obj;
        }

        export function addToCart(id, count)
        {
                let matchingItem = getCartItem(id);
                if(matchingItem)
                {
                    matchingItem.count += count;
                }
                else
                {
                    cart.push({
                        id,
                        count
                    });
                }
                saveToLocal();
        }

        export function saveCartQuantity()
        {
                localStorage.setItem('cartHome', JSON.stringify(cartQuantity));
        }
        
        export let cartQuantity = JSON.parse(localStorage.getItem('cartHome')) || 0;
        saveCartQuantity();

        export function updateCartQuantity()
        {
                cartQuantity = 0;
                cart.forEach((cartItem) => {
                        cartQuantity += cartItem.count;
                });
                saveCartQuantity();
        }
        
        export function cartQuantityIncrement()
        {
                cartQuantity++;
                saveCartQuantity();
        }

        export function removeCartItem(obj)
        {
                let newCart = [];
                cart.forEach((cartItem) => {
                        if(cartItem !== obj)
                                newCart.push(cartItem);
                });
                cart = newCart;
                console.log(cart);
                saveToLocal();
        }