        const cart  = {
            cartItems: JSON.parse(localStorage.getItem('cart')) || [
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
            ],
            saveToLocal()
            {
                localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            },
            getCartItem(id)
            {
                let obj;

                this.cartItems.forEach((item) => {
                    if(id === item.id)
                    {
                        obj = item;
                    }
                });
                return obj;
            },
            addToCart(id, count)
            {
                let matchingItem = this.getCartItem(id);
                let deliveryId = "1";
                if(matchingItem)
                {
                    matchingItem.count += count;
                }
                else
                {
                    this.cartItems.push({
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
                this.saveToLocal();
            },
            cartQuantity: JSON.parse(localStorage.getItem('cartHome')) || 0,
            saveCartQuantity()
            {
                localStorage.setItem('cartHome', JSON.stringify(this.cartQuantity));
            },
            getCartQuantity()
            {
                let cartCount = 0;
                
                this.cartItems.forEach((cartItem) => {
                    cartCount += cartItem.count;
                });
                return cartCount;
            },
            updateCartQuantity()
            {
                cartQuantity = getCartQuantity();
                this.saveCartQuantity();
            },
            cartQuantityIncrement()
            {
                this.cartQuantity++;
                this.saveCartQuantity();
            },

            removeCartItem(obj)
            {
                let newCart = [];
                this.cartItems.forEach((cartItem) => {
                        if(cartItem !== obj)
                                newCart.push(cartItem);
                });
                this.cartItems = newCart;
                this.saveToLocal();
            },

            updateDeliveryOption(productId, deliveryId)
            {
                this.cartItems.forEach((cartItem) => {
                        if(productId === cartItem.id)
                        {
                                cartItem.deliveryId = deliveryId;
                                this.saveToLocal();
                        }
                });
            },

            itemPrice()
            {
                let total = 0;
                this.cartItems.forEach((cartItem) => {
                        let productPrice;
                        products.forEach((product) => {
                                if(cartItem.id === product.id)
                                        productPrice = product.priceCents;
                        });
                        total += productPrice*cartItem.count;
                });
                return total;
            },

            itemShipping()
            {
                let total = 0;

                this.cartItems.forEach((cartItem) => {
                        let shipping;
                        deliveryOptions.forEach((delivery) => {
                                if(cartItem.deliveryId === delivery.id)
                                        shipping = delivery.priceCents;
                        });
                        total += shipping;
                });
                return total;
            },

            itemTotalBeforeTax()
            {
                let total = this.itemPrice() + this.itemShipping();
                return total;
            },

            itemTax()
            {
                let total = itemTotalBeforeTax();
                let tax = total * 10/100;
                return tax;
            }

        } 
        //saveToLocal();
        this.saveCartQuantity();