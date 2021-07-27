//importing the necessary react modules
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
//importing bootstrap link
import 'bootstrap/dist/css/bootstrap.min.css';
//importing components and pages
import CreateTodo from './pages/CreateTodos';
import EditTodo from './pages/EditTodos';
import Login from './components/Login';
import Nav from './components/Nav';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import TodoList from './pages/TodoList';
import { TodoProvider } from './utils/TodoState';

function App() {
	const [currentPage, setCurrentPage] = useState('/todos');

	//a basic setup using routes to allow easy navigation
	return (
		<Router>
			<div className="main">
				<TodoProvider>
					<Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
					<Switch>
						<Route exact path='/' component={Login} />
						<Route exact path='/signup' component={Signup} />
						<Route exact path='/todos' component={TodoList} />
						<Route exact path='/edit/:id' component={EditTodo} />
						<Route exact path='/create' component={CreateTodo} />
						<Route component={NotFound} />
					</Switch>
				</TodoProvider>
			</div>
		</Router>
	);
}

export default App;
