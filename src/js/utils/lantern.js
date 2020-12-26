/**
 * 跑马灯
 * 依赖getStyle
 * @param {object} element 操作元素
 * @param {number} speed 移动速度
 */

// left:   480
// right:  490

import {
    getConfigData
} from './config'
import getStyle from './getStyle'

const lantern = (element, speed = 1, className) => {
    const ul = element.getElementsByClassName('giftLine')[0]
    const liTemp = ul.getElementsByClassName(className)[0]
    const liWidth = getStyle(liTemp, 'width')
    const fontSize = getConfigData('fontSize')
    const deviceWidth = getConfigData('deviceWidth')
    let offset = deviceWidth
    let flag = true
    const speedReal = deviceWidth * speed / 750

    const run = () => {
        offset -= speedReal
        let li = ul.getElementsByClassName(className)[0]
        if (!li) {
            flag = false
            return
        }
        ul.style.transform = `translate3d(${ offset / fontSize }rem, 0px, 0px)`
        if (offset <= -liWidth) {
            ul.appendChild(li)
            ul.style.transform = `translate3d(0px, 0px, 0px)`
            offset = 0
        }
    }

    (function animloop() {
        run()
        flag && window.requestAnimationFrame(animloop)
    })()
}

export default lantern