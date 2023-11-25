import styled from '@emotion/styled';

const Container = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 100px;
`;

export default function StartupSearch() {
    return (
        <Container>
            <p>Search for startups!</p>
        </Container>
    );
}