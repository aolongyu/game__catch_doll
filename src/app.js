// (less)全局样式
import './global.less'
// (less)局部样式
import './less/styles.less'
// (css)fullPage样式
import './less/jquery.fullPage.css'

// (js)fontSize设定
import './js/pageConfig'
import './js/requestAnimationFrame.js'

// (js)fullpage
import './js/fullPage'
// (js)初始化页面自定义函数自调用
import initPage from './js/initPage'
// (js)礼品滚动函数封装
import lantern from './js/lantern'
import carousel from './js/carousel'
// (js)各点击事件函数封装
import {
  changeFetchSelection,
  closePopup,
  nextPage,
  sign,
  openPopup,
  popupPromptBox,
  choiceNumber,
} from './js/module'

// (json)模拟服务端数据
import {
  achievementData,
  iconGifts,
  inKindGifts,
  myWealth,
  signData,
  winners,
  wareHouse
} from '../mock/exports'

import giftImg from './assets/exports'

//--------------------------------------------------------------------------//
//---------------------------------以上导入---------------------------------//
//--------------------------------------------------------------------------//

// 初始化页面所需数据
initPage(achievementData, iconGifts, inKindGifts, myWealth, signData, winners, giftImg)

// 礼品循环滚动事件
lantern(document.getElementsByClassName('giftList')[0], 3, 'giftShowTag1')

// 抓盒币、抓实物切换事件绑定
document.getElementsByClassName('boxIcon')[0].addEventListener('click', () => {
  changeFetchSelection(0)
})
document.getElementsByClassName('inKind')[0].addEventListener('click', () => {
  changeFetchSelection(1)
})

// 点击领取抓抓券按钮翻页事件
document.getElementsByClassName('freeStamps')[0].addEventListener('click', () => nextPage())

// 签到按钮事件绑定
document.getElementsByClassName('signSubmit')[0].addEventListener('click', () => sign(signData))

// 提示类弹窗关闭事件绑定
const popupCloseBtns = document.getElementsByClassName('popupCloseBtn')
for (let i = 0; i < popupCloseBtns.length; i++) {
  popupCloseBtns[i].addEventListener('click', () => {
    closePopup()
  })
}
popupCloseBtns[3].addEventListener('click', () => {
  closePopup('inputUserInfo')
})
popupCloseBtns[4].addEventListener('click', () => {
  closePopup('inputQQ')
})

// 输入类弹窗开启事件绑定
document.getElementsByClassName('tagRule')[0].addEventListener('click', () => openPopup('checkRules'))
document.getElementsByClassName('tagWareHouse')[0].addEventListener('click', () => openPopup('checkWarehouse', wareHouse))
const packageAll = document.getElementsByClassName('packageAll')
for (let i = 0; i < packageAll.length; i++) {
  packageAll[i].addEventListener('click', () => {
    openPopup('checkAward', achievementData.details[i].data)
  })
}

// 提示类弹窗开启事件绑定
const promptBtns = document.getElementsByClassName('promptBtn')
const promptBtnsAttrs = {
  objs: promptBtns,
  attr: [
    'confirmPayment',
    'confirmPaymentSure',
    'useCatchVoucher',
    'toJoin',
    'acceptHappy',
    'tryAgain',
    'topupIcon',
    'inputAddress'
  ]
}
for (let i = 0; i < promptBtnsAttrs.objs.length; i++) {
  promptBtnsAttrs.objs[i].addEventListener('click', () => {
    popupPromptBox(promptBtnsAttrs.attr[i], myWealth)
  })
}

// 选择投币数和go按钮点击事件绑定
document.getElementsByClassName('goBtn')[0].addEventListener('click', () => {
  choiceNumber('go')
})
const boxIconBtns = document.getElementsByClassName('boxIconBtn')
const boxIconBtnInKinds = document.getElementsByClassName('boxIconBtnInKind')
const boxIconBtnsAttrs = {
  objs: boxIconBtns,
  attr: [8, 18, 38]
}
const boxIconBtnInKindsAttrs = {
  objs: boxIconBtnInKinds,
  attr: [199, 1299]
}
for (let i = 0; i < boxIconBtnsAttrs.objs.length; i++) {
  boxIconBtnsAttrs.objs[i].addEventListener('click', () => {
    choiceNumber(boxIconBtnsAttrs.attr[i])
  })
}
for (let i = 0; i < boxIconBtnInKindsAttrs.objs.length; i++) {
  boxIconBtnInKindsAttrs.objs[i].addEventListener('click', () => {
    choiceNumber(boxIconBtnInKindsAttrs.attr[i])
  })
}

// 获奖滚动
const awardedMsg = document.getElementsByClassName('awardedMsg')[0]
carousel(awardedMsg, 2, 600)