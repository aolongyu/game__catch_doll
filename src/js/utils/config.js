const configData = {
    fontSize: 100,
    deviceWidth: 750,
    gameIcon: 8,
    giftLiclassName: 'giftShowTag1',
    showInKindPopup: false,
    getBox: false,
    caughtBox: null,
    going: false
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