const configData = {
    gameIcon: 8,
    giftLiclassName: 'giftShowTag1',
    showInKindPopup: false,
}

const setConfigData = (msg, data) => {
    configData[msg] = data
}

const getConfigData = (msg) => {
    return configData[msg]
}

export {
    setConfigData,
    getConfigData
}