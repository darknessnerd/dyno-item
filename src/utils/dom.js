export const addEvent = (el, event, handler) => {
  if (!el) {
    return;
  }
  if (el.attachEvent) {
    el.attachEvent(`on${event}`, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    // eslint-disable-next-line no-param-reassign
    el[`on${event}`] = handler;
  }
};

/**
 * Return the parent [width, height]
 *
 * @param el - child element
 * @param hasParent - if should have a parent
 * @returns {number[]|*[]}
 */
export function getParentSize(el, hasParent) {
  if (hasParent) {
    const style = window.getComputedStyle(el.parentNode, null);
    return [
      parseInt(style.getPropertyValue('width'), 10),
      parseInt(style.getPropertyValue('height'), 10),
    ];
  }
  return [null, null];
}

export function isFunction(func) {
  return (typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]');
}
export function computeWidth(parentWidth, left, right) {
  return parentWidth - left - right;
}

export function computeHeight(parentHeight, top, bottom) {
  return parentHeight - top - bottom;
}
export function matchesSelectorToParentElements(el, selector, baseNode) {
  let node = el;
  const matchesSelectorFunc = [
    'matches',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector',
  ].find((func) => isFunction(node[func]));

  if (!isFunction(node[matchesSelectorFunc])) return false;

  do {
    if (node[matchesSelectorFunc](selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);
  return false;
}
export const removeEvent = (el, event, handler) => {
  if (!el) {
    return;
  }
  if (el.detachEvent) {
    el.detachEvent(`on${event}`, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    // eslint-disable-next-line no-param-reassign
    el[`on${event}`] = null;
  }
};
export const getBoundSize = (children) => {
  let h = 0;
  let w = 0;
  // eslint-disable-next-line prefer-destructuring
  Array.from(children).forEach((child) => {
    w = Math.max(w, child.offsetWidth);
    h += child.offsetHeight;
  });
  return [
    parseFloat(w),
    parseFloat(h),
  ];
};
export const getComputedSize = ($el) => {
  const style = window.getComputedStyle($el);
  return [
    parseFloat(style.getPropertyValue('width')),
    parseFloat(style.getPropertyValue('height')),
  ];
};
