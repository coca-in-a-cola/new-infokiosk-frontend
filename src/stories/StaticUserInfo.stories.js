import React from 'react';

import { StaticUserInfo } from '../components/UserInfo';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: StaticUserInfo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <StaticUserInfo {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  userName: 'Иван Иванов',
};

export const White = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
White.args = {
  userName: 'Иван Иванов',
  textClassName: 'text-white',
};