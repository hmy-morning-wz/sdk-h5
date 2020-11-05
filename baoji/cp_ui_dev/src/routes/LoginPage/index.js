import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Loading } from '../../components';
import CpService from '../../services/cpService';
import CardStatus from '../../utils/CardStatus';
import { getCityTitle } from '../../utils/CityConf';
import { autoErrorPage } from '../../utils/RequestHelper';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.setState({
			loading: false
		});				
		const dispatch = this.props.dispatch;
		const { system_id, auth_code, page } = global.csConf;
		if (page && page !== 'login') {
			dispatch(routerRedux.replace(`/${page}?back=shut`));
		} 
		else {
			CpService.ouath(system_id, auth_code).then((resp) => {
				const {code, msg, data: user} = resp;			
				if (code == 200) {											
					if (global.tsmClient) {
						global.tsmClient.putToken(JSON.stringify(resp));
					}
					CpService.getCard().then(autoErrorPage(dispatch, (res) => {
						let {data} = res;
						if (data.cardNo && CardStatus.hasCard(data.status)) {						
							dispatch({ type: 'card/showMyCard', payload: { data, page: '/main' } });
						} else {
							dispatch({ type: 'card/showIdentityInfo', payload: { data: {name: user.custName, identityId: user.certNo}, page: '/register' } });
						}
					}));					
				} else {
					dispatch(routerRedux.replace({
						pathname: '/error',
						query: {code: code, message: msg, back: '/loading'}
					}));
				}
			});
		}		
	}

	render() {
		const smk = getCityTitle(global.csConf.cityId);

		return (
			<DocumentTitle title={smk}>
				<Loading loading={this.state.loading}></Loading>
			</DocumentTitle>
		);
	}
}

export default connect()(LoginPage);
