import { ProductDraft } from "@commercetools/platform-sdk";
import { products } from "./handson/product";
import { log } from "./utils/logger";

const productDraft: ProductDraft = {
    "productType": {
        "id": "b573760e-325c-422e-a3af-72230a7f3104",
        "typeId": "product-type"
    },
    "categories": [{
        "typeId": "category",
        "id": "200527d7-b568-446e-969d-d83c94682ddb"
    }],
    "name": {
        "en": "Product 3"
    },
    "slug": {
        "en": "product_slug_3"
    },
    "masterVariant": {
        "sku": "SKU-3",
        "prices": [{
            "value": {
                "currencyCode": "EUR",
                "centAmount": 4200
            }
        }],
        "images": [{
            "url": "https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/073207_1_large.jpg",
            "label": "Master Image",
            "dimensions": {
                "w": 303,
                "h": 197
            }
        }]
    },
    "variants": [{
        "images": [{
            "url": "https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/073207_1_large.jpg",
            "label": "Variant Image",
            "dimensions": {
                "w": 303,
                "h": 197
            }
        }]
    }],
    "key": "12345678"
};

products.createProduct(productDraft).then(log).catch(log);

products.getProductByKey(productDraft.key!).then(log).catch(log);

products.updateProductByKey(productDraft.key!).then(log).catch(log);

products.deleteProductByKey(productDraft.key!).then(log).catch(log);
