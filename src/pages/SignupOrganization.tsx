import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { DemoDogButton, colors } from "../components";
import { OrganizationFormType } from "../typings/OrganizationType";
import { GeneralCompanyForm } from "../components/forms";
import { checkValidEmail } from "../utils/validation";
import { resizeImage } from "../utils/helpers";
import { useIsLoading, useOrganizationData, useShowDialog } from "../hooks";
import { putBinaryData } from "../utils/requests";

const SignupOrganizationContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    padding-top: 100px;
    width: 100vw;
`;

export default function SignupOrganization() {
    const [companyAvatar, setCompanyAvatar] = useState<any>(null);
    const { setIsLoading } = useIsLoading();
    const { setOrganization } = useOrganizationData();
    const { handleDialogMessageChange, setDialogMessage, setDialogTitle, setIsError } = useShowDialog();

    const { register, handleSubmit, formState: { errors } } = useForm<OrganizationFormType>({
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
        mode: "onChange",
    });

    const handleCompanyAvatarChange = async (e: { target: { files: any }}) => {
        const file = e.target.files[0];
        const resizedAvatar = await resizeImage(file);
        setCompanyAvatar(resizedAvatar as any);
    }

    const onSubmit = async (data: OrganizationFormType) => {
        const { email, name, password } = data;
        setIsLoading(true);

        if (!companyAvatar) {
            setIsLoading(false);
            setIsError(true);
            setDialogMessage("Please upload a logo for your company!");
            setDialogTitle("Error");
            handleDialogMessageChange(true);
            return;
        }

        const fd = new FormData();
        fd.append('email', email);
        fd.append('name', name);
        fd.append('password', password);
        fd.append('avatar', companyAvatar, 'company-logo.jpg');

        await putBinaryData({
            data: fd,
            endpoint: 'api/save-new-organization',
        }).then(res => {
            const { isSuccess, message, organization } = res;
            if (!isSuccess) {
                setIsLoading(false);
                setIsError(true);
                setDialogMessage(message);
                setDialogTitle("Error");
                handleDialogMessageChange(true);
                return;
            }
            setIsLoading(false);
            setIsError(false);
            setDialogMessage(message);
            setDialogTitle("Success");
            setOrganization(organization);
            handleDialogMessageChange(true);
            
        }).catch(err => {
            setIsLoading(false);
            setIsError(true);
            setDialogMessage(err.message);
            setDialogTitle("Error");
            handleDialogMessageChange(true);
        });
    };

    return (
        <SignupOrganizationContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <GeneralCompanyForm>
                        <div className="company-name-email">
                            <div className="company-name-container">
                                <TextField aria-label="Company Email" color={errors.email ? 'error' : 'primary'} helperText={<p style={{ color: errors.email ? colors.error : colors.black}}>Required</p>} label="Company Email" {...register('email', { required: true, validate: { checkEmail: (v) =>  checkValidEmail(v) || "You must enter a valid email for the company."} })} type="email" fullWidth required />
                            </div>
                            <div className="email-container">
                                <TextField aria-label="Organization Pass" color={errors.password ? 'error' : 'primary'} helperText={<p style={{ color: errors.password ? colors.error : colors.black }}>Required (at least 6 characters){errors.password ? 'Must enter a valid password' : ''}</p>}  label="Password" type="password" {...register('password', { required: true, validate: { checkValid: (v) => v.length >= 6 || 'Your password must be at least 6 characters'} })} fullWidth required />
                            </div>
                        </div>
                        <div className="company-name-email">
                            <div className="company-name-container" style={{ width: '100%' }}>
                                <TextField aria-label="Organization name" color={errors.name ? 'error' : 'primary'} helperText={<p style={{ color: errors.name ? colors.error : colors.black }}>Required</p>} label="Company Name" {...register('name', { required: true })} fullWidth required />
                            </div>
                        </div>
                        <div className="company-avatar-section">
                            <IconButton aria-label="Employee Avatar Upload Button" color="primary" component="label">
                                <input aria-label="Employee Avatar Photo" accept="image/jpeg, image/jpg, image/png" name="employeeAvatar" onChange={handleCompanyAvatarChange} type="file" hidden />
                                <PhotoCameraIcon />
                            </IconButton>
                            Employee Avatar (required)
                        </div>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                            <DemoDogButton text="Submit" type="submit" fullWidth variant="contained" buttonColor={colors.navyBlue} isNormal />
                        </div>
                    </GeneralCompanyForm>
                </form>
        </SignupOrganizationContainer>
    );
}