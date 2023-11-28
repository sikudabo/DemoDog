import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { DemoDogDemoPlayer } from "../../components";
import { useFetchDemo } from '../../hooks';
import { Backdrop, CircularProgress } from '@mui/material';

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 100px;
`;

type DemoVideoPageDisplayLayerProps = {
    description: string;
    demoName: string;
    id: string;
    isLoading: boolean;
    uploaderId: string;
    uploaderName: string;
};

export default function DemoVideoPage() {
    const { id } = useParams();
    return <DemoVideoPage_DisplayLayer {...useDataLayer(id as string)} />;
}

function DemoVideoPage_DisplayLayer({
    description,
    demoName,
    id,
    isLoading,
    uploaderId,
    uploaderName,
}: DemoVideoPageDisplayLayerProps) {
    if (isLoading) {
        return (
            <Backdrop open={isLoading}>
                <CircularProgress color="primary" />
            </Backdrop>
        )
    }
    return (
        <Container>
            <DemoDogDemoPlayer
                demoName={demoName}
                src={`${process.env.REACT_APP_BASE_URI}api/get-video/${id}`}
            />
        </Container>
    );
}

function useDataLayer(id: string) {
    const { data, isLoading } = useFetchDemo(id);
    const { description, demoName, uploaderId, uploaderName } = typeof data !== 'undefined' ? data : {
        description: '',
        demoName: '',
        uploaderId: '',
        uploaderName: ''
    };

    return {
        description,
        demoName,
        id,
        isLoading,
        uploaderId,
        uploaderName,
    };
}