        import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"; //using default export

        export const deliveryOptions = [
            {
                id: "1",
                deliveryDays: 7,
                priceCents: 0
            },
            {
                id: "2",
                deliveryDays: 3,
                priceCents: 499
            },
            {
                id: "3",
                deliveryDays: 1,
                priceCents: 999
            },
        ];
        /*
        const today = dayjs();
                        let deliveryOption;
                        
                        deliveryOptions.forEach((delivery) => {
                            if(cartItem.deliveryId === delivery.id)
                                deliveryOption = delivery;
                        });
                        let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
                        let dateString = deliveryDate.format('dddd, MMMM d');
        */

        export function getDateString(obj)
        {
            let today = dayjs();
            let deliveryDate = today.add(obj.deliveryDays, 'days');
            let dateString = deliveryDate.format('dddd, MMMM D');
            return dateString;
        }
        export function getDeliveryOption(cartItem)
        {
            let deliveryOption;
            deliveryOptions.forEach((delivery) => {
                if(cartItem.deliveryId === delivery.id)
                    deliveryOption = delivery;
            });
            return deliveryOption;
        }