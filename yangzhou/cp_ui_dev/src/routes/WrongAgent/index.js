import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import styles from './styles.less';
import { getCityTitle } from '../../utils/CityConf';


class WrongAgent extends React.Component {
	render() {

		const smk = getCityTitle(global.csConf.cityId);

		return (
			<DocumentTitle title={smk}>				
				<div>
					<div className={styles.mes}>请在移动端打开</div>
				</div>
			</DocumentTitle>
			);
	}
}

export default connect()(WrongAgent);
