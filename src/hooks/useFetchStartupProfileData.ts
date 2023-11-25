import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchStartupProfileData = (_id: string) => {
        return useQuery(['fetch-startup-profile-data'], async () => {
            const data = await axios({
                method: 'GET',
                url: `http://192.168.1.215:2000/api/fetch-startup-profile-data/${_id}`,
            }).then(res => {
                const { startup } = res.data;
                return startup;
            }).catch(err => {
                console.log('Error sending request:', err.message);
                return {};
            });

            return data;
        }, {
            refetchInterval: 3600000,
            staleTime: 3600000,
        }
    );
}