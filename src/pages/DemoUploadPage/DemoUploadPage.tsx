import { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DemoDogButton, colors } from '../../components';
import { CompanyDataType } from '../../typings/CompanyDataType';
import { StartupEmployeeType } from '../../typings/StartupEmployeeType';
import { DashboardLayout } from '../../components/DashboardLayout';
import { GeneralCompanyForm } from '../../components/forms';
import { deviceBreakPointsMaxWidth } from '../../utils/constants';
import { putBinaryData } from '../../utils/requests';
import { useFetchCompanyData, useIsLoading, useShowDialog, useStartupEmployeeData } from '../../hooks';

type FormProps = {
    demoName: string;
    description: string;
};

type DemoUploadPageDisplayLayerProps = {
    companyData: CompanyDataType;
    handleSuccessNavigation: () => void;
    uploaderId: string;
    uploaderName: string;
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
    return <DemoUploadPage_DisplayLayer {...useDataLayer()} />;
}

function DemoUploadPage_DisplayLayer({
    companyData,
    handleSuccessNavigation,
    uploaderId,
    uploaderName,
}: DemoUploadPageDisplayLayerProps) {
    const [newDescription, setNewDescription] = useState('');
    const [demoVideo, setDemoVideo] = useState<any>(null);
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [isPublic, setIsPublic] = useState(true);
    const { handleSubmit, register, watch, formState: { errors } } = useForm<FormProps>({
        defaultValues: {
            demoName: '',
            description: '',
        },
        mode: 'onChange',
    });
    const { setIsLoading } = useIsLoading();
    const { handleDialogMessageChange, setDialogMessage, setDialogTitle, setIsError } = useShowDialog();
    
    const updatedDescription = watch('description');

    useEffect(() => {
        setNewDescription(updatedDescription);
        setDescriptionLength(updatedDescription.length);
    }, [updatedDescription]);

    function handlePrivacyChange(e: { target: { checked: boolean}}) {
        const { checked } = e.target;
        setIsPublic(checked);
    }

    function handleVideoChange(e: { target: { files: any }}) {
        const { files } = e.target;
        setDemoVideo(files[0]);
    }

    async function sendData(data: FormProps) {
        setIsLoading(true);
        if (!demoVideo) {
            setDialogTitle('Error');
            setIsError(true);
            setDialogMessage('Please upload a demo video!');
            setIsLoading(false);
            handleDialogMessageChange(true);
            return;
        }

        const { _id: companyId, category: videoCategory } = companyData;
        const fd = new FormData();
        fd.append('companyId', companyId);
        fd.append('videoCategory', videoCategory);
        fd.append('uploaderId', uploaderId);
        fd.append('uploaderName', uploaderName);
        fd.append('demoName', data.demoName);
        fd.append('description', data.description);
        fd.append('private', !isPublic as any)
        let ext = demoVideo.name.split('.').pop().toString(); //This will get the extension name of the video 
        ext = 'video.' + ext;
        fd.append('demo', demoVideo, ext);

        await putBinaryData({
            data: fd,
            endpoint: 'api/save-new-demo',
        }).then(res => {
            const { isSuccess, message } = res;

            if (!isSuccess) {
                setDialogTitle('Error');
                setIsError(true);
                setDialogMessage(message);
                setIsLoading(false);
                handleDialogMessageChange(true);
                return;
            }

            setDialogTitle('Success');
            setIsError(false);
            setDialogMessage(message);
            setIsLoading(false);
            handleSuccessNavigation();
            handleDialogMessageChange(true);
            return;
        }).catch(err => {
            console.log('Error:', err.message);
            setDialogTitle('Error');
            setIsError(true);
            setDialogMessage('There was an error uploading that demo. Please try again!');
            setIsLoading(false);
            handleDialogMessageChange(true);
        });
    }
    
    return (
        <DashboardLayout>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                            <IconButton aria-label="Demo video upload button" color="secondary" component="label">
                                <input aria-label="Demo video upload input" accept="video/mp4, video/mov" name="demoVideo" onChange={handleVideoChange} type="file" hidden required />
                                <VideoCallIcon />
                            </IconButton>
                            Video (required)
                        </div>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, width: '100%' }}>
                            <FormControlLabel control={<Switch checked={isPublic} color='secondary' onChange={handlePrivacyChange} />} label={isPublic ? 'Public' : 'Private'} />
                        </div>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, width: '100%' }}>
                            <DemoDogButton buttonColor={colors.salmonPink} className="submit-button" text="Submit" type="submit" fullWidth isNormal />
                        </div>
                    </GeneralCompanyForm>
                </form>
            </DemoUploadPageContainer>
            </div>
        </DashboardLayout>
    );
}

function useDataLayer() {
    const { setIsLoading } = useIsLoading();
    const { data, isLoading } = useFetchCompanyData();
    const { employee } = useStartupEmployeeData();
    const { firstName, _id: uploaderId, lastName } = employee as StartupEmployeeType;
    const uploaderName = `${firstName} ${lastName}`;
    const navigate = useNavigate();

    const handleSuccessNavigation = () => {
        navigate('/startup-dashboard/main');
    }

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading]);

    return {
        companyData: data,
        handleSuccessNavigation,
        uploaderId,
        uploaderName,
    };
}