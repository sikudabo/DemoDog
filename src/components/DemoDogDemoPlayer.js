import '../../node_modules/plyr-react/plyr.css';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import { deviceBreakPointsMaxWidth } from '../utils/constants/breakpoints';


const StyledCard = styled(Card)`
    width: 75%;
    hight: 50%;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;

    .video-player {
        height: 100%;
        width: 100%;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            height: 350px;
            width: 350px;
        }
    }
`;

export default function DemoDogDemoPlayer({
    src,
}) {
    return (
        <StyledCard elevation={10}>
            <video className="video-player" src={src} controls playsInline />
        </StyledCard>
    );
}