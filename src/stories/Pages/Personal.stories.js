import React from 'react';

import { Personal } from '../../components/Pages/Personal';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Personal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Personal {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    title: "Личный Кабинет"
};