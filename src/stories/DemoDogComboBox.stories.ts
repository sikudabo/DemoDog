import { Meta, StoryObj } from '@storybook/react';
import { DemoDogComboBox, colors } from '../components';

const meta: Meta<typeof DemoDogComboBox> = {
    component: DemoDogComboBox,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DemoDogComboBox>;

const users = [
    {
        firstName: 'Simeon',
        lastName: 'Ikudabo',
        age: 31,
        profession: 'Software Engineer',
    },
    {
        firstName: 'Christine',
        lastName: 'Green',
        age: 30,
        profession: 'Nurse',
    },
    {
        firstName: 'Ellie',
        lastName: 'Dedinsky',
        age: 29,
        profession: 'Human Resources',
    },
    {
        firstName: 'Damon',
        lastName: 'Graham',
        age: 29,
        profession: 'Teacher',
    },
];

export const Default: Story  = {
    args: {
        getOptionLabel: (option) => option.firstName,
        options: users,
        textFieldColor: colors.mint,
    },
};
