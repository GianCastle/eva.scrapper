const cheerio = require('cheerio');
const request = require('request').defaults({
  jar: true
});

function authenticate(user) {

  const MOODLE_PARAMETERS = {
    url: `${user.url}/moodle/login/index.php `,
    form: {
      username: user.username,
      password: user.password
    }
  };
  return new Promise((resolve, reject) =>
    request.post(MOODLE_PARAMETERS, (error, response, body) => (error) ? reject(new Error(error)) :
      resolve(response)));
}


function getCourses(user, callback) {

  authenticate(user).then((data) => {
    request(`${user.url}/moodle/`, function(error, response, body) {
      let $ = cheerio.load(body);
      let courses = [];

      $('div.coursebox > .info > .coursename')
        .each(function() {
          courses.push({
            courseName: $(this).text()
          });
        });

      process.nextTick(() => {
        callback(null, courses);
      });
    });

  });
}

function getTasks(user, callback) {

  authenticate(user).then((data) => {

    request(`${user.url}/moodle/calendar/view.php?view=day&time=1468555200`, (error, response, body) => {
      if (!error && response.statusCode == 200) {

        const $ = cheerio.load(body);
        const name = $('a[title="Ver perfil"]').first().text();
        const tasks =  $('li.calendar_event_course').text();
        const events  = [];


        $('.event').map(function (index, element) {

          events.push({
              user: name,
              course_title: $('.course').text(),
              taskTitle: $('.referer').text(),
              description: $('.description').text()
          });

        });

        process.nextTick(() => {
          callback(null, events);
        });
      }
    });
  });
}

module.exports = {
  getCourses: getCourses,
  getTasks: getTasks

};
