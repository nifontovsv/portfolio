import React, { useState } from 'react';
import TabList from './TabList/TabList';
import TabContent from './TabContent/TabContent';
import MenuList from './MenuList/MenuList';
import styles from './About.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';
// Подключаем стили Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CodeBlock from '../CodeBlock/CodeBlock';

const slides = [
	[
		'1function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
	[
		'2function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
	[
		'3function initializeModelChunk<T>(chunk241: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
	[
		'4function initializeModelChunk<T>(chunk241: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
	[
		'5function initializeModelChunk<T>(chunk241: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
	[
		'6function initializeModelChunk<T>(chunk241: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
];

function About() {
	const [isOpen, setIsOpen] = useState(false);
	const [openTabs, setOpenTabs] = useState([]);
	const [activeTab, setActiveTab] = useState('');

	const aboutArr = [
		'/**',
		'* Frontend-разработчик с опытом',
		'* создания пет-проектов на React.',
		'* Активно изучаю новые технологии',
		'* стремлюсь к развитию в fullstack-разработке.',
		'* Коммуникабельный, целеустремленный',
		'*/',
	];
	const aboutArr2 = [
		`Frontend-разработчик с опытом,
		создания пет-проектов на React.
		Активно изучаю новые технологии
		стремлюсь к развитию в fullstack-разработке.
		Коммуникабельный, целеустремленный.`,
	];
	const interests = [
		'/**',
		'* I love gaming',
		'* programming',
		'* and exploring new technologies',
		'*/',
	];
	const interests2 = [
		`I love gaming, programming, and exploring new technologies`,
	];
	const skills = [`HTML CSS JS`];

	const menuList = [
		{ id: 'Bio', label: 'Bio', title: 'orange', content: `${aboutArr2}` },
		{
			id: 'Interests',
			label: 'Interests',
			title: 'green',
			content: `${interests2}`,
		},
		{
			id: 'Education',
			label: 'Skills',
			title: 'violet',
			content: `${skills}`,
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
						{isOpen ?
							<MenuList
								interests={interests}
								aboutArr={aboutArr}
								menuList={menuList}
								handleTabChange={handleTabChange}
							/>
						:	'Something will be here soon..'}
					</div>
					<div className={styles.aboutMiddle}>
						{isOpen ?
							<TabContent
								interests={interests}
								aboutArr={aboutArr}
								activeTab={activeTab}
							/>
						:	<p style={{ margin: 'auto' }}>Something will be here soon..</p>}

						<div className={styles.blockScroll}>
							<div className={styles.scroll}></div>
						</div>
					</div>
					<div className={styles.aboutRight}>
						<div className={styles.aboutRightPosts}>
							{/* {isSwiperVisible && ( */}
							<Swiper
								direction='vertical' // Вертикальная прокрутка
								loop={true}
								spaceBetween={0} // Расстояние между слайдами
								slidesPerView={5}
								autoplay={{ delay: 5000 }}
								centeredSlides={true} // Центрировать текущий слайд
								effect='fade'
								fadeEffect={{ crossFade: true }}
								mousewheel={true} // Прокрутка мышью
								navigation={false} // Кнопки "Next" и "Prev"
								modules={[Pagination, Navigation, Mousewheel, Autoplay]} // Подключаем модули
								className={styles.mySwiper}
							>
								{slides.map((slide, index) => (
									<SwiperSlide key={index}>
										<ul className={styles.sliderList}>
											{slide.map((item, index) => (
												<CodeBlock index={index} key={index} code={item} />
											))}
										</ul>
									</SwiperSlide>
								))}
							</Swiper>
							{/* )} */}
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
