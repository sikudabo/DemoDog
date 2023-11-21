import { useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import DemoDogTextField from './DemoDogTextField';
import { DemoDogComboBoxType } from './typings/types';

declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
      danger: true;
      link: true;
    }
}

export default function DemoDogComboBox({
    isFullWidth = true,
    options,
    renderOption,
    textFieldColor = '#990000',
}: DemoDogComboBoxType) {

    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option: any) => option.firstName + ' ' + option.lastName + ' ' + option.profession,
    });

    return (
        <Autocomplete
            filterOptions={filterOptions}
            getOptionLabel={(options: any) => options.firstName + ' ' + options.lastName}
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <DemoDogTextField {...params} fullWidth={isFullWidth} label="Users" textFieldColor={textFieldColor} variant="outlined" />}
            renderOption={(props, option) => (
                <Box component="li" {...props}>
                    <p>{option.firstName}</p>
                </Box>
            )}
            disablePortal
        />
    );
}