import { FacetRange, FacetTerm, ProductProjection } from "@commercetools/platform-sdk";
import { apiRoot } from "./handson/client";
import { simulateSearch } from "./handson/search";
import { log } from "./utils/logger";
import {category} from "./handson/category";


const search = async () => {

    const categoryId = (await category.getCategoryByKey("plant-seeds")).body.id;
    console.log("===categoryId====", categoryId)
    const searchParams = {
        "staged": false,
        "markMatchingVariants": true,

        // For better performance do not calculate total
        "withTotal": false,

        // Restrict on category plant-seeds and price range with effects on facets
        "filter.query": [
            "categories.id:\"" + categoryId + "\"",
            "variants.price.centAmount:range (100 to 100000)"
        ],

        // Simulate click on facet box from attribute size
        // "filter.facets": "variants.attributes.size:\"box\"",

        // Get all Facets for Enum size, Number weight_in_kg and productType 
        "facet": [
            "variants.attributes.size as Size",
            "variants.attributes.weight_in_kg:range (0 to 1), (1 to 5), (5 to 20) as Weight",
            "slug.en:\"carrot-seeds\" as Product_is_CarrotSeed",
            "variants.attributes.size:\"box\" as Size_is_Box",
            "searchKeywords.en.text:\"basil\" as Keyword_contains_Basil"
        ],

        // Give price range on products with no effect on facets
        "filter": "variants.price.centAmount:range (100 to 100000)",
    }

    const productProjectionPagedQueryResult = (await simulateSearch(searchParams)).body;
    const products = productProjectionPagedQueryResult.results;
    const facets = productProjectionPagedQueryResult.facets;

    log(">>>>>>>>>>");
    log(`No. of products found: ${products.length}`);
    log("Found products:");
    log(products.map(product =>
        `${countMatchingVariantsIn(product)} matching variant(s) in ${product.key}`));

    const facetObjects = Object.entries(facets);

    log(`No.of facets: ${facetObjects.length} `);

    for (const [facet, facetResult] of facetObjects) {

        log(`Facet: ${facet} `);

        if (facetResult.type === "terms") {

            const { terms } = facetResult;

            log(`No.of ${facet} terms: ${terms.length}`);
            log(terms.map(term => formatTermFields(term, facet)));


        } else if (facetResult.type === "range") {

            const { ranges } = facetResult;

            log(`No.of ${facet} ranges: ${ranges.length}`);
            log(ranges.map(range => formatRangeFields(range, facet)));

        } else if (facetResult.type === "filter") {

            log(`No.of variants: ${facetResult.count}`);
        }
    }

    log("<<<<<<<<<<");

};


const countMatchingVariantsIn =
    ({ masterVariant, variants }: ProductProjection) =>
        [...variants.map(variant => variant.isMatchingVariant),
        masterVariant.isMatchingVariant]
            .filter(matching => matching).length;

const formatTermFields =
    ({ count, term }: FacetTerm, facet: string) =>
        `${count} variant(s) with ${facet} ${term}`;

const formatRangeFields = ({ from, to, count }: FacetRange, facet: string) =>
    `${count} variant(s) with ${facet} in range [${from} to ${to})`;

search();