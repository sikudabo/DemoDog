import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import SignUpPageContainer from '../SignUpPage/SignUpPageContainer'
import GeneralCompanyForm from '../../components/forms/GeneralCompanyForm';
import { colors } from "../../components";
import { checkValidEmail } from '../../utils/validation'

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

    return (
        <SignUpPageContainer backgroundColor={colors.salmonPink}>
            <div className="sign-up-page-header">
                <h1 className="sign-up-page-header-text">Sign In!</h1>
            </div>
            <div className="form-container">
                <form>
                    <GeneralCompanyForm>
                        <div className="company-url-section" style={{ paddingTop: 40 }}>
                            <TextField aria-label="Employee Email" color={errors.email ? 'error' : 'primary'} helperText={<p style={{ color: errors.email ? colors.error : colors.black  }}>Must enter a valid Email</p>} label="Email" type="email" {...register('email', { required: true, validate: { validUrl: v => checkValidEmail(v) || "You must enter a valid email!" } })} fullWidth required />
                        </div>
                        <div className="company-url-section" style={{ paddingTop: 40 }}>
                            <TextField aria-label="Employee Password" color={errors.password ? 'error' : 'primary'} helperText={<p style={{ color: errors.password ? colors.error : colors.black  }}>Must enter a valid Password</p>} label="Password" type="password" {...register('password', { required: true, validate: { validUrl: v => v.length >= 6 || "You must enter a valid password!" } })} fullWidth required />
                        </div>
                    </GeneralCompanyForm>
                </form>
            </div>
        </SignUpPageContainer>
    );
}