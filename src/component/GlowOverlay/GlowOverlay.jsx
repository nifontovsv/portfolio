import React, { useRef, useEffect } from 'react';
import styles from './GlowOverlay.module.scss';

const GlowOverlay = ({ children }) => {
	const overlayRef = useRef();

	useEffect(() => {
		const overlay = overlayRef.current;
		const parent = overlay.parentElement;

		const applyOverlayMask = (e) => {
			const x = e.pageX - parent.offsetLeft;
			const y = e.pageY - parent.offsetTop;
			overlay.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
		};

		const observer = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
				overlay.style.width = `${width}px`;
				overlay.style.height = `${height}px`;
			});
		});

		observer.observe(parent);
		document.body.addEventListener('pointermove', applyOverlayMask);

		return () => {
			document.body.removeEventListener('pointermove', applyOverlayMask);
			observer.disconnect();
		};
	}, []);

	return (
		<div ref={overlayRef} className={styles.glowOverlay}>
			{children}
		</div>
	);
};

export default GlowOverlay;
