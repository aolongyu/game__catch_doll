/**
 * 初始化页面数据
 */

import {
    getConfigData,
    setConfigData
} from "./config"
import {
    createGiftShowTag
} from "./createLiNodes"

const initPage = (achievementData, iconGifts, inKindGifts, myWealth, signData, winners, giftImg) => {
    const rootHtml = document.documentElement
    const deviceWidth = rootHtml.clientWidth
    setConfigData('fontSize', deviceWidth / 7.5)
    setConfigData('deviceWidth', deviceWidth)

    // 初始化抓取次数
    const grabNumber = document.getElementsByClassName('grabNumber')[0].childNodes[1]
    grabNumber.innerText = achievementData.catchTimes
    // 初始化抓抓成就
    const catchNums = document.getElementsByClassName('catchNum')
    const packageAlls = document.getElementsByClassName('packageAll')
    const progressLine = document.getElementsByClassName('progressLine')[0]
    achievementData.details.forEach((element, index) => {
        if (element.complete) {
            if (element.receive) {
                packageAlls[index].classList.add('packageReceived')
            } else {
                packageAlls[index].classList.add('packageReceiveWill')
            }
        } else {
            packageAlls[index].classList.add('packageReceiveNot')
        }
    });
    if (achievementData.details[2].receive) {
        progressLine.classList.add('progressLineE')
    } else if (achievementData.catchTimes >= achievementData.details[2].data) {
        progressLine.classList.add('progressLineD')
    } else if (achievementData.catchTimes >= achievementData.details[1].data) {
        progressLine.classList.add('progressLineC')
    } else if (achievementData.catchTimes >= achievementData.details[0].data) {
        progressLine.classList.add('progressLineB')
    } else {
        progressLine.classList.add('progressLineA')
    }
    for (let i = 0; i < catchNums.length; i++) {
        catchNums[i].innerText = `抓${achievementData.details[i].data}次`
    }

    // 初始化签到卡片
    const dayCards = document.getElementsByClassName('dayCard')
    for (let i = 0; i < signData.day; i++) {
        dayCards[i].className = `dayCard day0${ i + 1 } dayGot dayGot0${ i + 1 }`
    }
    // 初始化签到按钮
    if (signData.status) {
        const signSubmit = document.getElementsByClassName('signSubmit')[0]
        signSubmit.className = 'btn btnUnable signSubmit'
    }
    if (signData.day >= 7) {
        const getAward = document.getElementsByClassName('getAward')[0]
        getAward.className = 'btn btnAble getAward'
    }

    // 初始化获奖名单
    const awardedMsg = document.getElementsByClassName('awardedMsg')[0]
    winners.icon.forEach((item) => {
        let li = document.createElement('li')
        li.className = 'scrollLi'
        let span1 = document.createElement('span')
        span1.className = 'nickname'
        span1.innerText = `恭喜 ${item.name} 获得`
        let span2 = document.createElement('span')
        span2.className = 'awardAmount'
        span2.innerText = item.prize
        li.appendChild(span1)
        li.appendChild(span2)
        awardedMsg.appendChild(li)
    })

    // 初始化滚动gifts
    // createGiftShowTag('giftShowTag1 giftShow', iconGifts.type1, giftImg)

    // 初始化我的抓抓券
    const stamps = document.getElementsByClassName('stamps')[0]
    stamps.innerText = `我的抓抓券 : ${myWealth.vouchers > 99 ? '99+' : myWealth.vouchers}`
}

export default initPage