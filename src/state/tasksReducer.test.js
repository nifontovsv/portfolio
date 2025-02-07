import {
	changeTaskStatusAC,
	changeTaskTitleAC,
	addTaskAC,
	removeTaskAC,
	tasksReducer,
} from './tasksReducer';
import { addTodolistAC, removeTodolistAC } from './todolistsReducer';

test('correct task should be deleted from correct array', () => {
	const startState = {
		todolistId1: [
			{ id: '1', title: 'HTML & CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	};

	const action = removeTaskAC('2', 'todolistId2');
	const endState = tasksReducer(startState, action);

	expect(endState['todolistId1'].length).toBe(3);
	expect(endState['todolistId2'].length).toBe(2);
	//метод массива every пробегается по массиву(примерно также как и методы map,filter) и возвращает true, если каждый элемент выполнил условие и вернул true
	// 1 вариант
	expect(endState['todolistId2'].every((t) => t.id != '2')).toBeTruthy(); //.toBe(true)
	//2 вариант
	// expect(endState['todolistId2'][0].id).toBe('1');
	// expect(endState['todolistId2'][1].id).toBe('3');
});

test('correct task should be added from correct array', () => {
	const startState = {
		todolistId1: [
			{ id: '1', title: 'HTML & CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	};

	const action = addTaskAC('juce', 'todolistId2');
	const endState = tasksReducer(startState, action);

	expect(endState['todolistId1'].length).toBe(3);
	expect(endState['todolistId2'].length).toBe(4);
	expect(endState['todolistId2'][0].id).toBeDefined();
	expect(endState['todolistId2'][0].title).toBe('juce');
	expect(endState['todolistId2'][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
	const startState = {
		todolistId1: [
			{ id: '1', title: 'HTML & CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	};

	const action = changeTaskStatusAC('2', false, 'todolistId2');
	const endState = tasksReducer(startState, action);

	expect(endState['todolistId2'][1].isDone).toBeFalsy();
	expect(endState['todolistId1'][1].isDone).toBeTruthy();
});

test('title of specified task should be changed', () => {
	const startState = {
		todolistId1: [
			{ id: '1', title: 'HTML & CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	};

	const action = changeTaskTitleAC('2', 'Milkyway', 'todolistId2');
	const endState = tasksReducer(startState, action);

	expect(endState['todolistId2'][1].title).toBe('Milkyway');
	expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new property with new array should be added when new todolist is added', () => {
	const startState = {
		todolistId1: [
			{ id: '1', title: 'HTML & CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	};

	const action = addTodolistAC('new todolist');
	const endState = tasksReducer(startState, action);

	const keys = Object.keys(endState);
	const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2');
	if (!newKey) {
		throw Error('new key should be added');
	}

	expect(keys.length).toBe(3);
	expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
	const startState = {
		todolistId1: [
			{ id: '1', title: 'HTML & CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	};

	const action = removeTodolistAC('todolistId2');
	const endState = tasksReducer(startState, action);

	const keys = Object.keys(endState);

	expect(keys.length).toBe(1);
	expect(endState['todolistId2']).toBeUndefined();
});
