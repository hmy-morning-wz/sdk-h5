
module.exports = {
	'GET /mock/h5/api/cardInfo': (req, res) => {
		res.status(200).json({
			code: 200,
			message: 'ok',
			data: {
				cardNo: '1234112666551258',
				status: 1,
				disabled: 0,
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
				rechargeAmt: 1,
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
				amount: 1,
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
		res.status(200).json({
		    cardName: '扬州市民卡',
		    cardLogoImgName: 'yangzhou_card.png',
		    protocol: [
		      {name: '服务协议', link: '/protocol/321000/protocol.htm'},
		      {name: '扬州电子公交卡APP先享后付服务协议', link: '/protocol/321000/credit_protocol.html'}
		    ],
			auditCycle: 5,
			cdnHost: "https://static.allcitygo.com/uat/wxsmk/v4.1.5/h5",
		    question: [],
		    functions: [{name: '乘车码', memo: '不充值也可以“先乘车，后付款”'},{name: '本地生活卡', memo: '享受本地生活服务和独家收益'}],
				cardBalanceDescription: '充值后，可使用电子钱包余额乘坐公交。',
				menus: [
					{"code": "balance", "name": "余额查询", "flag": [-1]},
					{"code": "recharge", "name": "卡片充值", "flag": [1]},
					{"code": "rechargeRecord", "name": "充值记录", "flag": [-1]},
					{"code": "travelRecord", "name": "乘车记录", "flag": [-1]},
					{"code": "openLines", "name": "开通线路", "flag": [-1]},
					{"code": "faq", "name": "使用帮助", "flag": [-1]},
					{"code": "unregister", "name": "退卡申请", "flag": [1, 2]}
				]
		});
	},
	// mock免登
	'POST /mock/myyz/auth': (req, res) => {
		res.status(200).json({
			code: 200,
    	msg: "SUCCESS",
			data: {
				"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbS55enNtay5taW5zaGVuZyIsImNpdHlJZCI6IjMyMTAwMCIsIm1vYmlsZSI6IjE1MTYxODk2Nzg1IiwidXNlcklkIjoiMzIxMDAwMTAwMDAwMDA4NSIsInRva2VuIjoiOGUzZTliZDAtZWM5OS0xMWU5LWIzMmUtOWRjYWVhYWNkY2IyIiwiY2xpZW50SWQiOiJBQUZWQ28xaVVTQUJBSEFzOEIyVzFyNWIiLCJzb3VyY2UiOiJhcHAiLCJ1c2VySW5mbyI6eyJnZW5kZXIiOiLnlLciLCJpZGNhcmRObyI6IjMyMTA4ODE5OTIwNzI0Mzk1OCIsInBlcnNvbk5hbWUiOiLpvprlr4XnlLMifSwidGltZXN0YW1wIjoiMjAxOTEwMTIxMDM5NDciLCJpYXQiOjE1NzA4NDc5ODcsImV4cCI6MTU3MTQ1Mjc4N30.In7pITgorlYjNWAX_MPcgilBhuzibDfG6IDFk4F2FVwoJR0FerFMi_F0S_fb4VRr73Fm1Ne61V77D4sFwuir3MDrAhTRRHOyiTV0UgSC2XBqSZ2H-iR6Rwp4kXgTXrWeqPc9XVrVzx88oKKdPvy9M0Q6OGWYiAkiPNUIMPtFiAY",
        "userId": "3210001000000085",
        "mobile": "15161896785"
			}
		});
	},
};
