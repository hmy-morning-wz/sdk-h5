import React from 'react';
import styles from './styles.css';

function Circle(props) {
	const loading = props.loading;
	const build = () => {
		return (
			<div className={styles.load5}>
	            <p>加载中...</p>
	            <div className={styles.ring}>
	                <div className={styles.ballHolder}>
	                    <div className={styles.ball}></div>
	                </div>	                
	            </div>
	        </div>
		);
	};
	return (
		<div className={styles.loadPostion}>
			{ loading ? build() : props.children }
		</div>
		);
}

export default Circle;
