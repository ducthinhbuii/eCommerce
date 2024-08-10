import { useEffect, useState } from "react";
import { postDataToAPI } from "../ultis/postApi";

const usePost = (url, body) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        fetchData()
    }, [url])

    async function fetchData(){
        console.log('ok')
        setIsLoading(true);
        setData(null);
        setError(null);
        try {
            console.log(url)
            const data = await postDataToAPI(url, body, jwt);
            setIsLoading(false)
            setData(data);
        } catch (error) {
            setIsLoading(false)
            setError("Error");
        }
    }

    return {data, isLoading, error}
}

export default usePost