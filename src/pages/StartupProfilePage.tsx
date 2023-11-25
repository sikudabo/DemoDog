import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import truncate from 'lodash/truncate';
import { useParams } from 'react-router-dom';
import { useFetchStartupProfileData } from '../hooks';
import { Backdrop, CircularProgress } from '@mui/material';
import { StartupEmployeeType } from '../typings/StartupEmployeeType';
import { CompanyType } from '../hooks/useStartupCompanyData';
import { StartupEmployeesTable } from '../components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 100px;
    width: 100vw;

    .top-avatar-section {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 20px;
        width: 100%;

      .top-avatar {
        height: 200px;
        width: 200px;
      }
    }

    .company-name-section {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
        text-align: center;
        width: 100%;

        .company-name {
            font-size: 40px;
            font-weight: 900;
        }
    }

    .company-description-section {
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
        text-align: left;
        width: 100%;

        .company-description-section-text {
            font-size: 24px;
            font-weight: normal;
        }
    }
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

    const { avatar, companyName, description } = typeof startupCompanyData !== 'undefined' ? startupCompanyData : {
        avatar: '',
        companyName: '',
        description: '',
    };

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
            <div className="top-avatar-section">
                <Avatar alt="Company avatar" className="top-avatar" src={`http://192.168.1.215:2000/api/get-photo/${avatar}`} />
            </div>
            <div className="company-name-section">
                <p className="company-name">{companyName}</p>
            </div>
            <div className="company-description-section">
                <p className="company-description-section-text">{description}</p>
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

    return {
        data,
        demos,
        employees,
        isLoading,
        startupCompanyData,
    };
}