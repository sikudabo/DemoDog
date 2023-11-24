import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl'; 
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { DemoDogButton, colors } from '../../components';
import { GeneralCompanyForm } from '../../components/forms';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useFetchCompanyData, useIsLoading, useShowDialog, useStartupCompanyData, useGetStartupEmployeeData, useStartupEmployeeData } from '../../hooks';
import { postBinaryData, postNonBinaryData } from '../../utils/requests';
import { CompanyType } from '../../hooks/useStartupCompanyData';
import { checkValidEmail, checkValidUrl } from '../../utils/validation';
import { businessCategories } from '../../utils/constants';
import { resizeImage } from '../../utils/helpers';
import { StartupEmployeeType } from '../../typings/StartupEmployeeType';
import { Backdrop, CircularProgress } from '@mui/material';

const EditPageContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .header-container {
        padding-bottom: 20px;

        .header-text {
            font-size: 30px;
            font-weight: 900;
        }
    }

    .radio-buttons-container {
        padding-bottom: 20px;
    }
`;

type FormProps = {
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

export type CompanyFormProps = Pick<FormProps, 'companyDescription' | 'companyName' | 'companyUrl' | 'email' | 'selectedBusinessCategory'>;
export type EmployeeFormProps = Pick<FormProps, 'firstName' | 'lastName' | 'jobTitle' | 'linkedIn' | 'employeeEmail' | 'password'>;

type EditPageDisplayLayerProps = {
    companyData: CompanyType;
    employeeData: StartupEmployeeType;
    isLoading: boolean;
    setCompany: (company: CompanyType) => void;
    setIsLoading: (isLoading: boolean) => void;
};

export default function EditPage() {
    return <EditPage_DisplayLayer {...useDataLayer()} />;
}

function EditPage_DisplayLayer({
    companyData,
    employeeData,
    isLoading,
    setCompany,
    setIsLoading,
}: EditPageDisplayLayerProps) {
    const [currentPage, setCurrentPage] = useState<'company' | 'employee'>('company');
    const { avatar, description, companyName, companyUrl, companyEmail, category, _id } = typeof companyData !== 'undefined' && companyData ? companyData as CompanyType : { avatar: "", description: "", companyName: "", companyUrl: "", companyEmail: "", category: "", _id: ""};
    const { companyId, firstName, lastName, jobTitle, linkedIn, email, password, _id: employeeId } = typeof employeeData!== 'undefined'? employeeData as StartupEmployeeType : { companyId: "", firstName: "", lastName: "", jobTitle: "", linkedIn: "", email: "", password: "", _id: ""};
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [stateCompanyDescription, setStateCompanyDescription] = useState(description);
    const [descriptionLength, setDescriptionLength] = useState(typeof stateCompanyDescription !== 'undefined' && typeof stateCompanyDescription.length !== 'undefined' ? stateCompanyDescription.length : 0);
    const { register: registerCompany, handleSubmit: handleSubmitCompany, watch: watchCompany, formState: { errors: companyErrors }} = useForm<CompanyFormProps>({
        defaultValues: {
            companyDescription: description,
            companyName,
            companyUrl,
            email: companyEmail,
            selectedBusinessCategory: category,
        },
        mode: 'onChange',
    });
    const queryClient = useQueryClient();

    const { register: registerEmployee, handleSubmit: handleSubmitEmployee, watch: watchEmployee, formState: { errors: employeeErrors} } = useForm<EmployeeFormProps>({
        defaultValues: {
            firstName,
            lastName,
            jobTitle,
            linkedIn,
            employeeEmail: email,
            password,
        },
        mode: 'onChange',
    });

    const newCategory = watchCompany('selectedBusinessCategory');
    const newDescription = watchCompany('companyDescription');

    const { handleDialogMessageChange, setDialogMessage, setDialogTitle, setIsError } = useShowDialog();

    useEffect(() => {
        setSelectedCategory(newCategory);
    }, [newCategory]);

    useEffect(() => {
        setStateCompanyDescription(newDescription);
        setDescriptionLength(typeof newDescription !== 'undefined' && typeof newDescription.length !== 'undefined' ? newDescription.length : 0);
    }, [newDescription]);

    async function handleCompanyAvatarChange(e: { target: { files: any }}) {
        setIsLoading(true);
        const file = e.target.files[0];
        const resizedAvatar: any = await resizeImage(file);
        const fd = new FormData();
        fd.append('avatar', resizedAvatar, 'avatar.jpg');
        fd.append('companyId', _id);
        fd.append('oldAvatar', avatar);
        
        await postBinaryData({
            data: fd,
            endpoint: `api/update-company-avatar`,
        }).then(response => {
            const { isSuccess, message, updatedCompany } = response;

            if (!isSuccess) {
                setIsLoading(false);
                setIsError(true);
                setDialogTitle('Error');
                setDialogMessage(message);
                handleDialogMessageChange(true);
                return;
            }

            queryClient.invalidateQueries(['fetch-company-data', companyId]);
            setCompany(updatedCompany);
            setIsLoading(false);
            setIsError(false);
            setDialogTitle('Success');
            setDialogMessage(message);
            handleDialogMessageChange(true);
            return;

        }).catch(e => {
            console.error(e.message);
            setIsLoading(false);
            setIsError(true);
            setDialogTitle('Error');
            setDialogMessage('There was an error changing your company avatar! Please try again.');
            handleDialogMessageChange(true);
            return;
        });
    }

    async function sendCompanyData(data: CompanyFormProps) {
        setIsLoading(true);
        const { companyDescription: description, companyName, companyUrl, email: companyEmail, selectedBusinessCategory: category } = data;
        const currentData = {
            description,
            companyName,
            companyUrl,
            companyEmail,
            category,
            _id: companyId,
        };

        await postNonBinaryData({
            data: currentData,
            endpoint: `api/update-company`,
        }).then(response => {
            const { isSuccess, message, updatedCompany } = response;

            if (!isSuccess) {
                setIsLoading(false);
                setIsError(true);
                setDialogTitle('Error');
                setDialogMessage(message);
                handleDialogMessageChange(true);
                return;
            }

            setCompany(updatedCompany);
            queryClient.invalidateQueries(['fetch-company-data', companyId]);
            setIsLoading(false);
            setIsError(false);
            setDialogTitle('Success');
            setDialogMessage(message);
            handleDialogMessageChange(true);
            return;
        }).catch(e => {
            console.error(e.message);
            setIsLoading(false);
            setIsError(true);
            setDialogTitle('Error');
            setDialogMessage('There was an error updating your company! Please try again.');
            handleDialogMessageChange(true);
            return;
        });
    }

    async function sendEmployeeData(data: EmployeeFormProps) {
        setIsLoading(true);
        const { firstName, lastName, jobTitle, linkedIn, employeeEmail, password } = data;
        const currentData = {
            companyId,
            firstName,
            lastName,
            jobTitle,
            linkedIn,
            employeeEmail,
            password,
            _id: employeeId,
        };

        await postNonBinaryData({
            data: currentData,
            endpoint: `api/update-employee`,
        }).then(response => {
            const { isSuccess, message, user} = response;

            if (!isSuccess) {
                setIsLoading(false);
                setIsError(true);
                setDialogTitle('Error');
                setDialogMessage(message);
                handleDialogMessageChange(true);
                return;
            }

            queryClient.invalidateQueries(['get-startup-employee-data', user._id]);
            setCompany(user);
            setIsLoading(false);
            setIsError(false);
            setDialogTitle('Success');
            setDialogMessage(message);
            handleDialogMessageChange(true);
            return;
        }).catch(e => {
            console.error(e.message);
            setIsLoading(false);
            setIsError(true);
            setDialogTitle('Error');
            setDialogMessage('There was an error updating your account! Please try again.');
            handleDialogMessageChange(true);
            return;
        });
    }

    if (isLoading) {
        return (
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <DashboardLayout>
            <EditPageContainer>
                <div className="header-container">
                    <h1 className="header-text">Edit Page</h1>
                </div>  
                <div className="radio-buttons-container">
                    <FormControl component="fieldset">
                        <FormLabel id="top-radios" component="legend">Edit Accounts</FormLabel>
                        <RadioGroup
                            aria-labelledby="top-radios"
                            name="choice"
                            value={currentPage}
                            onChange={(e) => setCurrentPage(e.target.value as "company" | "employee")}
                        >
                            <FormControlLabel value="company" control={<Radio />} label="Company" />
                            <FormControlLabel value="employee" control={<Radio />} label="Personal" />
                        </RadioGroup>
                    </FormControl>
                </div>
                {currentPage === 'company' && (
                    <form onSubmit={handleSubmitCompany(sendCompanyData)}>
                        <GeneralCompanyForm>
                            <div className="company-form-header">
                                <h1 className="company-form-header-text">Company Information</h1>
                            </div>
                            <div className="company-name-email">
                                <div className="company-name-container">
                                    <TextField defaultValue={companyName} aria-label="Company Name" color={companyErrors.companyName ? 'error' : 'primary'} helperText={<p style={{ color: companyErrors.companyName ? colors.error : colors.black}}>Required</p>} label="Company Name" {...registerCompany('companyName', { required: true })} fullWidth required />
                                </div>
                                <div className="email-container">
                                    <TextField aria-label="Company Email" color={companyErrors.email ? 'error' : 'primary'} helperText={<p style={{ color: companyErrors.email ? colors.error : colors.black }}>Required {companyErrors.email ? 'Must enter a valid email' : ''}</p>}  label="Company Email" type="email" {...registerCompany('email', { required: true, validate: { validEmail: (v: string) => checkValidEmail(v) || "Must enter a valid email" }})} fullWidth required />
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
                                        {...registerCompany('selectedBusinessCategory', {required: true })}
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
                                <TextField aria-label="Company Description" color={companyErrors.companyDescription ? 'error' : 'primary'} helperText={<p style={{ color: companyErrors.companyDescription ? colors.error : colors.black }}>Required {descriptionLength} / 1000</p>} label="Company Description" maxRows={4} minRows={4}  {...registerCompany('companyDescription', { maxLength: 1000, required: true })} value={stateCompanyDescription} fullWidth multiline required />
                            </div>
                            <div className="company-url-section">
                                <TextField aria-label="CompanyUrl" color={companyErrors.companyUrl ? 'error' : 'primary'} helperText={<p style={{ color: companyErrors.companyUrl ? colors.error : colors.black  }}>Must enter a valid Url</p>} label="Company Url" type="url" {...registerCompany('companyUrl', { required: true, validate: { validUrl: v => checkValidUrl(v) || "You must enter a valid company URL" } })} fullWidth required />
                            </div>
                            <div className="company-avatar-section">
                                <IconButton aria-label="Company Avatar Upload Button" color="primary" component="label">
                                    <input aria-label="Company Avatar Photo" accept="image/jpeg, image/jpg, image/png" name="companyAvatar" onChange={handleCompanyAvatarChange} type="file" hidden/>
                                    <PhotoCameraIcon />
                                </IconButton>
                                Company Avatar (required)
                            </div>
                            <div className="next-button-container">
                                <DemoDogButton buttonColor={colors.navyBlue} className="next-button" type="submit"  text="Submit" fullWidth isNormal/>
                            </div>
                        </GeneralCompanyForm>
                    </form>
                )}
                {currentPage === 'employee' && (
                    <form onSubmit={handleSubmitEmployee(sendEmployeeData)}>
                        <GeneralCompanyForm>
                            <div className="company-form-header">
                                <h1 className="company-form-header-text">Employee Information</h1>
                            </div>
                            <div className="company-name-email">
                                <div className="company-name-container">
                                    <TextField aria-label="Employee first name" color={employeeErrors.firstName ? 'error' : 'primary'} helperText={<p style={{ color: employeeErrors.firstName ? colors.error : colors.black}}>Required</p>} label="First Name" {...registerEmployee('firstName', { required: true })} fullWidth required />
                                </div>
                                <div className="email-container">
                                    <TextField aria-label="Employee last name" color={employeeErrors.lastName ? 'error' : 'primary'} helperText={<p style={{ color: employeeErrors.lastName ? colors.error : colors.black }}>Required {employeeErrors.lastName ? 'Must enter a valid last name' : ''}</p>}  label="Last Name" {...registerEmployee('lastName', { required: true })} fullWidth required />
                                </div>
                            </div>
                            <div className="company-name-email">
                                <div className="company-name-container">
                                    <TextField aria-label="Employee email" color={employeeErrors.employeeEmail ? 'error' : 'primary'} helperText={<p style={{ color: employeeErrors.employeeEmail ? colors.error : colors.black}}>Required</p>} label="Employee email" {...registerEmployee('employeeEmail', { required: true })} type="email" fullWidth required />
                                </div>
                                <div className="email-container">
                                    <TextField aria-label="Employee password" color={employeeErrors.password ? 'error' : 'primary'} helperText={<p style={{ color: employeeErrors.password ? colors.error : colors.black }}>Required (6 character min) {employeeErrors.password ? 'Must enter a valid password' : ''}</p>}  label="Password" type="password" {...registerEmployee('password', { required: true, validate: { enoughChars: v => v.length >= 6 || "Password must be at least 6 characters long" } })} fullWidth required />
                                </div>
                            </div>
                            <div className="company-name-email">
                                <div className="company-name-container">
                                    <TextField aria-label="Employee job title" color={employeeErrors.jobTitle ? 'error' : 'primary'} helperText={<p style={{ color: employeeErrors.jobTitle ? colors.error : colors.black }}>Required</p>} label="Job Title" {...registerEmployee('jobTitle', { required: true })} fullWidth required />
                                </div>
                                <div className="email-container">
                                    <TextField aria-label="Employee LinkedIn" color={employeeErrors.linkedIn ? 'error' : 'primary'} helperText={<p style={{ color: employeeErrors.linkedIn ? colors.error : colors.black }}>Required {employeeErrors.linkedIn ? 'Must enter a valid LinkedIn URL.' : ''}</p>}  label="LinkedIn" type="url" {...registerEmployee('linkedIn', { required: true, validate: { validEmail: v => checkValidUrl(v)|| "Must enter a valid LinkedIn URL." } })} fullWidth required />
                                </div>
                            </div>
                            <div className="next-button-container">
                                <DemoDogButton buttonColor={colors.navyBlue} className="next-button" type="submit"  text="Submit" fullWidth isNormal/>
                            </div>
                        </GeneralCompanyForm>
                    </form>
                )}
            </EditPageContainer>
        </DashboardLayout>
    );
}


function useDataLayer() {
    const { data: companyData, isLoading } = useFetchCompanyData();
    const { data: employeeData, isLoading: isEmployeeLoading } = useGetStartupEmployeeData();
    const { setIsLoading } = useIsLoading();
    const { company, setCompany } = useStartupCompanyData();
    const { employee, setEmployee } = useStartupEmployeeData();

    useEffect(() => {
        console.log('The company data is: ', companyData);
       setIsLoading(isLoading);
       if (!isLoading && typeof companyData !== 'undefined') {
        setCompany(companyData);
    }
    }, [isLoading, companyData])

    useEffect(() => {
        setIsLoading(isEmployeeLoading);
        if (!isEmployeeLoading && typeof employeeData !== 'undefined') {
            setEmployee(employeeData);
        }
    }, [isEmployeeLoading, employeeData]);
    
    return {
        companyData: company as CompanyType,
        employeeData: employee as StartupEmployeeType,
        isLoading,
        setCompany,
        setIsLoading,
    };
}