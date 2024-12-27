import { tasksReducer } from './tasksReducer';
import { addTodolistAC, todolistReducer } from './todolistsReducer';

test('ids should be equal', () => {
	const startTasksState = {};
	const startTodolistsState = [];

	const action = addTodolistAC('new todoloist');

	const endTasksState = tasksReducer(startTasksState, action);
	const endTodolistsState = todolistReducer(startTodolistsState, action);

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.todolistId);
	expect(idFromTodolists).toBe(action.todolistId);
});
