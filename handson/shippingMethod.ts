import { apiRoot } from "./client";
import { ClientResponse, ShippingMethod } from "@commercetools/platform-sdk";

class Shipping {
    getShippingMethodByKey = (ID: string): Promise<ClientResponse<ShippingMethod>> => apiRoot.shippingMethods().withId({ ID }).get().execute();
}

export const shipping = new Shipping();