/* import '@/assets/item.css';
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
*/
// Import vue component
import component from '@/components/DynoItem.vue';

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
export default /* #__PURE__ */(() => {
  // Get component instance
  const installable = component;

  // Attach install function executed by Vue.use()
  installable.install = (app) => {
    app.component('DynoItem', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
