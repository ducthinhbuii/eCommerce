import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../ultis/api";

const useFetch = (url, token) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        fetchData()
    }, [url])

    async function fetchData(){
        setIsLoading(true);
        setData(null);
        setError(null);
        try {
            const data = await fetchDataFromAPI(url, jwt);
            if (data?.error) {
                throw new Error(data?.message || "Something went wrong");
            }
            setIsLoading(false)
            setData(data);
        } catch (error) {
            setIsLoading(false)
            setError(error?.message || "Something went wrong");
        }
    }

    return {data, isLoading, error}
}

export default useFetch