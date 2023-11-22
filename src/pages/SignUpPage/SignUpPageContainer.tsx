import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '../../components';

type SignUpPageContainerProps = {
    backgroundColor?: string;
    children: React.ReactNode;
};

const SignUpPageStyledContainer = styled.div<{
    backgroundColor: string;
}>`
    background-color: ${colors.navyBlue};

    ${({ backgroundColor }) => css`
        background-color: ${backgroundColor};
    `}

    padding-bottom: 50px;
    height: 100%;
    min-height: 100vh;
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
    backgroundColor = colors.navyBlue,
    children,
}: SignUpPageContainerProps) {
    return <SignUpPageStyledContainer backgroundColor={backgroundColor}>{children}</SignUpPageStyledContainer>;
}