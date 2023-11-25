import styled from '@emotion/styled';
import { useFetchAllStartups } from '../../hooks';

const Container = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 100px;
`;

export default function StartupSearch() {
    return <StartupSearch_DisplayLayer {...useDataLayer()} />;
}

function StartupSearch_DisplayLayer() {
    return (
        <Container>
            <p>Search for startups!</p>
        </Container>
    );
}

function useDataLayer() {
    const { data, isLoading } = useFetchAllStartups();
    console.log('The startups are: ', data);

    return {

    };
}