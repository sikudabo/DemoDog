import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import { useFetchStartupProfileData } from '../hooks';
import { Backdrop, CircularProgress } from '@mui/material';
import { StartupEmployeeType } from '../typings/StartupEmployeeType';
import { CompanyType } from '../hooks/useStartupCompanyData';
import { StartupEmployeesTable } from '../components';

const Container = styled.div`
    padding-top: 100px;
`;

type StartupProfilePageDisplayLayerProps = {
    demos: Array<any>;
    employees: Array<StartupEmployeeType>;
    isLoading: boolean;
    startupCompanyData: CompanyType;
};

export default function StartupProfilePage() {
    const { _id } = useParams();
    return <StartupProfilePage_DisplayLayer {...useDataLayer(_id as string)} />;
}

function StartupProfilePage_DisplayLayer({
    demos,
    employees,
    isLoading,
    startupCompanyData,
}: StartupProfilePageDisplayLayerProps) {

    if (isLoading) {
        return (
            <Backdrop open={true} style={{ color: '#fff', zIndex: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
                    <CircularProgress color="inherit" />
                </div>
            </Backdrop>
        );
    }

    return (
       <Container>
            <div>
                Company profile
            </div>
       </Container>
    );
}

function useDataLayer(_id: string) {
    const { data, isLoading } = useFetchStartupProfileData(_id);
    const { demos, employees, startupCompanyData } = typeof data!== 'undefined' &&!isLoading ? data : {
        demos: [],
        employees: [] ,
        startupCompanyData: {},
    };

    console.log('The data is:', data);

    return {
        data,
        demos,
        employees,
        isLoading,
        startupCompanyData,
    };
}