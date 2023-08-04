import { apiRoot } from "./client";
import { ClientResponse, Category, CategoryDraft } from "@commercetools/platform-sdk";

class Categories {
    getCategoryByKey = (key: string): Promise<ClientResponse<Category>> => apiRoot.categories().withKey({ key }).get().execute();

    createCategory = (categoryDraft: CategoryDraft): Promise<ClientResponse<Category>> => apiRoot.categories().post({ body: categoryDraft }).execute();
}

export const category = new Categories();