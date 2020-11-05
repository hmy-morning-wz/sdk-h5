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
import PayStatus from '../../utils/PayStatus';
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

class PayRecordPage extends React.Component {
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
		CpService.loadPayRecord(pageId, PAGE_SIZE, month.format('YYYY-MM-DD')).then(autoErrorPage(this.props.dispatch, (resp) => {
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
      		// global.console.log(`------>${this.state.itemNum + data.length}`);
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
				this.props.dispatch({ type: 'card/showRechargeDetail', payload: { data: item, page: '/payDetail' } });
			};
		};

		const renderRow = (rowData) => {
			return (
				<div>
					<List>
						<List.Item 
							thumb={ Icon(global.csConf.cdnHost + global.csConf.payListIcon) } 
							arrow="horizontal" 
							extra={renderPayAmt(rowData)} onClick={detailInfo(rowData)}>
							<span className={styles.payTip}>充值</span> 
							<List.Item.Brief><span style={{fontSize: '0.25rem'}}> {rowData.createTime} </span></List.Item.Brief>
						</List.Item>
					</List>
				</div>
			);
		};

		const renderPayAmt = (rowData) => {
			switch (rowData.status) {
				case PayStatus.SUCCESS:
				  return (
					<p>					  
					  <span>{Utils.formatRMBYuan(rowData.rechargeAmt)}  元</span>
						<span className={styles.paied}>已完成</span>
					</p>
				  );
				case PayStatus.REFUND:
				  return (
					<p>
						<span>{Utils.formatRMBYuan(rowData.rechargeAmt)}  元</span>
					  <span className={styles.paied}>{PayStatus.toName(rowData.status)}</span>				
					</p>
				  );
				case PayStatus.ERROR:
				  return (
					<p>
						<span>{Utils.formatRMBYuan(rowData.rechargeAmt)}  元</span>
					  <span className={styles.exc}>{PayStatus.toName(rowData.status)}</span>					  
					</p>
				  );
				case PayStatus.UNPAY:
				  if (rowData.payUrl !== null && rowData.payUrl !== undefined) {
					return (
					  <p>
							<span>{Utils.formatRMBYuan(rowData.rechargeAmt)}  元</span>
							<span className={styles.paying}>待付款</span>						
					  </p>
					);
				  } else {
					return (
					  <p>
							<span>{Utils.formatRMBYuan(rowData.rechargeAmt)}  元</span>
							<span className={styles.closed}>交易关闭</span>						
					  </p>
					);
				  }
				default: 
				  return '';
			  }
		}

		return (
			<DocumentTitle title="充值记录">				
				<div>
					<Navigator title='充值记录' close={this.state.back} />
					<Loading loading={this.state.loading}>
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
								height: global.document.documentElement.clientHeight - 278
							}}
							pageSize={10}
							scrollRenderAheadDistance={1}
							scrollEventThrottle={1}
							onEndReached={this.onEndReached}
							onEndReachedThreshold={10}
						>
							{
								(this.state.itemNum === 0 && !this.state.isLoading) ? <div className={styles.nodata}><img src={`${global.csConf.cdnHost}/images/img_nothing.png`} alt="No Data" /><p>暂无数据</p></div> : ''
							}
						</ListView>
					</Loading>
				</div>
			</DocumentTitle>
			);
	}
}

export default connect()(PayRecordPage);
