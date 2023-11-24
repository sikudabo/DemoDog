import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { DemoDogDemoPlayer } from "../../components";
import { DashboardLayout } from '../../components/DashboardLayout';

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

export default function DemoVideoPage() {
    const { id } = useParams();

    return (
        <DashboardLayout>
            <Container>
                <DemoDogDemoPlayer src={`http://192.168.1.215:2000/api/get-video/${id}`}/>
            </Container>
        </DashboardLayout>
    );
}