import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Select from '@mui/material/Select';
import SignUpPageContainer from './SignUpPageContainer';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from'react-router-dom';
import { GeneralCompanyForm } from '../../components/forms';
import { DemoDogButton, colors } from '../../components';
import { businessCategories } from '../../utils/constants';
import { resizeImage } from '../../utils/helpers';
import { putBinaryData } from '../../utils/requests';
import { useIsLoading, useShowDialog, useStartupEmployeeData } from '../../hooks';
import { checkValidEmail, checkValidUrl } from '../../utils/validation';

export type FormProps = {
    companyDescription: string;
    companyName: string;
    companyUrl: string;
    email: string;
    employeeEmail: string;
    firstName: string;
    jobTitle: string;
    lastName: string;
    linkedIn: string;
    password: string;
    selectedBusinessCategory: string;
};

export default function SignUpPage() {
    const [selectedCategory, setSelectedCategory] = useState(businessCategories[0]);
    const [stateCompanyDescription, setCompanyDescription] = useState('');
    const [stateCompanyEmail, setStateCompanyEmail] = useState('');
    const [stateCompanyUrl, setStateCompanyUrl] = useState('');
    const [stateCompanyName, setStateCompanyName] = useState('');
    const [companyAvatar, setCompanyAvatar] = useState(null);
    const [employeeAvatar, setEmployeeAvatar] = useState<File>();
    const headerTextRef = useRef(null); 
    const navigate = useNavigate();
    const { setIsLoading } = useIsLoading();
    const { setEmployee } = useStartupEmployeeData();
    const { handleDialogMessageChange, setDialogMessage, setDialogTitle, setIsError } = useShowDialog();

    const { handleSubmit, register, watch, formState: { errors } } = useForm<FormProps>({
        defaultValues: {
            companyDescription: '',
            companyName: '',
            companyUrl: '',
            email: '',
            employeeEmail: '',
            firstName: '',
            lastName: '',
            password: '',
            selectedBusinessCategory: businessCategories[0],
        },
        mode: 'onChange',
    });
    const newCategory = watch('selectedBusinessCategory');
    const newDescription = watch('companyDescription');
    const newCompanyName = watch('companyName');
    const newCompanyUrl = watch('companyUrl');
    const newEmail = watch('email');
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        setSelectedCategory(newCategory);
    }, [newCategory]);

    useEffect(() => {
        setCompanyDescription(newDescription);
        setDescriptionLength(newDescription.length);
    }, [newDescription]);

    useEffect(() => {
        setStateCompanyEmail(newEmail);
    }, [newEmail]);

    useEffect(() => {
        setStateCompanyUrl(newCompanyUrl);
    }, [newCompanyUrl]);

    useEffect(() => {
        setStateCompanyName(newCompanyName);
    }, [newCompanyName]);

    useEffect(() => {
        if (typeof headerTextRef !== 'undefined' && typeof headerTextRef.current!== 'undefined') {
            window.scrollTo({
                behavior: 'smooth',
                left: 0,
                top: (headerTextRef as any).current.offsetTop,
            });
        }
    })

    const handleCompanyAvatarChange = async (e: { target: { files: any }}) => {
        const file = e.target.files[0];
        const resizedAvatar = await resizeImage(file);
        setCompanyAvatar(resizedAvatar as any);
    }

    const handleEmployeeAvatarChange = async (e: { target: { files: any }}) => {
        const file = e.target.files[0];
        const resizedAvatar = await resizeImage(file);
        setEmployeeAvatar(resizedAvatar as File);
    }

    const handleSendData = (data: FormProps) => {
        setIsLoading(true);
        if (!employeeAvatar) {
            setDialogMessage('Please select an employee avatar');
            setDialogTitle('Error');
            setIsError(true);
            setIsLoading(false);
            handleDialogMessageChange(true);
            return;
        }

        const { companyDescription, companyName, companyUrl, email, employeeEmail, firstName, jobTitle, lastName, linkedIn, selectedBusinessCategory, password } = data;
        const formData = new FormData();
        formData.append('category', selectedBusinessCategory);
        formData.append('description', companyDescription);
        formData.append('companyEmail', email);
        formData.append('companyName', companyName);
        formData.append('companyUrl', companyUrl);
        formData.append('avatar', companyAvatar as any, 'avatar.jpg');

        putBinaryData({
            data: formData,
            endpoint: 'api/save-new-company',
        }).then(response => {
            const { companyId, isSuccess, message } = response;
            if (!isSuccess) {
                setDialogMessage(message);
                setDialogTitle('Error');
                setIsError(true);
                setIsLoading(false);
                handleDialogMessageChange(true);
                return;
            }

            const fd = new FormData();
            fd.append('companyId', companyId);
            fd.append('firstName', firstName);
            fd.append('lastName', lastName);
            fd.append('email', employeeEmail);
            fd.append('jobTitle', jobTitle);
            fd.append('role', 'admin');
            fd.append('password', password);
            fd.append('linkedIn', linkedIn);
            fd.append('avatar', employeeAvatar as File, 'avatar.jpg');
            fd.append('userType', 'employee');

            putBinaryData({
                data: fd,
                endpoint: 'api/save-new-employee',
            }).then(response => {
                const { isSuccess, message, user } = response;
                if (!isSuccess) {
                    setDialogMessage(message);
                    setDialogTitle('Error');
                    setIsError(true);
                    setIsLoading(false);
                    handleDialogMessageChange(true);
                    return;
                }

                setDialogMessage(message);
                setDialogTitle('Success');
                setIsError(false);
                setIsLoading(false);
                handleDialogMessageChange(true);
                setEmployee(user);
                navigate('/startup-dashboard/main');
            }).catch(error => {
                setDialogMessage(error.message);
                setDialogTitle('Error');
                setIsError(true);
                setIsLoading(false);
                handleDialogMessageChange(true);
            });
    
        }).catch(e => {
            console.log(e.message);
            setDialogMessage('There was an error creating your account. Please try again!');
            setDialogTitle('Error');
            setIsError(true);
            setIsLoading(false);
            handleDialogMessageChange(true);
        });
    }

    const handleNextStep = () => {

        if (!companyAvatar) {
            setIsError(true);
            setDialogTitle('Error');
            setDialogMessage('You must enter an avatar image for your company!');
            handleDialogMessageChange(true);
            return;
        } else if (errors.companyName || errors.companyDescription || errors.companyUrl || errors.email) {
            setIsError(true);
            setDialogTitle('Error');
            setDialogMessage('Please make sure all fields are filled out correctly.');
            handleDialogMessageChange(true);
            return;
        } else if (!stateCompanyDescription || !stateCompanyName || !checkValidEmail(stateCompanyEmail) || !checkValidUrl(stateCompanyUrl)) {
            setIsError(true);
            setDialogTitle('Error');
            setDialogMessage('Please make sure all fields are filled out correctly.');
            handleDialogMessageChange(true);
            return;
        }

        setCurrentStep(1);
    }


    return (
        <SignUpPageContainer>
            <div className="sign-up-page-header">
                <h1 className="sign-up-page-header-text" ref={headerTextRef}>Sign Up!</h1>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit(handleSendData)}>
                    {(currentStep === 0) && (
                        <GeneralCompanyForm>
                            <div className="company-form-header">
                                <h1 className="company-form-header-text">Company Information</h1>
                            </div>
                            <div className="company-name-email">
                                <div className="company-name-container">
                                    <TextField aria-label="Company Name" color={errors.companyName ? 'error' : 'primary'} helperText={<p style={{ color: errors.companyName ? colors.error : colors.black}}>Required</p>} label="Company Name" {...register('companyName', { required: true })} fullWidth required />
                                </div>
                                <div className="email-container">
                                    <TextField aria-label="Company Email" color={errors.email ? 'error' : 'primary'} helperText={<p style={{ color: errors.email ? colors.error : colors.black }}>Required {errors.email ? 'Must enter a valid email' : ''}</p>}  label="Company Email" type="email" {...register('email', { required: true, validate: { validEmail: v => checkValidEmail(v) || "Must enter a valid email" }})} fullWidth required />
                                </div>
                            </div>
                            <div className="company-category-select" style={{ width: '100%' }}>
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel 
                                        color="secondary"
                                        id="select-label"
                                    />
                                    <Select 
                                        aria-label="Artist Genres"
                                        color="primary"
                                        id="artist-genres"
                                        input={<OutlinedInput />}
                                        placeholder="Genre"
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.5 }}>
                                                <Chip color="primary" label={selected} variant="outlined" />
                                            </Box>
                                        )}
                                        value={selectedCategory}
                                        {...register('selectedBusinessCategory', {required: true })}
                                        fullWidth
                                        required
                                    >
                                        {businessCategories.map((category, index) => (
                                            <MenuItem 
                                                key={index}
                                                value={category}
                                            >
                                                <Checkbox checked={selectedCategory === category} color="primary" />
                                                <ListItemText primary={category} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>
                                        Select a business category (required)
                                    </FormHelperText>
                                </FormControl>
                            </div>
                            <div className="company-description-section">
                                <TextField aria-label="Company Description" color={errors.companyDescription ? 'error' : 'primary'} helperText={<p style={{ color: errors.companyDescription ? colors.error : colors.black }}>Required {descriptionLength} / 1000</p>} label="Company Description" maxRows={4} minRows={4}  {...register('companyDescription', { maxLength: 1000, required: true })} value={stateCompanyDescription} fullWidth multiline required />
                            </div>
                            <div className="company-url-section">
                                <TextField aria-label="CompanyUrl" color={errors.companyUrl ? 'error' : 'primary'} helperText={<p style={{ color: errors.companyUrl ? colors.error : colors.black  }}>Must enter a valid Url</p>} label="Company Url" type="url" {...register('companyUrl', { required: true, validate: { validUrl: v => checkValidUrl(v) || "You must enter a valid company URL" } })} fullWidth required />
                            </div>
                            <div className="company-avatar-section">
                                <IconButton aria-label="Company Avatar Upload Button" color="primary" component="label">
                                    <input aria-label="Company Avatar Photo" accept="image/jpeg, image/jpg, image/png" name="companyAvatar" onChange={handleCompanyAvatarChange} type="file" hidden required />
                                    <PhotoCameraIcon />
                                </IconButton>
                                Company Avatar (required)
                            </div>
                            <div className="next-button-container">
                                <DemoDogButton buttonColor={colors.salmonPink} className="next-button" onClick={handleNextStep} text="Next" isNormal/>
                            </div>
                        </GeneralCompanyForm>
                    )}
                    {currentStep === 1 && (
                        <GeneralCompanyForm>
                            <div className="company-form-header" style={{ paddingLeft: 10 }}>
                                <h1 className="company-form-header-text">Employee Information</h1>
                            </div>
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
                                    <TextField aria-label="Employee email" color={errors.employeeEmail ? 'error' : 'primary'} helperText={<p style={{ color: errors.employeeEmail ? colors.error : colors.black}}>Required</p>} label="Employee email" {...register('employeeEmail', { required: true })} type="email" fullWidth required />
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
                                    <TextField aria-label="Employee LinkedIn" color={errors.linkedIn ? 'error' : 'primary'} helperText={<p style={{ color: errors.linkedIn ? colors.error : colors.black }}>Required {errors.linkedIn ? 'Must enter a valid LinkedIn URL.' : ''}</p>}  label="LinkedIn" type="url" {...register('linkedIn', { required: true, validate: { validEmail: v => checkValidUrl(v)|| "Must enter a valid LinkedIn URL." } })} fullWidth required />
                                </div>
                            </div>
                            <div className="company-avatar-section">
                                <IconButton aria-label="Employee Avatar Upload Button" color="primary" component="label">
                                    <input aria-label="Employee Avatar Photo" accept="image/jpeg, image/jpg, image/png" name="employeeAvatar" onChange={handleEmployeeAvatarChange} type="file" hidden />
                                    <PhotoCameraIcon />
                                </IconButton>
                                Employee Avatar (required)
                            </div>
                            <div className="back-submit-buttons-container">
                                <DemoDogButton buttonColor={colors.salmonPink} className="back-button" onClick={() => setCurrentStep(0)} text="Back" isNormal/>
                                <DemoDogButton buttonColor={colors.navyBlue} className="submit-button" text="Submit" type="submit" isNormal/>
                            </div>
                        </GeneralCompanyForm>
                    )}
                </form>
            </div>
        </SignUpPageContainer>
    );
}