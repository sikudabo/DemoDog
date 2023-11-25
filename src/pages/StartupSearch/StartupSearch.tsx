import styled from '@emotion/styled';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { CompanyCard } from '../../components';
import { useFetchAllStartups } from '../../hooks';
import { CompanyType } from '../../hooks/useStartupCompanyData';
import { deviceBreakPointsMaxWidth } from '../../utils/constants';

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 100px;
    width: 100vw;

    .top-header-container {
        text-align: center;
        width: 100vw;

        .top-header-text {
            font-size: 24px;
            font-weight: 900;
        }
    }

    .companies-list-container {
        display: flex;
        flex-direction: row;
        gap: 10px;
        padding-left: 20px;
        padding-right: 20px;
        width: 100%;

        @media ${deviceBreakPointsMaxWidth.laptop}  {
            flex-direction: column;
        }

        .companies-list-item-container {
            width: 33%;

            @media ${deviceBreakPointsMaxWidth.laptop}  {
                width: 100%;
            }

            .companies-list-item {
                height: 100%;
                width: 100%;
                margin-bottom: 10px;
            }
        }
    }
`;

type StartupSearchDisplayLayerProps = {
    isLoading: boolean;
    startups: Array<CompanyType>;
};

export default function StartupSearch() {
    return <StartupSearch_DisplayLayer {...useDataLayer()} />;
}

function StartupSearch_DisplayLayer({
    isLoading,
    startups,
}: StartupSearchDisplayLayerProps) {

    if (isLoading) {
        return (
            <Backdrop open={true} style={{ color: '#fff', zIndex: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
                    <CircularProgress color='primary' />
                </div>
            </Backdrop>
        );
    }
    return (
        <Container>
           {typeof startups !== 'undefined' ? (
             <>
                <div className="top-header-container">
                    <p className="top-header-text">Search Companies</p>
                </div><div className="companies-list-container">
                        {startups.map((startup, index) => (
                            <div className="companies-list-item-container" key={index}>
                                <div className="companies-list-item">
                                    <CompanyCard
                                        className="companies-list-item"
                                        {...startup} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
           ) : (
            <div>
                No Startups
            </div>
           )}
        </Container>
    );
}

function useDataLayer() {
    const { data: startups, isLoading } = useFetchAllStartups();
    console.log('The startups are:', startups);

    return {
        isLoading,
        startups,
    };
}