import React from 'react';
import DocumentTitle from 'react-document-title';
import { WingBlank, WhiteSpace, Button, Modal, } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Loading, Navigator } from '../../components';
import config from '../../utils/config';
import styles from './styles.less';
import CpService from '../../services/cpService';
import { autoErrorPage } from '../../utils/RequestHelper';

const alert = Modal.alert;
let alertFunc = ''
window.addEventListener('hashchange', () => {
	if(alertFunc) {
		alertFunc.close()
	}
})
class CurrentTripPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			hasTrip: false,
			currentTripItems: ''
		};
	}


	componentDidMount() {
		this.getCurrentTrip()
	}
	
	getCurrentTrip() {
		CpService.getCurrentTrip().then(autoErrorPage(this.props.dispatch, (resp) => {
			if(resp.data && resp.data.tripNo){
				this.setState({
					hasTrip: true,
					loading: false,
					currentTripItems: JSON.parse(sessionStorage.currentTrip)
				})
			} else {
				this.setState({
					hasTrip: false,
					loading: false,
					currentTripItems: JSON.parse(sessionStorage.currentTrip)
				})
			}
			
		}))
	}

	render() {

		const toClaim = (mode) => {
			// this.props.dispatch(routerRedux.push('/recharge'));
			let title = '我已出站';
			let desc = '因故人工出站，未正常扫码出站的，需要通过出站补登操作完成当前行程。注意，出站补登会完结当前行程并正常扣费，请务必确认你已经出站，谨慎操作。';
			if (mode == 1) {
				title = '我已进站';
				desc = '因故人工进站，未正常扫码进站的，需要通过进站补登操作完成当前行程。注意，进站补登会完结当前行程并正常扣费，请谨慎操作。';
			}
			alertFunc = alert(title, desc, [
				{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
				{ text: '确定', onPress: () => {this.props.dispatch(routerRedux.push('/claim'))} },
			])
		}		
		const toRecord = () => {
			this.props.dispatch(routerRedux.push('/travelRecord'));
		}
		const useQr = () => {
			if (global.tsmClient) {
				global.tsmClient.showQRcode();
			}
		}
		return (
			<DocumentTitle title="当前行程">
				<Loading loading={this.state.loading}>
					<Navigator title='当前行程' />

					{
						this.state.hasTrip &&
						<div className={styles.outerBan} style={{marginTop:"6%"}}>
							<div className={styles.header} style={{width:"93%", margin:"0 auto"}}>
								<div className={styles.logoBan}>
									<img style={{width:"0.78rem",height:"0.78rem"}} src={`${global.csConf.cdnHost}/images/logo@3x.png`} />
									<span style={{marginLeft:"0.2rem"}}>地铁
									{this.state.currentTripItems.claimMode == 1 ? this.state.currentTripItems.outLineName : this.state.currentTripItems.inLineName}
									</span>
								</div>

								<div>
									<img style={{width:"100%"}} src={`${global.csConf.cdnHost}/images/background@3x.png`} />
								</div>

								<div className={styles.inBan}>
									<div className={styles.twoBan}>
										<div className={styles.inTime}>{this.state.currentTripItems.claimMode == 1 ? "出" : "进"}站时间</div>
										<div className={styles.inTimeVal}>
											{this.state.currentTripItems.claimMode == 1 ? this.state.currentTripItems.outTime : this.state.currentTripItems.inTime}
										</div>
									</div>
									<div className={styles.twoBan2}>
										<div className={styles.inTime}>{this.state.currentTripItems.claimMode == 1 ? "出" : "进"}站站点</div>
										<div className={styles.inTimeVal}>
											{this.state.currentTripItems.claimMode == 1 ? this.state.currentTripItems.outStationName : this.state.currentTripItems.inStationName}											
										</div>
									</div>
								</div>

							</div>

							<div title="出站或补登" className={styles.footer}>
								<WingBlank size="lg">
									<WhiteSpace size="lg" />
									<Button className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={useQr}>扫码进站</Button>
									<WhiteSpace size="lg" />
									<Button className={styles.btn2} activeClassName={styles.btnActive} type="primary" onClick={() => toClaim(this.state.currentTripItems.claimMode)}>我已{this.state.currentTripItems.claimMode == 1 ? "进" : "出"}站</Button>
									<WhiteSpace size="lg" />
									<div>
					          <a className={styles.foot} onClick={toRecord}>乘车记录</a>
					        </div>
								</WingBlank>
							</div>
						</div>
					}

					{
						!this.state.hasTrip &&
						<div style={{marginTop:"15%"}}>
							<div className={styles.nodata}>
								<img src={`${global.csConf.cdnHost}/images/img_nothing.png`} alt="No Data" />
								<p>暂无行程</p>
							</div>
						</div>
					}
					
				</Loading>
			</DocumentTitle>
			);
	}
}

export default connect()(CurrentTripPage);
