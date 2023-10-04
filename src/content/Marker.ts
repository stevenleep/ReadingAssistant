import rangy from "rangy";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-highlighter";
import * as presetAppliers from "./appliers/persets";
import {registerAppliers} from "./appliers/util";

/**
 * 临时的类型定义
 */
export type RangyHighlighter = any;

export default class Marker {
  public highlighter: RangyHighlighter;

  /**
   * 上一次可用的选中内容
   */
  public lastSelection: RangySelection | null = null;
  public range: Range | null = null;

  public initialize() {
    // @ts-ignore
    rangy.init();

    // @ts-ignore
    this.highlighter = rangy.createHighlighter();
    registerAppliers(rangy, this.highlighter, presetAppliers);
  }
}
