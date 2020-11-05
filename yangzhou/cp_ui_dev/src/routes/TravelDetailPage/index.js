import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';

import { WhiteSpace, WingBlank } from 'antd-mobile';
import { Navigator } from '../../components';
import styles from './styles.less';
import Utils from '../../utils/Utils';
import config from '../../utils/config';
import TravelStatus from '../../utils/TravelStatus';

const TravelDetailPage = (data) => {
  return (
    <DocumentTitle title="乘车详情">
      <div className={styles.bg}>
        <Navigator title='乘车详情' />
        <WhiteSpace size="lg" />
        <WingBlank size="sm">
          <div className={styles.title} >
            <img src={`${config.cdnHost}/images/yes_bus.png`} alt="IMG" />
            {data.subject}
          </div>
          <div className={styles.amount}> -{Utils.formatRMBYuan(data.amount)}元 </div>
          <div className={styles.orderstate}>{TravelStatus.toName(data.status)} </div>
          <div>
            <ul className={styles.line}>
              <li>流水号 <span>{data.reqSeqNo}</span></li>
              <li>电子卡号 <span>{data.cardNo}</span></li>
              {
                (data.chargeName && data.chargeName != null) ? <li>计费类型 <span className={data.chargeType == 3 ? styles.creditPay : ''}>{data.chargeName}</span></li> : ''
              }
              {
                (data.pcOrderNo && data.pcOrderNo != null) ? <li>支付单号 <span>{data.pcOrderNo}</span></li> : ''
              }
              <li>乘车时间 <span>{data.bizTime}</span></li>
              {
                (data.lineName && data.lineName != null) ? <li>公交线路 <span>{data.lineName}</span></li> : ''
              }
              {
                (data.startStationName && data.startStationName != null) ? <li>上车站点 <span>{data.startStationName}</span></li> : ''
              }
              {
                (data.endStationName && data.endStationName != null) ? <li>下车站点 <span>{data.endStationName}</span></li> : ''
              }

              {
                (data.info && data.info != null) ? <li>车辆信息 <span>{data.info}</span></li> : ''
              }
              {
                (data.driverId && data.driverId != null) ? <li>设备ID <span>{data.driverId}</span></li> : ''
              }
            </ul>
            <div className={styles.clearLine} />
          </div>
        </WingBlank>
      </div>
    </DocumentTitle>
    );
};

const mapStateToProps = (state) => {
  return state.card.travelDetail;
};

export default connect(mapStateToProps)(TravelDetailPage);
