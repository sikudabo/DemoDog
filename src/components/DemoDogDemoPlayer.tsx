import Plyr from 'plyr-react';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';


const StyledCard = styled(Card)`
    width: '100%';
`;

type DemoDogPlayerProps = {
    src: string; //Source for the video file. 
};

export default function DemoDogDemoPlayer({
    src,
}: DemoDogPlayerProps) {
    return (
        <StyledCard elevation={10}>
             <Plyr 
                source={{
                    sources: [
                        {
                            src: src,
                            type: 'video',

                        }
                    ],
                    type: 'video'
                }}
                autoPlay
                playsInline
            />
        </StyledCard>
    );
}