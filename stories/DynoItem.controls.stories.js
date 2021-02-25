import DynoItem from '@/components/DynoItem.vue';
import controls from './control';

export default {
  title: 'DynoItem/controls',
  component: DynoItem,
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
  template: args.template,
});

export const Active = Template.bind({});
Active.argTypes = {
  ...controls,
  ...{ active: { control: { type: 'boolean' } } },
  activated: { action: 'activated' },
  deactivated: { action: 'deactivated' },
};
Active.args = {
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<DynoItem'
    + ' :active="args.active"'
    + ' :resizable="args.resizable"'
    + ' @activated="args.activated"'
    + ' @deactivated="args.deactivated">'
    + ' <p>Change the active state from outside the component by providing the <b>:active</b> prop.</p>'
    + '<br/>'
    + 'Event emitted:'
    + '<ul><li><b>@activated</b></li> <li><b>@deactivated</b></li></ul>'
    + '</DynoItem>',
  active: false,
  resizable: false,
};

export const Resizable = Template.bind({});
Resizable.argTypes = {
  ...controls,
  ...{ resizable: { control: { type: 'boolean' } } },
  activated: { action: 'activated' },
  deactivated: { action: 'deactivated' },
  resizing: { action: 'resizing' },
  'resize-stop': { action: 'resize-stop' },
  content: {
    table: { disable: true },
  },
};
Resizable.args = {
  draggable: false,
  resizable: true,
  template: '<DynoItem'
    + ' :draggable="args.draggable"'
    + ' :resizable="args.resizable"'
    + ' @activated="args.activated"'
    + ' @deactivated="args.deactivated"'
    + ' @resizing="args.resizing"'
    + ' @resize-stop="args[\'resize-stop\']">'
            + '<p>Change the Resizable state from outside the component by providing the'
            + ' <b>:resizable</b> prop.</p>'
            + '<br/>'
            + 'Event emitted:<ul>'
            + '<li><b>@activated</b></li>'
            + '<li><b>@deactivated</b></li>'
            + '<li><b>@resizing</b></li>'
            + '<li><b>@resize-stop</b></li>'
            + '</ul>'
    + '</DynoItem>',
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
  draggable: true,
  resizable: false,
  template: '<DynoItem'

    + ' :draggable="args.draggable"'
    + ' :resizable="args.resizable"'

    + ' @activated="args.activated"'
    + ' @deactivated="args.deactivated"'

    + ' @drag-stop="args[\'drag-stop\']"'
    + ' @dragging="args.dragging">'
        + '<p>Change the Draggable state from outside the component by providing the <b>:draggable</b> prop.</p>'
        + '<br/>'
        + 'Event emitted:<ul>'
        + '<li><b>@activated</b></li>'
        + '<li><b>@deactivated</b></li>'
        + '<li><b>@dragging</b></li>'
        + '<li><b>@drag-stop</b></li>'
        + '</ul>'
    + '</DynoItem>',
};

export const UserSelect = Template.bind({});
UserSelect.argTypes = {
  ...controls,
  ...{ disableUserSelect: { control: { type: 'boolean' } } },
  ...{ draggable: { control: { type: 'boolean' } } },
};
UserSelect.args = {
  disableUserSelect: true,
  draggable: true,
  template: '<DynoItem'
    + ' :draggable="args.draggable"'
    + ' :disableUserSelect="args.disableUserSelect">'
    + '<p>'
    + 'Disable user select when dragging with the prop: <b>:disableUserSelect</b>.'
    + '</p>'
    + '</DynoItem>',
};

export const PreventDeactivation = Template.bind({});
PreventDeactivation.argTypes = {
  ...controls,
  ...{ preventDeactivation: { control: { type: 'boolean' } } },
};
PreventDeactivation.args = {
  preventDeactivation: true,
  template: '<DynoItem'
    + ' :preventDeactivation="args.preventDeactivation">'
    + '<p>'
    + 'Prevent deactivation when the prop <b>:preventDeactivation</b> is set to true.'
    + '</p>'
    + '</DynoItem>',
};

export const EnableNativeDrag = Template.bind({});
EnableNativeDrag.argTypes = {
  ...controls,
  ...{ enableNativeDrag: { control: { type: 'boolean' } } },
};
EnableNativeDrag.args = {
  enableNativeDrag: true,
  disableUserSelect: false,
  template: '<DynoItem'
    + ' :enable-native-drag="args.enableNativeDrag">'
        + '<p>EnableNativeDrag '
        + '<b>:enableNativeDrag</b> '
        + 'is set to true.'
        + '<br>'
        + '<img src="./abduction.svg" style="height: 48px; width: 48px;" />'
        + '</p>'
    + '</DynoItem>',
};

export const ItemWithDragHandle = Template.bind({});
ItemWithDragHandle.argTypes = {
  ...controls,
};
ItemWithDragHandle.args = {
  template: '<DynoItem :drag-handle="\'.drag-handle\'">'
    + 'An item, that can be dragged only through a handle, '
    + 'specified by the prop drag-handle and'
    + ' a valid CSS selector.'
    + '<div class="drag-handle">Drag Only Here</div>'
    + '</DynoItem>',
};

export const ItemWithDragCancel = Template.bind({});
ItemWithDragCancel.argTypes = {
  ...controls,
};
ItemWithDragCancel.args = {
  template: '<DynoItem :drag-cancel="\'.drag-cancel\'">'
    + 'An item, that cannot be dragged through a handle, '
    + 'specified by the prop drag-cancel and'
    + 'a valid CSS selector.'
    + '<div class="drag-cancel">Cannot drag here</div>'
    + '</DynoItem>',
};

export const Axis = Template.bind({});
Axis.argTypes = {
  ...controls,
  axis: {
    control: {
      type: 'select',
      options: ['x', 'y', 'both'],
    },
  },
};
Axis.args = {
  template: '<DynoItem :axis="args.axis">'
    + 'A basic component, with axis prop to control on which axis it is draggable.'
    + ' Suitable values are <b>x, y or both</b>.'
    + '</DynoItem>',
};

export const Handles = Template.bind({});
Handles.argTypes = {
  ...controls,
  handles: {
    control: {
      type: 'multi-select',
      multiple: true,
      options: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
    },
  },
};
Handles.args = {
  handles: [],
  template: '<DynoItem :active="true" :prevent-deactivation="true" :handles="args.handles">'
    + '<p>Enable/disable handles.</p>'
    + '</DynoItem>',
};
