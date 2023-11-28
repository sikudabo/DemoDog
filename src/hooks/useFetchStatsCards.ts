import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CompanyType, useStartupCompanyData } from './useStartupCompanyData';

export const useFetchStatsCards = () => {
    const { company } = useStartupCompanyData();
    const { _id } = company as CompanyType;

    return useQuery(['get-company-stats-cards', _id], async () => {
        const result = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URI}api/get-company-stats-cards/${_id}`,
        }).then(res => {
            console.log('The return data is:', res.data);
            return res.data;
        });

        return result;
    }, {
        refetchInterval: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 60 * 24,
    });
}