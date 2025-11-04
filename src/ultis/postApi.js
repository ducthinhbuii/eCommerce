import axios from "axios";
import customApi from "./customApi";

const BASE_URL = import.meta.env.VITE_REACT_BACKEND_BASE_URL;

export const postDataToAPI = async(url, body, token, cookie, params) => {
    try {
        console.log(url)
        console.log(body)
        console.log(token)
        const {data} = await customApi.post(
            url,
            body,
            {
                headers: {
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