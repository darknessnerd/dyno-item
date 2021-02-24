import { shallowMount } from '@vue/test-utils';
import DynoItem from '@/components/DynoItem.vue';
import {
  baseStyle,
  triggerDragging, triggerMouseMove,
  triggerMouseUp,
} from './commons';

describe('DynoItem.parent.vue', () => {
  let wrapper;
  let getBoundingClientRect;
  let parentElement;
  beforeEach(() => {
    const rootElm = document.documentElement;
    // Remove attributes on root element
    [...rootElm.attributes].forEach((attr) => rootElm.removeAttribute(attr.name));

    jest.resetModules();
    jest.clearAllMocks();

    parentElement = document.createElement('div');
    parentElement.id = 'root';
    parentElement.classList.add('parent-slot');
    getBoundingClientRect = jest.fn().mockImplementation(() => ({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      top: 0,
      right: 100,
      bottom: 100,
      left: 0,
    }));
    document.body.appendChild(parentElement);
    wrapper = shallowMount(DynoItem, {
      attachTo: '#root',
      props: {
        parent: false,
        w: 10,
        h: 10,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('move outside parent', async () => {
    parentElement.firstElementChild.getBoundingClientRect = getBoundingClientRect;
    await wrapper.setProps({ parent: true });
    expect(document.body.getElementsByClassName('parent-slot').length).toBe(1);
    // Move the element to x: 10px y: 10px
    await triggerDragging(wrapper, true);
    expect(wrapper.emitted()).toEqual({ activated: [[]], dragging: [[90, 90]] });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(90px, 90px)',
        userSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        WebkitUserSelect: 'none',
        height: '10px',
        width: '10px',
      },
    });
    await triggerMouseMove({ x: 210, y: 210 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(90px, 90px)',
        userSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        WebkitUserSelect: 'none',
        height: '10px',
        width: '10px',
      },
    });
    await triggerMouseUp(wrapper);
  });
});
