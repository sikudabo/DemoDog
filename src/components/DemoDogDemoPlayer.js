import Plyr from 'plyr-react';
import '../../node_modules/plyr-react/plyr.css';
import styled from '@emotion/styled';
import Videojs from 'video.js';
import Card from '@mui/material/Card';
import { Player } from 'video-react';
const MyVideo = require('../static-site-images/recording.mov');


const StyledCard = styled(Card)`
    width: '100%';
    hight: '100%';
`;

export default function DemoDogDemoPlayer({
    src,
}) {
    return (
        <video height={300} width={500} src={src} loop muted controls />
    );
}