import { createApplierName, createApplierOptions } from "../util";

export const name = createApplierName("purple");

/**
 * purple 紫色
 */
export const backgroundColor = "#5125d1";
export const options = createApplierOptions({
  elementProperties: {
    style: {
      backgroundColor,
      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      borderRadius: "4px",
      padding: "0 4px",
      color: "white",
    }
  }
});
