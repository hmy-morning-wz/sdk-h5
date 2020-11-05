const env = process.env.NODE_ENV;
const isDev = env === 'development';

const defaultConf = {
	mock: true,
	cdnHost: '',
	payQueryMaxCount: 10,
	payQueryDuration: 3,
	fullMoney: 99900,
    timeout: 10000
};

const developmentConf = {
	mock: true
};

const productionConf = {
	mock: false
};

export default {
	...defaultConf, ...(isDev ? developmentConf : productionConf)
};
