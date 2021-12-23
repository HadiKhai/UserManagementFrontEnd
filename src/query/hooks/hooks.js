import {useQuery} from 'react-query';
import * as Api from '../api';
import {buildUsersKey} from '../config/keys';

const configureHooks = (queryClient, queryConfig) => {
    const {retry, cacheTime, staleTime} = queryConfig;
    const defaultOptions = {
        retry,
        cacheTime,
        staleTime,
    };

    const useAllUsers = () =>
        useQuery({
            queryKey: buildUsersKey(),
            queryFn: () => Api.getAllUsers(queryConfig).then(({data}) => data),

            refetchOnWindowFocus: false,

            ...defaultOptions,
        });


    return {
        useAllUsers
    };
};

export default configureHooks;
