import { Get, Post, STATUS_SUCCESS, timestamp, HmacSign } from '../utils/request';

class CPService {
	constructor() {
		this.config = {noAutoJson: false, header: {}};
	}

	init(cityId, appid) {		
		this.cityId = cityId;
		this.appid = appid;
	}

	deviceIs(name) {
		const u = navigator.userAgent;
		if ('Android' === name) {
			return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
		}
		if ('iOS' === name) {
			return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		}
		return false;
	}

	parseUA() {
		const regx = new RegExp(/(\([^\(\)]*\))/);
		const group = regx.exec(navigator.userAgent);
		let info = group[0];
		info = info.substr(1, info.length -1);
		const pi = info.split(';');	
		if (this.deviceIs('iOS')) {
			return {
				app: 'sdk',
				pm: pi[0],
				os: pi[1]
			};
		}
		if (this.deviceIs('Android')) {
			return {
				app: 'sdk',
				pm: pi[2].split('Build/')[0],
				os: pi[1]
			};
		}
		return {
			app: 'sdk', pm: '', os: ''
		};		
	}

	// 查询卡信息
	async getCard() {
		const ua = this.parseUA();
		return Get('/h5/api/cardInfo', {cityId: this.cityId, ...ua}, this.config);
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
	async chargeCard(orderAmt,voucherNo) {
		return Post('/h5/api/chargeCard', { orderAmt, voucherNo, cityId: this.cityId }, this.config);
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
		const ua = this.parseUA();
		const buz = {
			exists, mobile, cityId: this.cityId, smsCode: code, clientId, source: 'app', systemInfo: JSON.stringify(ua), appId: this.appid
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

	// 免登
	async freeLogin(id, clientId) {
		return Post('/myyz/auth', { id, clientId, appId: this.appid }, this.config);
	}
}

export default new CPService();
