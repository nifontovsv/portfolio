import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToDo from './ToDo/ToDo';
import { addToDoListAC } from '../../../state/todoReducer';

function ToDoList() {
	const dispatch = useDispatch();
	const todolists = useSelector((state) => state.todo.toDoLists || []);

	const [newToDoListTitle, setNewToDoListTitle] = useState('');

	const handlerAddToDoList = () => {
		if (newToDoListTitle.trim()) {
			dispatch(addToDoListAC(newToDoListTitle));
			setNewToDoListTitle('');
		}
	};

	return (
		<section>
			<div>
				<input
					type='text'
					value={newToDoListTitle}
					onChange={(e) => setNewToDoListTitle(e.target.value)}
					placeholder='Title your ToDoList'
				/>
				<button onClick={handlerAddToDoList}>Add To Do List</button>
			</div>
			<div>
				{Array.isArray(todolists) && todolists.length > 0 ? (
					todolists.map((todolist) => <ToDo key={todolist.id} todolist={todolist} />)
				) : (
					<p>No ToDoLists available</p>
				)}
			</div>
		</section>
	);
}

export default ToDoList;
