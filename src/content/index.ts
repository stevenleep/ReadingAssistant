import rangy from "rangy";
import Marker from "./Marker";
import {
  createWidgetTools,
  getWidgetToolsPanel,
  mountWidgetTools,
  showWidgetTools,
  hideWidgetToolsListener,
  getWidgetToolsPosition, isEditableElement, containsWidgetTools
} from "./dom";
import { getMousePosition } from "./action";
import { getApplierNameRandom } from "./appliers/util";

const marker = new Marker();

mountWidgetTools(createWidgetTools({
  onClick: function (event: MouseEvent, widgetToolsPanel: HTMLDivElement) {
    const oldRange = marker.range;

    if(!oldRange) {
      console.warn("range is not found");
      return;
    }

    const selection = rangy.getSelection();
    selection.removeAllRanges();
    selection.addRange(oldRange);
    marker.highlighter.highlightSelection(getApplierNameRandom());
  },
}));

marker.initialize();

document.addEventListener("mouseup", mark, false);
function mark(event: MouseEvent) {
    const target = event.target as HTMLElement;
    /**
     * 如果是widgetToolsPanel 或可编辑的元素，不做处理
     */
    if(containsWidgetTools(target) || isEditableElement(target)) {
      console.info("widgetToolsPanel or editable element is found");
      return;
    }

    const widgetToolsPanel = getWidgetToolsPanel();
    if (!widgetToolsPanel) {
      console.info("widgetToolsPanel is not found");
      return;
    }

    const selection = rangy.getSelection();
    if (!selection || selection.isCollapsed) {
      console.info("selection is not found or is collapsed");
      return;
    }

  /**
   * cache the range
   */
  marker.range = selection.getRangeAt(0);

    showWidgetTools(widgetToolsPanel, {
      ...getMousePosition(event),
      ...getWidgetToolsPosition(widgetToolsPanel),
    });

    hideWidgetToolsListener(widgetToolsPanel);
}

export {}
