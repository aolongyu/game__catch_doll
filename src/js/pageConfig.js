/**
 * font-size设置
 */
(function () {
    function resizeBaseFontSize() {
        var rootHtml = document.documentElement
        var deviceWidth = rootHtml.clientWidth
        //   if (deviceWidth > 750) {
        //       deviceWidth = 750;
        //   }
        rootHtml.style.fontSize = deviceWidth / 7.5 + "px"
    }
    resizeBaseFontSize()
    window.addEventListener("resize", resizeBaseFontSize, false)
    window.addEventListener("orientationchange", resizeBaseFontSize, false)
})();

/**
 * viewport设置
 */
(
    function () {
        const dpr = window.devicePixelRatio
        const viewport = document.getElementsByName('viewport')[0]
        viewport.content = `width=device-width, user-scalable=no, initial-scale=${ 1 / dpr }, maximum-scale=${ 1 / dpr }, minimum-scale=${ 1 / dpr }`
    }
)()