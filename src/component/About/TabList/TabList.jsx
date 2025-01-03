import React, { useState } from 'react';
import styles from './TabList.module.scss';

function TabList({ openTabs, activeTab, setActiveTab, handleTabClose }) {
	const [closingTab, setClosingTab] = useState(null);
	const handleCloseClick = (tab) => {
		setClosingTab(tab);
		setTimeout(() => {
			handleTabClose(tab);
			setClosingTab(null);
		}, 200);
	};
	return (
		<div className={styles.navTabsLeft}>
			{openTabs.map((tab) => (
				<div
					key={tab}
					className={`${styles.tabItem} ${activeTab === tab ? styles.activeTab : ''} ${
						closingTab === tab ? styles.closing : ''
					}`}
					onClick={() => setActiveTab(tab)}>
					<p>{tab}</p>
					&nbsp;&nbsp;
					<div
						className={styles.activeTabSvg}
						onClick={(e) => {
							e.stopPropagation();
							handleCloseClick(tab);
						}}>
						<svg
							className={styles.hoverSvg}
							width='20'
							height='20'
							viewBox='0 0 19 19'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<g clipPath='url(#clip0_64_1646)'>
								<path
									d='M9.34771 8.71879L13.0602 5.00629L14.1207 6.06679L10.4082 9.77929L14.1207 13.4918L13.0602 14.5523L9.34771 10.8398L5.63521 14.5523L4.57471 13.4918L8.28721 9.77929L4.57471 6.06679L5.63521 5.00629L9.34771 8.71879Z'
									fill='#607B96'
								/>
							</g>
							<defs>
								<clipPath id='clip0_64_1646'>
									<rect
										width='18'
										height='18'
										fill='white'
										transform='translate(0.347656 0.779297)'
									/>
								</clipPath>
							</defs>
						</svg>
					</div>
				</div>
			))}
		</div>
	);
}

export default React.memo(TabList);
