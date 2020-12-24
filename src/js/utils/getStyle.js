/**
 * 获取对象样式
 * @param {object} obj 获取样式的对象
 * @param {string} name 样式名
 */

const getStyle = (obj, name) => {
    if (window.getComputedStyle) {
        return parseInt(getComputedStyle(obj, null)[name])
    } else {
        return parseInt(obj.currentStyle[name])
    }
}

export default getStyle