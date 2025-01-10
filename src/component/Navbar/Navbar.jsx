import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { Link } from 'react-router';
import GlowOverlay from '../GlowOverlay/GlowOverlay';

function Navbar() {
	const [isActive, setIsActive] = useState('/');
	const [active, setActive] = useState(false);

	const links = [
		{ path: '/', text: '_hello' },
		{ path: '/about', text: '_about-me' },
		{ path: '/projects', text: '_projects' },
		{ path: '/contacts', text: '_contact-me' },
	];

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<p>Sergey-Nifontov</p>
			</div>
			{/* {openMenu && ( */}
			<ul className={active ? styles.burgerMenu : styles.burgerMenuHidden}>
				{links.map((item) => {
					return (
						<li key={item.path} onClick={() => setIsActive(item.path)}>
							<Link to={item.path}>{item.text}</Link>
						</li>
					);
				})}
			</ul>
			{/* )} */}

			<div className={styles.burger}>
				<svg
					onClick={() => setActive(!active)}
					className={`${styles.ham} ${styles.ham4} ${styles.hamRotate} ${active ? styles.active : ''} `}
					viewBox='0 0 100 100'
					width='40'>
					<path
						className={`${styles.line} ${styles.top} ${active ? styles.active : ''}`}
						d='m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20'
					/>
					<path className={`${styles.line} ${styles.middle}`} d='m 70,50 h -40' />
					<path
						className={`${styles.line} ${styles.bottom} ${active ? styles.active : ''}`}
						d='m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20'
					/>
				</svg>
			</div>
			<div className={styles.nav}>
				{links.map((item) => {
					return (
						<GlowOverlay>
							<div
								key={item.path}
								className={`${styles.navItem} ${isActive === item.path ? styles.active : ''}`}
								onClick={() => setIsActive(item.path)}>
								<Link to={item.path}>{item.text}</Link>
							</div>
						</GlowOverlay>
					);
				})}
			</div>
		</header>
	);
}

export default Navbar;
