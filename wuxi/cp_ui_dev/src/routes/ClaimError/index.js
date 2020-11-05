import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Button, Result, Icon } from 'antd-mobile';
import styles from './styles.less';
import { Navigator } from '../../components';
import config from '../../utils/config';

const HOME_PAGE = '/main';
class ClaimErrorOkPage extends React.Component {
	render() {
		const { code, back } = this.props.location.query;

		const goPage = back || HOME_PAGE;

		const onClick = () => {
			this.props.dispatch(routerRedux.replace(goPage));
		}

		return (
			<DocumentTitle title={'出站补登'}>				
				<div>
					<Navigator title='出站补登' path={HOME_PAGE}  />
					<div style={{marginTop: '2.5rem', textAlign:"center",fontFamily: 'PingFangSC-Regular'}}>
						<div style={{margin: "0 auto", width: '23%', textAlign:"center"}}>
							<Icon type="cross-circle-o" className={styles.icon} style={{ fill: '#fd6565' }} />
						</div>
						<div style={{fontSize: '0.32rem',color: '#505064',lineHeight: '0.84rem', marginTop:'0.2rem'}}>补登失败</div>
						<div style={{fontSize: '0.28rem',color: '#a2a2a2',lineHeight: '0.44rem', position:'fixed', bottom:'0.45rem', width:"100%"}}>
							<Button className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={onClick}>完成</Button>		
						</div>

					</div>
				</div>
			</DocumentTitle>
			);
	}
}

export default connect()(ClaimErrorOkPage);
