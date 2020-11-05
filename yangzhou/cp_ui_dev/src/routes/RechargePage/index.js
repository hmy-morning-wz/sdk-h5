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
import { setTimeout } from 'core-js';

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
			tabVal: 1,
			voucherNum: '',
			eachNum: [],
			isfocus: false,
			showBottomBtn: 'block',
			back
		};
	}


	resizeTo= () =>{		
		if(this.state.showBottomBtn === 'block'){
			// alert(this.state.isfocus)
			this.setState({
				showBottomBtn: 'none'
			})
		}else{
			this.setState({
				showBottomBtn: 'block'
			})
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.resizeTo.bind(this));
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

	
	componentWillUnmount() {       
		window.removeEventListener('resize',this.resizeTo.bind(this));
	}

	render() {
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

		//券充值
		const voucherPay = () => {
			console.log(this.state.voucherNum)
			const orderAmt = '';
			const voucherNO = this.state.voucherNum
			const msg = toastMsg('·  ·  ·')
			const suc = toastMsg('充值成功')
			const err = toastMsg('充值异常')
			Toast.info(msg, 20);		
			CpService.chargeCard(orderAmt,voucherNO).then(
				autoErrorPage(this.props.dispatch, (body) => {
					// this.setState({
					//券充值完按钮是否可点击
					// 	procceing: true
					// });
					if (body.data.status === 1) {
						Toast.info(suc, 2);
					} else if (body.data.status === 2 || body.data.status === 4) {
						Toast.info(err, 2);
					}
				})
			).catch(e => {
				Toast.hide()
			})
		};

		const payRecord = () => {
			this.props.dispatch(routerRedux.push('/payRecord'));
		};

		const travelRecord = () => {
			this.props.dispatch(routerRedux.push('/travelRecord'));
		};

		const selectedVal = this.state.amounts[this.state.selectedIndex];

		const tab = (this.state.tabVal===1)
		const tabClass1 = `${tab ? styles.tab:''}`
		const tabClass2 = `${tab ? '':styles.tab}`
		const tabClass3 = `${tab ? styles.tabBottom:''}`
		const tabClass4 = `${tab ? '':styles.tabBottom}`
		const changeTab = (tabValue) => {
			this.setState({ tabVal: tabValue });
		}

		const handleVoucherChange = () => {
			if(this.refs.textInput.value.length > 8){
				this.refs.textInput.value = this.refs.textInput.value.slice(0,8)
			}
			this.setState({
					voucherNum : this.refs.textInput.value,
					eachNum: this.refs.textInput.value.split('')
			})
		}

		let list = () => {
			let res = [];
			let focusClass = ''
			for(let i = 0; i < 8; i++) {
				focusClass = `${styles.labelNum} ${((this.state.isfocus &&(this.state.eachNum.length === i)) ) ? styles.focusLabel:''}`
				res.push(
				<label key={i} className={focusClass} 
				htmlFor="code">{(this.state.eachNum.length>0) && (this.state.eachNum[i])
				}
				</label>)
			}
			return res
		}
	 

		return (
			<DocumentTitle title="卡片充值" className={styles.win}>
				<Loading loading={this.state.loading}>
					<Navigator title='卡片充值' close={this.state.back} />
					<div className={styles.tabDiv} style={{marginTop: '14%'}}>

						<div className={styles.tabBan}>
							<div className={styles.tabBar} onClick={ () => changeTab(1) }>
								<div className={tabClass1}>现金充值</div>
								<div className={tabClass3}></div>
							</div>
							<div className={styles.tabBar} onClick={ () => changeTab(2) }>
								<div className={tabClass2}>券充值</div>
								<div className={tabClass4}></div>
							</div>
						</div>

						{
							(tab === true) &&
							<div>
								<div  className={styles.containBan}>
									<div>
										<div className={styles.wrapCard}>
											<div className={styles.cardNO}>充值卡号：{cardNo}</div>
											{/* <div className={styles.cardNO}>{cardNo}</div> */}
										</div>
										<div className={styles.bottomLine}></div>
									</div>
									<WhiteSpace className={styles.space} size="md" />
									<div className={styles.pricebg}>
										<div className={styles.desBan}>选择充值金额</div>
										<div className={styles.rechargeBan}>
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

										<div className={styles.tipDiv}>
											卡片储值上限<span className={styles.amt}>{Utils.formatRMBYuan(this.state.fullMoney)}</span>元，
											当前余额<span className={styles.amt}>{Utils.formatRMBYuan(balance)}</span>元，
											还可充值<span className={styles.amt}>{Utils.formatRMBYuan(ableAmt)}</span>元
										</div>
									</div>
								</div>
								
								<div className={styles.fixButton}>
									<div>
										<Button disabled={ selectedVal == null || !active || this.state.procceing } className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={doPay}>
											确认支付
										</Button>
									</div>
									<div className={styles.btn_links}>
										<a onClick={payRecord}>充值记录</a>
										{/* &nbsp;|&nbsp;
										<a onClick={travelRecord}>乘车记录</a> */}
									</div>
									<WhiteSpace size='md' />						
								</div>
							</div>
						}

						{
							(tab === false) &&
							<div  className={styles.containerBan}>
								<div  className={styles.containBan}>
									<div>
										<div className={styles.wrapCard}>
											<div className={styles.cardNO}>充值卡号：{cardNo}</div>
										</div>
										<div className={styles.bottomLine}></div>
									</div>
									<WhiteSpace className={styles.space} size="md" />
									<div className={styles.pricebg}>
										<div className={styles.voucherBan}>
											<div className={styles.voucherIssure}>扬州市民卡充值券</div>
											<div className={styles.voucherNo}>
												<input type="url" className={styles.textInput} id="code" ref="textInput" value={this.state.voucherNum}
													onChange={handleVoucherChange}
													onFocus={ () => {this.setState({isfocus: true})}}
													onBlur={ () => {this.setState({isfocus: false})}}
													maxLength="8" />
												<div className={styles.eachNo}>
													{/* <label htmlFor="code">{(this.state.eachNum.length>0) && this.state.eachNum[0]}</label> */}
													{list(this.state.voucherNum.length)}										
												</div>
											</div>
										</div>

										<div className={styles.tipDiv}>
											卡片储值上限<span className={styles.amt}>{Utils.formatRMBYuan(this.state.fullMoney)}</span>元，
											当前余额<span className={styles.amt}>{Utils.formatRMBYuan(balance)}</span>元，
											还可充值<span className={styles.amt}>{Utils.formatRMBYuan(ableAmt)}</span>元，
											充值券仅可用于扫码乘车扣费，不予退款。
										</div>
									</div>
								</div>
								
								<div ref="fixButton2" style={{display: this.state.showBottomBtn}} className={styles.fixButton}>
									<div>
										<Button disabled={ this.state.eachNum.length < 8 || !active || this.state.procceing } className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={voucherPay}>
											确认支付
										</Button>
									</div>
									<div className={styles.btn_links}>
										<a onClick={payRecord}>充值记录</a>
										{/* &nbsp;|&nbsp;
										<a onClick={travelRecord}>乘车记录</a> */}
									</div>
									<WhiteSpace size='md' />						
								</div>
							</div>
						}

						
					</div>
				</Loading>
			</DocumentTitle>
			);
	}
}

export default connect()(RechargePage);
