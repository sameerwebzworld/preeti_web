import createApiClient from "./createApiClient";


console.log(
 "AUTH URL:",
 process.env.NEXT_PUBLIC_AUTH_SERVICE_URL
);

const authApi = createApiClient(
    process.env.NEXT_PUBLIC_AUTH_SERVICE_URL!
);


export default authApi;