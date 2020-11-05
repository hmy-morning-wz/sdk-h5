
module.exports = {
	'GET /mock/h5/api/cardInfo': (req, res) => {
		res.status(200).json({
			code: 200,
			message: 'ok',
			data: {
				cardNo: '1234112666551258',
				status: 1,
				source: 'app',
				name: '郝勇',
				identityId: '341221198703065432',
				acctList: [
					{ acctStatus: '1',
					accStatusName: '激活状态',
					subType: '1',
					subTypeName: '现金',
					balance: '99000',
					validDate: '',
					expireDate: '',
					autoChargeStatus: 0 },
				  { acctStatus: 1,
					accStatusName: '激活状态',
					subType: '10',
					subTypeName: '先享后付',
					balance: '0',
					validDate: '',
					expireDate: '',
					autoChargeStatus: 0 }
				]
			}
		});
	},
	'POST /mock/h5/api/applyCard': (req, res) => {
		res.status(200).json({
			code: 200,
			message: '身份证不对'
		});
	},
	'POST /mock/h5/api/recede': (req, res) => {
		res.status(200).json({
			code: 200,			
			message: '身份证不对',
			data: {
				// ret_code: 10035,
				ret_code: '0'
			}
		});
	},
	'GET /mock/h5/api/confCharge': (req, res) => {
		res.status(200).json({
			code: 200,
			message: '身份证不对',
			data: {
				amount: [500, 1000, 1500, 2500, 10000],
				fullMoney: 100000
			}
		});
	},
	'GET /mock/h5/api/payResult': (req, res) => {
		res.status(200).json({
			code: 200,
			message: '身份证不对',
			data: {
				result: 1,
				cardNo: '1234567890'
			}
		});
	},
	'GET /mock/h5/api/chargeRecords': (req, res) => {
		res.status(200).json({
			code: 200,
			message: '身份证不对',
			data: [{
				orderNum: '20171030165647429f02c0bd5011e78f',
				cardNo: '5060805800024602',
				subType: 1,
				rechargeAmt: 1,
				createTime: '2017-10-30 16:56:47',
				status: 0,
				payOrderNo: '32020020171030165647011510000130',
				payUrl: 'http://61.164.53.186/?orderUuid=8bf283f9809b056a56f9188a6a5dbbc2',
				payTime: null
			},
			{
				orderNum: '20171030165647429f02c0bd5011e78f',
				cardNo: '5060805800024602',
				subType: 1,
				rechargeAmt: 1,
				createTime: '2017-10-30 16:56:47',
				status: 1,
				payOrderNo: '32020020171030165647011510000130',
				payUrl: 'http://61.164.53.186/?orderUuid=8bf283f9809b056a56f9188a6a5dbbc2',
				payTime: null
			},
			{
				orderNum: '20171030165647429f02c0bd5011e78f',
				cardNo: '5060805800024602',
				subType: 1,
				rechargeAmt: 1,
				createTime: '2017-10-30 16:56:47',
				status: 2,
				payOrderNo: '32020020171030165647011510000130',
				payUrl: 'http://61.164.53.186/?orderUuid=8bf283f9809b056a56f9188a6a5dbbc2',
				payTime: null
			},
			{
				orderNum: '20171030165647429f02c0bd5011e78f',
				cardNo: '5060805800024602',
				subType: 1,
				rechargeAmt: 10,
				createTime: '2017-10-30 16:56:47',
				status: 3,
				payOrderNo: '32020020171030165647011510000130',
				payUrl: 'http://61.164.53.186/?orderUuid=8bf283f9809b056a56f9188a6a5dbbc2',
				payTime: null
			},
			{
				orderNum: '20171030165647429f02c0bd5011e78f',
				cardNo: '5060805800024602',
				subType: 1,
				rechargeAmt: 10000,
				createTime: '2017-10-30 16:56:47',
				status: 0,
				payOrderNo: '32020020171030165647011510000130',
				payTime: null
			},
			{
				orderNum: '20171030165647429f02c0bd5011e78f',
				cardNo: '5060805800024602',
				subType: 1,
				rechargeAmt: 1,
				createTime: '2017-10-30 16:56:47',
				status: 0,
				payOrderNo: '32020020171030165647011510000130',
				payUrl: 'http://61.164.53.186/?orderUuid=8bf283f9809b056a56f9188a6a5dbbc2',
				payTime: null
			},
			{
				orderNum: '20171030165647429f02c0bd5011e78f',
				cardNo: '5060805800024602',
				subType: 1,
				rechargeAmt: 1,
				createTime: '2017-10-30 16:56:47',
				status: 0,
				payOrderNo: '32020020171030165647011510000130',
				payUrl: 'http://61.164.53.186/?orderUuid=8bf283f9809b056a56f9188a6a5dbbc2',
				payTime: null
			},
			{
				orderNum: '20171030165647429f02c0bd5011e78f',
				cardNo: '5060805800024602',
				subType: 1,
				rechargeAmt: 1,
				createTime: '2017-10-30 16:56:47',
				status: 0,
				payOrderNo: '32020020171030165647011510000130',
				payUrl: 'http://61.164.53.186/?orderUuid=8bf283f9809b056a56f9188a6a5dbbc2',
				payTime: null
			},
			{
				orderNum: '20171030165647429f02c0bd5011e78f',
				cardNo: '5060805800024602',
				subType: 1,
				rechargeAmt: 1,
				createTime: '2017-10-30 16:56:47',
				status: 0,
				payOrderNo: '32020020171030165647011510000130',
				payUrl: 'http://61.164.53.186/?orderUuid=8bf283f9809b056a56f9188a6a5dbbc2',
				payTime: null
			}]
		});
	},

	'GET /mock/h5/api/openLines': (req, res) => {
		res.status(200).json({
			code: 200,
			message: '查询成功',
			data: [
				{lineNo: '118', lineFrom: 'A', lineTo: 'B'},
				{lineNo: '11', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '112', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '113', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '114', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '115', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '116', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '117', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '119', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '121', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '131', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '141', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '15', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '151', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '161', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '171', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '181', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '191', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '101', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '211', lineFrom: 'A11', lineTo: 'B11'},
				{lineNo: '311', lineFrom: 'A11', lineTo: 'B11'}
			]
		});
	},

	'GET /mock/h5/api/traveRecords': (req, res) => {
		res.status(200).json({
			code: 200,
			message: '身份证不对',
			data: [{
				amount: 200,
				bizTime: '2017-10-30 16:56:47',
				status: 0,
				ordType: '1',
				chargeType: 3,
				chargeName: '信用付',
				payOrderNo: '32020020171030165647011510000130',
				lineName: '118',
				cardNo: '123'
			},
			{
				amount: 1,
				bizTime: '2018-02-10 16:56:47',
				status: 0,
				ordType: '0',
				chargeType: 1,
				chargeName: '电子钱包',
				payOrderNo: '32020020171030165647011510000130',
				lineName: '119',
				cardNo: '123'
			}]
		});
	},
	'GET /mock/h5/api/config': (req, res) => {
		const cityId = req.query.cityId;
		const configs = {
			'320200': {
				cardName: '太湖交通卡',
				cardLogoImgName: 'wuxi_card.png',
				protocol: [
				  {name: '服务协议', link: '/protocol/320200/protocol.htm'},
				  {name: '太湖交通卡APP先享后付服务协议', link: '/protocol/320200/credit_protocol.htm'}
				],
				auditCycle: 5,
				amounts: [1, 1000, 1500, 2500],
				quota: 99900,
				disableRecharge: true,
				question: [],
				functions: [{name: '电子钱包', memo: '先充值后使用，车费从电子钱包账户中扣取'}],
				cardBalanceDescription: '充值后，可使用电子钱包余额乘坐公交。',
				cdnHost: '',
				traveListIcon: '/images/320200/chengchejilu11@3x.png',
				payListIcon: '/images/320200/chongzhi@3x.png',
				menus: [
					{"code": "balance", "name": "余额查询", "flag": [-1], "icon": "/images/320200/chaxunyue@3x.png"},
					{"code": "recharge", "name": "卡片充值", "flag": [1],"icon": "/images/320200/chongzhi@3x.png"},
					{"code": "rechargeRecord", "name": "充值记录", "flag": [-1], "icon": "/images/320200/chongzhijilu@3x.png"},
					{"code": "travelRecord", "name": "乘车记录", "flag": [-1], "icon": "/images/320200/chengchejilu@3x.png"},
					{"code": "openLines", "name": "开通线路", "flag": [-1], "icon": "/images/320200/xianlu@3x.png"},
					{"code": "faq", "name": "使用帮助", "flag": [-1], "icon": "/images/320200/bangzhu@3x.png"},
					{"code": "unregister", "name": "退卡申请", "flag": [1, 2], "icon": "/images/320200/tuika@3x.png"}
				]
			},
			'321000': {
				cardName: '扬州市民卡',
				cardLogoImgName: 'yangzhou_card.png',
				protocol: [
				  {name: '服务协议', link: '/protocol/321000/protocol.htm'},
				  {name: '扬州市民卡APP先享后付服务协议', link: '/protocol/321000/credit_protocol.htm'}
				],
				auditCycle: 5,
				question: [],
				functions: [{name: '电子钱包', memo: '先充值后使用，车费从电子钱包账户中扣取'}],
				cardBalanceDescription: '充值后，可使用电子钱包余额乘坐公交。',
				cdnHost: '',
				traveListIcon: '',
				payListIcon: '',
				menus: [
					{"code": "balance", "name": "余额查询", "flag": [-1]},
					{"code": "recharge", "name": "卡片充值", "flag": [1]},
					{"code": "rechargeRecord", "name": "充值记录", "flag": [-1]},
					{"code": "travelRecord", "name": "乘车记录", "flag": [-1]},
					{"code": "openLines", "name": "开通线路", "flag": [-1]},
					{"code": "faq", "name": "使用帮助", "flag": [-1]},
					{"code": "unregister", "name": "退卡申请", "flag": [1, 2]}
				]
			},
			'331000': {
				
				cardName: '台州公共交通卡',
				cardLogoImgName: '331000/card.jpg',
				protocol: [
					{name: '服务协议', link: '/protocol/331000/protocol.htm'},
					{name: '台州公共交通卡APP先享后付服务协议', link: '/protocol/331000/credit_protocol.htm'}
				],
				amounts: [1, 1000, 1500, 2500],
				quota: 99900,
				disableRecharge: true,
				auditCycle: 5,
				question: [],
				functions: [{name: '电子钱包', memo: '先充值后使用，车费从电子钱包账户中扣取'}],
				cardBalanceDescription: '充值后，可使用电子钱包余额乘坐公交。',
				cdnHost: '',
				traveListIcon: '/images/320200/chengchejilu11@3x.png',
				payListIcon: '/images/320200/chongzhi@3x.png',
				menus: [
					{"code": "balance", "name": "余额查询", "flag": [-1], "icon": "/images/320200/chaxunyue@3x.png"},
					{"code": "recharge", "name": "卡片充值", "flag": [1],"icon": "/images/320200/chongzhi@3x.png"},
					{"code": "rechargeRecord", "name": "充值记录", "flag": [-1], "icon": "/images/320200/chongzhijilu@3x.png"},
					{"code": "travelRecord", "name": "乘车记录", "flag": [-1], "icon": "/images/320200/chengchejilu@3x.png"},
					{"code": "openLines", "name": "开通线路", "flag": [-1], "icon": "/images/320200/xianlu@3x.png"},
					{"code": "faq", "name": "使用帮助", "flag": [-1], "icon": "/images/320200/bangzhu@3x.png"},
					{"code": "unregister", "name": "退卡申请", "flag": [1, 2], "icon": "/images/320200/tuika@3x.png"}
				]
				
			},
			'610300': {
				
				cardName: '宝鸡公共交通卡',
				cardLogoImgName: '331000/card.jpg',
				protocol: [
					{name: '服务协议', link: '/protocol/610300/protocol.htm'},
					{name: '宝鸡公共交通卡APP先享后付服务协议', link: '/protocol/610300/credit_protocol.htm'}
				],
				amounts: [1, 1000, 1500, 2500],
				quota: 99900,
				disableRecharge: false,
				auditCycle: 5,
				question: [
					{
						"question": "如何使用APP坐公交",
						"answer": "打开众城通APP选择“乘车码”应用，展示乘车码，在公交车的，二维码机具上刷码：机具“叮咚”（或其他声音）提示交易成功，机具屏幕也会有相应的提示。请注意：由于真正从您的账户扣款是刷码成功以后，乘车码刷码以后，无需等候“支付成功”页面的出现。"
					},
					{
						"question": "如何使用APP坐公交",
						"answer": "打开众城通APP选择“乘车码”应用，展示乘车码，在公交车的，二维码机具上刷码：机具“叮咚”（或其他声音）提示交易成功，机具屏幕也会有相应的提示。请注意：由于真正从您的账户扣款是刷码成功以后，乘车码刷码以后，无需等候“支付成功”页面的出现。"
					},
					{
						"question": "如何使用APP坐公交",
						"answer": "打开众城通APP选择“乘车码”应用，展示乘车码，在公交车的，二维码机具上刷码：机具“叮咚”（或其他声音）提示交易成功，机具屏幕也会有相应的提示。请注意：由于真正从您的账户扣款是刷码成功以后，乘车码刷码以后，无需等候“支付成功”页面的出现。"
					}
				],
				functions: [{name: '乘车码', memo: '充值后，可使用卡片余额扫码乘车'}],
				cardBalanceDescription: '充值后，可使用电子钱包余额乘坐公交。',
				cdnHost: '',
				traveListIcon: '/images/610300/busrecord.png',
				payListIcon: '/images/610300/chongzhirecord.png',
				menus: [
					{
						"icon": "/images/610300/chengchema@3x.png",
						"name": "乘车码",
						"code": "usingQr",
						"flag": [-1]
					},
					{
						"icon": "/images/610300/chengchejilu@3x.png",
						"name": "乘车记录",
						"code": "travelRecord",
						"flag": [-1]
					},
					{
						"icon": "/images/610300/kapianyuehui 1@3x.png",
						"name": "卡片余额",
						"code": "balance",
						"flag": [-1]
					},
					{
						"icon": "/images/610300/kapian@3x.png",
						"name": "卡片充值",
						"code": "recharge",
						"flag": [-1]
					},
					{
						"icon": "/images/610300/shiyongfanwei@3x.png",
						"name": "使用范围",
						"code": "openLines",
						"flag": [-1]
					},
					{
						"icon": "/images/610300/shiyongbangzhu@3x.png",
						"name": "使用帮助",
						"code": "faq",
						"flag": [-1]
					},
					{
						"icon": "/images/610300/fuwuxieyi@3x.png",
						"name": "服务协议",
						"code": "agreement",
						"flag": [-1]
					},
					{
						"icon": "/images/610300/tuikashenqing@3x.png",
						"name": "退卡申请",
						"code": "unregister",
						"flag": [-1]
					}
				]
				
			}
		};
		res.status(200).json(configs[cityId]);
	},
};
