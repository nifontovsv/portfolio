import React, { useState } from 'react';
import TabList from '../About/TabList/TabList';
import TabContent from '../About/TabContent/TabContent';
import MenuList from '../About/MenuList/MenuList';
import styles from './Projects.module.scss';
import shoppebook from '../../images/shoppebook.png';
import { Grid2 } from '@mui/material';
import Button from '../common/Button/Button';

function Projects() {
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
		{ id: 'todolist', label: 'To Do List', title: 'todolist' },
		{ id: 'snake', label: 'Snake', title: 'snake' },
		{ id: 'calculator', label: 'Calculator', title: 'calculator' },
	];
	<svg
		class='w-6 h-6 text-gray-800 dark:text-white'
		aria-hidden='true'
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			stroke='currentColor'
			stroke-linecap='round'
			stroke-linejoin='round'
			strokeWidth='2'
			d='M9 5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2M3 11h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z'
		/>
	</svg>;

	const projects = [
		{
			title: 'Project 1',
			span: '// _shoppebook',
			image: shoppebook,
			description: 'Интернет-магазин с книгами',
			linkTitle: 'view-project',
			href: 'https://github.com/nifontovsv/shoppebook',
		},
		{
			title: 'Project 1',
			span: '// _shoppebook',
			image: shoppebook,
			description: 'Интернет-магазин с книгами',
			linkTitle: 'view-project',
		},
		{
			title: 'Project 1',
			span: '// _shoppebook',
			image: shoppebook,
			description: 'Интернет-магазин с книгами',
			linkTitle: 'view-project',
		},
		{
			title: 'Project 1',
			span: '// _shoppebook',
			image: shoppebook,
			description: 'Интернет-магазин с книгами',
			linkTitle: 'view-project',
		},
		{
			title: 'Project 1',
			span: '// _shoppebook',
			image: shoppebook,
			description: 'Интернет-магазин с книгами',
			linkTitle: 'view-project',
		},
		{
			title: 'Project 1',
			span: '// _shoppebook',
			image: shoppebook,
			description: 'Интернет-магазин с книгами',
			linkTitle: 'view-project',
		},
		{
			title: 'Project 1',
			span: '// _shoppebook',
			image: shoppebook,
			description: 'Интернет-магазин с книгами',
			linkTitle: 'view-project',
		},
	];

	const handleTabChange = (tab) => {
		setOpenTabs((prev) => (prev.includes(tab) ? prev : [...prev, tab]));
		setActiveTab(tab);
	};

	const handleTabClose = (tab) => {
		setOpenTabs((prev) => {
			const updatedTabs = prev.filter((openTab) => openTab !== tab);
			setActiveTab(
				updatedTabs.length ? updatedTabs[updatedTabs.length - 1] : ''
			);
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
						<button
							onClick={() => setIsOpen(!isOpen)}
							className={styles.dropdownToggle}
						>
							{isOpen ?
								<svg
									width='9'
									height='7'
									viewBox='0 0 9 7'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
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
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M6.96045 4.80914L0.960449 9.05916L0.960449 0.559128L6.96045 4.80914Z'
										fill='white'
									/>
								</svg>
							}
						</button>
						<span
							className={styles.personalInfo}
							onClick={() => setIsOpen(!isOpen)}
						>
							projects
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
						{isOpen && (
							<MenuList menuList={menuList} handleTabChange={handleTabChange} />
						)}
					</div>
					<div className={styles.aboutMiddle}>
						{activeTab ?
							<TabContent activeTab={activeTab} aboutArr={aboutArr} />
						:	<Grid2
								className={styles.projectsGrid}
								container
								spacing={3}
								justifyContent='center'
							>
								{projects.map((item, index) => (
									<Grid2 xs={12} sm={6} md={4} lg={3} key={item.index}>
										<div className={styles.projectsItems}>
											<h2 className={styles.heading}>{item.title}</h2>
											<span className={styles.subHeading}>{item.span}</span>
											<div className={styles.projectItem}>
												<img
													width={300}
													height={150}
													className={styles.projectItemImage}
													src={item.image}
													alt={item.image}
												/>
												<p className={styles.description}>{item.description}</p>
												<div className={styles.projectLink}>
													<Button title={item.linkTitle} href={item.href} />
												</div>
											</div>
										</div>
									</Grid2>
								))}
							</Grid2>
						}
					</div>
					<div className={styles.blockScroll}>
						<div className={styles.scroll}></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Projects;
