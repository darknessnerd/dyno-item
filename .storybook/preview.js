import DynoItem from '@/components/DynoItem';
import results from '../.jest-test-results.json';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
import '@/assets/item.css';
import '../stories/assets/custom.css';

import { addDecorator, app } from '@storybook/vue3';
import { withTests } from '@storybook/addon-jest';
app.component(DynoItem.name, DynoItem);


addDecorator(
  withTests({
    results,
  })
);
