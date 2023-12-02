import { useState } from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import { DemoDogButton, colors } from '../components';
import { useIsLoading, useShowDialog } from '../hooks';
import { postNonBinaryData } from '../utils/requests';
import { checkValidEmail } from '../utils/validation';

const ContactPageContainer = styled.div`
    padding-top: 100px;

    .top-header-container {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;
        padding-bottom: 10px;
        width: 100vw;

        .top-header-text {
            color: ${colors.navyBlue};
            font-size: 3rem;
            font-weightL 900;
        }
    }

    .text-container {
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        text-align: left;

        .page-description-text {
            color: ${colors.navyBlue};
            font-size: 20px;
            font-weight: normal;
        }
    }

    .contact-form-container {
        padding-bottom: 30px;
        padding-left: 20px;
        padding-right: 20px;
        width: 100vw;

        .message-field-container {
            padding-top: 10px;
        }
    }

    .button-container {
        padding-bottom: 50px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
    }
`;

export default function ContactPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { setIsLoading } = useIsLoading();
    const { setDialogTitle, setDialogMessage, setIsError, handleDialogMessageChange } = useShowDialog();

    const handleEmailChange = (e: { target: { value: string }}) => {
        const { value } = e.target;
        setEmail(value);
    };

    const handleMessageChange = (e: { target: { value: string }}) => {
        const { value } = e.target;
        setMessage(value);
    }

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!email || !checkValidEmail(email)) {
            setIsLoading(false);
            setDialogTitle('Error');
            setIsError(true);
            setDialogMessage('You must enter a valid email!');
            handleDialogMessageChange(true);
            return;
        }

        if (!message || message.trim().length === 0) {
            setIsLoading(false);
            setDialogTitle('Error');
            setIsError(true);
            setDialogMessage('You must enter a contact message!');
            handleDialogMessageChange(true);
            return;
        }

        await postNonBinaryData({
            data: {
                email,
                message
            },
            endpoint: 'api/contact',
        }).then(res => {
            const { isSuccess, message } = res;

            if (isSuccess) {
                setIsLoading(false);
                setDialogTitle('Success');
                setIsError(false);
                setDialogMessage(message);
                handleDialogMessageChange(true);
                setEmail('');
                setMessage('');
                return;
            }

            setIsLoading(false);
            setDialogTitle('Error');
            setIsError(true);
            setDialogMessage(message);
            handleDialogMessageChange(true);
            return;
        }).catch(err => {
            console.error(err.message);
            setIsLoading(false);
            setDialogTitle('Error');
            setIsError(true);
            setDialogMessage('There was an error sending that message! Please try again.');
            handleDialogMessageChange(true);
            return;
        });
    }

    return (
        <ContactPageContainer>
            <div className="top-header-container">
                <h1 className="top-header-text">
                    Contact 
                </h1>
            </div>
            <div className="text-container">
                <p className="page-description-text">
                    Contact us if you are interested in us building 
                    your MVP, joining our platform, want to discuss 
                    investment opportunities and partnerships, or 
                    if you are a customer having problems like forgotten 
                    login information or technical issues. 
                </p>
            </div>
            <div className="contact-form-container">
                <TextField color="primary" helperText="Required" label="email" onChange={handleEmailChange} type="email" value={email} fullWidth required />
                <div className="message-field-container">
                <TextField aria-label="Company Description" color="primary" helperText="Required" maxRows={4} minRows={4} onChange={handleMessageChange} value={message} fullWidth multiline required />
                </div>
            </div>
            <div className="button-container">
                <DemoDogButton buttonColor={colors.navyBlue} onClick={handleSubmit} text="Submit" fullWidth isOutlined />
            </div>
        </ContactPageContainer>
    );
}