import { CustomerDraft } from "@commercetools/platform-sdk";
import { customer } from "./handson/customer";
import { log } from "./utils/logger";

const customerDraft: CustomerDraft = {
    firstName: "test",
    lastName: "Vishal",
    email: "testvishal@example.com",
    password: "abcd1234",
    key: "testVishal",
    addresses: [
        {
            country: "NL",
            key: "tt-customer-address1"
        }
    ],
    defaultBillingAddress: 0,
    defaultShippingAddress: 0
};

// customer.createCustomer(customerDraft).then(log).catch(log);

// customer.getCustomerByKey(customerDraft.key!).then(log).catch(log);

customer.getCustomerByKey(customerDraft.key!)
    .then(customer.createCustomerToken)
    .then(customer.confirmCustomerEmail)
    .then(log)
    .catch(log);

// customer.assignCustomerToCustomerGroup(customerDraft.key!, "silver")
//     .then(log)
//     .catch(log);
