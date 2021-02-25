import { shallowMount } from '@vue/test-utils';
import DynoItem from '@/components/DynoItem.vue';
import {
  baseStyle,
  triggerResizing,
} from './commons';

describe('DynoItem.handles.vue', () => {
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
  const createWrapperSingleHandleTest = async (handleName, x, y) => {
    wrapper = shallowMount(DynoItem, {
      props: {
        handles: [handleName],
        width: 100,
        height: 100,
      },
    });
    const handles = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'];
    handles.forEach((handle) => {
      if (handle !== handleName) {
        expect(wrapper.find(`[data-test="handle-${handle}"]`).exists()).toBeFalsy();
      } else {
        expect(wrapper.find(`[data-test="handle-${handleName}"]`)
          .exists())
          .toBeTruthy();
      }
    });
    await triggerResizing(wrapper, true, `handle-${handleName}`, { x, y });
  };
  it('have no handles', async () => {
    wrapper = shallowMount(DynoItem, {
      props: {
        handles: [],
        width: 100,
        height: 100,
      },
    });
    const handles = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'];
    handles.forEach((handle) => {
      expect(wrapper.find(`[data-test="handle-${handle}"]`).exists()).toBeFalsy();
    });
  });
  it('have handle ml and can resize with it', async () => {
    await createWrapperSingleHandleTest('ml', 10, -10);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '200px',
      width: '190px',
      transform: 'translate(10px, 0px)',
    });
  });
  it('have handle bl and can resize with it', async () => {
    await createWrapperSingleHandleTest('bl', 10, -10);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '190px',
      width: '190px',
      transform: 'translate(10px, 0px)',
    });
  });
  it('have handle bm and can resize with it', async () => {
    await createWrapperSingleHandleTest('bm', -10, -10);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '190px',
      width: '200px',
      transform: 'translate(0px, 0px)',
    });
  });
  it('have handle br and can resize with it', async () => {
    await createWrapperSingleHandleTest('br', -10, -10);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '190px',
      width: '190px',
      transform: 'translate(0px, 0px)',
    });
  });
  it('have handle mr and can resize with it', async () => {
    await createWrapperSingleHandleTest('mr', -10, 10);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '200px',
      width: '190px',
      transform: 'translate(0px, 0px)',
    });
  });
  it('have handle tl and can resize with it', async () => {
    await createWrapperSingleHandleTest('tl', 10, 10);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '190px',
      width: '190px',
      transform: 'translate(10px, 10px)',
    });
  });

  it('have handle tm and can resize with it', async () => {
    await createWrapperSingleHandleTest('tm', 10, 10);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '190px',
      width: '200px',
      transform: 'translate(0px, 10px)',
    });
  });

  it('have handle tr and can resize with it', async () => {
    await createWrapperSingleHandleTest('tr', -10, 10);
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '190px',
      width: '190px',
      transform: 'translate(0px, 10px)',
    });
  });
});
