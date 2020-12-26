import { setConfigData, getConfigData } from "./config";

/**
 * font-size设置
 */
(function () {
    function resizeBaseFontSize() {
        var rootHtml = document.documentElement
        var deviceWidth = rootHtml.clientWidth
        rootHtml.style.fontSize = deviceWidth / 7.5 + "px"
        setConfigData('fontSize', deviceWidth / 7.5)
        setConfigData('deviceWidth', deviceWidth)
    }
    resizeBaseFontSize()
    window.addEventListener("resize", resizeBaseFontSize, false)
    window.addEventListener("orientationchange", resizeBaseFontSize, false)
})();

/**
 * viewport设置
 */
(function () {
    function setViewport() {
        const dpr = window.devicePixelRatio
        const viewport = document.getElementsByName('viewport')[0]
        viewport.content = `width=device-width, user-scalable=no, initial-scale=${ 1 / dpr }, maximum-scale=${ 1 / dpr }, minimum-scale=${ 1 / dpr }`
    }
    window.addEventListener("resize", setViewport, false)
    window.addEventListener("orientationchange", setViewport, false)
})()