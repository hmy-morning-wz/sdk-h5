import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { List, SearchBar, Result } from 'antd-mobile';
import { Loading, Navigator } from '../../components';
import styles from './styles.less';
import { autoErrorPage } from '../../utils/RequestHelper';
import CpService from '../../services/cpService';
import config from '../../utils/config';

const MyImg = src => <img src={src} className="am-icon am-icon-md" style={{width: '1.2rem', height: '1.2rem'}} alt="" />;

class LinePage extends React.Component {
	constructor(props) {
		super(props);

		const { back } =  this.props.location.query || '';
		this.state = {
			loading: true,
			keyword: null,
			openLines: [],
			back
		};
	}

	componentDidMount() {
    	CpService.loadOpenLines().then(autoErrorPage(this.props.dispatch, (data) => {
    		this.setState({
    			loading: false,
    			openLines: data.data
    		});
    	}));
    	// this.node.scrollIntoView();
  	}

	render() {
		const kw = this.state.keyword ? this.state.keyword.trim() : null;

		const cityLines = this.state.openLines;
		const lines = cityLines.filter( (line) => {
			const test = (word) => {
				return word.toString().indexOf(kw) >= 0;
			};

			return kw == null || test(line.lineNo)|| test(line.lineFrom) || test(line.lineTo);
		} );

		const onChange =(val) => {
			this.setState({
				keyword: val
			});
		}

		const buildNo = () => {
			if (kw && kw.replace(/\s+/g, '').length > 0) {
				return (
					<div style={{marginTop: '120px'}}>
						<div className={styles.fix}>
							<SearchBar placeholder='请输入线路信息' onChange={onChange} />
						</div>
						<div style={{paddingTop: '340px'}}>
							<Result
								className={styles.noData}
		          				img={MyImg(`${config.cdnHost}/images/no_lines.png`)}
		          				title='没有符合条件的线路'
		          				message=''
		        			/>
		    			</div>
		    		</div>
				);
			}
			return (
				<div style={{marginTop: '200px'}}>
					<div style={{paddingTop: '240px'}}>
						<Result
							className={styles.noData}
	          				img={MyImg(`${config.cdnHost}/images/no_lines.png`)}
	          				title='暂无结果'
	          				message=''
	        			/>
	    			</div>
	    		</div>
			);
		}
		const buildData = () => {
			return (
				<div style={{marginTop: '120px'}}>
					<div className={styles.fix}>
						<SearchBar placeholder='请输入线路信息' onChange={onChange} />
					</div>
					<div className={styles.topMargin} ref={(node) => { this.node = node; }}>
						<List>
							{lines.map( (line) => {
								return (
									<List.Item key={line.lineNo}>
										{line.lineNo}
										<List.Item.Brief>{line.lineFrom} - {line.lineTo}</List.Item.Brief>
									</List.Item>
								);
							})}
						</List>
					</div>
				</div>
			);
		}

		return (			
			<DocumentTitle title="使用范围">
				<Loading loading={this.state.loading}>
					<Navigator title='使用范围' close={this.state.back} />					
					{ lines && lines.length > 0 ? buildData() : buildNo() }					
				</Loading>
			</DocumentTitle>
		);
	}
}

export default connect()(LinePage);
