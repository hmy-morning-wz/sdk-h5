import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon, Popover } from 'antd-mobile';
import styles from './styles.css';

const Item = Popover.Item;
const MyImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);

class Navigator extends React.Component {
	constructor(props) {
    super(props);

    const operation = this.props.close;
    const isHideRN = true;//this.props.hideRN;
    const path = this.props.path;
    this.state = {
      visible: false,      
      path,
      operation,
      isHideRN
    };
  }

	onBack = () => {
    switch (this.state.operation) {
      case 'qr':
        if (global.tsmClient) {
          global.tsmClient.showQRcode();
        }
        break;
      case 'shut':
        if (global.tsmClient) {
          global.tsmClient.backHome();
        }
        break;
      default:
        if (this.state.path) {
          this.props.dispatch(routerRedux.replace(this.state.path));
        } else {
          global.history.back();
        }  
    }
	}

  onSelect = (opt) => {
    const selected = opt.props.value;
    this.setState({
      visible: false
    });
    switch(selected) {
      case 'travel':
        if (global.tsmClient) {
          global.tsmClient.showQRcode();
        }
        break;
      case 'help':
        this.props.dispatch({ type: 'card/showHelp' })
    }
  };

  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

	render() {
    return (
  		<div className={styles.nav}>
    		<NavBar
      		mode="light"
  				icon={<Icon type='left' />}
  				onLeftClick={this.onBack}
  				rightContent={ this.state.isHideRN ? '' :
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="1" value="travel" icon={MyImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>乘车</Item>),
                (<Item key="2" value="help" icon={MyImg('uQIYTFeRrjPELImDRrPt')}><span style={{ marginRight: 5 }}>帮助</span></Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
                }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }
    		>{this.props.title}</NavBar>
      </div>
    );
  }
}

export default connect()(Navigator);
