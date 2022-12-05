import axios from "axios";
import { baseUrl } from "./base.url";

export const healthRoute = async () => {
    return axios.get(`${baseUrl}/`);
}

export const getUsersRoute = async () => {
    return axios.get(`${baseUrl}/users`);
}

export const getGroupsRoute = async () => {
    return axios.get(`${baseUrl}/groups`);
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