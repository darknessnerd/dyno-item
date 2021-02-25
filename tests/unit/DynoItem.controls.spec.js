import { shallowMount } from '@vue/test-utils';
import DynoItem from '@/components/DynoItem.vue';
import {
  baseStyle,
  triggerDragging,
  triggerMouseDownOnDocument,
  triggerMouseUp,
  triggerOnDragStart,
  triggerResizing,
} from './commons';

describe('DynoItem.controls.vue', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    const rootElm = document.documentElement;
    // Remove attributes on root element
    [...rootElm.attributes].forEach((attr) => rootElm.removeAttribute(attr.name));
    wrapper = shallowMount(DynoItem);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('does not move when draggable prop is false', async () => {
    await wrapper.setProps({ draggable: false });
    await triggerDragging(wrapper, false);
    // become active but does not move
    expect(wrapper.emitted()).toEqual({ activated: [[]] });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
    });
    await triggerMouseUp(wrapper);
  });
  it('resize when resize prop is true', async () => {
    await wrapper.setProps({ resize: true });
    await triggerResizing(wrapper, true, 'handle-br', { x: 10, y: 10 });
    expect(wrapper.emitted()).toEqual({ resizing: [[0, 0, 210, 210]] });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        userSelect: 'auto',
        MozUserSelect: 'auto',
        MsUserSelect: 'auto',
        WebkitUserSelect: 'auto',
        height: '210px',
        width: '210px',
      },
    });
    await triggerMouseUp(wrapper);
    expect(wrapper.emitted()).toEqual({
      resizing: [[0, 0, 210, 210]],
      'resize-stop': [[0, 0, 210, 210]],
    });
  });
  it('move when draggable prop is true', async () => {
    await wrapper.setProps({ draggable: true });
    await triggerDragging(wrapper, true);
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
  });
  it('disableUserSelect when drag', async () => {
    await wrapper.setProps({ draggable: true, disableUserSelect: true });
    await triggerDragging(wrapper, true);
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
  });
  it('not disableUserSelect when drag', async () => {
    await wrapper.setProps({ draggable: true, disableUserSelect: false });
    await triggerDragging(wrapper, true);
    expect(wrapper.emitted()).toEqual({ activated: [[]], dragging: [[10, 10]] });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(10px, 10px)',
        userSelect: 'auto',
        MozUserSelect: 'auto',
        MsUserSelect: 'auto',
        WebkitUserSelect: 'auto',
      },
    });
    await triggerMouseUp(wrapper);
  });
  it('active when active props change', async () => {
    await wrapper.setProps({ active: true });
    expect(wrapper.emitted().activated[0]).toEqual([]);
    expect(wrapper.vm.handleStyle).toStrictEqual({
      display: 'block',
    });
  });
  it('does not deactivated when preventDeactivation it set to true', async () => {
    await wrapper.setProps({ active: true, preventDeactivation: true });
    await triggerDragging(wrapper, true);
    expect(wrapper.emitted()).toEqual({ activated: [[]], dragging: [[10, 10]] });
    await triggerMouseUp(wrapper);
    expect(wrapper.emitted()).toEqual({ activated: [[]], 'drag-stop': [[10, 10]], dragging: [[10, 10]] });
    await triggerMouseDownOnDocument();
    expect(wrapper.emitted()).toEqual({ activated: [[]], 'drag-stop': [[10, 10]], dragging: [[10, 10]] });
  });
  it('enableNativeDrag', async () => {
    await wrapper.setProps({ enableNativeDrag: true });
    await triggerOnDragStart(wrapper);
    await triggerDragging(wrapper, true);
    expect(wrapper.emitted()).toEqual({ activated: [[]], dragging: [[10, 10]] });
    await triggerMouseUp(wrapper);
    expect(wrapper.emitted()).toEqual({ activated: [[]], 'drag-stop': [[10, 10]], dragging: [[10, 10]] });
    await triggerMouseDownOnDocument();
    expect(wrapper.emitted()).toEqual({
      activated: [[]], deactivated: [[]], 'drag-stop': [[10, 10]], dragging: [[10, 10]],
    });
  });

  it('move vertically when axis is set to y', async () => {
    wrapper = shallowMount(DynoItem, {
      props: {
        axis: 'y',
      },
    });
    await triggerOnDragStart(wrapper);
    await triggerDragging(wrapper, true);
    // Move with x: 10 and y: 10
    await triggerMouseUp(wrapper);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(0px, 10px)',
      },
    });
  });
  it('move horizontally when axis is set to x', async () => {
    wrapper = shallowMount(DynoItem, {
      props: {
        axis: 'x',
      },
    });
    await triggerOnDragStart(wrapper);
    await triggerDragging(wrapper, true);
    // Move with x: 10 and y: 10
    await triggerMouseUp(wrapper);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(10px, 0px)',
      },
    });
  });
  it('move horizontally and vertically when axis is set to both', async () => {
    wrapper = shallowMount(DynoItem, {
      props: {
        axis: 'both',
      },
    });
    await triggerOnDragStart(wrapper);
    await triggerDragging(wrapper, true);
    // Move with x: 10 and y: 10
    await triggerMouseUp(wrapper);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(10px, 10px)',
      },
    });
  });
});
