import { shallowMount } from '@vue/test-utils';
import DynoItem from '@/components/DynoItem.vue';
import { baseStyle, triggerResizing } from './commons';

describe('DynoItem.resizing.vue', () => {
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

  it('does not keep aspect ratio when resizing', async () => {
    wrapper = shallowMount(DynoItem, {
      props: {
        lockAspectRatio: false,
      },
    });
    await triggerResizing(wrapper, true, 'handle-br', { x: 10, y: 20 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '220px',
      width: '210px',
    });
  });
  it('resize until reach minWidth and minHeight', async () => {
    wrapper = shallowMount(DynoItem, {
      props: {
        minHeight: 150,
        minWidth: 150,
        width: 200,
        height: 200,
      },
    });
    await triggerResizing(wrapper, true, 'handle-br', { x: -60, y: -60 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '150px',
      width: '150px',
    });
  });
  it('resize until reach maxWidth and maxHeight', async () => {
    wrapper = shallowMount(DynoItem, {
      props: {
        maxHeight: 250,
        maxWidth: 250,
        width: 200,
        height: 200,
      },
    });
    await triggerResizing(wrapper, true, 'handle-br', { x: 80, y: 80 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '250px',
      width: '250px',
    });
  });
  it('Keep aspect ratio when resizing', async () => {
    wrapper = shallowMount(DynoItem, {
      props: {
        lockAspectRatio: true,
      },
    });
    await triggerResizing(wrapper, true, 'handle-br', { x: 10, y: 20 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '210px',
      width: '210px',
    });
  });
  it('Keep aspect ratio with parent constraint when resizing', async () => {
    const parentElement = document.createElement('div');
    parentElement.id = 'root';
    parentElement.classList.add('parent-slot');
    document.body.appendChild(parentElement);
    wrapper = shallowMount(DynoItem, {
      attachTo: '#root',
      props: {
        lockAspectRatio: true,
        parent: false,
        w: 10,
        h: 10,
      },
    });
    parentElement.firstElementChild.getBoundingClientRect = jest.fn().mockImplementation(() => ({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      top: 0,
      right: 100,
      bottom: 100,
      left: 0,
    }));
    await wrapper.setProps({ parent: true });
    expect(document.body.getElementsByClassName('parent-slot').length).toBe(1);

    await triggerResizing(wrapper, true, 'handle-br', { x: 200, y: 200 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      height: '100px',
      width: '100px',
    });
  });
});
