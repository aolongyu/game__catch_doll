/**
 * @description module
 * @author aolongyu
 * @created 2020/12/08 15:10:46
 */

import {
    iconGifts,
    inKindGifts,
    wareHouse,
    winners
} from "../../mock/exports"
import lantern from "./lantern"

import giftImg from '../assets/exports'

/**
 * 抓盒币、抓实物
 * @param {number} index 0:抓盒币、1:抓实物
 */
const changeFetchSelection = (index) => {
    let selectionBtnMask = document.getElementsByClassName('selectionBtnMask')[0]
    let machine = document.getElementsByClassName('machine')[0]
    let machineMask = document.getElementsByClassName('machineMask')[0]
    let boxIconBtnInKinds = document.getElementsByClassName('boxIconBtnInKind')
    let boxIconBtns = document.getElementsByClassName('boxIconBtn')

    // 选中按钮遮罩层
    let boxIconBtnChecked = document.getElementsByClassName('mask')[0]
    boxIconBtnChecked.className = 'mask'
    const awardedMsg = document.getElementsByClassName('awardedMsg')[0]
    awardedMsg.innerHTML = ''

    if (index) { // 抓实物

        window.chance = inKindGifts.type1.chance

        winners.inKind.forEach((item) => {
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

        choiceNumber(199)
        lantern(document.getElementsByClassName('giftList')[0], 3, 'giftShowInKindTag')

        window.gameIcon = 199
        selectionBtnMask.style.left = ''
        selectionBtnMask.style.right = '0px'
        machine.className = 'machine machinePurple'
        boxIconBtnChecked.style.width = '178.5px'

        for (let i = 0; i < boxIconBtns.length; i++) {
            boxIconBtns[i].style.display = 'none';
        }

        for (let i = 0; i < boxIconBtnInKinds.length; i++) {
            boxIconBtnInKinds[i].style.display = 'inline-block';
        }

        // 只出现一次弹窗
        if (!window.showInKindPopup) {
            openPopup('popCatchIconIntro')
            window.showInKindPopup = 1
        }

        machineMask.className = 'machineMask machineMaskPurple'

        console.log('抓实物');
    } else { // 抓盒币
        window.chance = iconGifts.type1.chance
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

        choiceNumber(8)
        lantern(document.getElementsByClassName('giftList')[0], 3, 'giftShowTag')

        window.gameIcon = 8
        selectionBtnMask.style.right = ''
        selectionBtnMask.style.left = '0px'
        machine.className = 'machine machineGreen'
        boxIconBtnChecked.style.width = '115.5px'

        for (let i = 0; i < boxIconBtns.length; i++) {
            boxIconBtns[i].style.display = 'inline-block';
        }

        for (let i = 0; i < boxIconBtnInKinds.length; i++) {
            boxIconBtnInKinds[i].style.display = 'none';
        }

        machineMask.className = 'machineMask machineMaskGreen'

        console.log('抓盒币');
    }
}

/**
 * 下一页
 */
const nextPage = () => {
    $.fn.fullpage.moveSectionDown();
}

/**
 * 签到事件
 */
const sign = (signData) => {
    if (!signData.status) {
        signData.day++
        let dayCards = document.getElementsByClassName('dayCard')
        for (let i = 0; i < signData.day; i++) {
            dayCards[i].className = `dayCard day0${ i + 1 } dayGot dayGot0${ i + 1 }`
        }
        signData.status = true
        let signSubmit = document.getElementsByClassName('signSubmit')[0]
        signSubmit.className = 'btn btnUnable signSubmit'
    }
}

/**
 * 关闭弹窗
 * @param {string} msg 判断是否是inputUserInfo或inputQQ用于是否返回仓库操作
 */
const closePopup = (msg) => {
    // 关闭遮罩层
    let popup = document.getElementsByClassName('popup')[0]
    popup.style.display = 'none'

    // 关闭输入类弹窗
    let popupBoxs = document.getElementsByClassName('popupBox')
    for (let i = 0; i < popupBoxs.length; i++) {
        popupBoxs[i].style.display = 'none'
    }

    // 关闭提示类框
    let promptBox = document.getElementsByClassName('promptBox')[0]
    promptBox.style.display = 'none'
    let popupPromptBox = document.getElementsByClassName('popupPromptBox')[0]
    popupPromptBox.style.display = 'none'

    // 关闭提示类弹窗msg
    let promptBoxMsgs = document.getElementsByClassName('msg')
    for (let i = 0; i < promptBoxMsgs.length; i++) {
        promptBoxMsgs[i].style.display = 'none'
    }
    document.getElementsByClassName('promptText')[0].style.display = 'none'

    // 关闭提示类弹窗按钮
    let promptBtns = document.getElementsByClassName('promptBtn')
    for (let i = 0; i < promptBtns.length; i++) {
        promptBtns[i].style.display = 'none'
    }

    // 关闭抓盒币和抓实物说明弹窗
    let levelBoxs = document.getElementsByClassName('levelBox')
    for (let i = 0; i < levelBoxs.length; i++) {
        levelBoxs[i].style.display = 'none'
    }

    switch (msg) {
        case 'inputUserInfo':
        case 'inputQQ':
            openPopup('checkWarehouse', wareHouse)
            break;
        default:
            break;
    }
}

/**
 * 弹窗展示
 * @param {Array} arr01 要展示的对象
 * @param {any} data 要展示到弹窗上的数据
 * @param {Array{}} arr02 要更改的数据，三个参数
 */
const windowMsgAndBtn = (arr01, data, arr02) => {
    document.getElementsByClassName('promptBox')[0].style.display = 'inline-block'
    document.getElementsByClassName('popupPromptBox')[0].style.display = ''

    arr01 && arr01.forEach(element => {
        document.getElementById(element).style.display = 'inline-block'
    })

    arr02 && arr02.forEach(element => {
        document.getElementById(element.obj).childNodes[element.index].innerText = element.data
    })
}

/**
 * 开启弹窗
 * @param {string | undefined} msg 将要执行的key
 * @param {any} data 传输到弹窗的数据
 */
const openPopup = (msg, data) => {
    // console.log('openPopup: ' + msg + data)
    switch (msg) {
        case 'checkRules':
            let popupActivityRulesBox = document.getElementsByClassName('popupActivityRulesBox')[0]
            popupActivityRulesBox.style.display = 'inline-block'
            break;
        case 'checkAward':
            let conditionTextNum = document.getElementsByClassName('conditionText')[0].childNodes[1].childNodes[0]
            conditionTextNum.data = data
            let popupRewardPreviewBox = document.getElementsByClassName('popupRewardPreviewBox')[0]
            popupRewardPreviewBox.style.display = 'inline-block'
            break;
        case 'checkWarehouse':
            let popupWarehouseBox = document.getElementsByClassName('popupWarehouseBox')[0]
            popupWarehouseBox.style.display = 'inline-block'
            let warehouseList = document.getElementsByClassName('warehouseList')[0]
            for (let i = 0; i < data.length; i++) {
                let li = document.createElement('li')
                li.className = 'warehouseItem'
                let span1 = document.createElement('span')
                span1.className = 'left'
                span1.innerText = data[i].name
                li.appendChild(span1)
                let span2 = document.createElement('span')
                span2.className = 'center'
                span2.innerText = data[i].getDate
                li.appendChild(span2)
                let span3 = document.createElement('span')
                span3.className = 'right'
                switch (data[i].status) {
                    case 0:
                        span3.innerText = '已获得'
                        break
                    case 1:
                        span3.classList.add('specialText')
                        span3.style.paddingLeft = '0.15rem'
                        span3.innerText = '获得的游币将在10个工作日到账'
                        break
                    case 2:
                        span3.innerText = '地址已填写'
                        break
                    case 3:
                        span3.innerText = 'QQ号已填写'
                        break
                    case 4:
                        const a1 = document.createElement('a')
                        a1.classList.add('openPopupInputUserInfo')
                        a1.innerText = '快去填写地址'
                        a1.addEventListener('click', () => openPopup('inputUserInfo'))
                        span3.appendChild(a1)
                        break
                    case 5:
                        const a2 = document.createElement('a')
                        a2.classList.add('openPupupInputQQ')
                        a2.innerText = '填写QQ号'
                        a2.addEventListener('click', () => openPopup('inputQQ'))
                        span3.appendChild(a2)
                        break
                    case 6:
                        span3.innerText = '其他'
                        break
                }
                li.appendChild(span3)
                warehouseList.appendChild(li)
            }
            break;
        case 'inputUserInfo':
            closePopup()
            let popupInputUserInfoBox = document.getElementsByClassName('popupInputUserInfoBox')[0]
            popupInputUserInfoBox.style.display = 'inline-block'
            break;
        case 'inputQQ':
            closePopup()
            let popupInputQQBox = document.getElementsByClassName('popupInputQQBox')[0]
            popupInputQQBox.style.display = 'inline-block'
            break;
        case 'popCatchIconIntro':
            let smallBox = document.getElementsByClassName('smallBox')[0]
            smallBox.style.display = 'inline-block'
            let popupPromptBox = document.getElementsByClassName('popupPromptBox')[0]
            popupPromptBox.style.display = ''
            break;
        case 'confirmPayment': // 确认支付
            windowMsgAndBtn(['popupPromptMsg01', 'popupPromptBtn02', 'popupPromptText'], data, [{
                obj: 'popupPromptMsg01',
                index: 1,
                data
            }])
            break;
        case 'topupIcon': // 去充值
            windowMsgAndBtn(['popupPromptMsg05', 'popupPromptBtn07'], data)
            break;
        case 'acceptHappy': // 开心收下
            windowMsgAndBtn(['popupPromptMsg03', 'popupPromptBtn05'], data, [{
                obj: 'popupPromptMsg03',
                index: 3,
                data
            }])
            break;
        case 'grabFailure': // 抓取失败
            windowMsgAndBtn(['popupPromptMsg04', 'popupPromptBtn06'])
            break;
        default:
            break;
    }

    let popup = document.getElementsByClassName('popup')[0]
    popup.style.display = 'block'
}

/**
 * 提示弹窗选择
 * @param {string} msg key
 * @param {object} myWealth 我的财富数据
 */
const popupPromptBox = (msg, myWealth) => {
    // console.log('popupPromptBox: ' + msg);
    switch (msg) {
        case 'confirmPaymentSure':
            console.log(`目前拥有${myWealth.icons}盒币`);
            closePopup() // 关闭当前弹窗
            if (myWealth.icons < window.gameIcon) { // 判断当前盒币是否足够支付
                console.log(`需要${window.gameIcon}盒币，你的盒币不足，请充值`);
                openPopup('topupIcon') // 开启充值弹窗
            } else {
                myWealth.icons -= window.gameIcon
                closePopup()
                grabAnimation()
                console.log(`支付${window.gameIcon}盒币成功\n目前剩余${myWealth.icons}盒币`);
            }
            break;
        case 'topupIcon':
            console.log('去充值(敬请期待)');
            alert('去充值(敬请期待)')
            closePopup()
            break;
        case 'acceptHappy':
        case 'tryAgain':
            closePopup()
            break;
        default:
            break;
    }
}

/**
 * 抓取时的按钮点击事件
 * @param {number | string} iconNum 选择的支付盒币数
 */
const choiceNumber = (iconNum) => {
    console.log(`投币数${iconNum}`);
    if (iconNum === 'go') {
        if (window.gameIcon) {
            openPopup('confirmPayment', `${window.gameIcon}盒币`)
        } else {
            alert('请选择')
        }
        return
    }
    window.gameIcon = iconNum
    let boxIconBtnChecked = document.getElementsByClassName('mask')[0]
    const giftLine = document.getElementsByClassName('giftLine')[0]
    giftLine.innerHTML = ''
    giftLine.style.left = '7.5rem'
    switch (iconNum) {
        case 8:
            window.chance = iconGifts.type1.chance
            boxIconBtnChecked.className = 'mask mask8'

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

            break;
        case 18:
            window.chance = iconGifts.type2.chance
            boxIconBtnChecked.className = 'mask mask18'
            for (let i = 0; i < iconGifts.type2.details.length; i++) {
                let liNode = document.createElement('li')
                liNode.className = 'giftShowTag giftShow'
                let iNode = document.createElement('img')
                iNode.className = 'giftImg'
                iNode.src = giftImg[iconGifts.type2.details[i].id]
                let spanNode = document.createElement('span')
                spanNode.innerText = iconGifts.type2.details[i].name
                liNode.appendChild(spanNode)
                liNode.appendChild(iNode)
                giftLine.appendChild(liNode)
            }
            break;
        case 38:
            window.chance = iconGifts.type3.chance
            boxIconBtnChecked.className = 'mask mask38'
            for (let i = 0; i < iconGifts.type3.details.length; i++) {
                let liNode = document.createElement('li')
                liNode.className = 'giftShowTag giftShow'
                let iNode = document.createElement('img')
                iNode.className = 'giftImg'
                iNode.src = giftImg[iconGifts.type3.details[i].id]
                let spanNode = document.createElement('span')
                spanNode.innerText = iconGifts.type3.details[i].name
                liNode.appendChild(spanNode)
                liNode.appendChild(iNode)
                giftLine.appendChild(liNode)
            }
            break;
        case 199:
            window.chance = inKindGifts.type1.chance
            boxIconBtnChecked.className = 'mask mask199'
            for (let i = 0; i < inKindGifts.type1.details.length; i++) {
                let liNode = document.createElement('li')
                liNode.className = 'giftShowInKindTag giftShowInKind'
                let iNode = document.createElement('img')
                iNode.src = giftImg[inKindGifts.type1.details[i].id]
                let spanNode = document.createElement('span')
                spanNode.classList.add('text')
                spanNode.innerText = inKindGifts.type1.details[i].name
                liNode.appendChild(iNode)
                liNode.appendChild(spanNode)
                giftLine.appendChild(liNode)
            }
            break;
        case 1299:
            window.chance = inKindGifts.type2.chance
            boxIconBtnChecked.className = 'mask mask1299'
            for (let i = 0; i < inKindGifts.type2.details.length; i++) {
                let liNode = document.createElement('li')
                liNode.className = 'giftShowInKindTag giftShowInKind'
                let iNode = document.createElement('img')
                iNode.src = giftImg[inKindGifts.type2.details[i].id]
                let spanNode = document.createElement('span')
                spanNode.classList.add('text')
                spanNode.innerText = inKindGifts.type2.details[i].name
                liNode.appendChild(iNode)
                liNode.appendChild(spanNode)
                giftLine.appendChild(liNode)
            }
            break;
        default:
            break;
    }
}

/**
 * 抓取动画&&抓取逻辑
 */
const grabAnimation = () => {
    let gripperBox = document.getElementsByClassName('gripperBox')[0]
    let gripperHand = document.getElementsByClassName('gripperHand')[0]
    const handLeft = document.getElementsByClassName('handLeft')[0]
    const handRight = document.getElementsByClassName('handRight')[0]
    let timer1
    new Promise((resolve) => {
        let flag = 1
        let deg = 0
        timer1 = setInterval(() => {
            deg += 0.6 * flag
            gripperBox.style.transform = `rotate(${deg}deg)`
            if (Math.abs(deg) >= 7.5) {
                if (deg < 0) {
                    flag = 1
                } else {
                    flag = -1
                }
            }
        }, 50)

        setTimeout(() => {
            let timer = setInterval(() => {
                let giftLineFirstChild = document.getElementsByClassName('giftShowTag')[0] || document.getElementsByClassName('giftShowInKind')[0]
                let left = giftLineFirstChild.getBoundingClientRect().left
                if (left <= -60 && left >= -65) {
                    console.log(left)
                    clearInterval(timer)
                    gripperBox.style.transform = 'rotate(0)'
                    resolve()
                }
            }, 20);
            handLeft.style.transform = 'rotate(17deg)'
            handRight.style.transform = 'rotate(-17deg)'
        }, 2400)
    }).then(() => {
        clearInterval(timer1)

        gripperHand.style.transform = 'translate3d(0px, 2.15rem, 0px)'

        setTimeout(() => {
            handLeft.style.transform = 'rotate(0deg)'
            handRight.style.transform = 'rotate(0deg)'
        }, 1100)

        setTimeout(() => {
            // 在轨道上去除抓中的盒子
            let giftShows = document.getElementsByClassName('giftShowTag')[0] ? document.getElementsByClassName('giftShowTag') : document.getElementsByClassName('giftShowInKind')
            const temp = giftShows[2]
            const clone = giftShows[2].cloneNode(true)
            temp.style.opacity = '0'
            gripperHand.appendChild(clone)
            window.getGiftName = temp.firstChild.innerText
            // 爪子回到原来位置
            gripperHand.style.transition = 'transform 0.6s ease-in'
            gripperHand.style.transform = 'translate3d(0px, 0px, 0px)'

            const rand = Math.random()
            console.log("%c%s", "color: #fff; background: #20B2AA; font-size: 12px;", `当前概率: ${rand}, 抓中概率: ${window.chance}, 是否抓中: ${rand < window.chance}`);
            if (rand >= window.chance) {
                dropAnimation(clone)
                setTimeout(() => {
                    openPopup('grabFailure') // 抓取失败弹窗
                    gripperHand.style.transition = 'transform 1.5s linear'
                    temp.style.opacity = '1'
                    gripperHand.lastChild.remove()
                }, 900)
            } else {
                setTimeout(() => {
                    openPopup('acceptHappy', window.getGiftName) // 开启抓取成功弹窗
                    gripperHand.style.transitionDuration = '1.5s'
                    temp.style.opacity = '1'
                    gripperHand.lastChild.remove()
                }, 700)
            }
        }, 1370)
    })
}

/**
 * 掉落动画
 */
const dropAnimation = (clone) => {
    setTimeout(() => {
        clone.style.transform = 'translate3d(0px, 5.5rem, 0px)'
    }, 400)
}

export {
    changeFetchSelection,
    nextPage,
    sign,
    closePopup,
    openPopup,
    popupPromptBox,
    choiceNumber
}