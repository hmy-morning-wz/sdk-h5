import React from 'react';
import DocumentTitle from 'react-document-title';
import QueueAnim from 'rc-queue-anim';
import { WingBlank, WhiteSpace, Button, Checkbox, ActionSheet, Modal, Flex, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Loading, Navigator } from '../../components';
import config from '../../utils/config';
import { getCityLogo, getCityProtocol } from '../../utils/CityConf';
import styles from './styles.less';


class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			checked: true,
			agreementVisiable: false,
			agreeProtocol: false,
			showTip: false,
			protocolLink: '',
		};
	}

	changeHandler = () => {
		const isChecked = this.state.checked;
		this.setState({
			checked: !isChecked
		});
	}

	showProtocol = (e, link) => {
		e.preventDefault();
        this.setState({
        	agreementVisiable: true,
        	protocolLink: link,
        });
	}

	componentWillUnmount() {
    	this.timerID && clearTimeout(this.timerID);
  	}

	render() {
		const Auth = () => {
			// Toast.info('该功能暂停使用，敬请谅解',5);
			this.timerID && clearTimeout(this.timerID);
			if (!this.state.agreeProtocol) {
				this.setState({
					showTip: true
				});
				this.timerID = setTimeout(() => {
					this.setState({
						showTip: false
					});
					delete this.timerID;
				}, 3000);
				return;
			}
			this.props.dispatch(routerRedux.push('/certAuth'));
		};

		const agreeClick = (e) => {
			this.setState({
				agreeProtocol: !this.state.agreeProtocol,
				showTip: false,
			});
	    }

		const logo = () => {
			return `${config.cdnHost}/images/${getCityLogo(global.csConf.cityId)}`;
		}

		return (
			<DocumentTitle title="卡片申领">
				<Loading loading={this.state.loading}>
					<Navigator title='卡片申领' close='shut' hideRN />
					<div className={styles.winn}>						
						{/* <div name="卡片" className={styles.card} style={{ backgroundImage: `url(${logo()})` }} /> */}
						<div className={styles.cardBan} style={{ backgroundImage: `url(${global.csConf.cdnHost}/images/610300/beijing@3.png)` }}>
							<div className={styles.card2}>
								<div>
									<img src={`${global.csConf.cdnHost}/images/610300/kamian.png`} className={styles.cardImg} /> 
								</div>
							</div>
						</div>
							<div name="协议" className={styles.protocols}>
								<Flex>
									<Flex.Item>
										<QueueAnim animConfig={[{ opacity:[1, 0] }, { opacity:[1, 0] }]} duration={2000} style={{height: '0.8rem', margin: '0 0 0.1rem 5%'}}>
											{
													this.state.showTip ? <div key='tip' style={{
														backgroundImage: `url(${config.cdnHost}/images/tip.png)`,
														}} className={styles.tip}></div> : null
												}
										</QueueAnim>
									</Flex.Item>
								</Flex>
								<div className={styles.agreementBan}>
									<div className={styles.checkIcon} onClick={agreeClick}>
										{!this.state.agreeProtocol &&
											<div className={styles.uncheck}></div>}
										{this.state.agreeProtocol &&
											<div className={styles.uncheckk}>
												<img src={`${global.csConf.cdnHost}/images/610300/select@3x.png`} alt="" className={styles.checkedImg}/>
											</div>}
									</div>
									<div className={styles.textItem}>
										我已阅读并同意
										{
											global.csConf.protocol.map(p => {
												return (
													<span className={styles.agreement} key={p.name} title={p.name} onClick={e => this.showProtocol(e, `${config.cdnHost}${p.link}`)}>《{p.name}》</span>
													);
											})
										}
									</div>
								</div>
							</div>
							<div name="按钮" className={styles.btnDiv}>
								<Button className={styles.btn} activeClassName={styles.btnActive} type="primary" disabled={!this.state.checked} onClick={Auth}>申请领卡</Button>
							</div>
							<WhiteSpace size="lg" /><WhiteSpace size="md" />
				              <div name="业务描述" className={styles.accts}>
				                {global.csConf.functions.map((f) => {
				                  return (
				                    <div key={f.name}>
				                      <em /> <span>{f.name} </span><em />
				                      <p>{f.memo} </p>
				                      <WhiteSpace size="lg" />
				                      <WhiteSpace size="md" />
				                    </div>
				                  );
				                })}
				              </div>
					</div>
					<div className={styles.bottomText}>
						<div><span style={{fontWeight:"bold"}}>宝鸡公交</span>与<span style={{fontWeight:"bold"}}>通卡联城</span>联合提供服务
							<br/>
						{/* 客服电话：0917-3249919 */}
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

export default connect()(Register);
