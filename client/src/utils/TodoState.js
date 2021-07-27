import React, { createContext, useContext } from 'react';
import { useTodoReducer } from './reducers';

const TodoContext = createContext();
const { Provider } = TodoContext;

//creating a provider pattern and context api
const TodoProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useTodoReducer({
		//set the initial state
		todos: [],
		currentTodo: {},
		_id: '',
		name: '',
		createdAt: '',
		todoCount: null,
	});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useTodoContext = () => {
	return useContext(TodoContext);
};

export { TodoProvider, useTodoContext };
