import React, { useRef, useState } from 'react';
import styles from './Button.module.scss';

const Button = ({ title }) => {
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
		<div
			ref={hoverButtonRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={styles.btnWrapper}
		>
			<div
				className={styles.btnGradient}
				style={{
					opacity: hoverOpacity,
					background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
				}}
			/>
			<p className={styles.btnTitle}>{title}</p>
		</div>
	);
};

export default Button;
