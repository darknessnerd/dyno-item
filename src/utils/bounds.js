export const snapToGrid = (grid, pendingX, pendingY, scale = 1) => {
  const [scaleX, scaleY] = typeof scale === 'number' ? [scale, scale] : scale;
  const x = Math.round((pendingX / scaleX) / grid[0]) * grid[0];
  const y = Math.round((pendingY / scaleY) / grid[1]) * grid[1];
  return [x, y];
};

export function restrictToBounds(value, min, max) {
  if (min !== null && value < min) {
    return min;
  }

  if (max !== null && max < value) {
    return max;
  }

  return value;
}

export const calcDragLimits = (
  domRect, parentHeight, parentWidth, grid,
) => ({
  minLeft: domRect.left % grid[0],
  maxLeft:
     Math.floor((parentWidth - domRect.width - domRect.left) / grid[0]) * grid[0] + domRect.left,
  minRight: domRect.right % grid[0],
  maxRight:
     Math.floor((parentWidth - domRect.width - domRect.right) / grid[0]) * grid[0] + domRect.right,
  minTop: domRect.top % grid[1],
  maxTop:
     Math.floor((parentHeight - domRect.height - domRect.top) / grid[1]) * grid[1] + domRect.top,
  minBottom: domRect.bottom % grid[1],
  // eslint-disable-next-line max-len
  maxBottom: Math.floor((parentHeight - domRect.height - domRect.bottom) / grid[1]) * grid[1] + domRect.bottom,
});

export function calcResizeLimits(
  minW, minH, maxW, maxH, grid,
  width, height, top, bottom, left, right, lockAspectRatio, aspectFactor,
  parent,
  parentWidth,
  parentHeight,
) {
  const [gridX, gridY] = grid;

  if (lockAspectRatio) {
    if (minW / minH > aspectFactor) {
      // eslint-disable-next-line no-param-reassign
      minH = minW / aspectFactor;
    } else {
      // eslint-disable-next-line no-param-reassign
      minW = aspectFactor * minH;
    }
    if (maxW && maxH) {
      // eslint-disable-next-line no-param-reassign
      maxW = Math.min(maxW, aspectFactor * maxH);
      // eslint-disable-next-line no-param-reassign
      maxH = Math.min(maxH, maxW / aspectFactor);
    } else if (maxW) {
      // eslint-disable-next-line no-param-reassign
      maxH = maxW / aspectFactor;
    } else if (maxH) {
      // eslint-disable-next-line no-param-reassign
      maxW = aspectFactor * maxH;
    }
  }
  // eslint-disable-next-line no-param-reassign
  maxW -= (maxW % gridX);
  // eslint-disable-next-line no-param-reassign
  maxH -= (maxH % gridY);
  const limits = {
    minLeft: null,
    maxLeft: null,
    minTop: null,
    maxTop: null,
    minRight: null,
    maxRight: null,
    minBottom: null,
    maxBottom: null,
  };
  if (parent) {
    limits.minLeft = left % gridX;
    limits.maxLeft = left + Math.floor((width - minW) / gridX) * gridX;
    limits.minTop = top % gridY;
    limits.maxTop = top + Math.floor((height - minH) / gridY) * gridY;
    limits.minRight = right % gridX;
    limits.maxRight = right + Math.floor((width - minW) / gridX) * gridX;
    limits.minBottom = bottom % gridY;
    limits.maxBottom = bottom + Math.floor((height - minH) / gridY) * gridY;
    if (maxW) {
      limits.minLeft = Math.max(limits.minLeft, parentWidth - right - maxW);
      limits.minRight = Math.max(limits.minRight, parentWidth - left - maxW);
    }
    if (maxH) {
      limits.minTop = Math.max(limits.minTop, parentHeight - bottom - maxH);
      limits.minBottom = Math.max(limits.minBottom, parentHeight - top - maxH);
    }
    if (lockAspectRatio) {
      limits.minLeft = Math.max(limits.minLeft, left - top * aspectFactor);
      limits.minTop = Math.max(limits.minTop, top - left / aspectFactor);
      limits.minRight = Math.max(limits.minRight, right - bottom * aspectFactor);
      limits.minBottom = Math.max(limits.minBottom, bottom - right / aspectFactor);
    }
  } else {
    limits.minLeft = null;
    limits.maxLeft = left + Math.floor((width - minW) / gridX) * gridX;
    limits.minTop = null;
    limits.maxTop = top + Math.floor((height - minH) / gridY) * gridY;
    limits.minRight = null;
    limits.maxRight = right + Math.floor((width - minW) / gridX) * gridX;
    limits.minBottom = null;
    limits.maxBottom = bottom + Math.floor((height - minH) / gridY) * gridY;
    if (maxW) {
      limits.minLeft = -(right + maxW);
      limits.minRight = -(left + maxW);
    }
    if (maxH) {
      limits.minTop = -(bottom + maxH);
      limits.minBottom = -(top + maxH);
    }
    if (lockAspectRatio && (maxW && maxH)) {
      limits.minLeft = Math.min(limits.minLeft, -(right + maxW));
      limits.minTop = Math.min(limits.minTop, -(maxH + bottom));
      limits.minRight = Math.min(limits.minRight, -left - maxW);
      limits.minBottom = Math.min(limits.minBottom, -top - maxH);
    }
  }
  return limits;
}
