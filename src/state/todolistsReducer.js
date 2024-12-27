import { v1 } from 'uuid';

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState = [
	{ id: todolistId1, title: 'what to learn', filter: 'all' },
	{ id: todolistId2, title: 'what to buy', filter: 'all' },
];

export const todolistReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REMOVE_TODOLIST': {
			return state.filter((tl) => tl.id !== action.id);
		}
		case 'ADD_TODOLIST': {
			return [{ id: action.todolistId, title: action.title, filter: 'all' }, ...state];
		}
		case 'CHANGE-TODOLIST-TITLE': {
			const todolist = state.find((tl) => tl.id === action.id);
			if (todolist) {
				//если нашёлся заголовок - изменим его
				todolist.title = action.title;
			}
			return [...state];
		}
		case 'CHANGE-TODOLIST-FILTER': {
			const todolist = state.find((tl) => tl.id === action.id);
			if (todolist) {
				//если нашёлся фильтр - изменим его
				todolist.filter = action.filter;
			}
			return [...state];
		}
		default:
			return state;
	}
};

export const removeTodolistAC = (todolistId) => {
	return { type: 'REMOVE_TODOLIST', id: todolistId };
};
export const addTodolistAC = (title) => {
	return { type: 'ADD_TODOLIST', title, todolistId: v1() };
};
export const changeTodolistTitleAC = (id, title) => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
};
export const changeTodolistFilterAC = (filter, id) => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter };
};
