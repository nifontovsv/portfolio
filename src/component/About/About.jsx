// import React, { useState } from 'react';
// import styles from './About.module.scss';
// import Arrowdown from './Arrowdown';

// function About() {
// 	const [isOpen, setIsOpen] = useState(true);
// 	const [openTabs, setOpenTabs] = useState([]);
// 	const [activeTab, setActiveTab] = useState(''); // Активная вкладка
// 	const aboutArr = [
// 		'/**',
// 		'* About me',
// 		' * I have 5 years of experience in web',
// 		' * development lorem ipsum dolor sit amet,',
// 		'* consectetur adipiscing elit, sed do eiusmod',
// 		'* tempor incididunt ut labore et dolore',
// 		' * magna aliqua. Ut enim ad minim veniam,',
// 		'* quis nostrud exercitation ullamco laboris',
// 		'* nisi ut aliquip ex ea commodo consequat.',
// 		' * Duis aute irure dolor in reprehenderit in',
// 		'* voluptate velit esse cillum dolore eu fugiat',
// 		' * nulla pariatur. Excepteur sint occaecat',
// 		'* officia deserunt mollit anim id est laborum.',
// 		' */',
// 	];

// 	const menuList = [
// 		{ id: 'bio', label: 'Bio', title: 'orange' },
// 		{ id: 'interests', label: 'Interests', title: 'green' },
// 		{ id: 'education', label: 'Education', title: 'violet' },
// 	];

// 	// Функция для переключения вкладок
// 	const handleTabChange = (tab) => {
// 		setOpenTabs((prev) => (prev.includes(tab) ? prev : [...prev, tab]));
// 		setActiveTab(tab); // Устанавливаем активную вкладку
// 	};

// 	// Закрытие вкладки
// 	const handleTabClose = (tab) => {
// 		setOpenTabs((prev) => {
// 			const updatedTabs = prev.filter((openTab) => openTab !== tab);
// 			if (activeTab === tab) {
// 				// Если активная вкладка закрыта, переключаемся на последнюю из оставшихся
// 				setActiveTab(updatedTabs.length > 0 ? updatedTabs[updatedTabs.length - 1] : '');
// 			}
// 			return updatedTabs;
// 		});
// 	};

// 	// Функция для рендера контента вкладки
// 	const renderTabContent = (tab) => {
// 		switch (tab) {
// 			case 'bio':
// 				return (
// 					<ul className={styles.aboutInfo} style={{ listStyleType: 'none', padding: 0 }}>
// 						{aboutArr.map((item, index) => (
// 							<li key={index} style={{ display: 'flex', alignItems: 'center' }}>
// 								<span style={{ width: '30px', textAlign: 'right', marginRight: '5px' }}>
// 									{index + 1}
// 								</span>
// 								<span style={{ marginRight: '30px', marginLeft: '30px' }}>{item}</span>
// 							</li>
// 						))}
// 					</ul>
// 				);
// 			case 'interests':
// 				return <p>I love gaming, programming, and exploring new technologies.</p>;
// 			case 'education':
// 				return <p>Bachelor's degree in Computer Science.</p>;
// 			default:
// 				return null;
// 		}
// 	};

// 	return (
// 		<div className={styles.about}>
// 			<div className={styles.navIcon}>
// 				<div>i</div>
// 			</div>
// 			<div className={styles.tabsAbout}>
// 				<div className={styles.navTabs}>
// 					<div className={styles.navTabName}>
// 						<button onClick={() => setIsOpen(!isOpen)} className={styles.dropdownToggle}>
// 							{isOpen ?
// 								<svg
// 									width='9'
// 									height='7'
// 									viewBox='0 0 9 7'
// 									fill='none'
// 									xmlns='http://www.w3.org/2000/svg'>
// 									<path
// 										d='M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z'
// 										fill='white'
// 									/>
// 								</svg>
// 							:	<svg
// 									width='7'
// 									height='10'
// 									viewBox='0 0 7 10'
// 									fill='none'
// 									xmlns='http://www.w3.org/2000/svg'>
// 									<path
// 										d='M6.96045 4.80914L0.960449 9.05916L0.960449 0.559128L6.96045 4.80914Z'
// 										fill='white'
// 									/>
// 								</svg>
// 							}
// 						</button>
// 						<span className={styles.personalInfo} onClick={() => setIsOpen(!isOpen)}>
// 							personal-info
// 						</span>
// 					</div>
// 					<div className={styles.navTabsLeft}>
// 						{openTabs.map((tab) => {
// 							const isActive = activeTab === tab;
// 							return (
// 								<div
// 									key={tab}
// 									className={`${isActive ? styles.activeTab : styles.tabItem}`}
// 									onClick={() => setActiveTab(tab)} // Устанавливаем активную вкладку
// 								>
// 									<p>{tab}</p>
// 									&nbsp;&nbsp;
// 									<div
// 										className={styles.activeTabSvg}
// 										onClick={(e) => {
// 											e.stopPropagation(); // Предотвращаем переключение вкладки при закрытии
// 											handleTabClose(tab);
// 										}}>
// 										<svg
// 											className={styles.hoverSvg}
// 											width='20'
// 											height='20'
// 											viewBox='0 0 19 19'
// 											fill='none'
// 											xmlns='http://www.w3.org/2000/svg'>
// 											<g clipPath='url(#clip0_64_1646)'>
// 												<path
// 													d='M9.34771 8.71879L13.0602 5.00629L14.1207 6.06679L10.4082 9.77929L14.1207 13.4918L13.0602 14.5523L9.34771 10.8398L5.63521 14.5523L4.57471 13.4918L8.28721 9.77929L4.57471 6.06679L5.63521 5.00629L9.34771 8.71879Z'
// 													fill='#607B96'
// 												/>
// 											</g>
// 											<defs>
// 												<clipPath id='clip0_64_1646'>
// 													<rect
// 														width='18'
// 														height='18'
// 														fill='white'
// 														transform='translate(0.347656 0.779297)'
// 													/>
// 												</clipPath>
// 											</defs>
// 										</svg>
// 									</div>
// 								</div>
// 							);
// 						})}
// 					</div>
// 				</div>
// 				<div className={styles.aboutPart}>
// 					<div className={styles.aboutLeft}>
// 						{isOpen && (
// 							<ul className={styles.menuList}>
// 								{menuList.map((item) => (
// 									<div
// 										key={item.id}
// 										style={{
// 											display: 'flex',
// 											alignItems: 'center',
// 											cursor: 'pointer',
// 											marginBottom: '8px',
// 										}}>
// 										<Arrowdown title={item.title} />
// 										&nbsp;
// 										<li onClick={() => handleTabChange(item.id)}>{item.label}</li>
// 									</div>
// 								))}
// 							</ul>
// 						)}
// 					</div>
// 					<div className={styles.aboutMiddle}>
// 						{/* {openTabs.map((tab) => ( */}
// 						<div className={styles.tabContent}>
// 							{activeTab && <div className={styles.tabContent}>{renderTabContent(activeTab)}</div>}
// 						</div>
// 						{/* ))} */}
// 					</div>
// 					<div className={styles.aboutRight}>
// 						<div className={styles.aboutRightPosts}>
// 							<p>// Code snippet showcase:</p>
// 						</div>
// 						<div className={styles.blockScroll}>
// 							<div className={styles.scroll}></div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default About;

import React, { useState } from 'react';
import TabList from './TabList/TabList';
import TabContent from './TabContent/TabContent';
import MenuList from './MenuList/MenuList';
import styles from './About.module.scss';

function About() {
	const [isOpen, setIsOpen] = useState(true);
	const [openTabs, setOpenTabs] = useState([]);
	const [activeTab, setActiveTab] = useState('');

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

	const menuList = [
		{ id: 'bio', label: 'Bio', title: 'orange' },
		{ id: 'interests', label: 'Interests', title: 'green' },
		{ id: 'education', label: 'Education', title: 'violet' },
	];

	const handleTabChange = (tab) => {
		setOpenTabs((prev) => (prev.includes(tab) ? prev : [...prev, tab]));
		setActiveTab(tab);
	};

	const handleTabClose = (tab) => {
		setOpenTabs((prev) => {
			const updatedTabs = prev.filter((openTab) => openTab !== tab);
			setActiveTab(updatedTabs.length ? updatedTabs[updatedTabs.length - 1] : '');
			return updatedTabs;
		});
	};

	return (
		<div className={styles.about}>
			<div className={styles.navIcon}>
				<div>i</div>
			</div>
			<div className={styles.tabsAbout}>
				<div className={styles.navTabs}>
					<div className={styles.navTabName}>
						<button onClick={() => setIsOpen(!isOpen)} className={styles.dropdownToggle}>
							{isOpen ?
								<svg
									width='9'
									height='7'
									viewBox='0 0 9 7'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z'
										fill='white'
									/>
								</svg>
							:	<svg
									width='7'
									height='10'
									viewBox='0 0 7 10'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M6.96045 4.80914L0.960449 9.05916L0.960449 0.559128L6.96045 4.80914Z'
										fill='white'
									/>
								</svg>
							}
						</button>
						<span className={styles.personalInfo} onClick={() => setIsOpen(!isOpen)}>
							personal-info
						</span>
					</div>
					<TabList
						openTabs={openTabs}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						handleTabClose={handleTabClose}
					/>
				</div>
				<div className={styles.aboutPart}>
					<div className={`${styles.aboutLeft} ${isOpen ? styles.open : ''}`}>
						{isOpen && <MenuList menuList={menuList} handleTabChange={handleTabChange} />}
					</div>
					<div className={styles.aboutMiddle}>
						<TabContent activeTab={activeTab} aboutArr={aboutArr} />
					</div>
					<div className={styles.aboutRight}>
						<div className={styles.aboutRightPosts}>
							<p>// Code snippet showcase:</p>
						</div>
						<div className={styles.blockScroll}>
							<div className={styles.scroll}></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
