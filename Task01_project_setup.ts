import { log } from "./utils/logger";
import { apiRoot } from "./handson/client";

// TODO: Complete the functions in
// ./handson/client.ts

// So this code displays the project configuration
// https://docs.commercetools.com/api/projects/project#get-project

// TODO: Get project settings
apiRoot.get().execute()
    .then(res => log(res))
    .catch(err => log(err));

// TODO: Get shipping method by id


// TODO: Get standard tax category by key

