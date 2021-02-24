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
const triggerOnDragStart = async (wrapper) => {
  const event = new Event('dragstart', {});
  await wrapper.find('[data-test="root"]').element.dispatchEvent(event);
};
const triggerMouseMove = ({ x, y }) => {
  const event = new MouseEvent('mousemove');
  event.pageX = x;
  event.pageY = y;
  document.documentElement.dispatchEvent(event);
};
const triggerDragging = async (wrapper, expectDragging) => {
  await wrapper.find('[data-test="root"]').trigger('mousedown', {
    button: 0,
    pageX: 0,
    pageY: 0,
  });
  triggerMouseMove({ x: 10, y: 10 });
  // eslint-disable-next-line no-undef
  expect(wrapper.vm.dragging).toBe(expectDragging);
};
export {
  baseStyle,
  triggerDragging,
  triggerMouseUp, triggerMouseDownOnDocument, triggerOnDragStart, triggerMouseMove,
};
