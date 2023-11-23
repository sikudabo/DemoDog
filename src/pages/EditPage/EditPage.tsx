import { useEffect, useState } from 'react';
import SelectInput from '@mui/material/Select/SelectInput'; 
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl'; 
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { colors } from '../../components';
import { GeneralCompanyForm } from '../../components/forms';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useFetchCompanyData, useIsLoading, useStartupEmployeeData } from '../../hooks';
import { postBinaryData, postNonBinaryData } from '../../utils/requests';
import { CompanyDataType } from '../../typings/CompanyDataType';
import { checkValidEmail } from '../../utils/validation';
import { businessCategories } from '../../utils/constants';

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
    companyData: CompanyDataType;
};

export default function EditPage() {
    return <EditPage_DisplayLayer {...useDataLayer()} />;
}

function EditPage_DisplayLayer({
    companyData,
}: EditPageDisplayLayerProps) {
    const [currentPage, setCurrentPage] = useState<'company' | 'employee'>('company');
    const { description = "", companyName, companyUrl, companyEmail, category, _id } = companyData as CompanyDataType;
    const [selectedCategory, setSelectedCategory] = useState(category);
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

    return (
        <DashboardLayout>
            <EditPageContainer>
                <div className="header-container">
                    <h1 className="header-text">Edit Page</h1>
                </div>  
                <div className="radio-buttons-container">
                    <FormControl component="fieldset">
                        <FormLabel id="top-radios" component="legend">Account</FormLabel>
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
                                    <TextField aria-label="Company Name" color={companyErrors.companyName ? 'error' : 'primary'} helperText={<p style={{ color: companyErrors.companyName ? colors.error : colors.black}}>Required</p>} label="Company Name" {...registerCompany('companyName', { required: true })} fullWidth required />
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

    useEffect(() => {
       setIsLoading(isLoading);
            
    }, [isLoading])
    
    return {
        companyData: !isLoading ? companyData : { description: "", companyName: "", companyUrl: "", email: "", selectedBusinessCategory: "" }
    };
}