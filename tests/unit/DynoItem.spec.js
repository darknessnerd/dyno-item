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
  });
});
