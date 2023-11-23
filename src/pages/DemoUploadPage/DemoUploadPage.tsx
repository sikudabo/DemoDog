import styled from '@emotion/styled';
import { DashboardLayout } from '../../components/DashboardLayout';
import { deviceBreakPointsMaxWidth } from '../../utils/constants';


const DemoUploadPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 100px;

    align-items: center;
    justify-content: center;
`;

export default function DemoUploadPage() {
    return (
        <DashboardLayout>
            <DemoUploadPageContainer>
                <h1>Demo Upload Page</h1>
            </DemoUploadPageContainer>
        </DashboardLayout>
    );
}