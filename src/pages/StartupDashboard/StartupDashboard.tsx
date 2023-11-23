import styled from '@emotion/styled';
import { useStartupEmployeeData } from "../../hooks";
import { StartupEmployeeType } from "../../typings/StartupEmployeeType";
import { DashboardLayout } from "../../components/DashboardLayout";
import { DemoDogComplexStatisticsCard } from "../../components";
import { deviceBreakPointsMaxWidth } from '../../utils/constants';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { colors } from '../../components';

type StartupDashboardDisplayLayerProps = {
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
`;

export default function StartupDashboard() {
    return <StartupDashboard_DisplayLayer {...useDataLayer()} />;
}

function StartupDashboard_DisplayLayer({
    startupEmployee,
}: StartupDashboardDisplayLayerProps) {
    const { firstName, lastName } = startupEmployee as StartupEmployeeType;

    return (
        <DashboardLayout>
            <StartupDashboardContainer>
                <div className="statistics-cards-section">
                    <DemoDogComplexStatisticsCard
                        color="dark"
                        className="stats-card"
                        icon={<ThumbUpIcon style={{ color: colors.salmonPink, fontSize: 30 }} />}
                        title="Demo Likes"
                        count={281}
                        percentage={{
                        color: "success",
                        label: "This month",
                        }}
                        timeTable="This month"
                    />
                    <DemoDogComplexStatisticsCard
                        color="dark"
                        className="stats-card-follow"
                        icon={<ThumbUpIcon style={{ color: colors.navyBlue, fontSize: 30 }} />}
                        title="Company Likes"
                        count={25}
                        percentage={{
                        color: "success",
                        label: "This month",
                        }}
                        timeTable="This month"
                    />
                     <DemoDogComplexStatisticsCard
                        color="dark"
                        className="stats-card-follow"
                        icon={<FileUploadIcon style={{ color: colors.success, fontSize: 30 }} />}
                        title="Demo Uploads"
                        count={400}
                        percentage={{
                        color: "success",
                        label: "This month",
                        }}
                        timeTable="Forever"
                    />
                    <DemoDogComplexStatisticsCard
                        color="dark"
                        className="stats-card-follow"
                        icon={<EmojiPeopleIcon style={{ color: colors.atosGreen, fontSize: 30 }} />}
                        title="Employees"
                        count={10}
                        percentage={{
                        color: "success",
                        label: "This month",
                        }}
                        timeTable="Forever"
                    />
                </div>
            </StartupDashboardContainer>
        </DashboardLayout>
    );
}

function useDataLayer() {
    const { employee: startupEmployee } = useStartupEmployeeData();
    console.log('The startup employee is: ', startupEmployee);
    
    return {
        startupEmployee,
    };
}