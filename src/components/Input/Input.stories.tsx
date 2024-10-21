import React from 'react';
import { Input } from './Input';

export default {
	title: '通用/Input',
	component: Input,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as any;

const Template: any = (args: any) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	label: 'Input1',
};

export const Secondary = Template.bind({});
Secondary.args = {
	label: 'Input2',
};


