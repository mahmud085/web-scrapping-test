var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

   // url = 'http://www.imdb.com/title/tt1229340/';
    url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=pws:IDHAKA7";

    request(url, function(error, response, html){
        if(!error){
        	console.log('not err');
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            // $('.title_wrapper').filter(function(){
            //     var data = $(this);
            //     title = data.children().first().text();

            //     release = data.children().last().children().last().text();

            //     json.title = title;
            //     json.release = release;
            //     console.log('json',json);
            // })

            // Since the rating is in a different section of the DOM, we'll have to write a new jQuery filter to extract this information.

            // $('.ratingValue').filter(function(){
            //     var data = $(this);
            //     console.log('data ',data.children().first().children().text());
            //     // The .star-box-giga-star class was exactly where we wanted it to be.
            //     // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

            //     rating = data.children().first().children().text();

            //     json.rating = rating;
            // })

      		temperature = $("[data-variable='temperature'] .wx-value").html();
      
    		console.log("It’s " + temperature + " degrees Fahrenheit.");
            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

		    console.log('File successfully written! - Check your project directory for the output.json file');

			})

			// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
			res.send('Check your console!')
	        }

    }) ;
})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;