import { mount } from '@vue/test-utils';
import DynoItem from '@/components/DynoItem.vue';
import {
  baseStyle,
  triggerMouseMove,
  triggerMouseUp,
} from './commons';

describe('DynoItem.drag.vue', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    const rootElm = document.documentElement;
    // Remove attributes on root element
    [...rootElm.attributes].forEach((attr) => rootElm.removeAttribute(attr.name));
  });
  it('render slot correctly', async () => {
    const WrapperComp = {
      template: `
        <DynoItem v-slot="props">
        <div data-test="drag">drag element</div>
        </DynoItem>
      `,
      components: {
        DynoItem,
      },
    };
    const rootComponent = mount(WrapperComp);
    const wrapper = rootComponent.findComponent(DynoItem);
    expect(wrapper).toMatchSnapshot();
    rootComponent.unmount();
  });
  it('does not move if click different drag handle div', async () => {
    const WrapperComp = {
      template: `
        <DynoItem :drag-handle="'.drag-handle'">
          <div class="drag-handle" data-test="drag">drag element</div>
          <div data-test="no-drag">other drag element</div>
        </DynoItem>
      `,
      components: {
        DynoItem,
      },
    };
    const rootComponent = mount(WrapperComp);
    const wrapper = rootComponent.findComponent(DynoItem);

    await wrapper.find('[data-test="no-drag"]').trigger('mousedown', {
      button: 0,
      pageX: 0,
      pageY: 0,
    });
    triggerMouseMove({ x: 10, y: 10 });
    // eslint-disable-next-line no-undef
    expect(wrapper.vm.dragging).toBeFalsy();
    expect(wrapper.emitted()).toEqual({ });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
    });
    await triggerMouseUp(wrapper);
    rootComponent.unmount();
  });
  it('do not move from drag-cancel div', async () => {
    const WrapperComp = {
      template: `
        <DynoItem :drag-cancel="'.drag-cancel'">
        <div class="drag-cancel" data-test="drag">cannot be drag</div>
        </DynoItem>
      `,
      components: {
        DynoItem,
      },
    };
    const rootComponent = mount(WrapperComp);
    const wrapper = rootComponent.findComponent(DynoItem);
    await wrapper.find('[data-test="drag"]').trigger('mousedown', {
      button: 0,
      pageX: 0,
      pageY: 0,
    });
    triggerMouseMove({ x: 10, y: 10 });
    // eslint-disable-next-line no-undef
    expect(wrapper.vm.dragging).toBeFalsy();
    expect(wrapper.emitted()).toEqual({ });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
    });
    await triggerMouseUp(wrapper);
    rootComponent.unmount();
  });
  it('move only from drag-handle div', async () => {
    const WrapperComp = {
      template: `
      <DynoItem :drag-handle="'.drag-handle'">
        <div class="drag-handle" data-test="drag">drag element</div>
      </DynoItem>
      `,
      components: {
        DynoItem,
      },
    };
    const rootComponent = mount(WrapperComp);
    const wrapper = rootComponent.findComponent(DynoItem);
    await wrapper.find('[data-test="drag"]').trigger('mousedown', {
      button: 0,
      pageX: 0,
      pageY: 0,
    });
    triggerMouseMove({ x: 10, y: 10 });
    // eslint-disable-next-line no-undef
    expect(wrapper.vm.dragging).toBeTruthy();
    expect(wrapper.emitted()).toEqual({ activated: [[]], dragging: [[10, 10]] });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(10px, 10px)',
        userSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        WebkitUserSelect: 'none',
      },
    });
    await triggerMouseUp(wrapper);
    rootComponent.unmount();
  });
});
