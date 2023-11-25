import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchAllStartups = () => {
    return useQuery(['fetchAllStartups'], async () => {
        const result = await axios({
            method: 'GET',
            url: 'http://192.168.1.215:2000/api/fetch-all-startups',
        }).then((res) => {
            const { startups } = res.data;
            return startups;
        }).catch((err) => {
            console.log(err);
            const { isError, message } = err.response.data;
            return { isError, message };
        });

        return result;
    }, {
        refetchInterval: 3600000,
        staleTime: 3600000,
    });
}