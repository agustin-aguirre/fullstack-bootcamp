import axios from "axios";

export { get, post, put, patch, remove }


const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "b9ae6282-0e70-457d-91fc-c9a03d8c7f97";
const config = {
    headers: { 
        Authorization: `Bearer ${yourBearerToken}` 
    },
};


async function get(id) {
    try {
        const result = await axios.get(`${API_URL}/secrets/${id}`, config);
        return result.data;
    } catch (error) {
        return error.response.data;
    }
}


async function post(newSecret) {
    try {
        const {data} = await axios.post(`${API_URL}/secrets`, newSecret, config)
        return data;
    }
    catch (error) {
        return error.response.data;
    }
}


async function put(id, updatedSecret) {
    try {
        const {data} = await axios.put(`${API_URL}/secrets/${id}`, updatedSecret, config);
        return data;
    }
    catch (error) {
        return error.response.data;
    }
}


async function patch(id, updatedFields) {
    try {
        const {data} = await axios.patch(`${API_URL}/secrets/${id}`, updatedFields, config);
        return data;
    }
    catch (error) {
        return error.response.data;
    }
}


async function remove(id) {
    try {
        const {data} = await axios.delete(`${API_URL}/secrets/${id}`, config);
        return data;
    }
    catch (error) {
        return error.response.data;
    }
}