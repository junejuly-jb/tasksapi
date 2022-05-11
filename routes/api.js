const router = require('express').Router();
const auth = require('../middleware/auth');
const AuthController = require('../controllers/AuthController');
const TodoController = require('../controllers/TodoController');

// auth routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

//todos
router.post('/add-todo', auth, TodoController.addTodo);
router.get('/todos', auth, TodoController.todos);
router.delete('/delete-todo/:id', auth, TodoController.deleteTodo);
router.put('/mark-todo/:id', auth, TodoController.markComplete);

module.exports = router;