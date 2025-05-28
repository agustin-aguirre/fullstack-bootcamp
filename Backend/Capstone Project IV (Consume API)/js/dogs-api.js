import axios from "axios"

export { randomDog, supportedExtensions }

const supportedExtensions = [ 'jpg', 'png', 'mp4', 'gif', 'JPG', 'PNG', 'jpeg', 'webm', 'jfif' ];

const API_URL = "https://random.dog/";

const ENDPOINT = API_URL + "woof"


function getExtension(resource) {
    return resource.split(".")[1];
}

function getMediaType(extension) {
    return extension.toString().toLowerCase() == "mp4" ? "video" : "image";
}


function ResponseData(resource) {
    this.url = API_URL + resource;
    this.resource = resource;
    this.extension = getExtension(resource);
    this.mediaType = getMediaType(this.extension);
}


async function randomDog() {
    const result = {
        data: null,
        error: null
    };

    try {
        const response = await axios.get(ENDPOINT);
        result.data = new ResponseData(response.data);
    }
    catch (error) {
        result.error = error.response.data;
    }
    
    return result;
}