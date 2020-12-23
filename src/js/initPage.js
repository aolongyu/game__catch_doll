/**
 * 初始化页面数据
 */

const initPage = (achievementData, iconGifts, inKindGifts, myWealth, signData, winners, giftImg) => {
    // 初始选中按钮
    window.gameIcon = 8
    window.chance = iconGifts.type1.chance
    // 初始化抓取次数
    let grabNumber = document.getElementsByClassName('grabNumber')[0].childNodes[1]
    grabNumber.innerText = achievementData.catchTimes
    // 初始化抓抓成就
    let catchNums = document.getElementsByClassName('catchNum')
    let packageAlls = document.getElementsByClassName('packageAll')
    let progressLine = document.getElementsByClassName('progressLine')[0]
    let progressIcons = document.getElementsByClassName('progressIcon')
    achievementData.details.forEach((element, index) => {
        if (element.complete) {
            if (element.receive) {
                packageAlls[index].className = 'packageAll packageReceived'
            } else {
                packageAlls[index].className = 'packageAll packageReceiveWill'
            }
        }
    });

    if (achievementData.catchTimes >= achievementData.details[2].data) {
        // 进度点
        progressIcons[0].className = 'progressIcon receivedIcon'
        progressIcons[1].className = 'progressIcon progressIconMiddle receivedIcon'
        progressIcons[2].className = 'progressIcon receivedIcon'
        if (achievementData.details[2].receive) {
            progressLine.className = 'progressLine progressLineAll'
        } else {
            progressLine.className = 'progressLine progressLine3'
        }
    } else if (achievementData.catchTimes >= achievementData.details[1].data) {
        progressLine.className = 'progressLine progressLine2'
        progressIcons[0].className = 'progressIcon receivedIcon'
        progressIcons[1].className = 'progressIcon progressIconMiddle receivedIcon'
        progressLine.className = 'progressLine progressLine2'
    } else if (achievementData.catchTimes >= achievementData.details[0].data) {
        progressLine.className = 'progressLine progressLine1'
        progressIcons[0].className = 'progressIcon receivedIcon'
        progressIcons[1].className = 'progressIcon progressIconMiddle'
        progressLine.className = 'progressLine progressLine1'
    } else {
        progressLine.className = 'progressLine'
        progressIcons[1].className = 'progressIcon progressIconMiddle'
    }
    for(let i = 0; i < catchNums.length; i++) {
        catchNums[i].innerText = `抓${achievementData.details[i].data}次`
    }

    // 初始化签到卡片
    let dayCards = document.getElementsByClassName('dayCard')
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
    const giftLine = document.getElementsByClassName('giftLine')[0]
    for (let i = 0; i < iconGifts.type1.details.length; i++) {
        let liNode = document.createElement('li')
        liNode.className = 'giftShowTag giftShow'
        let iNode = document.createElement('img')
        iNode.className = 'giftImg'
        iNode.src = giftImg[iconGifts.type1.details[i].id]
        let spanNode = document.createElement('span')
        spanNode.innerText = iconGifts.type1.details[i].name
        liNode.appendChild(spanNode)
        liNode.appendChild(iNode)
        giftLine.appendChild(liNode)
    }

    // 初始化我的抓抓券
    const stamps = document.getElementsByClassName('stamps')[0]
    stamps.innerText = `我的抓抓券 : ${myWealth.vouchers > 99 ? '99+' : myWealth.vouchers}`
}

export default initPage