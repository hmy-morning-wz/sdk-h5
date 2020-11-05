import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Modal, Result, Icon, WhiteSpace, WingBlank } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import { Navigator,StepBar } from '../../components';
import { autoErrorPage } from '../../utils/RequestHelper';
import CpService from '../../services/cpService';
import CardStatus from '../../utils/CardStatus';
import { getAuditCycle } from '../../utils/CityConf';
import styles from './styles.less';

const alert = Modal.alert;
const itemList = [
  '发起退卡申请后，卡片锁定无法再使用，此时可以主动撤回退卡申请。',
  '7个工作日交易清算后，进行人工审核。',
  '人工审核通过后，进入退卡受理，此时起退卡流程不能再中止、撤回。',
  '3个工作日财务结算后，系统自动完成余额退款，退卡完成，回到卡片申领页面。'
]
class RefundStepThree extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: null,
      hasTaped: false,
    };
  }

  componentDidMount() {
    CpService.getCard().then(autoErrorPage(this.props.dispatch, (data) => {
      this.setState({
        card: data.data
      });
    }));
  }

  render() {
    const status = (this.state.card && this.state.card.status) || -1;

    const classNames1 = `${styles.bgBlur} ${styles.cardBan}`
    return (
      <DocumentTitle title="退卡申请">
        <div>
          <Navigator title='退卡申请' />
          <div style={{marginTop: '15.5%'}}>
            <div style={{display: 'flex', margin: '0 auto',width: '83%',justifyContent: 'space-around'}}>
            <div className={styles.textInfo2}>7个工作日</div>
            <div className={styles.textInfo2}>3个工作日</div>
          </div>
          <div style={{display: 'flex', margin: '0 auto',width: '83%',justifyContent: 'space-between'}}>
            <StepBar activeBar={1} active='done'></StepBar>
            <StepBar activeBar={2} active='doing'></StepBar>
            <StepBar activeBar={3} active='todo' last={true}></StepBar>
          </div>
          <div style={{display: 'flex', margin: '0 auto',width: '88%',justifyContent: 'space-between'}}>
            <div className={styles.textInfo}>退卡申请</div>
            <div className={styles.textInfo}>人工审核</div>
            <div className={styles.textInfo}>系统退款</div>
          </div>

            <WhiteSpace />
            <div className={styles.card}>
              {/* <div className={classNames1}></div> */}
              <img className={classNames1} src={`${global.csConf.cdnHost}/images/610300/kamian.png`} />
              <div className={`${styles.content} ${styles.tips}`}>退卡已受理，财务结算中</div>
              <div ref='cardImg' className={styles.blue}></div>
            </div>

            <ul className={styles.allItem}>
              {
                itemList.map( (item,index) => {
                  return (
                      <li className={`${styles.eachItem} ${index===2 && styles.boldItem}`} key={index}>{item}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect()(RefundStepThree);
