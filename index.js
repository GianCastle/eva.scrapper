//jshint esversion: 6
const moodle = require('./moodle');

const eva = {
  username: process.env.EVA_USER,
  password: process.env.EVA_PASSWORD,

  url: 'http://eva.unapec.edu.do'

};

moodle.getCourses(eva, (err, courses) => {
  console.log((err) ? "ERROR" : courses);
});

moddle.getTasks(eva, (user, tasks) => {

});
