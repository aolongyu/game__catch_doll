import getStyle from './getStyle'

const carousel = (ul, speed, delay) => {
  let liHeight = 0;
  let offset = 0
  let top = ul.getElementsByClassName('scrollLi')[0].getBoundingClientRect().top
  let flag = true

  function run() {
    let li = ul.getElementsByClassName('scrollLi')[0]
    liHeight = getStyle(li, 'height')
    offset -= speed
    ul.style.transform = `translate3d(-50%, ${offset}px, 0px)`
    if (li.getBoundingClientRect().top - top <= -liHeight) {
      ul.appendChild(li)
      ul.style.transform = `translate3d(-50%, 0px, 0px)`
      offset = 0
      // 暂停delay
      flag = false
      setTimeout(() => {
        flag = true
        animloop()
      }, delay)
    }
  }

  function animloop() {
    run();
    if (flag) {
      window.requestAnimationFrame(animloop)
    }
  }

  animloop()
}

export default carousel