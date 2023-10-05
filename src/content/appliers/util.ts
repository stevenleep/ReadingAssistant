import { getWidgetToolsPanel, getWidgetToolsPosition, hideWidgetTools, showWidgetTools } from "../dom";
import { UNIQUE_SCOPED_ID, EXTENSION_PREFIX } from "./constant";
import { applierStore, getKeys } from "./store";

export function createApplierOptions(options = {}) {
    return {
        ignoreWhiteSpace: true,
        tagNames: ["mark"],
        elementTagName: "mark",
        ...options,
        elementProperties: {
          // @ts-ignore
          ...(options.elementProperties || {}),

          onmouseover: function(event: MouseEvent) {
            const element = event.target as HTMLElement;
            element.style.cursor = "pointer";

            const widgetToolsPanel = getWidgetToolsPanel();
            showWidgetTools(widgetToolsPanel, {
              x: event.clientX,
              y: event.clientY,
              ...getWidgetToolsPosition(widgetToolsPanel),
            });

            // /**
            //  * 如果是删除按钮，不做处理
            //  */
            // const isDelTarget = element.classList.contains("bookmark__highlighter__delete-button");
            // /**
            //  * 如果已经有删除按钮，不做处理
            //  */
            // const delButton = element.querySelector(".bookmark__highlighter__delete-button");
            // if (delButton || isDelTarget) {
            //   return;
            // }

            // // 增加一个删除按钮
            // const deleteButton = document.createElement("button");
            // deleteButton.innerText = "删除";
            // deleteButton.style.cursor = "pointer";
            // deleteButton.style.color = "white";
            // deleteButton.style.fontSize = "12px";
            // deleteButton.style.backgroundColor = "red";
            // deleteButton.classList.add("bookmark__highlighter__delete-button");
            // deleteButton.addEventListener("click", function(event: MouseEvent) {
            //   const parent = element.parentNode;
            //   if (parent) {
            //     deleteButton.remove();
            //     const textNode = document.createTextNode(element.innerText);
            //     parent.replaceChild(textNode, element);
            //   }
            // })
            // element.appendChild(deleteButton);
          },
          onmouseout: function(event: MouseEvent) {
            // const element = event.target as HTMLElement;
            // if(element.classList.contains("bookmark__highlighter__delete-button")) {
            //   return;
            // }
            // element.style.cursor = "auto";
            // const delButton = element.querySelector(".bookmark__highlighter__delete-button");
            // if (delButton && delButton.contains(event.relatedTarget as HTMLElement)) {
            //   return;
            // }
            // if (delButton) {
            //   delButton.remove();
            // }
            // hideWidgetTools();
          }
        },
    }
}

export function createApplierName(name: string): string {
  return `${EXTENSION_PREFIX}_${UNIQUE_SCOPED_ID}_${name}`
}

export function hasApplierName(name: string) {
  return name.startsWith(`${EXTENSION_PREFIX}_${UNIQUE_SCOPED_ID}_`);
}

// @ts-ignore
export function registerApplier(rangy: RangyStatic, highlighter, applier): void {
  const applierNameValid = hasApplierName(applier.name);

  /**
   * 非法的applierName
   */
  if (!applierNameValid) {
    throw new Error("Applier name is not registered");
  }

  applierStore.set(applier.name, applier);

  // @ts-ignore
  highlighter.addClassApplier(rangy.createClassApplier(applier.name, applier.options));
}

// @ts-ignore
export function registerAppliers(rangy: RangyStatic, highlighter, appliers) {
  const applierNames = Object.keys(appliers);
  for (let index = 0; index < applierNames.length; index ++) {
    registerApplier(rangy, highlighter, appliers[applierNames[index]]);
  }
}

let lastIndex = 0;
export function getApplierNameRandom(successively: boolean = true): string {
  const applierNames = getKeys();

  /**
   * 连续的获取
   */
  if(successively) {
    const targetIndex = lastIndex++ % applierNames.length;
    return applierNames[targetIndex];
  }

  // 在keys中随机一个
  const randomIndex = Math.floor(Math.random() * applierNames.length);
  return applierNames[randomIndex];
}
