import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getListUserApi = async (params) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}?page=${params}&limit=10`,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const findByUserIdApi = async (params) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/${params}`,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const addUserApi = async (params) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}`,
        params: { id: params.id },
        data: params,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const updateUserApi = async (params) => {
    return axios({
        method: "PUT",
        url: `${BASE_URL}/${params.id}`,
        params: { id: params.id },
        data: params,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const deleteUserApi = async (params) => {
    return axios({
        method: "DELETE",
        url: `${BASE_URL}/${params}`,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const searchUserApi = async (params) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}`,
        params: params,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
