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
        if(typeof data === 'string'){
            return {error: true, msg: 'Not found'}
        }
        console.log(data)
        return data;
    } catch (error) {
        console.log('error');
        return {
            error: true,
            message: error.message
        };
    }
}