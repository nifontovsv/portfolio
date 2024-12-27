import { v1 } from 'uuid';
import { todolistId1, todolistId2 } from './todolistsReducer';

const initialState = {
	[todolistId1]: [
		{ id: v1(), title: 'HTML & CSS', isDone: false },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'React', isDone: false },
		{ id: v1(), title: 'Redux', isDone: true },
		{ id: v1(), title: 'GraphQL', isDone: true },
	],
	[todolistId2]: [
		{ id: v1(), title: 'Book', isDone: false },
		{ id: v1(), title: 'Milk', isDone: true },
	],
};

export const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			//создаём копию стейта
			const stateCopy = { ...state };
			// создаём переменную и кладём в неё массив, id которого пришёл нам в action
			const tasks = stateCopy[action.todolistId];
			//удаляем задачу с taskId, который пришёл в action с помощью фильтра
			const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
			// перезаписываем скопированный стейт в новый с учётом фильтрации и возвращаем его
			stateCopy[action.todolistId] = filteredTasks;
			return stateCopy;
		}
		case 'ADD-TASK': {
			const stateCopy = { ...state };
			const tasks = stateCopy[action.todolistId];
			const newTask = { id: v1(), title: action.title, isDone: false };
			const newTasks = [newTask, ...tasks];
			stateCopy[action.todolistId] = newTasks;
			return stateCopy;
		}
		case 'CHANGE-TASK-STATUS': {
			const stateCopy = { ...state };
			let tasks = stateCopy[action.todolistId];
			let task = tasks.find((t) => t.id === action.taskId);
			if (task) {
				task.isDone = action.isDone;
			}
			return stateCopy;
		}
		case 'CHANGE-TASK-TITLE': {
			const stateCopy = { ...state };
			let tasks = stateCopy[action.todolistId];
			let task = tasks.find((t) => t.id === action.taskId);
			if (task) {
				task.title = action.title;
			}
			return stateCopy;
		}
		case 'ADD_TODOLIST': {
			const stateCopy = { ...state };
			stateCopy[action.todolistId] = [];
			return stateCopy;
		}
		case 'REMOVE_TODOLIST': {
			const stateCopy = { ...state };
			delete stateCopy[action.id];
			return stateCopy;
		}
		default:
			return state;
	}
};

export const removeTaskAC = (taskId, todolistId) => {
	return { type: 'REMOVE-TASK', todolistId, taskId };
};
export const addTaskAC = (title, todolistId) => {
	return { type: 'ADD-TASK', title, todolistId };
};
export const changeTaskStatusAC = (taskId, isDone, todolistId) => {
	return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId };
};

export const changeTaskTitleAC = (taskId, title, todolistId) => {
	return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId };
};
