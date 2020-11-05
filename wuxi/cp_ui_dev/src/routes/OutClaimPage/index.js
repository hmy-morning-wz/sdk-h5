import React from 'react';
import DocumentTitle from 'react-document-title';
import { WingBlank, WhiteSpace, Button, Modal, Menu, ActivityIndicator, NavBar,Toast } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Loading, Navigator } from '../../components';
import config from '../../utils/config';
import styles from './styles.less';
import stationList from './station.json';
import CpService from '../../services/cpService';
import { autoErrorPage } from '../../utils/RequestHelper';

const alert = Modal.alert;
let alertFunc = ''
// const currentTripItems = JSON.parse(sessionStorage.currentTrip)
window.addEventListener('hashchange', () => {
	if(alertFunc) {
		alertFunc.close()
	}
})

class OutClaimPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			initData: '',
			show: true,
			selectValue: ['1',''],
			selectLabel: '',
			currentTripItems: '',
			changeFlag: true
		};
	}
	
	componentDidMount() {
		if(sessionStorage.getItem('currentTrip')) {
			let tripNo = JSON.parse(sessionStorage.getItem('currentTrip'))
			if(tripNo.tripNo) {
				console.log('has')
				this.setState({
					currentTripItems: tripNo
				})
			}			
		} else {
			this.getCurrentTrip()
		}
		CpService.loadStations().then(autoErrorPage(this.props.dispatch, (resp) => {
      // debugger
      let res = this.transResp(resp.data)
      this.setState({
				initData: res
      })
    }))
	}

	getCurrentTrip() {
		CpService.getCurrentTrip().then(autoErrorPage(this.props.dispatch, (resp) => {
			if(resp.data && resp.data.tripNo){
				this.setState({
					currentTripItems: resp.data
				})
			}			
		}))
	}
  
  transResp = (resp) => {
    var resData = JSON.stringify(resp)
    var res = resData.replace(/line_no/g,'value').replace(/station_name/g,'label')
                      .replace(/station_no/g,'value').replace(/line_name/g,'label')
                      .replace(/stations/g,'children')
    res = JSON.parse(res)
    return res
	}
		
	onChange = (value) => {
		this.setState({
			changeFlag: true,
			selectValue: value
		})
		let label = '';
		this.state.initData.forEach((dataItem) => {
			if (dataItem.value === value[0]) {
				label = dataItem.label;
				if (dataItem.children && value[1]) {
					dataItem.children.forEach((cItem) => {
						if (cItem.value === value[1]) {
              label += ` ${cItem.label}`;
              this.setState({
								selectLabel: cItem.label,
								changeFlag: false
							})
						}
					});
				}
			}
		});
		// console.log(label);
	}

	onMaskClick = () => {
    this.setState({
      show: false,
    });
	}

	formatDate = () => {
		var date = new Date()
		var seperator1 = '-'
		var year = date.getFullYear()
		var month = date.getMonth() + 1
		var strDate = date.getDate()
		var hour = date.getHours()
		var second = date.getMinutes()
		if (month >= 1 && month <= 9) {
			month = '0' + month
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = '0' + strDate
		}
		if (hour >= 0 && hour <= 9) {
			hour = '0' + hour
		}
		if (second >= 0 && second <= 9) {
			second = '0' + second
		}
		var currentdate =
			year + seperator1 + month + seperator1 + strDate +' '+ hour + ':' + second
		return currentdate
	}
	
	render() {
		const { initData, show } = this.state
		const menuEl = (
      <Menu
        className="foo-menu"
        data={initData}
        value={this.state.selectValue}
        onChange={this.onChange}
        height={document.documentElement.clientHeight * 0.85}
      />
    )
    const loadingEl = (
      <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.85, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </div>
    )
    const toClaim = () => {
			let time = 250
			if(this.state.changeFlag) {
				time = 600
			}
			Toast.loading();
			setTimeout(() => {
				const subtit = (
					<div className={styles.alertBan}>
						{this.state.currentTripItems.inTime || ''} <br/> 
						{this.state.currentTripItems.inStationName || ''}-{this.state.selectLabel}
					</div>)
				const tit = (<div className={styles.alertTit}>补登行程</div>)
				alertFunc = alert(tit, subtit, [
					{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
					{ text: '确定', onPress: () => {claim()} },
				])
				Toast.hide();
			}, time);
    }
    
    const claim = () => {
			const claimData = {
				"userId": this.state.currentTripItems.userId,
				"tripNo": this.state.currentTripItems.tripNo,
				"fellowNo": this.state.currentTripItems.fellowNo,
				"direction": this.state.currentTripItems.claimMode || "02",
				"lineNo": this.state.selectValue[0],
				"stationNo": this.state.selectValue[1],
				"scanTime": this.state.currentTripItems.outTime,
				"inTime": this.state.currentTripItems.inTime,
				"outTime": this.state.currentTripItems.outTime,
				"qrcodeSource": this.state.currentTripItems.qrcodeSource
			}
      CpService.claim(claimData).then( (resp) => {
				if(resp.code && resp.code === 200){
					this.props.dispatch(routerRedux.push({
						pathname: '/claimOk',
						query: {code: 500, back: '/travelRecord'}
					}))
				} else {
					this.props.dispatch(routerRedux.push({
						pathname: '/claimError',
						query: {code: 500, back: '/currentTrip'}
					}))
				}				
			}).catch(e => {
				this.props.dispatch(routerRedux.push({
					pathname: '/claimError',
					query: {code: 500, back: '/currentTrip'}
				}))
			})
    }
		return (
			<DocumentTitle title={this.state.currentTripItems.claimMode == 1 ? "进站补登" : "出站补登"}>
				<Loading loading={this.state.loading}>
					<Navigator title={this.state.currentTripItems.claimMode == 1 ? "进站补登" : "出站补登"} />

					<div className={styles.outerBan} style={{marginTop:"13%"}}>

						<div style={{borderBottom:"1px solid #a2a2a2",paddingBottom:"22vw"}}>
							<div className={show ? 'menu-active' : ''}>
								{/* <div>
									<NavBar
										leftContent="选择线路"
										mode="light"
										icon={<img src="/images/credit.png" className="am-icon am-icon-md" alt="" />}
										onLeftClick={this.handleClick}
										className="top-nav-bar"
									>
										站点
									</NavBar>
								</div> */}
								{show ? initData ? menuEl : loadingEl : null}
								{show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
							</div>
						</div>

						<div title="出站或补登" className={styles.footer}>
							<WingBlank size="lg">
								<WhiteSpace size="lg" />
								<Button disabled={!this.state.selectValue[1]} className={styles.btn} activeClassName={styles.btnActive} type="primary" onClick={toClaim}>
									确认已{this.state.currentTripItems.claimMode == 1 ? "进" : "出"}站站点
								</Button>
								<WhiteSpace size="lg" />							
							</WingBlank>
						</div>
					</div>
					
				</Loading>
			</DocumentTitle>
			);
	}
}

export default connect()(OutClaimPage);
