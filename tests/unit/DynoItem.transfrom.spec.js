import { shallowMount } from '@vue/test-utils';
import DynoItem from '@/components/DynoItem.vue';

describe('DynoItem.transform.vue', () => {
  const baseStyle = {
    transform: 'translate(0px, 0px)',
    '-webkit-transition': 'transform 0s ease-in-out',
    width: '200px',
    height: '200px',
    zIndex: 'auto',
    position: 'absolute',
    userSelect: 'auto',
    MozUserSelect: 'auto',
    WebkitUserSelect: 'auto',
    MsUserSelect: 'auto',
  };
  it('does not move vertically when y props change, and the item is dragging or resizing', async () => {
    const wrapper = shallowMount(DynoItem);
    await wrapper.find('[data-test="tl"]').trigger('mousedown', {
      button: 0,
      pageX: 5,
      pageY: 5,
    });
    const event = new MouseEvent('mousemove');
    event.pageX = 5;
    event.pageY = 5;
    document.documentElement.dispatchEvent(event);
    expect(wrapper.vm.resizing).toBeTruthy();
    await wrapper.setProps({ y: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
    });
  });
  it('move vertically when y props change', async () => {
    const wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ y: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(0px, 5px)',
      },
    });
  });
  it('move horizontally when x props change', async () => {
    const wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ x: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        transform: 'translate(5px, 0px)',
      },
    });
  });
  it('change width when w props change and lockAspectRatio is true', async () => {
    const wrapper = shallowMount(DynoItem, {
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
    const wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ w: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        height: '200px',
        width: '5px',
      },
    });
  });
  it('change height when h props change and lockAspectRatio is true', async () => {
    const wrapper = shallowMount(DynoItem, {
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
    const wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ h: 5 });
    expect(wrapper.vm.style).toStrictEqual({
      ...baseStyle,
      ...{
        width: '200px',
        height: '5px',
      },
    });
  });
});
