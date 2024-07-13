import axios from "axios";

const BASE_URL = "https://be-ecommerce-zyst.onrender.com";

export const fetchDataFromAPI = async(url, token, cookie, params) => {
    try {
        const {data} = await axios.get(
            BASE_URL + url,
            {
                headers: {
                    Authorization: "Bearer " + token,
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