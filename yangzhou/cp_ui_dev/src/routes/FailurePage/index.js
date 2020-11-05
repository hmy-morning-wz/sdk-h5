import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Navigator } from '../../components';
import { getCityTitle } from '../../utils/CityConf';
import config from '../../utils/config';

const HOME_PAGE = '/main';
const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

class FailurePage extends React.Component {
	render() {

		const smk = getCityTitle(global.csConf.cityId);

		return (
			<DocumentTitle title={smk}>				
				<div>
					<Navigator title='退卡申请' path={HOME_PAGE} />
					<div style={{marginTop: '2.5rem', textAlign:"center",fontFamily: 'PingFangSC-Regular'}}>
						
						<div style={{margin: "0 auto", width: '23%', textAlign:"center"}}>
							<img style={{width: '100%'}} src={`${config.cdnHost}/images/refundError.png`} />
						</div>
						<div style={{fontSize: '0.32rem',color: '#505064',lineHeight: '0.84rem', marginTop:'0.2rem'}}>退款失败</div>
						<div style={{fontSize: '0.3rem',color: '#919191'}}>错误码: 500</div>
						<div style={{fontSize: '0.28rem',color: '#a2a2a2',lineHeight: '0.44rem', position:'fixed', bottom:'0.25rem', width:"100%"}}>
							联系客服：<span style={{color: '#409eff'}}>0571-87113360</span>
						</div>

					</div>
				</div>
			</DocumentTitle>
			);
	}
}

export default connect()(FailurePage);
