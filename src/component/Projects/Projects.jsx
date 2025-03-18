import React, { useRef, useState, useEffect, useCallback } from 'react';
import TabList from '../About/TabList/TabList';
import TabContent from '../About/TabContent/TabContent';
import MenuList from '../About/MenuList/MenuList';
import styles from './Projects.module.scss';
import { Grid2, Skeleton } from '@mui/material';
import Button from '../common/Button/Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import agency from '../../images/agency.mp4';
import shoppebook from '../../images/shoppebook.mp4';
import avion from '../../images/avion.mp4';
import awward from '../../images/awward.mp4';
import creative_scroll from '../../images/creative_scroll.mp4';
import exampleportfolio from '../../images/exampleportfolio.mp4';
import pravovik from '../../images/pravovik.mp4';
import agencyimg from '../../images/DigitalAgency.jpg';
import shoppebookimg from '../../images/shoppebook.png';
import avionimg from '../../images/Avion.jpg';
import awwardimg from '../../images/awwardimg.jpg';
import { FaGooglePlay } from 'react-icons/fa6';
import { FaPause } from 'react-icons/fa';
import useMediaQuery from '@mui/material/useMediaQuery';

function Projects() {
	const [isOpen, setIsOpen] = useState(true);
	const [openTabs, setOpenTabs] = useState([]);
	const [activeTab, setActiveTab] = useState('');
	const [videoError, setVideoError] = useState({});
	const [loading, setLoading] = useState(true);
	const [playingVideos, setPlayingVideos] = useState({});
	const [hoveredVideo, setHoveredVideo] = useState(null);

	const isMobile = useMediaQuery('(max-width:768px)');

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	const handleVideoError = (index) => {
		setVideoError((prev) => ({ ...prev, [index]: true }));
	};

	// Создаём массив ссылок для каждого видео
	const videoRefs = useRef([]);

	const togglePlay = useCallback((index) => {
		const video = videoRefs.current[index];
		if (!video) return;

		setPlayingVideos((prev) => ({
			...prev,
			[index]: !prev[index], // Переключаем состояние конкретного видео
		}));

		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}, []);

	// Инициализация массива рефов
	useEffect(() => {
		videoRefs.current = videoRefs.current.slice(0, projects.length);
	}, []);

	const projectsRef = useRef(null);

	const tl = gsap.timeline();
	useGSAP(() => {
		if (!projectsRef.current || loading) return; // Если `null`, то выходим
		tl.fromTo(
			projectsRef.current.children,
			{ opacity: 0 },
			{ opacity: 1, duration: 3, delay: 0.5, stagger: 0.3 }
		);
	}, [loading]);

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
	];

	const projects = [
		{
			title: 'Project 1',
			span: '// _shoppebook',
			video: shoppebook,
			image: shoppebookimg,
			description: 'e-commerce shop books',
			linkTitle: 'view-project',
			href: 'https://github.com/nifontovsv/shoppebook',
		},
		{
			title: 'Project 2',
			span: '// _awward',
			video: awward,
			image: awwardimg,
			description: 'Animation lending ',
			linkTitle: 'view-project',
			href: 'https://github.com/nifontovsv/awward',
		},
		{
			title: 'Project 3',
			span: '// _creative_scroll',
			video: creative_scroll,
			image: '',
			description: 'Animation lending ',
			linkTitle: 'view-project',
			href: 'https://github.com/nifontovsv/creative_scroll',
		},
		{
			title: 'Project 4',
			span: '// _avion',
			video: avion,
			image: avionimg,
			description: 'multi-pages website',
			linkTitle: 'view-project',
			href: 'https://github.com/nifontovsv/avion',
		},
		{
			title: 'Project 5',
			span: '// _agency',
			video: agency,
			image: agencyimg,
			description: 'Simple lending',
			linkTitle: 'view-project',
			href: 'https://github.com/nifontovsv/agency',
		},
		{
			title: 'Project 6',
			span: '// _example_portfolio',
			video: exampleportfolio,
			// image: agencyimg,
			description: 'Simple lending',
			linkTitle: 'view-project',
			href: 'https://github.com/nifontovsv/exampleportfolio',
		},
		{
			title: 'Project 7',
			span: '// _pravovik',
			video: pravovik,
			// image: agencyimg,
			description: 'Simple lending',
			linkTitle: 'view-project',
			href: 'https://github.com/nifontovsv/pravovik',
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
			<div className={styles.tabsAbout}>
				<div className={styles.navTabs}>
					<div className={styles.navTabName}>
						{/* <button
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
						</button> */}
						<span
							className={styles.personalInfo}
							// onClick={() => setIsOpen(!isOpen)}
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
								ref={projectsRef}
								className={styles.projectsGrid}
								container
								spacing={3}
								justifyContent='center'
								alignContent='center'
							>
								{projects.map((item, index) => (
									<Grid2 xs={12} sm={6} md={4} lg={3} key={index}>
										{loading ?
											<div
												className={styles.skeletonWrapper}
												style={{ marginTop: '50px' }}
											>
												<Skeleton
													variant='rectangular'
													height={180}
													sx={{
														bgcolor: 'rgba(255, 255, 255, 0.2)',
													}}
												/>
												<Skeleton
													sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
												/>
												<Skeleton
													width='60%'
													sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
												/>
												<Skeleton
													width={129}
													height={39}
													sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
												/>
											</div>
										:	<div className={styles.projectsItems}>
												<h2 className={styles.heading}>{item.title}</h2>
												<span className={styles.subHeading}>{item.span}</span>
												<div
													onMouseEnter={() => setHoveredVideo(index)}
													onMouseLeave={() => setHoveredVideo(null)}
													className={styles.projectItem}
												>
													{/* {videoError[index] || preview ?
														<img
															src={item.image}
															alt={item.span}
															className={styles.projectItemImage}
														/>: */}
													<div style={{ position: 'relative' }}>
														<video
															ref={(el) => (videoRefs.current[index] = el)}
															muted
															playsInline
															preload='metadata'
															className={styles.projectItemImage}
															onError={() => handleVideoError(index)} // Отлавливаем ошибку
															onLoadedMetadata={(e) => {
																e.target.currentTime = 0.1; // Перематываем немного вперед, чтобы убрать черный экран
															}}
															onEnded={() => {
																setPlayingVideos((prev) => ({
																	...prev,
																	[index]: false, // После завершения видео меняем кнопку на Play
																}));
															}}
														>
															<source src={item.video} type='video/mp4' />
														</video>
														{hoveredVideo === index && (
															<button
																onClick={() => togglePlay(index)}
																className={styles.playBtn}
															>
																{playingVideos[index] ?
																	<FaPause className={styles.playIcon} />
																:	<FaGooglePlay className={styles.playIcon} />}
															</button>
														)}
														{isMobile && (
															<button
																onClick={() => togglePlay(index)}
																className={styles.playBtn}
															>
																{playingVideos[index] ?
																	<FaPause className={styles.playIcon} />
																:	<FaGooglePlay className={styles.playIcon} />}
															</button>
														)}
													</div>

													{/* // } */}
													<div className={styles.description}>
														<p>{item.description}</p>
													</div>
													<div className={styles.projectLink}>
														<Button title={item.linkTitle} href={item.href} />
													</div>
												</div>
											</div>
										}
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
