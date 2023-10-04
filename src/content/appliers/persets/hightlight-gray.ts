import { createApplierName, createApplierOptions } from "../util";

export const name = createApplierName("gray");

/**
 * celadon 灰绿色
 */
// export const backgroundColor = "#f6e8e8";
export const backgroundColor = "#796f6f";
export const options = createApplierOptions( {
  elementProperties: {
    style: {
      backgroundColor,
      // color: "inherit",
      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      borderRadius: "4px",
      padding: "0 4px",
      color: "white",
    }
  }
});
