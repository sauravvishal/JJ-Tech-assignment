import { apiRoot } from "./handson/client";
import { getStoreByKey, getCustomersInStore, createInStoreCart } from "./handson/store";
import { customer } from "./handson/customer";
import { log } from "./utils/logger";

const storeKey = "dach";

getStoreByKey(storeKey).then(log).catch(log);

// getCustomersInStore(storeKey)
//     .then(customers => {
//         log(customers.body.count);
//         customers.body.results.forEach(customer =>
//             log(customer.id)
//         )
//     })
//     .catch(log);

// customer.getCustomerByKey("testVishal")
//     .then(customer => {
//         createInStoreCart(storeKey, customer)
//             .then(log)
//             .catch(log);
//     })
//     .catch(log);