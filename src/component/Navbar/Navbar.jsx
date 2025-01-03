import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { Link } from 'react-router';

function Navbar() {
	const [isActive, setIsActive] = useState('/');
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
			<div className={styles.nav}>
				{links.map((item) => {
					return (
						<div
							key={item.path}
							className={`${styles.navItem} ${isActive === item.path ? styles.active : ''}`}
							onClick={() => setIsActive(item.path)}>
							<Link to={item.path}>{item.text}</Link>
						</div>
					);
				})}
			</div>
		</header>
	);
}

export default Navbar;
