import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToDo from './ToDo/ToDo';
import {
	addItemInNewToDoListAС,
	addToDoListAC,
	removeItemInNewToDoListAС,
} from '../../../state/todoReducer';
import styles from './ToDoList.module.scss';

function ToDoList() {
	const dispatch = useDispatch();
	//state
	const todolists = useSelector((state) => state.todo.toDoLists || []);
	const listTwo = useSelector((state) => state.todo.toDoLists2 || []);
	const listThree = useSelector((state) => state.todo.toDoLists3 || []);

	useEffect(() => {
		localStorage.setItem('todoState', JSON.stringify(todolists));
	}, [todolists]);
	//состояния
	const [newToDoListTitle, setNewToDoListTitle] = useState('');
	const [error, setError] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [draggedItem, setDraggedItem] = useState(null);
	const [sourceList, setSourceList] = useState(null);

	const handleDragStart = (item, list) => {
		if (!item || !list) {
			console.error('Invalid drag start:', { item, list });
			return;
		}
		setDraggedItem(item);
		setSourceList(list);
	};

	const handleDrop = (targetList) => {
		// Если элемент перетащен в тот же список, ничего не делать
		if (!draggedItem || sourceList === targetList) {
			setDraggedItem(null);
			setSourceList(null);
			return;
		}

		// Убедиться, что оба списка существуют
		if (sourceList && targetList) {
			dispatch(removeItemInNewToDoListAС(sourceList, draggedItem)); // Удаляем из исходного списка
			dispatch(addItemInNewToDoListAС(targetList, draggedItem)); // Добавляем в целевой список
		}

		// Сброс состояния
		setDraggedItem(null);
		setSourceList(null);
	};

	const handlerAddToDoList = () => {
		if (newToDoListTitle.trim()) {
			setError(false);
			dispatch(addToDoListAC(newToDoListTitle));
			setNewToDoListTitle('');
			setIsModal(false);
		} else if (newToDoListTitle === '') {
			setError('Please, enter the name of your to-do list');
		}
	};

	const handleKeyDownAddToDoList = (e) => {
		if (e.key === 'Enter') {
			handlerAddToDoList();
		}
	};

	const onInputChange = (e) => {
		setNewToDoListTitle(e.target.value);

		// Сбрасываем ошибку, если пользователь начал вводить текст
		if (error && e.target.value.trim()) {
			setError(false);
		}
	};

	const closeModal = () => {
		setIsModal(!isModal);
		setError(false);
	};

	return (
		<section className={styles.todolist}>
			<div className={styles.headerTodolist}>
				<button className={styles.btnNewTodolist} onClick={closeModal}>
					New todolist
				</button>
			</div>
			{isModal && (
				<div className={styles.modalWindow}>
					<div onClick={() => setIsModal(false)} className={styles.closeModal}>
						<svg width={30} height={30} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'>
							<path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
						</svg>
					</div>
					<div className={styles.createTodolist}>
						<label>
							<input
								className={styles.inputTodolist}
								type='text'
								value={newToDoListTitle}
								onChange={onInputChange}
								placeholder='Title your ToDoList'
								onKeyPress={handleKeyDownAddToDoList}
							/>
							{error}
						</label>

						<button className={styles.btnAddTodolist} onClick={handlerAddToDoList}>
							Add To Do List
						</button>
					</div>
				</div>
			)}
			<div className={styles.items}>
				<div
					onDrop={() => handleDrop('toDoLists')}
					onDragOver={(e) => e.preventDefault()}
					className={`${styles.allTodo} ${styles.item}`}>
					<h3 className={styles.itemTitle}>To do</h3>{' '}
					{Array.isArray(todolists) && todolists.length > 0 ?
						todolists.map((todolist) => (
							<ToDo
								draggable
								onDragStart={() => handleDragStart(todolist, 'toDoLists')}
								key={todolist.id}
								todolist={todolist}
							/>
						))
					:	<p>No ToDoLists available</p>}
				</div>
				<div
					onDrop={() => handleDrop('toDoLists2')}
					onDragOver={(e) => e.preventDefault()}
					className={`${styles.inProgress} ${styles.item}`}>
					<h3 className={styles.itemTitle}>In progress</h3>
					{Array.isArray(listTwo) && listTwo.length > 0 ?
						listTwo.map((todolist) => (
							<ToDo
								draggable
								onDragStart={() => handleDragStart(todolist, 'toDoLists2')}
								key={todolist.id}
								todolist={todolist}
							/>
						))
					:	<p>No ToDoLists available</p>}
				</div>
				<div
					onDrop={() => handleDrop('toDoLists3')}
					onDragOver={(e) => e.preventDefault()}
					className={`${styles.done} ${styles.item}`}>
					<h3 className={styles.itemTitle}>Done</h3>{' '}
					{Array.isArray(listThree) && listThree.length > 0 ?
						listThree.map((todolist) => (
							<ToDo
								draggable
								onDragStart={() => handleDragStart(todolist, 'toDoLists3')}
								key={todolist.id}
								todolist={todolist}
							/>
						))
					:	<p>No ToDoLists available</p>}
				</div>
			</div>
		</section>
	);
}

export default ToDoList;
