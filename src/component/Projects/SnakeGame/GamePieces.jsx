import styles from './SnakeGame.module.scss';
import React, { useState, useEffect, useRef, useReducer } from 'react';

const SNAKE_SPEED = 10;
const FRAME_RATE = 60; // Частота обновления игры в миллисекундах
const TOTAL_LAMPS = 20; // Количество лампочек

const initialState = {
	snake: [
		{ x: 100, y: 50 },
		{ x: 90, y: 50 },
	],
	direction: null,
	apple: { x: 180, y: 100 },
};

const gameReducer = (state, action) => {
	switch (action.type) {
		case 'MOVE_SNAKE':
			return { ...state, snake: action.payload.snake };
		case 'SET_DIRECTION':
			return { ...state, direction: action.payload.direction };
		case 'EAT_APPLE':
			return { ...state, apple: action.payload.apple, snake: action.payload.snake };
		default:
			return state;
	}
};

const GamePieces = ({ score, setScore, onGameOver }) => {
	const canvasRef = useRef();
	const [{ snake, direction, apple }, dispatch] = useReducer(gameReducer, initialState);
	const [lamps, setLamps] = useState(Array(TOTAL_LAMPS).fill(false)); // Изначально все лампочки выключены

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		const drawSnake = () => {
			ctx.shadowColor = '#43D9AD';
			ctx.shadowBlur = 20;
			ctx.beginPath();
			ctx.moveTo(snake[0].x + 5, snake[0].y + 5);
			snake.forEach((segment) => {
				ctx.lineTo(segment.x + 5, segment.y + 5);
			});
			ctx.strokeStyle = '#43D9AD';
			ctx.lineWidth = 10;
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';
			ctx.stroke();

			ctx.shadowBlur = 0;
			ctx.beginPath();
			ctx.arc(snake[0].x + 3, snake[0].y + 3, 1, 0, Math.PI * 2);
			ctx.fillStyle = '#000';
			ctx.fill();
			ctx.beginPath();
			ctx.arc(snake[0].x + 7, snake[0].y + 3, 1, 0, Math.PI * 2);
			ctx.fill();
		};

		const drawApple = () => {
			ctx.shadowColor = '#43D9AD';
			ctx.shadowBlur = 10;
			ctx.beginPath();
			ctx.arc(apple.x + 5, apple.y + 5, 5, 0, 2 * Math.PI);
			ctx.fillStyle = '#43D9AD';
			ctx.fill();
			ctx.closePath();
		};

		const moveSnake = () => {
			if (direction) {
				const newSnake = [...snake];
				const head = { ...newSnake[0] };

				switch (direction) {
					case 'right':
						head.x += SNAKE_SPEED;
						break;
					case 'left':
						head.x -= SNAKE_SPEED;
						break;
					case 'up':
						head.y -= SNAKE_SPEED;
						break;
					case 'down':
						head.y += SNAKE_SPEED;
						break;
					default:
						break;
				}

				// Ограничение движения в пределах поля
				head.x = Math.max(0, Math.min(canvas.width - SNAKE_SPEED, head.x));
				head.y = Math.max(0, Math.min(canvas.height - SNAKE_SPEED, head.y));

				newSnake.unshift(head);
				if (head.x === apple.x && head.y === apple.y) {
					setScore((prev) => prev + 1);
					const newApple = {
						x:
							Math.floor((Math.random() * (canvas.width - SNAKE_SPEED)) / SNAKE_SPEED) *
							SNAKE_SPEED,
						y:
							Math.floor((Math.random() * (canvas.height - SNAKE_SPEED)) / SNAKE_SPEED) *
							SNAKE_SPEED,
					};
					dispatch({ type: 'EAT_APPLE', payload: { apple: newApple, snake: newSnake } });

					// Зажигаем следующую лампочку
					setLamps((prev) => {
						const nextLamps = [...prev];
						const indexToLight = prev.findIndex((lamp) => !lamp);
						if (indexToLight !== -1) nextLamps[indexToLight] = true;
						return nextLamps;
					});
				} else {
					newSnake.pop();
					dispatch({ type: 'MOVE_SNAKE', payload: { snake: newSnake } });
				}
			}
		};

		const checkCollisions = () => {
			const [head, ...body] = snake;
			if (body.some((segment) => segment.x === head.x && segment.y === head.y)) {
				onGameOver('collision');
			}
		};

		const gameLoop = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawSnake();
			drawApple();
			moveSnake();
			checkCollisions();
		};

		const interval = setInterval(gameLoop, FRAME_RATE);

		return () => clearInterval(interval);
	}, [snake, direction, apple]);

	useEffect(() => {
		const handleKeyPress = (e) => {
			switch (e.key) {
				case 'ArrowRight':
				case 'd':
					if (direction !== 'left')
						dispatch({ type: 'SET_DIRECTION', payload: { direction: 'right' } });
					break;
				case 'ArrowLeft':
				case 'a':
					if (direction !== 'right')
						dispatch({ type: 'SET_DIRECTION', payload: { direction: 'left' } });
					break;
				case 'ArrowUp':
				case 'w':
					if (direction !== 'down')
						dispatch({ type: 'SET_DIRECTION', payload: { direction: 'up' } });
					break;
				case 'ArrowDown':
				case 's':
					if (direction !== 'up')
						dispatch({ type: 'SET_DIRECTION', payload: { direction: 'down' } });
					break;
				default:
					break;
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [direction]);

	return (
		<>
			<div className={styles.indicator}>
				{lamps.map((isOn, index) => (
					<div key={index} className={`${styles.lamp} ${isOn ? styles.on : styles.off}`}></div>
				))}
			</div>
			<canvas ref={canvasRef} width={300} height={400} />
		</>
	);
};

export default GamePieces;
