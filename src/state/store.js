import { combineReducers, createStore, applyMiddleware } from 'redux';
// import { todolistReducer } from './todolistsReducer';
// import { tasksReducer } from './tasksReducer';
import { todoReducer } from './todoReducer';

//1. Создание Middleware
// Middleware для работы с localStorage отслеживает изменения состояния Redux и сохраняет его.
const localStorageMiddleware = (store) => (next) => (action) => {
	// Передаем действие дальше
	const result = next(action);

	// Получаем обновленное состояние
	const stateToPersist = store.getState();

	// Сохраняем состояние в localStorage
	localStorage.setItem('reduxState', JSON.stringify(stateToPersist));
	// Возвращаем результат, чтобы цепочка Redux работала корректно
	return result;
};

// 2. Загрузка состояния из localStorage
// При инициализации Redux Store нужно попытаться загрузить сохраненное состояние из localStorage. Если его нет, возвращаем undefined, чтобы Store использовал начальное состояние.

const loadStateFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('reduxState');
		if (serializedState === null) {
			return undefined; // Если данных нет, возвращаем undefined
		}
		return JSON.parse(serializedState);
	} catch (e) {
		console.error('Не удалось загрузить состояние из localStorage:', e);
		return undefined;
	}
};

// Загружаем сохраненное состояние из localStorage
const persistedState = loadStateFromLocalStorage();

// Резюме
// Middleware автоматически сохраняет состояние Redux в localStorage.
// При инициализации Store состояние загружается из localStorage.
// Можно настроить избирательное сохранение определенных ключей состояния.
// Такой подход сохраняет данные даже при обновлении страницы или закрытии браузера.

const rootReducer = combineReducers({
	// todolists: todolistReducer,
	// tasks: tasksReducer,
	todo: todoReducer,
});

export const store = createStore(
	rootReducer,
	persistedState, // Инициализируем store загруженным состоянием
	applyMiddleware(localStorageMiddleware) // Подключаем middleware
);

window.store = store;

/*
1. Подключаем redux, react-redux
2. Создать store
3. Подключить store через provider
4. Создаём reducers
	а) Reducer -  функция, которая принимает 2 параметра: state и action
	б) В теле пишем switch case
5. Создать корневой reducer
6. Скомбинировать все reducers в корневой и положить в store
*/
