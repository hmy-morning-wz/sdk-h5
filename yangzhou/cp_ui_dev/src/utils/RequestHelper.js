import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { STATUS_SUCCESS, STATUS_REDIRECT } from './request';

const NEED_LOGIN = 403;
const NO_CARD = '10023';

const autoErrorPage = (dispatch, dataHandler, backPage) => {
	return (resp) => {
		const { code, msg, ret_code } = resp || {code: 500, msg: '请求失败'};
		switch(code) {
			case STATUS_SUCCESS:
				dataHandler(resp);
				break;
			case NEED_LOGIN:
				if (global.tsmClient) {
					Toast.hide();
					global.tsmClient.goLogin();
				}
				break;
			default:
				if (ret_code && ret_code === NO_CARD) {
					Toast.hide();
					dispatch(routerRedux.replace('/register'));
				} else {
					Toast.hide();
					dispatch(routerRedux.replace({
						pathname: '/error',
						query: {code, message: msg, back: backPage}
					}));
				}				
		}
	};
};

const basicResponseHandler = (dataHandler) => {
	return (resp) => {
		switch(resp.code) {
			case STATUS_REDIRECT:
				global.location.href = resp.redirectUrl;
				break;
			default:
				dataHandler(resp);
				break;
		}
	};
};

export default {
	autoErrorPage, basicResponseHandler
};
