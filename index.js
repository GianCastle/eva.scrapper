
const moodle = require('./moodle');
const express = require('express');
const app = express();



const eva = {
  username: process.env.EVA_USER,
  password: process.env.EVA_PASSWORD,

  url: 'http://eva.unapec.edu.do'

};

app.get('/tasks', (req, res, next) => {
  moodle.getTasks(eva, (error, tasks) => {
    if(error) throw new Error(error);
    res.json(tasks);
  });
});

app.get('/courses', (req, res, next) => {
  moodle.getCourses(eva, (error, courses) => {
    if(error) throw new Error(error);
    res.json(courses);
  });
});

app.get('/participants', (req, res, next) => {
      moodle.getParticipants(eva, (error, participants) => {
        if(error) throw new Error(error);
        res.json(participants);
      });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
