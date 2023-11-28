import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStartupEmployeeData } from './useStartupEmployeeData';
import { StartupEmployeeType } from '../typings/StartupEmployeeType';

export const useGetStartupEmployeeData = () => {
    const { employee } = useStartupEmployeeData();
    const { _id } = employee as StartupEmployeeType;
    
    return useQuery(['get-startup-employee-data', _id], async () => {
        const data = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URI}api/get-employee-data/${_id}`,
        }).then(res => {
            const { employeeData } = res.data;
            return employeeData;
        }).catch(err => {
            console.log('Error sending request:', err.message);
            return {};
        });

        return data;
    }, {
        refetchInterval: 3600000,
        staleTime: 3600000,
    });
}