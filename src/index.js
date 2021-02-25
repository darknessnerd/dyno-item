import '@/assets/item.css';
import DynoItem from '@/components/DynoItem.vue';

const DynoItemPlugin = () => ({
  install(Vue) {
    const isDuplicateComponent = Vue.options.components[DynoItem.name];

    if (isDuplicateComponent) {
      if (typeof window !== 'undefined') {
        console.warn('[] Duplicate registration componentName of Item.');
      }
    } else {
      Vue.component(DynoItem.name, DynoItem);
    }
  },
});

export { DynoItemPlugin as default, DynoItem };
