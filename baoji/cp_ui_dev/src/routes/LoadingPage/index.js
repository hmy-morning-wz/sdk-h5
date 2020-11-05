import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Loading } from '../../components';
import CpService from '../../services/cpService';
import CardStatus from '../../utils/CardStatus';
import { getCityTitle } from '../../utils/CityConf';

class LoadingPage extends React.Component {
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
		const { system_id, auth_code } = global.csConf;
		CpService.ouath(system_id, auth_code).then((resp) => {
			const {code, msg, data: user} = resp;			
			if (code == 200) {											
				if (global.tsmClient) {
					global.tsmClient.putToken(JSON.stringify(resp));
				}				
				CpService.getCard().then(ret => {
					const {code, msg, data: card} = ret;
					if (card.cardNo && CardStatus.hasCard(card.status)) {
						dispatch({ type: 'card/showMyCard', payload: { data: card, page: '/main' } });
					} else {
						dispatch({ type: 'card/showIdentityInfo', payload: { data: {name: user.custName, identityId: user.certNo}, page: '/register' } });
					}
				});
			} else {
				dispatch(routerRedux.replace({
					pathname: '/error',
					query: {code: code, message: msg, back: '/loading'}
				}));
			}
		});		
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

export default connect()(LoadingPage);
