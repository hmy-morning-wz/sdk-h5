// 待激活
const TOBEACTIVED = 0;

// 正常，已激活
const ACTIVE = 1;

// 退卡中
const UNREGISTING = 2;

// 已退卡
const UNREGISTED = 3;

// 异常冻结
const FREEZED = 4;

// 退款中
const REFUNDING = 5;

// 退卡失败(现6仅表示退卡欠费)
const FAILED_REVOKE = 6;

// 账户余额负数
const OVERDRAFT = 10035;

const hasCard = (status) => {
	return status === TOBEACTIVED
		|| status === ACTIVE
		|| status === UNREGISTING
		|| status === FREEZED
		|| status === REFUNDING
		|| status === FAILED_REVOKE;
};

export default {
	ACTIVE,
	UNREGISTING,
	UNREGISTED,
	FREEZED,
	OVERDRAFT,
	REFUNDING,
	FAILED_REVOKE,
	hasCard
};
