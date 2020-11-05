import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Button, List, Modal, WingBlank, WhiteSpace } from 'antd-mobile';
import { Loading, Navigator } from '../../components';
import styles from './styles.less';
import menu from './menu.json';
import { autoErrorPage } from '../../utils/RequestHelper';
import CardStatus from '../../utils/CardStatus';
import CpService from '../../services/cpService';
import config from '../../utils/config';
import { getCityTitle, getCityLogo } from '../../utils/CityConf';

const alert = Modal.alert;
const menuList = menu.routerList

class MainPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			card: null,
			hasQr: false,
			hasRevoked: false,
			agreementVisiable: false,
			agreeProtocol: false,
			showTip: false,
			protocolLink: '',
		};
	}

	componentDidMount() {
		// console.log(menuList)
		CpService.getCard().then(autoErrorPage(this.props.dispatch, (data) => {
			this.setState({
				loading: false,
				card: data.data
			});
		}));
	}
	
	showProtocol = (link) => {
		this.setState({
			agreementVisiable: true,
			protocolLink: link,
		});
	}

	onClickMenu(menu, active) {
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
			usingQr: () => {
				if(!(!active || this.state.hasQr)){
					this.useQr()
				}				
			},			
			agreement: () => {
				this.showProtocol(`${config.cdnHost}${global.csConf.protocol[0].link}`)		
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
		dispatch(routerRedux.push('/refundCard'));

	}

	isCardActive() {
		const card = this.state.card;
		return card && CardStatus.ACTIVE === card.status;
	}
	
	useQr = () => {
		// alert('2387')
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

	render() {
		const img = 'https://cdnweb04.96225.com/images/card.png';

		const cardId = (this.state.card && this.state.card.cardNo) || '-';
		const cardStatus = (this.state.card && this.state.card.status) || -1;
		// console.log('--->' + cardStatus);
		const active = CardStatus.ACTIVE === cardStatus;

		const buildMenu = (menu, idx) => {
			const enabled = menu.flag.some( e => e === -1 || e === cardStatus);

			return (
				<div key={idx} className={styles.eachIcon} onClick= { () => {
						if (enabled) { this.onClickMenu(menu, active) } }	}>
					<div>
						<div className={styles.eachIconImg}><img src={`${global.csConf.cdnHost + menu.icon}`} alt=""/></div>
						<div className={styles.eachIconLabel}>{menu.name}</div>
					</div>
				</div>
			);
		};

		const paddingSpaceInCardNo = (cardNo) => {
			cardNo = cardNo + '';
			return cardNo.replace(/\s/g,'').replace(/(.{4})/g, "$1 ");
		};

		const smk = getCityTitle(global.csConf.cityId);
		const logo = () => {
			return `${global.csConf.cdnHost}/images/610300/kamian.png`;
		}

		return (
			<DocumentTitle title={"卡详情"}>
				<Loading loading={this.state.loading}>
					<Navigator title={"卡详情"} close='shut' />

					<div className={styles.containDiv}>

						<div className={styles.cardBan}  style={{ backgroundImage: `url(${global.csConf.cdnHost}/images/610300/beijing@3.png)` }}>
							<div className={styles.card2}>
								<div>
									<img src={`${global.csConf.cdnHost}/images/610300/kamian2.png`} className={styles.cardImg} /> 
									<div className={styles.cardNo}>NO.{cardId}</div>
								</div>
							</div>
						</div>
						
						<div className={styles.grids}>
							{global.csConf.menus.map(buildMenu)}
						</div>

						<div className={styles.bottomText}>
							<div><span style={{fontWeight:"bold"}}>宝鸡公交</span>与<span style={{fontWeight:"bold"}}>通卡联城</span>联合提供服务
								<br/>
							{/* 客服电话：0917-3249919 */}
							</div>
						</div>

					</div>

					<Modal
						style={{ width: '90%' }}
						transparent
						maskClosable={false}
						visible={this.state.agreementVisiable}
					>
						<div className={styles.agreementDiv}>
								<iframe className={styles.agreementFrame} src={this.state.protocolLink} width="100%" />
						</div>
						<WhiteSpace size="lg" />
						<Button type="primary"
								onClick={() => this.setState({ agreementVisiable: false })}
						>
								确定
						</Button>
					</Modal>

				</Loading>
			</DocumentTitle>
			);
	}
}

export default connect()(MainPage);
