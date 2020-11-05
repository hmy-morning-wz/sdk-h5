import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import { List, ListView, DatePicker } from 'antd-mobile';
import { Loading, Navigator } from '../../components';
import styles from './styles.less';
import Utils from '../../utils/Utils';
import config from '../../utils/config';
import { autoErrorPage } from '../../utils/RequestHelper';
import CpService from '../../services/cpService';

/** 每页数据行数 */
const PAGE_SIZE = 10;
/** 当前页加载页码. */
let pageIndex = 0;

function ListViewBody(props) {
	return (
		<div className="am-list-body my-body">
			{props.children}
		</div>
		);
}

const Icon = (imgSrc) => {
	return (<img src={imgSrc} style={{width: "0.74rem", height: "0.75rem"}} />);
}

class TravelRecordPage extends React.Component {
	constructor(props) {
		super(props);

		this.initListView(moment(), true);
	}

	componentDidMount() {
		this.loadOnPageFromAjax(0, this.state.month);
	}

	initListView(date, isCreate) {
		const { back } =  this.props.location.query || '';

		const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
		const getRowData = (dataBlob, section, rowID) => dataBlob[rowID];
		const dataSource = new ListView.DataSource({
			getRowData,
			getSectionHeaderData: getSectionData,
			rowHasChanged: (prevRowData, nextRowData) => prevRowData !== nextRowData,
			sectionHeaderHasChanged: (prevSectionData, nextSectionData) => prevSectionData !== nextSectionData
		});
		this.dataBlob = {};
		this.sectionIDs = [];
		this.rowIDs = [];
		pageIndex = 0;

		if (isCreate) {
			this.state = {
				dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
				isLoading: true,
				loading: false,
				hasMore: true,
				month: date,
				itemNum: 0,
				back
			};
		} else {
			this.setState({
				dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
				isLoading: true,
				loading: false,
				hasMore: true,
				month: date,
				itemNum: 0,
				back
			});
		}
	}

	/* 页面到底触发 */
	onEndReached = () => {
		if (this.state.isLoading || this.state.hasMore) {
			return;
		}
		this.loadOnPageFromAjax(pageIndex += 1, this.state.month);
	};

	loadOnPageFromAjax(pageId, month) {
		CpService.loadTravelRecord(pageId, PAGE_SIZE, month.format('YYYY-MM-DD')).then(autoErrorPage(this.props.dispatch, (resp) => {
			const data = resp.data;
			const sectionName = `Section ${pageId}`;
      		this.sectionIDs.push(sectionName);
      		this.dataBlob[sectionName] = sectionName;
      		this.rowIDs[pageId] = [];
      		for (let jj = 0; jj < data.length; jj += 1) {
        		const rowName = `S${pageId}, R${jj}`;
        		this.rowIDs[pageId].push(rowName);
        		this.dataBlob[rowName] = data[jj];
      		}
      		// new object ref
      		this.sectionIDs = [].concat(this.sectionIDs);
      		this.rowIDs = [].concat(this.rowIDs);
      		this.setState({
        		dataSource:
        		this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        		isLoading: false,
        		hasMore: (data.length > PAGE_SIZE),
        		itemNum: (this.state.itemNum + data.length),
      		});
		}));
	}

	onDateChange(date) {
		this.initListView(date, false);
		this.loadOnPageFromAjax(0, date);
	}

	render() {
		const DatePickerConf = {
			mode: 'month',
			value: moment(),
			maxDate: moment(),
			minDate: moment().subtract(1, 'year'),
			onChange: this.onDateChange.bind(this)
		};

		const renderFooter = ()=> {
			if (this.state.isLoading) {
				return (
					<div style={{ padding: 40, textAlign: 'center' }}>
						<embed src={`${config.cdnHost}/svg/loading.svg`} width="100" height="100" type="image/svg+xml" />
					</div>
					);
			}
		};

		const detailInfo = (item) => {
			return () => {
				this.props.dispatch({ type: 'card/showTravelDetail', payload: { data: item, page: '/travelDetail' } });
			};
		};

		const renderRow = (rowData) => {
			return (
				<div>
					<List>
						<List.Item 
							thumb={ Icon(global.csConf.cdnHost + global.csConf.traveListIcon) }  
							arrow="horizontal" extra={`-${Utils.formatRMBYuan(rowData.amount)}`} 
							onClick={detailInfo(rowData)}>
						<span className={styles.lingNo}>
							{rowData.lineName }
							{
								(rowData.chargeType == 3) ? <span className={styles.creditImg}
								style={{backgroundImage:`url(${config.cdnHost}/images/credit.png)`}}></span> : ''
							}
						</span>
						<List.Item.Brief><span style={{fontSize: '0.24rem', color: '#A2A2A2',fontFamily: 'PingFangSC-Regular'}}> {rowData.bizTime} </span></List.Item.Brief>
						</List.Item>
					</List>
				</div>
			);
		};

		return (
			<DocumentTitle title="乘车记录">
				<div>
					<Loading loading={this.state.loading}>
						<Navigator title='乘车记录' close={this.state.back} />
						<div className={styles.contain}>
							<DatePicker {...DatePickerConf}>
								<div className={styles.monthLabel}>
									<div className={styles.floatLeft}>{this.state.month.format('YYYY-M')}</div>
									<div className={styles.floatRight}>
										<img alt="DateIcon" src={`${global.csConf.cdnHost}/images/320200/jilu@3x.png`} />
									</div>
									<div className={styles.clearLine} />
								</div>
							</DatePicker>
							<ListView
								dataSource={this.state.dataSource}
								renderFooter={renderFooter}
								renderBodyComponent={ () => <ListViewBody /> }
								renderRow={renderRow}
								style={{
									height: global.document.documentElement.clientHeight - 180
								}}
								pageSize={10}
								scrollRenderAheadDistance={1}
								scrollEventThrottle={1}
								onEndReached={this.onEndReached}
								onEndReachedThreshold={10}
							>
								{
									(this.state.itemNum === 0 && !this.state.isLoading) ? <div className={styles.nodata}><img src={`${global.csConf.cdnHost}/images/610300/recordnone.png`} alt="No Data" /><p>暂时还没有内容哦~</p></div> : ''
								}
							</ListView>
						</div>
					</Loading>
				</div>
			</DocumentTitle>
			);
	}
}

export default connect()(TravelRecordPage);
