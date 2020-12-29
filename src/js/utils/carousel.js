import getStyle from './getStyle'
import wait from './wait'

const carousel = (ul, speed, delay) => {
  let liTemp = ul.lastChild
  let liHeight = getStyle(liTemp, 'height')
  let offset = 0
  let flag = true

  const run = async () => {
    let li = ul.getElementsByClassName('scrollLi')[0]
    offset -= speed
    ul.style['-webkit-transform'] = `translate3d(-50%, ${offset}px, 0px)`
    if (offset <= -liHeight) {
      ul.appendChild(li)
      ul.style['-webkit-transform'] = 'translate3d(-50%, 0px, 0px)'
      offset = 0
      // 暂停delay
      flag = false
      await wait(delay)
      flag = true
      animloop()
    }
  }

  function animloop() {
    run();
    flag && window.requestAnimationFrame(animloop)
  }

  animloop()
}

export default carousel