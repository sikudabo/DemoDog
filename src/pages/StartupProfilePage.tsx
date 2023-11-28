import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LikeIcon from '@mui/icons-material/ThumbUp'; 
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useFetchStartupProfileData, useIsLoading, useOrganizationData, useShowDialog } from '../hooks';
import { Backdrop, CircularProgress } from '@mui/material';
import { StartupEmployeeType } from '../typings/StartupEmployeeType';
import { CompanyType } from '../hooks/useStartupCompanyData';
import { DemoDogButton, StartupProfileEmployeesTable, StartupProfilesDemosTable } from '../components';
import { OrganizationType } from '../typings/OrganizationType';
import { postNonBinaryData } from '../utils/requests';

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

      .top-avatar-container {
        height: 200px;
        width: 200px;

        .top-avatar {
            height: 100%;
            width: 100%;
        }
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

    .team-table-container {
        padding-left: 10px;
        padding-right: 10px;
        width: 100vw;
    }

    .like-company-section {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100vw;
    }
`;

type StartupProfilePageDisplayLayerProps = {
    demos: Array<any>;
    employees: Array<StartupEmployeeType>;
    handleOrganizationLike: () => void;
    inLikes: boolean;
    isLoading: boolean;
    organizationIsLoggedIn: boolean;
    startupCompanyData: CompanyType;
};

export default function StartupProfilePage() {
    const { _id } = useParams();
    return <StartupProfilePage_DisplayLayer {...useDataLayer(_id as string)} />;
}

function StartupProfilePage_DisplayLayer({
    demos,
    employees,
    handleOrganizationLike,
    inLikes,
    isLoading,
    organizationIsLoggedIn,
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
                <div className="top-avatar-container">
                    <Avatar alt="Company avatar" className="top-avatar" src={`http://192.168.1.215:2000/api/get-photo/${avatar}`} />
                </div>
            </div>
            <div className="company-name-section">
                <p className="company-name">{companyName}</p>
            </div>
            <div className="like-company-section">
                {organizationIsLoggedIn && !inLikes && (
                    <Button color="secondary" onClick={handleOrganizationLike} startIcon={<LikeIcon />} variant="outlined">
                        Like 
                    </Button>
                )}
            </div>
            <div className="company-description-section">
                <p className="company-description-section-text">{description}</p>
            </div>
            <div className="team-table-container">
                <StartupProfileEmployeesTable employees={employees} />
            </div>
            <div className="demos-table-container">
                <StartupProfilesDemosTable demos={demos} />
            </div>
       </Container>
    );
}

function useDataLayer(_id: string) {
    const queryClient = useQueryClient();
    const { setIsLoading } = useIsLoading();
    const { setIsError, handleDialogMessageChange, setDialogMessage, setDialogTitle } = useShowDialog();
    const { organization } = useOrganizationData();
    const { _id: organizationId } = organization as OrganizationType;
    let inLikes = false;
    const { data, isLoading } = useFetchStartupProfileData(_id);
    const { demos, employees, startupCompanyData } = typeof data!== 'undefined' &&!isLoading ? data : {
        demos: [],
        employees: [] ,
        startupCompanyData: {},
    };

    async function handleOrganizationLike() {
        const { _id } = startupCompanyData;
        console.log('The organizationId is:', organization);
        setIsLoading(true);

        await postNonBinaryData({
            data: {
                _id,
                organizationId,
            },
            endpoint: 'api/add-company-like',
        }).then(() => {
            setIsLoading(false);
            queryClient.invalidateQueries(['get-startup-profile-data']);
        }).catch(err => {
            console.log(err.message);
            setIsLoading(false);
            setIsError(true);
            setDialogTitle('Error');
            setDialogMessage('There was an error like the company! Please try again.');
            handleDialogMessageChange(true);
        });
    }

    if (typeof startupCompanyData !== 'undefined' && typeof startupCompanyData.inLikes !== 'undefined') {
        inLikes = !startupCompanyData.inLikes.includes(organizationId);
    }

    console.log('InLikes is:', inLikes);

    return {
        data,
        demos,
        employees,
        handleOrganizationLike,
        inLikes,
        isLoading,
        organizationIsLoggedIn: typeof organization !== 'undefined' && typeof (organization as OrganizationType)._id! == 'undefined',
        startupCompanyData,
    };
}