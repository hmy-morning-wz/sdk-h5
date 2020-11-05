import update from 'immutability-helper';
import { routerRedux } from 'dva/router';

export default  {

	namespace: 'card',

	state: {
		hasCard: false,
		rechargeDetail: null,
		travelDetail: null,
		myCard: null,
		identityInfo: null
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen( location => {				
				if (location.pathname === '/') {
					dispatch(routerRedux.replace(`/login`));									
				}
				var browser = {
					versions: (function() {
						var u = navigator.userAgent,
							app = navigator.appVersion;
						return {
							//移动终端浏览器版本信息
							trident: u.indexOf('Trident') > -1, // IE内核
							presto: u.indexOf('Presto') > -1, //opera内核
							webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
							gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
							mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
							ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
							android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
							iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
							iPad: u.indexOf('iPad') > -1, //是否iPad
							webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
						};
					})(),
					language: (navigator.browserLanguage || navigator.language).toLowerCase()
				}
				if (!browser.versions.mobile && location.pathname!=='/wrongAgent') {
					// 判断是否是移动设备打开
					console.log(location.pathname)
					dispatch(routerRedux.replace('/wrongAgent'));
				}
			} );
		}
	},

	effects: {
		* applyCard({ payload }, { put }) {
			yield put({ type: 'hasCard', payload: { hasCard: true } });
			yield put(routerRedux.replace(payload.page));
		},
		* showRechargeDetail({ payload }, { put }) {  // eslint-disable-line
      		yield put({ type: 'setRechargeDetail', payload: payload.data });
      		yield put(routerRedux.push(payload.page));
    	},
    	* showTravelDetail({ payload }, { put }) {  // eslint-disable-line
      		yield put({ type: 'setTravelDetail', payload: payload.data });
      		yield put(routerRedux.push(payload.page));
    	},
    	* showMyCard({ payload }, { put }) {
    		yield put({ type: 'setMyCard', payload: payload.data });
      		yield put(routerRedux.replace(payload.page));
    	},
    	* showHelp({ payload }, { put }) {
    		yield put(routerRedux.push('/help'));
    	},
    	* showIdentityInfo({ payload }, { put }) {
    		yield put({ type: 'setIdentityInfo', payload: payload.data });
    		yield put(routerRedux.replace(payload.page));
    	}
	},

	reducers: {
		hasCard(state, { payload }) {
			return update(state, { hasCard: { $set: payload.hasCard } });
		},
		setRechargeDetail(state, action) {
      		return update(state, { rechargeDetail: { $set: action.payload } });
    	},
    	setTravelDetail(state, action) {
      		return update(state, { travelDetail: { $set: action.payload } });
    	},
    	setMyCard(state, action) {
      		return update(state, { myCard: { $set: action.payload } });
    	},
    	setIdentityInfo(state, action) {
      		return update(state, { identityInfo: { $set: action.payload } });
    	},
	}
};
