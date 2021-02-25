import DynoItem from '@/components/DynoItem.vue';
import controls from './control';

export default {
  title: 'DynoItem/styles',
  component: DynoItem,
  argTypes: {
    ...controls,
  },
  decorators: [() => (
    {
      template: '<div style="flex-grow: 1; border: 1px solid black; background-color: whitesmoke">'
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
  template: args.template,
});

export const StyleComponent = Template.bind({});
StyleComponent.args = {
  template: '<DynoItem class-name="my-class" w="auto" >'
    + ' <p>Custom class for the component using the <b>class-name</b> prop.</p>'
    + '<br>'
    + '<pre>'
    + '.my-class {'
    + '  background-color: whitesmoke;\n'
    + '  border: 1px solid black;\n'
    + '  -webkit-transition: background-color 200ms linear;\n'
    + '  -ms-transition: background-color 200ms linear;\n'
    + '  transition: background-color 200ms linear;\n'
    + '}</pre>'
    + '</DynoItem>',
};

export const DraggingStyleComponent = Template.bind({});
DraggingStyleComponent.args = {
  template: '<DynoItem class-name="my-class" class-name-dragging="my-dragging-class"  >'
    + '<p>Custom class for the component when it\'s dragging using the <b>class-name-dragging</b> prop.</p>'
    + '</DynoItem>',
};

export const ResizingStyleComponent = Template.bind({});
ResizingStyleComponent.args = {
  template: '<DynoItem class-name="my-class" class-name-resizing="my-resizing-class"  >'
    + '<p>Custom class for the component when it\'s resizing using the <b>class-name-resizing</b> prop.</p>'
    + '</DynoItem>',
};
export const ActiveStyleComponent = Template.bind({});
ActiveStyleComponent.args = {
  template: '<DynoItem class-name="my-class" class-name-active="my-active-class"  >'
    + '<p>Custom class for the component when it\'s active  using the <b>class-name-active</b> prop.</p>'
    + '</DynoItem>',
};
export const HandleStyleComponent = Template.bind({});
HandleStyleComponent.args = {
  template: '<DynoItem class-name="my-class" class-name-handle="my-handle-class"  >'
    + '<p>You can provide a default class name for handle using the <b>class-name-handle</b> prop.</p>'
    + '</DynoItem>',
};

export const CustomHandleSlotComponent = Template.bind({});
CustomHandleSlotComponent.args = {
  template: '<DynoItem :prevent-deactivation="true" :active="true"  >'
    + '<br><p>&lt; template  v-slot:tl &gt;😀&lt;/template&gt;</p>'
    + '<template  v-slot:tl>😀</template>'
    + '<template  v-slot:tm>😀</template>'
    + '<template  v-slot:tr>😀</template>'
    + '<template  v-slot:mr>😀</template>'
    + '<template  v-slot:br>😀</template>'
    + '<template  v-slot:bm>😀</template>'
    + '<template  v-slot:bl>😀</template>'
    + '<template  v-slot:ml>😀</template>'
    + '</DynoItem>',
};

