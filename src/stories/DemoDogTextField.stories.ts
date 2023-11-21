import { Meta, StoryObj } from '@storybook/react';
import { DemoDogTextField, colors } from '../components';

const meta: Meta<typeof DemoDogTextField> = {
    component: DemoDogTextField,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DemoDogTextField>;

export const DefaultTextField: Story = {
    args: {
        isDarkMode: false,
        label: 'Label',
        textFieldColor: colors.mint,
    },
};