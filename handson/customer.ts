import { apiRoot } from "./client";
import { ClientResponse, Customer, CustomerDraft, CustomerSignInResult, CustomerToken, CustomerGroup } from "@commercetools/platform-sdk";

class Customers {
    getCustomerById = (ID: string): Promise<ClientResponse<Customer>> => apiRoot.customers().withId({ ID }).get().execute();

    getCustomerByKey = (key: string): Promise<ClientResponse<Customer>> => apiRoot.customers().withKey({ key }).get().execute();

    createCustomer = (customerDraft: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => apiRoot.customers().post({ body: customerDraft }).execute();

    createCustomerToken = (customer: ClientResponse<Customer>): Promise<ClientResponse<CustomerToken>> => {
        return apiRoot.customers().emailToken().post({
            body: {
                id: customer.body.id,
                ttlMinutes: 60
            }
        }).execute();
    }

    confirmCustomerEmail = (token: ClientResponse<CustomerToken>): Promise<ClientResponse<Customer>> => {
        return apiRoot.customers().emailConfirm().post({
            body: {
                tokenValue: token.body.value
            }
        }).execute();
    }

    // getCustomerAndCustomerGroup = async (customerKey: string, customerGroupKey: string): Promise<any> => {
    //     try {
    //         const [customer, customerGroup] = await Promise.all([
    //             apiRoot.customers().withKey({ key: customerKey }).get().execute(),
    //             apiRoot.customerGroups().withKey({ key: customerGroupKey }).get().execute()
    //         ]);
    //         return { customer: customer.body, customerGroup: customerGroup.body };
    //     } catch (error) {
    //         return { customer: [], customerGroup: [] };
    //     }
    // }

    // assignCustomerToCustomerGroup = async (customerKey: string, customerGroupKey: string): Promise<ClientResponse<Customer>> => {
    //     const { customer, customerGroup } = await this.getCustomerAndCustomerGroup(customerKey, customerGroupKey);

    //     customer.customerGroup = {
    //         typeId: 'customer-group',
    //         id: customerGroup.id
    //     };

    //     return apiRoot.customers().withId({ ID: customer.id }).post({
    //         body: {
    //             version: customer.version,
    //             actions: [{
    //                 action: 'setCustomerGroup',
    //                 customerGroup: customerGroup
    //             }]
    //         }
    //     }).execute()
    // }
}

export const customer = new Customers();

