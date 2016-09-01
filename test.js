const moodle = require('./moodle');

const eva = {
  username: process.env.EVA_USER,
  password: process.env.EVA_PASSWORD,

  url: 'http://eva.unapec.edu.do'

};

moodle.getTasks(eva, (error, tasks) => {
  console.log((error) ? error : tasks);
});


moodle.getCourses(eva, (error, courses) => {
  console.log((error) ? error : courses);
});

moodle.getParticipants(eva, (error, participants) => {
  console.log((error) ? error : participants);
});
