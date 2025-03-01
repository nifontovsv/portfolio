import { v1 } from 'uuid';

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const FILTER_TASK = 'FILTER_TASK';
const STATUS_TASK = 'STATUS_TASK';
const EDIT_TASK = 'EDIT_TASK';
const ADD_TODOLIST = 'ADD_TODOLIST';
const DELETE_TODOLIST = 'DELETE_TODOLIST';
const EDIT_TODOLIST = 'EDIT_TODOLIST';
const ADD_ITEM_NEW_TODOLIST = 'ADD_ITEM_NEW_TODOLIST';
const REMOVE_ITEM_NEW_TODOLIST = 'REMOVE_ITEM_NEW_TODOLIST';

const defaultState = {
	toDoLists: [
		{
			id: v1(),
			title: 'lang',
			filter: 'all',
			tasks: [{ id: Date.now(), title: 'input', isDone: false }],
		},
	],
	toDoLists2: [],
	toDoLists3: [],
};

const loadState = () => {
	const savedState = localStorage.getItem('todoState');
	return savedState ? JSON.parse(savedState) : defaultState;
};

const initialState = loadState();

export const todoReducer = (state = initialState, action) => {
	console.log('Current State:', state);
	switch (action.type) {
		// case ADD_TASK: {
		// 	const { toDoListId, input } = action.payload;
		// 	const newTask = { id: Date.now(), title: input, isDone: false };
		// 	return {
		// 		...state,
		// 		toDoLists: state.toDoLists.map((toDoList) =>
		// 			toDoList.id === toDoListId ?
		// 				{ ...toDoList, tasks: [...toDoList.tasks, newTask] }
		// 			:	toDoList
		// 		),
		// 		toDoLists2: state.toDoLists2.map((toDoList) =>
		// 			toDoList.id === toDoListId ?
		// 				{ ...toDoList, tasks: [...toDoList.tasks, newTask] }
		// 			:	toDoList
		// 		),
		// 		toDoLists3: state.toDoLists3.map((toDoList) =>
		// 			toDoList.id === toDoListId ?
		// 				{ ...toDoList, tasks: [...toDoList.tasks, newTask] }
		// 			:	toDoList
		// 		),
		// 	};
		// }

		case ADD_TASK: {
			const { toDoListId, input } = action.payload;
			const newTask = { id: Date.now(), title: input, isDone: false };

			return {
				...state,
				toDoLists:
					state.toDoLists?.map((toDoList) =>
						toDoList.id === toDoListId ?
							{ ...toDoList, tasks: [...toDoList.tasks, newTask] }
						:	toDoList
					) || [], // Если state.toDoLists undefined, возвращаем пустой массив
				toDoLists2:
					state.toDoLists2?.map((toDoList) =>
						toDoList.id === toDoListId ?
							{ ...toDoList, tasks: [...toDoList.tasks, newTask] }
						:	toDoList
					) || [], // То же для toDoLists2
				toDoLists3:
					state.toDoLists3?.map((toDoList) =>
						toDoList.id === toDoListId ?
							{ ...toDoList, tasks: [...toDoList.tasks, newTask] }
						:	toDoList
					) || [], // То же для toDoLists3
			};
		}

		case DELETE_TASK: {
			const { toDoListId, taskId } = action.payload;
			return {
				...state,
				toDoLists: state.toDoLists.map((list) =>
					list.id === toDoListId ?
						{ ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
					:	list
				),
				toDoLists2: state.toDoLists2.map((list) =>
					list.id === toDoListId ?
						{ ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
					:	list
				),
				toDoLists3: state.toDoLists3.map((list) =>
					list.id === toDoListId ?
						{ ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
					:	list
				),
			};
		}

		case STATUS_TASK: {
			const { toDoListId, taskId } = action.payload;

			return {
				...state,
				toDoLists: state.toDoLists.map((list) =>
					list.id === toDoListId ?
						{
							...list,
							tasks: list.tasks.map((task) =>
								task.id === taskId ? { ...task, isDone: !task.isDone } : task
							),
						}
					:	list
				),
				toDoLists2: state.toDoLists2.map((list) =>
					list.id === toDoListId ?
						{
							...list,
							tasks: list.tasks.map((task) =>
								task.id === taskId ? { ...task, isDone: !task.isDone } : task
							),
						}
					:	list
				),
				toDoLists3: state.toDoLists3.map((list) =>
					list.id === toDoListId ?
						{
							...list,
							tasks: list.tasks.map((task) =>
								task.id === taskId ? { ...task, isDone: !task.isDone } : task
							),
						}
					:	list
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
				toDoLists2: state.toDoLists2.map((list) =>
					list.id === toDoListId ? { ...list, filter } : list
				),
				toDoLists3: state.toDoLists3.map((list) =>
					list.id === toDoListId ? { ...list, filter } : list
				),
			};
		}

		case EDIT_TASK: {
			const { toDoListId, taskId, newText } = action.payload;
			return {
				...state,
				toDoLists: state.toDoLists.map((list) =>
					list.id === toDoListId ?
						{
							...list,
							tasks: list.tasks.map((task) =>
								task.id === taskId ? { ...task, title: newText } : task
							),
						}
					:	list
				),
				toDoLists2: state.toDoLists2.map((list) =>
					list.id === toDoListId ?
						{
							...list,
							tasks: list.tasks.map((task) =>
								task.id === taskId ? { ...task, title: newText } : task
							),
						}
					:	list
				),
				toDoLists3: state.toDoLists3.map((list) =>
					list.id === toDoListId ?
						{
							...list,
							tasks: list.tasks.map((task) =>
								task.id === taskId ? { ...task, title: newText } : task
							),
						}
					:	list
				),
			};
		}

		case EDIT_TODOLIST: {
			const { toDoListId, newText } = action.payload;
			return {
				...state,
				toDoLists: state.toDoLists.map((list) =>
					list.id === toDoListId ? { ...list, title: newText } : list
				),
				toDoLists2: state.toDoLists2.map((list) =>
					list.id === toDoListId ? { ...list, title: newText } : list
				),
				toDoLists3: state.toDoLists3.map((list) =>
					list.id === toDoListId ? { ...list, title: newText } : list
				),
			};
		}

		case ADD_TODOLIST: {
			const newToDoList = {
				id: v1(),
				title: action.payload.title,
				creationDate: new Date().toISOString(), // Дата в ISO формате
				tasks: [],
			};
			// Проверяем, что toDoLists является массивом
			return {
				...state,
				toDoLists:
					Array.isArray(state.toDoLists) ?
						[newToDoList, ...state.toDoLists]
					:	[newToDoList], // Если toDoLists не массив, создаём новый
			};
		}

		case DELETE_TODOLIST: {
			const { toDoListId } = action.payload;
			return {
				...state,
				toDoLists: state.toDoLists.filter((list) => list.id !== toDoListId),
				toDoLists2: state.toDoLists2.filter((list) => list.id !== toDoListId),
				toDoLists3: state.toDoLists3.filter((list) => list.id !== toDoListId),
			};
		}

		case ADD_ITEM_NEW_TODOLIST: {
			const { listName, item } = action.payload;
			return {
				...state,
				[listName]: [...(state[listName] || []), item], // Если список не существует, создаётся новый
			};
		}

		case REMOVE_ITEM_NEW_TODOLIST: {
			const { listName, item } = action.payload;
			if (!state[listName]) {
				console.error(`List "${listName}" does not exist in state.`);
				return state;
			}
			return {
				...state,
				[listName]: state[listName].filter((i) => i.id !== item.id), // Удаляем только совпадающий элемент
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

export const updateTodolistTitleAC = (toDoListId, newText) => ({
	type: EDIT_TODOLIST,
	payload: { toDoListId, newText },
});

export const addToDoListAC = (title) => ({
	type: ADD_TODOLIST,
	payload: { title },
});
export const deleteToDoListAС = (toDoListId) => ({
	type: DELETE_TODOLIST,
	payload: { toDoListId },
});
export const addItemInNewToDoListAС = (listName, item) => ({
	type: ADD_ITEM_NEW_TODOLIST,
	payload: { listName, item },
});
export const removeItemInNewToDoListAС = (listName, item) => ({
	type: REMOVE_ITEM_NEW_TODOLIST,
	payload: { listName, item },
});
