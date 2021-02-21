import DynoItem from '@/components/DynoItem.vue';
import controls from './control';

export default {
  title: 'DynoItem/controls',
  component: DynoItem,
  decorators: [() => (
    { template: '<div style="flex-grow: 1; border: 1px solid black;"><story/></div>' }
  )],
  parameters: {
    jest: ['DynoItem.controls.spec.js'],
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DynoItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<DynoItem
                  :active="args.active"
                  :draggable="args.draggable"
                  :disableUserSelect="args.disableUserSelect"
                  :preventDeactivation="args.preventDeactivation"
                  @activated="args.activated"
                  @deactivated="args.deactivated"
                  @drag-stop="args['drag-stop']"
                  @dragging="args.dragging">${
  args.content
  }</DynoItem>`,
});

export const Active = Template.bind({});
Active.argTypes = {
  ...controls,
  ...{ active: { control: { type: 'boolean' } } },
  activated: { action: 'activated' },
  deactivated: { action: 'deactivated' },
  content: {
    table: { disable: true },
  },
};
Active.args = {
  active: false,
  content: '<p>Change the active state from outside the component by providing the <b>:active</b> prop.</p><br/>'
    + 'Event emitted:<ul><li><b>@activated</b></li> <li><b>@deactivated</b></li></ul>',
};

export const Draggable = Template.bind({});
Draggable.argTypes = {
  ...controls,
  ...{ draggable: { control: { type: 'boolean' } } },
  activated: { action: 'activated' },
  deactivated: { action: 'deactivated' },
  dragging: { action: 'dragging' },
  'drag-stop': { action: 'drag-stop' },
  content: {
    table: { disable: true },
  },
};
Draggable.args = {
  draggable: false,
  content: '<p>Change the Draggable state from outside the component by providing the <b>:draggable</b> prop.</p>'
    + '<br/>'
    + 'Event emitted:<ul>'
    + '<li><b>@activated</b></li>'
    + '<li><b>@deactivated</b></li>'
    + '<li><b>@dragging</b></li>'
    + '<li><b>@drag-stop</b></li>'
    + '</ul>',
};

export const UserSelect = Template.bind({});
UserSelect.argTypes = {
  ...controls,
  ...{ disableUserSelect: { control: { type: 'boolean' } } },
  ...{ draggable: { control: { type: 'boolean' } } },
  content: {
    table: { disable: true },
  },
};
UserSelect.args = {
  disableUserSelect: true,
  draggable: true,
  content: '<p>'
    + 'Disable user select when dragging with the prop: <b>:disableUserSelect</b>.'
    + '</p>',
};

export const PreventDeactivation = Template.bind({});
PreventDeactivation.argTypes = {
  ...controls,
  ...{ preventDeactivation: { control: { type: 'boolean' } } },
  content: {
    table: { disable: true },
  },
};
PreventDeactivation.args = {
  preventDeactivation: true,
  content: '<p>'
    + 'Prevent deactivation when the prop <b>:preventDeactivation</b> is set to true.'
    + '</p>',
};
