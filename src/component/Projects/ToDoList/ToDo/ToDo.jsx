import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	addTaskAC,
	deleteTaskAC,
	deleteToDoListAС,
	editTaskAC,
	filterTaskAC,
	statusTaskAC,
	updateTodolistTitleAC,
} from '../../../../state/todoReducer';
import styles from './ToDo.module.scss';
import ProgressBar from './ProgressBar/ProgressBar';
import Options from '../Options/Options';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function ToDo({ todolist, onDragStart }) {
	const dispatch = useDispatch();
	//cостояния
	const [input, setInput] = useState('');
	const [error, setError] = useState(null);
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [newText, setNewText] = useState('');
	const [editingTodolistId, setEditingTodolistId] = useState(null);
	const [newTextTodolist, setNewTextTodolist] = useState('');
	const [progress, setProgress] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const [isRendered, setIsRendered] = useState(false);
	const [showAddTaskInput, setShowAddTaskInput] = useState(false);
	// Рефы для отслеживания кликов вне инпута и кнопки
	const inputRef = useRef(null);
	const saveButtonRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			// Проверяем, был ли клик вне инпута или кнопки сохранения
			if (
				inputRef.current &&
				!inputRef.current.contains(e.target) &&
				saveButtonRef.current &&
				!saveButtonRef.current.contains(e.target)
			) {
				setEditingTaskId(null); // Закрываем режим редактирования
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const handleEditClick = (task) => {
		setEditingTaskId(task.id); // Устанавливаем ID редактируемой задачи
		setNewText(task.title.trim()); // Подставляем текст задачи
	};

	const handleSaveClick = () => {
		if (!newText || newText.trim() === '') {
			setError('Task title cannot be empty.');
			return;
		}
		dispatch(editTaskAC(todolist.id, editingTaskId, newText));
		setEditingTaskId(null);
		setNewText('');
		setError(null);
	};

	const handleSaveTodolistTitle = (e) => {
		if (newTextTodolist.trim() !== '') {
			dispatch(updateTodolistTitleAC(todolist.id, newTextTodolist));
			setEditingTodolistId(null); // Закрываем режим редактирования
		} else {
			setError('Title cannot be empty.');
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			if (editingTaskId) {
				handleSaveClick(); // Для сохранения задачи
			} else if (editingTodolistId) {
				if (newTextTodolist.trim() !== '') {
					dispatch(updateTodolistTitleAC(todolist.id, newTextTodolist));
					setEditingTodolistId(null);
					setError(null); // Очищаем ошибку при успешном сохранении
				} else {
					setError('Title cannot be empty.');
				}
			}
		}
	};

	const addTask = () => {
		if (input.trim() !== '') {
			dispatch(addTaskAC(todolist.id, input)); // Передаем ID текущего списка
			setInput('');
			setError(null); // Сбрасываем ошибку
		} else {
			setError('Task title cannot be empty');
		}
	};

	const onKeyPressHandler = (e) => {
		if (e.key === 'Enter') {
			addTask();
		}
	};

	const deleteTask = (taskId) => {
		dispatch(deleteTaskAC(todolist.id, taskId)); // Указываем ID списка
	};

	const statusTask = (taskId) => {
		dispatch(statusTaskAC(todolist.id, taskId)); // Передаем ID списка и задачи
	};

	const filterTasks = (filter) => {
		dispatch(filterTaskAC(todolist.id, filter)); // Передаём ID списка и фильтр
	};

	const filteredTasks =
		Array.isArray(todolist.tasks) ?
			todolist.tasks.filter((task) => {
				switch (todolist.filter) {
					case 'active':
						return !task.isDone;
					case 'completed':
						return task.isDone;
					default:
						return true;
				}
			})
		:	[];

	const onChangeInputHandler = (e) => {
		setInput(e.target.value);
		if (error) {
			setError(null);
		}
	};

	const onChangeEditInput = (e) => {
		setNewTextTodolist(e.target.value);
		if (error) {
			setError(null);
		}
	};
	const onChangeEditInputNewTask = (e) => {
		setNewText(e.target.value);
		if (error) {
			setError(null);
		}
	};

	const deleteToDoList = () => {
		dispatch(deleteToDoListAС(todolist.id));
	};

	const handleShowProgress = () => {
		if (isVisible) {
			setTimeout(() => setIsRendered(true), 300);
			setIsVisible(false);
			setTimeout(() => setIsRendered(false), 300); // Удаляем через 300ms
		} else {
			setIsRendered(true);
			setTimeout(() => setIsVisible(true), 300); // Включаем видимость
		}
	};

	// Вычисление задач
	const totalTasks = Array.isArray(todolist.tasks) ? todolist.tasks.length : 0;
	const completedTasks =
		Array.isArray(todolist.tasks) ?
			todolist.tasks.filter((task) => task.isDone).length
		:	0;
	const progressTasks =
		totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

	const formattedDate = new Date(todolist.creationDate).toLocaleDateString(
		'en-GB',
		{
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		}
	);

	const handleEditTitleTodolist = () => {
		setEditingTodolistId(todolist.id); // Устанавливаем ID редактируемой задачи
		setNewTextTodolist(todolist.title.trim()); // Подставляем текст задачи
	};

	const handleShowAddTaskInput = () => {
		setShowAddTaskInput(!showAddTaskInput);
	};

	return (
		<section
			draggable
			onDragStart={() => onDragStart(todolist)}
			className={`${styles.todo} ${isVisible ? styles.showTodo : ''}`}
		>
			<div className={styles.headerTodo}>
				{editingTodolistId === todolist.id ?
					<div className={styles.editHeaderTodolist}>
						<input
							className={styles.editInputHeaderTodolist}
							type='text'
							value={newTextTodolist}
							onKeyDown={handleKeyDown}
							onChange={onChangeEditInput}
						/>
						<IconButton
							className={styles.editIconHeaderTodolist}
							onClick={handleSaveTodolistTitle}
							ref={saveButtonRef}
						>
							<DoneIcon className={styles.editBtnHeaderTodolist} />
						</IconButton>
					</div>
				:	<h2>{todolist.title}</h2>}
				<Options
					handleEditTitleTodolist={handleEditTitleTodolist}
					deleteToDoList={deleteToDoList}
				/>
			</div>
			<div className={styles.mainTodo}>
				<div className={styles.mainTodoHeader}>
					<div
						onClick={handleShowProgress}
						className={styles.mainTodoHeaderIcon}
					>
						<svg
							width='12'
							height='8'
							viewBox='0 0 12 8'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M0.666656 0.666667C0.666656 0.298477 0.965133 0 1.33332 0H1.99999C2.36818 0 2.66666 0.298477 2.66666 0.666667C2.66666 1.03486 2.36818 1.33333 1.99999 1.33333H1.33332C0.965133 1.33333 0.666656 1.03486 0.666656 0.666667ZM3.99999 0.666667C3.99999 0.298477 4.29847 0 4.66666 0H10.6667C11.0348 0 11.3333 0.298477 11.3333 0.666667C11.3333 1.03486 11.0348 1.33333 10.6667 1.33333H4.66666C4.29847 1.33333 3.99999 1.03486 3.99999 0.666667ZM0.666656 4C0.666656 3.63181 0.965133 3.33333 1.33332 3.33333H1.99999C2.36818 3.33333 2.66666 3.63181 2.66666 4C2.66666 4.36819 2.36818 4.66667 1.99999 4.66667H1.33332C0.965133 4.66667 0.666656 4.36819 0.666656 4ZM3.99999 4C3.99999 3.63181 4.29847 3.33333 4.66666 3.33333H10.6667C11.0348 3.33333 11.3333 3.63181 11.3333 4C11.3333 4.36819 11.0348 4.66667 10.6667 4.66667H4.66666C4.29847 4.66667 3.99999 4.36819 3.99999 4ZM0.666656 7.33333C0.666656 6.96514 0.965133 6.66667 1.33332 6.66667H1.99999C2.36818 6.66667 2.66666 6.96514 2.66666 7.33333C2.66666 7.70152 2.36818 8 1.99999 8H1.33332C0.965133 8 0.666656 7.70152 0.666656 7.33333ZM3.99999 7.33333C3.99999 6.96514 4.29847 6.66667 4.66666 6.66667H10.6667C11.0348 6.66667 11.3333 6.96514 11.3333 7.33333C11.3333 7.70152 11.0348 8 10.6667 8H4.66666C4.29847 8 3.99999 7.70152 3.99999 7.33333Z'
								fill='white'
							/>
						</svg>
						<p>Progress</p>
					</div>
					<span className={styles.totalTasks}>
						{completedTasks}/{totalTasks}
					</span>
				</div>
				<div className={styles.ProgressBar}>
					<ProgressBar value={progressTasks} max={100} />
				</div>
				{isRendered && (
					<div className={`${styles.allTasks} ${isVisible ? styles.show : ''}`}>
						{showAddTaskInput ?
							<div className={styles.blockAddTask}>
								<div className={styles.blockAddTaskLabel}>
									<label>
										<input
											className={styles.blockAddTaskInput}
											value={input}
											onKeyDown={onKeyPressHandler}
											onChange={onChangeInputHandler}
											type='text'
										/>
										<IconButton
											className={styles.AddCircleBtn}
											onClick={addTask}
											disableRipple
										>
											<AddCircleIcon className={styles.AddCircleIcon} />
										</IconButton>
									</label>
									{error && (
										<span style={{ color: 'red', fontSize: '12px' }}>
											{error}
										</span>
									)}
								</div>
								<div
									onClick={handleShowAddTaskInput}
									className={styles.closeNewTask}
								>
									<CloseIcon style={{ fontSize: 'large' }} />
								</div>
							</div>
						:	<div
								onClick={handleShowAddTaskInput}
								className={styles.addNewTask}
							>
								<AddIcon
									className={styles.addIcon}
									style={{ fontSize: 'large' }}
								/>
								<p>Add new task</p>
							</div>
						}
						<ul className={styles.menuTasks}>
							{filteredTasks.map((task) => (
								<div className={styles.wrapperTasks}>
									<li
										onClick={() => {
											if (editingTaskId !== task.id) {
												// Если задача становится выполненной
												if (!task.isDone) {
													statusTask(task.id);
													setProgress((prev) =>
														Math.min(prev + 100 / filteredTasks.length, 100)
													);
												} else {
													// Если задача снова становится невыполненной
													statusTask(task.id);
													setProgress((prev) =>
														Math.max(prev - 100 / filteredTasks.length, 0)
													);
												}
											}
										}}
										className={`${styles.menuTask} ${task.isDone ? styles.checked : ''}`}
										key={task.id}
									>
										{editingTaskId === task.id ?
											<div className={styles.blockEdit}>
												<label>
													<input
														className={styles.blockEditInput}
														type='text'
														value={newText}
														onKeyDown={handleKeyDown}
														onChange={onChangeEditInputNewTask}
														ref={inputRef} // Привязываем ref к инпуту
													/>
													{/* {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>} */}
													<IconButton
														className={styles.AddCircleBtn}
														onClick={handleSaveClick}
														disableRipple
														ref={saveButtonRef}
													>
														<DoneIcon className={styles.blockEditBtn} />
													</IconButton>
												</label>
											</div>
										:	<span>{task.title}</span>}
										&nbsp;
									</li>
									<IconButton
										className={styles.editTask}
										aria-label='delete'
										size='small'
										disableRipple
									>
										<EditIcon
											size='small'
											onClick={(e) => {
												e.stopPropagation();
												handleEditClick(task);
											}}
										>
											Edit
										</EditIcon>
									</IconButton>
									<IconButton
										className={styles.deleteTask}
										aria-label='delete'
										size='small'
										disableRipple
									>
										<DeleteIcon
											sx={{ fontSize: 10 }}
											onClick={(e) => {
												e.stopPropagation();
												deleteTask(task.id);
												setProgress((prev) =>
													Math.max(prev - 100 / filteredTasks.length, 0)
												);
											}}
										>
											Delete
										</DeleteIcon>
									</IconButton>
								</div>
							))}
						</ul>
					</div>
				)}
			</div>
			<div className={styles.footerTodo}>
				<p className={styles.dateTodo}>{formattedDate}</p>
			</div>
		</section>
	);
}

export default ToDo;
