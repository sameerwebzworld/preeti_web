import createApiClient from "./createApiClient";


const authApi = createApiClient(
    process.env.NEXT_PUBLIC_AUTH_SERVICE_URL!
);


export default authApi;