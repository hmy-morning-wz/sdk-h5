import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import { List, ListView, DatePicker } from 'antd-mobile';
import { Loading } from '../../components';
import styles from './styles.less';

function ListViewBody(props) {
	return (
		<div className="am-list-body my-body">
			{props.children}
		</div>
		);
}

class RecordPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
		this.initListView(moment(), true);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 5000);
	}

	initListView(date, isCreate) {
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
				hasMore: true,
				month: date,
				itemNum: 0
			};
		} else {
			this.setState({
				dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
				isLoading: true,
				hasMore: true,
				month: date,
				itemNum: 0
			});
		}
	}

	/* 页面到底触发 */
	onEndReached = () => {
		if (this.state.isLoading || !this.state.hasMore) {
			return;
		}
		this.loadOnPageFromAjax(pageIndex += 1, this.state.month);
	};

	loadOnPageFromAjax(pageId, month) {

	}

	onDateChange(date) {
		this.initListView(date, false);
		this.loadOnPageFromAjax(0, date);
	}

	render() {
		const DatePickerConf = {
			mode: 'month',
			maxDate: moment(),
			minDate: moment().substract(1, 'year'),
			onChange: this.onDateChange.bind(this)
		};

		const renderFooter = ()=> {
			if (this.state.isLoading) {
				return (
					<div style={{ padding: 40, textAlign: 'center' }}>
						<embed src={'/svg/loading.svg'} width="100" height="100" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install" />
					</div>
					);
			}
		};

		const renderRow = (rowData) => {
			return (
				<div>
					<List>
						<List.Item arrow="horizontal" extra={renderPayBtn(rowData)}>
						充值 <List.Item.Brief> {rowData.gmtCreate} </List.Item.Brief>
						</List.Item>
					</List>
				</div>
			);
		};

		return (
			<DocumentTitle title="记录">
				<div>
					<Loading loading={this.state.loading}>
						<DatePicker {...DatePickerConf}>
							<div className={styles.monthLabel}>
								<div className={styles.floatLeft}>{this.state.month.format('YYYY年MM月')}</div>
								<div className={styles.floatRight}>
									<img alt="DateIcon" src={'/images/calendar70.png'} />
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
								height: global.document.documentElement.clientHeight
							}}
							pageSize={10}
							scrollRenderAheadDistance={1}
							scrollEventThrottle={1}
							onEndReached={this.onEndReached}
							onEndReachedThreshold={10}
						>
							{
								(this.state.itemNum === 0 && !this.state.isLoading) ? <div className={styles.nodata}><img src={'/images/img_nothing.png'} alt="No Data" /><p>暂无数据</p></div> : ''
							}
						</ListView>
					</Loading>
				</div>
			</DocumentTitle>
			);
	}
}

export default connect()(RecordPage);
