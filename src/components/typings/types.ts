import { ButtonProps } from '@mui/material/Button';
import { TextFieldProps } from '@mui/material/TextField';

export type CustomDemoDogButtonType = {
    buttonColor?: string;
    isDark?: boolean;
    isTextBtn?: boolean;
    isOutlined?: boolean;
    isNormal?: boolean;
}

export type DemoDogButtonType = ButtonProps & CustomDemoDogButtonType & {
    text: string;
};

export type DemoDogComboBoxType = {
    getOptionLabel: (option: any) => string;
    isFullWidth?: boolean;
    options: Array<any>;
    renderOption?: any;
    textFieldColor?: string;
};

export type DemoDogTextFieldType = TextFieldProps & {
    isDarkMode?: boolean;
    textFieldColor?: string;
};
