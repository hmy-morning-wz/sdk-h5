import React from 'react';
import DocumentTitle from 'react-document-title';
import { Button, List, InputItem, Toast, WhiteSpace } from 'antd-mobile';
import url from 'url';
import querystring from 'querystring';
import { Navigator, Loading } from '../../components';
import styles from './styles.less';
import CpService from '../../services/cpService';
import { STATUS_SUCCESS } from '../../utils/request';
import { getCityTitle } from '../../utils/CityConf';
class VerifyPage extends React.Component {
	constructor(props) {
		super(props);

		const query = querystring.parse(url.parse(global.location.href).query);
		this.state = {
			mobile: query && query.mobile,
			code: null,
			sended: false,
			btnText: '发送',
			loading: true,
			isMobile: false
		};
		this.seconds = 60;
		this.exists = '0';
		this.clientId = query && query.clientId;
	}

	componentWillUnmount() {
		if (this.timerID) clearInterval(this.timerID);
	}

	componentDidMount() {
		const regx = (/^1\d{10}$/);
		if (regx.test(this.state.mobile)) {
			this.setState({
				isMobile: true
			});
		} else {
			this.setState({
				isMobile: false
			});
			this.freeLogin()
		}
	}

	handleClick = () => {
		CpService.login(this.state.mobile, this.clientId, this.state.code, this.exists).then(data => {
			const code = data.code;
			if (code === STATUS_SUCCESS) {
				if (global.tsmClient) {
					global.tsmClient.putToken(JSON.stringify({ data }));
				}
			} else {
				Toast.fail('验证失败，请稍后重试', 3, null, false);
			}
		}).catch(e => {
			Toast.fail('验证失败，请稍后重试', 3, null, false);
		});
	}

	freeLogin = () => {
		CpService.freeLogin(this.state.mobile, this.clientId).then(data => {
			const code = data.code;
			console.log(data)
			if (code === STATUS_SUCCESS) {
				this.setState({
					loading: false
				})
				if (global.tsmClient) {
					global.tsmClient.putToken(JSON.stringify({ data }));
				}
			} else {
				Toast.fail('验证失败，请稍后重试', 3, null, false);
			}
		}).catch(e => {
			Toast.fail('验证失败，请稍后重试', 3, null, false);
		});
	}

	tick = () => {
		this.seconds = this.seconds - 1;
		this.setState({
			btnText: this.seconds
		});
		if (this.seconds === 0) {
			clearInterval(this.timerID);
			this.seconds = 60;
			this.setState({
				sended: false,
				btnText: '发送'
			});
		}
	}

	sendCode = () => {
		this.setState({
			sended: true
		});
		this.timerID = setInterval(() => {
			this.tick();
		}, 1000);
		CpService.sendCode(this.state.mobile).then(resp => {
			const code = resp.code;
			if (code === STATUS_SUCCESS) {
				this.exists = resp.data && JSON.parse(resp.data).exists;
				Toast.success('发送成功，请注意查收', 3, null, false);
			} else {
				Toast.fail(`${resp.message}`, 3, null, false);
			}
		}).catch(e => {
			Toast.fail('发送失败，请稍后重试', 3, null, false);
		});
	}

	handleChange = (value) => {
		this.setState({
			mobile: value
		});
	}

	handleCodeChange = (value) => {
		this.setState({
			code: value
		});
	}

	render() {
		const smk = getCityTitle(global.csConf.cityId);

		return (
			<DocumentTitle title='验证'>
				<div>
					<Navigator title={smk} close='shut' />
					{
						(!this.state.isMobile) &&
						<Loading loading={this.state.loading}>
						</Loading>
					}
					{
						this.state.isMobile &&
						<List renderHeader={() => '用户验证'}>
							<List.Item>
								<List.Item.Brief>
									<InputItem
										type='phone'
										editable='false'
										disabled='true'
										value={this.state.mobile}
									>手机号</InputItem>
								</List.Item.Brief>
							</List.Item>
							<List.Item>
								<List.Item.Brief>
									<InputItem
										placeholder="请输入验证码"
										value={this.state.code}
										onChange={this.handleCodeChange}
									>验证码</InputItem>
									<div className={styles.sendBtn}>
										<Button type="ghost" size="small" inline disabled={!this.state.mobile || this.state.sended} onClick={this.sendCode}>{this.state.btnText}</Button>
									</div>
								</List.Item.Brief>
							</List.Item>
							<List.Item>
								<div style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}>
									<Button type='primary' size='large' disabled={!this.state.code || !this.state.mobile} onClick={this.handleClick}>确认</Button>
								</div>
							</List.Item>
						</List>
					}
				</div>
			</DocumentTitle>
		);
	}
}

export default VerifyPage;
