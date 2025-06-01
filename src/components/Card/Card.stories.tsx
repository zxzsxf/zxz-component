import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Card } from './index';

export default {
  title: 'Components/Card',
  component: Card,
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '卡片标题',
  children: '这是一个简单的卡片内容示例',
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  children: '这是一个没有标题的卡片示例',
};

export const LongContent = Template.bind({});
LongContent.args = {
  title: '长内容卡片',
  children: (
    <div>
      <p>这是一个包含较长内容的卡片示例。</p>
      <p>它可以包含多个段落。</p>
      <p>适合展示较多的信息内容。</p>
    </div>
  ),
}; 