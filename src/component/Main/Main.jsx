import React from 'react';
import styles from './Main.module.scss';
import SnakeGame from '../Projects/SnakeGame/SnakeGame';
import TypingAnimation from '../TypingAnimation/TypingAnimation';

function Main() {
	return (
		<section className={styles.main}>
			<div class={styles.mainInfo}>
				<div class={styles.mainLeft}></div>
				<div class={styles.mainRight}>
					<TypingAnimation />
					<div>
						<SnakeGame />
					</div>
				</div>
			</div>

			<div className={styles.svgOne}>
				<svg
					width='700'
					height='700'
					viewBox='0 0 864 784'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<g opacity='0.4' filter='url(#filter0_f_64_2566)'>
						<path
							d='M673.469 258.482L689.984 477.861L655.759 582.726L485.295 609.598L413.003 448.57L297.588 487.343L184.059 311.368L174 177.746L452.567 174.828L523.099 285.846L673.469 258.482Z'
							fill='#43D9AD'
						/>
					</g>
					<defs>
						<filter
							id='filter0_f_64_2566'
							x='0'
							y='0.827728'
							width='863.983'
							height='782.77'
							filterUnits='userSpaceOnUse'
							color-interpolation-filters='sRGB'>
							<feFlood flood-opacity='0' result='BackgroundImageFix' />
							<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
							<feGaussianBlur stdDeviation='87' result='effect1_foregroundBlur_64_2566' />
						</filter>
					</defs>
				</svg>
			</div>
			<div className={styles.svgTwo}>
				{' '}
				<svg
					width='450'
					height='500'
					viewBox='0 0 868 831'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<g opacity='0.4' filter='url(#filter0_f_64_2565)'>
						<path
							d='M477.947 656.519L264.032 605.132L174.664 540.469L201.227 369.957L376.649 350.391L375.041 228.647L577.309 174.392L707.603 205.691L625.166 471.797L497.893 504.987L477.947 656.519Z'
							fill='#4D5BCE'
						/>
					</g>
					<defs>
						<filter
							id='filter0_f_64_2565'
							x='0.664062'
							y='0.391769'
							width='880.938'
							height='830.128'
							filterUnits='userSpaceOnUse'
							color-interpolation-filters='sRGB'>
							<feFlood flood-opacity='0' result='BackgroundImageFix' />
							<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
							<feGaussianBlur stdDeviation='87' result='effect1_foregroundBlur_64_2565' />
						</filter>
					</defs>
				</svg>
			</div>
		</section>
	);
}

export default Main;
