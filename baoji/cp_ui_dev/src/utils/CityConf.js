
const City = {
    '320200': {'name': '太湖交通卡', 'logo': 'wuxi_card.png', 'protocol': '', 'auditCycle': 5},
    '321000': {'name': '扬州市民卡', 'logo': 'yangzhou_card.png', 'protocol': '', 'auditCycle': 7},
    '610300': {'name': '宝鸡市民卡', 'logo': 'kamian.png', 'protocol': '', 'auditCycle': 7}
};

const globalCity = global.csConf;

const getCityTitle = (cityId) => {
    return globalCity.cardName || City[cityId]['name'];
}

const getCityLogo = (cityId) => {
    return globalCity.cardLogoImgName || City[cityId]['logo'];
}

const getCityProtocol = (cityId) => {
    return globalCity.protocol || `protocol/${cityId}/protocol.htm`;
}

const getAuditCycle = (cityId) => {
	return globalCity.auditCycle || City[cityId]['auditCycle'];
}

export default {
    getCityTitle, getCityLogo, getCityProtocol, getAuditCycle, City,
};
