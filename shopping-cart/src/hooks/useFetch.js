import { useEffect, useState } from "react";
import { axiosInstance } from "../services";


export const useFetch = (URL) => {
    const [state, setState] = useState({
        data: [],
        isLoading: false,
        isError: false
    })

    const getApi = async () => {
        setState((prev) => ({...prev, isLoading: true}));
        try {
            const { data } = await axiosInstance.get(URL);
            setState({ data, isLoading: false, isError: false});
        } catch {
            setState((prev) => ({...prev, isError: true}));
        }
    }

    useEffect(() => {
        getApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [URL]);

    return [...state]
}