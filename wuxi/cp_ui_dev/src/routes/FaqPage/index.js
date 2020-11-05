import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Accordion, WingBlank, WhiteSpace, Checkbox, Modal , Button} from 'antd-mobile';
import { Navigator } from '../../components';
import styles from './styles.less';
import config from '../../utils/config';

const footer = {
	position: "fixed",
	bottom: 0,
	zIndex: 999,
	width: "100%",
	background:"#FFF",
	boxShadow: "0 -1px 0 0 #D2D2D2, 0 -1px 20px 0 rgba(0,0,0,0.07)",
	fontFamily: "PingFangSC-Regular",
	fontSize: "0.28rem",
	color: "#A2A2A2",
	lineHeight: "0.44rem",
	textAlign: "center"
}

const AgreeItem = Checkbox.AgreeItem;

class FaqPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			agreementVisiable: false,
			agreeProtocol: false,
			protocolLink: '',
		};
	}

	showProtocol = (e, link) => {
		e.preventDefault();
        this.setState({
        	agreementVisiable: true,
        	protocolLink: link,
        });
	}

	render() {
		const toRange = () => {
			this.props.dispatch(routerRedux.push('/line'));
		};

		return (
			<DocumentTitle title="使用须知">
					<div>
						<Navigator title='使用须知' />
						<div style={{marginTop: '14%'}}>
							<Accordion accordion >
								{ global.csConf.question.map((item, index) => {
									return (
										<Accordion.Panel header={item.question} accordion key={index}>
											<WingBlank size="md">
												<div style={{
													padding: '30px 0px 60px 0px',
													lineHeight: '64px'
												}}>
													{item.answer}
												</div>
											</WingBlank>
										</Accordion.Panel>
									);
								})}
							</Accordion>
						</div>
						<div title="当前行程按钮" style={footer}>
							<WingBlank size="lg">
								<WhiteSpace size="lg" />
							<div>
					          <span onClick={toRange}>使用范围</span>
					          |
					          <span onClick={e => this.showProtocol(e, `${config.cdnHost}${global.csConf.protocol[0].link}`)}>服务协议</span>
					        </div>
								<WhiteSpace size="lg" />
							</WingBlank>
						</div>
						<Modal
            			style={{ width: '90%' }}
            			transparent
            			maskClosable={false}
            			visible={this.state.agreementVisiable}
          			>
            			<div className={styles.agreementDiv}>
              				<iframe className={styles.agreementFrame} src={this.state.protocolLink} width="100%" />
            			</div>
            			<WhiteSpace size="lg" />
            			<Button type="primary"
              				onClick={() => this.setState({ agreementVisiable: false })}
            			>
              				确定
            			</Button>
          			</Modal>
					</div>     
				</DocumentTitle>
			);
	}
}

const mapStateToProps = () => {
  return {
    faq: global.csConf.question,
  };
};

export default connect(mapStateToProps)(FaqPage);
