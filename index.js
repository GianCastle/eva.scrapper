//jshint esversion: 6
const moodle = require('./moodle');

const eva = {
  username: '20131197',
  password: 'fwx3kacx9vec4*',

  url: 'http://eva.unapec.edu.do'

};

/*moodle.getCourses(eva, (err, courses) => {
  console.log((err) ? err : courses);
});*/

moodle.getTasks(eva, (error, tasks) => {
  console.log((error) ? error : tasks);
});
