import { shallowMount } from '@vue/test-utils';
import DynoItem from '@/components/DynoItem.vue';

describe('DynoItem.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(DynoItem);
    expect(wrapper).toMatchSnapshot();
  });
  it('it emit activated onMounted', () => {
    const wrapper = shallowMount(DynoItem, {
      props: { active: true },
    });
    expect(wrapper.emitted().activated[0]).toEqual([]);
    expect(wrapper.vm.style).toStrictEqual({
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
    });
  });
  it('deselect when mousedown on documentElement', () => {
    const wrapper = shallowMount(DynoItem);
    const event = new window.MouseEvent('mousedown');
    document.documentElement.dispatchEvent(event);
    expect(wrapper.emitted().deactivated[0]).toEqual([]);
  });
  it('aspectRation change when lockAspectRatio props change', async () => {
    const wrapper = shallowMount(DynoItem);
    await wrapper.setProps({ lockAspectRatio: true });
    expect(wrapper.vm.aspectFactor).toStrictEqual(1);
    await wrapper.setProps({ lockAspectRatio: false });
    expect(wrapper.vm.aspectFactor).toStrictEqual(null);
  });
});
