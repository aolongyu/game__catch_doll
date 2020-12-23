/**
 * 跑马灯
 * 依赖getStyle
 * @param {object} element 操作元素
 * @param {number} speed 移动速度
 */

import getStyle from './getStyle'

const lantern = (element, speed = 1, className) => {
    const ul = element.getElementsByClassName('giftLine')[0]
    const liTemp = ul.getElementsByClassName(className)[0]
    const liWidth = getStyle(liTemp, 'width')
    let offset = 0
    let flag = true

    const run = () => {
        offset -= speed
        let li = ul.getElementsByClassName(className)[0]
        if(!li) {
            flag = false
            return
        }
        ul.style.transform = `translate3d(${offset/100}rem, 0px, 0px)`
        if (li.getBoundingClientRect().left <= -liWidth) {
            ul.style.left = '0px'
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