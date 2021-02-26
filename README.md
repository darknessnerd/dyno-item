# dyno-item

[![Build Status](https://www.travis-ci.com/darknessnerd/dyno-item.svg?branch=main)](https://www.travis-ci.com/darknessnerd/dyno-item)
![NPM Downloads](https://img.shields.io/npm/dw/dyno-item)
![NPM License](https://img.shields.io/npm/l/dyno-item)
![NPM Version](https://img.shields.io/npm/v/dyno-item)
![npm collaborators](https://img.shields.io/npm/collaborators/dyno-item)


> Vue3 Library Component for draggable and resizable items.

![resize](https://raw.githubusercontent.com/darknessnerd/dyno-item/0d5c2ec0ec5ed7f027311c75f694d3d135872915/stories/assets/resize-icon.svg)
![draggable](https://raw.githubusercontent.com/darknessnerd/dyno-item/0d5c2ec0ec5ed7f027311c75f694d3d135872915/stories/assets/drag-icon.svg)

:bomb: [Features Live Demo ](https://darknessnerd.github.io/dyno-item/index.html)

### :rocket: Features

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
