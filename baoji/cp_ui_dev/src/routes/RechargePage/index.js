import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WingBlank, WhiteSpace, Modal, Button, Toast } from 'antd-mobile';
import { Loading, Navigator } from '../../components';
import styles from './styles.less';
import { autoErrorPage } from '../../utils/RequestHelper';
import Utils from '../../utils/Utils';
import CpService from '../../services/cpService';
import CardStatus from '../../utils/CardStatus';
import config from '../../utils/config';

const wrapCardId = (cardId) => {
	return (<span className={styles.basicInfoValue}>{cardId}</span>);
};

const toastMsg = (msg) => {
	return (
		<div className={styles.toastDiv}>
			{msg}
		</div>
	);
};
class RechargePage extends React.Component {
	constructor(props) {
		super(props);

		const { back } =  this.props.location.query || '';
		this.state = {
			loading: true,
			showModal: false,
			selectedIndex: -1,
			procceing: false,
			fullMoney: config.fullMoney,
			amounts: [5, 10, 15, 20],
			card: null,
			back
		};
	}

	showModal = key => (e) => {
		// 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
		// 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
		e.preventDefault(); // 修复 Android 上点击穿透
		this.setState({
		  [key]: true,
		});
	}
	onClose = key => () => {
		this.setState({
			[key]: false,
		});
	}

	componentDidMount() {
		const dispatch = this.props.dispatch;		
		const {amounts, quota} = global.csConf;
		CpService.getCard().then(autoErrorPage(dispatch, (data) => {
			this.setState({
				loading: false,
				amounts,
				fullMoney: quota || config.fullMoney,
				card: data.data
			});
		}));		
	}

	render() {
		const disableRecharge = global.csConf.disableRecharge;
		const cardNo = (this.state.card && this.state.card.cardNo) || '-';
		const cardStatus = (this.state.card && this.state.card.status) || -1;
		const active = CardStatus.ACTIVE === cardStatus;
		let balance = 0;
		this.state.card && this.state.card.acctList.map(e => {
			if (e.subType === '1') {
				balance = +e.balance;
			}
		});
		let ableAmt = this.state.fullMoney - balance;
		ableAmt = ableAmt < 0 ? 0 : ableAmt;

		const chooseAmt = (e, idx) => {
			if (disableRecharge) {
				// const tip = toastMsg('抱歉，当前机具正在升级，暂不支持钱包充值，已经充值的用户可以申请退卡退款，也可以耐心等待机具升级完成后使用。'); 
				// Toast.info(tip, 3);
				this.showModal('showModal')(e);
				return;
			}
			const orderAmt = this.state.amounts[idx];
			const msg = toastMsg('超出最高金额限制');
			if (orderAmt > ableAmt) {
				Toast.info(msg, 3);
			} else {
				this.setState({ selectedIndex: idx });
			}
		};

		const doPay = () => {
			const orderAmt = this.state.amounts[this.state.selectedIndex];
			CpService.chargeCard(orderAmt).then(autoErrorPage(this.props.dispatch, (body) => {
				this.setState({
					procceing: true
				});
				global.location.href = body.data.payUrl;
			}));
		};

		const payRecord = () => {
			this.props.dispatch(routerRedux.push('/payRecord'));
		};

		const selectedVal = this.state.amounts[this.state.selectedIndex];

		return (
			<DocumentTitle title="卡片充值" className={styles.win}>
				<Loading loading={this.state.loading}>
					<Navigator title='卡片充值' close={this.state.back} />
					<div style={{marginTop: '14vw'}}></div>
					<div className={styles.container}>						
						<div>
							<div className={styles.wrapCard}>
								<div className={styles.cardNO}>充值卡号</div>
								<div className={styles.cardNOinfo}>{cardNo}</div>
								{/* <div className={styles.cardNO}>{cardNo}</div> */}
							</div>
							<div className={styles.bottomLine}></div>
						</div>
						<WhiteSpace size="md" />
						<div className={styles.pricebg}>
							<div className={styles.desBan}>选择充值金额</div>
							<div className={styles.rechargeBan}>
								{
									this.state.amounts.map( (item, idx) => {
										const selected = idx === this.state.selectedIndex;
										const classNames = `${styles.priceRect} ${selected && styles.priceSelected}`;
										return (
											<div key={idx} className={classNames} onClick={ (e) => chooseAmt(e,idx) }>
												{Utils.formatRMBYuan(item)}元
											</div>
										);
									} )
								}
							</div>
							<div className={styles.tipDiv}>
								卡片储值上限<span className={styles.amt}>{Utils.formatRMBYuan(this.state.fullMoney)}</span>元，
								当前余额<span className={styles.amt}>{Utils.formatRMBYuan(balance)}</span>元，
								还可充值<span className={styles.amt}>{Utils.formatRMBYuan(ableAmt)}</span>元
							</div>
						</div>
						<div className={styles.fixButton}>
							<div>
								<Button disabled={ disableRecharge || selectedVal == null || !active || this.state.procceing } className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={doPay}>
									确认支付
								</Button>
							</div>
							<div className={styles.btn_links}>
								<a onClick={payRecord}>充值记录</a>
							</div>
						</div>
						<Modal							
							transparent
							maskClosable={false}
							visible={this.state.showModal}
							onClose={this.onClose('showModal')}
							footer={[{ text: '确定', onPress: () => { this.onClose('showModal')(); } }]}
							>
							抱歉，当前机具正在升级，暂不支持钱包充值，已经充值的用户可以申请退卡退款，也可以耐心等待机具升级完成后使用。
						</Modal>
					</div>
				</Loading>
			</DocumentTitle>
			);
	}
}

export default connect()(RechargePage);
