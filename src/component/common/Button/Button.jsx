import React, { useRef, useState } from 'react';
import styles from './Button.module.scss';

const Button = ({ title, href }) => {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [hoverOpacity, setHoverOpacity] = useState(0);
	const hoverButtonRef = useRef(null);

	const handleMouseMove = (event) => {
		if (!hoverButtonRef.current) return;
		const rect = hoverButtonRef.current.getBoundingClientRect();

		setCursorPosition({
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		});
	};

	const handleMouseEnter = () => setHoverOpacity(1);
	const handleMouseLeave = () => setHoverOpacity(0);
	return (
		<a
			ref={hoverButtonRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={styles.btnWrapper}
			href={href}
		>
			<div
				className={styles.btnGradient}
				style={{
					opacity: hoverOpacity,
					background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
				}}
			/>
			<p className={styles.btnTitle}>{title}</p>
		</a>
	);
};

export default Button;
