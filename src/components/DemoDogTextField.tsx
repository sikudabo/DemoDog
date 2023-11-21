import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from './colors';
import { DemoDogTextFieldType } from './typings/types';

const StyledTextField = styled(TextField)<{
    isDarkMode?: boolean;
    textFieldColor?: string;
}>`
    label {
        color: ${colors.black};
    }


    ${({ isDarkMode, textFieldColor }) => css`
        label {
            color: ${isDarkMode ? colors.white : colors.black};
        } 

        label.MuiInputLabel-shrink {
            color: ${isDarkMode ? colors.white : textFieldColor ? textFieldColor : colors.crimson};
        }

        input {
            color: ${isDarkMode? colors.white : colors.black};
        }

        & .MuiOutlinedInput-root {
            label {
                display: none;
            }
            &.Mui-focused fieldset {
                border-color: ${textFieldColor ? textFieldColor : colors.crimson};
            }
        }
    `}
`;



export default function DemoDogTextField(props: DemoDogTextFieldType) {

    return (
        <StyledTextField {...props} />
    );
}