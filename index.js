const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: "Course 1"},
    {id: 2, name: "Course 2"},
    {id: 3, name: "Course 3"}
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/course', (req, res) => {
    res.send(courses);
});

app.get('/api/course/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The Course with the given ID was not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    console.log(courses);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));