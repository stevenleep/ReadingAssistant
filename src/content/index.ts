import rangy from "rangy";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-highlighter";

import * as presetClassAppliers from "./perset-classappliers";
import { registerClassAppliers, composeHighlighterName } from "./register-classappliers";

/**
 * Initialize rangy
 */
rangy.init();

const highlighter = rangy.createHighlighter();

/**
 * Register class appliers
 */
registerClassAppliers(rangy, highlighter, presetClassAppliers);

/**
 * 监听鼠标按下事件
 */
document.addEventListener("mousedown", function () {
});

/**
 * 监听鼠标抬起事件
 */
document.addEventListener("mouseup", mark);

function mark(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    if(tagName === "input" || tagName === "textarea" || tagName === "select" || tagName === "option") {
      return;
    }

  // 如果选中的是可编辑元素，则不进行标记
    if (target.isContentEditable) {
      return
    }

    const selection = rangy.getSelection();
    console.log("selection", selection);
    highlighter.highlightSelection(composeHighlighterName("celadon"));
}

export {}
