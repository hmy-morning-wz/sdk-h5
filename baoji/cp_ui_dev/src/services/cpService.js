import { Get, Post, STATUS_SUCCESS, timestamp, HmacSign } from '../utils/request';

class CPService {
	constructor() {
		this.config = {noAutoJson: false, header: {}};
	}

	init(cityId, appid) {		
		this.cityId = cityId;
		this.appid = appid;
	}

	parseUA() {
		const regx = new RegExp(/(\([^\(\)]*\))/);
		const group = regx.exec(navigator.userAgent);
		let info = group[0];
		info = info.substr(1, info.length);
		const pi = info.split(';');	
		return {
			pm: pi[2].split('Build/')[0],
			os: pi[1]
		};
	}

	// 查询卡信息
	async getCard() {
		// const ua = this.parseUA();
		return Get('/h5/api/cardInfo', {cityId: this.cityId}, this.config);
	}

	// 领卡
	async applyCard(userName, userCredId) {
		return Post('/h5/api/applyCard', { userName, userCredId, cityId: this.cityId }, this.config);
	}

	// 乘车记录
	async loadTravelRecord(page, pageSize, month) {
		return Get('/h5/api/traveRecords', {page, pageSize, month, cityId: this.cityId}, this.config);
	}

	// 充值记录
	async loadPayRecord(page, pageSize, month) {
		return Get('/h5/api/chargeRecords', {page, pageSize, month, cityId: this.cityId}, this.config);
	}

	// 查询开通线路
	async loadOpenLines() {
		return Get('/h5/api/openLines', {cityId: this.cityId}, this.config);
	}

	// 查询帮助问题
	async loadFrequentQuestions() {

	}

	// 充值配置
	async confCharge() {
		return Get('/h5/api/confCharge', { cityId: this.cityId }, this.config);
	}

	// 充值
	async chargeCard(orderAmt) {
		return Post('/h5/api/chargeCard', { orderAmt, cityId: this.cityId }, this.config);
	}

	// 充值结果确认
	async queryPay(orderId, Rid) {
		return Get('/h5/api/payResult', { orderId, Rid, cityId: this.cityId }, this.config);
	}

	// 退卡
	async revokeCard(type) {
		return Post('/h5/api/recede', { type }, this.config);
	}

	// 发验证码
	async sendCode(mobile) {
		mobile = mobile.replace(/\s+/g, '');
		const data = {
			service: 'qr.ebus.service.get.sm.code',
			version: '1.0.0',
			timestamp: timestamp(),
			buzParam: JSON.stringify({mobile, cityId: this.cityId, appId: this.appid})
		};
		let sign = Object.keys(data).sort().map(key => key + '=' + data[key]).join('&');
		sign = HmacSign(sign, data.service);
		data.sign = sign;
		let response = await Post('/cs/api/getSc', data, this.config);
		if (response.code === STATUS_SUCCESS) {
			let mSign = Object.keys(response).sort().filter(key => key !== 'sign').map(key => key + '=' + response[key]).join('&');
			mSign = HmacSign(mSign, data.service);
			if (response.sign !== mSign) {
				response.code = 500;
			}
		}
		return response;
	}

	// 登录
	async login(mobile, clientId, code, exists) {
		mobile = mobile.replace(/\s+/g, '');
		const data = {
			service: 'qr.ebus.service.active.user',
			version: '1.0.0',
			timestamp: timestamp(),
			buzParam: ''
		};
		const buz = {
			exists, mobile, cityId: this.cityId, smsCode: code, clientId, source: 'app', systemInfo: 'zct_app', appId: this.appid
		};
		if (exists === '1') {
			buz.loginType = 2;
		}
		data.buzParam = JSON.stringify(buz);
		let sign = Object.keys(data).sort().map(key => key + '=' + data[key]).join('&');
		sign = HmacSign(sign, data.service);
		data.sign = sign;
		let response = await Post('/cs/api/active', data, this.config);
		if (response.code === STATUS_SUCCESS) {
			let mSign = Object.keys(response).sort().filter(key => key !== 'sign').map(key => key + '=' + response[key]).join('&');
			mSign = HmacSign(mSign, data.service);
			if (response.sign !== mSign) {
				response.code = 500;
			}
		}
		return response;
	}

	// 获取众城通用户信息
	async ouath(sid, auth_code) {
		return Get('/h5/api/login', { sid, auth_code, cityId: this.cityId, appid: this.appid }, this.config);
	}
}

export default new CPService();
