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
		if (card && card.acctList) {
			card.acctList.map(e => {
				if (e.subType === '1') {
					subTypeName = e.subTypeName;
					balance = e.balance;
				}
			});
		}
		return (
			<div>
				<span className={styles.topBalance}>{subTypeName}</span>
				<WhiteSpace size="md" />
				<span className={styles.bigBalance}>{Utils.formatRMBYuan(balance)}元</span>
			</div>
		);
	}

	render() {
		const cardStatus = (this.state.card && this.state.card.status) || -1;
		const active = CardStatus.ACTIVE === cardStatus;

		const toPay = () => {
			this.props.dispatch(routerRedux.push('/recharge'));
		};

		return (
			<DocumentTitle title="余额">
				<Loading loading={this.state.loading}>
					<Navigator title='余额' close={this.state.back} />
					<div name="ALL" style={{marginTop: '100px'}}>
						<WingBlank size="lg">
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
						</WingBlank>
						<div title="充值按钮" className={styles.footer}>
							{/* <WingBlank size="lg">
								<WhiteSpace size="lg" /> */}
								<Button disabled={!active} className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={toPay}>立即充值</Button>
								{/* <WhiteSpace size="lg" />
							</WingBlank> */}
						</div>
					</div>
				</Loading>
			</DocumentTitle>
			);
	}
}

export default connect()(BalancePage);
