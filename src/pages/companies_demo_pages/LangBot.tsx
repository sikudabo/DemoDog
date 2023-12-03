import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { colors } from '../../components';
import { deviceBreakPointsMaxWidth } from '../../utils/constants';
import { useIsLoading, useShowDialog } from '../../hooks';
import { postNonBinaryData } from '../../utils/requests';
const LangBotAvatar = require('../../static-site-images/lang_bot.jpeg');

const LangBotDemoContainer = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 100px;
    height: 100%;
    max-width: 100vw;

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
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 10px;
        overflow: auto;
        width: 100%;

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
        width: 100vw;

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
        width: 100vw;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            width: 100%;
        }
    }

    .chat-bubble-container-bot {
        background-color: ${colors.atlassianBlue};
        border-radius: 5px;
        color: ${colors.white};
        margin-bottom: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
        width: 100vw;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            width: 100%;
        }
    }
`;

export default function LangBot() {
    const [englishText, setEnglishText] = useState('');
    const [messages, setMessages] = useState<any>([]);
    const chatContainerRef = useRef<any>();
    const { setIsLoading } = useIsLoading();

    useEffect(() => {
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    async function handleKeyPress(e: { keyCode: number }) {
        const { keyCode } = e;
        if (keyCode === 13) {
            if (englishText.trim().length > 0) {
                setIsLoading(true);

                await postNonBinaryData({
                    data: {
                        'english_text': englishText,
                    },
                    endpoint: 'translate',
                    microServiceUrl: 'http://192.168.1.237:5000/'
                }).then(response => {
                    setIsLoading(false);
                    const { spanish_translation } = response
                    console.log('The spanish translation is:', spanish_translation);
                    setMessages([...messages, { txt: englishText, from: 'user' }, { txt: spanish_translation, from: 'bot' }]);
                    setEnglishText('');
                }).catch(err => {
                    console.log('There was an error asking a question');
                    console.error(err);
                    setIsLoading(false);
                    setMessages([...messages, { txt: 'There was an error. Please try again!', from: 'bot' }])
                })
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
                    <Paper className={message.from === 'user' ? "chat-bubble-container" : "chat-bubble-container-bot"} elevation={10} key={index}>
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