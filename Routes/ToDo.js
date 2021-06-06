const router = require('express').Router();
const ToDoDb = require('../db/ToDoDb');

router.get('/', async (req, res) => {
    const toDos = await ToDoDb.getIncompleteToDos();
    res.render('toDo/index', {toDos});
});

router.get('/add', async (req, res) => {
    const categories = await ToDoDb.getCategories();
    res.render('toDo/add', {categories});
});

router.post('/add', async (req, res) => {
    await ToDoDb.addToDo(req.body);
    res.redirect('/toDo');
});

router.post('/markAsCompleted', async (req, res) => {
    await ToDoDb.markAsCompleted(req.body);
    res.redirect('/toDo');
});

router.get('/completed', async (req, res) => {
    const completedToDos = await ToDoDb.getCompleteToDos();
    res.render('toDo/completed', {completedToDos});
});

router.get('/addCategory', async (req, res) => {
    res.render('toDo/addCategory');
});

router.post('/addCategory', async (req, res) => {
    await ToDoDb.addCategory(req.body);
    res.redirect('/toDo/');
});

router.get('/categories', async (req, res) => {
    const categories = await ToDoDb.getCategories();
    res.render('toDo/categories', {categories});
});

router.get('/editCategory', async (req, res) => {
    const category = await ToDoDb.getById(req.query.id);
    res.render('toDo/editCategory', { category });
});

router.post('/updateCategory', async (req, res) => {
    await ToDoDb.updateCategory(req.body);
    res.redirect('/toDo/categories');
});

router.get('/byCategory', async (req, res) => {
    const toDos = await ToDoDb.getToDosByCategory(req.query.id);
    res.render('toDo/byCategory', { toDos});
});

module.exports = router;