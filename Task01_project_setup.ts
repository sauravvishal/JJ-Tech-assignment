import { log } from "./utils/logger";
import { apiRoot } from "./handson/client";
import { taxCategory } from "./handson/taxCategory";
import { shipping } from "./handson/shippingMethod";

// TODO: Complete the functions in
// ./handson/client.ts

// So this code displays the project configuration
// https://docs.commercetools.com/api/projects/project#get-project

// TODO: Get project settings
export const getProjectSettings = () => apiRoot.get().execute();

getProjectSettings().then(log).catch(log);

// TODO: Get shipping method by id
// shipping.getShippingMethodByKey("f4568408-ad62-4990-8e09-4040d420dff2").then(log).catch(log);


// TODO: Get standard tax category by key
// taxCategory.getTaxCategoryByKey("standard").then(log).catch(log);