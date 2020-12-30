/**
 * 创建抓盒币数据列表
 * @param {string} className 定义calssName
 * @param {object[]} data 遍历数据
 * @param {object} giftImg 图片列表
 */
const createGiftShowTag = (className, data, giftImg) => {
    const liNode = document.createElement('li')
    liNode.className = className
    const iNode = document.createElement('img')
    iNode.className = 'giftImg'
    iNode.src = giftImg[data.id]
    const spanNode = document.createElement('span')
    spanNode.innerText = data.name
    liNode.appendChild(spanNode)
    liNode.appendChild(iNode)
    liNode.chance = data.chance
    return liNode
}

/**
 * 创建抓实物数据列表
 * @param {string} className 定义className
 * @param {object[]} data 遍历数据
 * @param {object} giftImg 图片列表
 */
const createGiftShowInKindTag = (className, data, giftImg) => {
    const liNode = document.createElement('li')
    liNode.className = className
    const iNode = document.createElement('img')
    iNode.className = 'giftImg'
    iNode.src = giftImg[data.id]
    const spanNode = document.createElement('span')
    spanNode.classList.add('text')
    spanNode.innerText = data.name
    liNode.appendChild(spanNode)
    liNode.appendChild(iNode)
    liNode.chance = data.chance
    return liNode
}

/**
 * 创建获奖列表数据
 * @param {object[]} data 获奖列表
 */
const createAwardedMsgList = (data) => {
    const awardedMsg = document.getElementsByClassName('awardedMsg')[0]
    awardedMsg.innerHTML = ''
    data.forEach((item) => {
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
}

export {
    createGiftShowTag,
    createGiftShowInKindTag,
    createAwardedMsgList
}