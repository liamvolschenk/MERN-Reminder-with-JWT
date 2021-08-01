//creating the routes for the to-do's
//importing the express router module
const router = require('express').Router();
//importing the controllers
const {
	getTodos,
	getSingleTodo,
	createTodo,
	updateTodo,
	deleteTodo,
} = require('../../controllers/todo-controller');
//importing the authorization module
const { authMiddleware } = require('../../utils/auth');

router
	.route('/')
	//get all todos route
	.get(getTodos)
	//crete a todo route
	.post(createTodo, authMiddleware);

router
	.route('/:id')
	//route to get one to-do update a todo item
	.get(getSingleTodo, authMiddleware)
	//route to update a todo item
	.put(updateTodo, authMiddleware)
	//route to delete a todo item by ID
	.delete(deleteTodo);

module.exports = router;
