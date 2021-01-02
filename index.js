const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());


const connection = mysql.createConnection({
    host: "localhost",
    user: 'root', 
    password: 'root',
    database: 'node_api'
});

const courses = [
    {id: 1, name: "Course 1"},
    {id: 2, name: "Course 2"},
    {id: 3, name: "Course 3"}
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/course', (req, res) => {
    console.log('waka');
    res.send(courses);
});

app.get('/api/course/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The Course with the given ID was not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    let sql = `INSERT INTO courses(description) VALUES ('${req.body.name}')`;
    const result = runMysql(sql);
    if (result.err) res.status(500).send(result.err);
    console.log(sql);
    res.send('Course recorded successfully');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Run MySQL Command Function
function runMysql(sql) {
    var response = {
        result: '',
        err:  ''
    };
    console.log(typeof connection);
    connection.connect((err) => {
        if (err) response['err'] = 'Unable to connect to database';
    });

    connection.query(sql, (err, result) => {
        if (err) {
            response['err'] = err.message
            return '';
        }
        response['result'] = result;
    });

    return response;
}