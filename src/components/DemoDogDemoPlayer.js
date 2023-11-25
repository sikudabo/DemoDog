import '../../node_modules/plyr-react/plyr.css';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import { deviceBreakPointsMaxWidth } from '../utils/constants/breakpoints';


const StyledCard = styled(Card)`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: '500px';
    height: '450px';
    max-width: 100%;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    
    .title-container {
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;

        .title-text {
            font-size: 20px;
            font-weight: normal;
        }
    }

    .video-player {
        height: 100%;
        width: 100%;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            height: 350px;
            width: 350px;
            max-width: 100%;
        }
    }
`;

export default function DemoDogDemoPlayer({
    demoName,
    src,
}) {
    return (
        <StyledCard elevation={10}>
            <div className="title-container">
                <h1 className="title-text">{demoName}</h1>
            </div>
            <video className="video-player" src={src} controls playsInline />
        </StyledCard>
    );
}