import React from 'react';
import DocumentTitle from 'react-document-title';
import { WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'dva';
import { Loading, Navigator } from '../../components';
import config from '../../utils/config';
import { getCityLogo } from '../../utils/CityConf';
import styles from './styles.less';

class RegisterResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 200);
	}

	render() {
		const showCard = () => {
			this.props.dispatch({ type: 'card/applyCard', payload: { page: '/main' } });
		};

		const logo = () => { 
			return `${config.cdnHost}/images/${getCityLogo(global.csConf.cityId)}`;
		}

		return (
			<DocumentTitle title="领卡成功">
				<Loading loading={this.state.loading}>
					<Navigator title='领卡成功' close='shut' hideRN />
					<div className={styles.win}>
						<div className={styles.tips}>
							<p style={{fontSize: '52px', color: '#1A1F26'}}>领取成功</p>
						</div>
						<div name="卡片" className={styles.card} style={{ backgroundImage: `url(${logo()})` }} />
						<WingBlank size="lg">
							<div name="按钮" className={styles.btnDiv}>
								<Button className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={showCard}>查看卡片</Button>
							</div>
						</WingBlank>
					</div>
				</Loading>
			</DocumentTitle>
			);
	}
}

export default connect()(RegisterResult);
