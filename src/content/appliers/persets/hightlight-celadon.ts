import { createApplierName, createApplierOptions } from "../util";

export const name = createApplierName("celadon");

/**
 * celadon 灰绿色
 */
// export const backgroundColor = "#dbf8f7";
export const backgroundColor = "#41e0c0";

export const options = createApplierOptions({
    tagNames: ["*"],
    elementProperties: {
        style: {
          backgroundColor,
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          // borderRadius: "4px",
          // padding: "0 4px",
          color: "white",

          // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break
          // 使用文本的延续的方式，避免换行后出现空白
          webkitBoxDecorationBreak: "clone",
          boxDecorationBreak: "clone",
          oBoxDecorationBreak: "clone",
        },
    }
});
