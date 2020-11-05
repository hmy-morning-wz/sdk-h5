import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Navigator } from '../../components';
import { Button, Result, Icon, WhiteSpace } from 'antd-mobile';
import styles from './styles.less';
import { getCityTitle } from '../../utils/CityConf';

const HOME_PAGE = '/main';

class ErrorPage extends React.Component {
	render() {
		const { code, message, back } = this.props.location.query;

		const goPage = back || HOME_PAGE;

		const onClick = () => {
			this.props.dispatch(routerRedux.replace(goPage));
		};

		const smk = getCityTitle(global.csConf.cityId);

		return (
			<DocumentTitle title={smk}>				
				<div>
					<Navigator title={smk} path={HOME_PAGE} />
					<div style={{marginTop: '150px'}}>
						<Result
							img={<Icon type="cross-circle-o" className={styles.icon} style={{ fill: '#F13642' }} />}
							title={`错误码: ${code}`}
							message={message}
						/>
						<WhiteSpace />
						<Button onClick={onClick}>返回</Button>
					</div>
				</div>
			</DocumentTitle>
			);
	}
}

export default connect()(ErrorPage);
