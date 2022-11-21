import React from 'react';

import { FormFieldArray } from '../../components/UI/FormField';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: FormFieldArray,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FormFieldArray {...args}/>

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  id: 'Field',
  name: 'field',
  placeholder: "массив",
  onFocus: (e) => {console.log(e)},
  onChange: (e) => {console.log(e)},
  type: "text",
  required: true,
  className: "max-w-lg"
};