import React from 'react';
import styles from './TabContent.module.scss';

function TabContent({ activeTab, aboutArr }) {
	const renderContent = () => {
		switch (activeTab) {
			case 'bio':
				return (
					<ul className={styles.aboutInfo}>
						{aboutArr.map((line, index) => (
							<li key={index}>
								<span>{index + 1}</span>
								<span>{line}</span>
							</li>
						))}
					</ul>
				);
			case 'interests':
				return <p>I love gaming, programming, and exploring new technologies.</p>;
			case 'education':
				return <p>Bachelor's degree in Computer Science.</p>;
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
