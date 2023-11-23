import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStartupEmployeeData } from './useStartupEmployeeData';
import { StartupEmployeeType } from '../typings/StartupEmployeeType';
import { useShowDialog } from './useShowDialog';

export const useFetchCompanyData = () => {
    const { employee } = useStartupEmployeeData();
    const { companyId } = employee as StartupEmployeeType;
    const { setDialogTitle, setDialogMessage, setIsError, handleDialogMessageChange } = useShowDialog();

    return useQuery(['fetch-company-data', companyId], async () => {
        const data = await axios({
            method: 'GET',
            url: `http://192.168.1.215:2000/api/fetch-company-data/${companyId}`,
        }).then(res => {
            const { company } = res.data;
            console.log('the company data is', company);
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
        refetchInterval: 3600000,
    });
}