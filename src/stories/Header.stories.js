import React from 'react';

import { Header } from '../components/Header';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};