import React from 'react';
import DocumentTitle from 'react-document-title';
import { List, WingBlank, WhiteSpace,  InputItem, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Loading, Navigator } from '../../components';
import styles from './styles.less';
import { autoErrorPage } from '../../utils/RequestHelper';
import CpService from '../../services/cpService';
import { getCityTitle } from '../../utils/CityConf';

class CertAuthPage extends React.Component {
	constructor(props) {
		super(props);

		const init = {
			nameEditable: true,
			idEditable: true,
			loading: true,
			nameHasError: true,
			idHasError: true,
			userNameValue: '',
			userCredId: '',
			hasSubmited: false,
			resizeed: false,
		};
		if (this.props.name) {
			init.nameEditable = false;
			init.nameHasError = false;
			init.userNameValue = this.props.name || '';
		}
		if (this.props.identityId) {
			init.idEditable = false;
			init.idHasError = false;
			init.userCredId = this.props.identityId || '';
		}
		this.state = init;
	}

	
	resizeTo= () =>{		
		this.setState({
			resizeed: !this.state.resizeed
		})
	}

	componentDidMount() {
		window.addEventListener('resize', this.resizeTo.bind(this));
		setTimeout(() => {
			this.setState({
				loading: false
			});
			console.log(this.refs.butt.style.color)
		}, 20);
	}
	componentWillUnmount() {       
		window.removeEventListener('resize',this.resizeTo.bind(this));
	}

	onUserNameChange = (e) => {
		const value = e.target.value || e
		console.log(value)
		if (!!!value || value.replace(/\s/g, '').length <= 1) {
			this.setState({
				nameHasError: true
			});
		} else {
			this.setState({
				nameHasError: false
			});
		}
		this.setState({
			userNameValue: value,
			hasSubmited: false,
		});
	}

	onUserCredIdChange = (e) => {
		const value = e.target.value
		const regx = (/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/);
		if (regx.test(value)) {
			this.setState({
				idHasError: false
			});
		} else {
			this.setState({
				idHasError: true
			});
		}
		this.setState({
			userCredId: value,
			hasSubmited: false,
		});
	}

	onUserNameErrorClick = () => {
		if (this.state.nameHasError) {
      		Toast.info('请输入正确的姓名！',1);
    	}
	}

	onUserCredIdErrorChange = () => {
		if (this.state.idHasError) {
      		Toast.info('请输入正确的身份证号码！',1);
    	}
	}

	submit = () => {
		if (this.state.hasSubmited) {
			return;
		}
		this.setState({
			hasSubmited: true,
		});
		if (this.state.nameHasError) {
			this.onUserNameErrorClick();
			return;
		}
		if (this.state.idHasError) {
			this.onUserCredIdErrorChange();
			return;
		}
		Toast.loading(<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正在开卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>, 60);
		CpService.applyCard(this.state.userNameValue, this.state.userCredId)
		.then(autoErrorPage(this.props.dispatch, (data) => {
			Toast.success(<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申领成功&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>, 1);
			setTimeout(() => {
				// this.props.dispatch(routerRedux.replace('/registerResult'));
				this.props.dispatch(routerRedux.replace('/main'));
			}, 1000);
		}, '/register'));
	}

	render() {
		return (
			<DocumentTitle title="卡片申领">
				<Loading loading={this.state.loading}>
					<Navigator title='卡片申领' hideRN />
					<div className={styles.win}>
						<div className={styles.tips}>
							<p style={{fontSize: '0.28rem', color: '#5a6169'}}>该卡为记名卡，为确保用卡安全，请您授权
								<span style={{fontWeight: 'bold'}}>{getCityTitle(global.csConf.cityId)}</span>获取以下实名信息：</p>
						</div>
						<WingBlank size="lg">
							{
								!this.state.resizeed && 
								<div name="按钮" className={styles.btnDiv}>
									<button ref='butt' disabled={this.state.hasSubmited || !this.state.userNameValue || !this.state.userCredId} className={styles.btn} onClick={this.submit}>
										授权开卡
									</button>
									<div className={styles.bottomText}>
										<div><span style={{fontWeight:"bold"}}>宝鸡公交</span>与<span style={{fontWeight:"bold"}}>通卡联城</span>联合提供服务
											<br/>
										{/* 客服电话：0917-3249919 */}
										</div>
									</div>
								</div>
							}

							<div className={styles.inputDiv}>
								<div className={styles.inputLine}>
									<div className={styles.name}>姓名</div>
									<div className={styles.inputValue}>
											<input type='text' value={this.state.userNameValue} onChange={this.onUserNameChange} placeholder='请输入姓名' />

											<div className={styles.checkIcon}>
												{
													this.state.nameHasError && 
													<div className={styles.checked}>
														<img  src={`${global.csConf.cdnHost}/images/610300/zhushi@3x.png`} alt="" className={styles.checkedImg} />
													</div>
												}
											</div>
									</div>
								</div>
								<div style={{borderBottom: '1px solid #a2a2a2'}}></div>
								<div className={styles.inputLine}>
								<div className={styles.name}>身份证号</div>
									<div className={styles.inputValue}>
											<input type='text' value={this.state.userCredId} onChange={this.onUserCredIdChange} placeholder='请输入身份证号' />

											<div className={styles.checkIcon}>
												{
													this.state.idHasError && 
													<div className={styles.checked}>
														<img  src={`${global.csConf.cdnHost}/images/610300/zhushi@3x.png`} alt="" className={styles.checkedImg} />
													</div>
												}
											</div>
									</div>
								</div>
							</div>
						</WingBlank>
					</div>
				</Loading>
			</DocumentTitle>
			);
	}
}

const mapStateToProps = (state) => {
	return state.card.identityInfo;
};

// export default connect(mapStateToProps)(CertAuthPage);
export default connect()(CertAuthPage);

