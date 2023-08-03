import { ClientResponse, Cart, CustomerSignin, CustomerSignInResult, Order, OrderFromCartDraft, OrderState } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";
import { customer } from "./customer";
import { taxCategory } from "./taxCategory";

class OrderClass {
    createCart = async (customerKey: string): Promise<ClientResponse<Cart>> => {
        const data = (await customer.getCustomerByKey(customerKey)).body;

        return apiRoot.carts().post({
            body: {
                customerId: data.id,
                customerEmail: data.email,
                currency: "EUR",
                country: "NL",
                shippingAddress: data.addresses.find(i => i.id === data.defaultShippingAddressId)
            }
        }).execute();
    }

    createAnonymousCart = (): Promise<ClientResponse<Cart>> =>
        apiRoot
            .carts()
            .post({
                body: {
                    currency: "EUR",
                    country: "DE"
                }
            })
            .execute();

    customerSignIn = (customerDetails: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> =>
        apiRoot
            .login()
            .post({
                body: customerDetails
            })
            .execute();

    getCartById = (ID: string): Promise<ClientResponse<Cart>> =>
        apiRoot
            .carts()
            .withId({ ID })
            .get()
            .execute();

    addLineItemsToCart = async (cartId: string, arrayOfSKUs: Array<string>): Promise<ClientResponse<Cart>> => {
        const cart = (await this.getCartById(cartId)).body;
        const taxCategoryId = (await taxCategory.getTaxCategoryByKey("standard")).body.id;
        return apiRoot.carts().withId({ ID: cartId }).post({
            body: {
                version: cart.version,
                actions: arrayOfSKUs.map(sku => {
                    return {
                        action: "addLineItem",
                        sku,
                        taxCategory: {
                            typeId: "tax-category",
                            id: taxCategoryId
                        }
                    }
                })
            }
        }).execute();
    }

    addDiscountCodeToCart = (cartId: string, discountCode: string): Promise<ClientResponse<Cart>> => {
        return this.getCartById(cartId)
            .then(cart => apiRoot
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version: cart.body.version,
                        actions: [{
                            action: "addDiscountCode",
                            code: discountCode
                        }]
                    }
                })
                .execute()
            );
    }

    recalculate = (cartId: string): Promise<ClientResponse<Cart>> =>
        this.getCartById(cartId).then(cart =>
            apiRoot
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version: cart.body.version,
                        actions: [{
                            action: "recalculate",
                        }]
                    }
                })
                .execute()
        );

    setShippingMethod = async (cartId: string): Promise<ClientResponse<Cart>> => {
        const matchingShippingMethod = await apiRoot
            .shippingMethods()
            .matchingCart()
            .get({
                queryArgs: {
                    cartId
                }
            })
            .execute()
            .then(response => response.body.results[0]);

        return this.getCartById(cartId).then(cart =>
            apiRoot
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version: cart.body.version,
                        actions: [{
                            action: "setShippingMethod",
                            shippingMethod: {
                                typeId: "shipping-method",
                                id: matchingShippingMethod.id
                            }
                        }]
                    }
                })
                .execute()
        );

    }


    createOrderFromCart = async (cartId: string): Promise<ClientResponse<Order>> => {
        const body = await this.createOrderFromCartDraft(cartId);
        return apiRoot
            .orders()
            .post({ body })
            .execute()
    }

    createOrderFromCartDraft = (cartId: string): Promise<OrderFromCartDraft> =>
        this.getCartById(cartId).then(cart => {
            return {
                cart: {
                    id: cartId,
                    typeId: "cart"
                },
                version: cart.body.version,
            };
        });

    getOrderById = (ID: string): Promise<ClientResponse<Order>> =>
        apiRoot
            .orders()
            .withId({ ID })
            .get()
            .execute();

    updateOrderCustomState = (orderId: string, customStateKey: string): Promise<ClientResponse<Order>> => {
        return this.getOrderById(orderId)
            .then(order => apiRoot
                .orders()
                .withId({ ID: orderId })
                .post({
                    body: {
                        version: order.body.version,
                        actions: [{
                            action: "transitionState",
                            state: {
                                key: customStateKey,
                                typeId: "state"
                            }
                        }]
                    }
                })
                .execute()
            );
    }

    setOrderState = (orderId: string, stateName: OrderState): Promise<ClientResponse<Order>> => {
        return this.getOrderById(orderId)
            .then(order => apiRoot
                .orders()
                .withId({ ID: orderId })
                .post({
                    body: {
                        version: order.body.version,
                        actions: [{
                            action: "changeOrderState",
                            orderState: stateName
                        }]
                    }
                })
                .execute()
            );
    }

    addPaymentToCart = (cartId: string, paymentId: string): Promise<ClientResponse<Cart>> =>
        this.getCartById(cartId)
            .then(cart =>
                apiRoot
                    .carts()
                    .withId({ ID: cartId })
                    .post({
                        body: {
                            version: cart.body.version,
                            actions: [{
                                action: "addPayment",
                                payment: {
                                    typeId: "payment",
                                    id: paymentId
                                }
                            }]
                        }
                    })
                    .execute()
            );
}

export const checkout = new OrderClass();