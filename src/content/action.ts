export function handleWidgetClick(event: MouseEvent, widgetPanel: HTMLElement) {
  // console.log("handleWidgetClick", event, widgetPanel);
}

export function getMousePosition(event: MouseEvent) {
  return {
    x: event.clientX,
    y: event.clientY,
  }
}
