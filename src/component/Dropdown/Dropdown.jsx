import React, { useState } from 'react';

const Dropdown = ({ title, items, icon }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<div>
			<div onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
				<span>
					{isOpen ?
						<svg
							width='13'
							height='9'
							viewBox='0 0 13 9'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M6.364 5.27715L11.314 0.327148L12.728 1.74115L6.364 8.10515L0 1.74115L1.414 0.327148L6.364 5.27715Z'
								fill='#607B96'
							/>
						</svg>
					:	<svg
							width='9'
							height='14'
							viewBox='0 0 9 14'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M5.69658 7.20289L0.746582 2.25289L2.16058 0.838894L8.52458 7.20289L2.16058 13.5669L0.746582 12.1529L5.69658 7.20289Z'
								fill='#607B96'
							/>
						</svg>
					}{' '}
					{icon} {title}
				</span>
			</div>
			{isOpen && (
				<ul style={{ border: '1px solid #ccc', marginTop: '5px', padding: '10px' }}>
					{items.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
