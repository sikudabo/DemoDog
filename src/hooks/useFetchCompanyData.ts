import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStartupEmployeeData } from './useStartupEmployeeData';
import { StartupEmployeeType } from '../typings/StartupEmployeeType';
import { useShowDialog } from './useShowDialog';
import { useStartupCompanyData } from './useStartupCompanyData';

export const useFetchCompanyData = () => {
    const { employee } = useStartupEmployeeData();
    const { companyId } = employee as StartupEmployeeType;
    const { setDialogTitle, setDialogMessage, setIsError, handleDialogMessageChange } = useShowDialog();

    return useQuery(['fetch-company-data'], async () => {
        const data = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URI}api/fetch-company-data/${companyId}`,
        }).then(res => {
            const { company } = res.data;
            return company;
        }).catch(err => {
            console.log('Error sending request:', err.message);
            setDialogTitle('Error');
            setDialogMessage('There was an error finding your company data!');
            setIsError(true);
            handleDialogMessageChange(true);
            return {};
        });

        return data;
    }, {
        refetchInterval: 1000,
        staleTime: 1000,
    });
}