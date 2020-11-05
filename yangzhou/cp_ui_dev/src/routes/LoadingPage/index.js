import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Loading } from '../../components';
import { autoErrorPage } from '../../utils/RequestHelper';
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
		CpService.getCard().then(autoErrorPage(this.props.dispatch, ({ data }) => {
			this.setState({
				loading: false
			});
			if (data && data.source === 'app' && data.cardNo && CardStatus.hasCard(data.status)) {
				this.props.dispatch({ type: 'card/showMyCard', payload: { data, page: '/main' } });
			} else {
				this.props.dispatch({ type: 'card/showIdentityInfo', payload: { data, page: '/register' } });
			}
		}));
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
