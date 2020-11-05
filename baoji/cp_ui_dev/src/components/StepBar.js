import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import styles from './styles.css';

class StepBar extends React.Component {
	constructor(props) {
		super(props);

		const activeBar = this.props.activeBar;
		this.state = {
			activeBar
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			activeBar: nextProps.activeBar
		});   	
    }
    
  buildStep = (opt) => {
    const classNames = `${styles.progressItem} ${this.props.active==='done' && styles.done} ${this.props.active==='doing' && styles.doing} ${this.props.last && styles.last} `;
    
    const classNames3 = `${styles.progressTitle} ${this.props.last && styles.last}`;
    return (
      <div className={classNames}>
          <div className={styles.progressBody}>
              <h3>{this.props.activeBar}</h3>
              {
                !this.props.last &&
                <div className={styles.progressLine}></div>
              }
          </div>
          {/* <div className={classNames3}>{this.props.stepName}</div> */}
      </div>
    )
  }

	render() {
    const classNames2 = `${styles.stepOut} ${this.props.last && styles.last}`;
		return (
			<div className={classNames2}>
        {
          this.state.activeBar ? 
          this.buildStep()
          :
          this.props.children
        }
        
      
			</div>
		);
	}
}

export default StepBar;
