import {httpClient} from './utils';
import {userBuilder, USERS,} from './routes';
import {toast} from "react-toastify";
import moment from "moment";

export const getAllUsers = async ({API_HOST}) => {
    return toast.promise(new Promise(async (resolve, reject) => {
            httpClient(API_HOST).get(USERS).then((e) => resolve(e)).catch((e) => {
                console.log(e)
                reject(e)
            })

        })
        ,
        {
            pending: `Fetching Users`,
            success: `Users Fetched Successfully`,
            error: `Failed to Fetch Users`,

        })
};

export const deleteUser = async ({id}, {API_HOST}) => {
    return toast.promise(new Promise(async (resolve, reject) => {
            httpClient(API_HOST).delete(
                userBuilder(id)
            ).then((e) => resolve(e)).catch((e) => {
                console.log(e)
                reject(e)
            })

        })
        ,
        {
            pending: `Deleting User`,
            success: `User Deleted Successfully`,
            error: `Failed to Delete User`,

        })
};

export const updateUser = async ({userId, firstName, lastName, emailAddress, phoneNumber, birthDate}, {API_HOST}) => {
    return toast.promise(new Promise(async (resolve, reject) => {
            httpClient(API_HOST).put(
                userBuilder(userId),
                {
                    firstName, lastName, emailAddress, phoneNumber, birthDate: moment(birthDate).add(1,'day')
                }
            ).then((e) => resolve(e)).catch((e) => {
                console.log(e)
                reject(e)
            })

        })
        ,
        {
            pending: `Updating User`,
            success: `User Updated Successfully`,
            error: `Failed to Update User`,

        })
};


export const createUser = async (payload, {API_HOST}) => {
    return toast.promise(new Promise(async (resolve, reject) => {
            httpClient(API_HOST).post(
                USERS,
                payload
            ).then((e) => resolve(e)).catch((e) => {
                console.log(e)
                reject(e)
            })

        })
        ,
        {
            pending: `Creating User`,
            success: `User Created Successfully`,
            error: `Failed to Create User`,

        })
};
