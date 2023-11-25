import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import SignUpPageContainer from '../SignUpPage/SignUpPageContainer'
import GeneralCompanyForm from '../../components/forms/GeneralCompanyForm';
import { DemoDogButton, colors } from "../../components";
import { checkValidEmail } from '../../utils/validation'
import { postNonBinaryData } from "../../utils/requests";
import { useIsLoading, useOrganizationData, useShowDialog, useStartupCompanyData, useStartupEmployeeData } from "../../hooks";

type SignInFormProps = {
    email: string;
    password: string;
};

export default function SignInPage() {
    const [isStartupCustomer, setIsStartupCustomer] = useState('startup-customer');

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormProps>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const { setCompany } = useStartupCompanyData();
    const { setEmployee } = useStartupEmployeeData();
    const { setOrganization } = useOrganizationData();
    const { setIsLoading } = useIsLoading();
    const { handleDialogMessageChange, setDialogMessage, setDialogTitle, setIsError } = useShowDialog();

    async function handleLogin(data: SignInFormProps) {
        setIsLoading(true);

        postNonBinaryData({
            data,
            endpoint: isStartupCustomer === 'startup-customer' ? 'api/login-startup-employee' : 'api/login-organization',
        }).then(res => {
            const { company, isSuccess, message, user } = res;
            if (!isSuccess) {
                setIsLoading(false);
                setIsError(true);
                setDialogMessage(message);
                setDialogTitle('Error');
                handleDialogMessageChange(true);
                return;
            }

            if (isStartupCustomer === 'startup-customer') {
                setCompany(company);
                setEmployee(user);
                setIsLoading(false);
                setIsError(false);
                setDialogMessage(message);
                setDialogTitle('Success');
                handleDialogMessageChange(true);
                navigate('/startup-dashboard/main');
                return;
            }

            setIsLoading(false);
            setIsError(false);
            setDialogMessage(message);
            setDialogTitle('Success');
            handleDialogMessageChange(true);
            setOrganization(user);
            navigate('/search-companies');
            return;
        }).catch(errors => {
            setIsLoading(false);
            setIsError(true);
            setDialogMessage(errors.message);
            setDialogTitle('Error');
            handleDialogMessageChange(true);
        });
    }

    function toggleIsStartupCustomer(e: { target: { value: string }}) {
        setIsStartupCustomer(e.target.value);
    };

    return (
        <SignUpPageContainer backgroundColor={colors.salmonPink}>
            <div className="sign-up-page-header">
                <h1 className="sign-up-page-header-text">Sign In!</h1>
            </div>
            <div className="form-container">
                <form onSubmit={(handleSubmit(handleLogin))}>
                    <GeneralCompanyForm>
                        <div className="company-url-section" style={{ paddingTop: 40 }}>
                            <TextField aria-label="Employee Email" color={errors.email ? 'error' : 'primary'} helperText={<p style={{ color: errors.email ? colors.error : colors.black  }}>Must enter a valid Email</p>} label="Email" type="email" {...register('email', { required: true, validate: { validUrl: v => checkValidEmail(v) || "You must enter a valid email!" } })} fullWidth required />
                        </div>
                        <div className="company-url-section" style={{ paddingTop: 40 }}>
                            <TextField aria-label="Employee Password" color={errors.password ? 'error' : 'primary'} helperText={<p style={{ color: errors.password ? colors.error : colors.black  }}>Must enter a valid Password</p>} label="Password" type="password" {...register('password', { required: true, validate: { validUrl: v => v.length >= 6 || "You must enter a valid password!" } })} fullWidth required />
                        </div>
                        <div style={{ paddingLeft: 20, paddingRight: 20}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Are you signing in as a startup customer or an organization/investor?</FormLabel>
                                <RadioGroup
                                    aria-label="startup customer  question"
                                    name="startup-customer"
                                    onChange={toggleIsStartupCustomer}
                                    value={isStartupCustomer}
                                >
                                    <FormControlLabel value="startup-customer" control={<Radio />} label="Startup" />
                                    <FormControlLabel value="organization-customer" control={<Radio />} label="Organization/Investor" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="back-submit-buttons-container" style={{ paddingTop: 40 }}>
                            <DemoDogButton buttonColor={colors.salmonPink} className="back-button" text="Forgot?" isOutlined/>
                            <DemoDogButton buttonColor={colors.navyBlue} className="submit-button" text="Login" type="submit" isNormal/>
                        </div>
                    </GeneralCompanyForm>
                </form>
            </div>
        </SignUpPageContainer>
    );
}