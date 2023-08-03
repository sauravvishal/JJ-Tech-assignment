import { apiRoot } from "./client";
import { ClientResponse, Product, ProductDraft, ProductUpdate } from "@commercetools/platform-sdk";

class Products {
    createProduct = (productDraft: ProductDraft): Promise<ClientResponse<Product>> => apiRoot.products().post({ body: productDraft }).execute();

    getProductByKey = (key: string): Promise<ClientResponse<Product>> => apiRoot.products().withKey({ key }).get().execute();

    updateProductByKey = async (key: string): Promise<ClientResponse<any>> => {
        const product = (await apiRoot.products().withKey({ key }).get().execute()).body;
        const productUpdate: ProductUpdate = {
            version: product.version,
            actions: [{
                action: 'changeName',
                name: {
                    en: 'product_03',
                }
            }
            ]
        };
        return apiRoot.products().withKey({ key }).post({
            body: productUpdate
        }).execute();
    }

    deleteProductByKey = async (key: string): Promise<ClientResponse<any>> => {
        const product = (await apiRoot.products().withKey({ key }).get().execute()).body;
        return apiRoot.products().withKey({ key }).delete({
            queryArgs: { version: product.version }
        }).execute();
    }
}

export const products = new Products();

