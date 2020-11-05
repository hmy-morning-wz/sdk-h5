import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Result, Icon, WhiteSpace } from 'antd-mobile';
import { Navigator } from '../../components';
import styles from './styles.less';
import config from '../../utils/config';
import { basicResponseHandler } from '../../utils/RequestHelper';
import CpService from '../../services/cpService';
import PayStatus from '../../utils/PayStatus';
import { STATUS_SUCCESS } from '../../utils/request';

class PayResult extends React.Component {
	constructor(props) {
		super(props);

		const { orderId, Rid } = this.props.location.query;

		this.state = {
			lastQueryTime: new Date().getTime(),
			tried: 0,
			orderId,
			Rid,
			errors: [],

			result: PayStatus.UNPAY,
		};

		global.document.addEventListener('back', (e) => {
      		e.preventDefault();
      		setTimeout(() => {
        		if (global.tsmClient) {
        			global.tsmClient.showQRcode();
      			}
      		}, 10);
    	}, false);
	}

	componentDidMount() {
		this.scheduleQueryNext();
	}

	doQuery() {
    	CpService.queryPay(this.state.orderId, this.state.Rid)
    		.then(basicResponseHandler(({ code, message, data }) => {
    			console.dir(data);
      			if (code !== STATUS_SUCCESS) {
        			const errors = this.state.errors;

        			errors.push({ code, message });

        			this.scheduleQueryNext();
				} else {
        			this.setState({ result: data.result, cardNo: data.cardNo });
			        // debugger;
			        switch (data.result) {
			          	case PayStatus.UNPAY:
			            	this.scheduleQueryNext();
			            	break;
			          	case PayStatus.SUCCESS:
			            	// DONE
			            	break;
			          	case PayStatus.ERROR:
			            	// DOWN
			            	break;
			          	case PayStatus.REFUND:
			              	// DOWN
			            	break;
						default:
			            	this.props.dispatch(routerRedux.replace({
			              		pathname: '/error',
			              		query: {
			                		message: `无效的支付结果： ${data.result}`,
			                		code: -1,
			                		back: '/main',
			              		},
			            	}));
			        }
      			}
		}));
	}

	scheduleQueryNext() {
		const tried = this.state.tried;
		const now = new Date().getTime();
		if (tried < config.payQueryMaxCount) {
			this.setState({ tried: tried + 1, lastQueryTime: now });

			const elapsed = Math.max(0, now - this.state.lastQueryTime) / 1000;

			if (elapsed > config.payQueryDuration) {
				this.doQuery();
			} else {
				const nextMillis = (config.payQueryDuration - elapsed) * 1000;
				global.setTimeout(this.doQuery.bind(this), nextMillis);
			}
		}
	}

	render() {
			const backHome = () => {
				this.props.dispatch(routerRedux.replace('/main'));
			};

	    const buildPaying = () => {
	      return (	      	
	        <div>
	          	<Navigator title='处理中' close='shut' />
	          	<div style={{marginTop: '300px'}}>
	          		{/* <WhiteSpace size="lg" />
		          <Result
		            img={<Icon type="loading" className={styles.icon} style={{ fill: '#ffc750' }} />}
		            title="处理中"
		            message="订单正在处理中，请耐心等待."
		          />
		          <WhiteSpace /> */}
		        </div>
						<div style={{textAlign: 'center'}}>
							<img className={styles.iconImg} src={`${global.csConf.cdnHost}/images/610300/chulizhong@3x.png`} />
							<div className={styles.title}>处理中</div>
							<div className={styles.subTit}>订单正在处理中，请耐心等待</div>
						</div>
	        </div>

	      );
	    };

	    const buildFailed = () => {
	      return (
	        <div>
	        	<Navigator title='充值失败' close='shut' />
	        	<div style={{marginTop: '300px'}}>
	        		{/* <WhiteSpace size="lg" /> */}
		          {/* <Result
		            // img={<Icon type="cross-circle-o" className={styles.icon} style={{ fill: '#fd6565' }} />}
		            // title="充值失败"
		            // message="充值失败，请稍后重试."
		          />
							<WhiteSpace /> */}
		        </div>
						<div style={{textAlign: 'center'}}>
							<img className={styles.iconImg} src={`${global.csConf.cdnHost}/images/610300/fail@3x.png`} />
							<div className={styles.title}>充值失败</div>
							<div className={styles.subTit}>充值失败，请稍后重试</div>
						</div>						
						<Button className={styles.bottomBtn} onClick={backHome} >完成</Button>
	        </div>
	      );
	    };

	    const buildRefund = () => {
	      return (
	        <div>
	        	<Navigator title='已退款' close='shut' />
	        	<div style={{marginTop: '300px'}}>
	        		{/* <WhiteSpace size="lg" />
	          <Result
	            img={<Icon type="check-circle" className={styles.icon} style={{ fill: '#FFDC00' }} />}
	            title="已退款"
	            message="因充值失败，您的订单已退款。"
	          />
	          <WhiteSpace /> */}
	          </div>
						<div style={{textAlign: 'center'}}>
							<img className={styles.iconImg} src={`${global.csConf.cdnHost}/images/610300/fail@3x.png`} />
							<div className={styles.title}>已退款</div>
							<div className={styles.subTit}>因充值失败，您的订单已退款。</div>
						</div>
		        <Button className={styles.bottomBtn} onClick={backHome} >完成</Button>
	        </div>
	      );
	    };
	    
	    const onUseClick = () => {
	    	if (global.tsmClient) {
					global.tsmClient.showQRcode();
				}
	    };

	    const buildSuccess = () => {
	      return (
	        <div>
	        	<Navigator title='充值成功' close='shut' />
	        	<div style={{marginTop: '300px'}}>
	        		{/* <WhiteSpace size="lg" />
		          <Result
		            img={<Icon type="check-circle" className={styles.icon} style={{ fill: '#8cc421' }} />}
		            title="充值成功"
		            message="充值成功，您可以立即扫码上车。"
		          />
							<WhiteSpace /> */}
							<div style={{textAlign: 'center'}}>
								<img className={styles.iconImg} src={`${global.csConf.cdnHost}/images/610300/success@3x.png`} />
								<div className={styles.title}>充值成功</div>
							</div>
		          <Button className={styles.bottomBtn} onClick={onUseClick} >扫码上车</Button>
	          </div>
	        </div>
	      );
	    };

    	const timeout = this.state.tried >= config.payQueryMaxCount;
	    if (timeout) {
	      return (
	        <div>
	        	<Navigator title='系统繁忙' close='shut' />
	        	<div style={{marginTop: '300px'}}>
	        		{/* <WhiteSpace size="lg" />
					<Result
			            img={<Icon type="check-circle" className={styles.icon} style={{ fill: '#FFDC00' }} />}
			            title="系统繁忙"
			            message="您的订单正在后台处理中，请稍后再来查询确认."
			        />
			        <WhiteSpace /> */}
		        </div>
						<div style={{textAlign: 'center',padding:'0 15%'}}>
							<img className={styles.iconImg} src={`${global.csConf.cdnHost}/images/610300/fail@3x.png`} />
							<div className={styles.title}>系统繁忙</div>
							<div className={styles.subTit}>您的订单正在后台处理中，请稍后再来查询确认</div>
						</div>
	        </div>
	      );
	    } else {
	      	switch (this.state.result) {
		        case PayStatus.UNPAY:
		          return buildPaying();
		        case PayStatus.ERROR:
		          return buildFailed();
		        case PayStatus.SUCCESS:
		          return buildSuccess();
		        case PayStatus.REFUND:
		          return buildRefund();
		        default:
		          return (
		            <div style={{marginTop: '100px'}}>
		            	<Navigator title='未知' close='shut' />
		            	<WhiteSpace size="lg" />
		              	<div>UNKOWN result: {this.state.result}</div>
		            </div>
		        );
		    }
	    }
	}
}

export default connect()(PayResult);
