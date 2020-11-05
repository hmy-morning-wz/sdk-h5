import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Navigator } from '../../components';
import { autoErrorPage } from '../../utils/RequestHelper';
import styles from './styles.less';

class RevokeOkPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: null,
      hasTaped: false,
      seconds: 5
    };
  }
  componentDidMount() {
    let timer = setInterval(() => {
      this.setState((preState) =>({
        seconds: preState.seconds - 1
      }),() => {
        if(this.state.seconds == 0){
          clearInterval(timer);
        }
      });
    }, 1000)
  }

  render() {
    const dispatch = this.props.dispatch;
    if(this.state.seconds === 0) {
      dispatch(routerRedux.replace('/main'));
    }

    return (
      <DocumentTitle title="退卡撤回">
        <div>
          <Navigator title='退卡撤回' />
          <div style={{marginTop: '35.5%'}}>
            <div style={{textAlign: 'center'}}>
							<img className={styles.iconImg} src={`${global.csConf.cdnHost}/images/610300/success@3x.png`} />
							<div className={styles.title}>撤回成功</div>
							<div className={styles.subTit}>您可以继续使用宝鸡电子公交卡！{this.state.seconds}秒后自动跳转回卡详情</div>
						</div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect()(RevokeOkPage);
