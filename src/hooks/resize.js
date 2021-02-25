import {
  computed,
  onBeforeUnmount,
  ref,
} from 'vue';
import { calcResizeLimits, restrictToBounds, snapToGrid } from '@/utils/bounds';
import {
  addEvent, computeHeight, computeWidth, removeEvent,
} from '@/utils/dom';
import events from '@/utils/events';

export default function useResize({
  context,
  props, domRect, mouseClickPosition, aspectFactor, parentWidth, parentHeight, eventsFor,
  resetBoundsAndMouseState,
}) {
  const widthTouched = ref(false);
  const heightTouched = ref(false);
  const resizeEnable = ref(true);
  const handleFiltered = ref(null);
  const resizing = ref(false);
  const actualHandles = computed(() => {
    if (!props.resizable) return [];
    return props.handles;
  });
  const resizingOnX = computed(() => (Boolean(props.handle) && (props.handle.includes('l') || props.handle.includes('r'))));
  const resizingOnY = computed(() => (Boolean(props.handle) && (props.handle.includes('t') || props.handle.includes('b'))));
  const handleResize = (e) => {
    let leftTmp = domRect.left;
    let topTmp = domRect.top;
    let rightTmp = domRect.right;
    let bottomTmp = domRect.bottom;
    const tmpDeltaX = mouseClickPosition.value.mouseX
      - (e.touches ? e.touches[0].pageX : e.pageX);
    const tmpDeltaY = mouseClickPosition.value.mouseY
      - (e.touches ? e.touches[0].pageY : e.pageY);
    if (!widthTouched.value && tmpDeltaX) {
      // eslint-disable-next-line no-param-reassign
      widthTouched.value = true;
    }
    if (!heightTouched.value && tmpDeltaY) {
      // eslint-disable-next-line no-param-reassign
      heightTouched.value = true;
    }
    const [deltaX, deltaY] = snapToGrid(props.grid, tmpDeltaX, tmpDeltaY, props.scale);
    if (handleFiltered.value.includes('b')) {
      bottomTmp = restrictToBounds(
        mouseClickPosition.value.bottom + deltaY,
        domRect.bounds.minBottom,
        domRect.bounds.maxBottom,
      );
      if (props.lockAspectRatio && resizingOnY) {
        rightTmp = domRect.right - (domRect.bottom - bottomTmp.value) * aspectFactor.value;
      }
    } else if (handleFiltered.value.includes('t')) {
      topTmp = restrictToBounds(
        mouseClickPosition.value.top - deltaY,
        domRect.bounds.minTop,
        domRect.bounds.maxTop,
      );
      if (props.lockAspectRatio && resizingOnY) {
        leftTmp = domRect.left - (domRect.top - topTmp) * aspectFactor.value;
      }
    }
    if (handleFiltered.value.includes('r')) {
      rightTmp = restrictToBounds(
        mouseClickPosition.value.right + deltaX,
        domRect.bounds.minRight,
        domRect.bounds.maxRight,
      );
      if (props.lockAspectRatio && resizingOnX) {
        bottomTmp = domRect.bottom - (domRect.right - rightTmp) / aspectFactor.value;
      }
    } else if (handleFiltered.value.includes('l')) {
      leftTmp = restrictToBounds(
        mouseClickPosition.value.left - deltaX,
        domRect.bounds.minLeft,
        domRect.bounds.maxLeft,
      );
      if (props.lockAspectRatio && resizingOnX) {
        topTmp = domRect.top - (domRect.left - leftTmp) / aspectFactor.value;
      }
    }
    // eslint-disable-next-line no-undef
    const widthTmp = computeWidth(parentWidth.value, leftTmp, rightTmp);
    // eslint-disable-next-line no-undef
    const heightTmp = computeHeight(parentHeight.value, topTmp, bottomTmp);
    if (props.onResize(handleFiltered.value, leftTmp, topTmp, widthTmp, heightTmp) === false) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    domRect.left = leftTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.top = topTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.right = rightTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.bottom = bottomTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.width = widthTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.height = heightTmp;
    context.emit('resizing', domRect.left, domRect.top, domRect.width, domRect.height);
    // eslint-disable-next-line no-param-reassign
    resizing.value = true;
  };
  const handleUp = () => {
    // eslint-disable-next-line no-param-reassign
    handleFiltered.value = null;
    resetBoundsAndMouseState();
    // eslint-disable-next-line no-param-reassign
    resizeEnable.value = false;
    // eslint-disable-next-line no-param-reassign
    resizing.value = false;
    context.emit('resize-stop', domRect.left, domRect.top, domRect.width, domRect.height);
    removeEvent(document.documentElement, eventsFor.value.move, handleResize);
  };
  const handleDown = (handle, e) => {
    // Button 0 is the main button: Main button pressed,
    // usually the left button or the un-initialized state
    if (e instanceof MouseEvent && e.button !== 0) {
      return;
    }
    if (props.onResizeStart(handle, e) === false) {
      return;
    }
    if (e.stopPropagation) e.stopPropagation();
    // Here we avoid a dangerous recursion by faking
    // corner handles as middle handles
    if (props.lockAspectRatio && !handle.includes('m')) {
      // eslint-disable-next-line no-param-reassign
      handleFiltered.value = `m${handle.substring(1)}`;
    } else {
      // eslint-disable-next-line no-param-reassign
      handleFiltered.value = handle;
    }
    // eslint-disable-next-line no-param-reassign
    resizeEnable.value = true;
    // eslint-disable-next-line no-param-reassign
    mouseClickPosition.value.mouseX = e.touches ? e.touches[0].pageX : e.pageX;
    // eslint-disable-next-line no-param-reassign
    mouseClickPosition.value.mouseY = e.touches ? e.touches[0].pageY : e.pageY;
    // eslint-disable-next-line no-param-reassign
    mouseClickPosition.value.left = domRect.left;
    // eslint-disable-next-line no-param-reassign
    mouseClickPosition.value.right = domRect.right;
    // eslint-disable-next-line no-param-reassign
    mouseClickPosition.value.top = domRect.top;
    // eslint-disable-next-line no-param-reassign
    mouseClickPosition.value.bottom = domRect.bottom;
    // eslint-disable-next-line no-param-reassign
    domRect.bounds = calcResizeLimits(
      props.minWidth, props.minHeight, props.maxWidth, props.maxHeight, props.grid,
      domRect.width, domRect.height, domRect.top, domRect.bottom, domRect.left, domRect.right,
      props.lockAspectRatio, aspectFactor.value, props.parent,
      parentWidth.value,
      parentHeight.value,
    );
    addEvent(document.documentElement, eventsFor.value.move, handleResize);
    addEvent(document.documentElement, eventsFor.value.stop, handleUp);
  };
  const handleTouchDown = (handle, e) => {
    // eslint-disable-next-line no-param-reassign
    eventsFor.value = events.touch;
    handleDown(handle, e);
  };
  onBeforeUnmount(() => {
    removeEvent(document.documentElement, 'mouseup', handleUp);
    removeEvent(document.documentElement, 'touchstart', handleUp);
  });
  return {
    handleResize,
    handleDown,
    handleTouchDown,
    actualHandles,
    resizing,
  };
}
