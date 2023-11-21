import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from './colors';
import { DemoDogButtonType, CustomDemoDogButtonType } from './typings/types';

const customDemoDogButtonStyles = ({ buttonColor, isDark, isNormal, isOutlined }: CustomDemoDogButtonType) => css`
    background-color: ${isOutlined ? 'transparent' : isNormal ? buttonColor : 'transparent'};
    border: ${isOutlined ? `2px solid ${buttonColor}` : 'none'};
    color: ${(isOutlined && isDark) || isNormal ? colors.white : buttonColor};

    &:hover {
        background-color: ${isNormal ? buttonColor : 'transparent'}
    }
`;

const CustomDemoDogButton = styled(Button)`
    border-radius: 5px;
    font-weight: 900;
    text-transform: none;

    ${({ buttonColor, isTextBtn}) => css`
        color: ${isTextBtn ? buttonColor : ''}
    `}

    ${customDemoDogButtonStyles};
`;

export default function DemoDogButton(props: DemoDogButtonType) {
    const { text } = props;
    return (
        <CustomDemoDogButton
            {...props}
            disableElevation
            disableRipple
        >
            {text}
        </CustomDemoDogButton>
    );
}