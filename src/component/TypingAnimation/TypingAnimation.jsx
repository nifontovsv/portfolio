import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import styles from '../Main/Main.module.scss';

const TypingAnimation = () => {
	useEffect(() => {
		anime({
			targets: '.line',
			opacity: [0, 1],
			translateY: ['1em', '0em'],
			duration: 500,
			easing: 'easeInOutQuad',
			delay: anime.stagger(600), // добавляет задержку между элементами
		});
	}, []);

	return (
		<div className={styles.mainInfo_1}>
			<div className={styles.mainInfoTextOne}>
				<p className='line'>Hi all. I am</p>
				<h1 className='line'>Sergey Nifontov</h1>
				<h3 className='line'>Front-end developer</h3>
			</div>
			<div
				style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
				className={styles.mainInfoTextTwo}
			>
				<p className='line'>// complete the game to continue</p>
				<p className='line'>// you can also see it on my Github page</p>
				<span className='line' style={{ color: '#4d5bce' }}>
					const{' '}
				</span>
				<span className='line' style={{ color: '#43d9ad' }}>
					githubLink ={' '}
				</span>
				<a
					className='line'
					target='_blank'
					rel='noopener noreferrer'
					href='https://github.com/nifontovsv'
				>
					“https://github.com/nifontovsv”
				</a>
			</div>
		</div>
	);
};

export default TypingAnimation;
