import '../../node_modules/plyr-react/plyr.css';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import LikeIcon from '@mui/icons-material/ThumbUp';
import { deviceBreakPointsMaxWidth } from '../utils/constants/breakpoints';
import { useOrganizationData } from '../hooks';
import { postNonBinaryData } from '../utils/requests';


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
        height: 500px;
        width: 500px;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            height: 350px;
            width: 350px;
            max-width: 100%;
        }
    }

    .like-button-section {
        padding-left: 20px;
        padding-top: 30px;
    }
`;

export default function DemoDogDemoPlayer({
    demoName,
    src,
}) {
    const { organization } = useOrganizationData();

    function handleLikeButtonClick() {
        postNonBinaryData({
            data: {
                videoId: src,
            },
            endpoint: 'api/add-demo-like',
        });
    }

    return (
        <StyledCard elevation={10}>
            <div className="title-container">
                <h1 className="title-text">{demoName}</h1>
            </div>
            <video className="video-player" src={src} controls playsInline />
            {typeof organization !== 'undefined' && typeof organization._id !== 'undefined' && (
                <div className="like-button-section">
                    <IconButton color="primary" onClick={handleLikeButtonClick}> 
                        <LikeIcon />
                    </IconButton>
                </div>
            )}
        </StyledCard>
    );
}