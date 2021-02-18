import {
  calcDragLimits, calcResizeLimits, restrictToBounds, snapToGrid,
} from '@/utils/bounds';
import { computeHeight, computeWidth, getBoundSize } from '@/utils/dom';

export default function useTransform({
  props,
  resizing,
  dragging,
  domRect,
  aspectFactor,
  parentWidth,
  parentHeight,
  content,
}) {
  const changeWidth = (val) => {
    if (resizing.value || dragging.value) {
      return;
    }
    if (props.parent) {
      // eslint-disable-next-line no-param-reassign
      domRect.bounds = calcResizeLimits(
        props.minWidth, props.minHeight, props.maxWidth, props.maxHeight, props.grid,
        domRect.width, domRect.height, domRect.top, domRect.bottom, domRect.left, domRect.right,
        props.lockAspectRatio, aspectFactor.value, props.parent,
        parentWidth.value,
        parentHeight.value,
      );
    }
    let newVal = val;
    // should calculate with scale 1.
    if (val === 'auto') {
      // eslint-disable-next-line prefer-destructuring
      newVal = getBoundSize(content.value.children)[0];
    }
    // should calculate with scale 1.
    // eslint-disable-next-line no-unused-vars
    const [newWidth, _] = snapToGrid(props.grid, newVal, 0, 1);
    const rightTmp = restrictToBounds(
      (parentWidth.value - newWidth - domRect.left),
      domRect.bounds.minRight,
      domRect.bounds.maxRight,
    );
    let bottomTmp = domRect.bottom;
    if (props.lockAspectRatio) {
      bottomTmp = domRect.bottom - (domRect.right - rightTmp) / aspectFactor.value;
    }
    const widthTmp = computeWidth(parentWidth.value, domRect.left, rightTmp);
    const heightTmp = computeHeight(parentHeight.value, domRect.top, bottomTmp);
    // eslint-disable-next-line no-param-reassign
    domRect.right = rightTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.bottom = bottomTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.width = widthTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.height = heightTmp;
  };
  const changeHeight = (val) => {
    if (resizing.value || dragging.value) {
      return;
    }
    if (props.parent) {
      // eslint-disable-next-line no-param-reassign
      domRect.bounds = calcResizeLimits(
        props.minWidth, props.minHeight, props.maxWidth, props.maxHeight, props.grid,
        domRect.width, domRect.height, domRect.top, domRect.bottom, domRect.left, domRect.right,
        props.lockAspectRatio, aspectFactor.value, props.parent,
        parentWidth.value,
        parentHeight.value,
      );
    }
    let newVal = val;
    // should calculate with scale 1.
    if (val === 'auto') {
      // eslint-disable-next-line prefer-destructuring
      newVal = getBoundSize(content.value.children)[1];
    }
    // eslint-disable-next-line no-unused-vars
    const [_, newHeight] = snapToGrid(props.grid, 0, Number(newVal), 1);
    const bottomTmp = restrictToBounds(
      (parentHeight.value - newHeight - domRect.top),
      domRect.bounds.minBottom,
      domRect.bounds.maxBottom,
    );
    let rightTmp = domRect.right;
    if (props.lockAspectRatio) {
      rightTmp = domRect.right - (domRect.bottom - bottomTmp) * aspectFactor.value;
    }
    const widthTmp = computeWidth(parentWidth.value, domRect.left, rightTmp);
    const heightTmp = computeHeight(parentHeight.value, domRect.top, bottomTmp);
    // eslint-disable-next-line no-param-reassign
    domRect.right = rightTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.bottom = bottomTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.width = widthTmp;
    // eslint-disable-next-line no-param-reassign
    domRect.height = heightTmp;
  };

  const moveHorizontally = (val) => {
    if (resizing.value || dragging.value) {
      return;
    }
    if (props.parent) {
      // eslint-disable-next-line no-param-reassign
      domRect.bounds = calcDragLimits(
        domRect,
        parentHeight.value,
        parentWidth.value,
        props.grid,
      );
    }
    // should calculate with scale 1.
    // eslint-disable-next-line no-unused-vars
    const [deltaX, _] = snapToGrid(props.grid, val, domRect.top, 1);
    // eslint-disable-next-line no-param-reassign
    domRect.left = restrictToBounds(deltaX, domRect.bounds.minLeft, domRect.bounds.maxLeft);
    // eslint-disable-next-line no-param-reassign
    domRect.right = parentWidth.value - domRect.width - domRect.left;
  };

  const moveVertically = (val) => {
    if (resizing.value || dragging.value) {
      return;
    }
    if (props.parent) {
      // eslint-disable-next-line no-param-reassign
      domRect.bounds = calcDragLimits(
        domRect,
        parentHeight.value,
        parentWidth.value,
        props.grid,
      );
    }
    // should calculate with scale 1.
    // eslint-disable-next-line no-unused-vars
    const [_, deltaY] = snapToGrid(props.grid, domRect.left, val, 1);
    // eslint-disable-next-line no-param-reassign
    domRect.top = restrictToBounds(deltaY, domRect.bounds.minTop, domRect.bounds.maxTop);
    // eslint-disable-next-line no-param-reassign
    domRect.bottom = parentHeight.value - domRect.height - domRect.top;
  };
  return {
    changeHeight, changeWidth, moveVertically, moveHorizontally,
  };
}
