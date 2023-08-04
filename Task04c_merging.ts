import { CustomerSignin } from "@commercetools/platform-sdk";
import { checkout } from "./handson/order";
import { log } from "./utils/logger";
import { readConfig, Prefix } from "./utils/config";

const customerKey = "testVishal";

const mergingProcessTest = async () => {
    let anonymousCart = await checkout.createAnonymousCart();

    let customerCart = await checkout.createCart(customerKey);

    anonymousCart = await checkout.addLineItemsToCart(anonymousCart.body.id, ["SKU-3"]);

    customerCart = await checkout.addLineItemsToCart(customerCart.body.id, ["SKU-1"]);

    log("Anonymous Cart: " + anonymousCart.body.id);
    log("Customer Cart: " + customerCart.body.id);

    const customerDetails: CustomerSignin = {
        email: readConfig(Prefix.DEV).username,
        password: readConfig(Prefix.DEV).password,
        anonymousCartId: anonymousCart.body.id,
        anonymousCartSignInMode: "MergeWithExistingCustomerCart", // try switching to UseAsNewActiveCustomerCart
    };

    let result = await checkout.customerSignIn(customerDetails);
    return result.body.cart;
};

mergingProcessTest()
    .then((cart) => {
        log("Active cart: " + cart!.id);
        cart!.lineItems.forEach(item => {
            log(item.variant.sku + " :" + item.quantity);
        });
    })
    .catch(log);
