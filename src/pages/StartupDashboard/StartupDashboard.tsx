import styled from '@emotion/styled';
import { useFetchStatsCards, useStartupEmployeeData } from "../../hooks";
import { StartupEmployeeType } from "../../typings/StartupEmployeeType";
import { DashboardLayout } from "../../components/DashboardLayout";
import { deviceBreakPointsMaxWidth } from '../../utils/constants';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { CompaniesViewedOverview, DemoDogComplexStatisticsCard, StartupDemosTable, StartupEmployeesTable, colors } from '../../components';
import StanfordLogo from '../../static-site-images/stanford_logo.jpeg';
import MicrosoftLogo from '../../static-site-images/microsoft_logo.jpeg';
import GoogleLogo from '../../static-site-images/google_logo.jpeg';
import AmazonLogo from '../../static-site-images/amazon_logo.jpeg';
import AirBnBLogo from '../../static-site-images/airbnb_logo.jpeg';
import KevinAvatar from '../../static-site-images/kevin.jpeg';
import EricAvatar from '../../static-site-images/eric.jpeg';
import MarkAvatar from '../../static-site-images/mark.jpeg';
import JeremyAvatar from '../../static-site-images/jeremy.jpeg';
import AnthonyAvatar from '../../static-site-images/anthony.jpeg';
import { Backdrop, CircularProgress } from '@mui/material';

type StartupDashboardDisplayLayerProps = {
    companyLikes: number;
    demoCount: number;
    demoLikes: number;
    employees: any;
    employeeCount: number;
    isLoading: boolean;
    startupEmployee: StartupEmployeeType | {}
};

const StartupDashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 100px;

    align-items: center;
    justify-content: center;
    
    .statistics-cards-section {
        display: flex;
        flex-direction: row;
        padding-left: 20px;
        padding-right: 20px;
        width: 75vw;

        @media ${deviceBreakPointsMaxWidth.laptopL}  {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding-left: 0;
            padding-right: 0;
        }

        .stats-card {
            width: 300px;
            height: 300px;

            @media ${deviceBreakPointsMaxWidth.laptopL}  {
                height: 100%;
                width: 100%;
            }
        }

        .stats-card-follow {
            width: 300px;
            height: 300px;
            margin-left: 20px;

            @media ${deviceBreakPointsMaxWidth.laptopL}  {
                height: 100%;
                width: 100%;
                margin-left: 0;
                margin-top: 20px;
            }
        }
    }

    .company-views-overview-section {
        display: flex;
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 20px;
        padding-right: 20px;
        width: 75vw;

        @media ${deviceBreakPointsMaxWidth.laptopL}  {
            padding-left: 0;
            padding-right: 0;
            width: 100%;
        }

        .companies-viewed-card {
            width: 1100px;

            @media ${deviceBreakPointsMaxWidth.laptopL}  {
                max-height: 100%;
                width: 100%;
            }
        }
    }

    .startup-employees-table-section {
        display: flex;
        padding-bottom: 30px;
        padding-left: 20px;
        padding-right: 20px;
        width: 75vw;

        @media ${deviceBreakPointsMaxWidth.laptopL}  {
            padding-left: 0;
            padding-right: 0;
            width: 100%;
        }

        .team-table-card {
            width: 1100px;

            @media ${deviceBreakPointsMaxWidth.laptopL}  {
                max-height: 100%;
                width: 100%;
            }
        }
    }

    .startup-demos-table-section {
        display: flex;
        padding-bottom: 30px;
        padding-left: 20px;
        padding-right: 20px;
        width: 75vw;

        @media ${deviceBreakPointsMaxWidth.laptopL}  {
            padding-left: 0;
            padding-right: 0;
            width: 100%;
        }

        .demos-table-card {
            width: 1100px;

            @media ${deviceBreakPointsMaxWidth.laptopL}  {
                max-height: 100%;
                width: 100%;
            }
        }
    }
`;

export default function StartupDashboard() {
    return <StartupDashboard_DisplayLayer {...useDataLayer()} />;
}

function StartupDashboard_DisplayLayer({
    companyLikes,
    demoCount,
    demoLikes,
    employees,
    employeeCount,
    isLoading,
    startupEmployee,
}: StartupDashboardDisplayLayerProps) {
    const { firstName, lastName } = startupEmployee as StartupEmployeeType;

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
        <DashboardLayout>
            <StartupDashboardContainer>
                <div className="statistics-cards-section">
                    <DemoDogComplexStatisticsCard
                        color="dark"
                        className="stats-card"
                        icon={<ThumbUpIcon style={{ color: colors.salmonPink, fontSize: 30 }} />}
                        title="Demo Likes"
                        count={demoLikes}
                        percentage={{
                        color: "success",
                        label: "This month",
                        }}
                        timeTable="All Time"
                    />
                    <DemoDogComplexStatisticsCard
                        color="dark"
                        className="stats-card-follow"
                        icon={<ThumbUpIcon style={{ color: colors.navyBlue, fontSize: 30 }} />}
                        title="Company Likes"
                        count={companyLikes}
                        percentage={{
                        color: "success",
                        label: "This month",
                        }}
                        timeTable="All Time"
                    />
                     <DemoDogComplexStatisticsCard
                        color="dark"
                        className="stats-card-follow"
                        icon={<FileUploadIcon style={{ color: colors.success, fontSize: 30 }} />}
                        title="Demo Uploads"
                        count={demoCount}
                        percentage={{
                        color: "success",
                        label: "This month",
                        }}
                        timeTable="Total"
                    />
                    <DemoDogComplexStatisticsCard
                        color="dark"
                        className="stats-card-follow"
                        icon={<EmojiPeopleIcon style={{ color: colors.atosGreen, fontSize: 30 }} />}
                        title="Employees"
                        count={employeeCount}
                        percentage={{
                        color: "success",
                        label: "This month",
                        }}
                        timeTable="Total"
                    />
                </div>
                <div className="company-views-overview-section">
                    <CompaniesViewedOverview
                        companies={[
                            {
                                id: 1,
                                image: StanfordLogo,
                                name: "Stanford",
                                email: "stanford@stanford.edu",
                            },
                            {
                                id: 2,
                                image: MicrosoftLogo,
                                name: "Microsoft",
                                email: "microsoft@microsoft.com",

                            },
                            {
                                id: 3,
                                image: GoogleLogo,
                                name: "Google",
                                email: "google@google.com",

                            },
                            {
                                id: 4,
                                image: AmazonLogo,
                                name: "Amazon",
                                email: "amazon@amazon.com",
                            },
                            {
                                id: 5,
                                image: AirBnBLogo,
                                name: "AirBnB",
                                email: "airbnb@airbnb.com",
                            }
                        ]}
                        sx={{
                            width: '100%',
                        }}
                    />
                </div>
                <div className="startup-employees-table-section">
                    <StartupEmployeesTable
                        employees={employees}
                    />
                </div>
                <div className="startup-demos-table-section">
                    <StartupDemosTable
                        demos={[
                           {
                            id: 1,
                            uploaderName: 'Anthony Corsaro',
                            uploaderAvatar: AnthonyAvatar,
                            name: 'How to chuck wood',
                           },
                           {
                            id: 2,
                            uploaderName: 'Mark Cuban',
                            uploaderAvatar: MarkAvatar,
                            name: 'Quick and easy',
                           },
                           {
                            id: 3,
                            uploaderName: 'Kevin O\'leary',
                            uploaderAvatar: KevinAvatar,
                            name: 'Bug fixer',
                           },
                           {
                            id: 4,
                            uploaderName: 'Eric Legrand',
                            uploaderAvatar: EricAvatar,
                            name: 'How to fix bug',
                           },
                           {
                            id: 5,
                            uploaderName: 'Jeremy Card',
                            uploaderAvatar: JeremyAvatar,
                            name: 'New date picker component',
                           }
                        ]}
                    />
                </div>
            </StartupDashboardContainer>
        </DashboardLayout>
    );
}

function useDataLayer() {
    const { employee: startupEmployee } = useStartupEmployeeData();
    const { data, isLoading } = useFetchStatsCards();
    const { companyLikes, demoCount, demoLikes, employees, employeeCount } = typeof data !== 'undefined' && !isLoading ? data : {
        companyLikes: 0,
        demoCount: 0,
        demoLikes: 0,
        employees: [],
        employeeCount: 0,
    };

    console.log('The employees are:', employees);
    
    return {
        companyLikes,
        demoCount,
        demoLikes,
        employees,
        employeeCount,
        isLoading,
        startupEmployee,
    };
}