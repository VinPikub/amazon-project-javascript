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

        export function getDateString(obj)
        {
            let deliveryDate = dayjs();
            /*
            if(deliveryDate.format('dddd') === 'Saturday')
                deliveryDate = deliveryDate.add(2, 'days');
            else if(deliveryDate.format('dddd') === 'Sunday')
                deliveryDate = deliveryDate.add(1, 'days');
            */
            let deliveryDays = obj.deliveryDays;
            console.log(deliveryDays);
            while(deliveryDays)
            {
                deliveryDate = deliveryDate.add(1, 'days');
                if(deliveryDate.format('dddd') !== 'Saturday' && deliveryDate.format('dddd') !== 'Sunday')
                    deliveryDays -= 1;
            }
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