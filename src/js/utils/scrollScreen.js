import getStyle from "./getStyle"

function change() {
    const rootHtml = document.documentElement
    rootHtml.style.overflow = 'hidden'
    const deviceHeight = window.screen.availHeight * window.devicePixelRatio
    const container = document.getElementById('container')
    container.style['-webkit-transform'] = `translate3d(0px, 0px, 0px)`
    container.style.transition = 'all 700ms ease'
    const sections = container.getElementsByClassName('section')
    let heightReal = []
    let startX
    let startY
    let up = 0
    let down = 0

    const touchStart = (e) => {
        startX = e.changedTouches[0].pageX
        startY = e.changedTouches[0].pageY
        container.addEventListener('touchend', touchEnd)
    }

    const touchEnd = (e) => {
        const pageX = e.changedTouches[0].pageX
        const pageY = e.changedTouches[0].pageY
        if (Math.abs(pageX - startX) >= Math.abs(pageY - startY)) return
        if (pageY - startY > 10) { // 下滑
            container.style['-webkit-transform'] = `translate3d(0px, 0px, 0px)`
        } else if (pageY - startY < -10) { // 上滑
            container.style['-webkit-transform'] = `translate3d(0px, ${-deviceHeight}px, 0px)`
        }
    }

    for (let i = 0; i < sections.length; i++) {
        heightReal[i] = getStyle(sections[i], 'height')
        sections[i].style.height = deviceHeight + 'px'
        sections[i].style.overflowY = 'scroll'
        sections[i].onscroll = () => {
            // heightReal[i]:当前页高度, deviceHeight:设备高度
            // 滚动到底部
            if (sections[i].scrollTop >= heightReal[i] - deviceHeight) {
                // console.log('down:', down);
                if (i >= sections.length) return // 最后一页
                if (!down++) {
                    setTimeout(() => {
                        sections[i] && (sections[i].scrollTop = heightReal[i] - deviceHeight - 1)
                    }, 500)
                    return
                }
                down = 0
                container.style['-webkit-transform'] = `translate3d(0px, ${-deviceHeight}px, 0px)`
                sections[i + 1] && (sections[i + 1].scrollTop = 1)
            }
            // 滚动到顶部
            if (sections[i].scrollTop <= 0) {
                // console.log('up:', up);
                if (i <= 0) return // 第一页
                if (!up++) {
                    setTimeout(() => {
                        sections[i] && (sections[i].scrollTop = 1)
                    }, 500)
                    return
                }
                up = 0
                container.style['-webkit-transform'] = `translate3d(0px, 0px, 0px)`
                sections[i - 1] && (sections[i - 1].scrollTop = heightReal[i - 1] - deviceHeight - 1)
            }
        }

        // 屏幕能够容纳当前section(不用屏内滚动)
        if (heightReal[i] < deviceHeight) {
            // 内容居中
            sections[i].style['-webkit-transform'] = `translateY(${(deviceHeight - heightReal[i]) / 2}px)`
            // 监听触摸事件
            container.addEventListener('touchstart', touchStart)
        }
    }
}

change()

window.addEventListener("resize", change, false)
window.addEventListener("orientationchange", change, false)