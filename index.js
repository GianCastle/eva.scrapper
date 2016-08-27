//jshint esversion: 6
const moodle = require('./moodle');

const eva = {
  username: process.env.MOODLE_USER,
  password: process.env.MOODLE_PASS,

  url: 'http://eva.unapec.edu.do'

};

moodle.getCourses(eva, (err, courses) => {
  console.log((err) ? "ERROR" : courses);
});
