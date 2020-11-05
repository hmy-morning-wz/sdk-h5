import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { Accordion, WingBlank } from 'antd-mobile';
import { Navigator,StepBar } from '../../components';
import styles from './styles.less';

const syyy = {
	// color : "blue"
}

const FaqPage = ({ faq }) => {
	return (
		<DocumentTitle title="帮助">
			<div>
				<Navigator title='帮助' />
				<div style={{marginTop: '16.5%'}}>					
				</div>
		
				<div>
					{ faq.map((item, index) => {
								return (
									<div className={styles.qaItem} key={index}>
										<div className={styles.question}>Q:{item.question}</div>
										<div className={styles.answer}><div>A:&nbsp;</div> 
											<div>{item.answer}</div>
										</div>
									</div>
								);
							})}
				</div>
			</div>     
		</DocumentTitle>
	);
};

const mapStateToProps = () => {
  return {
    faq: global.csConf.question,
  };
};

export default connect(mapStateToProps)(FaqPage);
