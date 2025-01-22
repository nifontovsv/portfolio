import React from 'react';
import styles from './ProgressBar.module.scss';

const ProgressBar = ({ value, max, length }) => {
	const percentage = (value / max) * 100;

	// Выбираем цвет прогресс-бара
	const getColor = () => {
		if (percentage < 50) return '#ff7979';
		if (percentage < 100) return '#ffa048';
		return '#78d700';
	};

	return (
		<div className={styles.progressContainer}>
			<div
				className={styles.progressBar}
				style={{
					width: `${percentage}%`,
					backgroundColor: getColor(), // Динамически задаём цвет
				}}
			/>
		</div>
	);
};

export default ProgressBar;
