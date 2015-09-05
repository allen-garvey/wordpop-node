#Wordpop

Wordpop is a web application using node.js, D3.js and jQuery that creates a dynamic infographic to display the popularity of words in Craigslist listings. It can also compare the number of software developer job listings across different cities.

##Dependencies

* node 0.12.7 or higher
* Gulp 3.9.* or higher 
* Sass 3.4.* or higher
* npm to install dependencies

##Getting Started

* `cd` into downloaded project directory
* Type `npm install` to install dependencies
* If you do not have Gulp installed type `npm install gulp -g` or `sudo npm install gulp -g` to install Gulp
* Type `gulp build` to compile raw js files
* If you do not have Sass already installed, type `gem install sass` or `sudo gem install sass` to install Sass
* Type `sass sass/master.scss public_html/styles/master.css` to compile Sass source files
* Type `npm start` to start the node server
* Navigate your web browser of choice to http://localhost:3000 to view the app

##License

Wordpop is released under the MIT License. See license.txt for more details.

This project has no affiliation with Craigslist.