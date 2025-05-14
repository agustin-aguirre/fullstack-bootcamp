import axios from "axios";

export { random }

async function random() {
    const endpoint = "https://secrets-api.appbrewery.com/random"
    
    let data;
    let err;

    try {
        const result = await axios.get(endpoint);
        data = result.data;

    } catch (error) {
        err = error.response.data;
    }

    return { data: data, error: err }
}