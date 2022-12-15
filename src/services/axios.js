import axios from "axios";
import { baseUrl } from "./base.url";

export const healthRoute = async () => {
    return axios.get(`${baseUrl}/`);
}

export const getUsersRoute = async () => {
    return axios.get(`${baseUrl}/users`);
}

export const userDetailRoute = async (userId) => {
    return axios.get(`${baseUrl}/user/${userId}`);
}

export const getGroupsRoute = async (ownerId, category) => {
    return axios.get(`${baseUrl}/groups`, {
        params: {ownerId, category}
    });
}

export const createUserRoute = async (user) => {
    return axios.post(`${baseUrl}/users`, {
        ...user
    });
}

export const createGroupRoute = async (group) => {
    return axios.post(`${baseUrl}/groups`, {
        ...group
    });
}

export const groupDetailRoute = async (groupId) => {
    return axios.get(`${baseUrl}/groups/${groupId}`);
}

export const userLogin = async (email, password) => {
    return axios.post(`${baseUrl}/users/login`, {
        email, password
    });
}

export const deleteUserRoute = async (userId) => {
    return axios.put(`${baseUrl}/users/delete/${userId}`);
}

export const deleteGroupRoute = async (groupId, ownerId) => {
    return axios.put(`${baseUrl}/groups/delete/${groupId}`, {
        ownerId
    });
}

export const updateUserRoute = async (userId, userUpdated) => {
    return axios.put(`${baseUrl}/users/update/${userId}`, {
        ...userUpdated
    })
}

export const updateGroupRoute = async (groupId, groupUpdated) => {
    return axios.put(`${baseUrl}/groups/update/${groupId}`, {
        ...groupUpdated
    })
}

export const joinGroup = async (groupId, userId) => {
    return axios.put(`${baseUrl}/groups/join/${groupId}`, {
        userId
    })
}

export const exitGroup = async(groupId, userId) => {
    return axios.put(`${baseUrl}/groups/deleteJoinedUser/${groupId}`, {
        userId
    })
}

export const getPayments = async(ownerId) => {
    return axios.get(`${baseUrl}/payments/${ownerId}`)
}