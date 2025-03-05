import React from 'react';
import styles from './TabContent.module.scss';
import SnakeGame from '../../Projects/SnakeGame/SnakeGame';
import ToDoList from '../../Projects/ToDoList/ToDoList';

function TabContent({ activeTab, aboutArr, interests }) {
	const renderContent = () => {
		switch (activeTab) {
			case 'Bio':
				return (
					<ul className={styles.aboutInfo}>
						{aboutArr.map((line, index) => (
							<li className={styles.aboutInfoItem} key={index}>
								<span className={styles.number}>{index + 1}</span>
								<span>{line}</span>
							</li>
						))}
					</ul>
				);
			case 'Interests':
				return (
					<ul className={styles.aboutInfo}>
						{interests.map((line, index) => (
							<li className={styles.aboutInfoItem} key={index}>
								<span className={styles.number}>{index + 1}</span>
								<span>{line}</span>
							</li>
						))}
					</ul>
				);
			case 'Education':
				return <p>Bachelor's degree in Computer Science.</p>;
			case 'todolist':
				return <ToDoList />;
			case 'snake':
				return <SnakeGame />;
			case 'calculator':
				return <p>Calculator</p>;
			default:
				return <p>Select a tab to view its content.</p>;
		}
	};

	return (
		<div className={`${styles.tabContent} ${activeTab ? styles.visible : ''}`}>
			{renderContent()}
		</div>
	);
}

export default React.memo(TabContent);
