import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Button, List, Modal, WingBlank, WhiteSpace } from 'antd-mobile';
import { Loading, Navigator } from '../../components';
import styles from './styles.less';
import { autoErrorPage } from '../../utils/RequestHelper';
import CardStatus from '../../utils/CardStatus';
import CpService from '../../services/cpService';
import config from '../../utils/config';
import { getCityTitle, getCityLogo } from '../../utils/CityConf';
import cpService from '../../services/cpService';

const alert = Modal.alert;

class MainPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			card: null,
			hasQr: false,
			hasRevoked: false,
			hasTrip: false
		};
	}

	componentDidMount() {
		this.getCurrentTrip()
		CpService.getCard().then(autoErrorPage(this.props.dispatch, (data) => {
			this.setState({
				loading: false,
				card: data.data
			});
		}));
	}

	getCurrentTrip() {
		CpService.getCurrentTrip().then(autoErrorPage(this.props.dispatch, (resp) => {
			sessionStorage.setItem('currentTrip', JSON.stringify(resp.data))

			if(resp.data && resp.data.tripNo){
				this.setState({
					hasTrip: true
				})
				global.csConf.hasTrip = true
			} else {
				this.setState({
					hasTrip: false
				})
				global.csConf.hasTrip = false
			}
			
		}))
	}

	onClickMenu(menu) {
		const dispatch = this.props.dispatch;

		const MenuHandler = {
			balance: () => dispatch(routerRedux.push('/balance')),
			recharge: () => dispatch(routerRedux.push('/recharge')),
			rechargeRecord: () => dispatch(routerRedux.push('/payRecord')),
			travelRecord: () => dispatch(routerRedux.push('/travelRecord')),
			openLines: () => dispatch(routerRedux.push('/line')),
			faq: () => dispatch(routerRedux.push('/help')),
			unregister: () => {
				if (this.isCardActive()) {
					this.doUnregister();
				} else {
					dispatch(routerRedux.push('/revokeCard'));
				}
			},
		};

		const func = MenuHandler[menu.code];

		if (func) {
			func();
		} else {
			global.alert('功能建设中');
		}
	}

	doUnregister() {
		if (this.state.hasRevoked) {
			return;
		}
		this.setState({
			hasRevoked: true,
		});
		const dispatch = this.props.dispatch;
		const cardStatus = (this.state.card && this.state.card.status) || -1;

		const revokeIns = alert('退卡', '确定退卡？', [
      		{ text: '取消', onPress: () => {
      			revokeIns.close();
      			this.setState({
					hasRevoked: false,
				});
      		}, style: 'default' },
      		{ text: '确定', onPress: () => {
      			CpService.revokeCard(1).then(autoErrorPage(dispatch, ({ data }) => {
					if (data.ret_code === '0') {
						dispatch(routerRedux.push('/revokeCard'));
						const confirmAlert = Modal.alert('退卡成功', data, [
						{
							text: '确定',
							onPress: () => {
								this.setState({
									hasRevoked: false,
								});
								confirmAlert.close();
								// dispatch(routerRedux.push('/revokeCard'));
							},
							style: { fontWeight: 'bold' },
						}]);
					} else {
						if (data.ret_code === CardStatus.OVERDRAFT) {
							const warnAlert = Modal.alert('', '您的账户余额为负，暂时无法退卡', [
							{
								text: '我知道了',
								onPress: () => {
									this.setState({
										hasRevoked: false,
									});
									warnAlert.close();
								},
								style: { fontWeight: 'bold' },
							}
							]);
						} else {
							dispatch(routerRedux.push({
								pathname: '/error',
								query: {code: 500, message: data.ret_msg}
							}));
						}
					}
				}));
      		}, style: 'default'},
    	], 'ios');
	}

	isCardActive() {
		const card = this.state.card;
		return card && CardStatus.ACTIVE === card.status;
	}

	render() {
		const img = 'https://cdnweb04.96225.com/images/card.png';

		const cardId = (this.state.card && this.state.card.cardNo) || '-';
		const cardStatus = (this.state.card && this.state.card.status) || -1;
		const active = CardStatus.ACTIVE === cardStatus;

		const buildMenu = (menu, idx) => {
			console.log('--->',menu);
			const enabled = menu.flag.some( e => e === -1 || e === cardStatus);
			const config = {
				disabled: !enabled,
				key: idx,
				arrow: 'horizontal',
				onClick: () => {
					if (enabled) {
						this.onClickMenu(menu);
					}
				},
			};

			if (menu.icon) {
				config.thumb = `${global.csConf.cdnHost + menu.icon}`;
			}

			return (<List.Item {...config}>{menu.name}{menu.code === 'travelRecord' &&this.state.hasTrip && <span className={styles.redDot}></span>}</List.Item>);
		};

		const paddingSpaceInCardNo = (cardNo) => {
			cardNo = cardNo + '';
			return cardNo.replace(/\s/g,'').replace(/(.{4})/g, "$1 ");
		};

		const useQr = () => {
			if (this.state.hasQr) {
				return;
			}
			this.setState({
				hasQr: true,
			});
			if (global.tsmClient) {
				global.tsmClient.showQRcode();
			}
		};

		const smk = getCityTitle(global.csConf.cityId);
		const logo = () => {
			return `${global.csConf.cdnHost}/images/${getCityLogo(global.csConf.cityId)}`;
		}

		return (
			<DocumentTitle title={smk}>
				<Loading loading={this.state.loading}>
					<Navigator title={smk} close='shut' />
					<div className={styles.card} style={{backgroundImage: `url(${logo()})`}}>
						{/* <span className={styles.cardTitle}>
							电子交通卡
						</span> */}
						<span className={styles.cardNo}>
							{'NO.' + cardId}
						</span>
					</div>
					<div className={styles.listView} id="listView">
		            	<List>
		              		{global.csConf.menus.map(buildMenu)}
		            	</List>
		          	</div>
		          	<div title="BTN" className={styles.footer}>
		            	<WingBlank size="lg">
		              		<Button disabled={!active || this.state.hasQr} className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={useQr}>
		                		立即使用
		              		</Button>
		            	</WingBlank>
		          	</div>
				</Loading>
			</DocumentTitle>
			);
	}
}

export default connect()(MainPage);
