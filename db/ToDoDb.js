const sql = require('mssql/msnodesqlv8');

const sqlConfig = {
    database: 'NodeToDo',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const getIncompleteToDos = async()=> {
    return getInternal(false);
}

const getCompleteToDos = async()=> {
    return getInternal(true);
}

const getInternal = async(completed) => {
    await sql.connect(sqlConfig);
    var cmdText = `SELECT tdi.*, c.Name FROM Categories c
    JOIN ToDoItems tdi
    ON c.Id = tdi.CategoryId
    WHERE tdi.CompletedDate IS `
    if (completed) {
        cmdText += "NOT ";
    }
    cmdText += "NULL";
    const { recordset } = await sql.query(cmdText);
    return recordset;
}

const getCategories = async() => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('select * from categories');
    return recordset;
}

const addToDo = async ({ title, dueDate, categoryId}) => {
    await sql.connect(sqlConfig);
    await sql.query`INSERT INTO ToDoItems (Title, DueDate, CategoryId) 
    VALUES (${title}, ${dueDate}, ${categoryId})`;
}

const markAsCompleted = async ({id}) => {
    await sql.connect(sqlConfig);
    await sql.query`UPDATE ToDoItems Set CompletedDate = GETDATE() WHERE Id = ${id}`;
}

const addCategory = async ({name}) => {
    await sql.connect(sqlConfig);
    await sql.query`INSERT INTO Categories VALUES (${name})`;
}

const getById = async id => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query`SELECT * FROM Categories WHERE Id = ${id}`;
    return recordset[0];
}

const updateCategory = async ({id, name}) => {
    await sql.connect(sqlConfig);
    await sql.query`UPDATE Categories SET Name = ${name} WHERE Id = ${id}`;
}

const getToDosByCategory = async(id) => {
    console.log(id);
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query`SELECT tdi.*, c.Name FROM Categories c JOIN ToDoItems tdi ON c.Id = tdi.CategoryId WHERE c.Id = ${id}`;
    return recordset;
}



module.exports = {
    getIncompleteToDos, 
    getCompleteToDos, 
    getCategories, 
    addToDo, 
    markAsCompleted, 
    addCategory, 
    getById, 
    updateCategory, 
    getToDosByCategory
}