// import {
//     setConfigData
// } from "./config";

/**
 * font-size设置
 */
// (function () {
//     const rootHtml = document.documentElement
//     const deviceWidth = rootHtml.clientWidth
//     rootHtml.style.fontSize = deviceWidth / 7.5 + "px"
//     setConfigData('fontSize', deviceWidth / 7.5)
//     setConfigData('deviceWidth', deviceWidth)
// })();

/**
 * viewport设置
 */
// (function () {
//     function setViewport() {
//         const dpr = window.devicePixelRatio
//         const viewport = document.getElementsByName('viewport')[0]
//         viewport.content = `width=device-width, user-scalable=no, initial-scale=${ 1 / dpr }, maximum-scale=${ 1 / dpr }, minimum-scale=${ 1 / dpr }`
//     }
//     setViewport()
//     window.addEventListener("resize", setViewport, false)
//     window.addEventListener("orientationchange", setViewport, false)
// })()