
module.exports = {
	'GET /mock/h5/api/cardInfo': (req, res) => {
		res.status(200).json({
			code: 200,
			message: 'ok',
			data: {
				cardNo: '1234112666551258',
				status: 2,
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
	'POST /mock/cs/api/active': (req, res) => {
		setTimeout(() => {
			res.status(200).json({
				code: 200,
				message: '身份证不对'
			});
		}, 1000);
	},
	'POST /mock/h5/api/recede': (req, res) => {
		res.status(200).json({
			code: 200,
			message: '身份证不对'
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
				cardNo: '123',
				vehicleType: 'metro'
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
	'GET /mock/h5/api/station': (req, res) => {
		res.status(200).json({
			"code": 200,
			"msg": "SUCCESS",
			"data": [
					{
						"line_no": "1",
						"line_name": "1号线",
						"stations": [
							{
								"station_no": "0101",
								"station_name": "堰桥"
							},
							{
								"station_no": "0102",
								"station_name": "锡北运河"
							},
							{
								"station_no": "0103",
								"station_name": "西漳"
							},
							{
								"station_no": "0104",
								"station_name": "天一"
							},
							{
								"station_no": "0105",
								"station_name": "刘潭"
							},
							{
								"station_no": "0106",
								"station_name": "庄前"
							},
							{
								"station_no": "0107",
								"station_name": "民丰"
							},
							{
								"station_no": "0108",
								"station_name": "无锡火车站"
							},
							{
								"station_no": "0109",
								"station_name": "胜利门"
							},
							{
								"station_no": "0110",
								"station_name": "三阳广场"
							},
							{
								"station_no": "0111",
								"station_name": "南禅寺"
							},
							{
								"station_no": "0112",
								"station_name": "谈渡桥"
							},
							{
								"station_no": "0113",
								"station_name": "太湖广场"
							},
							{
								"station_no": "0114",
								"station_name": "清名桥"
							},
							{
								"station_no": "0115",
								"station_name": "人民医院"
							},
							{
								"station_no": "0116",
								"station_name": "华清大桥"
							},
							{
								"station_no": "0117",
								"station_name": "扬名"
							},
							{
								"station_no": "0118",
								"station_name": "南湖家园"
							},
							{
								"station_no": "0119",
								"station_name": "塘铁桥"
							},
							{
								"station_no": "0120",
								"station_name": "金匮公园"
							},
							{
								"station_no": "0121",
								"station_name": "市民中心"
							},
							{
								"station_no": "0122",
								"station_name": "文化宫"
							},
							{
								"station_no": "0123",
								"station_name": "江南大学"
							},
							{
								"station_no": "0124",
								"station_name": "长广溪"
							}
						]
					},
					{
						"line_no": "2",
						"line_name": "2号线",
						"stations": [
							{
								"station_no": "0201",
								"station_name": "梅园开原寺"
							},
							{
								"station_no": "0202",
								"station_name": "荣巷"
							},
							{
								"station_no": "0203",
								"station_name": "小桃源"
							},
							{
								"station_no": "0204",
								"station_name": "河埒口"
							},
							{
								"station_no": "0205",
								"station_name": "大王基"
							},
							{
								"station_no": "0206",
								"station_name": "梁溪大桥"
							},
							{
								"station_no": "0207",
								"station_name": "五爱广场"
							},
							{
								"station_no": "0209",
								"station_name": "东林广场"
							},
							{
								"station_no": "0210",
								"station_name": "上马墩"
							},
							{
								"station_no": "0211",
								"station_name": "靖海"
							},
							{
								"station_no": "0212",
								"station_name": "广益"
							},
							{
								"station_no": "0213",
								"station_name": "柏庄"
							},
							{
								"station_no": "0214",
								"station_name": "东亭"
							},
							{
								"station_no": "0215",
								"station_name": "庄桥"
							},
							{
								"station_no": "0216",
								"station_name": "云林"
							},
							{
								"station_no": "0217",
								"station_name": "九里河公园"
							},
							{
								"station_no": "0218",
								"station_name": "查桥"
							},
							{
								"station_no": "0219",
								"station_name": "映月湖公园"
							},
							{
								"station_no": "0220",
								"station_name": "迎宾广场"
							},
							{
								"station_no": "0221",
								"station_name": "无锡东站"
							},
							{
								"station_no": "0222",
								"station_name": "安镇"
							}
						]
					}
				]
		});
	},
	'GET /mock/h5/api/trip': (req, res) => {
		res.status(200).json({
			"code": 200,
			"msg": "SUCCESS",
			"data": 
				{
					"claimMode": "2",
					"qrcodeSource": "1",
					"outLineName": "2号线",
					"outStationName": "太湖广场",
					"tripNo": "4784745353835",
					"fellowNo": "string",
					"inLineNo": "1",
					"inLineName": "1号线",
					"inStationNo": "0101",
					"inStationName": "堰桥",
					"inTime": "2018-11-23 16:20",
					"outTime": "2018-11-23 17:20",
					"userId": "486325237624265"
				}
		});
	},
	'POST /mock/h5/api/claim': (req, res) => {
		res.status(200).json({
			"code": 200,
			"msg": "SUCCESS",
			"data": 
				{
					"claimNo": "478474535383345",
				}
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
				functions: [{name: '电子钱包', memo: '先充值后使用，车费从电子钱包账户中扣取'}],
				cardBalanceDescription: '充值后，可使用电子钱包余额乘坐公交。',
				cdnHost: '',
				traveListIcon: '/images/320200/chengchejilu11@3x.png',
				payListIcon: '/images/320200/chongzhi@3x.png',
				menus: [
					{"code": "balance", "name": "余额查询", "flag": [-1], "icon": "/images/320200/chaxunyue@3x.png"},
					{"code": "recharge", "name": "卡片充值", "flag": [1, 6],"icon": "/images/320200/chongzhi@3x.png"},
					{"code": "rechargeRecord", "name": "充值记录", "flag": [-1], "icon": "/images/320200/chongzhijilu@3x.png"},
					{"code": "travelRecord", "name": "乘车记录", "flag": [-1], "icon": "/images/320200/chengchejilu@3x.png"},
					{"code": "faq", "name": "使用须知", "flag": [-1], "icon": "/images/320200/bangzhu@3x.png"},
					{"code": "unregister", "name": "退卡申请", "flag": [1, 2, 6], "icon": "/images/320200/tuika@3x.png"}
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
				
			}
		};
		res.status(200).json(configs[cityId]);
	},
};
