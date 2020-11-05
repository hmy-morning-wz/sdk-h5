import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Modal, WhiteSpace, } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import { Navigator } from '../../components';
import { autoErrorPage } from '../../utils/RequestHelper';
import CpService from '../../services/cpService';
import CardStatus from '../../utils/CardStatus';
import styles from './styles.less';

const alert = Modal.alert;
const itemList = [
  '发起退卡申请后，卡片锁定无法再使用，此时可以主动撤回退卡申请。',
  '7个工作日交易清算后，进行人工审核。',
  '人工审核通过后，进入退卡受理，此时起退卡流程不能再中止、撤回。',
  '3个工作日财务结算后，系统自动完成余额退款，退卡完成，回到卡片申领页面。'
]
class RefundCardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: null,
      hasTaped: false,
      checked: true
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
    const doRefund = () => {
      if (this.state.hasTaped) {
        return;
      }
      this.setState({
        hasTaped: true,
      });
      const revokeIns = alert('退卡', '确定退卡？', [
        { text: '取消', onPress: () => {
          revokeIns.close();
          this.setState({
            hasTaped: false,
      });
        }, style: 'default' },
        { text: '确定', onPress: () => {
          CpService.revokeCard(1).then(autoErrorPage(dispatch, ( {data} ) => {
        if (data.ret_code === '0') {
          dispatch(routerRedux.replace('/revokeCard'));
        } else {
          if (data.ret_code === CardStatus.OVERDRAFT) {
            const warnAlert = Modal.alert('', '您的账户余额为负，暂时无法退卡', [
            {
              text: '我知道了',
              onPress: () => {
                this.setState({
                  hasRevoked: false,
                });
                warnAlert.close();
              },
              style: { fontWeight: 'bold' },
            }
            ]);
          } else {
            dispatch(routerRedux.push({
              pathname: '/error',
              query: {code: 500, message: data.ret_msg}
            }));
          }
        }
      }));
        }, style: 'default'},
    ], 'ios');

    };

    const agreeClick = (e) => {
			this.setState({
				checked: !this.state.checked,
			});
	  }
    const classNames1 = `${styles.bgBlur} ${styles.cardBan}`
    return (
      <DocumentTitle title="退卡申请">
        <div>
          <Navigator title='退卡申请' />
          <div style={{marginTop: '17%'}}></div>
          <div className={styles.containBan}>
            <div className={styles.card}>
              {/* <div className={classNames1}></div> */}
              <img className={classNames1} src={`${global.csConf.cdnHost}/images/610300/kamian.png`} />
              <div className={`${styles.content} ${styles.tips}`}>确定不再使用宝鸡电子公交卡并申请退卡吗？</div>
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
              <div className={styles.agreementBan}>
									<div className={styles.checkIcon} onClick={agreeClick}>
										{!this.state.checked &&
											<div className={styles.uncheck}></div>}
										{this.state.checked &&
											<div className={styles.uncheckk}>
												<img src={`${global.csConf.cdnHost}/images/610300/select@3x.png`} alt="" className={styles.checkedImg}/>
											</div>}
									</div>
									<div className={styles.textItem}>
                  我已阅读并知晓上述退卡流程和注意事项
									</div>
								</div>
              <Button onClick={doRefund} type="ghost" className={styles.btn} activeClassName={styles.btnActive}
              disabled={!this.state.checked}>
                确认退卡
              </Button>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect()(RefundCardPage);
