const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'},
  { id: 4, name: 'course4'},
]

app.get('/', (req, res) => {
  res.send('waiting for commands\n');
});

app.get('/api/courses', (req,res) => {
  res.send(courses)
})

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

app.get('/api/courses/:id', (req,res) => {
  const course = courses.find(course => course.id===parseInt(req.params.id)) 
  if (!course) res.status(404).send('not found')
  res.send(course);
})

app.listen(3000, () => console.log('...listening on 3000, great'))