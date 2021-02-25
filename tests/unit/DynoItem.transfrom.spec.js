import { shallowMount } from '@vue/test-utils';
import DynoItem from '@/components/DynoItem.vue';
import {
  baseStyle, triggerDragging, triggerMouseUp, triggerResizing,
} from './commons';

describe('DynoItem.transform.vue', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    const rootElm = document.documentElement;
    // Remove attributes on root element
    [...rootElm.attributes].forEach((attr) => rootElm.removeAttribute(attr.name));
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('does not move horizontally when x props change, and the item is dragging or resizing', async () => {
    wrapper = shallowMount(DynoItem);
    await triggerResizing(wrapper, true, 'handle-br', { x: 10, y: 10 });
    await wrapper.setProps({ x: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '210px',
      width: '210px',
    });
  });
  it('does not move vertically when y props change, and the item is dragging or resizing', async () => {
    wrapper = shallowMount(DynoItem);
    await triggerResizing(wrapper, true, 'handle-br', { x: 10, y: 10 });
    await wrapper.setProps({ y: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '210px',
      width: '210px',
    });
  });
  it('change zIndex style value', async () => {
    wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ z: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      zIndex: 5,
    });
  });
  it('change scale value', async () => {
    wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ scale: 5 });
    await triggerDragging(wrapper, true);
    await triggerMouseUp();
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      transform: 'translate(2px, 2px)',
    });
  });
  it('move vertically when y props change', async () => {
    wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ y: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(0px, 5px)',
      },
    });
  });
  it('move horizontally when x props change', async () => {
    wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ x: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(5px, 0px)',
      },
    });
  });
  it('does not change width when w props change, and the item is dragging or resizing', async () => {
    wrapper = shallowMount(DynoItem);
    await triggerResizing(wrapper, true, 'handle-br', { x: 10, y: 10 });
    await wrapper.setProps({ w: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '210px',
      width: '210px',
    });
  });
  it('change width when w props change and lockAspectRatio is true', async () => {
    wrapper = shallowMount(DynoItem, {
      props: {
        lockAspectRatio: true,
      },
    });
    await wrapper.setProps({ w: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        height: '5px',
        width: '5px',
      },
    });
  });
  it('change width when w props change', async () => {
    wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ w: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        height: '200px',
        width: '5px',
      },
    });
  });
  it('does not change width when h props change, and the item is dragging or resizing', async () => {
    wrapper = shallowMount(DynoItem);
    await triggerResizing(wrapper, true, 'handle-br', { x: 10, y: 10 });
    await wrapper.setProps({ h: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '210px',
      width: '210px',
    });
  });
  it('change height when h props change and lockAspectRatio is true', async () => {
    wrapper = shallowMount(DynoItem, {
      props: {
        lockAspectRatio: true,
      },
    });
    await wrapper.setProps({ h: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        height: '5px',
        width: '5px',
      },
    });
  });
  it('change height when h props change', async () => {
    wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ h: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        width: '200px',
        height: '5px',
      },
    });
  });
  it('change height when h props change with auto value', async () => {
    wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ h: 'auto' });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        width: '200px',
        height: '0px',
      },
    });
  });
  it('change width when w props change with auto value', async () => {
    wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ w: 'auto' });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        width: '0px',
        height: '200px',
      },
    });
  });
});
