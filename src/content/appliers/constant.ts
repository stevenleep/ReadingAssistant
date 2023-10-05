/**
 * @author: Eliauk Aldrich<lishiwen@zstun.com>
 * 
 * @description:
 * 
 * UNIQUE_SCOPED_ID 主要用途：
 * 1. 防止插件的Content Script注入到宿主页面中后，影响页面的正常使用
 * 2. 防止插件的WidgetTools受到宿主页面的样式污染
 * 
 * 这个ID同时将用于WidgetTools的样式类名前缀，以及Content Script注入到宿主页面中的样式类名前缀
 * 
 */
export const UNIQUE_SCOPED_ID = "E32A5A2F87104CF7B7EB75B40E487A49";

/**
 * 插件的前缀
 */
export const EXTENSION_PREFIX = "bookmark__highlighter__";