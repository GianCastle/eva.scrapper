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
      const $ = cheerio.load(body);
      const courses = [];

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
    request(`${user.url}/moodle/calendar/view.php?view=month&time=${Math.floor(new Date() / 1000)}`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(body);
        const events  = [];

        $('.event').map(function (index, element) {
          events.push({
              user: $('a[title="Ver perfil"]').first().text(),
              course_title: $('.course').text(),
              taskTitle: $('.referer').text(),
              description: $('.description').text()
          });

        });

        process.nextTick(() => {
          if(events.length > 0) {
              callback(null, events);
          } else {
            callback(null, {error : 'No today tasks'});
          }


        });
      }
    });
  });
}

function getParticipants(user, callback) {
    authenticate(user).then((data) => {
      request(`${user.url}/moodle/user/index.php?contextid=5064048&roleid=0&id=232289&search&perpage=60&mode=1`, (error, response, body) => {
        if(response.statusCode == 200) {
          const $ = cheerio.load(body);
          const list = [];

          $('.username').each(function(index, element) {
            list.push($(this).text());
          });

          process.nextTick(() => {
            callback(null,{
              course: $('span[itemprop="title"]').first().text(),
              participants: list
            } );
          });

        }
    });
  });
}

module.exports = {
  getCourses: getCourses,
  getTasks: getTasks,
  getParticipants : getParticipants

};
