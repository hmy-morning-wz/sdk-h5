import React from 'react';
import DocumentTitle from 'react-document-title';
import { List, WingBlank, WhiteSpace, Button, InputItem, Toast } from 'antd-mobile';
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

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 20);
	}

	onUserNameChange = (value) => {
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

	onUserCredIdChange = (value) => {
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
      		Toast.info('请输入姓名！');
    	}
	}

	onUserCredIdErrorChange = () => {
		if (this.state.idHasError) {
      		Toast.info('请输入正确的身份证号码！');
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
		CpService.applyCard(this.state.userNameValue, this.state.userCredId)
		.then(autoErrorPage(this.props.dispatch, (data) => {
			this.props.dispatch(routerRedux.push('/registerResult'));
		}, '/register'));
	}

	render() {
		return (
			<DocumentTitle title="领卡">
				<Loading loading={this.state.loading}>
					<Navigator title='领卡' hideRN />
					<div className={styles.win}>
						<div className={styles.tips}>
							<p style={{fontSize: '52px', color: '#1A1F26'}}>领取卡片</p>
							<p style={{fontSize: '40px', color: '#595D60'}}>该卡为市民公交卡，您需授权{getCityTitle(global.csConf.cityId)}获取以下信息，以保证用卡安全。</p>
						</div>
						<WingBlank size="lg">
							<div name="按钮" className={styles.btnDiv}>
								<Button disabled={this.state.hasSubmited} className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={this.submit}>
									确认授权
								</Button>
							</div>
							<div className={styles.inputDiv}>
								<List renderHeader={() => ''}>
									<InputItem
										editable={this.state.nameEditable}
										error={this.state.nameHasError}
							            onErrorClick={this.onUserNameErrorClick}
							            onChange={this.onUserNameChange}
							            value={this.state.userNameValue}
										placeholder='请输入姓名'
									> 姓名 </InputItem>
									<WhiteSpace size='lg' />
									<InputItem
										editable={this.state.idEditable}
										error={this.state.idHasError}
	            						onErrorClick={this.onUserCredIdErrorChange}
	            						onChange={this.onUserCredIdChange}
	            						value={this.state.userCredId}
										placeholder='请输入身份证号'
									> 身份证号 </InputItem>
								</List>
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

export default connect(mapStateToProps)(CertAuthPage);
