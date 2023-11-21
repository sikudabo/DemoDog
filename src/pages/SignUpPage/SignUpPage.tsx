import SignUpPageContainer from './SignUpPageContainer';
import { DemoDogTextField } from '../../components';
import { GeneralCompanyForm } from '../../components/forms';
import { colors } from '../../components';

export default function SignUpPage() {
    return (
        <SignUpPageContainer>
            <div className="sign-up-page-header">
                <h1 className="sign-up-page-header-text">Sign Up!</h1>
            </div>
            <div className="form-container">
                <GeneralCompanyForm>
                    <div className="company-form-header">
                        <h1 className="company-form-header-text">Company Information</h1>
                    </div>
                    <div className="company-name-email">
                        <div className="company-name-container">
                            <DemoDogTextField label="Company Name" textFieldColor={colors.navyBlue} fullWidth />
                        </div>
                        <div className="email-container">
                            <DemoDogTextField label="Email" textFieldColor={colors.navyBlue} type="email" fullWidth />
                        </div>
                    </div>
                </GeneralCompanyForm>
            </div>
        </SignUpPageContainer>
    );
}