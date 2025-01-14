import React, { useState } from 'react';
import Arrowdown from '../Arrowdown/Arrowdown';
import styles from './MenuList.module.scss';
import useIsMobile from '../../../hooks/useIsMobile';

function MenuList({ handleTabChange }) {
	const [openIndex, setOpenIndex] = useState(null);
	const isMobile = useIsMobile();

	const toggleDropdown = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const menuList = [
		{ id: 'bio', label: 'Bio', title: 'orange', content: 'Биография' },
		{ id: 'interests', label: 'Interests', title: 'green', content: 'Хобби' },
		{ id: 'education', label: 'Education', title: 'violet', content: 'Образование' },
	];

	// Общий контент, который будет использоваться в обоих случаях
	const content = (
		<ul className={styles.menuList}>
			{menuList.map((item, index) => (
				<li key={item.id} onClick={() => handleTabChange(item.id)}>
					{/* <div
						onClick={(e) => {
							e.stopPropagation(); // Останавливает всплытие события, чтобы избежать лишнего срабатывания
							toggleDropdown(index);
						}}
						className={styles.menuListWrapper}> */}
					<span className={styles.dropdownToggle}>
						{openIndex === index ?
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
					</span>
					&nbsp;
					<Arrowdown title={item.title} /> &nbsp;
					{item.label}
					{/* </div> */}
					{openIndex === index && <div className={styles.dropdownContent}>{item.content}</div>}
				</li>
			))}
		</ul>
	);

	// Условный рендеринг для мобильной и десктопной версии
	return isMobile ?
			<ul className={styles.menuList}>
				{menuList.map((item, index) => (
					<li key={item.id} onClick={() => handleTabChange(item.id)}>
						<div
							onClick={(e) => {
								e.stopPropagation(); // Останавливает всплытие события, чтобы избежать лишнего срабатывания
								toggleDropdown(index);
							}}
							className={styles.menuListWrapper}>
							<span className={styles.dropdownToggle}>
								{openIndex === index ?
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
							</span>
							&nbsp;
							<Arrowdown title={item.title} /> &nbsp;
							{item.label}
						</div>
						{openIndex === index && <div className={styles.dropdownContent}>{item.content}</div>}
					</li>
				))}
			</ul>
		:	content;
}

export default React.memo(MenuList);
