import axios from "axios";

export { search, getCoverUrl }

const bookSearchEndpoint = "https://openlibrary.org/search.json"
const coversEndpoint = "https://covers.openlibrary.org/b";



async function endpointGet(endpoint, config) {
    console.log("Fetching: " + endpoint);
    try {
        return (await axios.get(endpoint, config));
    }
    catch (error) {
        console.error("Book Search API request failed: ", error.message);
        throw error;
    }
}

function getCoverUrl(idType, idValue, size) {
    return new URL(`${coversEndpoint}/${idType}/${idValue}-${size}.jpg`);
}


async function search(searchTerm) {
    const endpoint = new URL(bookSearchEndpoint);
    endpoint.searchParams.append("q", new String(searchTerm).trim().replaceAll(" ", "+"));
    return await endpointGet(endpoint);
}