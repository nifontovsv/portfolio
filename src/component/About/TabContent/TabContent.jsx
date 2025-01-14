import React from 'react';
import styles from './TabContent.module.scss';
import SnakeGame from '../../Projects/SnakeGame/SnakeGame';

function TabContent({ activeTab }) {
	const aboutArr = [
		'/**',
		'* About me',
		'* I have 5 years of experience in web',
		'* development lorem ipsum dolor sit amet,',
		'* consectetur adipiscing elit, sed do eiusmod',
		'* tempor incididunt ut labore et dolore',
		'* magna aliqua. Ut enim ad minim veniam,',
		'* quis nostrud exercitation ullamco laboris',
		'* nisi ut aliquip ex ea commodo consequat.',
		'* Duis aute irure dolor in reprehenderit in',
		'* voluptate velit esse cillum dolore eu fugiat',
		'* nulla pariatur. Excepteur sint occaecat',
		'* officia deserunt mollit anim id est laborum.',
		'*/',
	];
	const renderContent = () => {
		switch (activeTab) {
			case 'bio':
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
			case 'interests':
				return <p>I love gaming, programming, and exploring new technologies.</p>;
			case 'education':
				return <p>Bachelor's degree in Computer Science.</p>;
			case 'todolist':
				return <p>todo</p>;
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
