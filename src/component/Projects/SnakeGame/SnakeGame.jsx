import React, { useState, useEffect } from 'react';
import GamePieces from './GamePieces';
import styles from './SnakeGame.module.scss';

const SnakeGame = () => {
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore')) || 0);
	const [gameOver, setGameOver] = useState(false);
	const [collisionType, setCollisionType] = useState(null);

	const handleGameOver = (type) => {
		setGameOver(true);

		if (score > highScore) {
			setHighScore(score);
			localStorage.setItem('highScore', score.toString());
		}

		setCollisionType(type);
	};

	const handleResetGame = () => {
		setScore(0);
		setGameOver(false);
	};

	useEffect(() => {
		const handleKeyPress = (e) => {
			if (gameOver && e.key === 'Enter') {
				handleResetGame();
			}
		};

		window.addEventListener('keydown', handleKeyPress);
	}, [gameOver]);

	const title = '// use keyboard';
	const title2 = '// arrows to play';
	const title3 = '// food left';
	const titleScore = '// Score:';
	const titleHighScore = '// High Score:';

	return (
		<div className={styles.gameContainer}>
			<div className={styles.gameCanvas}>
				{gameOver ?
					<div className={styles.gameOver}>
						<h1>Game Over</h1>
						{/* <p>{collisionType === 'wall' ? 'You Hit the wall' : 'You Ate yourself'}</p> */}
						<p>Press Enter to Restart</p>
					</div>
				:	<GamePieces
						score={score}
						setScore={setScore}
						onGameOver={(type) => handleGameOver(type)}
					/>
				}
				{/* className={gameOver ? 'hiddenInstruction' : 'instructions'} */}
			</div>
			<div className={styles.instructions}>
				<div>
					<p>{title}</p>
					<p>{title2}</p>
					<svg
						width='51'
						height='30'
						viewBox='0 0 51 30'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<rect
							x='1.46094'
							y='1.46356'
							width='48.0787'
							height='27.6912'
							rx='7.5'
							fill='#010C15'
							stroke='#1E2D3D'
						/>
						<path d='M25.5 12.3091L29.75 18.3091H21.25L25.5 12.3091Z' fill='white' />
					</svg>
					<br />
					<svg
						width='50'
						height='30'
						viewBox='0 0 50 30'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<rect
							x='49.0781'
							y='28.6547'
							width='48.0787'
							height='27.6912'
							rx='7.5'
							transform='rotate(-180 49.0781 28.6547)'
							fill='#010C15'
							stroke='#1E2D3D'
						/>
						<path
							d='M22.0391 14.8091L28.0391 10.5591L28.0391 19.0592L22.0391 14.8091Z'
							fill='white'
						/>
					</svg>
					<svg
						width='51'
						height='30'
						viewBox='0 0 51 30'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<rect
							x='49.5391'
							y='28.6547'
							width='48.0787'
							height='27.6912'
							rx='7.5'
							transform='rotate(-180 49.5391 28.6547)'
							fill='#010C15'
							stroke='#1E2D3D'
						/>
						<path d='M25.5 17.8091L21.25 11.8091L29.75 11.8091L25.5 17.8091Z' fill='white' />
					</svg>
					<svg
						width='50'
						height='30'
						viewBox='0 0 50 30'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<rect
							x='49'
							y='28.6547'
							width='48.0787'
							height='27.6912'
							rx='7.5'
							transform='rotate(-180 49 28.6547)'
							fill='#010C15'
							stroke='#1E2D3D'
						/>
						<path
							d='M27.9609 14.8091L21.9609 19.0592L21.9609 10.5591L27.9609 14.8091Z'
							fill='white'
						/>
					</svg>
				</div>
				<div>
					<p>
						{titleHighScore} {highScore}
					</p>
					<p>
						{titleScore}
						{score}
					</p>
					<p>{title3}</p>
				</div>
			</div>
		</div>
	);
};

export default SnakeGame;
