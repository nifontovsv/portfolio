import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToDo from './ToDo/ToDo';
import { addToDoListAC } from '../../../state/todoReducer';
import styles from './ToDoList.module.scss';

function ToDoList() {
	const dispatch = useDispatch();
	const todolists = useSelector((state) => state.todo.toDoLists || []);

	const [newToDoListTitle, setNewToDoListTitle] = useState('');
	const [error, setError] = useState(false);
	const [isModal, setIsModal] = useState(false);

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
			<button onClick={closeModal}>new todolist</button>
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
							/>
							{error}
						</label>

						<button className={styles.btnAddTodolist} onClick={handlerAddToDoList}>
							Add To Do List
						</button>
					</div>
				</div>
			)}
			<div>
				{Array.isArray(todolists) && todolists.length > 0 ?
					todolists.map((todolist) => <ToDo key={todolist.id} todolist={todolist} />)
				:	<p>No ToDoLists available</p>}
			</div>
		</section>
	);
}

export default ToDoList;
