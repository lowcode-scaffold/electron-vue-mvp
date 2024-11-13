import { defineConfig, presetAttributify, presetUno } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  /** 排除 */
  // exclude: ['node_modules'],
  /** 预设 */
  presets: [
    /** 属性化模式 & 无值的属性模式 */
    presetAttributify(),
    /** 默认预设 */
    presetUno(),
    presetRemToPx({ baseFontSize: 4 }), // m-2 就是 margin: 2px，直接按设计稿写就行
  ],
  /** 自定义规则 */
  rules: [
    ["divider-b-t", { "border-top": "solid 0.5px #EDEDED" }],
    ["divider", { width: "100%", height: "0.5px", background: "#EDEDED" }],
    ["divider-b-b", { "border-bottom": "solid 0.5px #EDEDED" }],
    ["text-primary", { color: "rgba(0, 0, 0, 0.85)" }],
    ["text-secondary", { color: "rgba(0, 0, 0, 0.6)" }],
    ["text-placeholder", { color: "rgba(0, 0, 0, 0.18)", "font-size": "14px" }],
    ["font-medium", { "font-size": "16px", "font-weight": 500 }],
    ["color-30", { color: "rgba(0, 0, 0, 0.30)" }],
    ["color-45", { color: "rgba(0, 0, 0, 0.45)" }],
    ["color-60", { color: "rgba(0, 0, 0, 0.60)" }],
    ["color-85", { color: "rgba(0, 0, 0, 0.85)" }],
  ],
  /** 自定义快捷方式 */
  shortcuts: {
    "wh-full": "w-full h-full",
    "flex-center": "flex justify-center items-center",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center",
  },
});
