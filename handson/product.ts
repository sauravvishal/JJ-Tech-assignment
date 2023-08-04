import { apiRoot } from "./client";
import { ClientResponse, Product, ProductDraft, ProductUpdate, ProductTypeDraft, ProductType, ProductPagedQueryResponse } from "@commercetools/platform-sdk";

class Products {
    createProduct = (productDraft: ProductDraft): Promise<ClientResponse<Product>> => apiRoot.products().post({ body: productDraft }).execute();

    getProductByKey = (key: string): Promise<ClientResponse<Product>> => apiRoot.products().withKey({ key }).get().execute();

    updateProductByKey = async (key: string): Promise<ClientResponse<any>> => {
        const product = (await this.getProductByKey(key)).body;
        console.log({product})
        const productUpdate: ProductUpdate = {
            version: product.version,
            actions: [{
                action: 'changeSlug',
                slug: {
                    en: 'product_02_slug',
                },
                staged: true
            }]
        };
        return apiRoot.products().withKey({ key }).post({
            body: productUpdate
        }).execute();
    }

    deleteProductByKey = async (key: string): Promise<ClientResponse<any>> => {
        const product = (await this.getProductByKey(key)).body;
        return apiRoot.products().withKey({ key }).delete({
            queryArgs: { version: product.version }
        }).execute();
    }

    createProductType = (productTypeDraft: ProductTypeDraft): Promise<ClientResponse<ProductType>> => {
        return apiRoot.productTypes().post({
            body: productTypeDraft
        }).execute();
    }

    getProductTypeById = (ID: string): Promise<ClientResponse<ProductType>> => apiRoot.productTypes().withId({ ID }).get().execute();

    publishProduct = async (key: string): Promise<ClientResponse<Product>> => {
        const product = (await this.getProductByKey(key)).body;
        return apiRoot.products().withKey({ key }).post({
            body: {
                version: product.version,
                actions: [{
                    action: 'publish'
                }]
            }
        }).execute();
    }


    getAllProduct = (): Promise<ClientResponse<ProductPagedQueryResponse>> => apiRoot.products().get().execute();
}

export const products = new Products();

