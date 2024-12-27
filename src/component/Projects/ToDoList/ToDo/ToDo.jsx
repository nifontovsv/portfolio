import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	addTaskAC,
	deleteTaskAC,
	deleteToDoListAС,
	editTaskAC,
	filterTaskAC,
	statusTaskAC,
} from '../../../../state/todoReducer';
import styles from './ToDo.module.scss';

function ToDo({ todolist, handlerDeleteToDoList }) {
	const dispatch = useDispatch();
	const [input, setInput] = useState('');
	const [error, setError] = useState(null);
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [newText, setNewText] = useState('');

	const handleEditClick = (task) => {
		setEditingTaskId(task.id); // Устанавливаем ID редактируемой задачи
		setNewText(task.title.trim()); // Подставляем текст задачи
	};

	const handleSaveClick = () => {
		if (newText.trim() !== '') {
			dispatch(editTaskAC(todolist.id, editingTaskId, newText)); // Указываем ID списка
			setEditingTaskId(null); // Выходим из режима редактирования
		} else {
			setError('Task title cannot be empty.');
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSaveClick();
		}
	};

	const addTask = () => {
		if (input.trim() !== '') {
			dispatch(addTaskAC(todolist.id, input)); // Передаем ID текущего списка
			setInput('');
			setError(null); // Сбрасываем ошибку
		} else {
			setError('Task title cannot be empty.');
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
		setNewText(e.target.value);
		if (error) {
			setError(null);
		}
	};

	const deleteToDoList = () => {
		dispatch(deleteToDoListAС(todolist.id));
	};

	return (
		<section>
			<h2>{todolist.title}</h2>
			<button
				className={styles.deleteButton}
				onClick={deleteToDoList}
				style={{ color: 'red', fontSize: '0.9rem' }}>
				Delete List
			</button>
			<label>
				<input
					value={input}
					onKeyPress={onKeyPressHandler}
					onChange={onChangeInputHandler}
					type='text'
					// onDoubleClick={onDoubleClickEditHandler}
				/>
				<button onClick={addTask}>Add</button>
			</label>
			{error && <p>{error}</p>}
			<button onClick={() => filterTasks('all')}>All</button>
			<button onClick={() => filterTasks('active')}>Active</button>
			<button onClick={() => filterTasks('completed')}>Completed</button>
			<ul>
				{filteredTasks.map((task) => (
					<>
						<li
							// onClick={!editingTaskId ? () => statusTask(task.id) : undefined} альтернативный вариант
							onClick={() => {
								if (editingTaskId !== task.id) {
									statusTask(task.id);
								}
							}}
							className={task.isDone ? styles.checked : ''}
							key={task.id}>
							{editingTaskId === task.id ?
								<>
									<input
										type='text'
										value={newText}
										onKeyDown={handleKeyDown}
										onChange={onChangeEditInput}
									/>
									<button onClick={handleSaveClick}>Save</button>
								</>
							:	<span>{task.title}</span>}
							&nbsp;
						</li>
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleEditClick(task);
							}}>
							Edit
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								deleteTask(task.id);
							}}
							style={{ color: 'red' }}>
							Delete
						</button>
					</>
				))}
			</ul>
		</section>
	);
}

export default ToDo;
