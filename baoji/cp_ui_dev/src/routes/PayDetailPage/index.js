import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';

import { WhiteSpace, WingBlank } from 'antd-mobile';
import { Navigator } from '../../components';
import styles from './styles.less';
import PayStatus from '../../utils/PayStatus';
import Utils from '../../utils/Utils';

const PayDetailPage = (data) => {

  const buildDetails = () => {
    return (
      <div className={styles.list}>
        <ul className={styles.line}>
          <li>充值类型 <span> 账户充值 </span></li>
          <li>充值卡号 <span>{data.cardNo}</span></li>
          <li>充值订单号 <span>{data.orderNum.toLowerCase()}</span></li>
          <li>支付订单号 <span>{data.payOrderNo}</span></li>
          <li>充值时间 <span>{data.createTime}</span></li>
        </ul>
        <div className={styles.clearLine} />
      </div>
    );
  };

  return (
    <DocumentTitle title="充值详情">
      <div className={styles.bg}>
        <Navigator title='充值详情' />
        <WhiteSpace size="lg" />
        <WingBlank size="sm">
          <div className={styles.title}> {PayStatus.SUCCESS === data.status ? '+' : ''}{Utils.formatRMBYuan(data.rechargeAmt)} 元 </div>
          <div className={styles.orderstate}>{PayStatus.toName(data.status)}</div>
          <div>
            {
              // data.status === 1 ? buildDetails() : '订单处理中'
              buildDetails()
            }
          </div>
        </WingBlank>
      </div>
    </DocumentTitle>
  );
};

const mapStateToProps = (state) => {
  return state.card.rechargeDetail;
};

export default connect(mapStateToProps)(PayDetailPage);
