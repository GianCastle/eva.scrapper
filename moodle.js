//jshint esversion: 6
const cheerio = require('cheerio');

let request = require('request');

request = request.defaults({jar: true});

function getCourses(user, callback) {
  request.post({url: `${user.url}/moodle/login/index.php `,
                              form: {username: user.username,password: user.password}},
                              (err, httpResponse, body) => {
    if (err) throw err;

    request(`${user.url}/moodle/`, function (error, response, body) {
      if (!error && response.statusCode == 200) {

        let $ = cheerio.load(body);
        let courses = [];
          console.log(body);
        $('div.coursebox > .info > .coursename')
          .each(function() {
            courses.push( $(this).text());
          });

        process.nextTick(() =>{
           callback(null, courses);
        });
      } else {
        process.nextTick(() => {
           callback(new Error(error), null);
        });
        return;
      }
    });
  });
}

function getTasks(user, callback) {
  request.post({url: `${user.url}/moodle/login/index.php `,
                form:{ username: user.username,password: user.password}},
                              (err, httpResponse, body) => {
    if (err) throw err;

    request(`${user.url}/moodle/calendar/view.php?view=month&time=${Math.floor(Date.now() / 1000)}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {

        let $ = cheerio.load(body);
        let courses = [];
        $('li.calendar_event_course')
          .each(function() {
            courses.push($(this).text());
          });

        process.nextTick(() =>{
           callback(null, courses);
        });
      } else {
        process.nextTick(() => {
           callback(new Error(error), null);
        });
        return;
      }
    });
  });
}

module.exports = {
  getCourses: getCourses,
  getTasks : getTasks

};
