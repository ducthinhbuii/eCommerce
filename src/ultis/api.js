import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_BACKEND_BASE_URL;

export const fetchDataFromAPI = async (url, token, cookie, params) => {
    console.log(BASE_URL);
    try {
        const {data} = await axios.get(
            BASE_URL + url,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    Cookie: cookie
                },
                params,
            }
        )
        if(typeof data === 'string'){
            return {error: true, msg: 'Not found'}
        }
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message
        };
    }
}