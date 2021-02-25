# dyno-item

> Vue3 Library Component for draggable and resizable items.

[![Build Status](https://www.travis-ci.com/darknessnerd/dyno-item.svg?branch=main)](https://www.travis-ci.com/darknessnerd/dyno-item)

### Features

* No dependencies
* Use draggable, resizable or both
* Limit size and movement to parent element
* Snap element to custom grid
* Limit drag to vertical or horizontal axis
* Maintain aspect ratio
* Touch enabled
* Custom styling
* Define handles for resizing
* Provide your own markup for handles

## Install and basic usage

```bash
$ npm install --save dyno-item
```


Register the component

```js
import DynoItemPlugin from 'dyno-item';

// optionally import default styles
import 'dyno-item/dist/dyno-item.common.css';

createApp(App)
  .use(DynoItemPlugin)
  .mount('#app');
```

Now your component inside a code:

```vue
<template>
  <div>
    <DynoItem><p>I'm a draggable and resizable item</p></DynoItem>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { DynoItem } from 'dyno-item';

export default defineComponent({
  components: {
    DynoItem,
  },
  name: 'App',
  setup() {
    return {};
  },
});
</script>

```
