import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Button, Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { Loading, Navigator } from '../../components';
import styles from './styles.less';
import { autoErrorPage } from '../../utils/RequestHelper';
import CardStatus from '../../utils/CardStatus';
import CpService from '../../services/cpService';
import Utils from '../../utils/Utils';

class BalancePage extends React.Component {
	constructor(props) {
		super(props);

		const { back } =  this.props.location.query || '';
		this.state = {
			loading: true,
			card: null,
			back
		};
	}

	componentDidMount() {
		CpService.getCard().then(autoErrorPage(this.props.dispatch, (data) => {
			this.setState({
				loading: false,
				card: data.data
			});
		}));
	}

	buildBalance() {
		let subTypeName = 'Unknown';
		let balance = 0;
		const card = this.state.card;
		let cardNo = '';
		if (card && card.acctList) {
			cardNo = card.cardNo
			card.acctList.map(e => {
				if (e.subType === '1') {
					subTypeName = e.subTypeName;
					balance = e.balance;
				}
			});
		}
		return (
			<div>
				{/* <span className={styles.topBalance}>{subTypeName}</span>
				<WhiteSpace size="md" /> */}
				<span className={styles.bigBalance}>余额：<span className={styles.balanceInfo}>{Utils.formatRMBYuan(balance)}</span>元</span>
				<div className={styles.cardNo}>卡号：{cardNo}</div>
			</div>
		);
	}

	render() {
		const cardStatus = (this.state.card && this.state.card.status) || -1;
		const active = CardStatus.ACTIVE === cardStatus;

		const toPay = () => {
			this.props.dispatch(routerRedux.push('/recharge'));
		};
		const payRecord = () => {
			this.props.dispatch(routerRedux.push('/payRecord'));
		};
		const travelRecord = () => {
			this.props.dispatch(routerRedux.push('/travelRecord'));
		};

		return (
			<DocumentTitle title="余额">
				<Loading loading={this.state.loading}>
					<Navigator title='余额' close={this.state.back} />
					<div name="ALL" style={{marginTop: '15%'}}>
						{/* <WingBlank size="lg">
							<div className={styles.clearLine} />
							<WhiteSpace size="lg" />
							<div name="余额列表">
								<Card>
									<Card.Header title="电子钱包" extra={this.buildBalance()} />
									<Card.Body>
										<div className={styles.descriptionBody}>
											{global.csConf.cardBalanceDescription}
										</div>
									</Card.Body>
								</Card>
							</div>
						</WingBlank> */}
						<div className={styles.card}>
							<div>
								<div className={styles.cardImg}>
									<img src={`${global.csConf.cdnHost}/images/610300/kamian.png`} />
									<div className={styles.infooBan}>
										{this.buildBalance()}
									</div>
									<div className={styles.descriptionBody}>
										{global.csConf.cardBalanceDescription}
									</div>

								</div>
							</div>
						</div>
						<div title="充值按钮" className={styles.footer}>
								<Button disabled={!active} className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={toPay}>立即充值</Button>
								<WhiteSpace size="md" />
								<div className={styles.btn_links}>
									<a onClick={payRecord}>充值记录</a>
									&nbsp; | &nbsp; 
									<a onClick={travelRecord}>乘车记录</a>
								</div>
						</div>
					</div>
				</Loading>
			</DocumentTitle>
			);
	}
}

export default connect()(BalancePage);
