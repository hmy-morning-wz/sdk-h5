import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WingBlank, WhiteSpace, List, Button, Toast } from 'antd-mobile';
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
			selectedIndex: -1,
			procceing: false,
			fullMoney: config.fullMoney,
			amounts: [5, 10, 15, 20],
			card: null,
			back
		};
	}

	componentDidMount() {
		const dispatch = this.props.dispatch;
		CpService.confCharge().then(autoErrorPage(dispatch, (resp) => {
			const {amount, fullMoney} = resp.data;
			CpService.getCard().then(autoErrorPage(dispatch, (data) => {
				this.setState({
					loading: false,
					amounts: amount,
					fullMoney: fullMoney || config.fullMoney,
					card: data.data
				});
			}));
		}));
	}

	render() {
		const cardNo = (this.state.card && this.state.card.cardNo) || '-';
		const cardStatus = (this.state.card && this.state.card.status) || -1;
		const active = (CardStatus.ACTIVE === cardStatus) ||  (CardStatus.FAILED_REVOKE === cardStatus);
		let balance = 0;
		this.state.card && this.state.card.acctList.map(e => {
			if (e.subType === '1') {
				balance = +e.balance;
			}
		});
		let ableAmt = this.state.fullMoney - balance;
		ableAmt = ableAmt < 0 ? 0 : ableAmt;

		const chooseAmt = (idx) => {
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

		const travelRecord = () => {
			this.props.dispatch(routerRedux.push('/travelRecord'));
		};

		const selectedVal = this.state.amounts[this.state.selectedIndex];

		return (
			<DocumentTitle title="充值" className={styles.win}>
				<Loading loading={this.state.loading}>
					<Navigator title='充值' close={this.state.back} />
					<div style={{marginTop: '120px'}}>
						<div className={styles.wrapCard}>
							<div className={styles.cardTip}>充值卡号</div>
							<div className={styles.cardNO}>{cardNo}</div>
						</div>
					</div>
					<WhiteSpace className={styles.space} size="md" />
					<div className={styles.pricebg}>
						<WingBlank size="md">
							<div className={styles.tips}></div>
							<div>
								{
									this.state.amounts.map( (item, idx) => {
										const selected = idx === this.state.selectedIndex;
										const classNames = `${styles.priceRect} ${selected && styles.priceSelected}`;
										return (
											<div key={idx} className={classNames} onClick={ () => chooseAmt(idx) }>
												{Utils.formatRMBYuan(item)}元
											</div>
										);
									} )
								}
							</div>
							<div className={styles.clearLine}></div>
						</WingBlank>
						<div className={styles.tipDiv}>
							当前余额<span className={styles.amt}>{Utils.formatRMBYuan(balance)}</span>元，
							最多可充<span className={styles.amt}>{Utils.formatRMBYuan(ableAmt)}</span>元
						</div>
						<div className={styles.fixButton}>
							<div>
								<Button disabled={ selectedVal == null || !active || this.state.procceing } className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={doPay}>
									确认支付
								</Button>
							</div>
							<div className={styles.btn_links}>
								<a onClick={payRecord}>充值记录</a>
								|
								<a onClick={travelRecord}>乘车记录</a>
							</div>
							<WhiteSpace size='md' />
						</div>
					</div>
				</Loading>
			</DocumentTitle>
			);
	}
}

export default connect()(RechargePage);
