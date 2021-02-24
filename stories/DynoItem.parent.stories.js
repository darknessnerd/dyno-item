import DynoItem from '@/components/DynoItem.vue';
import controls from './control';

export default {
  title: 'DynoItem/parent',
  component: DynoItem,
  argTypes: {
    ...controls,
    parent: { control: { type: 'boolean' } },
    className: {
      table: { disable: true },
    },
  },
  decorators: [() => (
    { template: '<div style="flex-grow: 1; border: 1px solid black;"><story/></div>' }
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
  template: '<DynoItem :parent="args.parent" >'
    + '<div>You cannot move me or resize me outside my parent</div>'
    + '</DynoItem>',
});

export const ParentLimit = Template.bind({});
ParentLimit.args = {
  parent: true,
};
