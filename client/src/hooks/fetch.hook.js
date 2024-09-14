import axios from "axios";
import { useEffect, useState } from "react";
import { getUserId } from '../helper/helper.js'; // Assuming getUserId retrieves the _id from local storage

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** custom hook */
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));

                const userId = await getUserId();

                const { data, status } = !query ? 
                    await axios.get(`/api/user/${userId}`) : 
                    await axios.get(`/api/${query}`);

                if (status === 200) {
                    setData({ isLoading: false, apiData: data, status });
                } else {
                    setData({ isLoading: false, serverError: 'Server Error' });
                }
            } catch (error) {
                setData({ isLoading: false, serverError: error });
            }
        };
        
        fetchData();
    }, [query]);

    return [getData, setData];
}
