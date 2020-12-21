/**
 * @description module
 * @author aolongyu
 * @created 2020/12/08 15:10:46
 */

import {
    iconGifts,
    inKindGifts,
    wareHouse
} from "../../mock/exports"

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

    if (index) { // 抓实物

        const giftLine = document.getElementsByClassName('giftLine')[0]
        giftLine.innerHTML = ''
        for (let i = 0; i < inKindGifts.type1.length; i++) {
            let liNode = document.createElement('li')
            liNode.className = 'giftShowInKind'
            let spanNode = document.createElement('span')
            spanNode.classList.add('text')
            spanNode.innerText = inKindGifts.type1[i].name
            liNode.appendChild(spanNode)
            giftLine.appendChild(liNode)
        }

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
        const giftLine = document.getElementsByClassName('giftLine')[0]
        giftLine.innerHTML = ''
        for (let i = 0; i < iconGifts.type1.length; i++) {
            let liNode = document.createElement('li')
            liNode.className = 'giftShowTag giftShow'
            let iNode = document.createElement('i')
            iNode.className = 'giftImg'
            let textNode = document.createTextNode(iconGifts.type1[i].name)
            iNode.appendChild(textNode)
            liNode.appendChild(iNode)
            giftLine.appendChild(liNode)
        }

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
    console.log('openPopup: ' + msg + data)
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
        default:
            break;
    }

    let popup = document.getElementsByClassName('popup')[0]
    popup.style.display = 'block'
}

const popupPromptBox = (msg, myWealth) => {
    console.log('popupPromptBox: ' + msg);
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
                // setTimeout(() => {
                //     openPopup('acceptHappy', window.getGiftName) // 开启抓取成功弹窗
                // }, 2500)
                console.log(`支付${window.gameIcon}盒币成功\n目前剩余${myWealth.icons}盒币`);
            }
            break;
        case 'topupIcon':
            console.log('去充值(敬请期待)');
            alert('去充值(敬请期待)')
            closePopup()
            break;
        case 'acceptHappy':
            closePopup()
        default:
            break;
    }
}

/**
 * 抓取时的按钮点击事件
 * @param {number | string} iconNum 选择的支付盒币数
 */
const choiceNumber = (iconNum) => {
    console.log(iconNum);
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
    switch (iconNum) {
        case 8:
            boxIconBtnChecked.className = 'mask mask8'
            
            for (let i = 0; i < iconGifts.type1.length; i++) {
                let liNode = document.createElement('li')
                liNode.className = 'giftShowTag giftShow'
                let iNode = document.createElement('i')
                iNode.className = 'giftImg'
                let textNode = document.createTextNode(iconGifts.type1[i].name)
                iNode.appendChild(textNode)
                liNode.appendChild(iNode)
                giftLine.appendChild(liNode)
            }
            break;
        case 18:
            boxIconBtnChecked.className = 'mask mask18'
            for (let i = 0; i < iconGifts.type2.length; i++) {
                let liNode = document.createElement('li')
                liNode.className = 'giftShowTag giftShow'
                let iNode = document.createElement('i')
                iNode.className = 'giftImg'
                let textNode = document.createTextNode(iconGifts.type2[i].name)
                iNode.appendChild(textNode)
                liNode.appendChild(iNode)
                giftLine.appendChild(liNode)
            }
            break;
        case 38:
            boxIconBtnChecked.className = 'mask mask38'
            for (let i = 0; i < iconGifts.type3.length; i++) {
                let liNode = document.createElement('li')
                liNode.className = 'giftShowTag giftShow'
                let iNode = document.createElement('i')
                iNode.className = 'giftImg'
                let textNode = document.createTextNode(iconGifts.type3[i].name)
                iNode.appendChild(textNode)
                liNode.appendChild(iNode)
                giftLine.appendChild(liNode)
            }
            break;
        case 199:
            boxIconBtnChecked.className = 'mask mask199'
            for (let i = 0; i < inKindGifts.type1.length; i++) {
                let liNode = document.createElement('li')
                liNode.className = 'giftShowInKind'
                let spanNode = document.createElement('span')
                spanNode.classList.add('text')
                spanNode.innerText = inKindGifts.type1[i].name
                liNode.appendChild(spanNode)
                giftLine.appendChild(liNode)
            }
            break;
        case 1299:
            boxIconBtnChecked.className = 'mask mask1299'
            for (let i = 0; i < inKindGifts.type2.length; i++) {
                let liNode = document.createElement('li')
                liNode.className = 'giftShowInKind'
                let spanNode = document.createElement('span')
                spanNode.classList.add('text')
                spanNode.innerText = inKindGifts.type2[i].name
                liNode.appendChild(spanNode)
                giftLine.appendChild(liNode)
            }
            break;
        default:
            break;
    }
}

/**
 * 抓取动画
 */
const grabAnimation = () => {
    let gripperLine = document.getElementsByClassName('gripperLine')[0]
    let gripperBox = document.getElementsByClassName('gripperBox')[0]
    new Promise((resolve) => {
        let deg = 7
        gripperBox.style.transform = `rotate(${deg}deg)`
        let timer1 = setInterval(() => {
            gripperBox.style.transform = `rotate(${-deg}deg)`
            deg = -deg
        }, 1000)

        setTimeout(() => {
            clearInterval(timer1)
            let timer = setInterval(() => {
                let giftLineFirstChild = document.getElementsByClassName('giftShowTag')[0]
                let left = giftLineFirstChild.getBoundingClientRect().left
                if (left <= -5 && left >= -15) {
                    console.log(left)
                    clearInterval(timer)
                    gripperBox.style.transition = 'all 0s'
                    gripperBox.style.transform = 'rotate(0)'
                    resolve()
                }
            }, 20);
        }, 2000)

    }).then(() => {
        gripperLine.style.height = '2.36rem'
        setTimeout(() => {
            // 在轨道上去除抓中的盒子
            let gripperBox = document.getElementsByClassName('gripperBox')[0]
            let giftShows = document.getElementsByClassName('giftShowTag')
            const temp = giftShows[3]
            const clone = giftShows[3].cloneNode(true)
            giftShows[3].className = 'giftShowTag giftNone'
            gripperBox.appendChild(clone)
            window.getGiftName = temp.firstChild.innerText
            setTimeout(() => {
                temp.className = 'giftShowTag giftShow'
                gripperBox.lastChild.remove()
            }, 1000)
            // 爪子回到原来位置
            gripperLine.style.height = '0.4rem'
            gripperBox.style.transition = 'transform 1s linear'

            const rand = Math.random()
            console.log('rand', rand)
            if (rand < 0.5) {
                dropAnimation()
            }
        }, 1000)
    })
}

/**
 * 掉落
 */
const dropAnimation = () => {
    setTimeout(() => {
        const gripperNext = document.getElementsByClassName('gripper')[0].nextElementSibling
        gripperNext.style.marginTop = '3.33rem'
    }, 500)
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