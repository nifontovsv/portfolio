import React, { useState } from 'react';
import styles from './About.module.scss';
import Dropdown from '../Dropdown/Dropdown';
import Arrowdown from '../Dropdown/Arrowdown';

function About() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const aboutArr = [
		'/**',
		'* About me',
		' * I have 5 years of еxperience in web',
		' * development lorem ipsum dolor sit amet,',
		'* consectetur adipiscing elit, sed do eiusmod',
		'* tempor incididunt ut labore et dolore',
		' * magna aliqua. Ut enim ad minim veniam,',
		'* quis nostrud exercitation ullamco laboris',
		'* nisi ut aliquip ex ea commodo consequat.',
		' * Duis aute irure dolor in reprehenderit in',
		'*',
		' * Duis aute irure dolor in reprehenderit in',
		' * voluptate velit esse cillum dolore eu fugiat',
		' * nulla pariatur. Excepteur sint occaecat',
		'* officia deserunt mollit anim id est laborum.',
		' */',
	];
	return (
		<div className={styles.about}>
			<div className={styles.navIcon}>
				<div>i</div>
			</div>
			<div className={styles.tabsAbout}>
				<div className={styles.navTabs}>
					<div className={styles.navTabName}>
						<button onClick={toggleMenu} className={styles.dropdownToggle}>
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
						<span className={styles.personalInfo} onClick={toggleMenu}>
							personal-info
						</span>
					</div>
					<div className={styles.navTabsLeft}>1 tab</div>
					<div>2 tab</div>
				</div>
				<div className={styles.aboutPart}>
					<div class={styles.aboutLeft}>
						<div>
							{isOpen && (
								<ul className={styles.menuList}>
									<li>
										<Dropdown
											icon={<Arrowdown title='violet' />}
											title={'bio'}
											items={['was born', 'hi', 'buy']}
										/>
									</li>
									<li>
										<svg
											width='16'
											height='14'
											viewBox='0 0 16 14'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M15.0802 3.98074V12.6474C15.0802 12.839 15.0041 13.0227 14.8687 13.1581C14.7332 13.2935 14.5495 13.3696 14.358 13.3696H1.35796C1.16642 13.3696 0.982719 13.2935 0.847276 13.1581C0.711833 13.0227 0.635742 12.839 0.635742 12.6474V3.25852H14.358C14.5495 3.25852 14.7332 3.33461 14.8687 3.47005C15.0041 3.60549 15.0802 3.78919 15.0802 3.98074ZM8.15696 1.81407H0.635742V1.09185C0.635742 0.900306 0.711833 0.716606 0.847276 0.581163C0.982719 0.44572 1.16642 0.369629 1.35796 0.369629H6.71252L8.15696 1.81407Z'
												fill='#43D9AD'
											/>
										</svg>
										&nbsp;interests
									</li>
									<li>
										<svg
											width='16'
											height='14'
											viewBox='0 0 16 14'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M15.0802 4.49392V13.1606C15.0802 13.3521 15.0041 13.5358 14.8687 13.6713C14.7332 13.8067 14.5495 13.8828 14.358 13.8828H1.35796C1.16642 13.8828 0.982719 13.8067 0.847276 13.6713C0.711833 13.5358 0.635742 13.3521 0.635742 13.1606V3.7717H14.358C14.5495 3.7717 14.7332 3.84779 14.8687 3.98324C15.0041 4.11868 15.0802 4.30238 15.0802 4.49392ZM8.15696 2.32726H0.635742V1.60503C0.635742 1.41349 0.711833 1.22979 0.847276 1.09435C0.982719 0.958904 1.16642 0.882813 1.35796 0.882812H6.71252L8.15696 2.32726Z'
												fill='#3A49A4'
											/>
										</svg>
										&nbsp;education
									</li>
								</ul>
							)}
						</div>
					</div>
					<div class={styles.aboutMiddle}>
						<ul className={styles.aboutInfo} style={{ listStyleType: 'none', padding: 0 }}>
							{aboutArr.map((item, index) => {
								const number = index + 1; // Получаем номер без ведущего нуля
								return (
									<li key={index} style={{ display: 'flex', alignItems: 'center' }}>
										<span style={{ width: '30px', textAlign: 'right', marginRight: '5px' }}>
											{number < 10 ? ` ${number}` : number}
										</span>
										<span style={{ marginRight: '30px', marginLeft: '30px' }}>{item}</span>
									</li>
								);
							})}
						</ul>
						<div className={styles.blockScroll}>
							<div className={styles.scroll}></div>
						</div>
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
