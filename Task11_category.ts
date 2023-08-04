import { TaxCategoryDraft, CategoryDraft } from "@commercetools/platform-sdk";
import { category } from "./handson/category";
import { log } from "./utils/logger";

const categoryDraft: CategoryDraft = {
    key: "plant-seeds",
    name: {
        "de": "plant-seeds"
    },
    slug: {
        "de": "plant-seeds"
    }
};


// category.createCategory(categoryDraft).then(log).catch(log);

category.getCategoryByKey(categoryDraft.key!).then(log).catch(log);
