import {
  onBeforeUnmount,
  ref,
} from 'vue';
import { calcDragLimits, restrictToBounds, snapToGrid } from '@/utils/bounds';
import events from '@/utils/events';
import { addEvent, matchesSelectorToParentElements, removeEvent } from '@/utils/dom';

export default function useDrag({
  props, context, mouseClickPosition, domRect, eventsFor, root, enabled,
  parentHeight, parentWidth, resetBoundsAndMouseState,
}) {
  const dragEnable = ref(false);
  const dragging = ref(false);
  const mouseUp = () => {
    resetBoundsAndMouseState();

    // eslint-disable-next-line no-param-reassign
    dragEnable.value = false;

    if (dragging.value) {
      // eslint-disable-next-line no-param-reassign
      dragging.value = false;
      context.emit('drag-stop', domRect.left, domRect.top);
    }
  };
  const handleDrag = (e) => {
    const tmpDeltaX = props.axis && props.axis !== 'y' ? mouseClickPosition.value.mouseX - (e.touches ? e.touches[0].pageX : e.pageX) : 0;
    const tmpDeltaY = props.axis && props.axis !== 'x' ? mouseClickPosition.value.mouseY - (e.touches ? e.touches[0].pageY : e.pageY) : 0;
    const [deltaX, deltaY] = snapToGrid(props.grid, tmpDeltaX, tmpDeltaY, props.scale);
    const leftTmp = restrictToBounds(
      mouseClickPosition.value.left - deltaX, domRect.bounds.minLeft, domRect.bounds.maxLeft,
    );
    const topTmp = restrictToBounds(
      mouseClickPosition.value.top - deltaY, domRect.bounds.minTop, domRect.bounds.maxTop,
    );
    if (props.onDrag(leftTmp, topTmp) === false) {
      return;
    }
    const rightTmp = restrictToBounds(
      mouseClickPosition.value.right + deltaX, domRect.bounds.minRight, domRect.bounds.maxRight,
    );
    const bottomTmp = restrictToBounds(
      mouseClickPosition.value.bottom + deltaY,
      domRect.bounds.minBottom,
      domRect.bounds.maxBottom,
    );
    // eslint-disable-next-line no-param-reassign
    domRect.left = leftTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.top = topTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.right = rightTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.bottom = bottomTmp;
    context.emit('dragging', domRect.left, domRect.top);
    // eslint-disable-next-line no-param-reassign
    dragging.value = true;
  };
  const move = (e) => {
    if (dragEnable.value) {
      handleDrag(e);
    }
  };
  const elementDown = (e) => {
    // Check if it's a mouse event
    // Button 0 is the main button: Main button pressed,
    // usually the left button or the un-initialized state
    if (e instanceof MouseEvent && e.button !== 0) {
      return;
    }
    // Get the event target
    const target = e.target || e.srcElement;
    if (root.value.contains(target)) {
      // Invoke the drag start callback
      if (props.onDragStart(e) === false) {
        return;
      }
      if (
        (props.dragHandle
          && !matchesSelectorToParentElements(target, props.dragHandle, root.value))
        || (props.dragCancel
        && matchesSelectorToParentElements(target, props.dragCancel, root.value))
      ) {
        // eslint-disable-next-line no-param-reassign
        dragEnable.value = false;
        return;
      }
      if (!enabled.value) {
        // eslint-disable-next-line no-param-reassign
        enabled.value = true;
        context.emit('activated');
      }
      if (props.draggable) {
        // eslint-disable-next-line no-param-reassign
        dragEnable.value = true;
      }
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

      if (props.parent) {
        // eslint-disable-next-line no-param-reassign
        domRect.bounds = calcDragLimits(
          domRect,
          parentHeight.value,
          parentWidth.value,
          props.grid,
        );
      }
      addEvent(document.documentElement, eventsFor.value.move, move);
      addEvent(document.documentElement, eventsFor.value.stop, mouseUp);
    }
  };
  /**
   *
   * Mouse down element
   *
   * @param event
   */
  const elementMouseDown = (event) => {
    // eslint-disable-next-line no-param-reassign
    eventsFor.value = events.mouse;
    elementDown(event);
  };
  const elementTouchDown = (e) => {
    // eslint-disable-next-line no-param-reassign
    eventsFor.value = events.touch;
    elementDown(e);
  };
  onBeforeUnmount(() => {
    removeEvent(document.documentElement, 'mousemove', move);
    removeEvent(document.documentElement, 'touchmove', move);
  });
  return {
    elementMouseDown, elementTouchDown, dragging,
  };
}
