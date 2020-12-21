/**
 * 跑马灯
 * @param {object}} $element 
 * @param {number} speed 
 */
import getStyle from './getStyle'

const lantern = (element, speed = 10) => {
    let ul = element.getElementsByClassName('giftLine')[0]
    let liWidth = 0;
    let offset = 0

    function run() {
        let li = ul.getElementsByClassName('giftShowTag')[0]
        liWidth = getStyle(li, 'width')
        offset -= 2
        ul.style.transform = `translate3d(${offset}px, 0px, 0px)`
        if (li.getBoundingClientRect().left <= -liWidth) {
            ul.appendChild(li)
            offset = 0
        }
    }

    (function animloop() {
        run();
        window.requestAnimationFrame(animloop);
    })();
}

export default lantern