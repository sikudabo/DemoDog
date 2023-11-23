import { useEffect, useState } from 'react';
import SelectInput from '@mui/material/Select/SelectInput'; 
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
import { DemoDogButton, colors } from '../../components';
import { GeneralCompanyForm } from '../../components/forms';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useFetchCompanyData, useIsLoading, useShowDialog, useStartupCompanyData, useStartupEmployeeData } from '../../hooks';
import { postBinaryData, postNonBinaryData } from '../../utils/requests';
import { CompanyType } from '../../hooks/useStartupCompanyData';
import { checkValidEmail, checkValidUrl } from '../../utils/validation';
import { businessCategories } from '../../utils/constants';
import { resizeImage } from '../../utils/helpers';

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

export type CompanyFormProps = Pick<FormProps, 'companyDescription' | 'companyName' | 'companyUrl' | 'email' | 'selectedBusinessCategory'>

type EditPageDisplayLayerProps = {
    companyData: CompanyType;
    isLoading: boolean;
    setCompany: (company: CompanyType) => void;
    setIsLoading: (isLoading: boolean) => void;
};

export default function EditPage() {
    return <EditPage_DisplayLayer {...useDataLayer()} />;
}

function EditPage_DisplayLayer({
    companyData,
    isLoading,
    setCompany,
    setIsLoading,
}: EditPageDisplayLayerProps) {
    const [companyAvatar, setCompanyAvatar] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<'company' | 'employee'>('company');
    const { avatar, description, companyName, companyUrl, companyEmail, category, _id } = typeof companyData !== 'undefined' ? companyData as CompanyType : { avatar: "", description: "", companyName: "", companyUrl: "", companyEmail: "", category: "", _id: ""};
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [stateCompanyDescription, setStateCompanyDescription] = useState(description);
    const [descriptionLength, setDescriptionLength] = useState(stateCompanyDescription.length);
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

    const newCategory = watchCompany('selectedBusinessCategory');
    const newDescription = watchCompany('companyDescription');

    const { handleDialogMessageChange, setDialogMessage, setDialogTitle, setIsError } = useShowDialog();

    useEffect(() => {
        setSelectedCategory(newCategory);
    }, [newCategory]);

    useEffect(() => {
        setStateCompanyDescription(newDescription);
        setDescriptionLength(newDescription.length);
    }, [newDescription]);

    if (isLoading || !description) {
        return <div>Loading...</div>
    }

    async function handleCompanyAvatarChange(e: { target: { files: any }}) {
        setIsLoading(true);
        const file = e.target.files[0];
        const resizedAvatar: any = await resizeImage(file);
        setCompanyAvatar(resizedAvatar);
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
                setCompanyAvatar(null);
                return;
            }

            setCompany(updatedCompany);
            setIsLoading(false);
            setIsError(false);
            setDialogTitle('Success');
            setDialogMessage(message);
            handleDialogMessageChange(true);
            setCompanyAvatar(null);
            return;

        }).catch(e => {
            console.error(e.message);
            setIsLoading(false);
            setIsError(true);
            setDialogTitle('Error');
            setDialogMessage('There was an error changing your company avatar! Please try again.');
            handleDialogMessageChange(true);
            setCompanyAvatar(null);
            return;
        });
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
                    <form>
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
                                    <input aria-label="Company Avatar Photo" accept="image/jpeg, image/jpg, image/png" name="companyAvatar" onChange={handleCompanyAvatarChange} type="file" hidden required />
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
                    <GeneralCompanyForm>
                        <div className="company-form-header">
                            <h1 className="company-form-header-text">Employee Information</h1>
                        </div>
                    </GeneralCompanyForm>
                )}
            </EditPageContainer>
        </DashboardLayout>
    );
}


function useDataLayer() {
    const { data: companyData, isLoading } = useFetchCompanyData();
    const { setIsLoading } = useIsLoading();
    const { company, setCompany } = useStartupCompanyData();

    useEffect(() => {
       setIsLoading(isLoading);
       if (!isLoading && companyData) {
        setCompany(companyData);
    }
    }, [isLoading, companyData])
    
    return {
        companyData: company as CompanyType,
        isLoading,
        setCompany,
        setIsLoading,
    };
}