# dyno-item

[![Build Status](https://www.travis-ci.com/darknessnerd/dyno-item.svg?branch=main)](https://www.travis-ci.com/darknessnerd/dyno-item)
![NPM Downloads](https://img.shields.io/npm/dw/dyno-item)
![NPM License](https://img.shields.io/npm/l/dyno-item)
![NPM Version](https://img.shields.io/npm/v/dyno-item)
![npm collaborators](https://img.shields.io/npm/collaborators/dyno-item)

![resize](https://raw.githubusercontent.com/darknessnerd/dyno-item/71f2ae9aac4a1d876494f5d2e06142173b70b213/stories/assets/resize-icon.svg)
![draggable](https://raw.githubusercontent.com/darknessnerd/dyno-item/71f2ae9aac4a1d876494f5d2e06142173b70b213/stories/assets/drag-icon.svg)
:bomb: [Features Live Demo ](https://darknessnerd.github.io/dyno-item/index.html)

> Vue3 Library Component for draggable and resizable items.

![demo](https://github.com/darknessnerd/dyno-item/blob/main/stories/assets/demo.gif?raw=true)

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
  <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
    <DynoItem  @dragging="onDrag" @resizing="onResize" :parent="true">
      <p>I'm a draggable and resizable item</p>
      Position: [x={{x}}, y={{y}}]
      Dimension: [w={{width}}, h={{height}}]
    </DynoItem>
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
    const x = ref(0);
    const y = ref(0);
    const width = ref(0);
    const height = ref(0);
    const onDrag = (x,y) => {
      x.value = x; 
      y.value = y;
    }
    const onResize = (x,y, width, height) => {
      x.value = x; 
      y.value = y;
      width.value = width;
      height.value = height;
    }  
    return {
      x,
      y,
      width,
      height,
      onDrag,
      onResize
    };
  },
});
</script>

```

### Props

#### className
Type: `String`<br>
Required: `false`<br>
Default: `vdr`

Used to set the custom `class` of a draggable-resizable component.

```html
<DynoItem class-name="my-class">
```

#### classNameDraggable
Type: `String`<br>
Required: `false`<br>
Default: `draggable`

Used to set the custom `class` of a draggable-resizable component when `draggable` is enable.

```html
<DynoItem class-name-draggable="my-draggable-class">
```

#### classNameResizable
Type: `String`<br>
Required: `false`<br>
Default: `resizable`

Used to set the custom `class` of a draggable-resizable component when `resizable` is enable.

```html
<DynoItem class-name-resizable="my-resizable-class">
```

#### classNameDragging
Type: `String`<br>
Required: `false`<br>
Default: `dragging`

Used to set the custom `class` of a draggable-resizable component when is dragging.

```html
<DynoItem class-name-dragging="my-dragging-class">
```

#### classNameResizing
Type: `String`<br>
Required: `false`<br>
Default: `resizing`

Used to set the custom `class` of a draggable-resizable component when is resizing.

```html
<DynoItem class-name-resizing="my-resizing-class">
```

#### classNameActive
Type: `String`<br>
Required: `false`<br>
Default: `active`

Used to set the custom `class` of a draggable-resizable component when is active.

```html
<DynoItem class-name-active="my-active-class">
```

#### classNameHandle
Type: `String`<br>
Required: `false`<br>
Default: `handle`

Used to set the custom common `class` of each handle element. This way you can style each handle individually using the selector `<your class>-<handle code>`, where `handle code` identifies one of the handles provided by the `handle` prop.

So for example, this component:

```html
<DynoItem class-name-handle="my-handle-class"></DynoItem>
```

renders the following:

```html
<div ...>
  <div class="my-handle-class my-handle-class-tl"></div>
  <div class="my-handle-class my-handle-class-tm"></div>
  <div class="my-handle-class my-handle-class-tr"></div>
  [...]
</div>
```

#### scale
Type: `Number|Array`<br>
Required: `false`<br>
Default: `1`

The `scale` prop controls the scale property when the CSS 3 [scale transformation](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale) is applied to one of the parent elements. If not provided the default value is 1.

```html
<DynoItem :scale="0.5">

<DynoItem :scale="[0.5, 0.4]">
```

#### disableUserSelect
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

By default, the component adds the style declaration `'user-select:none'` to itself to prevent text selection during drag. You can disable this behaviour by setting this prop to `false`.

```html
<DynoItem :disable-user-select="false">
```

#### enableNativeDrag
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

By default, the browser's native drag and drop funcionality (usually used for images and some other elements) is disabled, as it may conflict with the one provided by the component. If you need, for whatever reason, to have this functionality back you can set this prop to `true`.

```html
<DynoItem :enable-native-drag="true">
```

#### active
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Determines if the component should be active or not. The prop reacts to changes and also can be used with the `sync`[modifier](https://vuejs.org/v2/guide/components.html#sync-Modifier) to keep the state in sync with the parent. You can use along with the `preventDeactivation` prop in order to fully control the active behavior from outside the component.

```html
<DynoItem :active="true">
```

#### preventDeactivation
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Determines if the component should be deactivated when the user clicks/taps outside it.

```html
<DynoItem :prevent-deactivation="true">
```

#### draggable
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

Defines it the component should be draggable or not.

```html
<DynoItem :draggable="false">
```

#### resizable
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

Defines it the component should be resizable or not.

```html
<DynoItem :resizable="false">
```

#### w
Type: `Number|String`<br>
Required: `false`<br>
Default: `200`

Define the initial width of the element. It also supports `auto`, but when you start resizing the value will fallback to a number.

```html
<DynoItem :w="200">
```

#### h
Type: `Number|String`<br>
Required: `false`<br>
Default: `200`

Define the initial height of the element. It also supports `auto`, but when you start resizing the value will fallback to a number.

```html
<DynoItem :h="200">
```

#### minWidth
Type: `Number`<br>
Required: `false`<br>
Default: `50`

Define the minimal width of the element.

```html
<DynoItem :min-width="50">
```

#### minHeight
Type: `Number`<br>
Required: `false`<br>
Default: `50`

Define the minimal height of the element.

```html
<DynoItem :min-height="50">
```

#### maxWidth
Type: `Number`<br>
Required: `false`<br>
Default: `null`

Define the maximum width of the element.

```html
<DynoItem :max-width="400">
```

#### maxHeight
Type: `Number`<br>
Required: `false`<br>
Default: `null`

Define the maximum height of the element.

```html
<DynoItem :max-height="50">
```

#### x
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial x position of the element.

```html
<DynoItem :x="0">
```

#### y
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial y position of the element.

```html
<DynoItem :y="0">
```

#### z
Type: `Number|String`<br>
Required: `false`<br>
Default: `auto`

Define the zIndex of the element.

```html
<DynoItem :z="999">
```

#### handles
Type: `Array`<br>
Required: `false`<br>
Default: `['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']`

Define the array of handles to restrict the element resizing:
* `tl` - Top left
* `tm` - Top middle
* `tr` - Top right
* `mr` - Middle right
* `br` - Bottom right
* `bm` - Bottom middle
* `bl` - Bottom left
* `ml` - Middle left

```html
<DynoItem :handles="['tm','bm','ml','mr']">
```

#### axis
Type: `String`<br>
Required: `false`<br>
Default: `both`

Define the axis on which the element is draggable. Available values are `x`, `y` or `both`.

```html
<DynoItem axis="x">
```

#### grid
Type: `Array`<br>
Required: `false`<br>
Default: `[1,1]`

Define the grid on which the element is snapped.

```html
<DynoItem :grid="[1,1]">
```

#### parent
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Restricts the movement and the dimensions of the component to the parent.

```html
<DynoItem :parent="true">
```

#### dragHandle
Type: `String`<br>
Required: `false`

Defines the selector that should be used to drag the component.

```html
<DynoItem drag-handle=".drag">
```

#### dragCancel
Type: `String`<br>
Required: `false`

Defines a selector that should be used to prevent drag initialization.

```html
<DynoItem drag-cancel=".drag">
```

#### lockAspectRatio
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

The `lockAspectRatio` property is used to lock aspect ratio. This property doesn't play well with `grid`, so make sure to use only one at a time.

```html
<DynoItem :lock-aspect-ratio="true">
```

#### onDragStart
Type: `Function`<br>
Required: `false`<br>
Default: `null`

Called when dragging starts (element is clicked or touched). If `false` is returned by any handler, the action will cancel. You can use this function to prevent bubbling of events.

```html
<DynoItem :onDragStart="onDragStartCallback">
```

```js
function onDragStartCallback(ev){
   ...
   // return false; — for cancel
}
```

#### onDrag
Type: `Function`<br>
Required: `false`<br>
Default: `null`

Called before the element is dragged. The function receives the next values of `x` and `y`. If `false` is returned by any handler, the action will cancel.

```html
<DynoItem :onDrag="onDragCallback">
```

```js
function onDragStartCallback(x, y){
   ...
   // return false; — for cancel
}
```


#### onResizeStart
Type: `Function`<br>
Required: `false`<br>
Default: `null`

Called when resizing starts (handle is clicked or touched). If `false` is returned by any handler, the action will cancel.

```html
<DynoItem :onResizeStart="onResizeStartCallback">
```

```js

function onResizeStartCallback(handle, ev){
   ...
   // return false; — for cancel
}
```

#### onResize
Type: `Function`<br>
Required: `false`<br>
Default: `null`

Called before the element is resized. The function receives the handle and the next values of `x`, `y`, `width` and `height`. If `false` is returned by any handler, the action will cancel.

```html
<DynoItem :onResize="onResizeCallback">
```

```js

function onResizeStartCallback(handle, x, y, width, height) {
   ...
   // return false; — for cancel
}
```
---

### Events

#### activated

Parameters: `-`

Called whenever the component gets clicked, in order to show handles.

```html
<DynoItem @activated="onActivated">
```

#### deactivated

Parameters: `-`

Called whenever the user clicks anywhere outside the component, in order to deactivate it.

```html
<DynoItem @deactivated="onDeactivated">
```

#### resizing

Parameters:
* `left` the X position of the element
* `top` the Y position of the element
* `width` the width of the element
* `height` the height of the element

Called whenever the component gets resized.

```html
<DynoItem @resizing="onResizing">
```

#### resizestop

Parameters:
* `left` the X position of the element
* `top` the Y position of the element
* `width` the width of the element
* `height` the height of the element

Called whenever the component stops getting resized.

```html
<DynoItem @resizestop="onResizstop">
```

#### dragging

Parameters:
* `left` the X position of the element
* `top` the Y position of the element

Called whenever the component gets dragged.

```html
<DynoItem @dragging="onDragging">
```

#### dragstop

Parameters:
* `left` the X position of the element
* `top` the Y position of the element

Called whenever the component stops getting dragged.

```html
<DynoItem @dragstop="onDragstop">
```

---
