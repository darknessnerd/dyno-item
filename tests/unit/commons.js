const baseStyle = {
  transform: 'translate(0px, 0px)',
  '-webkit-transition': 'transform 0s ease-in-out',
  width: '200px',
  height: '200px',
  zIndex: 'auto',
  position: 'absolute',
  userSelect: 'auto',
  MozUserSelect: 'auto',
  WebkitUserSelect: 'auto',
  MsUserSelect: 'auto',
};
const triggerMouseUp = async () => {
  const event = new MouseEvent('mouseup');
  document.documentElement.dispatchEvent(event);
};
const triggerMouseDownOnDocument = async () => {
  const event = new MouseEvent('mousedown');
  document.documentElement.dispatchEvent(event);
};
const triggerDragging = async (wrapper, expectDragging) => {
  await wrapper.find('[data-test="root"]').trigger('mousedown', {
    button: 0,
    pageX: 0,
    pageY: 0,
  });
  const event = new MouseEvent('mousemove');
  event.pageX = 10;
  event.pageY = 10;
  document.documentElement.dispatchEvent(event);
  // eslint-disable-next-line no-undef
  expect(wrapper.vm.dragging).toBe(expectDragging);
};
export {
  baseStyle, triggerDragging, triggerMouseUp, triggerMouseDownOnDocument,
};
