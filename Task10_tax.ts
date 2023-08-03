import { TaxCategoryDraft, DiscountCodeDraft } from "@commercetools/platform-sdk";
import { taxCategory } from "./handson/taxCategory";
import { log } from "./utils/logger";

const taxCategoryDraft: TaxCategoryDraft = {
    "name": "regular",
    "rates": [
        {
            "name": "20% incl.",
            "amount": 0.2,
            "includedInPrice": true,
            "country": "NL",
            "subRates": []
        }
    ],
    "key": "regular"
};

const disCode: DiscountCodeDraft = {
    code: "SUMMER",
    cartDiscounts: [{
        typeId: 'cart-discount',
        id: "8e6f4f09-8d05-408d-8161-d1083e39cfd6"
    }]
}

// taxCategory.createTaxCategory(taxCategoryDraft).then(log).catch(log);

// taxCategory.getTaxCategoryByKey("regular").then(log).catch(log);

// taxCategory.createDiscountCode(disCode).then(log).catch(log);

// 8e6f4f09-8d05-408d-8161-d1083e39cfd6