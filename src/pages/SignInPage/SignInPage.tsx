import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import SignUpPageContainer from '../SignUpPage/SignUpPageContainer'
import GeneralCompanyForm from '../../components/forms/GeneralCompanyForm';
import { DemoDogButton, colors } from "../../components";
import { checkValidEmail } from '../../utils/validation'
import { postNonBinaryData } from "../../utils/requests";
import { useIsLoading, useShowDialog, useStartupEmployeeData } from "../../hooks";

type SignInFormProps = {
    email: string;
    password: string;
};

export default function SignInPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormProps>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const { setEmployee } = useStartupEmployeeData();
    const { setIsLoading } = useIsLoading();
    const { handleDialogMessageChange, setDialogMessage, setDialogTitle, setIsError } = useShowDialog();

    async function handleLogin(data: SignInFormProps) {
        setIsLoading(true);

        postNonBinaryData({
            data,
            endpoint: 'api/login-startup-employee',
        }).then(res => {
            const { isSuccess, message, user } = res;
            if (!isSuccess) {
                setIsLoading(false);
                setIsError(true);
                setDialogMessage(message);
                setDialogTitle('Error');
                handleDialogMessageChange(true);
                return;
            }

            setEmployee(user);
            setIsLoading(false);
            setIsError(false);
            setDialogMessage(message);
            setDialogTitle('Success');
            handleDialogMessageChange(true);
            navigate('/startup-dashboard/main');
            return;
        }).catch(errors => {
            setIsLoading(false);
            setIsError(true);
            setDialogMessage(errors.message);
            setDialogTitle('Error');
            handleDialogMessageChange(true);
        });
    }

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