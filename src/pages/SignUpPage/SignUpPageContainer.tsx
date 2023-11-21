import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../../components';

type SignUpPageContainerProps = {
    children: React.ReactNode;
};

const SignUpPageStyledContainer = styled.div`
    background-color: ${colors.navyBlue};
    height: 100%;
    overflow: auto;
    padding-bottom: 50px;
    width: 100vw;

    .sign-up-page-header {
        display: flex;
        justify-content: center;
        padding-top: 75px;

        .sign-up-page-header-text {
            color: ${colors.white};
            font-weight: 900;
            font-size: 40px;
        }
    }

    .form-container {
        display: flex;
        justify-content: center;
    }
`;

export default function SignUpPageContainer({
    children,
}: SignUpPageContainerProps) {
    return <SignUpPageStyledContainer>{children}</SignUpPageStyledContainer>;
}