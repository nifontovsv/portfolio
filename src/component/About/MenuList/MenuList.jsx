import React from 'react';
import Arrowdown from '../Arrowdown/Arrowdown';
import styles from './MenuList.module.scss';

function MenuList({ menuList, handleTabChange }) {
	return (
		<ul className={styles.menuList}>
			{menuList.map((item) => (
				<li key={item.id} onClick={() => handleTabChange(item.id)}>
					<Arrowdown title={item.title} /> {item.label}
				</li>
			))}
		</ul>
	);
}

export default React.memo(MenuList);
