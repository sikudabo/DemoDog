import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { colors } from '../../components';
import { deviceBreakPointsMaxWidth } from '../../utils/constants';
import { useIsLoading, useShowDialog } from '../../hooks';
const LangBotAvatar = require('../../static-site-images/lang_bot.jpeg');

const LangBotDemoContainer = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 100px;
    height: 100%;
    max-width: 95vw;

    .top-header-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 90vw;

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

    .chat-container {
        height: 300px;
        padding-bottom: 20px;
        padding-top: 10px;
        overflow: auto;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            height: 200px;
        }
    }

    .chat-input-container {
        bottom: 0;
        margin-top: 20px;
        padding-bottom: 20px;
        padding-top: 20px;
        padding-right: 40px;
        position: fixed;
        width: 100%;

        .text-field {
            width: 100%;
        }
    }

    .chat-bubble-container {
        border-radius: 5px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
    }
`;

export default function LangBot() {
    const [englishText, setEnglishText] = useState('');
    const [messages, setMessages] = useState<any>([]);
    const chatContainerRef = useRef<any>();

    useEffect(() => {
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    function handleKeyPress(e: { keyCode: number }) {
        const { keyCode } = e;
        if (keyCode === 13) {
            if (englishText.trim().length > 0) {
                setMessages([...messages, { txt: englishText, from : 'user' }]);
                setEnglishText('');
            }
        }
    }

    function onEnglishTextChange(e: { target: { value: string }}) {
        const { value } = e.target;
        setEnglishText(value);
    }
    return (
        <LangBotDemoContainer>
            <div className="top-header-container">
                <h1 className="top-header-text">
                    LangBot
                </h1>
                <Avatar alt="company logo" className="avatar" src={LangBotAvatar} />
            </div>
            <div className="chat-container" ref={chatContainerRef}>
                {messages.map((message: { txt: string; from: string }, index: number) => (
                    <Paper className="chat-bubble-container" elevation={10} key={index}>
                        {message.txt}
                    </Paper>
                ))}
            </div>
            <div className="chat-input-container">
                <TextField className="text-field" color="primary" onChange={onEnglishTextChange} onKeyDown={handleKeyPress} placeholder="English Text" value={englishText} variant="outlined" />
            </div>
        </LangBotDemoContainer>
    );
}