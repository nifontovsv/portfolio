import React from 'react';
import styles from './Navbar.module.scss';
import { Link } from 'react-router';

function Navbar() {
	return (
		<header class={styles.header}>
			<div class={styles.logo}>
				<p>Sergey-Nifontov</p>
			</div>
			<div class={styles.nav}>
				<div className={styles.navItem}>
					<Link to='/'>_hello</Link>
				</div>
				<div className={styles.navItem}>
					<Link to='/about'>_about-me</Link>
				</div>
				<div className={styles.navItem}>
					<Link to='/projects'>_projects</Link>
				</div>
				<div className={styles.navItem}>
					<Link to='/contacts'>_contact-me</Link>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
