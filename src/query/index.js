import configureQueryClient from "./queryClient";

const {
    queryClient,
    QueryClientProvider,
    hooks,
    ReactQueryDevtools,
    useMutation,
    API_ROUTES,
} = configureQueryClient({});

export {
    queryClient,
    QueryClientProvider,
    hooks,
    ReactQueryDevtools,
    API_ROUTES,
    useMutation
};
