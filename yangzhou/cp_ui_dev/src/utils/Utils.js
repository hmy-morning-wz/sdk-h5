const DECIMAL_PRECISE = 1e-7;

const formatRMBYuan = (fen) => {
	const yuan = fen / 100;
	const decimal = Math.abs(yuan - Math.floor(yuan));
	const equal = decimal < DECIMAL_PRECISE;

	if (equal) {
		return yuan.toFixed(2);
	} else {
		return yuan.toFixed(2);
	}
};

export default {
	formatRMBYuan
};
