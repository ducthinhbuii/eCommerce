import axios from "axios";

const BASE_URL = "http://localhost:8081";

export const postDataToAPI = async(url, body, token, cookie, params) => {
    try {
        console.log(url)
        console.log(body)
        console.log(token)
        const {data} = await axios.post(
            BASE_URL + url,
            body,
            {
                headers: {
                    Authorization: "Bearer " + token,
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