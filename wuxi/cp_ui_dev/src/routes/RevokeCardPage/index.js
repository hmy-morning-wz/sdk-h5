import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Modal, Result, Icon, WhiteSpace, WingBlank } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import { Navigator } from '../../components';
import { autoErrorPage } from '../../utils/RequestHelper';
import CpService from '../../services/cpService';
import CardStatus from '../../utils/CardStatus';
import { getAuditCycle } from '../../utils/CityConf';
import styles from './styles.less';

const MyImg = src => <img src={src} className="am-icon am-icon-md" style={{width: '1.2rem', height: '1.2rem'}} alt="" />;

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
      CpService.revokeCard(0).then(autoErrorPage(dispatch, ({ data }) => {
        if (data && data.ret_code === '0') {
          const alertInstance = Modal.alert('撤回成功!', '你可以继续使用公交付款服务', [
            {
              text: '立即查看',
              onPress: () => {
                dispatch(routerRedux.replace('/main'));
                alertInstance.close();
              },
            },
          ]); 
        } else {
          const warnAlert = Modal.alert('撤回失败!', data && data.ret_msg, [
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
          return '您的账户余额为负，请撤回退卡申请，充值使余额为正';
        default:
          return '您的卡片退卡情况未知';
      }
    }

    return (
      <DocumentTitle title="退卡申请">
        <div>
          <Navigator title='退卡申请' />
          <div style={{marginTop: '120px'}}>
            <Result
              img={MyImg('https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg')}
              title="退卡申请中"
              message={buildStatus()}
            />
            <WhiteSpace />
            <WingBlank size="lg">
              <Button onClick={doRollback} type="ghost" className={styles.btn} activeClassName={styles.btnActive}
              disabled={
                status == CardStatus.UNREGISTED 
                || status == CardStatus.REFUNDING 
                || status == CardStatus.FREEZED 
                // || status == CardStatus.FAILED_REVOKE
                || this.state.hasTaped}>
                撤回申请
              </Button>
            </WingBlank>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect()(RevokeCardPage);
