import axios from "axios";

const BASE_URL = "https://be-ecommerce-zyst.onrender.com";

export const postDataToAPI = async(url, body, token, cookie, params) => {
    try {
        console.log(url)
        console.log(body)
        const {data} = await axios.post(
            BASE_URL + url,
            body,
            {
                headers: {
                    Authorization: "bearer " + token,
                    Cookie: cookie
                },
                params,
                withCredentials: true
            }
        )
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}