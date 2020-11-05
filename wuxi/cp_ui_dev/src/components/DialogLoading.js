import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import styles from './styles.css';

class DialogLoading extends React.Component {
	constructor(props) {
		super(props);

		const loading = this.props.loading;
		this.state = {
			loading
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			loading: nextProps.loading
		});   	
  	}

	render() {
		return (
			<div className={styles.loadPostion}>
			{
				this.state.loading ? 
				<ActivityIndicator
                	toast
                	text="加载中..."
                	animating={this.state.loading}
              	/> 
              	:
              	this.props.children
			}
			</div>
		);
	}
}

export default DialogLoading;
