import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { Accordion, WingBlank } from 'antd-mobile';
import { Navigator } from '../../components';

const FaqPage = ({ faq }) => {
	return (
		<DocumentTitle title="帮助">
			<div>
				<Navigator title='帮助' />
				<div style={{marginTop: '120px'}}>
					<Accordion accordion >
						{ faq.map((item, index) => {
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
