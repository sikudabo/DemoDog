import React from 'react';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import { colors } from '../colors';
import { deviceBreakPointsMaxWidth } from '../../utils/constants';

type GeneralCompanyFormProps = {
    children: React.ReactNode;
};

const StyledPaper = styled(Paper)`
    align-self: center;
    background-color: ${colors.white};
    height: 80vh;
    opacity: 0.7;
    overflow: auto;
    width: 80vw;

    @media ${deviceBreakPointsMaxWidth.tablet} {
        height: '100%';
        width: 100vw;
    }

    .company-form-header {
        display: flex;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 20px;

        .company-form-header-text {
            color: ${colors.navyBlue};
            font-size: 30px;
            font-weight: 900;
        }
    }

    .company-name-email {
        display: flex;
        flex-direction: row;
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            flex-direction: column;
        }

        .company-name-container {
            width: 50%;
            
            @media ${deviceBreakPointsMaxWidth.tablet} {
                width: 100%;
            }
        }

        .email-container {
            margin-left: 10px;
            width: 50%;

            @media ${deviceBreakPointsMaxWidth.tablet} {
                margin-left: 0;
                padding-top: 10px;
                width: 100%;
            }
        }
    }

    .company-category-select {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        width: 100vw;

        .select-component {
            width: 100%;
        }
    }

    .company-description-section {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        width: '100%';
    }

    .company-url-section {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        width: 100%;
    }

    .company-avatar-section {
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        width: 100%;
    }
`;

export default function GeneralCompanyForm({
    children,
}: GeneralCompanyFormProps) {
    return (
        <StyledPaper>{children}</StyledPaper>
    );
}