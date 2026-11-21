import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';

new Promise((resolve) => {
        loadProducts(() => {
                resolve();
        });
}).then(() => {
        renderOrderSummary();
        renderPaymentSummary();
});
/*
//Promises are better than nested callbacks
new Promise((resolve) => {
        loadProducts(() => {
                resolve();
        });
}).then(() => {
        return new Promise((resolve) => {
                loadCart(() => {
                        resolve();
                });
        });
}).then(() => {
        renderOrderSummary();
        renderPaymentSummary();
});
*/
/*
//nested callback
loadProudcts(() => {
        loadCart(() => {
                renderOrderSummary();
                renderPaymentSummary();
        });
});
*/