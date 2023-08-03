import { apiRoot } from "./client";
import { ClientResponse, TaxCategory, TaxCategoryDraft, DiscountCode, DiscountCodeDraft } from "@commercetools/platform-sdk";

class TaxCategories {
    getTaxCategoryByKey = (key: string): Promise<ClientResponse<TaxCategory>> => apiRoot.taxCategories().withKey({ key }).get().execute();

    createTaxCategory = (taxCtegoryDraft: TaxCategoryDraft): Promise<ClientResponse<TaxCategory>> => apiRoot.taxCategories().post({ body: taxCtegoryDraft }).execute();

    createDiscountCode = (discountCodeDraft: DiscountCodeDraft): Promise<ClientResponse<DiscountCode>> => apiRoot.discountCodes().post({ body: discountCodeDraft }).execute();
}

export const taxCategory = new TaxCategories();

