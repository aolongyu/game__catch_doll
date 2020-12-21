import getStyle from './getStyle'

const carousel = (ul, speed, delay) => {
  let liHeight = 0;
  let offset = 0

  function run() {
    let li = ul.getElementsByClassName('scrollLi')[0]
    liHeight = getStyle(li, 'height')
    offset -= 2
    ul.style.transform = `translate3d(0px, ${offset}px, 0px)`
    if (li.getBoundingClientRect().top <= -liHeight) {
      ul.appendChild(li)
      offset = 0
    }
  }

  (function animloop() {
    run();
    window.requestAnimationFrame(animloop);
  })();

}

export default carousel