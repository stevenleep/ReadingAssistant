import {initializeStruct} from "./utils";

export function createWidgetTools(elementProperties: Record<string, any> = {}) {
  const widgetToolsPanel = document.createElement("div");
  widgetToolsPanel.className = "bookmark__highlighter__widget-tools hidden";

  widgetToolsPanel.innerHTML = `
    <div class="widget-tools__item widget-tools__item--highlight" data-widget="highlight">高亮</div>
    <div class="widget-tools__item widget-tools__item--underline" data-widget="underline">下划线</div>
    <div class="widget-tools__item widget-tools__item--strikethrough" data-widget="strikethrough">删除线</div>
    <div class="widget-tools__item widget-tools__item--comment" data-widget="comment">批注</div>
  `;

  widgetToolsPanel.addEventListener("click", function (event) {
    if (elementProperties.onClick && typeof elementProperties.onClick === "function") {
      elementProperties.onClick(event, widgetToolsPanel);
    }
  }, false);
  return widgetToolsPanel;
}

/**
 * 挂载小工具面板
 * @param el HTMLElement 小工具面板的Element
 * @param container HTMLElement 挂载的容器
 */
export function mountWidgetTools(el = createWidgetTools(), container = document.body) {
  container.appendChild(el);
}

/**
 * 卸载小工具面板
 * @param el HTMLElement 小工具面板的Element
 */
export function unmountWidgetTools(el = document.querySelector(".bookmark__highlighter__widget-tools")) {
  if (el) {
    el.remove();
  }
}

/**
 * 获取小工具面板Element
 */
export function getWidgetToolsPanel() {
  return document.querySelector<HTMLDivElement>(".bookmark__highlighter__widget-tools")!;
}

/**
 * 隐藏小工具面板
 * @param widgetToolsPanel HTMLElement 小工具面板的Element
 */
export function hideWidgetToolsListener(widgetToolsPanel: HTMLElement = getWidgetToolsPanel()) {
 document.addEventListener("mousedown", function (event) {
    const target = event.target as HTMLElement;
    if(!widgetToolsPanel.contains(target)) {
      hideWidgetTools(widgetToolsPanel);
    }
 });
}

export function containsWidgetTools(target: HTMLElement) {
  const widgetToolsPanel = getWidgetToolsPanel();
  return widgetToolsPanel && widgetToolsPanel.contains(target);
}

export function hideWidgetTools(widgetToolsPanel: HTMLElement = getWidgetToolsPanel()) {
  widgetToolsPanel.classList.add("hidden");
}

export const keys = ['x', 'y', 'widgetPanelHeight', 'widgetPanelWidth', 'offsetTop', 'offsetLeft'] as const;
export type ShowWidgetToolsPosition = {
  [key in typeof keys[number]]: number;
}

export function showWidgetTools(
  widgetPanel: HTMLElement = getWidgetToolsPanel(),
  mousePosition: Partial<ShowWidgetToolsPosition>
) {
  widgetPanel.classList.remove("hidden");
  widgetPanel.style.position = "fixed";
  const values = initializeStruct(mousePosition, keys, "number") as ShowWidgetToolsPosition;
  const top = values.y + values.widgetPanelHeight + 2;
  widgetPanel.style.left = `${mousePosition.x}px`;
  widgetPanel.style.top = `${top}px`;
}

export function getWidgetToolsPosition(widgetPanel: HTMLElement = getWidgetToolsPanel()) {
  return {
    widgetPanelHeight: parseInt(widgetPanel.style.height) || 0,
    widgetPanelWidth: parseInt(widgetPanel.style.width) || 0,
  };
}

export function isEditableElement(target: HTMLElement) {
  const blacklist = ["INPUT", "TEXTAREA", "SELECT", "OPTION", "CHECK", "RADIO", "BUTTON"];
  return target.isContentEditable || blacklist.includes(target.tagName);
}
