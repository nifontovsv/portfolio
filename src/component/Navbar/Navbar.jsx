import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import { Link, useLocation } from 'react-router';
import Button from '../common/Button/Button';

function Navbar() {
	const [isActive, setIsActive] = useState(null);
	const [active, setActive] = useState(false);
	const location = useLocation();

	const links = [
		{ path: '/', text: '_hello' },
		{ path: '/about', text: '_about-me' },
		{ path: '/projects', text: '_projects' },
		{ path: '/contacts', text: '_contact-me' },
	];

	useEffect(() => {
		const index = links.findIndex((item) => item.path === location.pathname);
		setIsActive(index !== -1 ? index : null);
	}, [location.pathname]);

	const handleActiveClick = (index) => {
		setIsActive(index);
	};

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<p>Sergey-Nifontov</p>
			</div>
			<div className={active ? styles.burgerMenu : styles.burgerMenuHidden}>
				<ul className={styles.burgerList}>
					{links.map((item) => {
						return (
							<li
								className={styles.burgerItem}
								key={item.path}
								onClick={() => setIsActive(item.path)}
							>
								<Link
									className={styles.burgerLink}
									onClick={() => setActive(!active)}
									to={item.path}
								>
									{item.text}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			{active && (
				<div
					onClick={() => setActive(!active)}
					className={styles.blurMenu}
				></div>
			)}

			<div className={styles.burger}>
				<svg
					onClick={() => setActive(!active)}
					className={`${styles.ham} ${styles.ham4} ${styles.hamRotate} ${active ? styles.active : ''} `}
					viewBox='0 0 100 100'
					width='40'
				>
					<path
						className={`${styles.line} ${styles.top} ${active ? styles.active : ''}`}
						d='m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20'
					/>
					<path
						className={`${styles.line} ${styles.middle}`}
						d='m 70,50 h -40'
					/>
					<path
						className={`${styles.line} ${styles.bottom} ${active ? styles.active : ''}`}
						d='m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20'
					/>
				</svg>
			</div>
			<div className={styles.nav}>
				{links.map((item, index) => {
					return (
						<div
							key={index}
							className={`${styles.navItem} ${isActive === index ? styles.active : ''}`}
							onClick={() => handleActiveClick(index)}
						>
							<Link to={item.path}>
								<Button title={item.text} />
							</Link>
						</div>
					);
				})}
			</div>
		</header>
	);
}

export default Navbar;
