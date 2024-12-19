import React from 'react';
import styles from './Navbar.module.scss';
import { Link } from 'react-router';

function Navbar() {
	return (
		<div className={styles.nav}>
			<ul className={styles.navList}>
				<li className={styles.navItem}>
					<Link className={styles.navLink} to='/about'>
						About me
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link className={styles.navLink} to='/projects'>
						Projects
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link className={styles.navLink} to='/contacts'>
						Contacts
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;
