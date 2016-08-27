//jshint esversion: 6
const cheerio = require('cheerio');

let request = require('request');

request = request.defaults({jar: true});

function getCourses(user, callback) {
  request.post({url: user.url + "/moodle/login/index.php",
                              form: {username: user.username,password: user.password}},
                              (err, httpResponse, body) => {
    if (err) throw err;



    request(user.url + '/moodle/', function (error, response, body) {
      if (!error && response.statusCode == 200) {

        let $ = cheerio.load(body);
        let courses = [];

          //The reason i dont use arrow here its because i want a Lexical This.
        $('div.coursebox > .info > .coursename')
          .each(function(iterator, e) {
            courses.push( $(this).text()); //So i can do this shit. A lexical this. C:
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

}

module.exports = {
  getCourses: getCourses
  getTasks : getTasks

};
