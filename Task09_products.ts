import { ProductDraft, ProductTypeDraft } from "@commercetools/platform-sdk";
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
        "en": "Product 1"
    },
    "slug": {
        "en": "product_slug_1"
    },
    "masterVariant": {
        "sku": "SKU-1",
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
    "key": "19101995",
    "taxCategory": {
        "typeId": "tax-category",
        "id": "2429fbab-457f-4b5b-893d-2a0e377fd929"
    }
};

const productTypeDraft: ProductTypeDraft = {
    "name": "test_product_type_1",
    "description": "Test product type.",
    "attributes": [
        {
            "name": "size",
            "label": {
                "en": "The right size is important."
            },
            "isRequired": false,
            "type": {
                "name": "text"
            },
            "attributeConstraint": "CombinationUnique",
            "isSearchable": false,
            "inputHint": "SingleLine"
        }
    ]
};

const productTypeId = "c574ae71-2929-4d5f-8e26-36ba4ce2d646";

// products.createProduct(productDraft).then(log).catch(log);

// products.getProductByKey(productDraft.key!).then(log).catch(log);

// products.updateProductByKey(productDraft.key!).then(log).catch(log);

// products.deleteProductByKey(productDraft.key!).then(log).catch(log);

// products.createProductType(productTypeDraft).then(log).catch(log);

// products.getProductTypeById(productTypeId).then(log).catch(log);

products.publishProduct(productDraft.key!).then(log).catch(log);