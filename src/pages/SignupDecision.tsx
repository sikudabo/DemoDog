import { useState } from 'react';
import styled from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useNavigate } from 'react-router-dom';
import { DemoDogButton, colors } from '../components';

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 100px;

    .paper-container {
        padding-left: 20px;
        padding-right: 20px;
        width: 100%;

        .top-header {
            .top-header-text {
                font-size: 24px;
                font-weight: 500;
            }
        }

        .decision-container {
            padding-bottom: 20px;
        }

        .button-container {
            padding-bottom: 20px;
        }
    }
`;

export default function SignupDecision() {
    const [nextPage, setNextPage] = useState('startup-customer');
    const navigate = useNavigate();

    function handlePageSelectionChange(e: { target: {value: string }}) {
        setNextPage(e.target.value);
    };

    function navigateToNextPage() {
        if (nextPage ==='startup-customer') {
            navigate('/sign-up');
            return;
        }

        navigate('/sign-up-organization');
    };

    return (
        <Container>
            <Paper className="paper-container" elevation={10}>
                <div className="top-header">
                    <p className="top-header-text">
                        Sign up as a startup customer looking to market your product, gain customers, and 
                        possibly partner with us to build you an MVP or a demo of 
                        a new product, or sign up as an organization/investor looking 
                        to find companies to do business with or invest in!
                    </p>
                </div>
                <div className="decision-container">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Are you a startup customer or organization/investor?</FormLabel>
                        <RadioGroup
                            aria-label="startup customer  question"
                            name="startup-customer"
                            onChange={handlePageSelectionChange}
                            value={nextPage}
                        >
                            <FormControlLabel value="startup-customer" control={<Radio />} label="Startup" />
                            <FormControlLabel value="organization-customer" control={<Radio />} label="Organization/Investor" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="button-container">
                    <DemoDogButton buttonColor={colors.navyBlue} onClick={navigateToNextPage} text="Next" isNormal fullWidth />
                </div>
            </Paper>
        </Container>
    );
}
