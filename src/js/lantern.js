/**
 * 跑马灯
 * @param {object}} $element 
 * @param {number} speed 
 */
import getStyle from './getStyle'

const lantern = (element, speed = 1, className) => {
    let ul = element.getElementsByClassName('giftLine')[0]
    let liTest = ul.getElementsByClassName(className)[0];
    let liWidth = getStyle(liTest, 'width')
    let offset = 0
    let li
    let flag = true

    function run() {
        offset -= speed
        li = ul.getElementsByClassName(className)[0]
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
        run();
        flag && window.requestAnimationFrame(animloop);
    })();
}

export default lantern