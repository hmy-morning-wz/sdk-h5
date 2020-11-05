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

const MyImg = src => <img src={src} className="am-icon am-icon-md" style={{width: '1.2rem', height: '1.2rem'}} alt="" />;
const alert = Modal.alert;
const itemList = [
  '发起退卡申请后，卡片锁定无法再使用，此时可以主动撤回退卡申请。',
  '7个工作日交易清算后，进行人工审核。',
  '人工审核通过后，进入退卡受理，此时起退卡流程不能再中止、撤回。',
  '3个工作日财务结算后，系统自动完成余额退款，退卡完成，回到卡片申领页面。'
]
class RevokeCardPage extends React.Component {

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
    const dispatch = this.props.dispatch;
    const doRollback = () => {
      if (this.state.hasTaped) {
        return;
      }
      this.setState({
        hasTaped: true,
      });
      CpService.revokeCard(0).then(autoErrorPage(dispatch, ( {data} ) => {
        if (data.ret_code === '0') {
          dispatch(routerRedux.replace('/revokeOk'));
        } else {
          const warnAlert = Modal.alert('撤回失败!', data.ret_msg, [
            {
              text: '我知道了',
              onPress: () => {
                warnAlert.close();
              },
              style: { fontWeight: 'bold' },
            }
          ]);
        }
      }));
    };

    const day = getAuditCycle(global.csConf.cityId);
    const status = (this.state.card && this.state.card.status) || -1;
    const buildStatus = () => {
      switch(status) {
        case CardStatus.ACTIVE:
          return '您的退卡申请处理失败';
        case CardStatus.UNREGISTING:
          return `我们将在${day}个工作日内审核您的退卡申请，完成审核后卡内余额将在3个工作日内退回到您的支付账户`;
        case CardStatus.UNREGISTED:
          return '您的卡片已经退卡完成';
        case CardStatus.FREEZED:
          return '您的卡片已被冻结';
        case CardStatus.REFUNDING:
          return '正在退回您的账户余额';
        case CardStatus.FAILED_REVOKE:
          return '对不起，退卡失败';
        default:
          return '您的卡片退卡情况未知';
      }
    }
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
            <StepBar activeBar={1} active='doing'></StepBar>
            <StepBar activeBar={2} active='todo'></StepBar>
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
              <div className={`${styles.content} ${styles.tips}`}>卡片已锁定，交易清算中</div>
              <div ref='cardImg' className={styles.blue}></div>
            </div>

            <ul className={styles.allItem}>
              {
                itemList.map( (item,index) => {
                  return (
                      <li className={`${styles.eachItem}`} key={index}>{item}</li>
                  )
                })
              }
            </ul>
            <div className={styles.bottomPa}>
              <Button onClick={doRollback} type="ghost" className={styles.btn} activeClassName={styles.btnActive}
              disabled={
                status == CardStatus.UNREGISTED 
                || status == CardStatus.REFUNDING 
                || status == CardStatus.FREEZED 
                || status == CardStatus.FAILED_REVOKE
                || this.state.hasTaped}>
                撤回申请
              </Button>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect()(RevokeCardPage);
