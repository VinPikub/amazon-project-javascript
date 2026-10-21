        import { products } from "./products.js";
        import { deliveryOptions } from "./delivery.js";

        export let cart = JSON.parse(localStorage.getItem('cart')) || [
                {
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        count: 2,
                        deliveryId: "1"
                },
                {
                        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        count: 1,
                        deliveryId: "2"
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
                let deliveryId = "1";
                if(matchingItem)
                {
                    matchingItem.count += count;
                }
                else
                {
                    cart.push({
                        id,
                        count,
                        deliveryId
                    });
                }
                /*
                 cart.push({
                        id: id,
                        count: count,
                        deliveryId: deliveryId
                })*/
                saveToLocal();
        }

        export function saveCartQuantity()
        {
                localStorage.setItem('cartHome', JSON.stringify(cartQuantity));
        }
        
        export let cartQuantity = JSON.parse(localStorage.getItem('cartHome')) || 0;
        saveCartQuantity();
        
        export function getCartQuantity()
        {
                let cartCount = 0;
                
                cart.forEach((cartItem) => {
                    cartCount += cartItem.count;
                });
                return cartCount;
        }

        export function updateCartQuantity()
        {
                cartQuantity = getCartQuantity();
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
                saveToLocal();
        }

        export function updateDeliveryOption(productId, deliveryId)
        {
                cart.forEach((cartItem) => {
                        if(productId === cartItem.id)
                        {
                                cartItem.deliveryId = deliveryId;
                                saveToLocal();
                        }
                });
        }

        export function itemPrice()
        {
                let total = 0;
                cart.forEach((cartItem) => {
                        let productPrice;
                        products.forEach((product) => {
                                if(cartItem.id === product.id)
                                        productPrice = product.priceCents;
                        });
                        total += productPrice*cartItem.count;
                });
                return total;
        }

        export function itemShipping()
        {
                let total = 0;

                cart.forEach((cartItem) => {
                        let shipping;
                        deliveryOptions.forEach((delivery) => {
                                if(cartItem.deliveryId === delivery.id)
                                        shipping = delivery.priceCents;
                        });
                        total += shipping;
                });
                return total;
        }

        export function itemTotalBeforeTax()
        {
                let total = itemPrice() + itemShipping();
                return total;
        }

        export function itemTax()
        {
                let total = itemTotalBeforeTax();
                let tax = total * 10/100;
                return tax;
        }
