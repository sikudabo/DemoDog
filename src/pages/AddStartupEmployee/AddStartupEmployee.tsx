import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { GeneralCompanyForm } from '../../components/forms';
import { putBinaryData } from '../../utils/requests';
import { resizeImage } from '../../utils/helpers';
import { DemoDogButton, colors } from '../../components';
import {  useIsLoading, useShowDialog, useStartupEmployeeData } from '../../hooks';
import { checkValidEmail, checkValidUrl } from '../../utils/validation';
import { FormProps } from '../SignUpPage/SignUpPage';
import { deviceBreakPointsMaxWidth } from '../../utils/constants';
import { StartupEmployeeType } from '../../typings/StartupEmployeeType';

const AddStartupEmployeePageContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .top-header-text-container {
        padding-bottom: 40px;

        .top-header-text {
            font-size: 40px;
            font-weight: 900;

            @media ${deviceBreakPointsMaxWidth.laptop} {
                font-size: 20px;
            }
        }
    }
`;

type EmployeeFormValues = Omit<FormProps, 'CompanyDescription' | 'CompanyName' | 'CompanyUrl' | 'email' | 'selectedBusinessCategory'>;

type AddStartupEmployeeDisplayLayerProps = {
    companyId: string;
    handleSuccessNavigation: () => void;
};

export default function AddStartupEmployee() {
    return <AddStartupEmployee_DisplayLayer {...useDataLayer()} />;
}

function AddStartupEmployee_DisplayLayer({
    companyId,
    handleSuccessNavigation,
}: AddStartupEmployeeDisplayLayerProps) {
    const [avatar, setAvatar] = useState<any>(null);
    const [role, setRole] = useState<'admin' | 'employee'>('admin');
    const { handleSubmit, register, formState: { errors } } = useForm<EmployeeFormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            employeeEmail: '',
            password: '',
            jobTitle: '',
            linkedIn: '',
        },
        mode: 'onChange',
    });
    const { setIsLoading } = useIsLoading();
    const { handleDialogMessageChange, setDialogMessage, setDialogTitle, setIsError } = useShowDialog();

    function handleRoleChange(e: { target: { checked: boolean }}) {
        const { checked } = e.target;
        setRole(checked ? 'admin' : 'employee');
    }

    const handleEmployeeAvatarChange = async (e: { target: { files: any }}) => {
        const file = e.target.files[0];
        const resizedAvatar = await resizeImage(file);
        setAvatar(resizedAvatar as File);
    }

    async function sendData(data: EmployeeFormValues) {
        setIsLoading(true);
        const { firstName, lastName, employeeEmail, password, jobTitle, linkedIn } = data;

        if (!avatar) {
            setDialogTitle('Error');
            setIsError(true);
            setDialogMessage('Please upload an avatar!');
            setIsLoading(false);
            handleDialogMessageChange(true);
            return;
        }

        const fd = new FormData();
        fd.append('firstName', firstName);
        fd.append('lastName', lastName);
        fd.append('email', employeeEmail);
        fd.append('password', password);
        fd.append('jobTitle', jobTitle);
        fd.append('linkedIn', linkedIn);
        fd.append('role', role);
        fd.append('avatar', avatar, 'avatar.jpg');
        fd.append('userType', 'employee');
        fd.append('companyId', companyId);

        await putBinaryData({
            data: fd,
            endpoint: 'api/save-new-employee',
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
           <AddStartupEmployeePageContainer>
                <div className="top-header-text-container">
                    <div className="top-header-text">Add Employee</div>
                </div>
                <form onSubmit={handleSubmit(sendData)}>
                    <GeneralCompanyForm>
                        <div className="company-name-email">
                            <div className="company-name-container">
                                <TextField aria-label="Employee first name" color={errors.firstName ? 'error' : 'primary'} helperText={<p style={{ color: errors.firstName ? colors.error : colors.black}}>Required</p>} label="First Name" {...register('firstName', { required: true })} fullWidth required />
                            </div>
                            <div className="email-container">
                                <TextField aria-label="Employee last name" color={errors.lastName ? 'error' : 'primary'} helperText={<p style={{ color: errors.lastName ? colors.error : colors.black }}>Required {errors.lastName ? 'Must enter a valid last name' : ''}</p>}  label="Last Name" {...register('lastName', { required: true })} fullWidth required />
                            </div>
                        </div>
                        <div className="company-name-email">
                            <div className="company-name-container">
                                <TextField aria-label="Employee email" color={errors.employeeEmail ? 'error' : 'primary'} helperText={<p style={{ color: errors.employeeEmail ? colors.error : colors.black}}>Required</p>} label="Employee email" {...register('employeeEmail', { required: true, validate: { emailValid: v => checkValidEmail(v) || "You must enter a valid email address" } })} type="email" fullWidth required />
                            </div>
                            <div className="email-container">
                                <TextField aria-label="Employee password" color={errors.password ? 'error' : 'primary'} helperText={<p style={{ color: errors.password ? colors.error : colors.black }}>Required (6 character min) {errors.password ? 'Must enter a valid password' : ''}</p>}  label="Password" type="password" {...register('password', { required: true, validate: { enoughChars: v => v.length >= 6 || "Password must be at least 6 characters long" } })} fullWidth required />
                            </div>
                        </div>
                        <div className="company-name-email">
                            <div className="company-name-container">
                                <TextField aria-label="Employee job title" color={errors.jobTitle ? 'error' : 'primary'} helperText={<p style={{ color: errors.jobTitle ? colors.error : colors.black }}>Required</p>} label="Job Title" {...register('jobTitle', { required: true })} fullWidth required />
                            </div>
                            <div className="email-container">
                                <TextField aria-label="Employee LinkedIn" color={errors.linkedIn ? 'error' : 'primary'} helperText={<p style={{ color: errors.linkedIn ? colors.error : colors.black }}>Required {errors.linkedIn ? 'Must enter a valid LinkedIn URL.' : ''}</p>}  label="LinkedIn" type="url" {...register('linkedIn', { required: true, validate: { validEmail: v => checkValidUrl(v) || "Must enter a valid LinkedIn URL." } })} fullWidth required />
                            </div>
                        </div>
                        <div className="company-avatar-section">
                            <IconButton aria-label="Employee Avatar Upload Button" color="primary" component="label">
                                <input aria-label="Employee Avatar Photo" accept="image/jpeg, image/jpg, image/png" name="employeeAvatar" onChange={handleEmployeeAvatarChange} type="file" hidden />
                                <PhotoCameraIcon />
                            </IconButton>
                            Employee Avatar (required)
                        </div>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, width: '100%' }}>
                            <FormControlLabel control={<Switch checked={role === 'admin'} color='primary' onChange={handleRoleChange} />} label={role === 'admin' ? 'Admin' : 'Non-Admin'} />
                        </div>
                        <div style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, width: '100%', paddingBottom: 30 }}>
                            <DemoDogButton buttonColor={colors.navyBlue} text="Submit" type="submit" fullWidth isNormal />
                        </div>
                    </GeneralCompanyForm>
                </form>
            </AddStartupEmployeePageContainer>
        </DashboardLayout>
    );
}

function useDataLayer() {
    const { employee } = useStartupEmployeeData();
    const { companyId } = employee as StartupEmployeeType;
    const navigate = useNavigate();

    function handleSuccessNavigation() {
        navigate('/startup-dashboard/main');
    }

    return {
        companyId,
        handleSuccessNavigation,
    };

}


