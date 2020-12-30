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
import lantern from "./utils/lantern"
import giftImg from '../assets/exports'
import {
    getConfigData,
    setConfigData
} from "./utils/config"
import {
    createAwardedMsgList,
    createGiftShowInKindTag,
    createGiftShowTag
} from "./utils/createLiNodes"
import wait from "./utils/wait"

/**
 * 抓盒币、抓实物
 * @param {number} index 0:抓盒币、1:抓实物
 */
const changeFetchSelection = (index) => {
    // 正在抓取或正在当前页面，点击无效
    if (getConfigData('going') || ((index === 1) && (getConfigData('gameIcon') > 100)) || ((index === 0) && (getConfigData('gameIcon') <= 100))) return
    const machine = document.getElementsByClassName('machine')[0]
    const machineMask = document.getElementsByClassName('machineMask')[0]
    const boxIconBtnInKinds = document.getElementsByClassName('boxIconBtnInKind')
    const boxIconBtns = document.getElementsByClassName('boxIconBtn')
    const selectionBtns = document.getElementsByClassName('selectionBtn')
    const goBtn = document.getElementsByClassName('goBtn')[0]
    if (index) { // 抓实物
        setConfigData('giftLiclassName', 'giftShowInKindTag1')
        createAwardedMsgList(winners.inKind)
        choiceNumber(199)
        setConfigData('gameIcon', 199)
        goBtn.className = 'goBtn goBtn2'
        machine.className = 'machine machinePurple'
        selectionBtns[0].classList.remove('active')
        selectionBtns[1].classList.add('active')
        for (let i = 0; i < boxIconBtns.length; i++) {
            boxIconBtns[i].style.display = 'none';
        }
        for (let i = 0; i < boxIconBtnInKinds.length; i++) {
            boxIconBtnInKinds[i].style.display = 'inline-block';
        }
        // 只出现一次弹窗
        if (!getConfigData('showInKindPopup')) {
            openPopup('popCatchIconIntro')
            setConfigData('showInKindPopup', true)
        }
        machineMask.className = 'machineMask machineMaskPurple'
        console.log('抓实物');
    } else { // 抓盒币
        setConfigData('giftLiclassName', 'giftShowTag1')
        createAwardedMsgList(winners.icon)
        choiceNumber(8)
        setConfigData('gameIcon', 8)
        goBtn.className = 'goBtn goBtn1'
        machine.className = 'machine machineGreen'
        selectionBtns[1].classList.remove('active')
        selectionBtns[0].classList.add('active')
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
    // const deviceHeight = document.documentElement.clientHeight
    const deviceHeight = window.screen.availHeight * window.devicePixelRatio
    const container = document.getElementById('container')
    const sections = container.getElementsByClassName('section')
    sections[0].scrollTop = sections[0].scrollHeight
    container.style['-webkit-transform'] = `translate3d(0px, ${-deviceHeight}px, 0px)`
}

/**
 * 签到事件
 */
const sign = (signData) => {
    if (!signData.status) {
        signData.day++
        const dayCards = document.getElementsByClassName('dayCard')
        for (let i = 0; i < signData.day; i++) {
            dayCards[i].className = `dayCard day0${ i + 1 } dayGot dayGot0${ i + 1 }`
        }
        signData.status = true
        document.getElementsByClassName('signSubmit')[0].className = 'btn btnUnable signSubmit'
    }
}

/**
 * 关闭弹窗
 * @param {string} msg 判断是否是inputUserInfo或inputQQ用于是否返回仓库操作
 */
const closePopup = (msg) => {
    // 关闭遮罩层
    document.getElementsByClassName('popup')[0].style.display = 'none'
    // 关闭输入类弹窗
    const popupBoxs = document.getElementsByClassName('popupBox')
    for (let i = 0; i < popupBoxs.length; i++) {
        popupBoxs[i].style.display = 'none'
    }
    // 关闭提示类框
    document.getElementsByClassName('promptBox')[0].style.display = 'none'
    document.getElementsByClassName('popupPromptBox')[0].style.display = 'none'
    // 关闭提示类弹窗msg
    const promptBoxMsgs = document.getElementsByClassName('msg')
    for (let i = 0; i < promptBoxMsgs.length; i++) {
        promptBoxMsgs[i].style.display = 'none'
    }
    document.getElementsByClassName('promptText')[0].style.display = 'none'
    // 关闭提示类弹窗按钮
    const promptBtns = document.getElementsByClassName('promptBtn')
    for (let i = 0; i < promptBtns.length; i++) {
        promptBtns[i].style.display = 'none'
    }
    // 关闭抓盒币和抓实物说明弹窗
    const levelBoxs = document.getElementsByClassName('levelBox')
    for (let i = 0; i < levelBoxs.length; i++) {
        levelBoxs[i].style.display = 'none'
    }
    switch (msg) { // 输入用户信息和输入qq弹窗关闭之后需要回到仓库弹窗
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
 * @param {object[]} arr02 要更改的数据，三个参数
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
            document.getElementsByClassName('popupActivityRulesBox')[0].style.display = 'inline-block'
            break;
        case 'checkAward':
            document.getElementsByClassName('conditionText')[0].childNodes[1].childNodes[0].data = data
            document.getElementsByClassName('popupRewardPreviewBox')[0].style.display = 'inline-block'
            break;
        case 'checkWarehouse':
            document.getElementsByClassName('popupWarehouseBox')[0].style.display = 'inline-block'
            const warehouseList = document.getElementsByClassName('warehouseList')[0]
            for (let i = 0; i < data.length; i++) {
                const li = document.createElement('li')
                li.className = 'warehouseItem'
                const span1 = document.createElement('span')
                span1.className = 'left'
                span1.innerText = data[i].name
                li.appendChild(span1)
                const span2 = document.createElement('span')
                span2.className = 'center'
                span2.innerText = data[i].getDate
                li.appendChild(span2)
                const span3 = document.createElement('span')
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
            document.getElementsByClassName('popupInputUserInfoBox')[0].style.display = 'inline-block'
            break;
        case 'inputQQ':
            closePopup()
            document.getElementsByClassName('popupInputQQBox')[0].style.display = 'inline-block'
            break;
        case 'popCatchIconIntro':
            document.getElementsByClassName('smallBox')[0].style.display = 'inline-block'
            document.getElementsByClassName('popupPromptBox')[0].style.display = ''
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
    document.getElementsByClassName('popup')[0].style.display = 'block'
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
            setConfigData('going', true)    // 点击确认支付之后阻止触发点击事件
            console.log(`目前拥有${myWealth.icons}盒币`);
            closePopup() // 关闭当前弹窗
            if (myWealth.icons < getConfigData('gameIcon')) { // 判断当前盒币是否足够支付
                console.log(`需要${getConfigData('gameIcon')}盒币，你的盒币不足，请充值`);
                openPopup('topupIcon') // 开启充值弹窗
            } else {
                myWealth.icons -= getConfigData('gameIcon')
                grabAnimation()
                console.log(`支付${getConfigData('gameIcon')}盒币成功, 目前剩余${myWealth.icons}盒币`);
            }
            break;
        case 'topupIcon':
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
    // 点击已选中按钮或当前正在执行抓取，则点击无效
    if (iconNum === getConfigData('gameIcon') || getConfigData('going')) return
    if (iconNum === 'go') {
        openPopup('confirmPayment', `${getConfigData('gameIcon')}盒币`)
        return
    }
    console.log(`投币数${iconNum}`)
    setConfigData('gameIcon', iconNum)
    const boxIconBtns = document.getElementsByClassName('boxIconBtn')
    const boxIconBtnInKinds = document.getElementsByClassName('boxIconBtnInKind')
    for (let i = 0; i < boxIconBtns.length; i++) {
        boxIconBtns[i].classList.remove('activeIcon')
    }
    for (let i = 0; i < boxIconBtnInKinds.length; i++) {
        boxIconBtnInKinds[i].classList.remove('activeInKind')
    }
    let type
    switch (iconNum) {
        case 8:
            type = 'type1'
            boxIconBtns[0].classList.add('activeIcon')
            setConfigData('giftLiclassName', 'giftShowTag1') // 配置当前数据
            break;
        case 18:
            type = 'type2'
            boxIconBtns[1].classList.add('activeIcon')
            setConfigData('giftLiclassName', 'giftShowTag2')
            break;
        case 38:
            type = 'type3'
            boxIconBtns[2].classList.add('activeIcon')
            setConfigData('giftLiclassName', 'giftShowTag3')
            break;
        case 199:
            type = 'type1'
            boxIconBtnInKinds[0].classList.add('activeInKind')
            setConfigData('giftLiclassName', 'giftShowInKindTag1')
            break;
        case 1299:
            type = 'type2'
            boxIconBtnInKinds[1].classList.add('activeInKind')
            setConfigData('giftLiclassName', 'giftShowInKindTag2')
            break;
        default:
            break;
    }
    // 重置列表后重置滚动效果
    lantern(document.getElementsByClassName('giftList')[0], 3, getConfigData('giftLiclassName'), iconNum <= 100 ? 'giftShow' : 'giftShowInKind', iconNum <= 100 ? iconGifts[type] : inKindGifts[type], giftImg)
}

/**
 * 抓取动画&&抓取逻辑
 */
const grabAnimation = () => {
    const gripperBox = document.getElementsByClassName('gripperBox')[0]
    const handLeft = document.getElementsByClassName('handLeft')[0]
    const handRight = document.getElementsByClassName('handRight')[0]
    const deviceWidth = getConfigData('deviceWidth')

    // 爪子晃动及其监听抓中盒子逻辑
    const beforeGrab = () => {
        return new Promise(async resolve => {
            let direction = 1 // 摆动方向
            let deg = 0 // 摆动角度
            const timerSwing = setInterval(() => {
                deg += 0.4 * direction
                gripperBox.style['-webkit-transform'] = `rotate(${deg}deg)`
                if (Math.abs(deg) >= 7.5) { // 摆动最大角度7.5deg
                    direction = deg < 0 ? 1 : -1
                }
            }, 30)
            await wait(2500) // 爪子提前摆动

            // 创建被抓中的盒子，这些数据需要向服务端请求：'giftShowTag1 giftShow specialBox', iconGifts.type1[2], giftImg
            const addLi = createGiftShowInKindTag(`${getConfigData('giftLiclassName')} giftShow specialBox`, iconGifts.type1[2], giftImg)
            const ul = document.getElementsByClassName('giftLine')[0]

            let flag = true
            let opened = false // 防止出现未张开爪子就开始下落抓取
            const timerListen = setInterval(async () => { // 爪子摆动完之后开始监听抓取
                const left = document.getElementsByClassName(getConfigData('giftLiclassName'))[0].getBoundingClientRect().left
                const leftInterval = -80 * deviceWidth / 750

                // 爪子回正以及爪子张开时机监听
                if (left <= leftInterval + 40 && left >= leftInterval - 10 + 40) {
                    clearInterval(timerSwing) // 爪子停止摆动
                    gripperBox.style.transition = 'transform 0.2s linear'
                    gripperBox.style['-webkit-transform'] = 'rotate(0)' // 爪子角度0
                    handLeft.style['-webkit-transform'] = 'rotate(17deg)' // 张开爪子
                    handRight.style['-webkit-transform'] = 'rotate(-17deg)'

                    opened = true
                }
                // 监听是否有满足抓取的盒子
                if (opened && left <= leftInterval && left >= leftInterval - 5) {
                    gripperBox.style.transition = 'transform 0s linear'
                    clearInterval(timerListen) // 停止监听抓取
                    opened = false
                    if (flag) {
                        ul.insertBefore(addLi, ul.getElementsByTagName('li')[5])
                        flag = false
                    }
                    resolve()
                }
            }, 20);
        })
    }

    (async function () {
        await beforeGrab() // 抓取前，晃动爪子，监听抓取的盒子
        setConfigData('getBox', true) // 抓取逻辑
    })()
}

export {
    changeFetchSelection,
    nextPage,
    sign,
    closePopup,
    openPopup,
    popupPromptBox,
    choiceNumber,
}