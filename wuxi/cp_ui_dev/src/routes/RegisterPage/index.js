import React from 'react';
import DocumentTitle from 'react-document-title';
import QueueAnim from 'rc-queue-anim';
import { WingBlank, WhiteSpace, Button, Checkbox, ActionSheet, Modal, Flex } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Loading, Navigator } from '../../components';
import config from '../../utils/config';
import { getCityLogo, getCityProtocol } from '../../utils/CityConf';
import styles from './styles.less';

const AgreeItem = Checkbox.AgreeItem;

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
				agreeProtocol: e.target.checked,
				showTip: false,
			});
	    }

		const logo = () => {
			return `${config.cdnHost}/images/${getCityLogo(global.csConf.cityId)}`;
		}

		return (
			<DocumentTitle title="领卡">
				<Loading loading={this.state.loading}>
					<Navigator title='领卡' close='shut' hideRN />
					<div className={styles.win}>
						<div className={styles.tips} style={{marginBottom: '60px'}}>
							<p style={{fontSize: '52px', color: '#1A1F26'}}>领取卡片</p>
						</div>
						<div name="卡片" className={styles.card} style={{ backgroundImage: `url(${logo()})` }} />
						<WingBlank size="lg">
							<div name="协议" className={styles.protocols}>
								<Flex>
							        <Flex.Item>
							        	<QueueAnim animConfig={[{ opacity:[1, 0] }, { opacity:[1, 0] }]} duration={2000}>
							        		{
							                this.state.showTip ? <div key='tip' style={{
							                  backgroundImage: `url(${config.cdnHost}/images/tip.png)`,
							                  }} className={styles.tip}></div> : null
							            	}
							        	</QueueAnim>
										<AgreeItem onChange={agreeClick} style={{marginTop: '-22px', display: 'inline-block', marginLeft: 0}} checked={this.state.agreeProtocol}>
							            	我已阅读并同意
							            	{
							            		global.csConf.protocol.map(p => {
							            			return (
							            				<a key={p.name} title={p.name} onClick={e => this.showProtocol(e, `${config.cdnHost}${p.link}`)}>《{p.name}》</a>
							            				);
							            		})
							            	}
										</AgreeItem>
							        </Flex.Item>
						      	</Flex>
							</div>
							<div name="按钮" className={styles.btnDiv}>
								<Button className={styles.btn} activeClassName={styles.btnActive} type="primary" disabled={!this.state.checked} onClick={Auth}>立即领卡</Button>
							</div>
							<WhiteSpace size="lg" /><WhiteSpace size="lg" />
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
						</WingBlank>
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
