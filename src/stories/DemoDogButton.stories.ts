import { Meta, StoryObj } from '@storybook/react';
import { DemoDogButton, colors } from '../components';

const meta: Meta<typeof DemoDogButton> = {
    component: DemoDogButton,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DemoDogButton>;

export const OutlinedButton: Story = {
    args: {
        buttonColor: colors.primary,
        isOutlined: true,
        text: 'Outlined',
    },
};

export const NormalButton: Story = {
    args: {
        buttonColor: colors.crimson,
        isNormal: true,
        text: 'Normal',
    },
};

export const TextButton: Story = {
    args: {
        buttonColor: colors.mistyBlue,
        isTextBtn: true,
        text: 'Text',
    },
};

export const FullWidthButton: Story = {
    args: {
        buttonColor: colors.salmonPink,
        fullWidth: true,
        isOutlined: true,
        text: 'Full Width Button',
    },
};

