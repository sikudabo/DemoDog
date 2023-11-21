import { useEffect, useState } from 'react';
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
import { GeneralCompanyForm } from '../../components/forms';
import { DemoDogButton, colors } from '../../components';
import { businessCategories } from '../../utils/constants';
import { resizeImage } from '../../utils/helpers';
import { checkValidEmail, checkValidUrl } from '../../utils/validation';

type FormProps = {
    companyDescription: string;
    companyName: string;
    companyUrl: string;
    email: string;
    selectedBusinessCategory: string;
};

export default function SignUpPage() {
    const [selectedCategory, setSelectedCategory] = useState(businessCategories[0]);
    const [stateCompanyDescription, setCompanyDescription] = useState('');
    const [companyAvatar, setCompanyAvatar] = useState<File>();

    const { handleSubmit, register, watch, formState: { errors } } = useForm<FormProps>({
        defaultValues: {
            companyDescription: '',
            companyName: '',
            companyUrl: '',
            email: '',
            selectedBusinessCategory: businessCategories[0],
        },
        mode: 'onChange',
    });
    const newCategory = watch('selectedBusinessCategory');
    const newDescription = watch('companyDescription');
    const newCompanyName = watch('companyName');
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        setSelectedCategory(newCategory);
    }, [newCategory]);

    useEffect(() => {
        setCompanyDescription(newDescription);
        if (typeof newDescription !== 'undefined') {
            setDescriptionLength(newDescription.length);
    
        }
    }, [newDescription]);

    useEffect(() => {
        console.log('The new company name is: ', newCompanyName);
    }, [newCompanyName]);

    const handleCompanyAvatarChange = async (e: { target: { files: any }}) => {
        const file = e.target.files[0];
        const resizedAvatar = await resizeImage(file);
        setCompanyAvatar(resizedAvatar as File);
    }

    const handleSendData = (data: FormProps) => {
        console.log('The data is:', data);
    }


    return (
        <SignUpPageContainer>
            <div className="sign-up-page-header">
                <h1 className="sign-up-page-header-text">Sign Up!</h1>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit(handleSendData)}>
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
                        <DemoDogButton buttonColor={colors.salmonPink} text="Send" type="submit" isNormal/>
                    </GeneralCompanyForm>
                </form>
            </div>
        </SignUpPageContainer>
    );
}