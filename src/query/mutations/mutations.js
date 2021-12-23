import * as Api from '../api';
import {USER_CREATE, USER_DELETE, USER_UPDATE, USERS_KEY} from "../config/keys";

export default (queryClient, queryConfig) => {
    queryClient.setMutationDefaults(USER_DELETE, {
        mutationFn: (payload) =>
            Api.deleteUser(payload, queryConfig).then((newTx) => ({
                address: payload.sender,
                ...newTx,
            })),

        onSettled: (_newItem, _err) => {
            queryClient.invalidateQueries(USERS_KEY);
        },
    });

    queryClient.setMutationDefaults(USER_UPDATE, {
        mutationFn: (payload) =>
            Api.updateUser(payload, queryConfig).then((newTx) => ({
                address: payload.sender,
                ...newTx,
            })),

        onSettled: (_newItem, _err) => {
            queryClient.invalidateQueries(USERS_KEY);
        },
    });

    queryClient.setMutationDefaults(USER_CREATE, {
        mutationFn: (payload) =>
            Api.createUser(payload, queryConfig).then((newTx) => ({
                address: payload.sender,
                ...newTx,
            })),

        onSettled: (_newItem, _err) => {
            queryClient.invalidateQueries(USERS_KEY);
        },
    });
}

