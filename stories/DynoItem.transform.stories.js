import DynoItem from '@/components/DynoItem.vue';
import controls from './control';

export default {
  title: 'DynoItem/transform',
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
  // And then the `args` are bound to your component with `v-bind="args"`
  template: args.template,
});

export const LockAspectRatio = Template.bind({});
LockAspectRatio.argTypes = {
  ...controls,
  lockAspectRatio: { control: { type: 'boolean' } },
  className: {
    table: { disable: true },
  },
};
LockAspectRatio.args = {
  lockAspectRatio: false,
  template: '<DynoItem :lock-aspect-ratio="args.lockAspectRatio" :parent="args.parent">'
    + '<div >'
    + '<p>Keep aspect ratio using <b>:lock-aspect-ratio</b> prop.</p>'
    + '</div>'
    + '</DynoItem>',
};
export const LockAspectRatioParent = Template.bind({});
LockAspectRatioParent.argTypes = {
  ...controls,
  lockAspectRatio: { control: { type: 'boolean' } },
  parent: { control: { type: 'boolean' } },
  className: {
    table: { disable: true },
  },
};
LockAspectRatioParent.args = {
  lockAspectRatio: false,
  parent: true,
  template: '<DynoItem :lock-aspect-ratio="args.lockAspectRatio" :parent="args.parent">'
    + '<div >'
    + '<p>Combine aspect ratio and constraint in parent.</p></div>'
    + '</DynoItem>',
};

export const MinWidthAndHeight = Template.bind({});
MinWidthAndHeight.argTypes = {
  ...controls,
  minWidth: { control: { type: 'number' } },
  minHeight: { control: { type: 'number' } },
  className: {
    table: { disable: true },
  },
};
MinWidthAndHeight.args = {
  minWidth: 100,
  minHeight: 100,
  template: '<DynoItem :min-width="args.minWidth" :min-height="args.minHeight">'
    + '<div>'
    + '<p>Component minWidth {{args.minWidth}}, minHeight {{args.minHeight}}.</p>'
    + '</div>'
    + '</DynoItem>',
};

export const MaxWidthAndHeight = Template.bind({});
MaxWidthAndHeight.argTypes = {
  ...controls,
  maxWidth: { control: { type: 'number' } },
  maxHeight: { control: { type: 'number' } },
  className: {
    table: { disable: true },
  },
  content: {
    table: { disable: true },
  },
};
MaxWidthAndHeight.args = {
  maxWidth: 250,
  maxHeight: 250,
  template: '<DynoItem :max-width="args.maxWidth" :max-height="args.maxHeight">'
    + '<div>'
    + '<p>Component maxWidth {{args.maxWidth}}, maxHeight {{args.maxWidth}}.</p>'
    + '</div>'
    + '</DynoItem>',
};

export const X = Template.bind({});
X.argTypes = {
  ...controls,
  x: { control: { type: 'number' } },
  className: {
    table: { disable: true },
  },
};
X.args = {
  x: 0,
  template: '<DynoItem :x="args.x">'
    + '<div>'
    + '<p>Move horizontally {{args.x}}.</p>'
    + '</div>'
    + '</DynoItem>',
};

export const Y = Template.bind({});
Y.argTypes = {
  ...controls,
  y: { control: { type: 'number' } },
  className: {
    table: { disable: true },
  },
};
Y.args = {
  y: 0,
  template: '<DynoItem :y="args.y">'
    + '<div>'
    + '<p>Move vertically {{args.y}}.</p>'
    + '</div>'
    + '</DynoItem>',
};

export const ZIndex = Template.bind({});
ZIndex.argTypes = {
  ...controls,
  zIndex0: { control: { type: 'number' } },
  zIndex1: { control: { type: 'number' } },
  className: {
    table: { disable: true },
  },
};
ZIndex.args = {
  zIndex0: 0,
  zIndex1: 0,
  template: '<DynoItem :z="args.zIndex0" style="background-color: red;">'
    + '<div>'
    + '<p>Element with id 0 zindex: {{args.zIndex0}}.</p>'
    + '</div>'
    + '</DynoItem>'
    + '<DynoItem :z="args.zIndex1" style="background-color: whitesmoke;">'
    + '<div>'
    + '<p>Element with id 1 zindex: {{args.zIndex1}}.</p>'
    + '</div>'
    + '</DynoItem>',
};

export const Scale = Template.bind({});
Scale.argTypes = {
  ...controls,
  scale: {
    control: {
      type: 'range', min: 0.1, max: 10, step: '0.1',
    },
  },
  className: {
    table: { disable: true },
  },
};
Scale.args = {
  scale: 1,
  template: '<div style="background-color: whitesmoke; height: 100%" '
    + ':style="{transform: \'scale(\'+args.scale+\')\'}">'
    + '<DynoItem :scale="args.scale">'
      + '<div>'
        + '<p>Scale.</p>'
      + '</div>'
    + '</DynoItem>'
    + '</div>',
};
