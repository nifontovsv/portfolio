import { v1 } from 'uuid';

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const FILTER_TASK = 'FILTER_TASK';
const STATUS_TASK = 'STATUS_TASK';
const EDIT_TASK = 'EDIT_TASK';
const ADD_TODOLIST = 'ADD_TODOLIST';
const DELETE_TODOLIST = 'DELETE_TODOLIST';

const initialState = {
	toDoLists: [
		{
			id: v1(),
			title: 'lang',
			filter: 'all',
			tasks: [{ id: Date.now(), title: 'input', isDone: false }],
		},
	],
};

export const todoReducer = (state = initialState, action) => {
	console.log('Current State:', state);
	switch (action.type) {
		case ADD_TASK: {
			const { toDoListId, input } = action.payload;
			const newTask = { id: Date.now(), title: input, isDone: false };

			return {
				...state,
				toDoLists: state.toDoLists.map((toDoList) =>
					toDoList.id === toDoListId
						? { ...toDoList, tasks: [newTask, ...toDoList.tasks] }
						: toDoList
				),
			};
		}

		case DELETE_TASK: {
			const { toDoListId, taskId } = action.payload;
			return {
				...state,
				toDoLists: state.toDoLists.map((list) =>
					list.id === toDoListId
						? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
						: list
				),
			};
		}

		case STATUS_TASK: {
			const { toDoListId, taskId } = action.payload;

			return {
				...state,
				toDoLists: state.toDoLists.map((list) =>
					list.id === toDoListId
						? {
								...list,
								tasks: list.tasks.map((task) =>
									task.id === taskId ? { ...task, isDone: !task.isDone } : task
								),
						  }
						: list
				),
			};
		}

		case FILTER_TASK: {
			const { toDoListId, filter } = action.payload;
			return {
				...state,
				toDoLists: state.toDoLists.map((list) =>
					list.id === toDoListId ? { ...list, filter } : list
				),
			};
		}

		case EDIT_TASK: {
			const { toDoListId, taskId, newText } = action.payload;
			return {
				...state,
				toDoLists: state.toDoLists.map((list) =>
					list.id === toDoListId
						? {
								...list,
								tasks: list.tasks.map((task) =>
									task.id === taskId ? { ...task, title: newText } : task
								),
						  }
						: list
				),
			};
		}

		case ADD_TODOLIST: {
			const newToDoList = {
				id: v1(),
				title: action.payload.title,
				tasks: [],
			};
			// Проверяем, что toDoLists является массивом
			return {
				...state,
				toDoLists: Array.isArray(state.toDoLists)
					? [newToDoList, ...state.toDoLists]
					: [newToDoList], // Если toDoLists не массив, создаём новый
			};
		}

		case DELETE_TODOLIST: {
			const { toDoListId } = action.payload;

			return {
				...state,
				toDoLists: state.toDoLists.filter((list) => list.id !== toDoListId),
			};
		}
		default:
			return state;
	}
};

export const addTaskAC = (toDoListId, input) => ({
	type: ADD_TASK,
	payload: { toDoListId, input },
});

export const deleteTaskAC = (toDoListId, taskId) => ({
	type: DELETE_TASK,
	payload: { toDoListId, taskId },
});

export const statusTaskAC = (toDoListId, taskId) => ({
	type: STATUS_TASK,
	payload: { toDoListId, taskId },
});
export const filterTaskAC = (toDoListId, filter) => ({
	type: FILTER_TASK,
	payload: { toDoListId, filter },
});

export const editTaskAC = (toDoListId, taskId, newText) => ({
	type: EDIT_TASK,
	payload: { toDoListId, taskId, newText },
});

export const addToDoListAC = (title) => ({
	type: ADD_TODOLIST,
	payload: { title },
});
export const deleteToDoListAС = (toDoListId) => ({
	type: DELETE_TODOLIST,
	payload: { toDoListId },
});
