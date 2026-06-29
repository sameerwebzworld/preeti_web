import createApiClient from "./createApiClient";


const productApi = createApiClient(
    process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL!
);


export default productApi;