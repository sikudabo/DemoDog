import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { DemoDogButton, colors } from '../../components';
import { DashboardLayout } from '../../components/DashboardLayout';
import { GeneralCompanyForm } from '../../components/forms';
import { deviceBreakPointsMaxWidth } from '../../utils/constants';

type FormProps = {
    demoName: string;
    description: string;
};


const DemoUploadPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 100px;

    .top-header-text {
        align-items: center;
        display: flex;
        justify-content: center;
    }
`;

export default function DemoUploadPage() {
    const [newDescription, setNewDescription] = useState('');
    const [demoVideo, setDemoVideo] = useState<any>(null);
    const [descriptionLength, setDescriptionLength] = useState(0);
    const { handleSubmit, register, watch, formState: { errors } } = useForm<FormProps>({
        defaultValues: {
            demoName: '',
            description: '',
        },
        mode: 'onChange',
    });

    const updatedDescription = watch('description');

    useEffect(() => {
        setNewDescription(updatedDescription);
        setDescriptionLength(updatedDescription.length);
    }, [updatedDescription]);

    function handleVideoChange(e: { target: { files: any }}) {
        const { files } = e.target;
        setDemoVideo(files[0]);
    }

    function sendData(data: FormProps) {
        console.log(data);
    }
    
    return (
        <DashboardLayout>
            <DemoUploadPageContainer>
                <div className="top-header-text">
                    <h1 className="sign-up-page-header-text">Upload Demo</h1>
                </div>
                <form onSubmit={handleSubmit(sendData)}>
                    <GeneralCompanyForm>
                        <div className="company-url-section" style={{ paddingTop: 40 }}>
                            <TextField aria-label="Demo Name" color={errors.demoName ? 'error' : 'primary'} helperText={<p style={{ color: errors.demoName ? colors.error : colors.black  }}>Must enter a name for the Demo</p>} label="Demo name" {...register('demoName', { required: true })} fullWidth required />
                        </div>
                        <div className="company-description-section">
                            <TextField aria-label="Demo Description" color={errors.description ? 'error' : 'primary'} helperText={<p style={{ color: errors.description ? colors.error : colors.black }}>Required {descriptionLength} / 400</p>} label="Description" maxRows={4} minRows={4}  {...register('description', { maxLength: 400, required: true })} value={newDescription} fullWidth multiline required />
                        </div>
                        <div className="company-avatar-section">
                            <IconButton aria-label="Demo video upload button" color="primary" component="label">
                                <input aria-label="Demo video upload input" accept="video/mp4, video/mov" name="demoVideo" onChange={handleVideoChange} type="file" hidden required />
                                <VideoCallIcon />
                            </IconButton>
                            Video (required)
                        </div>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, width: '100%' }}>
                            <DemoDogButton buttonColor={colors.salmonPink} className="submit-button" text="Submit" type="submit" fullWidth isNormal />
                        </div>
                    </GeneralCompanyForm>
                </form>
            </DemoUploadPageContainer>
        </DashboardLayout>
    );
}