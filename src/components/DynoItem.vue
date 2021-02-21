<template>
  <div
    data-test="root"
    ref="root"
    :style="style"
    :class="[{
      [classNameActive]: enabled,
      [classNameDragging]: dragging,
      [classNameDraggable]: draggable,
      [classNameResizing]: resizing,
      [classNameResizable]: resizable,
    }, className]"
    @mousedown="elementMouseDown"
    @touchstart="elementTouchDown">
    <div
      v-for="handle in actualHandles"
      :key="handle"
      :class="[classNameHandle, classNameHandle + '-' + handle]"
      :style="handleStyle"
      :data-test="handle"
      @mousedown.stop.prevent="handleDown(handle, $event)"
      @touchstart.stop.prevent="handleTouchDown(handle, $event)">
      <slot :name="handle"></slot>
    </div>
    <div ref="content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>

import {
  ref, computed, onMounted, onBeforeUnmount, watch, reactive,
} from 'vue';
import events from '@/utils/events';
import useDrag from '@/hooks/drag';
import useTransform from '@/hooks/transform';
import useResize from '@/hooks/resize';
import {
  addEvent,
  removeEvent,
  getBoundSize, getParentSize,
} from '@/utils/dom';

const userSelectNone = {
  userSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  MsUserSelect: 'none',
};
const userSelectAuto = {
  userSelect: 'auto',
  MozUserSelect: 'auto',
  WebkitUserSelect: 'auto',
  MsUserSelect: 'auto',
};

export default {
  name: 'dyno-item',
  emits: [
    'activated',
    'touchstart',
    'dragging',
    'drag-stop',
    'deactivated',
    'resizing',
    'resize-stop',
  ],
  props: {
    // Component controls
    /**
     * Active state for the component, this props when change emit activated and deactivated event
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * Draggable state for the component.
     */
    draggable: {
      type: Boolean,
      default: true,
    },
    /**
     * UserSelect state for the component.
     */
    disableUserSelect: {
      type: Boolean,
      default: true,
    },
    /**
     * Keep the component ever active
     */
    preventDeactivation: {
      type: Boolean,
      default: false,
    },
    enableNativeDrag: {
      type: Boolean,
      default: false,
    },
    lockAspectRatio: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: Boolean,
      default: false,
    },
    resizable: {
      type: Boolean,
      default: true,
    },
    className: {
      type: String,
      default: 'vdr',
    },
    classNameDraggable: {
      type: String,
      default: 'draggable',
    },
    classNameActive: {
      type: String,
      default: 'active',
    },
    classNameDragging: {
      type: String,
      default: 'dragging',
    },
    classNameResizing: {
      type: String,
      default: 'resizing',
    },
    dragHandle: {
      type: String,
      default: null,
    },
    classNameHandle: {
      type: String,
      default: 'handle',
    },
    dragCancel: {
      type: String,
      default: null,
    },
    onResizeStart: {
      type: Function,
      default: () => true,
    },
    classNameResizable: {
      type: String,
      default: 'resizable',
    },
    onResize: {
      type: Function,
      default: () => true,
    },
    scale: {
      type: [Number, Array],
      default: 1,
      validator: (val) => {
        if (typeof val === 'number') {
          return val > 0;
        }
        return val.length === 2 && val[0] > 0 && val[1] > 0;
      },
    },
    onDragStart: {
      type: Function,
      default: () => true,
    },
    onDrag: {
      type: Function,
      default: () => true,
    },
    w: {
      type: [Number, String],
      default: 200,
      validator: (val) => {
        if (typeof val === 'number') {
          return val > 0;
        }
        return val === 'auto';
      },
    },
    h: {
      type: [Number, String],
      default: 200,
      validator: (val) => {
        if (typeof val === 'number') {
          return val > 0;
        }
        return val === 'auto';
      },
    },
    minWidth: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0,
    },
    minHeight: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0,
    },
    maxWidth: {
      type: Number,
      default: null,
      validator: (val) => val >= 0,
    },
    maxHeight: {
      type: Number,
      default: null,
      validator: (val) => val >= 0,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    z: {
      type: [String, Number],
      default: 'auto',
      validator: (val) => (typeof val === 'string' ? val === 'auto' : val >= 0),
    },
    handles: {
      type: Array,
      default: () => ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
      validator: (val) => {
        const s = new Set(['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']);
        return new Set(val.filter((h) => s.has(h))).size === val.length;
      },
    },
    axis: {
      type: String,
      default: 'both',
      validator: (val) => ['x', 'y', 'both'].includes(val),
    },
    grid: {
      type: Array,
      default: () => [1, 1],
    },
  },
  setup(props, context) {
    // Check win and height
    // eslint-disable-next-line
    if (props.maxWidth && ( props.minWidth > props.maxWidth )) {
      console.warn('[dyno-item warn]: Invalid prop: minWidth cannot be greater than maxWidth');
    }
    // eslint-disable-next-line
    if (props.maxWidth && ( props.minHeight > props.maxHeight )) {
      console.warn('[dyno-item warn]: Invalid prop: minHeight cannot be greater than maxHeight');
    }
    const domRect = reactive({
      bounds: {
        minLeft: null,
        maxLeft: null,
        minRight: null,
        maxRight: null,
        minTop: null,
        maxTop: null,
        minBottom: null,
        maxBottom: null,
      },
      width: null,
      height: null,
      left: props.x,
      top: props.y,
      right: 0,
      bottom: 0,
    });
    const mouseClickPosition = ref(null);
    const root = ref(null);
    const content = ref();
    const eventsFor = ref(events.mouse);
    const parentHeight = ref(null);
    const parentWidth = ref(null);
    const aspectFactor = ref(null);
    const enabled = ref(props.active);

    const resetBoundsAndMouseState = () => {
      mouseClickPosition.value = {
        mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0,
      };
      domRect.bounds = {
        minLeft: null,
        maxLeft: null,
        minRight: null,
        maxRight: null,
        minTop: null,
        maxTop: null,
        minBottom: null,
        maxBottom: null,
      };
    };
    resetBoundsAndMouseState();
    const {
      elementMouseDown, elementTouchDown, dragging,
    } = useDrag({
      props,
      context,
      mouseClickPosition,
      domRect,
      eventsFor,
      root,
      enabled,
      parentHeight,
      parentWidth,
      resetBoundsAndMouseState,
    });

    const {
      handleResize, handleDown, handleTouchDown, actualHandles, resizing,
    } = useResize({
      context,
      props,
      domRect,
      mouseClickPosition,
      aspectFactor,
      parentWidth,
      parentHeight,
      eventsFor,
      resetBoundsAndMouseState,
    });
    /**
     * Enable transformations for props x,y and w,h
     */
    useTransform({
      props,
      resizing,
      dragging,
      domRect,
      aspectFactor,
      parentWidth,
      parentHeight,
      content,
    });
    const deselect = (e) => {
      const { target } = e;
      const regex = new RegExp(`${props.className}-([trmbl]{2})`, '');
      if (!root.value.contains(target) && !regex.test(target.className)) {
        if (enabled.value && !props.preventDeactivation) {
          enabled.value = false;
          context.emit('deactivated');
        }
        if (eventsFor.value) {
          removeEvent(document.documentElement, eventsFor.value.move, handleResize);
        }
      }
      resetBoundsAndMouseState();
    };
    const checkParentSize = () => {
      if (props.parent) {
        // TODO understand well
        [parentWidth.value, parentHeight.value] = getParentSize(root.value, props.parent);
        domRect.right = parentWidth.value - domRect.width - domRect.left;
        domRect.bottom = parentHeight.value - domRect.height - domRect.top;
      }
    };
    onMounted(() => {
      if (!props.enableNativeDrag) {
        root.value.ondragstart = () => false;
      }
      [parentWidth.value, parentHeight.value] = getParentSize(root.value, props.parent);
      [domRect.width, domRect.height] = getBoundSize(content.value.children);
      aspectFactor.value = (props.w !== 'auto' ? props.w : domRect.width) / (props.h !== 'auto' ? props.h : domRect.height);
      domRect.width = props.w !== 'auto' ? props.w : domRect.width;
      domRect.height = props.h !== 'auto' ? props.h : domRect.height;
      domRect.right = parentWidth.value - domRect.width - domRect.left;
      domRect.bottom = parentHeight.value - domRect.height - domRect.top;
      if (props.active) {
        context.emit('activated');
      }
      addEvent(document.documentElement, 'mousedown', deselect);
      addEvent(document.documentElement, 'touchend touchcancel', deselect);
      addEvent(window, 'resize', checkParentSize);
    });
    const handleStyle = computed(() => ({
      display: enabled.value ? 'block' : 'none',
    }));
    const style = computed(() => ({
      transform: `translate(${domRect.left}px, ${domRect.top}px)`,
      '-webkit-transition': 'transform 0s ease-in-out',
      width: `${domRect.width}px`,
      height: `${domRect.height}px`,
      zIndex: props.z,
      position: 'absolute',
      ...(dragging.value && props.disableUserSelect ? userSelectNone : userSelectAuto),
    }));
    const contentStyle = computed(() => ({
      width: `${domRect.width}px`,
      height: `${domRect.height}px`,
      position: 'absolute',
      overflow: 'auto',
      ...(dragging.value && props.disableUserSelect ? userSelectNone : userSelectAuto),
    }));
    onBeforeUnmount(() => {
      console.log('before unmount');
      removeEvent(document.documentElement, 'mousedown', deselect);
      removeEvent(document.documentElement, 'touchend touchcancel', deselect);
      removeEvent(window, 'resize', checkParentSize);
    });

    watch(() => props.lockAspectRatio, (val) => {
      if (val) {
        aspectFactor.value = domRect.width / domRect.height;
      } else {
        aspectFactor.value = null;
      }
    });

    watch(() => props.active, (val) => {
      enabled.value = val;
      if (val) {
        context.emit('activated');
      } else {
        context.emit('deactivated');
      }
    });

    return {
      // Dragging feature
      elementMouseDown,
      elementTouchDown,
      dragging,
      // Resize feature
      resizing,
      handleDown,
      handleTouchDown,
      actualHandles,
      // Item
      root,
      style,
      contentStyle,
      handleStyle,
      enabled,
      content,
      aspectFactor,
    };
  },
};
</script>
