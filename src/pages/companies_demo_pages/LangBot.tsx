import { useRef } from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { colors } from '../../components';
import { useIsLoading, useShowDialog } from '../../hooks';
const LangBotAvatar = require('../../static-site-images/lang_bot.jpeg');

const LangBotDemoContainer = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 100px;
    width: 100%;

    .top-header-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100vw;

        .top-header-text {
            color: ${colors.atlassianBlue};
            font-size: 40px;
            font-weight: 900;
        }

        .avatar {
            height: 150px;
            width: 150px;
        }
    }
`;

export default function LangBot() {
    return (
        <LangBotDemoContainer>
            <div className="top-header-container">
                <h1 className="top-header-text">
                    LangBot
                </h1>
                <Avatar alt="company logo" className="avatar" src={LangBotAvatar} />
            </div>
        </LangBotDemoContainer>
    );
}