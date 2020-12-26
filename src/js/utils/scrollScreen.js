import getStyle from "./getStyle"

(function () {
    const rootHtml = document.documentElement
    rootHtml.style.overflow = 'hidden'
    const deviceHeight = rootHtml.clientHeight
    const container = document.getElementById('container')
    container.style.transform = `translate3d(0px, 0px, 0px)`
    container.style.transition = 'all 700ms ease'
    const sections = container.getElementsByClassName('section')
    for (let i = 0; i < sections.length; i++) {
        const heightReal = getStyle(sections[i], 'height')
        sections[i].style.height = deviceHeight + 'px'
        sections[i].style.overflowY = 'scroll'
        sections[i].onscroll = () => {
            if (sections[i].scrollTop >= heightReal - deviceHeight) {
                container.style.transform = `translate3d(0px, ${-deviceHeight}px, 0px)`
            }
            if (sections[i].scrollTop <= 0) {
                container.style.transform = `translate3d(0px, 0px, 0px)`
            }
        }

        // 屏幕能够容纳当前section(不用屏内滚动)
        if (heightReal < deviceHeight) {
            sections[i].style.transform = `translateY(${(deviceHeight - heightReal) / 2}px)`
            container.addEventListener('touchstart', (e) => {
                let startY = e.changedTouches[0].pageY;
                container.addEventListener('touchmove', function (e) {
                    e.preventDefault()
                    let pageY = e.changedTouches[0].pageY
                    if (pageY - startY > 10) {
                        container.style.transform = `translate3d(0px, 0px, 0px)`
                    } else if (pageY - startY < -10) {
                        container.style.transform = `translate3d(0px, ${-deviceHeight}px, 0px)`
                    }
                })
            })
        }
    }
})()