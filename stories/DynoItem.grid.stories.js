import DynoItem from '@/components/DynoItem.vue';
import controls from './control';

export default {
  title: 'DynoItem/grid',
  component: DynoItem,
  argTypes: {
    ...controls,
  },
  decorators: [() => (
    {
      template: '<div style="flex-grow: 1; border: 1px solid black; '
        + 'background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 40px 40px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 40px 40px;">'
        + '<story/>'
        + '</div>',
    }
  )],
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DynoItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<DynoItem :grid="[40,40]" >'
    + '<div>grid 40x40</div>'
    + '</DynoItem>',
});

export const Grid40x40 = Template.bind({});
Grid40x40.args = {};
