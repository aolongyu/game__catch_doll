/**
 * 跑马灯
 * 依赖getStyle
 * @param {object} element 操作元素
 * @param {number} speed 移动速度
 */

import {
    openPopup
} from '../main'
import {
    getConfigData,
    setConfigData
} from './config'
import getStyle from './getStyle'
import wait from './wait'

const lantern = (element, speed = 1, className) => {
    const ul = element.getElementsByClassName('giftLine')[0]
    const liTemp = ul.getElementsByClassName(className)[0]
    const liWidth = getStyle(liTemp, 'width')
    const fontSize = getConfigData('fontSize')
    const deviceWidth = getConfigData('deviceWidth')
    let offsetBox = deviceWidth
    let offsetGripper = 0
    let direction = 1 // 爪子移动方向及其速度
    let notChangeLi = true
    const speedReal = deviceWidth * speed / 750

    const handLeft = document.getElementsByClassName('handLeft')[0]
    const handRight = document.getElementsByClassName('handRight')[0]

    const gripperHand = document.getElementsByClassName('gripperHand')[0]
    const giftShows = document.getElementsByClassName(getConfigData('giftLiclassName'))

    const run = async () => {
        // 箱子移动逻辑
        offsetBox -= speedReal
        let li = ul.getElementsByClassName(className)[0]
        if (!li) {
            notChangeLi = false
            return
        }
        ul.style['-webkit-transform'] = `translate3d(${ offsetBox / fontSize }rem, 0px, 0px)`
        if (offsetBox <= -liWidth) {
            ul.appendChild(li)
            ul.style['-webkit-transform'] = `translate3d(0px, 0px, 0px)`
            offsetBox = 0
        }

        // 爪子操作逻辑
        if (getConfigData('getBox')) {
            offsetGripper += speedReal * direction
            gripperHand.style['-webkit-transform'] = `translate3d(0px, ${ offsetGripper / fontSize }rem, 0px)`
            if (offsetGripper >= 170 * deviceWidth / 750) {
                handLeft.style['-webkit-transform'] = 'rotate(0deg)'
                handRight.style['-webkit-transform'] = 'rotate(0deg)'
            }
            if (offsetGripper >= 190 * deviceWidth / 750) {
                const rand = Math.random() // 生成抓取随机数
                offsetGripper = 190 * deviceWidth / 750
                direction = -2
                let getOrder = 2
                getOrder = giftShows[getOrder].getBoundingClientRect().left < deviceWidth / 2 - 220 * deviceWidth / 750 ? getOrder + 1 : getOrder
                const temp = giftShows[getOrder] // 暂存抓中节点，用于隐藏和显示操作
                const clone = giftShows[getOrder].cloneNode(true) // 复制一份抓中节点到爪子上
                temp.classList.add('hidden') // 隐藏轨道上被抓住的盒子
                gripperHand.appendChild(clone)
                console.log("%c%s", "color: #fff; background: #20B2AA; font-size: 12px;", `当前概率: ${rand}, 抓中概率: ${temp.chance}, 是否抓中: ${rand < temp.chance}`);
                if (rand >= temp.chance) { // 未抓中
                    await wait(600)
                    clone.style['-webkit-transform'] = 'translate3d(0px, 5.5rem, 0px)' // 盒子掉落
                    await wait(400)
                    openPopup('grabFailure') // 抓取失败弹窗
                    temp.classList.remove('hidden')
                    gripperHand.lastChild.remove()
                } else { // 抓中
                    await wait(800)
                    openPopup('acceptHappy', temp.firstChild.innerText) // 开启抓取成功弹窗
                    temp.classList.remove('hidden')
                    gripperHand.lastChild.remove()
                }
            }
            if (offsetGripper < 0) {
                gripperHand.style['-webkit-transform'] = `translate3d(0px, 0px, 0px)`
                offsetGripper = 0
                direction = 1
                setConfigData('getBox', false)
            }
        }
    }

    (function animloop() {
        run()
        notChangeLi && window.requestAnimationFrame(animloop)
    })()
}

export default lantern