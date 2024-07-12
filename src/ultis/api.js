import axios from "axios";

const BASE_URL = "https://8081-idx-movie-project-1717140701197.cluster-bs35cdu5w5cuaxdfch3hqqt7zm.cloudworkstations.dev";

export const fetchDataFromAPI = async(url, params, token, cookie) => {
    try {
        const {data} = await axios.get(
            BASE_URL + url,
            {
                headers: {
                    Authorization: "bearer " + token,
                    Cookie: cookie
                },
                params
            }
        )
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}