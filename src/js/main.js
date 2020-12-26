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
    const selectionBtnMask = document.getElementsByClassName('selectionBtnMask')[0]
    const machine = document.getElementsByClassName('machine')[0]
    const machineMask = document.getElementsByClassName('machineMask')[0]
    const boxIconBtnInKinds = document.getElementsByClassName('boxIconBtnInKind')
    const boxIconBtns = document.getElementsByClassName('boxIconBtn')
    // 选中按钮遮罩层
    const boxIconBtnChecked = document.getElementsByClassName('mask')[0]
    boxIconBtnChecked.className = 'mask'
    if (index) { // 抓实物
        setConfigData('giftLiclassName', 'giftShowInKindTag1')
        createAwardedMsgList(winners.inKind)
        choiceNumber(199)
        setConfigData('gameIcon', 199)
        selectionBtnMask.className = 'selectionBtnMask selectionBtnMaskRight'
        machine.className = 'machine machinePurple'
        boxIconBtnChecked.className = 'mask maskInKind'
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
        selectionBtnMask.className = 'selectionBtnMask selectionBtnMaskLeft'
        machine.className = 'machine machineGreen'
        boxIconBtnChecked.className = 'mask maskIcon'
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
    const deviceHeight = document.documentElement.clientHeight
    const container = document.getElementById('container')
    const sections = container.getElementsByClassName('section')
    sections[0].scrollTop = sections[0].scrollHeight
    container.style.transform = `translate3d(0px, ${-deviceHeight}px, 0px)`
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
    if (iconNum === 'go') {
        openPopup('confirmPayment', `${getConfigData('gameIcon')}盒币`)
        return
    }
    console.log(`投币数${iconNum}`)
    setConfigData('gameIcon', iconNum)
    const boxIconBtnChecked = document.getElementsByClassName('mask')[0]
    switch (iconNum) {
        case 8:
            boxIconBtnChecked.className = 'mask mask8' // 按钮遮罩
            setConfigData('giftLiclassName', 'giftShowTag1') // 配置当前数据
            createGiftShowTag('giftShowTag1 giftShow', iconGifts.type1, giftImg) // 生成li列表
            break;
        case 18:
            boxIconBtnChecked.className = 'mask mask18'
            setConfigData('giftLiclassName', 'giftShowTag2')
            createGiftShowTag('giftShowTag2 giftShow', iconGifts.type2, giftImg)
            break;
        case 38:
            boxIconBtnChecked.className = 'mask mask38'
            setConfigData('giftLiclassName', 'giftShowTag3')
            createGiftShowTag('giftShowTag3 giftShow', iconGifts.type3, giftImg)
            break;
        case 199:
            boxIconBtnChecked.className = 'mask mask199'
            setConfigData('giftLiclassName', 'giftShowInKindTag1')
            createGiftShowInKindTag('giftShowInKindTag1 giftShowInKind', inKindGifts.type1, giftImg)
            break;
        case 1299:
            boxIconBtnChecked.className = 'mask mask1299'
            setConfigData('giftLiclassName', 'giftShowInKindTag2')
            createGiftShowInKindTag('giftShowInKindTag2 giftShowInKind', inKindGifts.type2, giftImg)
            break;
        default:
            break;
    }
    // 重置列表后重置滚动效果
    lantern(document.getElementsByClassName('giftList')[0], 3, getConfigData('giftLiclassName'))
}

/**
 * 抓取动画&&抓取逻辑
 */
const grabAnimation = () => {
    const gripperBox = document.getElementsByClassName('gripperBox')[0]
    const gripperHand = document.getElementsByClassName('gripperHand')[0]
    const handLeft = document.getElementsByClassName('handLeft')[0]
    const handRight = document.getElementsByClassName('handRight')[0]
    const deviceWidth = getConfigData('deviceWidth')

    // 爪子晃动及其监听抓中盒子逻辑
    const beforeGrab = () => {
        return new Promise(async resolve => {
            let direction = 1 // 摆动方向
            let deg = 0 // 摆动角度
            const timerSwing = setInterval(() => {
                deg += 0.6 * direction
                gripperBox.style.transform = `rotate(${deg}deg)`
                if (Math.abs(deg) >= 7.5) { // 摆动最大角度7.5deg
                    direction = deg < 0 ? 1 : -1
                }
            }, 50)
            await wait(2400)
            const timerListen = setInterval(async () => { // 爪子摆动完之后开始监听抓取
                const left = document.getElementsByClassName(getConfigData('giftLiclassName'))[0].getBoundingClientRect().left
                const leftInterval = -29 * deviceWidth / 750 // -29为iphone6分辨率刚好抓中左边距
                if (left <= leftInterval && left >= leftInterval - 5) { // 当检测到到达某个区间时表示可以刚好抓到盒子，区间为:[leftInterval - 5, leftInterval]
                    // console.log(left)
                    clearInterval(timerSwing) // 爪子停止摆动
                    clearInterval(timerListen) // 停止监听抓取
                    gripperBox.style.transition = 'transform 0.2s linear'
                    gripperBox.style.transform = 'rotate(0)' // 爪子角度0
                    handLeft.style.transform = 'rotate(17deg)' // 张开爪子
                    handRight.style.transform = 'rotate(-17deg)'
                    await wait(200) // 此定时器使爪子摆正
                    resolve()
                }
            }, 20);
        })
    }

    // 抓取逻辑
    const grab = () => {
        const rand = Math.random() // 生成抓取随机数
        const getOrder = 4
        const giftShows = document.getElementsByClassName(getConfigData('giftLiclassName'))
        const temp = giftShows[getOrder] // 暂存抓中节点，用于隐藏和显示操作
        const clone = giftShows[getOrder].cloneNode(true) // 复制一份抓中节点到爪子上
        return new Promise(async resolve => {
            gripperHand.style.transform = 'translate3d(0px, 2.12rem, 0px)' // 爪子下落
            await wait(1100) // 稍等片刻后合闭爪子
            handLeft.style.transform = 'rotate(0deg)'
            handRight.style.transform = 'rotate(0deg)'
            await wait(270) // 抓取过程
            temp.classList.add('hidden') // 隐藏轨道上被抓住的盒子
            gripperHand.appendChild(clone)
            gripperHand.style.transition = 'transform 0.6s ease-in'
            gripperHand.style.transform = 'translate3d(0px, 0px, 0px)' // 爪子回到原来位置
            console.log("%c%s", "color: #fff; background: #20B2AA; font-size: 12px;", `当前概率: ${rand}, 抓中概率: ${temp.chance}, 是否抓中: ${rand < temp.chance}`);
            if (rand >= temp.chance) { // 未抓中
                await wait(400)
                clone.style.transform = 'translate3d(0px, 5.5rem, 0px)' // 爪子掉落
                await wait(900)
                openPopup('grabFailure') // 抓取失败弹窗
                temp.classList.remove('hidden')
                gripperHand.style.transition = 'transform 1.5s linear'
                gripperHand.lastChild.remove()
                resolve()
            } else { // 抓中
                await wait(700)
                openPopup('acceptHappy', temp.firstChild.innerText) // 开启抓取成功弹窗
                temp.classList.remove('hidden')
                gripperHand.style.transitionDuration = '1.5s'
                gripperHand.lastChild.remove()
                resolve()
            }
        })
    }

    (async function () {
        await beforeGrab() // 抓取前，晃动爪子，监听抓去的盒子
        grab() // 抓取，停止晃动，张开爪子，爪子下落，爪子合拢。。。
    })()
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