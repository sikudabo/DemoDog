import Plyr from 'react-plyr';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';


const StyledCard = styled(Card)`
    width: '100%';
    hight: '100%';
`;

type DemoDogPlayerProps = {
    src: string; //Source for the video file. 
};

export default function DemoDogDemoPlayer({
    src,
}: DemoDogPlayerProps) {
    return (
        <div>
             <video src={src} autoPlay loop muted height={700} width={700}/>
        </div>
    );
}